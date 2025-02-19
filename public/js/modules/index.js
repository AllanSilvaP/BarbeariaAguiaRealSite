import { ativarBotao, atualizarAutomatico } from './Ui.js';
import { ativarCadastro } from './auth.js'

document.addEventListener('DOMContentLoaded', () => {
    atualizarAutomatico();
    ativarBotao();
    ativarCadastro();
});
