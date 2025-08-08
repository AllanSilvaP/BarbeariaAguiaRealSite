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
