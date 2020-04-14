import Box from '@material-ui/core/Box';
import styled from 'styled-components';


export const Container = styled(Box)`
  height: 100vh;
`;

export const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  padding: 30px 20px;

  p {
    font-weight: bold;
    font-size: 16px;
    text-transform: uppercase;
    text-align: center;

    margin-top: 10px;
  }
`;
