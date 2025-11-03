"use client"

import styled from "styled-components"

export const TranslatorContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

`

export const GlassCard = styled.div`
  position: relative;
  width: 95%;
  max-width: 500px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-radius: 0.75rem;
  overflow: hidden;
  z-index: 1;

  .linux & {
    border-radius: 0rem;
    width: 100%;
  }
  
`

export const Header = styled.div`
  padding: 1.5rem 1.5rem 1rem;
  background: linear-gradient(180deg, rgba(233, 232, 232, 0.4) 0%, rgba(255, 255, 255, 0.1) 100%);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  
  h1 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
    color: rgba(46, 46, 46, 0.9);
    letter-spacing: -0.025em;
  }
  
  p {
    margin: 0.25rem 0 0;
    font-size: 0.875rem;
    color: rgba(0, 0, 0, 0.6);
  }
`

export const ContentWrapper = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: 80vh;
  gap: 1.5rem;
`

export const LanguageBar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  @media (max-width: 640px) {
    flex-direction: column;
    align-items: stretch;
  }
`

export const SwapButton = styled.button`
  padding: 0.625rem;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  color: rgba(0, 0, 0, 0.7);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  &:hover {
    background: rgba(255, 255, 255, 0.8);
    border-color: rgba(0, 0, 0, 0.15);
    color: rgba(0, 0, 0, 0.9);
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  &:focus-visible {
    outline: 2px solid rgba(102, 126, 234, 0.5);
    outline-offset: 2px;
  }
  
  svg {
    display: block;
    transition: transform 0.3s ease;
  }
  
  &:hover svg {
    transform: rotate(180deg);
  }
  
  @media (max-width: 640px) {
    align-self: center;
    
    svg {
      transform: rotate(90deg);
    }
    
    &:hover svg {
      transform: rotate(270deg);
    }
  }
`

export const Divider = styled.div`
  height: 1px;
  background: rgba(0, 0, 0, 0.06);
  margin: 0.5rem 0;
`
