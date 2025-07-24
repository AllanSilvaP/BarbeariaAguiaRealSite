export async function renderSecaoAgendaAdmin(dataSelecionada = null) {
    const token = localStorage.getItem('token')
    const container = document.getElementById('secao-conteudo')


    if (!token || !container) return

    const hoje = new Date().toISOString().split('T')[0]
    const dataConsulta = dataSelecionada || hoje

    try {
        const response = await fetch(`/api/barbeiros-agendamentos?data=${dataConsulta}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        })

        if (!response.ok) throw new Error('Erro ao buscar Agendamentos!')
        const barbeiros = await response.json()

        container.innerHTML = ''

        if (barbeiros.length === 0) {
            container.innerHTML = `
                <div class="flex items-center justify-between mb-4">
                <p class="text-gray-400">Sem agendamentos nesse dia</p>
                <div class="flex items-center">
                <label for="filtro-data" class="text-white mr-2">Escolher dia:</label>
                <input type="date" id="filtro-data" class="bg-gray-800 text-white rounded p-1">
                </div>
                </div>`

            const inputData = document.getElementById('filtro-data');
            if (inputData) {
                inputData.value = dataConsulta;
                inputData.addEventListener('change', (e) => {
                    dataSelecionada = e.target.value;
                    renderSecaoAgendaAdmin(dataSelecionada);
                });
            }
            return
        }

        barbeiros.forEach(barbeiro => {
            const secao = document.createElement('div')
            secao.className = 'mb-6 bg-gray-900 p-4 rounded'

            secao.innerHTML = `
            <div class="flex items-center justify-between mb-4">
            <h3 class="text-xl mb-2 text-blue-400 font-bold">${barbeiro.nome}</h3>
            <div class="flex items-center">
            <label for="filtro-data" class="text-white mr-2">Escolher dia:</label>
            <input type="date" id="filtro-data" class="bg-gray-800 text-white rounded p-1">
            </div>
            </div>
            `

            if (!barbeiro.agendamentos.length) {
                secao.innerHTML += `
                <div class="flex items-center justify-between mb-4">
                <p class="text-gray-400">Sem agendamentos</p>
                <div class="flex items-center">
                <label for="filtro-data" class="text-white mr-2">Escolher dia:</label>
                <input type="date" id="filtro-data" class="bg-gray-800 text-white rounded p-1">
                </div>
                </div>`
            } else {
                barbeiro.agendamentos.forEach(ag => {
                    const card = document.createElement('div')
                    card.className = 'p-3 mb-2 bg-gray-800 rounded shadow'

                    //status
                    const statusOptions = ['pendente', 'confirmado', 'cancelado', 'concluido']
                        .map(status => `<option value="${status}" ${ag.status === status ? 'selected' : ''}>${status}</option>`)

                    card.innerHTML = `
                    <p><strong>Cliente:</strong> ${ag.cliente?.nome || 'N/A'}</p>
                        <p><strong>Serviço:</strong> ${ag.servicos?.join(', ') || 'N/A'}</p>
                        <p><strong>Horário:</strong> ${new Date(ag.data_hora).toLocaleString('pt-BR')}</p>
                        <p><strong>Status:</strong> ${ag.status}</p>
                        <label class="block mt-2">
                            <span class="text-white font-medium">Status:</span>
                            <select data-id="${ag.id_agendamento}" class="select-status bg-gray-700 text-white rounded p-1 mt-1">
                                ${statusOptions}
                            </select>
                        </label>
                        <div class="flex gap-2 mt-2">
                        <button class="btn-editar bg-blue-500 text-white px-2 py-1 rounded" data-id="${ag.id_agendamento}">Editar</button>
                        <button class="btn-excluir bg-red-500 text-white px-2 py-1 rounded" data-id="${ag.id_agendamento}">Excluir</button>
                        </div>
                    `
                    secao.appendChild(card)
                })
            }

            const inputData = secao.querySelector('#filtro-data');

            if (inputData) {
                inputData.value = dataConsulta; // já define a data atual no input

                inputData.addEventListener('change', (e) => {
                    dataSelecionada = e.target.value;
                    renderSecaoAgendaAdmin(dataSelecionada); // recarrega os dados com nova data
                });
            }

            container.appendChild(secao)
        });




        document.querySelectorAll('.select-status').forEach(select => {
            select.addEventListener('change', async (e) => {
                const id = e.target.dataset.id
                const novoStatus = e.target.value
                const token = localStorage.getItem('token')

                try {
                    const response = await fetch(`/api/agendamentos/${id}`, {
                        method: 'PUT',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ status: novoStatus })
                    })

                    if (!response.ok) throw new Error('Erro ao atualizar status')
                    alert('Status atualizado com sucesso!')
                } catch (error) {
                    console.error(error)
                    alert('Falha ao atualizar status.')
                }
            })
        })


        document.querySelectorAll('.btn-excluir').forEach(button => {
            button.addEventListener('click', async (e) => {
                const id = e.target.dataset.id
                const confirmar = confirm('Deseja excluir esse agendamento?')

                if (!confirmar) return

                try {
                    const response = await fetch(`/api/agendamentos/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Accept': 'application/json',
                        }
                    })

                    if (!response.ok) throw new Error('Erro ao excluir agendamento')

                    alert('Agendamento excluído com sucesso!')
                    renderSecaoAgendaAdmin(dataConsulta)
                } catch (error) {
                    console.error(error)
                    alert('Esse agendamento ja foi pago. Não é possivel excluir')
                }
            })
        })

        document.querySelectorAll('.btn-editar').forEach(botao => {
            botao.addEventListener('click', async (e) => {
                const id = e.target.dataset.id

                // Busca o agendamento pelo ID
                try {
                    const res = await fetch(`/api/agendamentos/${id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Accept': 'application/json',
                        }
                    })

                    if (!res.ok) throw new Error('Erro ao buscar agendamento')

                    const agendamento = await res.json()
                    renderFormEditarAgendamento(agendamento)

                } catch (error) {
                    console.error(error)
                    alert('Erro ao carregar dados do agendamento.')
                }
            })
        })


    } catch (error) {
        console.error('Erro ao carregar agendamentos', error)
        container.innerHTML = '<p class="text-red-500">Erro ao carregar agendamentos.</p>'
    }
}

export async function renderFormEditarAgendamento(agendamento) {
    const token = localStorage.getItem('token')

    // Busca todos os serviços
    const resServicos = await fetch('/api/servicos', {
        headers: { 'Authorization': `Bearer ${token}` }
    })
    if (!resServicos.ok) {
        alert('Erro ao carregar serviços')
        return
    }
    const servicos = await resServicos.json()

    // Converte a data para input datetime-local
    const dataHoraFormatada = agendamento.data_hora.slice(0, 16)

    // Cria o HTML do formulário
    const container = document.getElementById('conteudo-edicao') // <div id="conteudo-edicao"></div>
    container.innerHTML = `
        <form id="form-editar-agendamento" class="space-y-4 p-4 bg-white shadow rounded max-w-md mx-auto">
            <h2 class="text-xl font-bold text-center">Editar Agendamento</h2>

            <label class="block">
                <span class="text-black font-semibold">Data e Hora:</span>
                <input type="datetime-local" id="editar-data-hora" class="w-full mt-1 p-2 border rounded"
                    value="${dataHoraFormatada}" required>
            </label>

            <div>
                <span class="text-black font-semibold">Serviços:</span>
                <div id="editar-servicos-checkbox" class="mt-1 space-y-1">
                    ${servicos.map(s => `
                        <label class="block text-black">
                            <input type="checkbox" name="servicos" value="${s.id_servico}" class="mr-2"
                                ${agendamento.servicos?.some(sel => sel.id_servico === s.id_servico) ? 'checked' : ''}>
                            ${s.nome} - ${s.duracao_minutos} min
                        </label>
                    `).join('')}
                </div>
            </div>

            <button type="submit" class="bg-blue-600 text-white py-2 px-4 rounded w-full hover:bg-blue-700">
                Salvar Alterações
            </button>
        </form>
    `

    // Lida com o submit
    const form = document.getElementById('form-editar-agendamento')
    form.addEventListener('submit', async (e) => {
        e.preventDefault()

        const data_hora = document.getElementById('editar-data-hora').value
        const servicosSelecionados = Array.from(
            document.querySelectorAll('input[name="servicos"]:checked')
        ).map(cb => cb.value)

        try {
            const res = await fetch(`/api/agendamentos/${agendamento.id_agendamento}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ data_hora, servicos: servicosSelecionados })
            })

            if (!res.ok) {
                const erro = await res.json()
                throw new Error(erro.message || 'Erro ao editar agendamento')
            }

            alert('Agendamento atualizado com sucesso!')
            container.innerHTML = '' // limpa o form
        } catch (err) {
            console.error(err)
            alert('Erro ao salvar alterações')
        }
    })
}

