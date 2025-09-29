<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Artisan;
use App\Models\Tenant;

class TenantsMigrate extends Command
{
    protected $signature = 'tenants:migrate {--fresh} {--seed}';
    protected $description = 'Ejecuta migraciones para todas las BD de tenants';

    public function handle(): int
    {
        $tenants = Tenant::all();
        if ($tenants->isEmpty()) {
            $this->warn('No hay tenants.');
            return self::SUCCESS;
        }

        foreach ($tenants as $tenant) {
            $this->info("Migrando: {$tenant->domain}");

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
            DB::purge('tenant');
            DB::reconnect('tenant');

            $params = [
                '--database' => 'tenant',
                '--path'     => 'database/migrations/tenant',
                '--force'    => true,
            ];
            $this->call($this->option('fresh') ? 'migrate:fresh' : 'migrate', $params);

            if ($this->option('seed')) {
                Artisan::call('db:seed', [
                    '--database' => 'tenant',
                    '--force'    => true,
                    // '--class' => \Database\Seeders\TenantDatabaseSeeder::class,
                ]);
            }

            $this->info("OK: {$tenant->domain}");
        }

        return self::SUCCESS;
    }
}