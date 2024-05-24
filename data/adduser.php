<?php
include 'config.php';

$username = "johndoe";
$email = "johndoe@example.com";
$password = password_hash("password123", PASSWORD_BCRYPT); 
$sql = "INSERT INTO users (username, email, password) VALUES ('$username', '$email', '$password')";

if ($conn->query($sql) === TRUE) {
    echo "New user created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
