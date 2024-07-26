import socket
import threading
import datetime

FORMAT_CONVERSIONS = {
    'YYYY-MM-DD HH:mm:SS': '%Y-%m-%d %H:%M:%S',
    'YYYY/MM/DD HH:mm:SS': '%Y/%m/%d %H:%M:%S',
    'DD-MM-YYYY HH:mm:SS': '%d-%m-%Y %H:%M:%S',
    'DD/MM/YYYY HH:mm:SS': '%d/%m/%Y %H:%M:%S',
    'YYYY-MM-DD HH:mm': '%Y-%m-%d %H:%M',
    'DD-MM-YYYY HH:mm': '%d-%m-%Y %H:%M',
    'YYYY-MM-DD': '%Y-%m-%d',
    'DD-MM-YYYY': '%d-%m-%Y',
    'HH:mm:SS': '%H:%M:%S',
    'HH:mm': '%H:%M'
}

def convert_format(custom_format):
    return FORMAT_CONVERSIONS.get(custom_format, None)

def validate_format(format_str):
    return convert_format(format_str) is not None

def handle_client(client_socket, addr):
    print(f"Accepted connection from {addr}")
    try:
        data = client_socket.recv(1024).decode('utf-8').strip()
        if data:
            print(f"Received request: '{data}'")
            converted_format = convert_format(data)
            if converted_format:
                current_time = datetime.datetime.now().strftime(converted_format)
                response = f"{current_time}\n"
            else:
                response = "Invalid format\n"
            client_socket.send(response.encode('utf-8'))
            print(f"Sending response: '{response.strip()}'")
        client_socket.close()
    except Exception as e:
        print(f"Error: {e}")
        client_socket.close()

def start_server(port):
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.bind(('0.0.0.0', port))
    server.listen(5)
    print(f"Server listening on port {port}")

    while True:
        client_socket, addr = server.accept()
        client_handler = threading.Thread(target=handle_client, args=(client_socket, addr))
        client_handler.start()

def load_port_from_config():
    try:
        with open('config.txt', 'r') as f:
            port = int(f.read().strip())
    except Exception as e:
        print(f"Error reading config file: {e}")
        port = 12345  # Default port
    return port

if __name__ == "__main__":
    port = load_port_from_config()
    start_server(port)
