"use client"

import { useState, useEffect } from "react"
import LanguageSelector from "./language-selector"
import TextArea from "./text-area"
import TranslatorActions from "./translator-actions"
import {
  TranslatorContainer,
  GlassCard,
  Header,
  ContentWrapper,
  LanguageBar,
  SwapButton,
  Divider,
} from "./translator.styles"

export interface Language {
  code: string
  name: string
  flag: string
}

const LANGUAGES: Language[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "pt", name: "Português", flag: "🇧🇷" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
]

export default function Translator() {
  const [sourceLanguage, setSourceLanguage] = useState<Language>(LANGUAGES[0])
  const [targetLanguage, setTargetLanguage] = useState<Language>(LANGUAGES[1])
  const [sourceText, setSourceText] = useState("")
  const [translatedText, setTranslatedText] = useState("")
  const [isTranslating, setIsTranslating] = useState(false)
  const [screenshot, setScreenshot] = useState<string | null>(null)
  const [screenshotError, setScreenshotError] = useState<string | null>(null)

  useEffect(() => {
    window.Main.on('start-screenshot', async () => {
      console.log("Received start-screenshot event")
      setScreenshot(null)
      setScreenshotError(null)
      try {
        const screenshotDataUrl = await window.Main.takeScreenshot()
        if (!screenshotDataUrl) {
          throw new Error("A função takeScreenshot não retornou dados.")
        }
        setScreenshot(screenshotDataUrl)
      } catch (error) {
        console.error("Falha ao capturar a tela:", error)
        setScreenshotError(error.message)
      }
    })
  }, [])

  const handleSwapLanguages = () => {
    setSourceLanguage(targetLanguage)
    setTargetLanguage(sourceLanguage)
    setSourceText(translatedText)
    setTranslatedText(sourceText)
  }

  const handleTranslate = async () => {
    if (!sourceText.trim()) return

    setIsTranslating(true)

    // Simulação de tradução - aqui você integraria com uma API real
    setTimeout(() => {
      setTranslatedText(`[Traduzido de ${sourceLanguage.name} para ${targetLanguage.name}]: ${sourceText}`)
      setIsTranslating(false)
    }, 1000)
  }

  const handleClear = () => {
    setSourceText("")
    setTranslatedText("")
  }

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch (err) {
      console.error("Failed to copy text:", err)
    }
  }

  const handleClearScreenshot = () => {
    setScreenshot(null)
    setScreenshotError(null)
  }

  return (
    <TranslatorContainer>
      <GlassCard>
        <Header>
          <h1>Tradutor</h1>
        </Header>

        <ContentWrapper>
          {screenshot && (
            <div style={{ marginBottom: '1rem', position: 'relative' }}>
              <img src={screenshot} alt="Screenshot" style={{ width: '100%', borderRadius: '8px' }} />
              <button 
                onClick={handleClearScreenshot} 
                style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer', fontSize: '16px' }}
                aria-label="Fechar Screenshot"
              >
                &times;
              </button>
            </div>
          )}
          {screenshotError && (
            <div style={{ marginBottom: '1rem', padding: '1rem', color: 'red', background: 'rgba(255, 0, 0, 0.1)', border: '1px solid red', borderRadius: '8px' }}>
                <strong>Erro ao capturar a tela:</strong>
                <p>{screenshotError}</p>
                <button onClick={handleClearScreenshot} style={{ marginTop: '10px' }}>OK</button>
            </div>
          )}
          <LanguageBar>
            <LanguageSelector
              languages={LANGUAGES}
              selectedLanguage={sourceLanguage}
              onSelectLanguage={setSourceLanguage}
              label="De"
            />

            <SwapButton onClick={handleSwapLanguages} aria-label="Trocar idiomas">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 16V4M7 4L3 8M7 4l4 4" />
                <path d="M17 8v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </SwapButton>

            <LanguageSelector
              languages={LANGUAGES}
              selectedLanguage={targetLanguage}
              onSelectLanguage={setTargetLanguage}
              label="Para"
            />
          </LanguageBar>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <TextArea
              value={sourceText}
              onChange={setSourceText}
              placeholder={`Digite o texto em ${sourceLanguage.name}...`}
              onCopy={() => handleCopy(sourceText)}
              showCopy={sourceText.length > 0}
              maxLength={5000}
            />

            <Divider />

            <TextArea
              value={translatedText}
              onChange={setTranslatedText}
              placeholder="Tradução"
              onCopy={() => handleCopy(translatedText)}
              showCopy={translatedText.length > 0}
              readOnly
              isTranslating={isTranslating}
            />
          </div>

          <TranslatorActions
            onTranslate={handleTranslate}
            onClear={handleClear}
            isTranslating={isTranslating}
            hasText={sourceText.length > 0}
          />
        </ContentWrapper>
      </GlassCard>
    </TranslatorContainer>
  )
}
