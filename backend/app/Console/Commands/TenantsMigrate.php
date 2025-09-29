<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use App\Models\Tenant;
use App\Support\TenantConnection;

class TenantsMigrate extends Command
{
    protected $signature   = 'tenants:migrate {--domain=}';
    protected $description = 'Ejecuta migraciones de tenant (todas o sólo una con --domain=)';

    public function handle(): int
    {
        $domain = $this->option('domain');

        $query = Tenant::query();
        if ($domain) {
            $query->where('domain', $domain);
        }
        $tenants = $query->get();

        if ($tenants->isEmpty()) {
            $this->warn('No hay tenants que migrar.');
            return self::SUCCESS;
        }

        foreach ($tenants as $tenant) {
            $this->line("Migrando tenant: <info>{$tenant->name}</info> ({$tenant->domain})");

            // Conectar dinámicamente al tenant
            TenantConnection::use($tenant);

            // Ejecutar migraciones usando Artisan::call (evitamos inyección de Migrator)
            Artisan::call('migrate', [
                '--database' => 'tenant',
                '--path'     => 'database/migrations/tenant',
                '--force'    => true,
            ]);

            $this->output->write(Artisan::output());
            $this->info("✔ Migraciones aplicadas para {$tenant->domain}");
        }

        return self::SUCCESS;
    }
}
