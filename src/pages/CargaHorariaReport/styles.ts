import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';

export const Content = styled(Box)`
  padding: 15px 25px;
`;

export const Buttons = styled(Grid)`
  margin-top: 20px !important;
  margin-bottom: 20px !important;
`;

export const ButtonContainer = styled(Grid)<{selected?: boolean}>`
  .filter {
    position: absolute;
    background: rgba(0, 0, 0, 0.3);
    height: 100%;
    width: 100%;
    border-radius: 4px;
  }

  * {
    color: white;
    text-transform: none;
  }
`;
