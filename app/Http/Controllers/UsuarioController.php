<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UsuarioController extends Controller
{
    public function cadastrarUsuario (Request $request) {
        try {
            $request->validate([
                'email' => 'required|email|unique:usuarios',
                'senha' => 'required|min:6',
                'tipo_usuario' => 'required|in:cliente,barbeiro,administrador'
            ]);

            $user = Usuario::create([
                'email' => $request->email,
                'senha' => Hash::make($request->senha),
                'tipo_usuario' => $request->tipo_usuario
            ]);

            return response()->json([
                'message' => 'Usuário cadastrado com sucesso!',
                'user' => $user
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
