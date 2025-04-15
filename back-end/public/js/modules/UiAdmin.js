const painelEspecialidade = document.getElementById('hub-financeiro')

const btAdmin = document.getElementById('bt-admin')

function ativarAdmin () {
    btAdmin.addEventListener('click', () => {
        painelEspecialidade.innerHTML = `
        <div class="container">
            <button id="bt-admin-cad">Cadastrar Categoria</button>
        </div>
        `
    })
}

export {ativarAdmin}
