import React from 'react';
import styled from 'styled-components';
import Translator from './translator/translator';
import { GlobalStyle } from '../config/global.style';

export function App() {


  return (
    <Wrapper>
      <GlobalStyle />
      <Translator/>
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