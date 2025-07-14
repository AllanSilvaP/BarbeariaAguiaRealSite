@props(['valoresBarber' => []])

<div class="bg-black text-white p-4 w-full overflow-x-auto rounded-lg">
    <h2 class="text-center text-lg mb-4">
        Barbeiros
    </h2>

    <div class="flex justify-center">
        <div class="flex items-center space-x-2">
            @foreach($valoresBarber as $valor)
            <x-botao-barra-lateral
                x-on:click="selecionado = '{{ $valor }}'"
                x-bind:class="selecionado === '{{ $valor }}' ? 'bg-blue-700' : ''">
                {{ $valor }}
            </x-botao-barra-lateral>
            @endforeach
        </div>
    </div>

    <div class="space-y-2">
        <div key={idx} class="flex items-center space-x-2">
            <div class="w-16 text-right pr-2 text-blue-400 font-mono">
                16:00
            </div>
            <div class={`flex-1 rounded px-2 py-1 text-sm font-semibold
                <p>RARARARA</p>
                <button>
                    Confirmar
                </button>
            </div>
        </div>
    </div>
</div>
