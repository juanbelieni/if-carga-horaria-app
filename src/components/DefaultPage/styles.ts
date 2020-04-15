import Box from '@material-ui/core/Box';
import styled from 'styled-components';

export const Container = styled(Box).attrs({
  bgcolor: 'background.default',
})`
  display: flex;
  flex-direction: row;

  max-width: 100vw;
  max-height: 100vh;

`;

export const Content = styled(Box).attrs({
  bgcolor: 'background.paper',
  color: 'text.primary',
})`
  width: 100%;
  max-height: 100vh;
  overflow-y: scroll;
`;
