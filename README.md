# Rat-with-electron-and-kali

Electron with Kali Integration

This project demonstrates the integration of Electron with Python scripts to create a Remote Access Tool (RAT) for cybersecurity and ethical hacking purposes. It enables remote device management, information gathering, and secure data handling using Firebase and custom server configurations.

Features

Remote Command Execution: Execute Python commands on the target device remotely through Kali Linux.

Media Capture: Capture screenshots, videos, and images on the target device.

File Uploads: Upload captured media and documents to a specified server.

System Information: Collect and upload system information to Firebase for analysis.

Proxy Implementation: Anonymize operations by changing the IP address via a proxy server.

File Structure

main.js: Manages functionalities on the target device, including command execution and data collection.

main.py: Backend script for handling Python commands on Kali Linux.

package.json: Contains metadata and dependencies for the Electron app.

package-lock.json: Ensures consistent dependency versions.

screenshot.png: Visual representation of the app's interface or functionality.

Prerequisites

Node.js and npm

Install Node.js and npm from Node.js official site.

Python 3

Ensure Python 3 is installed on your system.

Kali Linux

Use this tool on a Kali Linux system for cybersecurity operations.

Firebase

Set up a Firebase project for command handling and data storage.

Installation

Clone the repository:

git clone https://github.com/yourusername/electron-with-kali.git
cd electron-with-kali

Install Node.js dependencies:

npm install

Configure Firebase:

Update Firebase configuration in firebase.js with your project details.

Configure the server:

Set up a server to handle file uploads at https://yourserver.com/uploadfile.php.

Usage

Start the Electron app:

npm start

Run the Python backend script on Kali Linux:

python3 main.py

Use the Electron interface to execute commands, capture media, or collect system information.

Monitor data uploads to Firebase and your server for analysis.

Proxy Implementation

Ensure the login.php file is hosted on your server.

Configure proxy IPs in login.txt.

Use the Expo app to anonymize operations by changing the system’s IP address dynamically.

Example Commands

Collect System Information

node main.js systeminfo

Upload Media Files

node main.js upload --file=path/to/media

Execute Remote Commands

python3 main.py "ls -la"

Screenshot



License

This project is licensed under the MIT License. See the LICENSE file for details.

Acknowledgments

Inspired by cybersecurity and ethical hacking practices.

Built with Electron, Node.js, Python, and Firebase.

