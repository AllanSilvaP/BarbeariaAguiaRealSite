import { areaLoginHandler, emailValido, verificarIgualdade } from './modules/arealogin/loginHandler.js';

document.addEventListener('DOMContentLoaded', () => {
    //const
    const emailCad = document.getElementById('email-cad')
    const emailConfirm = document.getElementById('email-confirm')
    const senhaCad = document.getElementById('senha-cad')
    const senhaConfirm = document.getElementById('senha-confirm')

    //TROCAR PAGINA DE CADASTRO E LOGIN
    areaLoginHandler()
    //VERIFICA O EMAIL E SENHA IGUAIS NO CADASTRO
    verificarIgualdade(emailCad, emailConfirm)
    verificarIgualdade(senhaCad, senhaConfirm)
    //VERIFICAR SE ATENDE A REGRAS NO EMAIL E SENHA
    emailValido()
});
