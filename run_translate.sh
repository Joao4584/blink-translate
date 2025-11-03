#!/bin/bash

cd "$(dirname "$0")/python"

source venv/bin/activate

python main.py "$@"

deactivate
