<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="{{ asset('css/index.css') }}">
    <link rel="stylesheet" href="{{ asset('css/hub.css') }}">
    <link rel="icon" href="{{ asset('img/barbearia-frente.png')}}" type="image/x-icon">
    <title>HUB</title>
</head>

<body>
    <nav class="barra-navegador">
        <ul>
            <li><a href="{{ route('/')}}#pag-inicial"><img src="{{ asset('img/barbearia-frente.png') }}" alt="" style="height: 30px; width: 30px;"></a></li>
        </ul>
    </nav>

    <div class="container">
        <div class="barra-navegador-direita">
            <div class="usuario">
                <img src="{{ asset('img/barbearia-frente.png') }}">
            </div>

            <div class="hub-bt">
                <button>Financeiro</button>
                <button>Agendamento</button>
                <button>Estoque</button>
            </div>

            <div class="hub-bt-funcionalidades" >
                <button id="bt-pagar">Contas a Pagar</button>
                <button id="bt-receber">Contas a Receber</button>
                <button id="bt-caixa">Fechamento de Caixa</button>
                <button id="bt-conciliacao">Conciliação Bancária</button>
            </div>
        </div>

        <div class="painel-financeiro" id="painel-financeiro">
            <h1>Financeiro</h1>
            <div class="tela-finaceiro">

            <div class="bt-financeiro">
                <button id="bt-a-pagar" class="ativo">A Pagar</button>
                <button id="bt-pagos">Pagos</button>
                <button id="bt-add-conta">Adicionar Contas</button>
                </div>

                <div class="datas">
                    <button id="bt-pesquisar">Pesquisar</button>
                </div>
                <div class="hub-financeiro" id="hub-financeiro"></div>
            </div>
        </div>

        <div class="painel-estoque">
            <p>painel estoque</p>

        </div>
    </div>

    <div class="painel-agendamento">
        <p>painel agendamento</p>
    </div>
    </div>
</body>

<script type="module" src="{{ asset('js/modules/Hubindex.js') }}"></script>

</html>
