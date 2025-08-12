<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Container\Attributes\Auth;
use App\Models\Usuario;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'nome' => 'required|string|max:255',
            'telefone' => 'required|string|max:20',
            'email' => 'required|email|unique:usuarios,email',
            'senha' => 'required|string|min:5',
        ]);


        $usuario = Usuario::create([
            'nome' => $request->nome,
            'telefone' => $request->telefone,
            'email' => $request->email,
            'senha' => Hash::make($request->senha),
            'tipo_usuario' => $request->tipo_usuario ?? 'cliente'
        ]);

        return response()->json($usuario, 201);
    }

    public function login(Request $request)
    {
        $credenciais = ['email' => $request->email, 'password' => $request->senha];

        if (!$token = auth('api')->attempt($credenciais)) {
            return response()->json(['erro' => 'Email ou senha não validos!'], 401);
        }

        return response()->json(['token' => $token]);
    }

    public function me()
    {
        $usuario = auth('api')->user();
        return response()->json([
            'id_usuario' => $usuario->id_usuario,
            'nome' => $usuario->nome,
            'tipo_usuario' => $usuario->tipo_usuario
        ]);
    }

    public function logout()
    {
        auth('api')->logout();
        return response()->json(['mensagem' => 'Logout feito com sucesso']);
    }
}
