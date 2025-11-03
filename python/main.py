import sys
import os
from utils.translator import ensure_model_installed, translate_text

LANG_DIR = os.path.join(os.path.dirname(__file__), "languages")

def main():
    # --- Verifica argumentos ---
    if len(sys.argv) < 4:
        print("Uso: python main.py <texto> <from_lang> <to_lang>")
        print("Exemplo: python main.py 'Hello world' en pt")
        sys.exit(1)

    text = sys.argv[1]
    from_code = sys.argv[2]
    to_code = sys.argv[3]

    # --- Instala modelos se necessário ---
    model_filename = f"translate-{from_code}_{to_code}.argosmodel"
    model_path = os.path.join(LANG_DIR, model_filename)

    if os.path.exists(model_path):
        ensure_model_installed(from_code, to_code, model_path)

    # --- Traduz ---
    try:
        translated = translate_text(text, from_code, to_code)
        print(f"[{from_code} → {to_code}] {text} → {translated}")
    except Exception as e:
        print(f"❌ Erro: {e}")

if __name__ == "__main__":
    main()
