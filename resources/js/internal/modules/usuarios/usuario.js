export async function renderSecaoUsuarios() {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch('/api/usuarios', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        });

        if (!response.ok) throw new Error('Erro ao buscar usuarios');

        const usuarios = await response.json();

        const html = `
        <div class="bg-white text-black rounded p-4 shadow-md">
            <div class="flex justify-between items-center">
            <h2 class="text-xl font-bold mb-4">Usuarios</h2>
            <button id="cad-usuario" class="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded">Cadastrar Usuario</button>
            </div>
            ${usuarios.length > 0 ? `
                <table class="w-full text-left border">
                    <thead class="bg-gray-200">
                        <tr>
                            <th class="p-2 border">Nome</th>
                            <th class="p-2 border">Email</th>
                            <th class="p-2 border">Telefone</th>
                            <th class="p-2 border">Tipo Usuario</th>
                            <th class="p-2 border">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${usuarios.map(b => `
                            <tr>
                                <td class="p-2 border">${b.nome}</td>
                                <td class="p-2 border">${b.email}</td>
                                <td class="p-2 border">${b.telefone}</td>
                                <td class="p-2 border">${b.tipo_usuario}</td>
                                <td class="p-2 border flex gap-2">
                                    <button class="editar-barbeiro text-blue-600" data-id="${b.id_usuario}">✏️</button>
                                    <button class="excluir-barbeiro text-red-600" data-id="${b.id_usuario}">❌</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            ` : `<p class="text-gray-500">Nenhum barbeiro cadastrado.</p>`}
        </div>`;

        document.getElementById('secao-usuario').innerHTML = html;

        const botao = document.getElementById('cad-usuario');
        if (botao) {
            botao.addEventListener('click', () => renderCadBarbeiro())
        }

        //EDITAR
        document.querySelectorAll('.editar-barbeiro').forEach(botao => {
            botao.addEventListener('click', (e) => {
                const id = e.target.dataset.id
                renderEditarUsuario(id)
            })
        })

        //EXCLUIR
        document.querySelectorAll('.excluir-barbeiro').forEach(botao => {
            botao.addEventListener('click', async (e) => {
                const id = e.target.dataset.id;
                const confirmar = confirm('Tem certeza que deseja excluir este barbeiro?')
                if (!confirmar) return;

                try {
                    const token = localStorage.getItem('token');
                    const response = await fetch(`/api/usuarios/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Accept': 'application/json'
                        }
                    });

                    if (!response.ok) {
                        const erro = await response.json();
                        throw new Error(erro.message || 'Erro ao excluir barbeiro');
                    }

                    alert('Barbeiro excluído com sucesso!');
                    renderSecaoUsuarios(); // Atualiza a listagem
                } catch (error) {
                    console.error(error);
                    alert('Erro ao excluir barbeiro');
                }
            })
        })

    } catch (error) {
        console.error(error);
        document.getElementById('secao-usuario').innerHTML = `<p class="text-red-500">Erro ao carregar usuarios.</p>`;
    }
}


function renderCadBarbeiro() {
    const container = document.getElementById('secao-usuario')

    const html = `
    <div class="bg-white text-black rounded p-4 shadow-md max-w-md mx-auto">
        <h2 class="text-xl font-bold mb-4">Cadastrar Usuario</h2>

        <form id="form-cad-usuario" class="space-y-4">
            <input type="text" name="nome" placeholder="Nome" class="input w-full border p-2 rounded" required>
            <input type="email" name="email" placeholder="Email" class="input w-full border p-2 rounded" required>
            <input type="tel" name="telefone" placeholder="Telefone" class="input w-full border p-2 rounded" required>
            <input type="hidden" name="tipo_usuario" value="Barbeiro">
            <input type="password" name="senha" placeholder="Senha" class="input w-full border p-2 rounded" required>

            <button type="submit" class="bg-black text-white px-4 py-2 rounded w-full hover:bg-gray-800">
                Cadastrar
            </button>
        </form>
    </div>
    `;

    container.innerHTML = html;

    const form = document.getElementById('form-cad-usuario');

    form.addEventListener('submit', async (e) => {
        e.preventDefault()

        const token = localStorage.getItem('token')
        const formData = new FormData(form)

        const data = {};
        formData.forEach((value, key) => data[key] = value)

        try {
            const response = await fetch('/api/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                const erro = await response.json()
                throw new Error(erro.message || 'Erro ao cadastrar Barbeiro')
            }

            alert('Barbeiro cadastrado com Sucesso!');
            renderSecaoUsuarios()
        } catch (error) {
            console.error(error)
        }

    })
}

async function renderEditarUsuario(id) {
    const container = document.getElementById('secao-usuario');
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`/api/usuarios/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        });

        if (!response.ok) throw new Error('Erro ao buscar barbeiro');

        const b = await response.json();

        const html = `
        <div class="bg-white text-black rounded p-4 shadow-md max-w-md mx-auto">
            <h2 class="text-xl font-bold mb-4">Editar Barbeiro</h2>

            <form id="form-editar-barbeiro" class="space-y-4">
                <input type="text" name="nome" value="${b.nome}" class="input w-full border p-2 rounded" required>
                <input type="email" name="email" value="${b.email}" class="input w-full border p-2 rounded" required>
                <input type="tel" name="telefone" value="${b.telefone}" class="input w-full border p-2 rounded" required>
                <input type="password" name="senha" placeholder="Nova senha (opcional)" class="input w-full border p-2 rounded">
                <input type="hidden" name="tipo_usuario" value="Barbeiro">

                <button type="submit" class="bg-black text-white px-4 py-2 rounded w-full hover:bg-gray-800">
                    Atualizar
                </button>
            </form>
        </div>
        `;

        container.innerHTML = html;

        const form = document.getElementById('form-editar-barbeiro');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => {
                if (value !== '') data[key] = value; // Ignora campos vazios
            });

            try {
                const updateResponse = await fetch(`/api/usuarios/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });

                if (!updateResponse.ok) {
                    const erro = await updateResponse.json();
                    throw new Error(erro.message || 'Erro ao atualizar barbeiro');
                }

                alert('Barbeiro atualizado com sucesso!');
                renderSecaoUsuarios();

            } catch (err) {
                console.error(err);
                alert('Erro ao atualizar barbeiro');
            }
        });

    } catch (err) {
        console.error(err);
        container.innerHTML = `<p class="text-red-600">Erro ao carregar barbeiro para edição.</p>`;
    }
}

