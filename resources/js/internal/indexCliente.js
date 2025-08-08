import { getPerfil } from "./modules/navbar/perfil";
import { renderBotoesBarbeiros, renderAgendaBarbeiroSelecionado, renderMeusAgendamentos } from "./modules/agendas/agendaCliente";
import { agendarCliente } from "./modules/agendas/agendarCliente";
import { verificarInatividade } from "../modules/arealogin/inatividade"

document.addEventListener('DOMContentLoaded', async () => {
    verificarInatividade();
    // Escuta evento de seleção de data do Alpine
    document.addEventListener('dia-selected', (event) => {
        const data = event.detail.toISOString().split('T')[0];
        window.dataSelecionada = data;

        const idBarbeiro = window.barbeiroSelecionado;
        if (idBarbeiro && typeof window.renderSecao === 'function') {
            window.renderSecao('Agendas');
        }
    });

    getPerfil();

    // Renderiza os botões de barbeiros e carrega agenda do primeiro clique
    await renderBotoesBarbeiros((idBarbeiro) => {
        window.barbeiroSelecionado = idBarbeiro;
        const data = window.dataSelecionada || new Date().toISOString().split('T')[0];
        renderAgendaBarbeiroSelecionado(idBarbeiro, data);
    });

    // RENDERIZA SEÇÕES ADMIN
    window.renderSecao = function (secao) {
        const container = document.getElementById("secao-conteudo");
        if (!container) return;

        container.innerHTML = '';

        switch (secao) {
            case 'Meus Agendamentos':
                renderMeusAgendamentos()
                break;

            case 'Agendas':
                const idBarbeiro = window.barbeiroSelecionado;
                const data = window.dataSelecionada || new Date().toISOString().split('T')[0];
                if (idBarbeiro && data) {
                    renderAgendaBarbeiroSelecionado(idBarbeiro, data);
                } else {
                    container.innerHTML = `<p>Barbeiro ou data não selecionados.</p>`;
                }
                break;

            default:
                container.innerHTML = `<p>Seção "${secao}" não encontrada.</p>`;
        }
    };

    window.renderSecao('Meus Agendamentos')

    agendarCliente();
});
