<?php
include 'config.php';

$sql = "SELECT title, url, thumbnail, description, logo FROM movies";
$result = $conn->query($sql);

$movies = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $movies[] = [
            'name' => $row['title'],
            'trailer' => $row['url'],
            'thumbnail' => $row['thumbnail'],
            'description' => $row['description'],
            'logo' => $row['logo']
        ];
    }
}

$conn->close();

header('Content-Type: application/json');
echo json_encode($movies);
?>
