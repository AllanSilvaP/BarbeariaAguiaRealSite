import TomSelect from 'tom-select'
import 'tom-select/dist/css/tom-select.default.min.css'

// Data Bonita
import flatpickr from 'flatpickr'
import 'flatpickr/dist/flatpickr.min.css'
import { Portuguese } from 'flatpickr/dist/l10n/pt.js'

let tomSelectCliente = null

export async function agendarColaborador(tipoUsuario = null) {
    const token = localStorage.getItem('token')
    const botao = document.getElementById('agendar-corte')
    const modal = document.getElementById('modal-agendamento')
    const fecharModal = document.getElementById('fechar-modal')
    const selectBarbeiro = document.getElementById('select-barbeiro')
    const inputDataHora = document.getElementById('data-hora')
    const form = document.getElementById('form-agendar')

    if (!botao || !modal) return

    botao.addEventListener('click', async () => {
        const carregando = document.getElementById('carregando-formulario')
        carregando.classList.remove('hidden')
        modal.classList.add('hidden')

        try {
            // Buscar dados do usuário logado
            const resMe = await fetch('/api/me', {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            if (!resMe.ok) throw new Error('Erro ao buscar perfil')
            const me = await resMe.json()
            let tipoUsuario = me.tipo_usuario

            if (tipoUsuario == 'administrador') {
                tipoUsuario = 'admin'
            }

            const resUsers = await fetch(`api/${tipoUsuario}/listar-usuarios`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })

            if (!resUsers.ok) throw new Error('Erro ao listar Usuarios')
            const usuariosNomes = await resUsers.json()

            const selectCliente = document.getElementById('select-cliente')
            selectCliente.innerHTML = Object.entries(usuariosNomes).map(([id, nome]) =>
                `<option value="${id}">${nome}</option>`
            ).join('')

            if (tomSelectCliente) {
                tomSelectCliente.destroy()
                tomSelectCliente = null
            }

            tomSelectCliente = new TomSelect("#select-cliente", {
                create: false,
                sortField: { field: "text", direction: "asc" },
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

            flatpickr(inputDataHora, {
                enableTime: true,
                dateFormat: "d/m/Y H:i",
                minDate: "today",
                locale: Portuguese,
                time_24hr: true,
                defaultDate: new Date(),
                scrollInput: true
            })
            carregando.classList.add('hidden')
            modal.classList.remove('hidden')
        } catch (error) {
            carregando.classList.add('hidden')
            console.error('Erro ao carregar formulário:', error)
            alert('Erro ao carregar formulário!')
        }
    })

    // Fechar o modal
    fecharModal.addEventListener('click', () => {
        modal.classList.add('hidden')
    })

    // Submeter agendamento
    form.addEventListener('submit', async (e) => {
        e.preventDefault()

        const id_cliente = document.getElementById('select-cliente').value
        const id_barbeiro = selectBarbeiro.value
        const data_hora = inputDataHora.value
        const servicosSelecionados = Array.from(
            document.querySelectorAll('input[name="servicos"]:checked')
        ).map(cb => cb.value)

        if (!id_cliente) {
            alert('Por favor, selecione um cliente.')
            return
        }

        if (servicosSelecionados.length === 0) {
            alert('Por favor, selecione pelo menos um serviço.')
            return
        }

        try {
            const res = await fetch(`/api/${tipoUsuario}/agendamentos`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_cliente,
                    id_barbeiro,
                    data_hora,
                    servicos: servicosSelecionados
                })
            })

            if (!res.ok) {
                const erro = await res.json()
                if (res.status === 409 && erro.message === 'O barbeiro já possui um agendamento neste horário.') {
                    alert('Erro: horário já reservado. Por favor, escolha outro horário.')
                    return;
                } else {
                    throw new Error(erro.message || 'Erro ao agendar')
                }
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
