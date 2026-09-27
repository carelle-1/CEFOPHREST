<?php
// Copy this file to config.local.php and fill in a NEW Gmail App Password.
// Never commit config.local.php or expose it through the web server.
return [
    'smtp_host' => 'smtp.gmail.com',
    'smtp_port' => 587,
    'smtp_username' => 'your-address@gmail.com',
    'smtp_password' => 'your-16-character-google-app-password',
    'from_email' => 'your-address@gmail.com',
    'from_name' => 'CEFOPHREST - Formulaire Contact',
    'to_email' => 'recipient@example.com',
];
