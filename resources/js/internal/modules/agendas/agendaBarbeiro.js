export async function renderSecaoAgendaBarbeiro(dataSelecionada = null, page = 1) {
    const token = localStorage.getItem('token')
    const container = document.getElementById('secao-conteudo')

    if (!token || !container) return

    const hoje = new Date().toISOString().split('T')[0]
    let dataConsulta = dataSelecionada || hoje
    if (typeof dataConsulta !== 'string' && dataConsulta instanceof HTMLInputElement) {
        dataConsulta = dataConsulta.value
    }

    try {
        const response = await fetch(`/api/barbeiro/me/agendamentos?data=${dataConsulta}&page=${page}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        })

        if (!response.ok) throw new Error('Erro ao buscar agendamentos!')

        const json = await response.json()
        const agendamentos = json.data

        container.innerHTML = `
            <div class="flex items-center justify-between mb-4">
                <h2 class="text-xl font-bold text-white">Meus Agendamentos</h2>
                <div class="flex items-center">
                    <label for="filtro-data" class="text-white mr-2">Escolher dia:</label>
                    <input type="date" id="filtro-data" class="bg-gray-800 text-white rounded p-1">
                </div>
            </div>
        `

        const inputData = document.getElementById('filtro-data');
        if (inputData) {
            inputData.value = dataConsulta;
            inputData.addEventListener('change', (e) => {
                dataSelecionada = e.target.value;
                renderSecaoAgendaBarbeiro(dataSelecionada);
            });
        }

        if (agendamentos.length === 0) {
            container.innerHTML += `<p class="text-gray-400">Sem agendamentos neste dia.</p>`

            const inputData = document.getElementById('filtro-data');
            if (inputData) {
                inputData.value = dataConsulta;
                inputData.addEventListener('change', (e) => {
                    dataSelecionada = e.target.value;
                    renderSecaoAgendaBarbeiro(dataSelecionada);
                });
            }
            return
        }

        agendamentos.forEach(ag => {
            const card = document.createElement('div')
            card.className = 'p-3 mb-2 bg-gray-800 rounded shadow'

            const statusOptions = ['pendente', 'confirmado', 'cancelado', 'concluido']
                .map(status => `<option value="${status}" ${ag.status === status ? 'selected' : ''}>${status}</option>`)
                .join('')

            card.innerHTML = `
                <p><strong>Cliente:</strong> ${ag.cliente?.nome || 'N/A'}</p>
                <p><strong>Serviço:</strong> ${ag.servicos?.map(s => s.nome).join(', ') || 'N/A'}</p>
                <p><strong>Horário:</strong> ${new Date(ag.data_hora).toLocaleString('pt-BR')}</p>
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

            container.appendChild(card)
        })

        // Eventos para mudar status
        document.querySelectorAll('.select-status').forEach(select => {
            select.addEventListener('change', async (e) => {
                const id = e.target.dataset.id
                const novoStatus = e.target.value

                try {
                    const res = await fetch(`/api/barbeiro/agendamentos/${id}`, {
                        method: 'PUT',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ status: novoStatus })
                    })

                    if (!res.ok) throw new Error('Erro ao atualizar status')
                    alert('Status atualizado com sucesso!')
                } catch (error) {
                    console.error(error)
                    alert('Falha ao atualizar status.')
                }
            })
        })

        // Eventos para excluir
        document.querySelectorAll('.btn-excluir').forEach(button => {
            button.addEventListener('click', async (e) => {
                const id = e.target.dataset.id
                if (!confirm('Deseja excluir esse agendamento?')) return

                try {
                    const res = await fetch(`/api/barbeiro/agendamentos/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Accept': 'application/json',
                        }
                    })

                    if (!res.ok) throw new Error('Erro ao excluir agendamento')
                    alert('Agendamento excluído com sucesso!')
                    renderSecaoAgendaBarbeiro(dataConsulta)
                } catch (error) {
                    console.error(error)
                    alert('Esse agendamento já foi pago. Não é possível excluir.')
                }
            })
        })

        // Eventos para editar
        document.querySelectorAll('.btn-editar').forEach(button => {
            button.addEventListener('click', async (e) => {
                const id = e.target.dataset.id

                try {
                    const res = await fetch(`/api/barbeiro/agendamentos/${id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Accept': 'application/json'
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
    const resServicos = await fetch('/api/barbeiro/servicos', {
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
            const res = await fetch(`/api/barbeiro/agendamentos/${agendamento.id_agendamento}`, {
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
