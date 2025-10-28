import styled from "styled-components"

export const TextAreaContainer = styled.div`
  position: relative;
`

export const StyledTextArea = styled.textarea<{ $readOnly: boolean; $isTranslating: boolean }>`
  width: 90%;
  min-height: 150px;
  padding: 0.875rem;
  background: ${(props) => (props.$readOnly ? "rgba(0, 0, 0, 0.02)" : "rgba(255, 255, 255, 0.7)")};
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  color: rgba(0, 0, 0, 0.9);
  font-size: 0.9375rem;
  line-height: 1.6;
  resize: vertical;
  font-family: inherit;
  transition: all 0.2s ease;
  
  &::placeholder {
    color: rgba(0, 0, 0, 0.4);
  }
  
  &:focus {
    outline: none;
    border-color: rgba(102, 126, 234, 0.5);
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`

export const LoadingOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export const Spinner = styled.div`
  width: 2rem;
  height: 2rem;
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-top-color: rgba(102, 126, 234, 0.8);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
  padding: 0 0.25rem;
`

export const CharCount = styled.span`
  font-size: 0.75rem;
  color: rgba(0, 0, 0, 0.5);
`

export const CopyButton = styled.button`
  padding: 0.375rem 0.75rem;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.375rem;
  color: rgba(0, 0, 0, 0.7);
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.9);
    border-color: rgba(0, 0, 0, 0.15);
    color: rgba(0, 0, 0, 0.9);
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  &:focus-visible {
    outline: 2px solid rgba(102, 126, 234, 0.5);
    outline-offset: 2px;
  }
`