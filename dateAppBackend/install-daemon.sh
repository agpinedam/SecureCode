#!/bin/bash
# install-daemon.sh

# Instala ts-node si no está instalado
npm install -g ts-node

# Asigna permisos de ejecución al script del daemon
chmod +x src/daemon.ts

# Crea un archivo de servicio para el daemon (por ejemplo, usando systemd)
echo "[Unit]
Description=Custom Node.js Daemon
After=network.target

[Service]
ExecStart=/usr/local/bin/ts-node /home/angie/Documents/Praga/Securecode/tpjs/dateAppBackend/src/daemon.ts
Restart=always
User=$(whoami)
Group=$(whoami)

[Install]
WantedBy=multi-user.target" | sudo tee /etc/systemd/system/dateapp-daemon.service

# Recarga el demonio de systemd para reconocer el nuevo servicio
sudo systemctl daemon-reload

# Habilita el servicio para que se inicie en el arranque
sudo systemctl enable dateapp-daemon.service

# Inicia el servicio
sudo systemctl start dateapp-daemon.service

echo "Daemon installed and started successfully."
