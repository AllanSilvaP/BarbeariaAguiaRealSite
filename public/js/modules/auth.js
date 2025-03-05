import { cadastrarUsuario, loginUsuario } from "./api.js";

async function handleCadastro(event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;
    const tipo_usuario = document.getElementById("tipo_usuario").value;

    if (!email || !senha || !tipo_usuario) {
        alert("Preencha todos os campos!");
        return;
    }

    try {
        await cadastrarUsuario(email, senha, tipo_usuario);
        alert("Cadastro realizado com sucesso!");
    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        alert(`Erro ao cadastrar usuário: ${error.message}`);
    }
}

async function handleUsuario(event) {
    event.preventDefault()

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;
    const tipo_usuario = document.getElementById("tipo_usuario").value;

    if (!email || !senha || !tipo_usuario) {
        alert("Preencha todos os campos!");
        return;
    }
    try {
        const response = await loginUsuario(email, senha, tipo_usuario);

        if (response) {
            //localStorage.setItem("authToken", response.Token)
            alert("Login Realizado com sucesso");
            window.location.href = "http://127.0.0.1:8000/hub";
        }
    } catch (error) {
        console.error("Erro ao tentar realizar Login:", error);
        alert(`Erro ao tentar realizar Login: ${error.message}`);
    }
}



// Função para adicionar o evento ao botão (caso precise ser chamado em outro arquivo)
function ativarEventos() {
    const botaoCad = document.getElementById("btCadastro");
    if (botaoCad) {
        botaoCad.addEventListener("click", handleCadastro);
    }

    const botaoLogin = document.getElementById('btLogin')
    if (botaoLogin) {
        botaoLogin.addEventListener("click", handleUsuario)
    }
}

export { handleCadastro, handleUsuario, ativarEventos }
