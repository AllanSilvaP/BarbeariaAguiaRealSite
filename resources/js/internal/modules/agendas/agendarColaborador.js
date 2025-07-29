import TomSelect from 'tom-select'
import 'tom-select/dist/css/tom-select.default.min.css'

export async function agendarColaborador(tipoUsuario = null) {
    const token = localStorage.getItem('token')
    const botao = document.getElementById('agendar-corte')
    const modal = document.getElementById('modal-agendamento')
    const fecharModal = document.getElementById('fechar-modal')
    const nomeCliente = document.getElementById('nome-cliente')
    const selectBarbeiro = document.getElementById('select-barbeiro')
    const inputDataHora = document.getElementById('data-hora')
    const form = document.getElementById('form-agendar')

    if (!botao || !modal) return

    botao.addEventListener('click', async () => {
        const carregando = document.getElementById('carregando-formulario')
        carregando.classList.remove('hidden')
        modal.classList.remove('hidden')

        try {
            // Buscar dados do usuário logado
            const resMe = await fetch('/api/me', {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            if (!resMe.ok) throw new Error('Erro ao buscar perfil')
            const me = await resMe.json()
            let tipoUsuario = me.tipo_usuario

            if(tipoUsuario == 'administrador') {
                tipoUsuario = 'admin'
            }

            const resUsers = await fetch (`api/${tipoUsuario}/listar-usuarios`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })

            if(!resUsers.ok) throw new Error('Erro ao listar Usuarios')
            const usuariosNomes = await resUsers.json()

            const selectCliente = document.getElementById('select-cliente')
            selectCliente.innerHTML = Object.entries(usuariosNomes).map(([id,nome]) =>
                `<option value="${id}">${nome}</option>`
            ).join('')

            new TomSelect("#select-cliente", {
                create: false,
                sortField: {field: "text", direction: "asc"},
                placeholder: "Selecione um cliente...",
                allowEmptyOption: true,
                maxOptions: 10
            })

            // Buscar barbeiros
            const resBarbeiros = await fetch(`/api/${tipoUsuario}/barbeiros`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            if (!resBarbeiros.ok) throw new Error('Erro ao buscar barbeiros')
            const barbeiros = await resBarbeiros.json()

            selectBarbeiro.innerHTML = barbeiros.map(b =>
                `<option value="${b.id_usuario}">${b.nome}</option>`
            ).join('')

            // Buscar serviços
            const resServicos = await fetch(`/api/${tipoUsuario}/servicos`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            if (!resServicos.ok) throw new Error('Erro ao buscar serviços')
            const servicos = await resServicos.json()

            // Popular checkboxes
            const servicoContainer = document.getElementById('servicos-checkbox')
            servicoContainer.innerHTML = servicos.map(s =>
                `<label class="block text-black">
                    <input type="checkbox" name="servicos" value="${s.id_servico}" class="mr-2">
                    ${s.nome} - ${s.duracao_minutos} minutos
                </label>`
            ).join('')

        } catch (error) {
            console.error('Erro ao carregar formulário:', error)
            alert('Erro ao carregar formulário!')
        } finally {
            carregando.classList.add('hidden')
        }
    })

    // Fechar o modal
    fecharModal.addEventListener('click', () => {
        modal.classList.add('hidden')
    })

    // Submeter agendamento
    form.addEventListener('submit', async (e) => {
        e.preventDefault()

        const id_barbeiro = selectBarbeiro.value
        const data_hora = inputDataHora.value
        const servicosSelecionados = Array.from(
            document.querySelectorAll('input[name="servicos"]:checked')
        ).map(cb => cb.value)

        try {
            const res = await fetch(`/api/${tipoUsuario}/agendamentos`, {
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

            if (!res.ok) {
                const erro = await res.json()
                throw new Error(erro.message || 'Erro ao agendar')
            }

            alert('Agendamento realizado com sucesso!')
            modal.classList.add('hidden')
            form.reset()
        } catch (error) {
            console.error('Erro ao agendar:', error)
            alert('Erro ao agendar!')
        }
    })
}
