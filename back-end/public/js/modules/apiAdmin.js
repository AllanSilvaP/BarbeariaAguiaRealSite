const API_URL = "http://127.0.0.1:8000";

async function carregarCategorias (tipo) {
    try {
        const response = await fetch (`${API_URL}/api/buscar/categorias?tipo=${encodeURIComponent(tipo)}`)

        if (!response.ok) {
            throw new Error("Erro ao buscar Contas")
        }

        const data = await response.json()

        return data.data
    } catch (error) {
        console.error("Erro na requisição", error);
        throw error;
    }
}

async function addCategoria (categoria) {
    try {
        const response = await fetch (`${API_URL}/api/adicionar/categoria`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(categoria)
        })

        if (!response.ok) {
            throw new Error(data.message || "Erro desconhecido ao cadastrar categoria");
        }

        const data = await response.json()

        return data;
    } catch (error) {
        console.error("Erro na requisição", error);
        throw error;
    }
}

async function editCategoria (categoria, id) {
    try {
        const response = await fetch (`${API_URL}/api/editar/categoria/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(categoria)
        })

        if (!response.ok) {
            throw new Error(data.message || "Erro desconhecido ao editar categoria");
        }

        const data = await response.json()

        return data
    } catch (error) {
        console.error("Erro na requisição", error);
        throw error;
    }
}

async function excluirCategoria (id) {
    try {
        const response = await fetch (`${API_URL}/api/deletar/categoria/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (!response.ok) {
            throw new Error(data.message || "Erro desconhecido ao deletar categoria");
        }

        const data = await response.json()

        return data
    } catch (error) {
        console.error("Erro na requisição", error);
        throw error;
    }
}

export {carregarCategorias, addCategoria, editCategoria, excluirCategoria}
