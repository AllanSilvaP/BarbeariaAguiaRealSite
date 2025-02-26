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

function ativarBotaoCad () {
    btAddConta.addEventListener("click", () => {
        painelEspecialidade.innerHTML = ""
        painelEspecialidade.innerHTML =`
        <form id="formCadastroConta">
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
                <input type="date" id="dataVencimento" name="dataVencimento" required>

                <label for="valor">Valor:</label>
                <input type="number" id="valor" name="valor" required>

                <label for="formaPagamento">Forma de Pagamento:</label>
                <input type="text" id="formaPagamento" name="formaPagamento" required>

                <label for="status">Status:</label>
                <select id="status" name="status" required>
                    <option value="A pagar" selected>A pagar</option>
                    <option value="Pago">Pago</option>
                </select>

                <label for="numParcela">Número da Parcela:</label>
                <select id="numParcela" name="numParcela">
                    ${Array.from({ length: 12 }, (_, i) => `<option value="${i + 1}" ${i === 0 ? 'selected' : ''}>${i + 1}</option>`).join('')}
                </select>

                <label for="totalParcelas">Total de Parcelas:</label>
                <select id="totalParcelas" name="totalParcelas">
                    ${Array.from({ length: 12 }, (_, i) => `<option value="${i + 1}" ${i === 0 ? 'selected' : ''}>${i + 1}</option>`).join('')}
                </select>

                <button type="submit">Cadastrar</button>
         </form>`
    })
    //  PEGANDO DADOS FORM PARA MANDAR PARA A API
        formulario.addEventListener("submit", async (event) => {
        event.preventDefault()

        const formData = new FormData(event.target)
        const dados = Object.fromEntreis(formData.entries())

        dados.valor = parseFloat (dados.valor)
        dados.numParcela = parseInt(dados.numParcela, 10);
            dados.totalParcelas = parseInt(dados.totalParcelas, 10);
            dados.dataPagamento = dados.dataPagamento ? dados.dataPagamento : null;
            dados.idParcelamento = null;
            dados.criadoEm = new Date().toISOString();

            try {
                const resposta = await cadastrarConta(
                    dados.nome,
                    dados.categoria,
                    dados.caixa,
                    dados.dataVencimento,
                    dados.valor,
                    dados.formaPagamento,
                    dados.status,
                    dados.dataPagamento,
                    dados.numParcela,
                    dados.totalParcelas,
                    dados.idParcelamento,
                    dados.criadoEm
                );

                alert("Conta cadastrada com sucesso!");
                console.log("Resposta da API:", resposta);
            } catch (error) {
                alert("Erro ao cadastrar conta. Verifique os campos e tente novamente.");
            }
    })
}

export {ativarBotaoHub, ativarBotaoAux, ativarBotaoCad}
