<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Models\Usuario;

class AuthController extends Controller
{
    /**
     * Registro de un nuevo usuario (emite token Bearer)
     * POST /api/register  (si decides exponer la ruta)
     */
    public function register(Request $request)
    {
        $validated = $request->validate([
            'nombre'   => ['required','string','max:150'],
            'email'    => ['required','email','max:150','unique:usuarios,email'],
            'password' => ['required','string','min:6'],
            'rol'      => ['required','in:admin,usuario'],
        ]);

        $usuario = new Usuario([
            'nombre'   => $validated['nombre'],
            'email'    => $validated['email'],
            'password' => Hash::make($validated['password']),
            'rol'      => $validated['rol'],
        ]);

        // Si tu modelo no fuerza la conexión, asegúrate de que use la del tenant
        // $usuario->setConnection('tenant');
        $usuario->save();

        // Emite token personal (opcional: define abilities/scopes)
        $token = $usuario->createToken('api-token', ['*'])->plainTextToken;

        // Nunca devuelvas el hash de password
        $usuario->makeHidden(['password']);

        return response()->json([
            'message' => 'Usuario registrado exitosamente',
            'usuario' => $usuario,
            'token'   => $token,
        ], 201);
    }

    /**
     * Login de usuario (emite token Bearer)
     * POST /api/login
     */
    public function login(Request $request)
    {
        $data = $request->validate([
            'email'    => ['required','email'],
            'password' => ['required','string'],
        ]);

        $usuario = Usuario::where('email', $data['email'])->first();

        if (! $usuario || ! Hash::check($data['password'], $usuario->password)) {
            throw ValidationException::withMessages([
                'email' => ['Credenciales inválidas.'],
            ]);
        }

        // Opcional: revocar tokens previos del usuario en este tenant
        // $usuario->tokens()->delete();

        // Emite nuevo token personal
        $token = $usuario->createToken('api-token', ['*'])->plainTextToken;

        $usuario->makeHidden(['password']);

        return response()->json([
            'message' => 'Login exitoso',
            'usuario' => $usuario,
            'token'   => $token,
        ], 200);
    }

    /**
     * Logout (revocar token actual)
     * POST /api/logout  (requiere Authorization: Bearer <token>)
     */
    public function logout(Request $request)
    {
        // Revoca solo el token usado en este request
        if ($request->user()?->currentAccessToken()) {
            $request->user()->currentAccessToken()->delete();
        }

        // Si quisieras revocar TODOS los tokens del usuario en este tenant:
        // $request->user()->tokens()->delete();

        return response()->json([
            'message' => 'Logout exitoso',
        ], 204);
    }
}