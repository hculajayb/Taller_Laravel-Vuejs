<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable; // Para login con Auth
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens;

class Usuario extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * Forzamos a que este modelo use la conexión "tenant".
     * Importante: en CLI (tinker/artisan) primero debes definir dinámicamente
     * la conexión 'tenant' (Config::set + DB::reconnect) para que esto funcione.
     */
    protected $connection = 'tenant';

    /**
     * Nombre de la tabla.
     */
    protected $table = 'usuarios';

    /**
     * Campos asignables en masa.
     */
    protected $fillable = [
        'nombre',
        'email',
        'password',
        'rol',
    ];

    /**
     * Campos ocultos en JSON.
     */
    protected $hidden = [
        'password',
        // 'remember_token', // descomenta si tu tabla lo tiene
    ];

    /**
     * Mutator de password:
     * - Si llega un texto plano, lo hashea.
     * - Si ya llega hasheado (p.ej. $2y$...), lo deja como está.
     */
    public function setPasswordAttribute($value): void
    {
        if (empty($value)) {
            $this->attributes['password'] = $value;
            return;
        }

        // Detecta si NO está hasheado (password_get_info()['algo'] === 0)
        $info = \password_get_info($value);
        if (empty($info['algo'])) {
            $this->attributes['password'] = Hash::make($value);
            return;
        }

        // Ya parece un hash válido: guarda tal cual
        $this->attributes['password'] = $value;
    }
}