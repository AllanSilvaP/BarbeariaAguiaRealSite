import { carregarContas, cadastrarConta } from "./apiHub.js"

const painelFinanceiro = document.getElementById('painel-financeiro')
const btPagar = document.getElementById('bt-pagar')
const btReceber = document.getElementById('bt-receber')
const btCaixa = document.getElementById('bt-caixa')
const btConciliacao = document.getElementById('bt-conciliacao')

const btAPagar = document.getElementById('bt-a-pagar')
const btPagos = document.getElementById('bt-pagos')
const btAddConta = document.getElementById('bt-add-conta')

//PRIMEIRA PARTE - A PAGAR e PAGOS

function ativarBotaoHub () {
    btPagar.addEventListener("click", () => {
        painelFinanceiro.style.display = "block"
        carregarContas()

        btAPagar.addEventListener("click", () => {
            ativarBotaoAux(btAPagar, btPagos)
        })

        btPagos.addEventListener("click", () => {
            ativarBotaoAux(btPagos, btAPagar)
        })
    })
}

function ativarBotaoAux (ativo, inativo) {
    ativo.classList.add('ativo')
    inativo.classList.remove('ativo')
}

export {ativarBotaoHub, ativarBotaoAux}
