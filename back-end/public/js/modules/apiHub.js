import { mostrarCards } from "./funcHub.js";

const API_URL = "http://127.0.0.1:8000";

async function cadastrarConta(conta, tipo) {
    try {
        const response = await fetch(`${API_URL}/api/cadastrar/conta/${tipo}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "X-Requested-With": "XMLHttpRequest",
            },
            body: JSON.stringify(conta)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Erro desconhecido ao cadastrar usuário");
        }

        return data;
    } catch (error) {
        console.error("Erro na requisição", error);
        throw error;
    }
}

async function buscarContas(status, tipo) {
    try {
        const response = await fetch(`${API_URL}/api/buscar/contas?status=${status}/${tipo}`);
        if (!response.ok) throw new Error("Erro ao buscar contas");

        return await response.json()
    } catch (error) {
        console.error("Erro ao carregar contas:", error);
        return [];
    }
}

async function carregarContas(status, tipo) {
    const contas = await buscarContas(status, tipo)
    mostrarCards(contas)
}

async function carregarPesquisaContas (contaPesquisada) {
    const contas = await pesquisarConta(contaPesquisada)
    mostrarCards(contas)
}

async function buscarContaPorId (id) {
    try {
        const response = await fetch(`${API_URL}/api/buscar/conta/${id}`);
        if (!response.ok) throw new Error("Erro ao buscar contas");

        return await response.json()
    } catch (error) {
        console.error("Erro ao carregar contas:", error);
        return [];
    }
}

async function buscarContaPorData (data) {
    try {
        const response = await fetch(`${API_URL}/api/buscar/conta/${data}`);
        if (!response.ok) throw new Error("Erro ao buscar contas");

        return await response.json()
    } catch (error) {
        console.error("Erro ao carregar contas:", error);
        return [];
    }
}

async function pesquisarConta(contaPesquisada) {
    try {
        const response = await fetch(`${API_URL}/api/pesquisar/conta?${contaPesquisada}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        });

        if (!response.ok) throw new Error("Erro ao buscar contas");

        const data = await response.json();
        console.log("Dados recebidos:", data); // Debug
        return data;
    } catch (error) {
        console.error("Erro ao carregar contas:", error);
        return [];
    }
}

async function excluirConta(id) {
    try {
        const response = await fetch(`${API_URL}/api/excluir/conta/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Erro desconhecido ao excluir usuario");
        }
        alert('Conta excluida com sucesso')
        return data
    } catch (error) {
        console.error(error)
        throw error
    }
}

async function pagarConta (id) {
    try {
        const response = await fetch(`${API_URL}/api/pagar/conta/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Erro desconhecido ao pagar conta");
        } else {
            alert('Conta Paga')
        }
        return data
    } catch (error) {
        console.error(error)
    }
}

async function voltarConta (id) {
    try {
        const response = await fetch(`${API_URL}/api/voltar/conta/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Erro desconhecido ao pagar conta");
        } else {
            alert('Conta retornou a aba A Pagar')
        }
        return data
    } catch (error) {
        console.error(error)
    }
}

async function editarConta (id, contaData) {
    try {
        const response = await fetch (`${API_URL}/api/editar/conta/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contaData)
        })

        const data = await response.json()
        if (!response.ok) {
            throw new Error(data.message || "Erro ao editar")
        }

        return data
    } catch (error) {
        console.error(error)
    }
}

export { pagarConta, carregarContas, carregarPesquisaContas, cadastrarConta, excluirConta, editarConta, buscarContaPorId, voltarConta, buscarContaPorData};
