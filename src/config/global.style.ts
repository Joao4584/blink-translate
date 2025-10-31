import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Geist';
    src: url('./assets/font/Geist/Geist-VariableFont_wght.ttf') format('truetype');
    font-weight: 100 900;
  }

  body {
    font-family: 'Geist', sans-serif;
    margin: 0;
    padding: 0;
    color: #d4d4d4;
    height: 100vh;
    width: 100vw;
    background-color: transparent;
  }

  #root {
    height: 100%;
    width: 100%;
  }
`;
