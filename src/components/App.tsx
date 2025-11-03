import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Translator from './translator/translator';
import { GlobalStyle } from '../config/global.style';

export function App() {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [platform, setPlatform] = useState('');

  useEffect(() => {
    window.Main.getPlatform().then(setPlatform);

    window.Main.on('screenshot-taken', (dataUrl: string) => {
      setScreenshot(dataUrl);
    });
  }, []);

  return (
    <Wrapper className={platform === 'linux' ? 'linux' : ''}>
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

  &.linux {
    background-color: #222;
    border-radius: 8px;
    overflow: hidden; /* This is important to make the border-radius clip the content */
  }
`;