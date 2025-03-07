<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="{{ asset('css/index.css') }}">
    <link rel="stylesheet" href="{{ asset('css/areaFunc.css') }}">
    <link rel="icon" href="{{ asset('img/barbearia-frente.png')}}" type="image/x-icon">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Área do Funcionário</title>
</head>

<body>
    <nav class="barra-navegador">
        <ul>
            <li><a href="{{ route('/')}}#pag-inicial"><img src="{{ asset('img/barbearia-frente.png') }}" alt="" style="height: 25px; width: 25px;"></a></li>
            <li><a href="{{ route('/')}}#pag-inicial">Pagina Inicial</a></li>
            <li><a href="{{ route('/')}}#servicos">Serviços</a></li>
            <li><a href="{{ route('/')}}#contato">Contato</a></li>
            <li><a href="">Área do Funcionário</a></li>
        </ul>
    </nav>

    <div class="pagina-login">
        <h2>Área de Login</h2>
        <div class="login-field">
            <input id="email" name="email" type="email" placeholder="Digite seu email" required>
            <input id="senha" name="senha" type="password" placeholder="Digite sua senha" required>
            <label>Tipo de Usuário</label>
            <select id="tipo_usuario" required>
                <option value="cliente" selected>Cliente</option>
                <option value="barbeiro">Barbeiro</option>
                <option value="administrador">Administrador</option>
            </select>
        </div>
        <div class="bts">
            <button id="btLogin">Login</button>
            <button id="btCadastro">Cadastrar</button>
        </div>
    </div>
</body>

<script type="module" src="{{ asset('js/modules/index.js') }}"></script>

</html>
