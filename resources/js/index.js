import {
    areaLoginHandler,
    verificarIgualdade,
    aplicarValidacoesCadastro,
    mascaraNumero
} from './modules/arealogin/loginHandler.js'

import { handleLoginSubmit } from './modules/arealogin/loginSubmit.js'
import { handleCadastroSubmit } from './modules/arealogin/cadastroSubmit.js'

document.addEventListener('DOMContentLoaded', () => {
    const emailCad = document.getElementById('email-cad')
    const emailConfirm = document.getElementById('email-confirm')
    const senhaCad = document.getElementById('senha-cad')
    const senhaConfirm = document.getElementById('senha-confirm')

    areaLoginHandler()
    verificarIgualdade(emailCad, emailConfirm)
    verificarIgualdade(senhaCad, senhaConfirm)
    aplicarValidacoesCadastro()

    //Login
    const form = document.getElementById('form-login')
    if(form) {
        handleLoginSubmit(form)
    }

    //cadastro
    const formCad = document.getElementById('form-cadastro')
    if(formCad) {
        handleCadastroSubmit(formCad)
    }

    //mascara telefone
    mascaraNumero()
})
