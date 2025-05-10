import { carregarContas, cadastrarConta, buscarContaPorId, editarConta, carregarPesquisaContas } from "./apiHub.js"

const painelFinanceiro = document.getElementById('painel-financeiro')
const painelEspecialidade = document.getElementById('hub-financeiro')

const btReceber = document.getElementById('bt-receber')
const btCaixa = document.getElementById('bt-caixa')
const btConciliacao = document.getElementById('bt-conciliacao')
const btPesquisar = document.getElementById('bt-pesquisar')

const btAReceber = document.getElementById('bt-a-pagar')
const btRecebidos = document.getElementById('bt-pagos')
const btAddConta = document.getElementById('bt-add-conta')

const btHoje = document.getElementById('bt-hoje')
const btAmanha = document.getElementById('bt-amanha')
const btMes = document.getElementById('bt-mes')

const aReceber = 'A Receber'
const recebido = 'Recebido'

const tipoPagar = 'Pagar'
const tipoReceber = 'Receber'

    btReceber.addEventListener("click", () => {
        painelFinanceiro.style.display = "block"
        btAReceber.innerText = 'A Receber'
        btRecebidos.innerText = 'Recebidos'
        carregarContas(aReceber, tipoReceber)
    })


function ativarBotaoCadReceber() {
    btAddConta.addEventListener("click", () => {
        painelEspecialidade.innerHTML = `
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
                <input type="date" id="dataVencimento" name="data_vencimento" required >

                <label for="valor">Valor:</label>
                <input type="number" id="valor" name="valor" required>

                <label for="formaPagamento">Forma de Pagamento:</label>
                <input type="text" id="formaPagamento" name="forma_pagamento" required>

                <label for="status">Status:</label>
                <select id="status" name="status" required>
                    <option value="A Receber" selected>A Receber</option>
                    <option value="Recebido">Recebido</option>
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
         </form>`;

        // Agora que o HTML foi inserido, selecione o formulário
        const formulario = document.getElementById("formCadastroConta");

        formulario.addEventListener("submit", async (event) => {
            event.preventDefault(); // Impede o reload da página

            const formData = new FormData(event.target);
            const dados = Object.fromEntries(formData.entries());

            dados.valor = parseFloat(dados.valor);
            if (dados.valor <= 0) {
                alert("Valor Invalido")
                return
            }
            const dataVencimento = new Date(dados.data_vencimento)
            dataVencimento.setMinutes(dataVencimento.getMinutes() + dataVencimento.getTimezoneOffset())
            dados.dataVencimento = dataVencimento.toISOString().split("T")[0]
            dados.num_parcela = parseInt(dados.num_parcela, 10);
            dados.total_parcelas = parseInt(dados.total_parcelas, 10);
            dados.data_pagamento = dados.data_pagamento || null;
            dados.id_parcelamento = null;
            dados.criado_em = new Date().toISOString();

            try {
                await cadastrarConta(
                    {
                        nome: dados.nome,
                        categoria: dados.categoria,
                        caixa: dados.caixa,
                        data_vencimento: dados.data_vencimento,
                        valor: dados.valor,
                        forma_pagamento: dados.forma_pagamento,
                        status: dados.status,
                        data_pagamento: dados.data_pagamento,
                        num_parcela: dados.num_parcela,
                        total_parcelas: dados.total_parcelas,
                        id_parcelamento: dados.id_parcelamento,
                        criado_em: dados.criado_em
                    }, tipoReceber
                );
                alert("Conta cadastrada com sucesso!");
            } catch (error) {
                alert("Erro ao cadastrar conta. Verifique os campos e tente novamente.");
                console.error(error);
            }
        });
    });
}

export {ativarBotaoCadReceber}

