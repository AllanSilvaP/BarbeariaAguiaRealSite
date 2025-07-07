import {
    areaLoginHandler,
    verificarIgualdade,
    aplicarValidacoesCadastro
} from './modules/arealogin/loginHandler.js'

import { handleLoginSubmit } from './modules/arealogin/loginSubmit.js'

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
})
