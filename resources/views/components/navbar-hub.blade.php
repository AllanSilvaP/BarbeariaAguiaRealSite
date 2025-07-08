{{-- NAVBAR-HUB --}}
    <nav class="bg-[#333333] h-[60px] fixed top-0 w-full z-50 flex items-center">
        <ul class="flex justify-end w-full list-none p-0 m-0 text-xs sm:text-sm md:text-base">
            <li class="mr-4">
                <p class="text-[#f5f5f5] hover:text-[#FFC100]">Olá, <span>Nome</span></p>
            </li>
            <li class="absolute left-1/2 transform -translate-x-1/2">
                <a href="{{ route('home') }}#pag-inicial">
                    <img src="{{ asset('img/barbearia-frente.png') }}" alt="Logo" class="h-[30px] w-[30px]">
                </a>
            </li>
        </ul>
    </nav>
