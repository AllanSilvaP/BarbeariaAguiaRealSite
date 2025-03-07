import { carregarContas, cadastrarConta } from "./apiHub.js"

const painelFinanceiro = document.getElementById('painel-financeiro')
const painelEspecialidade = document.getElementById('hub-financeiro')

const btPagar = document.getElementById('bt-pagar')
const btReceber = document.getElementById('bt-receber')
const btCaixa = document.getElementById('bt-caixa')
const btConciliacao = document.getElementById('bt-conciliacao')

const btAPagar = document.getElementById('bt-a-pagar')
const btPagos = document.getElementById('bt-pagos')
const btAddConta = document.getElementById('bt-add-conta')


const formulario = document.getElementById('formCadastroConta')
//PRIMEIRA PARTE - A PAGAR e PAGOS
    btPagar.addEventListener("click", () => {
        painelFinanceiro.style.display = "block"
        carregarContas('A Pagar')
    })

    btAPagar.addEventListener("click", () => {
        ativarBotaoAux(btAPagar, btPagos)
        carregarContas('A Pagar')
    })

    btPagos.addEventListener("click", () => {
        ativarBotaoAux(btPagos, btAPagar)
        carregarContas('Pago')
    })

function ativarBotaoAux(ativo, inativo) {
    ativo.classList.add('ativo')
    inativo.classList.remove('ativo')
}

function ativarBotaoCad() {
    btAddConta.addEventListener("click", () => {
        painelEspecialidade.innerHTML = ""
        painelEspecialidade.innerHTML = `
        <form id="formCadastroConta" method="POST" action="/api/cadastrar/conta">
                <label for="nome">Nome:</label>
                <input type="text" id="nome" name="nome" required>

                <label for="categoria">Categoria:</label>
                <select id="categoria" name="categoria" required>
                    <option value="Aluguel">Aluguel</option>
                    <option value="Energia">Energia</option>
                    <option value="Salário Barbeiro">Salário Barbeiro</option>
                    <option value="Doces">Doces</option>
                    <option value="Comidas">Comidas</option>
                    <option value="Bebidas">Bebidas</option>
                    <option value="Sinuca">Sinuca</option>
                    <option value="Equipamento">Equipamento</option>
                </select>

                <label for="caixa">Caixa:</label>
                <select id="caixa" name="caixa" required>
                    <option value="BRB Empresa">BRB Empresa</option>
                    <option value="Dinheiro">Dinheiro</option>
                    <option value="BRB Pessoal">BRB Pessoal</option>
                </select>

                <label for="dataVencimento">Data de Vencimento:</label>
                <input type="date" id="dataVencimento" name="data_vencimento" required>

                <label for="valor">Valor:</label>
                <input type="number" id="valor" name="valor" required>

                <label for="formaPagamento">Forma de Pagamento:</label>
                <input type="text" id="formaPagamento" name="forma_pagamento" required>

                <label for="status">Status:</label>
                <select id="status" name="status" required>
                    <option value="A pagar" selected>A pagar</option>
                    <option value="Pago">Pago</option>
                </select>

                <label for="numParcela">Número da Parcela:</label>
                <select id="numParcela" name="num_parcela">
                    ${Array.from({ length: 12 }, (_, i) => `<option value="${i + 1}" ${i === 0 ? 'selected' : ''}>${i + 1}</option>`).join('')}
                </select>

                <label for="totalParcelas">Total de Parcelas:</label>
                <select id="total_parcelas" name="total_parcelas">
                    ${Array.from({ length: 12 }, (_, i) => `<option value="${i + 1}" ${i === 0 ? 'selected' : ''}>${i + 1}</option>`).join('')}
                </select>

                <button type="submit">Cadastrar</button>
         </form>`
    })
    //  PEGANDO DADOS FORM PARA MANDAR PARA A API
    formulario.addEventListener("submit", async (event) => {
        event.preventDefault()

        const formData = new FormData(event.target)
        const dados = Object.fromEntries(formData.entries())

        dados.valor = parseFloat(dados.valor)
        dados.num_parcela = parseInt(dados.num_parcela, 10);
        dados.total_parcelas = parseInt(dados.total_parcelas, 10);
        dados.data_pagamento = dados.dataPagamento ? dados.dataPagamento : null;
        dados.id_parcelamento = null;
        dados.criado_em = new Date().toISOString();

        try {
            await cadastrarConta(
                dados.nome,
                dados.categoria,
                dados.caixa,
                dados.data_vencimento,
                dados.valor,
                dados.forma_pagamento,
                dados.status,
                dados.data_pagamento,
                dados.num_parcela,
                dados.total_parcelas,
                dados.id_parcelamento,
                dados.criado_em
            );
            alert("Conta cadastrada com sucesso!");
        } catch (error) {
            alert("Erro ao cadastrar conta. Verifique os campos e tente novamente.");
        }
    })
}

export { ativarBotaoAux, ativarBotaoCad }
