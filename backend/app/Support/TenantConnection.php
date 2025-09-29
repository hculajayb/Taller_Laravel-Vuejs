<?php

namespace App\Support;

use App\Models\Tenant;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;

class TenantConnection
{
    public static function use(Tenant $tenant): void
    {
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

        Config::set('database.default', 'tenant');

        DB::purge('tenant');
        DB::reconnect('tenant');
    }
}