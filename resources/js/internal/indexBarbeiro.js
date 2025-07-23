import { getPerfil } from "./modules/navbar/perfil"
import { renderSecaoServicos } from "./modules/servicos/servico"
import { renderSecaoPagamentos } from "./modules/pagamentos.js/pagamento"
import { agendar } from "./modules/agendas/agendar"

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
                break;
            case 'Meus Agendamentos':
                break;

            default:
                container.innerHTML = `<p>Seção "${secao}" não encontrada.</p>`;
        }
    }

    //TELA PADRAO
    window.renderSecao('Meus Agendamentos')

    agendar()
})
