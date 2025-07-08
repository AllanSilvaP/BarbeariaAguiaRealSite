export async function handleCadastroSubmit (form) {
    //CADASTRO DE CLIENTE
    const cliente = 'cliente'

    form.addEventListener('submit', async function (e) {
        e.preventDefault()

        const nome = document.getElementById('nome').value
        const telefone = document.getElementById('telefone').value
        const email = document.getElementById('email-cad').value
        const senha = document.getElementById('senha-cad').value
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                } ,
                body: JSON.stringify({nome, telefone, email, senha, tipo_usuario: cliente})
            })

            const data = await response.json()

            if(!response.ok) {
                alert(data.erro || 'Credenciais Invalidas')
                return
            }

            alert('Conta Cadastrada com sucesso!')
        } catch (err) {
            console.error(err)
            alert('Erro no Cadastro. Verifique novamente!')
        }
    })
}
