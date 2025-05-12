import { ativarBotao, atualizarAutomatico } from './modules/Ui.js';
import { ativarEventos } from './modules/auth.js'

document.addEventListener('DOMContentLoaded', () => {
    atualizarAutomatico();
    ativarBotao();
    ativarEventos();
});
