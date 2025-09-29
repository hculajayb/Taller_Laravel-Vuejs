<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('tenants', function (Blueprint $t) {
            $t->id();
            $t->string('name');
            $t->string('domain')->unique();     // ej: tenant1.midominio.com
            $t->string('db_host');
            $t->unsignedSmallInteger('db_port')->default(3306);
            $t->string('db_name');
            $t->string('db_user');
            $t->string('db_pass');
            $t->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('tenants'); }
};