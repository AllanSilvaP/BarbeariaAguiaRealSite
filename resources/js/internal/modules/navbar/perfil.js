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

        console.log(usuario)
        console.log(usuario.nome)
        spanNome.innerHTML = `<p>${usuario.nome}</p>`
    } catch (error) {
        console.error(error)
        spanNome.textContent = 'Usuario'
        console.log(usuario)
        alert('Erro ao pegar nome!')
    }

}
