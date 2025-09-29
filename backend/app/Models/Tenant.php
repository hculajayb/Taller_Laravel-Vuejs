<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tenant extends Model
{
    protected $fillable = [
        'name','domain','db_host','db_port','db_name','db_user','db_pass'
    ];
    protected $hidden = ['db_pass'];
}
