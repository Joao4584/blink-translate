import argostranslate.package
from argostranslate import translate

def ensure_model_installed(from_code: str, to_code: str, path: str) -> None:
    """
    Instala um modelo Argos caso ainda não esteja disponível.
    """
    installed = translate.get_installed_languages()
    exists = any(
        lang.code == from_code for lang in installed
    ) and any(lang.code == to_code for lang in installed)

    if not exists:
        print(f"📦 Instalando modelo {from_code} → {to_code} de {path}")
        argostranslate.package.install_from_path(path)
        print("✅ Modelo instalado com sucesso!\n")

def translate_text(text: str, from_code: str, to_code: str) -> str:
    """
    Traduz texto de um idioma para outro usando Argos Translate.
    """
    installed_languages = translate.get_installed_languages()

    from_lang = next(
        (lang for lang in installed_languages if lang.code == from_code), None
    )
    to_lang = next(
        (lang for lang in installed_languages if lang.code == to_code), None
    )

    if not from_lang or not to_lang:
        raise ValueError(f"Idiomas não encontrados: {from_code} → {to_code}")

    translation = from_lang.get_translation(to_lang)
    return translation.translate(text)
