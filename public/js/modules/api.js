const API_URL = "http://127.0.0.1:8000";
export async function cadastrarUsuario(email, senha, tipoConta) {
    const response = await fetch(`${API_URL}/cadastrar`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: JSON.stringify({ email, senha, tipo_conta: tipoConta })
    })

    return response.json()
}
