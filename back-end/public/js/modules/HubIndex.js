import { ativarBotaoCad, ativarBotaoPesquisa, ativarBotaoEditar } from "./UiHub.js";
import { ativarBotaoCadReceber} from "./UiReceber.js";
import { ativarAdmin } from "./UiAdmin.js";

document.addEventListener('DOMContentLoaded', () => {
    ativarBotaoCad()
    ativarBotaoEditar()
    ativarBotaoPesquisa()
    ativarBotaoCad()
    ativarAdmin()
});
