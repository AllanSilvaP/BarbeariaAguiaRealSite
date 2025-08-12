export async function renderSecaoPagamentos() {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch('/api/admin/pagamentos', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        });

        if (!response.ok) throw new Error('Erro ao buscar pagamentos');

        const pagamentos = await response.json();

        const html = `
        <div class="bg-white text-black rounded p-4 shadow-md">
            <div class="flex justify-between items-center">
            <h2 class="text-xl font-bold mb-4">Pagamentos</h2>
            <button id="cad-usuario" class="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded">Cadastrar Pagamento</button>
            </div>

            <div class="flex items-center gap-4 mb-4">
                <label>
                    Data:
                    <input type="date" id="filtro-data" class="border p-2 rounded" value="${new Date().toISOString().split('T')[0]}">
                </label>

                <label class="flex items-center gap-2">
                    <input type="checkbox" id="group-barbeiro">
                    Agrupar por Barbeiro
                </label>

        <button id="aplicar-filtro" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Aplicar</button>
    </div>
                    <button id="filtro-semana" class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded">
                Semana Atual
                </button>
        <div id="tabela-pagamentos"></div>`


        document.getElementById('secao-conteudo').innerHTML = html;

        const botao = document.getElementById('cad-usuario');
        if (botao) {
            botao.addEventListener('click', () => renderCadPagamento())
        }

        const buscarSemanaAtual = async () => {
            const hoje = new Date();
            const inicio = new Date(hoje)
            const fim = new Date(hoje)

            const diaSemana = hoje.getDay()
            inicio.setDate(hoje.getDate() - diaSemana);
            fim.setDate(inicio.getDate() + 6)

            const data_inicio = inicio.toISOString().split('T')[0];
            const data_fim = fim.toISOString().split('T')[0];

            try {
                const res = await fetch(`/api/admin/pagamentos?data_inicio=${data_inicio}&data_fim=${data_fim}&group=true`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json'
                    }
                });

                if (!res.ok) throw new Error('Erro ao buscar pagamentos da semana');

                const result = await res.json();

                const tabela = document.getElementById('tabela-pagamentos');
                tabela.innerHTML = `
                <div>
                <h3 class="font-bold text-lg mb-2">Semana: ${data_inicio} - ${data_fim}</h3>
                </div>
                `
                tabela.innerHTML += result.map(grupo => `
            <div class="border p-4 rounded mb-4 shadow">
                <h3 class="font-bold text-lg mb-2">${grupo.barbeiro || 'Sem nome'}</h3>
                <p>Total: R$ ${parseFloat(grupo.total).toFixed(2)}</p>
                <ul class="mt-2 text-sm text-gray-600">
                    ${grupo.pagamentos.map(p => `<li>${new Date(p.data_pagamento).toLocaleDateString('pt-BR')} - ${p.forma_pagamento} - R$ ${p.valor}</li>`).join('')}
                </ul>
            </div>
        `).join('');
            } catch (error) {
                console.error(error);
                alert("Erro ao buscar pagamentos da semana");
            }
        }

        const filtro = document.getElementById('aplicar-filtro')
        filtro.addEventListener('click', carregarPagamentosFiltrados)
        await carregarPagamentosFiltrados();

        const semana = document.getElementById('filtro-semana');
        semana.addEventListener('click', buscarSemanaAtual);

    } catch (error) {
        console.error(error);
        document.getElementById('secao-conteudo').innerHTML = `<p class="text-red-500">Erro ao carregar pagamentos.</p>`;
    }
}


async function renderCadPagamento() {
    const container = document.getElementById('secao-conteudo');

    // Igual ao da edição — pega o horário atual no formato aceito pelo input datetime-local
    const agora = new Date();
    const dataFormatada = agora.toISOString().slice(0, 16);

    const html = `
    <div class="bg-white text-black rounded p-4 shadow-md max-w-md mx-auto">
        <h2 class="text-xl font-bold mb-4">Cadastrar Pagamento</h2>

        <form id="form-cad-pagamento" class="space-y-4">
            <select name="id_agendamento" id="select-agendamento" class="input w-full border p-2 rounded" required>
            <option value="">Selecione um agendamento concluído</option>
        </select>

        <input type="number" name="valor" placeholder="Valor (R$)" class="input w-full border p-2 rounded" required>

        <select name="forma_pagamento" class="input w-full border p-2 rounded" required>
            <option value="">Forma de Pagamento</option>
            <option value="pix">PIX</option>
            <option value="cartão">Cartão</option>
            <option value="dinheiro">Dinheiro</option>
        </select>

        <label class="block font-medium mt-4 mb-1">Data do Pagamento</label>
            <input
                type="datetime-local"
                name="data_pagamento"
                value="${dataFormatada}"
                class="input w-full border p-2 rounded"
                required
            >
            <button type="submit" class="bg-black text-white px-4 py-2 rounded w-full hover:bg-gray-800">
                Cadastrar
            </button>
        </form>
    </div>
    `;

    container.innerHTML = html;

    const selectAgendamento = document.getElementById('select-agendamento');
    const token = localStorage.getItem('token');

    const resAg = await fetch('/api/admin/agendamentos-concluidos', {
        headers: { 'Authorization': `Bearer ${token}` }
    });

    const agendamentos = await resAg.json();

    const resPag = await fetch('/api/admin/pagamentos', {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const pagamentos = await resPag.json();

    const idsPagos = new Set(pagamentos.map(p => p.id_agendamento));
    const agendamentosDisponiveis = agendamentos.filter(ag => !idsPagos.has(ag.id_agendamento));

    selectAgendamento.innerHTML += agendamentosDisponiveis.map(ag => `
        <option value="${ag.id_agendamento}">
            ${ag.cliente.nome} - ${new Date(ag.data_hora).toLocaleString('pt-BR')}
        </option>
    `).join('');

    const form = document.getElementById('form-cad-pagamento');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        const formData = new FormData(form);

        const data = {};
        formData.forEach((value, key) => data[key] = value);

        if (data.data_pagamento) {
            data.data_pagamento = formatDateToMySQLLocal(data.data_pagamento);
        }

        const agendamentoSelecionado = agendamentos.find(ag => ag.id_agendamento == data.id_agendamento);

        if (!agendamentoSelecionado) {
            alert("Agendamento inválido");
            return;
        }

        const payload = {
            id_agendamento: data.id_agendamento,
            id_cliente: agendamentoSelecionado.id_cliente || 'N|A',
            valor: data.valor,
            forma_pagamento: data.forma_pagamento,
            data_pagamento: data.data_pagamento,
        };

        try {
            const response = await fetch('/api/admin/pagamentos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const erro = await response.json();
                throw new Error(erro.message || 'Erro ao cadastrar Pagamento');
            }

            alert('Pagamento cadastrado com sucesso!');
            renderSecaoPagamentos();
        } catch (error) {
            console.error(error);
        }
    });
}


async function carregarPagamentosFiltrados() {
    const data = document.getElementById('filtro-data').value;
    const agrupar = document.getElementById('group-barbeiro').checked;
    const token = localStorage.getItem('token');

    try {
        const res = await fetch(`/api/admin/pagamentos?data_pagamento=${data}&group=${agrupar}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        if (!res.ok) throw new Error('Erro na requisição')

        const result = await res.json();

        const tabela = document.getElementById('tabela-pagamentos');

        if (agrupar) {
            tabela.innerHTML = result.map(grupo =>
                `
                <div class="border p-4 rounded mb-4 shadow">
                <h3 class="font-bold text-lg mb-2">${grupo.barbeiro || 'Sem nome'}</h3>
                <p>Total: R$ ${grupo.total.toFixed(2)}</p>
                <ul class="mt-2 text-sm text-gray-600">
                    ${grupo.pagamentos.map(p => `<li>${p.forma_pagamento} - R$ ${p.valor}</li>`).join('')}
                </ul>
            </div>
                `
            ).join('');
        } else {
            tabela.innerHTML = `
            <table class="w-full text-left border">
                <thead class="bg-gray-200">
                    <tr>
                        <th class="p-2 border">Nome Cliente</th>
                        <th class="p-2 border">Valor</th>
                        <th class="p-2 border">Forma</th>
                        <th class="p-2 border">Data</th>
                        <th class="p-2 border">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    ${result.map(p => `
                        <tr>
                            <td class="p-2 border">${p.cliente?.nome || 'Desconhecido'}</td>
                            <td class="p-2 border">${p.valor}</td>
                            <td class="p-2 border">${p.forma_pagamento}</td>
                            <td class="p-2 border">${new Date(p.data_pagamento).toLocaleDateString('pt-BR')}</td>
                            <td class="p-2 border">
                                 <div class="flex gap-2">
                                    <button class="editar-pagamento text-blue-600" data-id="${p.id_pagamento}">✏️</button>
                                    <button class="excluir-pagamento text-red-600" data-id="${p.id_pagamento}">❌</button>
                                </div>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
        }

        //EDITAR
        document.querySelectorAll('.editar-pagamento').forEach(botao => {
            botao.addEventListener('click', (e) => {
                const id = e.target.dataset.id
                renderEditarPagamento(id)
            })
        })

        //EXCLUIR
        document.querySelectorAll('.excluir-pagamento').forEach(botao => {
            botao.addEventListener('click', async (e) => {
                const id = e.target.dataset.id;
                const confirmar = confirm('Tem certeza que deseja excluir este pagamento?')
                if (!confirmar) return;

                try {
                    const token = localStorage.getItem('token');
                    const response = await fetch(`/api/admin/pagamentos/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Accept': 'application/json'
                        }
                    });

                    if (!response.ok) {
                        const erro = await response.json();
                        throw new Error(erro.message || 'Erro ao excluir pagamento');
                    }

                    alert('Pagamento excluído com sucesso!');
                    renderSecaoPagamentos(); // Atualiza a listagem
                } catch (error) {
                    console.error(error);
                    alert('Erro ao excluir pagamento');
                }
            })
        })
    } catch (error) {

    }
}

async function renderEditarPagamento(id) {
    const container = document.getElementById('secao-conteudo');
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`/api/admin/pagamentos/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        });

        if (!response.ok) throw new Error('Erro ao buscar pagamento');

        const pagamento = await response.json();

        const dataFormatada = new Date(pagamento.data_pagamento).toISOString().slice(0,16);

        const html = `
        <div class="bg-white text-black rounded p-4 shadow-md max-w-md mx-auto">
            <h2 class="text-xl font-bold mb-4">Editar Pagamento</h2>

            <form id="form-editar-pagamento" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Agendamento</label>
                    <input
                        type="text"
                        value="${pagamento.cliente?.nome || 'Desconhecido'} - ${new Date(pagamento.agendamento?.data_hora || pagamento.data_pagamento).toLocaleString('pt-BR')}"
                        class="input w-full border p-2 rounded bg-gray-100 text-gray-500"
                        disabled
                    >
                </div>

                <input
                    type="number"
                    step="0.01"
                    name="valor"
                    value="${pagamento.valor}"
                    class="input w-full border p-2 rounded"
                    placeholder="Valor (R$)"
                    required
                >

                <select name="forma_pagamento" class="input w-full border p-2 rounded" required>
                    <option value="">Forma de Pagamento</option>
                    <option value="pix" ${pagamento.forma_pagamento === 'pix' ? 'selected' : ''}>PIX</option>
                    <option value="cartão" ${pagamento.forma_pagamento === 'cartão' ? 'selected' : ''}>Cartão</option>
                    <option value="dinheiro" ${pagamento.forma_pagamento === 'dinheiro' ? 'selected' : ''}>Dinheiro</option>
                </select>

                <label class="block font-medium mt-4 mb-1">Data do Pagamento</label>
                <input
                    type="datetime-local"
                    name="data_pagamento"
                    value="${dataFormatada}"
                    class="input w-full border p-2 rounded"
                    required
                >

                <button
                    type="submit"
                    class="bg-black text-white px-4 py-2 rounded w-full hover:bg-gray-800"
                >
                    Atualizar
                </button>
            </form>
        </div>
        `;

        container.innerHTML = html;

        const form = document.getElementById('form-editar-pagamento');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => {
                if (value !== '') data[key] = value; // Ignora campos vazios
            });

            try {

                if (data.data_pagamento) {
                    data.data_pagamento = formatDateToMySQL(data.data_pagamento)
                }
                const updateResponse = await fetch(`/api/admin/pagamentos/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });

                if (!updateResponse.ok) {
                    const erro = await updateResponse.json();
                    throw new Error(erro.message || 'Erro ao atualizar pagamento');
                }

                alert('Pagamento atualizado com sucesso!');
                renderSecaoPagamentos();

            } catch (err) {
                console.error(err);
                alert('Erro ao atualizar pagamento');
            }
        });

    } catch (err) {
        console.error(err);
        container.innerHTML = `<p class="text-red-600">Erro ao carregar pagamento para edição.</p>`;
    }
}

function formatDateToMySQL(datetimeLocal) {
    const dt = new Date(datetimeLocal);
    const pad = (n) => n.toString().padStart(2, '0');

    const year = dt.getFullYear();
    const month = pad(dt.getMonth() + 1);
    const day = pad(dt.getDate());
    const hours = pad(dt.getHours());
    const minutes = pad(dt.getMinutes());
    const seconds = pad(dt.getSeconds());

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function formatDateToMySQLLocal(datetimeLocal) {
    // Se já tem segundos, só troca o T por espaço
    if (datetimeLocal.length === 19) {
        // Exemplo: "2025-08-11T18:43:00"
        return datetimeLocal.replace('T', ' ');
    }
    // Se não tem segundos, adiciona ":00"
    // Exemplo: "2025-08-11T18:43"
    return datetimeLocal.replace('T', ' ') + ':00';
}
