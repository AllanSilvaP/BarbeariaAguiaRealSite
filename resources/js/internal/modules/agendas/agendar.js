export async function agendar() {
    const token = localStorage.getItem('token')
    const botao = document.getElementById('agendar-corte')
    const modal = document.getElementById('modal-agendamento')
    const fecharModal = document.getElementById('fechar-modal')
    const nomeCliente = document.getElementById('nome-cliente')
    const selectBarbeiro = document.getElementById('select-barbeiro')
    const selectServico = document.getElementById('select-servico')
    const inputDataHora = document.getElementById('data-hora'); // certifique-se que isso exista
    const form = document.getElementById('form-agendar');

    if(!botao || !modal) return

    botao.addEventListener('click', async () => {
        modal.classList.remove('hidden')

        try {
            const resMe = await fetch('/api/me', {
                headers: {'Authorization': `Bearer ${token}`}
            })

            if(!resMe.ok) throw new Error('Erro ao Pegar informações do Perfil')

            const me = await resMe.json()
            nomeCliente.value = me.nome

            const resBarbeiros = await fetch('/api/barbeiros', {
                   headers: { 'Authorization': `Bearer ${token}` }
            })

            if(!resBarbeiros.ok) throw new Error('Erro ao pegar informações dos barbeiros')
                const barbeiros = await resBarbeiros.json()

            selectBarbeiro.innerHTML = barbeiros.map(b =>
                `<option value="${b.id_usuario}">${b.nome}</option>`
            ).join('')

            const resServicos = await fetch('/api/servicos', {
                 headers: { 'Authorization': `Bearer ${token}` }
            })

            if(!resServicos.ok) throw new Error('Erro ao pegar informações do servico')
                const servicos = await resServicos.json()

            selectServico.innerHTML = servicos.map(s =>
                `<option value="${s.id_servico}">${s.nome} - ${s.duracao_minutos} Minutos</option>`
            ).join('')
        } catch (error) {
             console.error('Erro ao carregar dados do formulário:', error)
             alert('Erro ao carregar formulário!')
        }

        fecharModal.addEventListener('click', () => {
            modal.classList.add('hidden')
        })

        const form = document.getElementById('form-agendar')
        form.addEventListener('submit', async (e) => {
            e.preventDefault()

            const id_barbeiro = selectBarbeiro.value;
            const data_hora = inputDataHora.value
            const servicosSelecionados = Array.from(selectServico.selectedOptions).map(opt => opt.value)

            try {
                const res = await fetch('api/agendamentos', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id_barbeiro,
                        data_hora,
                        servicos: servicosSelecionados
                    })
                })

                if(!res.ok) {
                    const erro = await res.json();
                    throw new Error(erro.message || 'Erro ao agendar');
                }

                alert('Agendamento Realizado com sucesso!')
                modal.classList.add('hidden');
                form.reset()
            } catch (error) {
                console.error('Erro ao agendar:', error);
                alert('Erro ao agendar!');
            }
        })
    })
}
