@extends('layouts.app')

@section('content')
<div class="bg-white text-black rounded p-4 shadow-md max-w-4xl mx-auto">
    <h2 class="text-xl font-bold mb-4">Barbeiros</h2>

    @if(session('erro'))
    <p class="text-red-600 mb-4">{{ session('erro')}}</p>
    @endif

    @if(session('sucesso'))
    <p class="text-green-600 mb-4">{{ session('sucesso')}}</p>
    @endif

    {{-- Forms --}}
    <form method="POST" action="{{ isset($editando) ? route('barbeiros.update', $editando->id) : route('barbeiros.store')}}" class="space-y-2 mb-6 max-w-md">
        <input type="text" name="nome" placeholder="Nome" class="input w-full" value="{{ old('nome', $editando->nome ?? '')}}" required>
        <input type="email" name="email" placeholder="Email" class="input w-full" value="{{old('email', $editando->email ?? '')}}" required>
        <input type="tel" name="telefone" placeholder="Telefone" class="input w-full" value="{{old('telefone', $editando->telefone ?? '')}}" required>
        <input type="hidden" name="tipo_usuario" value="Barbeiro">
        <input type="password" name="senha" placeholder="Senha" placeholder="{{ isset($editando) ? 'Nova Senha (opcional)' : 'Senha'}}" class="input w-full">

        <button type="submit" class="bg-black text-white px-4 py-2 rounded w-full">
            {{ isset($editando) ? 'Atualizar' : 'Cadastrar'}}
        </button>
    </form>

    {{-- Tabela --}}
    <table class="w-full text-left border">
        <thead class="bg-gray-200">
            <tr>
                <th class="p-2 border">Nome</th>
                <th class="p-2 border">Email</th>
                <th class="p-2 border">Telefone</th>
                <th class="p-2 border">Ações</th>
            </tr>
        </thead>
        <tbody>
            @forelse($barbeiros as $barbeiro)
            <tr>
                <td class="p-2 border">{{ $barbeiro->nome }}</td>
                <td class="p-2 border">{{ $barbeiro->email }}</td>
                <td class="p-2 border">{{ $barbeiro->telefone }}</td>
                <td class="p-2 border">{{ $barbeiro->created_at->format('d/m/Y H:i') }}</td>
                <td class="p-2 border">
                    <a href="{{ route('barbeiros.edit', $barbeiro->id) }}" class="text-blue-600 mr-2">✏️</a>
                    <form method="POST" action="{{ route('barbeiros.destroy', $barbeiro->id)}}" class="inline">
                        @csrf
                        @method('DELETE')
                        <button onclick="return confirm('Tem certeza?')" class="text-red-600">❌</button>
                    </form>
                </td>
            </tr>
            @empty
            <tr>
                 <td colspan="4" class="p-2 border text-center text-gray-500">Nenhum barbeiro cadastrado.</td>
            </tr>
            @endforelse
        </tbody>
    </table>
</div>
@endsection
