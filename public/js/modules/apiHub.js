import { mostrarCards } from "./funcHub.js";

const API_URL = "http://127.0.0.1:8000";

async function cadastrarConta(nome, categoria, caixa, dataVencimento, valor, formaPagamento, status, dataPagamento, numParcela, totalParcelas, idParcelamento, criadoEm) {
    try {
        const response = await fetch(`${API_URL}/api/cadastrar/conta`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "X-Requested-With": "XMLHttpRequest",
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: JSON.stringify({ nome, categoria, caixa, dataVencimento, valor, formaPagamento, status, dataPagamento, numParcela, totalParcelas, idParcelamento, criadoEm, updated_at, created_at })
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

async function buscarContas(status) {
    try {
        const response = await fetch(`${API_URL}/api/buscar/contas?status=${status}`);
        if (!response.ok) throw new Error("Erro ao buscar contas");

        return await response.json()
    } catch (error) {
        console.error("Erro ao carregar contas:", error);
        return [];
    }
}

async function carregarContas(status) {
    const contas = await buscarContas(status)
    mostrarCards(contas)
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
        return response()
    }
}

export { carregarContas, cadastrarConta, excluirConta };
