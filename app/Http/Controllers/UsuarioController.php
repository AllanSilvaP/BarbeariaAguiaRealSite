<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Usuario;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Exception;

class UsuarioController extends Controller
{
    public function cadastrarUsuario(Request $request)
    {
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
    public function loginUsuario(Request $request)
    {
        try {
            // Validação dos campos
            $credentials = $request->validate([
                'email' => 'required|email',
                'senha' => 'required',
                'tipo_usuario' => 'required'
            ]);

            // Buscar usuário no banco de dados
            $usuario = Usuario::where('email', $credentials['email'])
                ->where('tipo_usuario', $credentials['tipo_usuario']) // Corrigido 'tipo_usaurio' para 'tipo_usuario'
                ->first();

            // Verifica se o usuário existe e a senha está correta
            if (!$usuario || !password_verify($credentials['senha'], $usuario->senha)) {
                return response()->json([
                    'error' => 'Credenciais inválidas'
                ], 401);
            }

            // Autenticar usuário
            Auth::login($usuario);

            return response()->json([
                'message' => 'Login realizado com sucesso',
                'usuario' => $usuario
            ]);
        } catch (Exception $e) {
            // Captura e retorna qualquer erro inesperado
            return response()->json([
                'error' => 'Ocorreu um erro ao tentar realizar o login',
                'details' => $e->getMessage()
            ], 500);
        }
    }
}
