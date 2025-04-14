import { excluirConta, pagarConta, voltarConta, carregarContas } from "./apiHub.js";

const tipoPagar = 'Pagar'
const tipoReceber = 'Receber'

const statusPagar = 'A Pagar'

function criarCard(conta) {
    const card = document.createElement('div')
    card.classList.add('card-pagamento')

    const statusClasse = conta.status === "A Pagar" ? "pagar" : "pago"

    const dataVencimento = new Date(conta.data_vencimento + "T00:00:00")
    const hoje = new Date()

    const ontem = new Date();
    ontem.setDate(hoje.getDate() - 1);
    ontem.setHours(0, 0, 0, 0);

    const vencido = dataVencimento <= ontem && conta.status == statusPagar ? 'style="color: red; font-weight: bold;"' : "";


    dataVencimento.setHours(0,0,0,0)
    hoje.setHours(0,0,0,0)

    card.innerHTML = `
    <div class="card-header ${statusClasse}">
        <h3>${conta.nome}</h3>
        <span class="status">${conta.status}</span>
    </div>
    <div class="card-body">
        <p><strong>Categoria:</strong> ${conta.categoria?.nome ?? 'Não informada'}</p>
        <p><strong>Caixa:</strong> ${conta.caixa?.nome ?? 'Não informada'}</p>
        <p><strong>Valor:</strong> R$ ${parseFloat(conta.valor).toFixed(2)}</p>
        <p><strong>Data de Vencimento:</strong> <span ${vencido}> ${dataVencimento.toLocaleDateString()}</span></p>
        <p><strong>Forma de Pagamento:</strong> ${conta.forma_pagamento?.nome ?? 'Não informada'}</p>
        ${conta.total_parcelas > 1 ? `<p><strong>Parcela:</strong> ${conta.num_parcela} de ${conta.total_parcelas}</p>` : ""}
    </div>
    <div class="card-footer">
        ${conta.status === "A Pagar" ? `<button class="btn-pagar" data-id="${conta.id}">Pagar</button>` : ""}
        <button class="btn-editar" data-id="${conta.id}">Editar</button>
        <button class="btn-excluir" data-id="${conta.id}">Excluir</button>
    </div>
    `;

    //CONST PARA FAZER CRUD

    const btnExcluir = card.querySelector('.btn-excluir')
    if (btnExcluir) {
        btnExcluir.addEventListener('click', () => {
            if(conta.status === "A Pagar") {
                excluirConta(conta.id)
                carregarContas(conta.status, tipoPagar);

            } else {
                voltarConta(conta.id)
            }
        })
    }

    const btnPagar = card.querySelector('.btn-pagar')
    if (btnPagar) {
        btnPagar.addEventListener('click', () => {
            pagarConta(conta.id)
            carregarContas(conta.status, tipoPagar);
        })
    }
    return card
}

function mostrarCards(contas) {
    const hubFinanceiro = document.getElementById('hub-financeiro')
    hubFinanceiro.innerHTML = ""

    contas.forEach(conta => {
        const card = criarCard(conta)
        hubFinanceiro.appendChild(card)
    });
}

export { criarCard, mostrarCards }
