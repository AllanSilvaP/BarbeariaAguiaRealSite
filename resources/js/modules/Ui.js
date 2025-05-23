// precosPorDia.js (ou o nome do seu arquivo UI)

// Objeto com os preços por dia
const precosPorDia = {
    segunda: { corte: 25, barba: 25, sombrancelha: 15, pigmentacao: 25, progressiva: 100, luzes: 150, nevou: 180, limpezaPele: 120 },
    terça: { corte: 25, barba: 25, sombrancelha: 15, pigmentacao: 25, progressiva: 100, luzes: 150, nevou: 180, limpezaPele: 120 },
    quarta: { corte: 25, barba: 25, sombrancelha: 15, pigmentacao: 25, progressiva: 100, luzes: 150, nevou: 180, limpezaPele: 120 },
    quinta: { corte: 30, barba: 30, sombrancelha: 15, pigmentacao: 25, progressiva: 100, luzes: 150, nevou: 180, limpezaPele: 120 },
    sexta: { corte: 30, barba: 30, sombrancelha: 15, pigmentacao: 25, progressiva: 100, luzes: 150, nevou: 180, limpezaPele: 120 },
    sábado: { corte: 30, barba: 30, sombrancelha: 15, pigmentacao: 25, progressiva: 100, luzes: 150, nevou: 180, limpezaPele: 120 },
    domingo: { corte: 30, barba: 30, sombrancelha: 15, pigmentacao: 25, progressiva: 100, luzes: 150, nevou: 180, limpezaPele: 120 },
};

// Seletores
const btDias = document.querySelectorAll('.bt-servicos button');
const servicos = document.querySelectorAll('.servico');
const btServicos = document.querySelectorAll('.bt-servicos ul button');

// Função para atualizar os preços com base no dia selecionado
function atualizaPrecos(diaSelecionado) {
    const precos = precosPorDia[diaSelecionado];

    if (!precos) {
        console.error(`Dia "${diaSelecionado}" não encontrado no objeto precosPorDia.`);
        return;
    }

    servicos.forEach(servico => {
        const nomeServico = servico.dataset.servico;
        const precoCard = servico.querySelector('.preco-card');

        if (precos[nomeServico] !== undefined) {
            precoCard.textContent = `R$${precos[nomeServico]}`;
        } else {
            console.warn(`Serviço "${nomeServico}" não encontrado para o dia "${diaSelecionado}".`);
            precoCard.textContent = "Preço indisponível";
        }
    });
}

// Função para deixar o botão ativo
function ativarBotao() {
    btServicos.forEach(button => {
        button.addEventListener('click', () => {
            btServicos.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
}

// Função para atualizar automaticamente os preços com base no dia atual
function atualizarAutomatico() {
    const hoje = new Date();
    const diasNomes = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];
    const diaAtual = diasNomes[hoje.getDay()];
    atualizaPrecos(diaAtual);
}

// Adiciona os event listeners aos botões de dias
btDias.forEach(botao => {
    botao.addEventListener('click', () => {
        const diaSelecionado = botao.getAttribute('data-dia');
        atualizaPrecos(diaSelecionado);
    });
});

// Exportações
export { precosPorDia, atualizaPrecos, ativarBotao, atualizarAutomatico };