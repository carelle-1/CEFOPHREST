<?php
require __DIR__ . '/vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$mail = new PHPMailer(true);
try {
    $config = require __DIR__ . '/config.php';
    $mail->isSMTP();
    $mail->Host       = $config['smtp_host'];
    $mail->SMTPAuth   = true;
    $mail->Username   = $config['smtp_username'];
    $mail->Password   = $config['smtp_password'];
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = (int) $config['smtp_port'];
    
    $mail->setFrom($config['from_email'], 'Test');
    $mail->addAddress($config['to_email']);
    $mail->Subject = 'Test envoi formulaire';
    $mail->Body = 'Test message - Formulaire contact fonctionne';
    
    $mail->send();
    echo 'Email envoyé avec succès' . PHP_EOL;
} catch (Exception $e) {
    echo 'Erreur: ' . $mail->ErrorInfo . PHP_EOL;
} catch (Throwable $e) {
    echo 'Erreur de configuration: ' . $e->getMessage() . PHP_EOL;
}
