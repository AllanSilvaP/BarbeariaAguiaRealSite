const painelFinanceiro = document.getElementById('hub-financeiro')
const btPagar = document.getElementById('bt-pagar')
const btReceber = document.getElementById('bt-receber')
const btCaixa = document.getElementById('bt-caixa')
const btConciliacao = document.getElementById('bt-conciliacao')

function ativarBotaoHub () {
    btPagar.addEventListener("click", () => {
        painelFinanceiro.innerHTML = '<h2>Variavel MARCO</h2><p> grafico NAO SEXY</p><p>Seja bem vindo $user!</p>'
    })

    btReceber.addEventListener("click", () => {
        painelFinanceiro.innerHTML = '<h2>Variavel MARCO</h2><p> grafico NAO SEXY</p><p>Seja bem vindo $user!</p>'
    })

    btCaixa.addEventListener("click", () => {
        painelFinanceiro.innerHTML = '<h2>Variavel MARCO</h2><p> grafico NAO SEXY</p><p>Seja bem vindo $user!</p>'
    })

    btConciliacao.addEventListener("click", () => {
        painelFinanceiro.innerHTML = '<h2>Variavel MARCO</h2><p> grafico NAO SEXY</p><p>Seja bem vindo $user!</p>'
    })

}

export {ativarBotaoHub}
