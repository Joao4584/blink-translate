import styled from "styled-components"

export const ActionsContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
`

export const Button = styled.button<{ $variant?: "default" | "outline" }>`
  padding: 0.625rem 1.5rem;
  background: ${(props) => (props.$variant === "outline" ? "rgba(255, 255, 255, 0.7)" : "rgba(102, 126, 234, 0.9)")};
  backdrop-filter: blur(10px);
  border: 1px solid
    ${(props) => (props.$variant === "outline" ? "rgba(0, 0, 0, 0.1)" : "rgba(102, 126, 234, 0.9)")};
  border-radius: 0.5rem;
  color: ${(props) => (props.$variant === "outline" ? "rgba(0, 0, 0, 0.7)" : "#ffffff")};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover:not(:disabled) {
    background: ${(props) => (props.$variant === "outline" ? "rgba(255, 255, 255, 0.9)" : "rgba(102, 126, 234, 1)")};
    border-color: ${(props) => (props.$variant === "outline" ? "rgba(0, 0, 0, 0.15)" : "rgba(102, 126, 234, 1)")};
    color: ${(props) => (props.$variant === "outline" ? "rgba(0, 0, 0, 0.9)" : "#ffffff")};
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  }
  
  &:active:not(:disabled) {
    transform: scale(0.98);
  }
  
  &:focus-visible {
    outline: 2px solid rgba(102, 126, 234, 0.5);
    outline-offset: 2px;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const SpinnerIcon = styled.div`
  width: 0.875rem;
  height: 0.875rem;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`
