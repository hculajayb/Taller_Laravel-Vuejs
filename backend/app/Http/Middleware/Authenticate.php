<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     */
    protected function redirectTo(Request $request): ?string
    {
        // Si la solicitud es de tipo JSON, devuelve un error 401 Unauthorized
        if ($request->expectsJson()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        // Para el caso de peticiones web, se redirige a la ruta 'login'
        //return route('login');
        return null; // No redirigir en caso de peticiones API
    }
}
