import { cadastrarUsuario } from "./api.js";

export async function handleCadastro(event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;
    const tipo_usuario = document.getElementById("tipo_usuario").value;

    if (!email || !senha || !tipo_usuario) {
        alert("Preencha todos os campos!");
        return;
    }

    try {
        const resultado = await cadastrarUsuario( email, senha, tipo_usuario );
        console.log("Usuário cadastrado:", resultado);
        alert("Cadastro realizado com sucesso!");
    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        alert(`Erro ao cadastrar usuário: ${error.message}`);
    }
}


// Função para adicionar o evento ao botão (caso precise ser chamado em outro arquivo)
export function ativarCadastro() {
    const botaoCad = document.getElementById("btCadastro");
    if (botaoCad) {
        botaoCad.addEventListener("click", handleCadastro);
    }
}
