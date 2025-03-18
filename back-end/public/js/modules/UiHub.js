import { carregarContas, cadastrarConta, buscarContaPorId, editarConta, carregarPesquisaContas } from "./apiHub.js"

const painelFinanceiro = document.getElementById('painel-financeiro')
const painelEspecialidade = document.getElementById('hub-financeiro')

const btPagar = document.getElementById('bt-pagar')
const btReceber = document.getElementById('bt-receber')
const btCaixa = document.getElementById('bt-caixa')
const btConciliacao = document.getElementById('bt-conciliacao')
const btPesquisar = document.getElementById('bt-pesquisar')

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
                console.error(error);
            }
        });
    });
}


function ativarBotaoPesquisa() {
    btPesquisar.addEventListener('click', () => {
        painelEspecialidade.innerHTML = ""
        painelEspecialidade.innerHTML = `
        <form id="formPesquisaConta">
                <label for="nome">Nome da Conta:</label>
                <input type="text" id="nome" name="nome">

                <label for="categoria">Categoria:</label>
                <select id="categoria" name="categoria">
                    <option value=""></option>
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
                <select id="caixa" name="caixa">
                    <option value=""></option>
                    <option value="BRB Empresa">BRB Empresa</option>
                    <option value="Dinheiro">Dinheiro</option>
                    <option value="BRB Pessoal">BRB Pessoal</option>
                </select>

                <label for="dataVencimento">Data de Vencimento:</label>
                <input type="date" id="dataVencimento" name="data_vencimento">

                <label for="valor">Valor:</label>
                <input type="number" id="valor" name="valor">

                <button type="submit">Pesquisar</button>
         </form>`

         const formPesquisa = document.getElementById('formPesquisaConta')
         formPesquisa.addEventListener('submit', async (event) => {
            event.preventDefault()

            const formData = new FormData(event.target)
            const dados = Object.fromEntries(formData.entries())

            const params = new URLSearchParams()
            Object.keys(dados).forEach(key => {
                if(dados[key]) {
                    params.append(key, dados[key])
                }
            })

            const parametros = params.toString()
            try {
                await carregarPesquisaContas(parametros)
            } catch (error) {
                console.error('Erro' + error)
            }
         })
    })
}

function ativarBotaoEditar() {
    painelEspecialidade.addEventListener('click', async (event) => {
        if (event.target && event.target.classList.contains('btn-editar')) {
            const contaId = event.target.getAttribute("data-id")
            try {
                const conta = await buscarContaPorId(contaId)
                const contaElemento = event.target.closest(".card-pagamento")

                const cloneOriginal = contaElemento.cloneNode(true)
                contaElemento.innerHTML = `
                    <form id="formCadastroConta">
                <label for="nome">Nome:</label>
                <input type="text" id="nome" name="nome"value="${conta.nome}" required>

                <label for="categoria">Categoria:</label>
                <select id="categoria" name="categoria" required>
                    ${gerarOpcoesSelect(conta.categoria, ["Aluguel", "Energia", "Salário Barbeiro", "Doces", "Comidas", "Bebidas", "Sinuca", "Equipamento"])}
                </select>

                <label for="caixa">Caixa:</label>
                <select id="caixa" name="caixa" required>
                    ${gerarOpcoesSelect(conta.caixa, ["BRB Empresa", "Dinheiro", "BRB Pessoal"])}
                </select>

                <label for="dataVencimento">Data de Vencimento:</label>
                <input type="date" id="dataVencimento" name="data_vencimento" value="${conta.data_vencimento}" required>

                <label for="valor">Valor:</label>
                <input type="number" id="valor" name="valor" value="${conta.valor}" required>

                <label for="formaPagamento">Forma de Pagamento:</label>
                <input type="text" id="formaPagamento" name="forma_pagamento" value="${conta.forma_pagamento}"required>

                <label for="status">Status:</label>
                <select id="status" name="status" required>
                ${gerarOpcoesSelect(conta.status, ["A pagar", "Pago"])}
                </select>

                <label for="numParcela">Número da Parcela:</label>
                <select id="numParcela" name="num_parcela">
                    ${Array.from({ length: 12 }, (_, i) => `<option value="${i + 1}" ${conta.num_parcela === i + 1 ? 'selected' : ''}>${i + 1}</option>`).join('')}
                </select>

                <label for="totalParcelas">Total de Parcelas:</label>
                <select id="total_parcelas" name="total_parcelas">
                    ${Array.from({ length: 12 }, (_, i) => `<option value="${i + 1}" ${conta.total_parcelas === i + 1 ? 'selected' : ''}>${i + 1}</option>`).join('')}
                </select>

                <button type="submit"id="btn-atualizar">Atualizar</button>
                <button type="button"id="btn-cancelar">Cancelar</button>
         </form>`

                const btCancelar = document.getElementById('btn-cancelar')

                btCancelar.addEventListener('click', () => {
                    contaElemento.replaceWith(cloneOriginal)
                })

                const formulario = document.getElementById("formCadastroConta");

                formulario.addEventListener("submit", async (event) => {
                    event.preventDefault(); // Impede o reload da página

                    const formData = new FormData(event.target);
                    const dados = Object.fromEntries(formData.entries());

                    dados.valor = parseFloat(dados.valor);
                    dados.num_parcela = parseInt(dados.num_parcela, 10);
                    dados.total_parcelas = parseInt(dados.total_parcelas, 10);
                    dados.data_pagamento = dados.data_pagamento || null;
                    dados.id_parcelamento = null;
                    dados.criado_em = new Date().toISOString();

                    try {
                        await editarConta(
                            contaId,
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
                            }
                        );
                        alert("Conta atualizada com sucesso!");
                    } catch (error) {
                        alert("Erro ao cadastrar conta. Verifique os campos e tente novamente.");
                        console.error(error);
                    }
                })

            } catch (error) {
                console.error(error)
            }
        }
    })
}

function gerarOpcoesSelect(valorAtual, opcoes) {
    return opcoes.map(opcao => `<option value="${opcao}" ${opcao === valorAtual ? 'selected' : ''}>${opcao}</option>`).join('');
}


export { ativarBotaoAux, ativarBotaoCad, ativarBotaoEditar, ativarBotaoPesquisa }
