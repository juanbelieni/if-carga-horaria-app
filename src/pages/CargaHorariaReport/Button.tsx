import React, { MouseEvent } from 'react';

import MTButton from '@material-ui/core/Button';

import { ButtonContainer } from './styles';

interface ButtonProps {
  children: React.ReactNode | string,
  onClick: (e: MouseEvent) => any,
  selected?: boolean,
}

const Button: React.FC<ButtonProps> = ({ children, selected, onClick }) => (
  <ButtonContainer selected={selected} item>
    <MTButton
      variant="contained"
      color="primary"
      disableElevation={!selected}
      onClick={onClick}
    >
      {children}
      { !selected && (<div className="filter" />) }
    </MTButton>
  </ButtonContainer>
);

export default Button;
