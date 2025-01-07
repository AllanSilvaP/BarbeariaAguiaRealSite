//funcao mostrar preco certo

const precosPorDia = {
    segunda: { corte: 25, barba: 25, sombrancelha: 15, pigmentacao: 15, progressiva: 70, luzes: 120, nevou: 200, limpezaPele: 70},
    terça: { corte: 25, barba: 25, sombrancelha: 15, pigmentacao: 15, progressiva: 70, luzes: 120, nevou: 200, limpezaPele: 70},
    quarta: { corte: 25, barba: 25, sombrancelha: 15, pigmentacao: 15, progressiva: 70, luzes: 120, nevou: 200, limpezaPele: 70},
    quinta: { corte: 30, barba: 30, sombrancelha: 15, pigmentacao: 15, progressiva: 70, luzes: 120, nevou: 200, limpezaPele: 70},
    sexta: { corte: 30, barba: 30, sombrancelha: 15, pigmentacao: 15, progressiva: 70, luzes: 120, nevou: 200, limpezaPele: 70},
    sabado: { corte: 30, barba: 30, sombrancelha: 15, pigmentacao: 15, progressiva: 70, luzes: 120, nevou: 200, limpezaPele: 70},
    domingo: { corte: 30, barba: 30, sombrancelha: 15, pigmentacao: 15, progressiva: 70, luzes: 120, nevou: 200, limpezaPele: 70 },
};

const btDias = document.querySelectorAll('.bt-servicos button');
const servicos = document.querySelectorAll('.servico');

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


btDias.forEach (botao => {
    botao.addEventListener ('click', () => {
        const diaSelecionado = botao.getAttribute('data-dia');
        atualizaPrecos(diaSelecionado)
    })
})

//funcao para atualizar automatico o dia

const hoje = new Date()
const diasNomes = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"]
const diaAtual = diasNomes [hoje.getDay()]
atualizaPrecos(diaAtual); 

//funcao para deixar butao ativo

const btServicos = document.querySelectorAll('.bt-servicos ul button')

btServicos.forEach(button => {
    button.addEventListener('click', () => {
        btServicos.forEach(btn => btn.classList.remove('active'))
        button.classList.add('active');
    })
})

