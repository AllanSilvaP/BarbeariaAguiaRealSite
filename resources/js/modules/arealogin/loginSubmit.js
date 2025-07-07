export async function handleLoginSubmit(form) {
    const admin = 'administrador'
    const barbeiro = 'barbeiro'
    const cliente = 'cliente'

    form.addEventListener('submit', async function (e) {
        e.preventDefault()

        const email = document.getElementById('email').value
        const senha = document.getElementById('senha').value

        try {
            const response = await fetch(`/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json' // ❗ Corrigido: estava 'aplication'
                },
                body: JSON.stringify({ email, senha })
            })

            const data = await response.json()

            if (!response.ok) {
                alert(data.erro || 'Email ou senha inválidos')
                return
            }

            localStorage.setItem('token', data.token)

            const me = await fetch(`/api/me`, {
                headers: {
                    'Authorization': `Bearer ${data.token}`
                }
            })

            const usuario = await me.json()

            switch (usuario.tipo_usuario) {
                case admin:
                    window.location.href = '/hubadmin'
                    break
                case barbeiro:
                    window.location.href = '/hubbarbeiro'
                    break
                case cliente:
                    window.location.href = '/hubcliente'
                    break
                default:
                    alert('Tipo de usuário desconhecido')
            }
        } catch (err) {
            console.error(err)
            alert('Erro na comunicação')
        }
    })
}
