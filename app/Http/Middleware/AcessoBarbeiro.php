<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AcessoBarbeiro
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $usuario = auth('api')->user();

        if(!$usuario || $usuario->tipo_usuario !== 'barbeiro') {
            return response()->json(['erro' => 'Acesso permitido apenas para barbeiros'],403);
        }

        return $next($request);
    }
}
