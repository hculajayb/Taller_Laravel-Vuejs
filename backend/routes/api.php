<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UsuarioController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\TareaController;

/*
|--------------------------------------------------------------------------
| API Routes (Sanctum con tokens personales - Bearer)
|--------------------------------------------------------------------------
| - SIN csrf-cookie / SIN middleware 'web'
| - Login emite token; logout revoca el token actual
| - Rutas protegidas bajo auth:sanctum
*/

// ---- Auth (tokens) ----
Route::post('/login',  [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

// ---- Ping de sesión por token (opcional, útil para el FE) ----
Route::middleware('auth:sanctum')->get('/me', function (Request $request) {
    return $request->user();
});

// ---- (Opcional) Compatibilidad: devuelve user autenticado por token ----
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// ---- Usuarios (protegidas) ----
Route::middleware('auth:sanctum')->prefix('usuarios')->group(function () {
    Route::get('/listUsers', [UsuarioController::class, 'index']);
    Route::post('/addUser', [UsuarioController::class, 'store']);
    Route::get('/getUser/{id}', [UsuarioController::class, 'show']);
    Route::put('/updateUser/{id}', [UsuarioController::class, 'update']);
    Route::delete('/deleteUser/{id}', [UsuarioController::class, 'destroy']);
});

// ---- Tareas (protegidas) ----
Route::middleware('auth:sanctum')->prefix('tareas')->group(function () {
    Route::get('/listTareas', [TareaController::class, 'index']);
    Route::post('/addTareas', [TareaController::class, 'store']);
    Route::get('/getTareas/{id}', [TareaController::class, 'show']);
    Route::put('/updateTareas/{id}', [TareaController::class, 'update']);
    Route::delete('/deleteTareas/{id}', [TareaController::class, 'destroy']);
    Route::get('/exportPendientes', [TareaController::class, 'exportPendientes']);
});