import { areaLoginHandler, verificarIgualdade } from './modules/arealogin/loginHandler.js';

document.addEventListener('DOMContentLoaded', () => {
    //const
    const emailCad = document.getElementById('email-cad')
    const emailConfirm = document.getElementById('email-confirm')
    const senhaCad = document.getElementById('senha-cad')
    const senhaConfirm = document.getElementById('senha-confirm')

    areaLoginHandler()
    verificarIgualdade(emailCad, emailConfirm)
    verificarIgualdade(senhaCad, senhaConfirm)
});
