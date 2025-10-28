"use client"

import { useState, useRef, useEffect } from "react"
import type { Language } from "./translator"
import { Label, SelectorContainer, Dropdown,SelectorButton, LanguageOption } from "./language-selector.style"

interface LanguageSelectorProps {
  languages: Language[]
  selectedLanguage: Language
  onSelectLanguage: (language: Language) => void
  label: string
}

export default function LanguageSelector({
  languages,
  selectedLanguage,
  onSelectLanguage,
  label,
}: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSelect = (language: Language) => {
    onSelectLanguage(language)
    setIsOpen(false)
  }

  return (
    <SelectorContainer ref={containerRef}>
      <Label>{label}</Label>
      <SelectorButton onClick={() => setIsOpen(!isOpen)}>
        <div className="language-info">
          <span className="flag">{selectedLanguage.flag}</span>
          <span>{selectedLanguage.name}</span>
        </div>
        <svg
          className={`chevron ${isOpen ? "open" : ""}`}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </SelectorButton>

      <Dropdown $isOpen={isOpen}>
        {languages.map((language) => (
          <LanguageOption
            key={language.code}
            $isSelected={language.code === selectedLanguage.code}
            onClick={() => handleSelect(language)}
          >
            <span className="flag">{language.flag}</span>
            <span>{language.name}</span>
          </LanguageOption>
        ))}
      </Dropdown>
    </SelectorContainer>
  )
}
