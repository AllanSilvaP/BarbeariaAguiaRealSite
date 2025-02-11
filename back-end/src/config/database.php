<?php
require_once __DIR__. '../../../../back-end/cred.env';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__. '');
$dotenv->load();

$servername = $_ENV['DB_HOST'];
$username = $_ENV['DB_USERNAME'];
$password = $_ENV['DB_PASSWORD'];
$database = $_ENV['DB_DATABASE'];

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
} else {
    printf("✅ Conexão efetuada com sucesso!");
}

$conn->close();
