import Box from '@material-ui/core/Box';
import MButton from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';

export const Content = styled(Box)`
  padding: 15px 25px;
`;

export const ButtonsContainer = styled(Grid)<{darkMode?: boolean}>`
  margin-top: 20px !important;
  margin-bottom: 20px !important;

  .filter {
    position: absolute;
    background: ${(props) => (props.darkMode ? 'rgba(0, 0, 0, 0.35)' : 'rgba(255, 255, 255, 0.3)')};
    height: 100%;
    width: 100%;
    border-radius: 4px;
  }
`;

export const Button = styled(MButton).attrs({
  variant: 'contained',
  color: 'primary',
})`
  * {
    color: white;
    text-transform: none;
  }
`;

export const InputsContainer = styled.div`
  max-width: 800px;

  .input {
    margin-bottom: 20px;
  }
`;

export const ExportContainer = styled.div`

`;
