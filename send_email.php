<?php
require __DIR__ . '/vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

function showError(string $message, int $statusCode = 500): never
{
    http_response_code($statusCode);
    $safeMessage = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');
    echo '<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Erreur d’envoi</title></head><body style="font-family:Arial,sans-serif;max-width:680px;margin:80px auto;padding:24px">'
        . '<h1>Message non envoyé</h1><p>' . $safeMessage . '</p>'
        . '<p><a href="contact.html">Retour au formulaire de contact</a></p></body></html>';
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    showError('Méthode non autorisée.', 405);
}

$name      = trim($_POST['name'] ?? '');
$email     = trim($_POST['email'] ?? '');
$subject   = trim($_POST['subject'] ?? '');
$message   = trim($_POST['message'] ?? '');

if (empty($name) || empty($email) || empty($subject) || empty($message)) {
    showError('Tous les champs sont obligatoires.', 422);
}

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
    $mail->CharSet    = PHPMailer::CHARSET_UTF8;

    $mail->setFrom($config['from_email'], $config['from_name']);
    $mail->addAddress($config['to_email']);
    $mail->addReplyTo($email, $name);

    $mail->isHTML(true);
    $mail->Subject = 'Nouveau message contact: ' . $subject;
    $mail->Body    = "
        <html>
        <body>
            <h2>Nouveau message depuis le formulaire de contact</h2>
            <p><strong>Nom & Prénom :</strong> {$name}</p>
            <p><strong>Email :</strong> {$email}</p>
            <p><strong>Sujet :</strong> {$subject}</p>
            <p><strong>Message :</strong></p>
            <p>" . nl2br($message) . "</p>
        </body>
        </html>
    ";
    $mail->AltBody = "Nom: {$name}\nEmail: {$email}\nSujet: {$subject}\nMessage:\n{$message}";

    $mail->send();
    header('Location: contact.html?status=sent');
    exit;
} catch (Exception $e) {
    error_log('Contact form mail error: ' . $mail->ErrorInfo);
    showError('Le serveur e-mail est indisponible. Veuillez réessayer plus tard.');
} catch (Throwable $e) {
    error_log('Contact form configuration error: ' . $e->getMessage());
    showError('La messagerie du site n’est pas configurée. Contactez l’administrateur du site.');
}
