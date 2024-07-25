#!/bin/bash

# Eliminar la extensión .txt de todos los archivos en el directorio y subdirectorios
find . -type f -name "*.txt" -print0 | while IFS= read -r -d '' file; do
    # Si el archivo tiene exactamente la extensión .txt y no tiene más de un punto en el nombre
    if [[ "$file" != *.txt ]]; then
        continue
    fi

    # Eliminar la extensión .txt
    mv "$file" "${file%.txt}"
done
