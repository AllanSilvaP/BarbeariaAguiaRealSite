export async function renderSecaoServicos() {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch('/api/admin/servicos', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        });

        if (!response.ok) throw new Error('Erro ao buscar servicos');

        const servicos = await response.json();

        const html = `
        <div class="bg-white text-black rounded p-4 shadow-md">
            <div class="flex justify-between items-center">
            <h2 class="text-xl font-bold mb-4">Servicos</h2>
            <button id="cad-usuario" class="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded">Cadastrar Servico</button>
            </div>
            ${servicos.length > 0 ? `
                <table class="w-full text-left border">
                    <thead class="bg-gray-200">
                        <tr>
                            <th class="p-2 border">Nome</th>
                            <th class="p-2 border">Descricao</th>
                            <th class="p-2 border">Preço</th>
                            <th class="p-2 border">Duracao Minutos</th>
                            <th class="p-2 border">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${servicos.map(s => `
                            <tr>
                                <td class="p-2 border">${s.nome}</td>
                                <td class="p-2 border">${s.descricao}</td>
                                <td class="p-2 border">${s.preco}</td>
                                <td class="p-2 border">${s.duracao_minutos}</td>
                                <td class="p-2 border flex gap-2">
                                    <button class="editar-servico text-blue-600" data-id="${s.id_servico}">✏️</button>
                                    <button class="excluir-servico text-red-600" data-id="${s.id_servico}">❌</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            ` : `<p class="text-gray-500">Nenhum servico cadastrado.</p>`}
        </div>`;

        document.getElementById('secao-conteudo').innerHTML = html;

        const botao = document.getElementById('cad-usuario');
        if (botao) {
            botao.addEventListener('click', () => renderCadServico())
        }

        //EDITAR
        document.querySelectorAll('.editar-servico').forEach(botao => {
            botao.addEventListener('click', (e) => {
                const id = e.target.dataset.id
                renderEditarServico(id)
            })
        })

        //EXCLUIR
        document.querySelectorAll('.excluir-servico').forEach(botao => {
            botao.addEventListener('click', async (e) => {
                const id = e.target.dataset.id;
                const confirmar = confirm('Tem certeza que deseja excluir este servico?')
                if (!confirmar) return;

                try {
                    const token = localStorage.getItem('token');
                    const response = await fetch(`/api/admin/servicos/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Accept': 'application/json'
                        }
                    });

                    if (!response.ok) {
                        const erro = await response.json();
                        throw new Error(erro.message || 'Erro ao excluir servico');
                    }
                    renderSecaoServicos(); // Atualiza a listagem
                } catch (error) {
                    console.error(error);
                    alert('Erro ao excluir servico');
                }
            })
        })

    } catch (error) {
        console.error(error);
        document.getElementById('secao-conteudo').innerHTML = `<p class="text-red-500">Erro ao carregar servicos.</p>`;
    }
}


function renderCadServico() {
    const container = document.getElementById('secao-conteudo')

    const html = `
    <div class="bg-white text-black rounded p-4 shadow-md max-w-md mx-auto relative">
        <h2 class="text-xl font-bold mb-4">Cadastrar Servico</h2>
        <button id="fechar-servico" class="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl font-bold">&times;</button>

        <form id="form-cad-usuario" class="space-y-4">
            <input type="text" name="nome" placeholder="Nome" class="input w-full border p-2 rounded" required>
            <textarea name="descricao" placeholder="Digite a descrição..." maxlenght="60" class="input w-full border p-2 rounded" required></textarea>
            <input type="integer" name="preco" placeholder="Preço" class="input w-full border p-2 rounded" required>
            <input type="integer" name="duracao_minutos" placeholder="Duração em minutos" class="input w-full border p-2 rounded" required>
            <button type="submit" class="bg-black text-white px-4 py-2 rounded w-full hover:bg-gray-800">
                Cadastrar
            </button>
        </form>
    </div>
    `;

    container.innerHTML = html;

    document.getElementById('fechar-servico').onclick = renderSecaoServicos;

    const form = document.getElementById('form-cad-usuario');

    form.addEventListener('submit', async (e) => {
        e.preventDefault()

        const token = localStorage.getItem('token')
        const formData = new FormData(form)

        const data = {};
        formData.forEach((value, key) => data[key] = value)

        try {
            const response = await fetch('/api/admin/servicos', {
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
                throw new Error(erro.message || 'Erro ao cadastrar Servico')
            }
            renderSecaoServicos()
        } catch (error) {
            console.error(error)
        }

    })
}

async function renderEditarServico(id) {
    const container = document.getElementById('secao-conteudo');
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`/api/admin/servicos/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        });

        if (!response.ok) throw new Error('Erro ao buscar servico');

        const s = await response.json();

        const html = `
        <div class="bg-white text-black rounded p-4 shadow-md max-w-md mx-auto relative">
            <h2 class="text-xl font-bold mb-4">Editar Servico</h2>
            <button id="fechar-servico" class="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl font-bold">&times;</button>

            <form id="form-editar-servico" class="space-y-4">
            <input type="text" name="nome" value="${s.nome}" class="input w-full border p-2 rounded" required>
            <textarea name="descricao" maxlenght="60" class="input w-full border p-2 rounded" required>
            ${s.descricao}
            </textarea>
            <input type="integer" name="preco" value="${s.preco}" class="input w-full border p-2 rounded" required>
            <input type="integer" name="duracao_minutos" value="${s.duracao_minutos}" class="input w-full border p-2 rounded" required>
                <button type="submit" class="bg-black text-white px-4 py-2 rounded w-full hover:bg-gray-800">
                    Atualizar
                </button>
            </form>
        </div>
        `;

        container.innerHTML = html;

        document.getElementById('fechar-servico').onclick = renderSecaoServicos;

        const form = document.getElementById('form-editar-servico');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => {
                if (value !== '') data[key] = value; // Ignora campos vazios
            });

            try {
                const updateResponse = await fetch(`/api/admin/servicos/${id}`, {
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
                    throw new Error(erro.message || 'Erro ao atualizar servico');
                }
                renderSecaoServicos();

            } catch (err) {
                console.error(err);
                alert('Erro ao atualizar servico');
            }
        });

    } catch (err) {
        console.error(err);
        container.innerHTML = `<p class="text-red-600">Erro ao carregar servico para edição.</p>`;
    }
}

