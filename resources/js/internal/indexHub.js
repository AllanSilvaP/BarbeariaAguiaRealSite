import { getPerfil } from "./modules/navbar/perfil"
import { renderSecaoBarbeiros } from "./modules/barbeiros/barbeiro"
import { renderSecaoUsuarios } from "./modules/usuarios/usuario"

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
            case 'Usuarios':
                renderSecaoUsuarios(container);
                break;
            case 'Barbeiros':
                renderSecaoBarbeiros(container);
                break;
            default:
                container.innerHTML = `<p>Seção "${secao}" não encontrada.</p>`;
        }
    }

    //TELA PADRAO
    window.renderSecao('Barbeiros')
})
