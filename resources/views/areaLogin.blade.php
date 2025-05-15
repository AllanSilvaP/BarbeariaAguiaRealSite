<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Área do Funcionário</title>
    <link rel="icon" href="{{ asset('img/barbearia-frente.png') }}" type="image/x-icon">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="bg-gray-100 min-h-screen font-sans">

    {{-- NAVBAR --}}
    <nav class="bg-white shadow-md">
        <div class="max-w-7xl mx-auto px-4">
            <div class="flex justify-between items-center h-16">
                <div class="flex items-center space-x-4">
                    <a href="{{ route('/') }}#pag-inicial">
                        <img src="{{ asset('img/barbearia-frente.png') }}" alt="Logo" class="h-8 w-8">
                    </a>
                    <a href="{{ route('/') }}#pag-inicial" class="text-gray-800 hover:text-blue-600">Página Inicial</a>
                    <a href="{{ route('/') }}#servicos" class="text-gray-800 hover:text-blue-600">Serviços</a>
                    <a href="{{ route('/') }}#contato" class="text-gray-800 hover:text-blue-600">Contato</a>
                    <a href="#" class="text-blue-600 font-semibold">Área do Funcionário</a>
                </div>
            </div>
        </div>
    </nav>

    {{-- ÁREA DE LOGIN --}}
    <div class="flex flex-col items-center justify-center py-12">
        <h2 class="text-3xl font-bold text-gray-800 mb-6">Área de Login</h2>

        <div class="w-full max-w-md bg-cyan-200 p-8 rounded-xl shadow-md">
            <form>
                <div class="mb-4">
                    <input id="email" name="email" type="email" placeholder="Digite seu email"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required>
                </div>

                <div class="mb-4">
                    <input id="senha" name="senha" type="password" placeholder="Digite sua senha"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required>
                </div>

                <div class="mb-4">
                    <label class="block mb-1 font-semibold text-gray-700">Tipo de Usuário</label>
                    <select id="tipo_usuario" required
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
                        <option value="cliente" selected>Cliente</option>
                        <option value="barbeiro">Barbeiro</option>
                        <option value="administrador">Administrador</option>
                    </select>
                </div>

                <div class="flex flex-col space-y-3 mt-6 bg-red-700 p-4 rounded-lg">
                    <button id="btLogin" type="button"
                        class="bg-white text-red-700 font-semibold py-2 rounded hover:bg-red-100">Login</button>
                    <button id="btCadastro" type="button"
                        class="bg-white text-red-700 font-semibold py-2 rounded hover:bg-red-100">Cadastrar</button>
                </div>
            </form>
        </div>
    </div>

    <script type="module" src="{{ asset('js/modules/index.js') }}"></script>
</body>
</html>
