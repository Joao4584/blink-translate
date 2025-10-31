import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Translator from './translator/translator';
import { GlobalStyle } from '../config/global.style';

export function App() {
  const [screenshot, setScreenshot] = useState<string | null>(null);

  useEffect(() => {
    window.Main.on('screenshot-taken', (dataUrl: string) => {
      setScreenshot(dataUrl);
    });
  }, []);

  return (
    <Wrapper>
      <GlobalStyle />
      <Translator screenshot={screenshot} setScreenshot={setScreenshot} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end; 
  align-items: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;