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

{{-- Tailwind CSS & JavaScript com Vite --}}
@vite(['resources/css/app.css', 'resources/js/app.js'])
</head>

<body class="bg-[#121212] text-white font-[Montserrat] scroll-smooth overflow-x-hidden m-0 p-0">

    <!-- Navbar -->
    <nav class="bg-[#333333] h-[60px] fixed top-0 w-full z-50 flex items-center">
        <ul class="flex justify-around w-full list-none p-0 m-0 text-xs sm:text-sm md:text-base">
            <li>
                <a href="#pag-inicial">
                    <img src="{{ asset('img/barbearia-frente.png') }}" alt="Logo" class="h-[30px] w-[30px]">
                </a>
            </li>
            <li><a href="#pag-inicial" class="text-[#f5f5f5] hover:text-[#FFC100]">Página Inicial</a></li>
            <li><a href="#servicos" class="text-[#f5f5f5] hover:text-[#FFC100]">Serviços</a></li>
            <li><a href="#contato" class="text-[#f5f5f5] hover:text-[#FFC100]">Contato</a></li>
            <li><a href="{{ route('login')}}" class="text-[#f5f5f5] hover:text-[#FFC100]">Login</a></li>
        </ul>
    </nav>

    <!-- Página Inicial -->
    <section id="pag-inicial" class="pt-[80px] min-h-screen relative overflow-hidden">
        <video autoplay loop muted class="fixed top-1/2 left-1/2 w-full h-full object-cover -z-10 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <source src="{{ asset('videos/VideoFundo3.mp4') }}" type="video/mp4">
            Seu navegador não suporta vídeos.
        </video>

        <div class="relative z-40 text-center h-full flex flex-col justify-center items-center px-4">
            <h2 class="text-[28px] sm:text-4xl md:text-6xl font-bold font-['Bebas_Neue'] mb-5 leading-tight tracking-wide">
                <span class="block">Barbearia</span>
                <span class="block">Águia Real</span>
            </h2>
            <a href="https://wa.me/61982436970" target="_blank" class="bg-[#5CB338] hover:bg-[#777777] text-white font-bold py-2 px-4 sm:px-6 rounded-full flex items-center gap-2">
                <img src="{{ asset('img/Whatsaap.png') }}" alt="WhatsApp" class="w-5 h-5">
                <span>Agende seu Horário</span>
            </a>
        </div>
    </section>


    {{-- Serviços --}}
    <section id="servicos" class="bg-[#1a1a1a] text-white px-4 py-8">
        <div class="text-center mb-6">
            <h2 class="text-3xl font-bold border-b-4 border-white inline-block">Serviços</h2>
        </div>

        <!--
        <div class="flex flex-wrap justify-center gap-4 mb-6">
            <button data-dia="segunda" class="bg-[#2c2c2c] hover:bg-[#FFC100] text-white font-bold py-2 px-4 rounded transition-all">Segunda</button>
            <button data-dia="terça" class="bg-[#2c2c2c] hover:bg-[#FFC100] text-white font-bold py-2 px-4 rounded transition-all">Terça</button>
            <button data-dia="quarta" class="bg-[#2c2c2c] hover:bg-[#FFC100] text-white font-bold py-2 px-4 rounded transition-all">Quarta</button>
            <button data-dia="quinta" class="bg-[#2c2c2c] hover:bg-[#FFC100] text-white font-bold py-2 px-4 rounded transition-all">Quinta</button>
            <button data-dia="sexta" class="bg-[#2c2c2c] hover:bg-[#FFC100] text-white font-bold py-2 px-4 rounded transition-all">Sexta</button>
            <button data-dia="sábado" class="bg-[#2c2c2c] hover:bg-[#FFC100] text-white font-bold py-2 px-4 rounded transition-all">Sábado</button>
        </div>
        -->

        <div class="flex flex-wrap justify-center gap-6">
            <div class="bg-[#2c2c2c] hover:bg-[#3c3c3c] rounded-xl text-center p-4 w-[150px] sm:w-[180px] transition-transform transform hover:scale-105">
                <img src="{{ asset('img/Corte.png') }}" alt="Corte" class="w-full h-32 object-cover mb-2 rounded">
                <p class="preco-card font-semibold text-lg">R$ 35,00</p>
                <p class="texto-card">Corte</p>
            </div>
            <div class="bg-[#2c2c2c] hover:bg-[#3c3c3c] rounded-xl text-center p-4 w-[150px] sm:w-[180px] transition-transform transform hover:scale-105">
                <img src="{{ asset('img/Barba.png') }}" alt="Barba" class="w-full h-32 object-cover mb-2 rounded">
                <p class="preco-card font-semibold text-lg">R$ 35,00</p>
                <p class="texto-card">Barba</p>
            </div>
            <div class="bg-[#2c2c2c] hover:bg-[#3c3c3c] rounded-xl text-center p-4 w-[150px] sm:w-[180px] transition-transform transform hover:scale-105">
                <img src="{{ asset('img/Sombrancelha.png') }}" alt="Sombrancelha" class="w-full h-32 object-cover mb-2 rounded">
                <p class="preco-card font-semibold text-lg">R$ 10,00</p>
                <p class="texto-card">Sombrancelha</p>
            </div>
            <div class="bg-[#2c2c2c] hover:bg-[#3c3c3c] rounded-xl text-center p-4 w-[150px] sm:w-[180px] transition-transform transform hover:scale-105">
                <img src="{{ asset('img/Pigmentado.png') }}" alt="Pigmentado" class="w-full h-32 object-cover mb-2 rounded">
                <p class="preco-card font-semibold text-lg">R$ 50,00</p>
                <p class="texto-card">Pigmentado</p>
            </div>
            <div class="bg-[#2c2c2c] hover:bg-[#3c3c3c] rounded-xl text-center p-4 w-[150px] sm:w-[180px] transition-transform transform hover:scale-105">
                <img src="{{ asset('img/Progressiva.png') }}" alt="Progressiva" class="w-full h-32 object-cover mb-2 rounded">
                <p class="preco-card font-semibold text-lg">R$ 100,00</p>
                <p class="texto-card">Progressiva</p>
            </div>
            <div class="bg-[#2c2c2c] hover:bg-[#3c3c3c] rounded-xl text-center p-4 w-[150px] sm:w-[180px] transition-transform transform hover:scale-105">
                <img src="{{ asset('img/Luzes.png') }}" alt="Luzes" class="w-full h-32 object-cover mb-2 rounded">
                <p class="preco-card font-semibold text-lg">R$ 70,00</p>
                <p class="texto-card">Luzes</p>
            </div>
            <div class="bg-[#2c2c2c] hover:bg-[#3c3c3c] rounded-xl text-center p-4 w-[150px] sm:w-[180px] transition-transform transform hover:scale-105">
                <img src="{{ asset('img/Nevou.png') }}" alt="Nevou" class="w-full h-32 object-cover mb-2 rounded">
                <p class="preco-card font-semibold text-lg">R$ 200,00</p>
                <p class="texto-card">Nevou</p>
            </div>

        </div>
    </section>

    {{-- Sobre Nós --}}
    <section class="bg-[#1f1f1f] text-[#e0e0e0] px-6 py-12 flex flex-col gap-6" id="sobrenos">
        <h2 class="text-3xl font-bold text-center">Sobre Nós</h2>
        <div class="flex flex-col md:flex-row md:gap-8">
            <img src="{{ asset('img/ImagemAmostra3.jpg') }}" alt="Equipe" class="md:w-1/2 rounded-lg object-cover mb-4 md:mb-0">
            <div class="flex flex-col justify-center gap-4 md:w-1/2">
                <h3 class="text-2xl font-semibold">Sobre Nós - Barbearia Águia Real</h3>
                <p class="text-lg leading-relaxed text-justify">
                    Seja bem-vindo à Barbearia Águia Real, onde tradição e modernidade se unem para oferecer a você uma
                    experiência única em cuidados masculinos. Inspirados na força e elegância da águia, criamos um
                    espaço dedicado ao homem que valoriza estilo, qualidade e um atendimento personalizado.
                </p>

                <h3 class="text-2xl font-semibold">Nossa História</h3>
                <p class="text-lg leading-relaxed text-justify">
                    Fundada com a missão de resgatar o charme das barbearias clássicas, a Águia Real é um lugar onde o
                    cuidado pessoal se transforma em um momento especial. Aqui, você encontra um ambiente aconchegante e
                    exclusivo, pensado para oferecer mais do que um corte de cabelo ou barba: um verdadeiro ritual de
                    cuidado.
                </p>

                <h3 class="text-2xl font-semibold">Nosso Compromisso</h3>
                <p class="text-lg leading-relaxed text-justify">
                    Na Águia Real, cada detalhe é pensado para superar as suas expectativas. Desde o atendimento até a
                    execução dos serviços, nossa equipe está preparada para garantir que você saia daqui não apenas
                    satisfeito, mas renovado e confiante.

                    Venha conhecer a Barbearia Águia Real e descubra o que significa estar no topo do cuidado masculino.
                </p>
            </div>
        </div>
    </section>

    {{-- Contato --}}
    <section id="contato" class="bg-[#4E4F51] text-white text-center px-6 py-12">
        <h2 class="text-4xl font-['Bebas_Neue'] mb-8">Contato</h2>
        <div class="flex flex-col md:flex-row justify-around items-start gap-8">
            <div class="flex flex-col items-start">
                <div class="flex items-center mb-2">
                    <img src="{{ asset('img/Telefone.png') }}" alt="Telefone" class="w-7 h-7 mr-2">
                    <span>(61) 98243-6970 - (61) 98135-4110</span>
                </div>
                <div class="flex items-center mb-2">
                    <img src="{{ asset('img/Endereco.png') }}" alt="Endereço" class="w-7 h-7 mr-2">
                    <span>Qnn 22 Conjunto P Lote 28</span>
                </div>
            </div>
            <div class="flex flex-col items-start">
                <div class="flex items-center mb-2">
                    <img src="{{ asset('img/Relogio.png') }}" alt="Horário" class="w-7 h-7 mr-2">
                    <span>Segunda a Sábado: 09:00 até às 20:00</span>
                </div>
                <div class="flex items-center mb-2">
                    <img src="{{ asset('img/Email.png') }}" alt="Email" class="w-7 h-7 mr-2">
                    <span>aguiarealbarbershop@gmail.com</span>
                </div>
            </div>
            <div class="flex flex-col items-start gap-2">
                <a href="https://www.instagram.com/barbeariaaguiareal25" target="_blank" class="flex items-center hover:text-[#FFC100]">
                    <img src="{{ asset('img/Instagram.png') }}" alt="Instagram" class="w-7 h-7 mr-2">
                    barbearia_aguiareal
                </a>
                <a href="https://www.tiktok.com/@barbeariaaguiareal?_t=8sXqhJJ92yj&_r=1" target="_blank" class="flex items-center hover:text-[#FFC100]">
                    <img src="{{ asset('img/TikTok.webp') }}" alt="TikTok" class="w-7 h-7 mr-2">
                    barbeariaaguiareal
                </a>
            </div>
        </div>
    </section>

    {{-- Google Maps --}}
    <div class="bg-[#4E4F51] px-6 pb-12">
        <iframe
            class="rounded-lg w-full h-[450px]"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d570.5812938149008!2d-48.11100684229753!3d-15.835659583658085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935bcdbaced52809%3A0x477fc2608d94836d!2sBarbearia%20Aguia%20Real!5e0!3m2!1sen!2sbr!4v1734461934379!5m2!1sen!2sbr"
            allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
        </iframe>
    </div>

    {{-- Footer --}}
    <footer class="bg-[#121212] py-4 text-center text-sm text-gray-400">
        © {{ date('Y') }} Barbearia Águia Real. Todos os direitos reservados.
    </footer>
</body>

</html>
