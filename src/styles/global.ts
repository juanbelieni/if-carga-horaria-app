import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
 * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;

    font-family: 'Red Hat Display', sans-serif;
  }

  :root {
    font-size: 16px;
  }
  
  body {
    max-height: 100vh;
    overflow: hidden;
  }

  .MuiButton-root * {
    text-transform: none;
  }

  .MuiButton-contained * {
    color: white;
  }
`;
