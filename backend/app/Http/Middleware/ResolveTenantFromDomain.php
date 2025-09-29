<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;
use App\Models\Tenant;

class ResolveTenantFromDomain
{
    public function handle($request, Closure $next)
    {
        $host = $request->getHost(); // p.ej. tenant1.midominio.com

        // Busca el tenant por dominio en la BD CENTRAL
        $tenant = Tenant::where('domain', $host)->first();

        if (! $tenant) {
            // Opcional: 404 o seguir con la conexión por defecto
            abort(404, "Tenant no encontrado para dominio {$host}");
        }

        // Configura la conexión 'tenant' dinámicamente
        Config::set('database.connections.tenant', [
            'driver'   => 'mysql',
            'host'     => $tenant->db_host,
            'port'     => $tenant->db_port ?? 3306,
            'database' => $tenant->db_name,
            'username' => $tenant->db_user,
            'password' => $tenant->db_pass,
            'charset'  => 'utf8mb4',
            'collation'=> 'utf8mb4_unicode_ci',
            'prefix'   => '',
            'strict'   => true,
        ]);

        // Haz que sea la conexión por defecto durante este request (opcional)
        Config::set('database.default', 'tenant');

        // Reconecta para aplicar los cambios
        DB::purge('tenant');
        DB::reconnect('tenant');

        return $next($request);
    }
}