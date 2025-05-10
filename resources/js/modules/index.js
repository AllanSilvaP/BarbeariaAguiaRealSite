import { ativarBotao, atualizarAutomatico } from './Ui.js';
import { ativarEventos } from './auth.js'

document.addEventListener('DOMContentLoaded', () => {
    atualizarAutomatico();
    ativarBotao();
    ativarEventos();
});
