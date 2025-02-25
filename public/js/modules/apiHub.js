import { mostrarCards } from "./funcHub.js";

const API_URL = "http://127.0.0.1:8000";

export async function cadastrarConta(nome, categoria, caixa, dataVencimento, valor, formaPagamento, status, dataPagamento, numParcela, totalParcelas, idParcelamento, criadoEm) {
    try {
        const response = await fetch(`${API_URL}/contas`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome, categoria, caixa, dataVencimento, valor, formaPagamento, status, dataPagamento, numParcela, totalParcelas, idParcelamento, criadoEm })
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

async function buscarContas() {
    try {
        const response = await fetch(`${API_URL}/contas`);
        if (!response.ok) throw new Error("Erro ao buscar contas");

        return await response.json();
    } catch (error) {
        console.error("Erro ao carregar contas:", error);
        return [];
    }
}

async function carregarContas() {
    const contas = await buscarContas();
    mostrarCards(contas);
}

export { carregarContas };
