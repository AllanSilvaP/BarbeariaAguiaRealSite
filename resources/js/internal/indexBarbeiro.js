import { getPerfil } from "./modules/navbar/perfil"
import { renderSecaoAgendaBarbeiro } from "./modules/agendas/agendaBarbeiro"
import { renderSecaoPagamentosBarbeiro } from "./modules/pagamentos.js/pagamentoBarbeiro"
import { agendarCliente } from "./modules/agendas/agendarCliente"

document.addEventListener('DOMContentLoaded', () => {
    getPerfil()

    //RENDERIZA SECOES ADMIN
    window.renderSecao = function (secao) {
        const container = document.getElementById("secao-conteudo");
        if (!container) return;

        // Limpa o conteúdo atual
        container.innerHTML = '';

        // Decide qual conteúdo renderizar
        switch (secao) {
            case 'Meus Pagamentos':
                renderSecaoPagamentosBarbeiro()
                break;
            case 'Meus Agendamentos':
                renderSecaoAgendaBarbeiro()
                break;

            default:
                container.innerHTML = `<p>Seção "${secao}" não encontrada.</p>`;
        }
    }

    //TELA PADRAO
    window.renderSecao('Meus Agendamentos')

    agendarCliente()
})
