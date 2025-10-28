import styled from "styled-components"


export const SelectorContainer = styled.div`
  flex: 1;
  position: relative;
`

export const Label = styled.span`
  display: block;
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.7);
  margin-bottom: 0.5rem;
  font-weight: 500;
`

export const SelectorButton = styled.button`
  width: 100%;
  padding: 0.625rem 0.875rem;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  color: rgba(0, 0, 0, 0.9);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.9);
    border-color: rgba(0, 0, 0, 0.15);
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  }
  
  &:focus-visible {
    outline: 2px solid rgba(102, 126, 234, 0.5);
    outline-offset: 2px;
    border-color: rgba(102, 126, 234, 0.5);
  }
  
  .language-info {
    display: flex;
    align-items: center;
    gap: 0.625rem;
  }
  
  .flag {
    font-size: 1.125rem;
  }
  
  .chevron {
    transition: transform 0.2s ease;
    
    &.open {
      transform: rotate(180deg);
    }
  }
`

export const Dropdown = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  box-shadow: 
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -2px rgba(0, 0, 0, 0.1);
  max-height: 300px;
  overflow-y: auto;
  z-index: 50;
  opacity: ${(props) => (props.$isOpen ? 1 : 0)};
  visibility: ${(props) => (props.$isOpen ? "visible" : "hidden")};
  transform: translateY(${(props) => (props.$isOpen ? 0 : "-4px")});
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.03);
    border-radius: 0.5rem;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 0.5rem;
    
    &:hover {
      background: rgba(0, 0, 0, 0.3);
    }
  }
`

export const LanguageOption = styled.button<{ $isSelected: boolean }>`
  width: 100%;
  padding: 0.625rem 0.875rem;
  background: ${(props) => (props.$isSelected ? "rgba(102, 126, 234, 0.1)" : "transparent")};
  color: rgba(0, 0, 0, 0.9);
  font-size: 0.875rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.625rem;
  transition: all 0.15s ease;
  border: none;
  text-align: left;
  font-weight: ${(props) => (props.$isSelected ? "500" : "400")};
  
  &:hover {
    background: rgba(102, 126, 234, 0.08);
  }
  
  &:first-child {
    border-radius: 0.5rem 0.5rem 0 0;
  }
  
  &:last-child {
    border-radius: 0 0 0.5rem 0.5rem;
  }
  
  .flag {
    font-size: 1.125rem;
  }
`
