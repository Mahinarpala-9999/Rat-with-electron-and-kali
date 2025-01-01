<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if the file is uploaded
    if (isset($_FILES['file'])) {
        $file = $_FILES['file'];
        $uploadDirectory = 'uploads/'; // Specify your upload directory

        // Ensure the directory exists
        if (!is_dir($uploadDirectory)) {
            mkdir($uploadDirectory, 0755, true);
        }

        // Generate a unique filename and move the uploaded file
        $filePath = $uploadDirectory . basename($file['name']);
        if (move_uploaded_file($file['tmp_name'], $filePath)) {
            echo 'File uploaded successfully: ' . $filePath;
        } else {
            echo 'File upload failed.';
        }
    } else {
        echo 'No file uploaded.';
    }
} else {
    echo 'Invalid request method.';
}
?>
