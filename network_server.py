import socket
import threading
import datetime
import re

def handle_client(client_socket):
    try:
        data = b''
        while True:
            part = client_socket.recv(4096)
            if not part:
                break
            data += part
        
        request = data.decode('utf-8').strip()
        if not validate_format(request):
            client_socket.send(b"Invalid format")
            return
        
        current_time = datetime.datetime.now().strftime(request)
        client_socket.send(current_time.encode('utf-8'))
    except ValueError:
        client_socket.send(b"Invalid format")
    except Exception as e:
        client_socket.send(f"Error: {str(e)}".encode('utf-8'))
    finally:
        client_socket.close()

def validate_format(format_str):
    try:
        datetime.datetime.now().strftime(format_str)
        return True
    except ValueError:
        return False

def start_server(port):
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.bind(('0.0.0.0', port))
    server.listen(5)
    print(f"Server listening on port {port}")

    while True:
        client_socket, addr = server.accept()
        client_handler = threading.Thread(target=handle_client, args=(client_socket,))
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
