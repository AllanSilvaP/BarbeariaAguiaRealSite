//funcao mostrar preco certo

const precosPorDia = {
    segunda: { corte: 25, barba: 25, pigmentacao: 15, progressiva: 70, luzes: 120, nevou: 200, limpezaPele: 70, limpezaPele: 25, limpezaPele: 25},
    terca: { corte: 25, barba: 25, pigmentacao: 15, progressiva: 70, luzes: 120, nevou: 200, limpezaPele: 70, limpezaPele: 25, limpezaPele: 25},
    quarta: { corte: 25, barba: 25, pigmentacao: 15, progressiva: 70, luzes: 120, nevou: 200, limpezaPele: 70, limpezaPele: 25, limpezaPele: 25},
    quinta: { corte: 30, barba: 30, pigmentacao: 15, progressiva: 70, luzes: 120, nevou: 200, limpezaPele: 70, limpezaPele: 30, limpezaPele: 30},
    sexta: { corte: 30, barba: 30, pigmentacao: 15, progressiva: 70, luzes: 120, nevou: 200, limpezaPele: 70, limpezaPele: 30, limpezaPele: 30},
    sabado: { corte: 30, barba: 30, pigmentacao: 15, progressiva: 70, luzes: 120, nevou: 200, limpezaPele: 70, limpezaPele: 30, limpezaPele: 25},
    domingo: { corte: 30, barba: 30, pigmentacao: 15, progressiva: 70, luzes: 120, nevou: 200, limpezaPele: 70, limpezaPele: 30, limpezaPele: 25},
};

const btDias = document.querySelectorAll('.bt-servicos button');
const servicos = document.querySelectorAll('.servico');

function atualizaPrecos (diaSelecionado) {
    const precos = precosPorDia[diaSelecionado];

    servicos.forEach(servico => {
        const nomeServico = servico.dataset.servico;
        const precoCard = servico.querySelector('.preco-card')
        precoCard.textContent = `R$${precos[nomeServico]}`;
    });
}

btDias.forEach (botao => {
    botao.addEventListener ('click', () => {
        const diaSelecionado = botao.getAttribute('data-dia');
        atualizaPrecos(diaSelecionado)
    })
})

const hoje = new Date()
const diasNomes = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"]
const diaAtual = diasNomes [hoje.getDay()]
atualizaPrecos(diaAtual); 