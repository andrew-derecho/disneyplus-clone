<?php
include 'config.php';

$sql = "SELECT * FROM movies ORDER BY release_date DESC LIMIT 10";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo "<div class='movie'>";
        echo "<img src='" . $row['thumbnail'] . "' alt='" . $row['title'] . "'>";
        echo "<h3>" . $row['title'] . "</h3>";
        echo "<p>" . $row['description'] . "</p>";
        echo "</div>";
    }
} else {
    echo "No new releases found.";
}

$conn->close();
