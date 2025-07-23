@php
$botoes = ['Barbeiros', 'Pagamentos', 'Serviços', 'Usuarios','Agendas'];
@endphp



<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Área do Admin</title>
    {{-- Fonts --}}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@400;700&display=swap" rel="stylesheet">

    <link rel="icon" href="{{ asset('img/barbearia-frente.png') }}" type="image/x-icon">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @vite(['resources/css/app.css', 'resources/js/app.js', 'resources/js/internal/indexHub.js'])
</head>



<body class="bg-[#121212] text-white font-[Montserrat] scroll-smooth overflow-x-hidden m-0 p-0">
    <x-navbar-hub />

    <div class="mt-20">
        <x-selecionar-dias/>
    </div>

    <div class="w-[600px] h-[3px] bg-white opacity-50 mx-auto"></div>

    <div class="flex justify-center py-4 ">
        <button id="agendar-corte" class="py-2 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out bg-[#8B5F2A] hover:bg-[#A07C42] text-white">
            Agendar Corte
        </button>
    </div>

    <x-form-agendamento/>

    <div class="max-w-screen-xl mx-auto flex w-full px-4 m-6 min-h-[500px]">
        <div class="w-3/4 pr-4">
            <div id="secao-conteudo"></div>
        </div>
        <div class="w-1/4 pl-4">
            <x-barra-lateral titulo="Opções" :valoresBt="$botoes" />
        </div>
    </div>
</body>

</html>
