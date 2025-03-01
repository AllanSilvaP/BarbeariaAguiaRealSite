<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class authHubMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        if (!auth::check()) {
            return redirect('/areaFuncionario');
        }

        return $next($request);
    }
}
