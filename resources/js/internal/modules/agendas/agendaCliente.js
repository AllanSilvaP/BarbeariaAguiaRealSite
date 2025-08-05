export async function renderBotoesBarbeiros(callback) {
    const token = localStorage.getItem('token');
    const container = document.getElementById('botoes-barbeiros');
    container.innerHTML = '';

    try {
        const res = await fetch('/api/cliente/barbeiros', {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const barbeiros = await res.json();

        const conteudo = document.createElement('div');
        conteudo.className = 'bg-gray-50 p-6 rounded-2xl shadow-lg mb-4';

        const titulo = document.createElement('h2');
        titulo.textContent = 'Escolher agenda';
        titulo.className = 'text-2xl font-bold text-gray-800 mb-4 border-b pb-2';

        const botoesContainer = document.createElement('div');
        botoesContainer.className = 'flex flex-wrap gap-2';

        barbeiros.forEach(barbeiro => {
            const btn = document.createElement('button');
            btn.textContent = `${barbeiro.nome} - ${barbeiro.telefone}`;
            btn.className = 'bg-gray-700 text-white p-2 rounded hover:bg-gray-600';
            btn.addEventListener('click', () => {
                window.barbeiroSelecionado = barbeiro.id_usuario;
                if (callback) callback(barbeiro.id_usuario);
            });
            botoesContainer.appendChild(btn);
        });

        conteudo.appendChild(titulo);
        conteudo.appendChild(botoesContainer);
        container.appendChild(conteudo);

    } catch (error) {
        console.error('Erro ao carregar barbeiros:', error);
        container.innerHTML = '<p class="text-red-500">Erro ao carregar barbeiros.</p>';
    }
}


export async function renderAgendaBarbeiroSelecionado(idBarbeiro, dataSelecionada) {
    const token = localStorage.getItem('token');
    const container = document.getElementById('secao-conteudo');
    container.innerHTML = '';

    container.innerHTML = `
    <div class="flex items-center justify-center h-40">
        <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-800"></div>
    </div>
        `;


    try {
        const res = await fetch(`/api/cliente/barbeiros/${idBarbeiro}/agenda?data=${dataSelecionada}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const agendamentos = await res.json();
        const horarios = gerarHorariosDia('09:00', '21:00');
        const user = await getPerfilCliente();

        const blocos = horarios.map(hora => {
            const horaCompleta = `${dataSelecionada}T${hora}:00`;
            const inicioAtual = new Date(horaCompleta);

            const agendamento = agendamentos.find(ag => {
                const inicioAg = new Date(ag.data_hora);
                const duracao = ag.servicos.reduce((total, s) => total + s.duracao_minutos, 0);
                const fimAg = new Date(inicioAg.getTime() + duracao * 60000);
                return inicioAtual >= inicioAg && inicioAtual < fimAg;
            });

            if (agendamento) {
                const ehUsuario = agendamento.cliente?.id === user?.id;
                const duracao = agendamento.servicos.reduce((total, s) => total + s.duracao_minutos, 0);
                const inicioAg = new Date(agendamento.data_hora);
                const fimAg = new Date(inicioAg.getTime() + duracao * 60000);

                const cor = ehUsuario
                    ? agendamento.status === 'pendente' ? 'bg-yellow-500' : 'bg-green-600'
                    : 'bg-gray-500';

                const label = ehUsuario ? 'Seu Agendamento' : 'Ocupado';
                const nomesDosServicos = agendamento.servicos.map(s => s.nome).join(' - ')

                return `
                    <div class="w-full p-3 rounded-2xl mb-2 text-white ${cor} shadow flex flex-col gap-1">
                    <div class="flex items-center justify-between">
                    <span class="text-sm font-semibold">${label} - ${agendamento.status}</span>
                    <span class="text-xs text-white/80">${hora} - ${formatarHora(fimAg)}</span>
                    </div>
                    <div class="text-sm text-white/90 italic">
                    ${nomesDosServicos}
                    </div>
                    </div>
                    `;
            }

            return `
                <div class="w-full p-3 rounded-2xl mb-2 bg-gray-100 text-gray-700 shadow-sm flex items-center justify-between hover:bg-gray-200 transition">
                    <span class="text-sm font-medium">${hora}</span>
                    <span class="text-xs text-gray-500 italic">Disponível</span>
                </div>
            `;
        });

        const data = new Date(dataSelecionada);
        data.setDate(data.getDate() + 1);
        const dataMaisUmFormatada = data.toLocaleDateString('pt-BR');


        const conteudoAgenda = `
            <div class="bg-white/90 p-6 rounded-2xl shadow-lg">
            <h2 class="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Agenda - ${dataMaisUmFormatada}</h2>
            <div class="flex flex-col gap-2">
            ${blocos.join('')}
            </div>
            </div>
            `;

        container.innerHTML = conteudoAgenda;


    } catch (error) {
        console.error('Erro ao renderizar agenda:', error);
        container.innerHTML = '<p class="text-red-500">Erro ao carregar agenda.</p>';
    }
}

function gerarHorariosDia(inicio, fim) {
    const result = [];
    let [h, m] = inicio.split(':').map(Number);
    const [fh, fm] = fim.split(':').map(Number);

    while (h < fh || (h === fh && m < fm)) {
        result.push(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`);
        m += 30;
        if (m >= 60) {
            m = 0;
            h++;
        }
    }

    return result;
}

function formatarHora(date) {
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}

async function getPerfilCliente() {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
        const res = await fetch('/api/me', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        });

        if (!res.ok) throw new Error('Usuário não encontrado');
        return await res.json();

    } catch (error) {
        console.error('Erro ao obter perfil do cliente:', error);
        return null;
    }
}


function formatarData(dataStr) {
    const data = new Date(dataStr);
    return data.toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });
}

export async function renderMeusAgendamentos(somenteUltimos7Dias = true) {
    const token = localStorage.getItem('token');
    const container = document.getElementById('secao-conteudo');
    container.innerHTML = `
        <div class="flex items-center justify-center h-40">
            <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-800"></div>
        </div>
    `;

    try {
        const query = somenteUltimos7Dias ? '?ultimos_7_dias=1' : '';
        const res = await fetch(`/api/cliente/me/agendamentos${query}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        let agendamentos = await res.json();

        agendamentos.sort((a, b) => new Date(b.data_hora) - new Date(a.data_hora));

        const blocos = agendamentos.map(agendamento => {
            const data = new Date(agendamento.data_hora);
            const servicos = agendamento.servicos.map(s => s.nome).join(', ');
            return `
                <div class="p-4 rounded-xl shadow bg-white mb-2 border-l-4 ${agendamento.status === 'pendente' ? 'border-yellow-500' : 'border-green-600'}">
                    <div class="flex justify-between items-center">
                        <div>
                            <p class="font-semibold">${data.toLocaleDateString()} - ${data.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                            <p class="text-sm text-gray-600 italic">${servicos}</p>
                        </div>
                        <span class="text-sm font-medium ${agendamento.status === 'pendente' ? 'text-yellow-600' : 'text-green-600'}">${agendamento.status}</span>
                    </div>
                </div>
            `;
        });

        container.innerHTML = `
            <div class="bg-white/90 p-6 rounded-2xl shadow-lg">
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-2xl font-bold text-gray-800">Meus Agendamentos</h2>
                    <button id="alternar-filtro" class="text-sm text-blue-600 hover:underline">
                        ${somenteUltimos7Dias ? 'Ver todos' : 'Ver últimos 7 dias'}
                    </button>
                </div>
                <div class="flex flex-col gap-2">
                    ${blocos.length ? blocos.join('') : '<p class="text-gray-500 text-sm">Nenhum agendamento encontrado.</p>'}
                </div>
            </div>
        `;

        // Corrigido: Arrow function com =>, e chamada recursiva correta
        document.getElementById('alternar-filtro')?.addEventListener('click', () => {
            renderMeusAgendamentos(!somenteUltimos7Dias);
        });

    } catch (error) {
        console.error('Erro ao renderizar agendamentos:', error);
        container.innerHTML = '<p class="text-red-500">Erro ao carregar agendamentos.</p>';
    }
}
