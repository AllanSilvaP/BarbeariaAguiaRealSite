import { cadastrarUsuario } from "./api.js"; 

export async function handleCadastro(event) {
    event.preventDefault(); // Evita o recarregamento da página

    // Captura os valores do formulário
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const tipoConta = document.getElementById("tipo-conta").value;

    if (!email || !senha || !tipoConta) {
        alert("Preencha todos os campos!");
        return;
    }

    try {
        const resultado = await cadastrarUsuario(email, senha, tipoConta);
        console.log("Usuário cadastrado:", resultado);
        alert("Cadastro realizado com sucesso!");
    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        alert("Erro ao cadastrar usuário.");
    }
}

// Função para adicionar o evento ao botão (caso precise ser chamado em outro arquivo)
export function ativarCadastro() {
    const botaoCad = document.getElementById("btCadastro");
    if (botaoCad) {
        botaoCad.addEventListener("click", handleCadastro);
    }
}