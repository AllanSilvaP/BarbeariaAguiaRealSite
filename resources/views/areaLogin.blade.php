<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    {{-- Fonts --}}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@400;700&display=swap" rel="stylesheet">

    <link rel="icon" href="{{ asset('img/barbearia-frente.png') }}" type="image/x-icon">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @vite(['resources/css/app.css', 'resources/js/app.js', 'resources/js/index.js'])
</head>

<body class="bg-[#121212] text-white font-[Montserrat] scroll-smooth overflow-x-hidden m-0 p-0">

    <x-navbar />

    {{-- ÁREA DE LOGIN --}}
    <div class="flex flex-col items-center justify-center py-12 pt-[80px]">
        <h2 class="text-3xl font-bold text-white mb-6" id="titulo-area">Área de Login</h2>


        {{-- ÁREA DE ERRO/ALERT --}}

        <div class="hidden bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm" id="alerta-erro"></div>

        {{-- LOGIN FORM --}}
        <div class="w-full max-w-md bg-[#1f1f1f] p-8 rounded-xl shadow-md" id="login-form">
            <x-login/>
        </div>

        {{-- CADASTRO FORM --}}
        <div class="w-full max-w-md bg-[#1f1f1f] p-8 rounded-xl shadow-md hidden" id="cad-form">
            <x-cadastro/>
        </div>
    </div>
</body>

</html>
