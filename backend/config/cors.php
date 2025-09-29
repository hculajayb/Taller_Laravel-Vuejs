<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Configuración para CORS cuando usas Sanctum con TOKENS (Bearer).
    | No se usan cookies, por lo que:
    |  - Sólo se exponen rutas bajo /api
    |  - supports_credentials debe ser false
    |  - Puedes dejar allowed_origins en '*' o restringirlo a tus hosts
    |
    */

    // Sólo la API (login/logout/me/usuarios/tareas ya están bajo /api)
    'paths' => ['api/*'],

    'allowed_methods' => ['*'],

    // Puedes dejar '*' o poner tus orígenes de dev/prod
    // ej.: ['http://tenant1.midominio.com:5173', 'https://app.midominio.com']
    'allowed_origins' => ['*'],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    // Con tokens Bearer NO necesitamos credenciales de navegador
    'supports_credentials' => false,
];