#!/bin/bash

# Nombre del archivo de salida
output_file="output.txt"

# Crear/limpiar el archivo de salida
> "$output_file"

# Recorrer todos los archivos en el directorio y subdirectorios
find . -type f -not -name "$0" -print0 | while IFS= read -r -d '' file; do
    echo "===== $file =====" >> "$output_file"
    cat "$file" >> "$output_file"
    echo -e "\n\n" >> "$output_file"
done
