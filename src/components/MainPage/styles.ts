import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;

  max-width: 100vw;
  max-height: 100vh;

`;

export const Content = styled.div`
  width: 100%;
  max-height: 100vh;
  margin: 1rem;
  /* padding: 1rem 0; */
  overflow-y: scroll;
  /* overflow-x: hidden; */

  background-color: #333333;

  border-radius: 10px;
  /* margin-top: 1rem; */

  /* h1 {
    font-weight: 900;
    font-size: 37px;
    color: #CFCFCF;

    margin-left: 2rem;
  } */
`;
