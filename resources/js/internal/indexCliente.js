import { getPerfil } from "./modules/navbar/perfil"
import { renderBotoesBarbeiros, renderAgendaBarbeiroSelecionado } from "./modules/agendas/agendaCliente"
import { agendarCliente } from "./modules/agendas/agendarCliente"

document.addEventListener('DOMContentLoaded', async () => {
    getPerfil()

    await renderBotoesBarbeiros((idBarbeiro) => {
        const data = getDataSelecionada()
        renderAgendaBarbeiroSelecionado(idBarbeiro, data)
    })

    function getDataSelecionada() {
        const diaSelecionado = document.querySelector('[x-data] [x-on\\:click^="select"]')?.parentElement?.__x?.$data;
        if (diaSelecionado?.days && typeof diaSelecionado.selected === 'number') {
            return diaSelecionado.days[diaSelecionado.selected]?.iso ?? new Date().toISOString().split('T')[0];
        }
        return new Date().toISOString().split('T')[0]; // fallback
    }

    //RENDERIZA SECOES ADMIN
    window.renderSecao = function (secao) {
        const container = document.getElementById("secao-conteudo");
        if (!container) return;

        // Limpa o conteúdo atual
        container.innerHTML = '';

        // Decide qual conteúdo renderizar
        switch (secao) {
            case 'Meus Agendamentos':
                break;

            case 'Agendas':
                const idBarbeiro = window.barbeiroSelecionado;
                const data = getDataSelecionada();
                if (idBarbeiro && data) {
                    renderAgendaBarbeiroSelecionado(idBarbeiro, data);
                } else {
                    container.innerHTML = `<p>Barbeiro ou data não selecionados.</p>`;
                }
                break;

            default:
                container.innerHTML = `<p>Seção "${secao}" não encontrada.</p>`;
        }
    }
    agendarCliente()
})
