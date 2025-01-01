<?php
// Enable error reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$servername = "localhost";
$username = "u717251204_mahi";
$password = "Mahi@7922";
$dbname = "u717251204_data";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Database connection failed: " . $conn->connect_error);
}

// Retrieve the latest command
$sql = "SELECT id, command FROM commands ORDER BY created_at DESC LIMIT 1";
$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {
    $row = $result->fetch_assoc();
    echo json_encode($row);

    // Delete the command after fetching
    $deleteSql = "DELETE FROM commands WHERE id=" . $row['id'];
    $conn->query($deleteSql);
} else {
    echo json_encode(["command" => "none"]);
}

$conn->close();
?>
