//forms e titulo

const loginForm = document.getElementById('login-form')
const cadForm = document.getElementById('cad-form')
const tituloArea = document.getElementById('titulo-area')

//bts e links cadastro e login

const linkCadastro = document.getElementById('link-cadastro')
const linkLogin = document.getElementById('link-login')

const btLogin = document.getElementById('bt-login')
const btCadastro = document.getElementById('bt-cadastro')

function areaLoginHandler() {
    linkCadastro.addEventListener('click', (e) => {
        e.preventDefault()
        loginForm.classList.add('hidden')
        cadForm.classList.remove('hidden')
        tituloArea.innerHTML = 'Área de Cadastro'
    })

    linkLogin.addEventListener('click', (e) => {
        e.preventDefault()
        loginForm.classList.remove('hidden')
        cadForm.classList.add('hidden')
        tituloArea.innerHTML = 'Área de Login'
    })
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

export { areaLoginHandler, verificarIgualdade }
