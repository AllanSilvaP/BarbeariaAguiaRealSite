const API_URL = "http://127.0.0.1:8000";
export async function cadastrarUsuario(email, senha, tipo_usuario) {
    try {
        const response = await fetch(`${API_URL}/api/cadastrar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, senha, tipo_usuario })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Erro desconhecido ao cadastrar usuário");
        }

        return data;
    } catch (error) {
        console.error("Erro na requisição", error);
        throw error;
    }
}
