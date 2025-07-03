{{-- CADASTRO FORM --}}

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
