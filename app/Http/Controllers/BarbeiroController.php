<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class BarbeiroController extends Controller
{
    public function index()
    {
        $barbeiros = Usuario::where('tipo_usuario', 'Barbeiro')->get();
        return view('barbeiros.index', compact('barbeiros'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'nome' => 'required',
            'email' => 'required|email|unique:usuarios,email',
            'telefone' => 'required',
            'senha' => 'required|min:6',
        ]);

        Usuario::create([
            'nome' => $request->nome,
            'email' => $request->email,
            'telefone' => $request->telefone,
            'senha' => Hash::make($request->senha),
            'tipo_usuario' => 'Barbeiro',
        ]);

        return redirect()->route('barbeiros.index')->with('sucesso', 'Barbeiro cadastrado com sucesso!');
    }

    public function edit($id)
    {
        $editando = Usuario::findOrFail($id);
        $barbeiros = Usuario::where('tipo_usuario', 'Barbeiro')->get();
        return view('barbeiros.index', compact('editando', 'barbeiros'));
    }

    public function update(Request $request, $id)
    {
        $usuario = Usuario::findOrFail($id);

        $usuario->update([
            'nome' => $request->nome,
            'telefone' => $request->telefone,
            'email' => $request->email,
            'tipo_usuario' => 'Barbeiro',
        ]);

        if ($request->filled('senha')) {
            $usuario->senha = Hash::make($request->senha);
            $usuario->save();
        }

        return redirect()->route('barbeiros.index')->with('sucesso', 'Barbeiro atualizado!');
    }

    public function destroy($id)
    {
        Usuario::destroy($id);
        return redirect()->route('barbeiros.index')->with('sucesso', 'Barbeiro excluído com sucesso!');
    }
}

