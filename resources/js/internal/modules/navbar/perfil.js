export async function getPerfil() {
    const token = localStorage.getItem('token')
    const spanNome = document.getElementById('nome-usuario')

    if(!token || !spanNome) return

    try {
        const me = await fetch('/api/me', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        })

        if (!me.ok) throw new Error('Usuario nao encontrado!')
        const usuario = await me.json()
        spanNome.innerHTML = `<p>Olá, ${usuario.nome}</p>`
    } catch (error) {
        console.error(error)
        spanNome.textContent = 'Usuario'
        alert('Erro ao pegar nome!')
    }

}
