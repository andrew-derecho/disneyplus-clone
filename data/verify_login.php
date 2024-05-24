<?php
include 'config.php';

if (!isset($_COOKIE['user_email'])) {
    header("Location: login.html");
    exit();
}

$email = $_COOKIE['user_email'];

$sql = "SELECT * FROM users WHERE email='$email'";
$result = $conn->query($sql);

if ($result->num_rows == 0) {
    header("Location: login.html");
    exit();
}