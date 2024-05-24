<?php
include 'config.php';

$data = json_decode(file_get_contents('php://input'), true);

$email = $data['email'];
$title = $data['title'];
$image = $data['image'];
$description = $data['description'];
$logo = $data['logo'];

$email = str_replace('%40', '@', $email);

$sql = "INSERT INTO watchlist (user_email, movie_id) VALUES ('$email', (SELECT id FROM movies WHERE title='$title'))";
if ($conn->query($sql) === TRUE) {
    echo 'success';
} else {
    echo 'error';
}
?>
