const API_URL = "http://127.0.0.1:5500/front-end/public/areafunc.html/api"
export async function cadastrarUsuario (email, senha, tipoConta) {
    const response = await fetch(`${API_URL}/cadastrar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email, senha, tipo_conta: tipoConta})
    })

    return response.json()
}