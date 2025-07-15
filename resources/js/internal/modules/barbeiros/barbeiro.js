export async function renderSecaoBarbeiros() {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch('/api/barbeiros', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        });

        if (!response.ok) throw new Error('Erro ao buscar barbeiros');

        const barbeiros = await response.json();

        const html = `
        <div class="bg-white text-black rounded p-4 shadow-md">
            <h2 class="text-xl font-bold mb-4">Barbeiros</h2>
            ${barbeiros.length > 0 ? `
                <table class="w-full text-left border">
                    <thead class="bg-gray-200">
                        <tr>
                            <th class="p-2 border">Nome</th>
                            <th class="p-2 border">Email</th>
                            <th class="p-2 border">Telefone</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${barbeiros.map(b => `
                            <tr>
                                <td class="p-2 border">${b.nome}</td>
                                <td class="p-2 border">${b.email}</td>
                                <td class="p-2 border">${b.telefone}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            ` : `<p class="text-gray-500">Nenhum barbeiro cadastrado.</p>`}
        </div>`;

        document.getElementById('secao-barbeiro').innerHTML = html;

    } catch (error) {
        console.error(error);
        document.getElementById('secao-barbeiro').innerHTML = `<p class="text-red-500">Erro ao carregar barbeiros.</p>`;
    }
}
