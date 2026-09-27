<?php

$localConfig = __DIR__ . '/config.local.php';
if (!is_file($localConfig)) {
    throw new RuntimeException('La configuration e-mail est absente. Créez config.local.php à partir de config.example.php.');
}

$config = require $localConfig;
foreach (['smtp_host', 'smtp_port', 'smtp_username', 'smtp_password', 'from_email', 'from_name', 'to_email'] as $key) {
    if (empty($config[$key])) {
        throw new RuntimeException("Configuration e-mail incomplète : {$key}");
    }
}

return $config;
