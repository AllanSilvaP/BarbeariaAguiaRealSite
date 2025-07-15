import { getPerfil } from "./modules/navbar/perfil"
import { renderSecaoBarbeiros } from "./modules/barbeiros/barbeiro"

document.addEventListener('DOMContentLoaded', () => {
    getPerfil()
    renderSecaoBarbeiros()
})
