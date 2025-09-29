<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Validator;
use PDO;
use App\Models\Tenant;
use App\Models\Usuario;
use App\Support\TenantConnection;

class TenantProvision extends Command
{
    protected $signature = 'tenant:provision
        {domain : Dominio del tenant, p.ej. tenant2.midominio.com}
        {--name=Tenant}
        {--db_host=127.0.0.1}
        {--db_port=3306}
        {--db_name=}
        {--db_user=}
        {--db_pass=}
        {--admin_email=admin@demo.test}
        {--admin_name=Admin}
        {--admin_password=secret}
        {--no-create-db : No crear BD ni usuario en MySQL}
        {--no-migrate : No ejecutar migraciones del tenant}
    ';

    protected $description = 'Provisiona un nuevo tenant (BD, registro central, migraciones y admin)';

    public function handle(): int
    {
        $data = [
            'domain'         => $this->argument('domain'),
            'name'           => $this->option('name') ?? 'Tenant',
            'db_host'        => $this->option('db_host') ?? '127.0.0.1',
            'db_port'        => (int) ($this->option('db_port') ?? 3306),
            'db_name'        => $this->option('db_name'),
            'db_user'        => $this->option('db_user'),
            'db_pass'        => $this->option('db_pass') ?? '',   // 👈 puede ser vacío
            'admin_email'    => $this->option('admin_email') ?? 'admin@demo.test',
            'admin_name'     => $this->option('admin_name') ?? 'Admin',
            'admin_password' => $this->option('admin_password') ?? 'secret',
        ];

        $v = Validator::make($data, [
            'domain'         => ['required','string'],
            'name'           => ['required','string','max:150'],
            'db_host'        => ['required','string'],
            'db_port'        => ['required','integer'],
            'db_name'        => ['required','string'],
            'db_user'        => ['required','string'],
            'db_pass'        => ['nullable','string'],           // 👈 permitido vacío
            'admin_email'    => ['required','email'],
            'admin_name'     => ['required','string'],
            'admin_password' => ['required','string','min:6'],
        ]);

        if ($v->fails()) {
            foreach ($v->errors()->all() as $err) $this->error($err);
            return self::INVALID;
        }

        if (Tenant::where('domain', $data['domain'])->exists()) {
            $this->error("Ya existe un tenant con el dominio {$data['domain']}.");
            return self::FAILURE;
        }

        // 2) Crear BD y usuario (opcional)
        if (! $this->option('no-create-db')) {
            $this->createDatabaseAndUser(
                rootHost: $data['db_host'],
                rootPort: $data['db_port'],
                rootUser: env('PROVISION_DB_ROOT_USER', 'root'),
                rootPass: env('PROVISION_DB_ROOT_PASS', ''), // 👈 soporta root sin password
                dbName :  $data['db_name'],
                dbUser :  $data['db_user'],
                dbPass :  $data['db_pass']   // 👈 puede ser ''
            );
        }

        // 3) Registrar tenant en central
        $tenant = Tenant::create([
            'name'           => $data['name'],
            'domain'         => $data['domain'],
            'db_host'        => $data['db_host'],
            'db_port'        => $data['db_port'],
            'db_name'        => $data['db_name'],
            'db_user'        => $data['db_user'],
            'db_pass'        => $data['db_pass'],
            'session_domain' => '.'.implode('.', array_slice(explode('.', $data['domain']), -2)),
        ]);
        $this->info("✔ Tenant creado en central: {$tenant->domain}");

        // 4) Migraciones del tenant
        if (! $this->option('no-migrate')) {
            Artisan::call('tenants:migrate', ['--domain' => $tenant->domain]);
            $this->output->write(Artisan::output());
        }

        // 5) Usuario admin
        TenantConnection::use($tenant);
        $admin = new Usuario([
            'nombre'   => $data['admin_name'],
            'email'    => $data['admin_email'],
            'password' => $data['admin_password'],
            'rol'      => 'admin',
        ]);
        $admin->setConnection('tenant');
        $admin->save();

        $this->info("✔ Usuario admin creado: {$admin->email}");
        $this->line('');
        $this->info('🎉 Provisionamiento completado');
        $this->line("Dominio: http://{$tenant->domain}");
        $this->line("Admin:   {$admin->email} / {$data['admin_password']}");

        return self::SUCCESS;
    }

    protected function createDatabaseAndUser(
        string $rootHost,
        int $rootPort,
        string $rootUser,
        string $rootPass,   // puede ser ''
        string $dbName,
        string $dbUser,
        string $dbPass      // puede ser ''
    ): void {
        $dsn = "mysql:host={$rootHost};port={$rootPort};charset=utf8mb4";
        $pdo = new PDO($dsn, $rootUser, $rootPass, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);

        $pdo->exec("CREATE DATABASE IF NOT EXISTS `{$dbName}` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");

        // Crear/actualizar usuario y privilegios (tolerante a usuario existente)
        $escapedPass = str_replace("'", "''", $dbPass);
        $pdo->exec("CREATE USER IF NOT EXISTS '{$dbUser}'@'%' IDENTIFIED BY '{$escapedPass}'");
        $pdo->exec("CREATE USER IF NOT EXISTS '{$dbUser}'@'localhost' IDENTIFIED BY '{$escapedPass}'");
        $pdo->exec("GRANT ALL PRIVILEGES ON `{$dbName}`.* TO '{$dbUser}'@'%'");
        $pdo->exec("GRANT ALL PRIVILEGES ON `{$dbName}`.* TO '{$dbUser}'@'localhost'");
        $pdo->exec("FLUSH PRIVILEGES");

        $this->info("✔ BD `{$dbName}` y usuario `{$dbUser}` configurados");
    }
}
