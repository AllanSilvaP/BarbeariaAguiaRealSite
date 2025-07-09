@props(['titulo', 'valoresBt' => []])

<div class="p-4 bg-gray-800 text-white rounded shadow-md w-full" x-data="{ selecionado: null }">
    <h2 class="text-xl mb-4 text-center">{{ $titulo }}</h2>

    <div class="flex flex-col space-y-2">
        @foreach($valoresBt as $valor)
            <x-botao-barra-lateral
                x-on:click="selecionado = '{{ $valor }}'"
                x-bind:class="selecionado === '{{ $valor }}' ? 'bg-blue-700' : ''"
            >
                {{ $valor }}
            </x-botao-barra-lateral>
        @endforeach
    </div>
</div>
