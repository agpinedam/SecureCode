import socket
import threading
import datetime

def handle_client(client_socket):
    request = client_socket.recv(1024).decode('utf-8')
    try:
        format_str = request.strip()
        current_time = datetime.datetime.now().strftime(format_str)
        client_socket.send(current_time.encode('utf-8'))
    except ValueError:
        client_socket.send(b"Invalid format")
    except Exception as e:
        client_socket.send(f"Error: {str(e)}".encode('utf-8'))
    client_socket.close()

def start_server(port):
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.bind(('0.0.0.0', port))
    server.listen(5)
    print(f"Server listening on port {port}")

    while True:
        client_socket, addr = server.accept()
        client_handler = threading.Thread(target=handle_client, args=(client_socket,))
        client_handler.start()

if __name__ == "__main__":
    port = 12345  # Default port; can be read from a config file
    start_server(port)
