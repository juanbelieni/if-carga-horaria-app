import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
 * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;

    /* font-family: 'Open Sans', sans-serif; */
    font-family: 'Red Hat Display', sans-serif;

    scrollbar-color: #1c1e1f #2a2c2e;
  }

  :root {
    font-size: 16px;
  }
  
  body {
    background-color: #282828;
    max-height: 100vh;
    overflow: hidden;
  }
`;
