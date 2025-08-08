@props(['titulo', 'valoresBt' => []])

<div class="p-4 bg-gray-800 text-white rounded shadow-md w-full" x-data="{ selecionado: 'Barbeiros' }">
    <h2 class="text-xl mb-4 text-center">{{ $titulo }}</h2>

    <div class="flex flex-col space-y-2">
        @foreach($valoresBt as $valor)
            <button
                x-on:click="selecionado = '{{ $valor }}'; renderSecao('{{ $valor }}')"
                x-bind:class="selecionado === '{{ $valor }}' ? 'bg-blue-700' : 'bg-gray-700 hover:bg-gray-600'"
                class="px-4 py-2 rounded text-left transition duration-200"
            >
                {{ $valor }}
            </button>
        @endforeach
    </div>
</div>
