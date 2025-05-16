<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Área do Funcionário</title>
{{-- Fonts --}}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@400;700&display=swap" rel="stylesheet">

    <link rel="icon" href="{{ asset('img/barbearia-frente.png') }}" type="image/x-icon">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @vite(['resources/css/app.css', 'resources/js/app.js', 'resources/js/index.js'])
</head>

<body class="bg-[#121212] text-white font-[Montserrat] scroll-smooth overflow-x-hidden m-0 p-0">

    {{-- NAVBAR --}}
    <nav class="bg-[#333333] h-[60px] fixed top-0 w-full z-50 flex items-center">
        <ul class="flex justify-around w-full list-none p-0 m-0 text-xs sm:text-sm md:text-base">
            <li>
                <a href="{{ route('home') }}#pag-inicial">
                    <img src="{{ asset('img/barbearia-frente.png') }}" alt="Logo" class="h-[30px] w-[30px]">
                </a>
            </li>
            <li><a href="{{ route('home') }}#pag-inicial" class="text-[#f5f5f5] hover:text-[#FFC100]">Página Inicial</a></li>
            <li><a href="{{ route('home') }}#servicos" class="text-[#f5f5f5] hover:text-[#FFC100]">Serviços</a></li>
            <li><a href="{{ route('home') }}#contato" class="text-[#f5f5f5] hover:text-[#FFC100]">Contato</a></li>
            <li><a href="{{ route('login')}}" class="text-[#f5f5f5] hover:text-[#FFC100]">Login</a></li>
        </ul>
    </nav>


    {{-- ÁREA DE LOGIN --}}
    <div class="flex flex-col items-center justify-center py-12 pt-[80px]">
        <h2 class="text-3xl font-bold text-white mb-6" id="titulo-area">Área de Login</h2>

        {{-- LOGIN FORM --}}
        <div class="w-full max-w-md bg-[#1f1f1f] p-8 rounded-xl shadow-md" id="login-form">
            <form>
                <div class="mb-4">
                    <input id="email" name="email" type="email" placeholder="Digite seu email"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required>
                </div>

                <div class="mb-4">
                    <input id="senha" name="senha" type="password" placeholder="Digite sua senha"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required>
                </div>

                <div class="flex flex-col space-y-3 mt-6 p-4 rounded-lg">
                    <button id="bt-login" type="button"
                        class="bg-white text-black font-semibold py-2 rounded hover:bg-red-100 hover:cursor-pointer">Login</button>
                    <p>Não tem conta? <a href="#" class="text-[#FFC100] font-bold" id="link-cadastro">Cadastre-se</a></p>
                </div>
            </form>
        </div>

        {{-- CADASTRO FORM --}}
        <div class="w-full max-w-md bg-[#1f1f1f] p-8 rounded-xl shadow-md hidden" id="cad-form">
            <form>
                <div class="mb-4">
                    <input id="email-cad" name="emailCad" type="email" placeholder="Digite seu email"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required>
                </div>

                <div class="mb-4">
                    <input id="email-confirm" name="emailCad" type="email" placeholder="Confirme seu email"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required>
                </div>

                <div class="mb-4">
                    <input id="senha-cad" name="senha" type="password" placeholder="Crie sua senha"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required>
                </div>

                <div class="mb-4">
                    <input id="senha-confirm" name="senha" type="password" placeholder="Confirme sua senha"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required>
                </div>

                <div class="flex flex-col space-y-3 mt-6 p-4 rounded-lg">
                    <button id="bt-cadastro" type="button"
                        class="bg-white text-black font-semibold py-2 rounded hover:bg-red-100 hover: cursor-pointer">Cadastrar</button>
                    <p>Tem conta? <a href="#" class="text-[#FFC100] font-bold" id="link-login">Fazer Login</a></p>
                </div>
            </form>
        </div>
    </div>
</body>

</html>
