import { getPerfil } from "./modules/navbar/perfil"
import { renderSecaoBarbeiros } from "./modules/barbeiros/barbeiro"
import { renderSecaoUsuarios } from "./modules/usuarios/usuario"

document.addEventListener('DOMContentLoaded', () => {
    getPerfil()
    renderSecaoBarbeiros()
    renderSecaoUsuarios()
})
