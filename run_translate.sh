#!/bin/bash

# Navega para o diretório do script
cd "$(dirname "$0")/python"

IMAGE_NAME="blink-translator-python"

if ! docker image inspect "$IMAGE_NAME" &> /dev/null; then
    echo "Construindo a imagem Docker '$IMAGE_NAME'..."
    docker build -t "$IMAGE_NAME" .
fi

echo "Executando tradução no contêiner..."
docker run --rm "$IMAGE_NAME" "$@"
