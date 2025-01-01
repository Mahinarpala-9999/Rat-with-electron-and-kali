<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $device_info = json_decode(file_get_contents('php://input'), true);
    
    if ($device_info) {
        file_put_contents('device_info.json', json_encode($device_info, JSON_PRETTY_PRINT));  // Save the device info to a file
        echo "Device info uploaded successfully.";
    } else {
        echo "Failed to parse device info.";
    }
} else {
    echo "Invalid request method.";
}
?>
