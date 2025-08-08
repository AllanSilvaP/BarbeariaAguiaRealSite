
import IMask from 'imask';

function areaLoginHandler() {
    const loginForm = document.getElementById('login-form');
    const cadForm = document.getElementById('cad-form');
    const tituloArea = document.getElementById('titulo-area');

    const linkCadastro = document.getElementById('link-cadastro');
    const linkLogin = document.getElementById('link-login');

    if (linkCadastro && linkLogin && loginForm && cadForm && tituloArea) {
        linkCadastro.addEventListener('click', (e) => {
            e.preventDefault();
            loginForm.classList.add('hidden');
            cadForm.classList.remove('hidden');
            tituloArea.innerHTML = 'Área de Cadastro Cliente';
        });

        linkLogin.addEventListener('click', (e) => {
            e.preventDefault();
            loginForm.classList.remove('hidden');
            cadForm.classList.add('hidden');
            tituloArea.innerHTML = 'Área de Login';
        });
    } else {
        console.warn('Elementos do login/cadastro não encontrados.');
    }
}


function verificarIgualdade(inputOriginal, inputConfirmacao) {
    inputOriginal.addEventListener('input', verificar)
    inputConfirmacao.addEventListener('input', verificar)

    function verificar() {
        if (inputConfirmacao.value === inputOriginal.value && inputConfirmacao.value !== "") {
            inputConfirmacao.classList.remove('border-red-500', 'focus:ring-red-500')
            inputOriginal.classList.remove('border-red-500', 'focus:ring-red-500')
            inputConfirmacao.classList.add('border-green-500', 'focus:ring-green-500')
            inputOriginal.classList.add('border-green-500', 'focus:ring-green-500')
        } else {
            inputConfirmacao.classList.remove('border-green-500', 'focus:ring-green-500')
            inputOriginal.classList.remove('border-green-500', 'focus:ring-green-500')
            inputConfirmacao.classList.add('border-red-500', 'focus:ring-red-500')
            inputOriginal.classList.add('border-red-500', 'focus:ring-red-500')
        }
    }
}

function emailValido(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
}

function senhaValida(senha) {
    const temNumero = /\d/.test(senha)
    const tamanhoSuficiente = senha.length >= 6
    return temNumero && tamanhoSuficiente
}

function aplicarValidacoesCadastro() {
    const inputEmail = document.getElementById('email-cad')
    const erroEmail = document.getElementById('erro-email')

    const inputSenha = document.getElementById('senha-cad')
    const erroSenha = document.getElementById('erro-senha')

    inputEmail.addEventListener('input', () => {
        if (!emailValido(inputEmail.value)) {
            erroEmail.classList.remove('hidden')
            inputEmail.classList.add('border-red-500')
            inputEmail.classList.remove('border-green-500')
        } else {
            erroEmail.classList.add('hidden')
            inputEmail.classList.remove('border-red-500')
            inputEmail.classList.add('border-green-500')
        }
    })

    inputSenha.addEventListener('input', () => {
        if (!senhaValida(inputSenha.value)) {
            erroSenha.classList.remove('hidden')
            inputSenha.classList.add('border-red-500')
            inputSenha.classList.remove('border-green-500')
        } else {
            erroSenha.classList.add('hidden')
            inputSenha.classList.remove('border-red-500')
            inputSenha.classList.add('border-green-500')
        }
    })
}

function mascaraNumero (id = 'telefone') {
    const phoneInput = document.getElementById(id);;

    const opcoesMascara = {
        mask: [
            {
                mask: '(00) 0000-0000',
                lazy: false
            },
            {
                mask: '(00) 00000-0000',
                lazy: false
            }
        ]
    }

    const telefoneMascara = IMask(phoneInput, opcoesMascara)
}

export { mascaraNumero, areaLoginHandler, verificarIgualdade, aplicarValidacoesCadastro }
