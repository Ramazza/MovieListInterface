import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, sans-serif;
  }

  html, body, #root {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
  }
  
  body {
    background-color: #1c1c1c;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }
`;

export default GlobalStyles;
