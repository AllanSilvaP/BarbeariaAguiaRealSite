import { ativarBotaoCad, ativarBotaoPesquisa, ativarBotaoEditar } from "./UiHub.js";
import { ativarBotaoCadReceber} from "./UiReceber.js";

document.addEventListener('DOMContentLoaded', () => {
    ativarBotaoCad()
    ativarBotaoEditar()
    ativarBotaoPesquisa()
    ativarBotaoCad()
});
