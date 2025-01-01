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

// Check if a command is provided
if (isset($_POST['command'])) {
    $command = $_POST['command'];
    $stmt = $conn->prepare("INSERT INTO commands (command) VALUES (?)");

    if (!$stmt) {
        die("Statement preparation failed: " . $conn->error);
    }

    $stmt->bind_param("s", $command);

    if ($stmt->execute()) {
        echo "Command added successfully.";
    } else {
        echo "Error adding command: " . $stmt->error;
    }

    $stmt->close();
} else {
    echo "No command provided.";
}

$conn->close();
?>
