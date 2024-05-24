<?php
include 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['email']) && isset($_POST['password'])) {
        $email = $_POST['email'];
        $password = $_POST['password'];

        $email = $conn->real_escape_string($email);

        $sql = "SELECT * FROM users WHERE email='$email'";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            if ($password === $row['password']) {
                setcookie("user_email", $email, time() + (86400 * 30), "/"); header("Location: ../home.html");
                exit();
            } else {
                echo "Invalid password.";
            }
        } else {
            echo "No user found with this email.";
        }
    } else {
        echo "Email and Password are required.";
    }

    $conn->close();
} else {
    echo "Invalid request method.";
}
?>
