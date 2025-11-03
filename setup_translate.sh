#!/bin/bash

# Vai para a pasta python do projeto
cd "$(dirname "$0")/python"

# Cria o venv se não existir
if [ ! -d "venv" ]; then
    echo "Criando ambiente virtual..."
    python3 -m venv venv
fi

# Ativa o venv
source venv/bin/activate

# Atualiza pip
python -m pip install --upgrade pip

# Instala dependências
pip install argostranslate==1.9.0 requests

echo "Ambiente pronto! Use ./run_translate.sh para rodar o app"
