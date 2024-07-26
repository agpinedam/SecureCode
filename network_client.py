import socket

def send_request(format_string, host='127.0.0.1', port=12346):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.connect((host, port))
        s.sendall(format_string.encode('utf-8'))
        response = s.recv(4096)
        print("Received:", response.decode('utf-8'))

if __name__ == "__main__":
    send_request("%Y-%m-%d %H:%M:%S")
