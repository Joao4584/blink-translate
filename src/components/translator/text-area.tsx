"use client"

import styled from "styled-components"
import { TextAreaContainer, CharCount, CopyButton, Footer,LoadingOverlay,Spinner,StyledTextArea } from "./text-area.style"


interface TextAreaProps {
  value: string
  onChange: (value: string) => void
  placeholder: string
  onCopy?: () => void
  showCopy?: boolean
  readOnly?: boolean
  maxLength?: number
  isTranslating?: boolean
}

export default function TextArea({
  value,
  onChange,
  placeholder,
  onCopy,
  showCopy = false,
  readOnly = false,
  maxLength,
  isTranslating = false,
}: TextAreaProps) {
  return (
    <div>
      <TextAreaContainer>
        <StyledTextArea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          readOnly={readOnly}
          maxLength={maxLength}
          disabled={isTranslating}
          $readOnly={readOnly}
          $isTranslating={isTranslating}
        />
        {isTranslating && (
          <LoadingOverlay>
            <Spinner />
          </LoadingOverlay>
        )}
      </TextAreaContainer>

      <Footer>
        {maxLength ? (
          <CharCount>
            {value.length} / {maxLength}
          </CharCount>
        ) : (
          <div />
        )}

        {showCopy && onCopy && (
          <CopyButton onClick={onCopy}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </svg>
            Copiar
          </CopyButton>
        )}
      </Footer>
    </div>
  )
}
