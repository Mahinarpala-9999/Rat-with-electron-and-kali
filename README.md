
# Remote Access Tool (RAT) with Electron and Kali Commands

This project is a Remote Access Tool (RAT) built with **Electron** that allows remote control and interaction with a Kali Linux system. The app enables the execution of Python commands, media file uploading, system information gathering, and more, all while storing and managing data through **Firebase**. The tool supports executing commands remotely, including controlling the device, collecting device data, and uploading media files.

## Features

- **Execute Python Commands on Kali Linux**: Run Python commands remotely on a Kali Linux system for various tasks.
- **Media Upload**: Upload images, videos, documents, and other media files to a specified server.
- **System Information Collection**: Capture device/system information and store it in Firebase for later access and analysis.
- **Remote Control**: Perform remote operations like taking screenshots, capturing videos, and downloading/uploading files.
- **Proxy IP Masking**: Mask the real IP address of the system by routing traffic through a proxy server for anonymity.

## Project Structure

The project is divided into several key files, each serving a specific purpose:

- **`main.js`**: Main JavaScript file that handles the core functionalities of the app. It communicates with the backend (Kali Linux) and processes commands.
- **`upload.js`**: Handles the upload functionality for media files (images, videos, documents) to a remote server.
- **`preload.js`**: Preloads necessary configuration and script files before the app runs.
- **`firebase.js`**: Contains the Firebase configuration and initialization to manage the data flow.
- **`firebase_commands.js`**: Executes commands received from Firebase to control the target device remotely.
- **`systeminfo.js`**: Collects system information (OS, hardware, etc.) from the target device and uploads it to Firebase or a server.

## Requirements

Before using or developing the project, make sure you have the following tools installed:

- **Node.js** (v23 or higher)
- **Electron** (for creating the desktop application)
- **Python 3.x** (for running Kali Linux commands)
- **Firebase** (for data storage and remote command execution)
- **Kali Linux** (for running the backend commands and interacting with the system)
- **A web server** for media file uploading (`https://mahendranathreddynarpala.online/uploadfile.php`)

## Installation

### Step 1: Clone the repository

Start by cloning the project repository to your local machine:
```bash
git clone https://github.com/your-repository-name.git
cd your-project-directory
```

### Step 2: Install Node.js dependencies

Use `npm` to install the required Node.js dependencies:
```bash
npm install
```

### Step 3: Install Python dependencies

If your project uses Python packages, make sure to install the required Python dependencies:
```bash
pip install -r requirements.txt
```

### Step 4: Set up Firebase

- Create a Firebase project from the [Firebase Console](https://console.firebase.google.com/).
- Obtain your Firebase project's configuration details (API keys, etc.) and add them to the `firebase.js` file.
- Set up Firebase Authentication and Firestore/Database (if required).

### Step 5: Run the Electron App

After setting up everything, start the Electron app:
```bash
npm start
```

This command will open the Electron application, which will communicate with your backend to execute commands.

## Usage

1. **Launch the Electron App**: Once the app is launched, it will communicate with the backend running on Kali Linux.
2. **Execute Remote Commands**: You can send commands from Firebase to execute on the Kali Linux system. The app can run commands like `device info`, `take screenshot`, `upload media files`, etc.
3. **Upload Media Files**: The app supports uploading various types of media to a server for storage and further analysis.
4. **System Information**: The app can gather device information (like OS version, hardware specs, etc.) and upload it to Firebase or a specified server.
5. **Proxy Functionality**: The app will route the device's internet traffic through a proxy server, masking the real IP address for anonymity.

### Example Commands

- **Device Info**: Retrieve and upload system information to Firebase:
  ```bash
  firebase.database().ref('commands/device_info').set({
      status: 'run',
      action: 'get_device_info'
  });
  ```

- **Take Screenshot**: Capture and upload a screenshot to the server:
  ```bash
  firebase.database().ref('commands/take_screenshot').set({
      status: 'run',
      action: 'capture_screenshot'
  });
  ```

- **Upload Media**: Upload an image file to the server:
  ```bash
  firebase.database().ref('commands/upload_media').set({
      status: 'run',
      action: 'upload_image',
      file: 'image_path'
  });
  ```

## Proxy Implementation

This project includes functionality for IP masking by using a proxy server. The app connects to a proxy server and routes its internet traffic, ensuring that the real IP address is hidden.

### Steps for Proxy Setup

1. **Login to the server**: The proxy server is controlled by the login credentials.
2. **Execute Proxy Change**: When the Expo app connects to the server, it uses the proxy IP from the `login.txt` file stored on the server.

## Contributing

We welcome contributions! If you have any ideas for improvements or bug fixes, feel free to fork the project and submit a pull request.

### Steps to Contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request to the main repository.

Please ensure that all contributions align with the project's overall structure and code style.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Disclaimer

This tool is intended for educational and ethical hacking purposes only. It should only be used in environments where explicit permission has been granted. Unauthorized use of this tool could be illegal and unethical. Always ensure you have permission before using this tool on any system.
