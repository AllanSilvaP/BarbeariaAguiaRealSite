<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Barbearia Águia Real</title>
    <link rel="icon" href="{{ asset('img/barbearia-frente.png') }}" type="image/x-icon">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    {{-- Fonts --}}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@400;700&display=swap" rel="stylesheet">

    {{-- Tailwind CSS --}}
    @vite('[resources/css/app.css, 'resources/js/app.js']')
</head>
<body class="bg-[#121212] text-white font-[Montserrat] scroll-smooth overflow-x-hidden m-0 p-0">

    {{-- Navbar --}}
    <nav class="bg-[#333333] h-[60px] fixed top-0 w-full z-10 flex items-center">
        <ul class="flex justify-around w-full list-none p-0 m-0">
            <li>
                <a href="#pag-inicial">
                    <img src="{{ asset('img/barbearia-frente.png') }}" alt="Logo" class="h-[30px] w-[30px]">
                </a>
            </li>
            <li><a href="#pag-inicial" class="text-[#f5f5f5] text-[23px] hover:text-[#FFC100]">Página Inicial</a></li>
            <li><a href="#servicos" class="text-[#f5f5f5] text-[23px] hover:text-[#FFC100]">Serviços</a></li>
            <li><a href="#contato" class="text-[#f5f5f5] text-[23px] hover:text-[#FFC100]">Contato</a></li>
            {{--<li><a href="{{ route('areafunc') }}" class="text-[#f5f5f5] text-[23px] hover:text-[#FFC100]">Área do Funcionário</a></li>--}}
        </ul>
    </nav>

    {{-- Página Inicial --}}
    <section id="pag-inicial" class="pt-[60px] h-[90vh] relative overflow-hidden">
        <video autoplay loop muted class="fixed top-1/2 left-1/2 w-full h-full object-cover -z-10 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <source src="{{ asset('videos/VideoFundo3.mp4') }}" type="video/mp4">
            Seu navegador não suporta vídeos.
        </video>

        <div class="relative z-10 text-center h-full flex flex-col justify-center items-center">
            <h2 class="text-6xl font-bold font-['Bebas_Neue'] mb-5">Barbearia <br> Águia Real</h2>
            <a href="https://wa.me/61982436970" target="_blank" class="bg-[#5CB338] hover:bg-[#777777] text-white font-bold py-2 px-6 rounded-full flex items-center space-x-2">
                <img src="{{ asset('img/Whatsaap.png') }}" alt="WhatsApp" class="w-5 h-5">
                <span>Agende seu Horário</span>
            </a>
        </div>
    </section>

    {{-- Serviços --}}
    <section id="servicos" class="bg-[#1a1a1a]">
        <div class="bg-[#444444] text-center py-2">
            <h2 class="inline-block border-b-4 border-white text-2xl font-bold text-white">Serviços</h2>
        </div>

        <div class="bg-[#444444] h-[50px] flex justify-center items-center">
            <ul class="flex justify-around w-full list-none m-0 p-0">
                @foreach (['segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'] as $dia)
                    <li>
                        <button data-dia="{{ $dia }}" class="text-white font-bold text-lg hover:text-[#FFC100] px-4 py-2 relative transition-all">
                            {{ ucfirst($dia) }}
                        </button>
                    </li>
                @endforeach
            </ul>
        </div>

        <div class="flex flex-wrap justify-center gap-6 p-6 bg-[#1a1a1a]">
            {{-- Cards dinâmicos ou fixos de serviços --}}
            @for ($i = 0; $i < 6; $i++)
            <div class="bg-[#2c2c2c] hover:bg-[#3c3c3c] rounded-xl text-center p-4 w-[180px] transition-transform transform hover:scale-105">
                <img src="{{ asset('img/barbearia-frente.png') }}" alt="Serviço" class="w-11/12 h-40 object-cover mb-2 rounded">
                <p class="font-semibold">Corte + Barba</p>
            </div>
            @endfor
        </div>
    </section>

    {{-- Sobre Nós --}}
    <section class="bg-[#1f1f1f] text-[#e0e0e0] px-6 py-12 flex flex-col gap-6">
        <h2 class="text-3xl font-bold text-center">Sobre Nós</h2>
        <div class="flex flex-col md:flex-row md:gap-8">
            <img src="{{ asset('img/exemplo1.jpg') }}" alt="Equipe" class="md:w-1/2 rounded-lg object-cover mb-4 md:mb-0">
            <div class="flex items-center justify-center">
                <p class="text-lg leading-relaxed text-justify">
                    Somos a Barbearia Águia Real, referência em estilo, qualidade e atendimento personalizado.
                    Oferecemos cortes modernos, clássicos e serviços de barba com produtos de alta qualidade.
                    Nossa missão é proporcionar uma experiência única para cada cliente.
                </p>
            </div>
        </div>
    </section>

    {{-- Contato --}}
    <section id="contato" class="bg-[#4E4F51] text-white text-center px-6 py-12 rounded-md">
        <h2 class="text-4xl font-['Bebas_Neue'] mb-8">Contato</h2>
        <div class="flex flex-col md:flex-row justify-around items-start gap-8">
            <div class="flex flex-col items-start">
                <div class="flex items-center mb-2">
                    <img src="{{ asset('img/telefone.png') }}" alt="Telefone" class="w-7 h-7 mr-2">
                    <a href="tel:+5561982436970" class="hover:text-[#FFC100]">+55 61 98243-6970</a>
                </div>
                <div class="flex items-center">
                    <img src="{{ asset('img/email.png') }}" alt="Email" class="w-7 h-7 mr-2">
                    <a href="mailto:contato@aguiareal.com" class="hover:text-[#FFC100]">contato@aguiareal.com</a>
                </div>
            </div>
            <div class="flex flex-col items-start">
                <div class="flex items-center mb-2">
                    <img src="{{ asset('img/localizacao.png') }}" alt="Localização" class="w-7 h-7 mr-2">
                    <span>Rua Exemplo, 123 - Taguatinga, DF</span>
                </div>
            </div>
        </div>
    </section>

    {{-- Google Maps --}}
    <div class="bg-[#4E4F51] px-6 pb-12">
        <iframe class="rounded-lg w-full h-[450px]" src=""></iframe>
    </div>

    {{-- Footer --}}
    <footer class="bg-[#121212] py-4 text-center text-sm text-gray-400">
        © {{ date('Y') }} Barbearia Águia Real. Todos os direitos reservados.
    </footer>
</body>
</html>
