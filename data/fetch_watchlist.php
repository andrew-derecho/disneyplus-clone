<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
include 'config.php';

header('Content-Type: application/json');

if (isset($_GET['email'])) {
    $email = $_GET['email'];

    $sql = "SELECT movies.title, movies.thumbnail FROM watchlist 
            JOIN movies ON watchlist.movie_id = movies.id 
            WHERE watchlist.user_email = ?";
    $stmt = $conn->prepare($sql);
    if ($stmt === false) {
        echo json_encode(['error' => 'prepare() failed: ' . htmlspecialchars($conn->error)]);
        exit;
    }

    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    $watchlist = [];

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $watchlist[] = [
                'title' => $row['title'],
                'thumbnail' => $row['thumbnail'],
            ];
        }
    } else {
        echo json_encode(['debug' => "No rows found for email: $email"]);
        exit;
    }

    $stmt->close();
    $conn->close();

    echo json_encode($watchlist);
} else {
    echo json_encode(['error' => 'Email parameter missing']);
}
?>
