<nav class="bg-[#333333] h-[60px] fixed top-0 w-full z-50 flex items-center justify-between px-4">
    <a href="{{ route('home') }}#pag-inicial">
        <img src="{{ asset('img/barbearia-frente.png') }}" alt="Logo" class="h-[30px] w-[30px]">
    </a>

    <ul class="flex justify-end list-none p-0 m-0 text-xs sm:text-sm md:text-base">
        <li class="text-[#f5f5f5] hover:text-[#FFC100] whitespace-nowrap text-white font-semibold" id="nome-usuario"></li>
    </ul>
</nav>
