<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AcessoAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $usuario = auth('api')->user();

        if(!$usuario || $usuario->tipo_usuario !== 'administrador') {
            return response()->json(['erro' => 'Acesso permitido apenas para administradores'],403);
        }

        return $next($request);
    }
}
