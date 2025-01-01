<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if files are sent
    if (isset($_FILES['file'])) {  // Expecting the key 'file'
        $fileTmpPath = $_FILES['file']['tmp_name'];
        $fileName = $_FILES['file']['name'];
        $fileSize = $_FILES['file']['size'];
        $fileType = $_FILES['file']['type'];

        // Define allowed file extensions (added txt and json for device info)
        $allowedExtensions = ['jpg', 'jpeg', 'png', 'pdf', 'docx', 'pptx', 'mp4', 'mov', 'avi', 'txt', 'json'];
        $fileExtension = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));

        // Check file extension
        if (!in_array($fileExtension, $allowedExtensions)) {
            echo json_encode(['status' => 'error', 'message' => 'Invalid file type.']);
            exit;
        }

        // Check file size (limit to 50MB in this example)
        $maxFileSize = 50 * 1024 * 1024; // 50 MB
        if ($fileSize > $maxFileSize) {
            echo json_encode(['status' => 'error', 'message' => 'File size exceeds the limit.']);
            exit;
        }

        // Specify the upload directory
        $uploadFileDir = './data/';
        // Create the upload directory if it doesn't exist
        if (!is_dir($uploadFileDir)) {
            mkdir($uploadFileDir, 0755, true);
        }

        // Handle file name conflict by appending a timestamp
        $newFileName = time() . '-' . $fileName;
        $dest_path = $uploadFileDir . basename($newFileName);

        // Check if the file was uploaded without errors
        if (is_uploaded_file($fileTmpPath)) {
            // Move the uploaded file to the specified directory
            if (move_uploaded_file($fileTmpPath, $dest_path)) {
                echo json_encode(['status' => 'success', 'message' => 'File is successfully uploaded.']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'There was an error moving the uploaded file.']);
            }
        } else {
            echo json_encode(['status' => 'error', 'message' => 'File was not uploaded correctly.']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'No file was uploaded.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
}
?>
