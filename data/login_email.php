<?php
include 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['email'])) {
        $email = $_POST['email'];

        $sql = "SELECT * FROM users WHERE email='$email'";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            header("Location: ../login_password.html?email=" . urlencode($email));
            exit();
        } else {
            header("Location: ../register.html?email=" . urlencode($email));
        }
    } else {
        echo "Email is required.";
    }

    $conn->close();
}
