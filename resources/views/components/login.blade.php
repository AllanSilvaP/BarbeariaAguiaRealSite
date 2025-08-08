{{-- LOGIN FORM --}}

<form id="form-login">
    <div class="mb-4">
        <input id="email" name="email" type="email" placeholder="Digite seu email"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required>
        <p id="erro-email" class="hidden mt-1 text-sm text-red-500">Email inválido</p>
    </div>

    <div class="mb-4">
        <input id="senha" name="senha" type="password" placeholder="Digite sua senha"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required>
        <p id="erro-senha-tam" class="hidden mt-1 text-sm text-red-500">Senha muito curta</p>
        <p id="erro-senha-num" class="hidden mt-1 text-sm text-red-500">Senha está sem um número</p>
    </div>

    <div class="flex flex-col space-y-3 mt-6 p-4 rounded-lg">
        <button id="bt-login" type="submit"
            class="bg-white text-black font-semibold py-2 rounded hover:bg-red-100 hover:cursor-pointer">Login</button>
        <p>Não tem conta? <a href="#" class="text-[#FFC100] font-bold" id="link-cadastro">Cadastre-se</a></p>
    </div>
</form>
