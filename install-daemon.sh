#!/bin/bash

# Define la ruta a tu proyecto
PROJECT_DIR="/path/to/your/project"

# Crea el archivo de servicio systemd
cat <<EOF | sudo tee /etc/systemd/system/dateapp-daemon.service
[Unit]
Description=Date App Daemon

[Service]
ExecStart=/usr/bin/npm run daemon
WorkingDirectory=$PROJECT_DIR
Restart=always
User=$(whoami)
Group=$(whoami)

[Install]
WantedBy=multi-user.target
EOF

# Recarga systemd para aplicar los cambios
sudo systemctl daemon-reload

# Habilita y arranca el servicio
sudo systemctl enable dateapp-daemon
sudo systemctl start dateapp-daemon

echo "Daemon installed and started successfully."
