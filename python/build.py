import subprocess
import os

subprocess.run([
    "pyinstaller",
    "--onefile",
    "--name", "libretranslate-server",
    "--add-data", f"{os.path.dirname(__file__)}\\venv\\Lib\\site-packages\\libretranslate\\locales;libretranslate\\locales",
    "main.py"
], check=True)
