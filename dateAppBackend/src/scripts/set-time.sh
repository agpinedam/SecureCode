#!/bin/bash
# set-time.sh

# Verifica que se haya proporcionado un argumento
if [ "$#" -ne 1 ]; then
  echo "Usage: $0 <date-time>"
  exit 1
fi

# Escapa el argumento para evitar inyecciones de comandos
DATE_TIME=$(printf '%s' "$1")

# Verifica que la fecha y hora estén en un formato válido (ajustar formato según necesidad)
if ! date -d "$DATE_TIME" >/dev/null 2>&1; then
  echo "Invalid date-time format. Please use 'YYYY-MM-DD HH:MM:SS'."
  exit 1
fi

# Configura la fecha y hora usando timedatectl
if ! timedatectl set-time "$DATE_TIME" >/dev/null 2>&1; then
  echo "Failed to set time"
  exit 1
fi

echo "Time set successfully"
