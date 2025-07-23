export async function renderSecaoPagamentos() {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch('/api/pagamentos', {
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
            ${pagamentos.length > 0 ? `
                <table class="w-full text-left border">
                    <thead class="bg-gray-200">
                        <tr>
                            <th class="p-2 border">Nome Cliente</th>
                            <th clasas="p-2 border">Valor</th>
                            <th class="p-2 border">Forma de Pagamento</th>
                            <th class="p-2 border">Data Pagamento</th>
                            <th class="p-2 border">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${pagamentos.map(p => `
                            <tr>
                                <td class="p-2 border">${p.cliente?.nome || 'Desconhecido'}</td>
                                <td class="p-2 border">${p.valor}</td>
                                <td class="p-2 border">${p.forma_pagamento}</td>
                                <td class="p-2 border">${p.data_pagamento || '-'}</td>
                                <td class="p-2 border flex gap-2">
                                    <button class="editar-pagamento text-blue-600" data-id="${p.id_pagamento}">✏️</button>
                                    <button class="excluir-pagamento text-red-600" data-id="${p.id_pagamento}">❌</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            ` : `<p class="text-gray-500">Nenhum pagamento cadastrado.</p>`}
        </div>`;

        document.getElementById('secao-conteudo').innerHTML = html;

        const botao = document.getElementById('cad-usuario');
        if (botao) {
            botao.addEventListener('click', () => renderCadPagamento())
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
                    const response = await fetch(`/api/pagamentos/${id}`, {
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
        console.error(error);
        document.getElementById('secao-conteudo').innerHTML = `<p class="text-red-500">Erro ao carregar pagamentos.</p>`;
    }
}


async function renderCadPagamento() {
    const container = document.getElementById('secao-conteudo')

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
            <button type="submit" class="bg-black text-white px-4 py-2 rounded w-full hover:bg-gray-800">
                Cadastrar
            </button>
        </form>
    </div>
    `;

    container.innerHTML = html;


    const selectAgendamento = document.getElementById('select-agendamento')
    const token = localStorage.getItem('token')

    const resAg = await fetch('/api/agendamentos-concluidos', {
        headers: { 'Authorization': `Bearer ${token}` }
    })

    const agendamentos = await resAg.json()

    const resPag = await fetch('/api/pagamentos', {
        headers: { 'Authorization': `Bearer ${token}` }
    })
    const pagamentos = await resPag.json()

    const idsPagos = new Set(pagamentos.map(p => p.id_agendamento))
    const agendamentosDisponiveis = agendamentos.filter(ag => !idsPagos.has(ag.id_agendamento))

    selectAgendamento.innerHTML += agendamentosDisponiveis.map(ag => `
        <option value="${ag.id_agendamento}">
            ${ag.cliente.nome} - ${new Date(ag.data_hora).toLocaleString('pt-BR')}
        </option>
        `).join('')

    const form = document.getElementById('form-cad-pagamento');

    form.addEventListener('submit', async (e) => {
        e.preventDefault()

        const token = localStorage.getItem('token')
        const formData = new FormData(form)

        const data = {};
        formData.forEach((value, key) => data[key] = value)

        const agendamentoSelecionado = agendamentos.find(ag => ag.id_agendamento == data.id_agendamento)

        if (!agendamentoSelecionado) {
            alert("Agendamento inválido");
            return;
        }

        const payload = {
            id_agendamento: data.id_agendamento,
            id_cliente: agendamentoSelecionado.id_cliente || 'N|A',
            valor: data.valor,
            forma_pagamento: data.forma_pagamento,
        }
        try {
            const response = await fetch('/api/pagamentos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                },
                body: JSON.stringify(payload),
            })

            if (!response.ok) {
                const erro = await response.json()
                throw new Error(erro.message || 'Erro ao cadastrar Pagamento')
            }

            console.log(response.json())
            alert('Pagamento cadastrado com Sucesso!');
            renderSecaoPagamentos()
        } catch (error) {
            console.error(error)
        }

    })
}

async function renderEditarPagamento(id) {
    const container = document.getElementById('secao-conteudo');
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`/api/pagamentos/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        });

        if (!response.ok) throw new Error('Erro ao buscar pagamento');

        const pagamento = await response.json();

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
                const updateResponse = await fetch(`/api/pagamentos/${id}`, {
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

