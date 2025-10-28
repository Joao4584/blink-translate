"use client"

import styled from "styled-components"
import { ActionsContainer, Button, SpinnerIcon } from "./translator-actions.style"

interface TranslatorActionsProps {
  onTranslate: () => void
  onClear: () => void
  isTranslating: boolean
  hasText: boolean
}

export default function TranslatorActions({ onTranslate, onClear, isTranslating, hasText }: TranslatorActionsProps) {
  return (
    <ActionsContainer>
      <Button $variant="outline" onClick={onClear} disabled={!hasText || isTranslating}>
        Limpar
      </Button>

      <Button onClick={onTranslate} disabled={!hasText || isTranslating}>
        {isTranslating ? (
          <>
            <SpinnerIcon />
            Traduzindo...
          </>
        ) : (
          <>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m5 8 6 6" />
              <path d="m4 14 6-6 2-3" />
              <path d="M2 5h12" />
              <path d="M7 2h1" />
              <path d="m22 22-5-10-5 10" />
              <path d="M14 18h6" />
            </svg>
            Traduzir
          </>
        )}
      </Button>
    </ActionsContainer>
  )
}
