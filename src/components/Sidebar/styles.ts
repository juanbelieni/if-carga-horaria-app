import Box from '@material-ui/core/Box';
import ListItem from '@material-ui/core/ListItem';
import styled from 'styled-components';


export const Container = styled(Box)`
  height: 100vh;

  #dark-mode-switch {
    margin-top: auto;
  }
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

export const ListTitle = styled(ListItem)`
  * {
    font-weight: bold !important;
  }
`;

export const ListLink = styled(ListItem)`
  padding-left: 30px !important;
  padding-top: 4px !important;
  padding-bottom: 4px !important;
`;
