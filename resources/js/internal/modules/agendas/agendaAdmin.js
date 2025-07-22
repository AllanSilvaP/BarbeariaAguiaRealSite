export async function renderSecaoAgendaAdmin() {
    const token = localStorage.getItem('token')
    const container = document.getElementById('secao-conteudo')


    if (!token || !container) return

    try {
        const response = await fetch('/api/barbeiros-agendamentos', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        })

        if (!response.ok) throw new Error('Erro ao buscar Agendamentos!')
        const barbeiros = await response.json()

        container.innerHTML = ''

        if (barbeiros.length === 0) {
            container.innerHTML = '<p class="text-gray-400">Nenhum Agendamento encontrado.</p>'
            return
        }

        barbeiros.forEach(barbeiro => {
            const secao = document.createElement('div')
            secao.className = 'mb-6 bg-gray-900 p-4 rounded'

            secao.innerHTML = `<h3 class="text-xl mb-2 text-blue-400 font-bold">${barbeiro.nome}</h3>`

            if (!barbeiro.agendamentos.length) {
                secao.innerHTML += `<p class="text-gray-400">Sem agendamentos</p>`
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
                    `
                    secao.appendChild(card)
                })
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

    } catch (error) {
        console.error('Erro ao carregar agendamentos', error)
        container.innerHTML = '<p class="text-red-500">Erro ao carregar agendamentos.</p>'
    }
}
