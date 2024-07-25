#!/bin/bash

# Verificar que el script es ejecutado con permisos elevados
if [[ $EUID -ne 0 ]]; then
   echo "This script must be run as root" 
   exit 1
fi

# Validar el formato de la fecha antes de proceder
if ! date -d "$1" >/dev/null 2>&1; then
    echo "Invalid date format. Use YYYY-MM-DD HH:MM:SS."
    exit 1
fi

# Actualizar la hora del sistema
date -s "$1"
