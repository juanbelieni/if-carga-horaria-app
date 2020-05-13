import React from 'react';

import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';

import { NavbarContainer } from './styles';

interface NavbarProps {
  onClick: () => any,
}

const Navbar : React.FC<NavbarProps> = ({ onClick }) => (
  <NavbarContainer
    position="relative"
    color="transparent"
  >
    <Toolbar>
      <IconButton onClick={onClick}>
        <MenuIcon />
      </IconButton>
    </Toolbar>
    <Divider />
  </NavbarContainer>
);

export default Navbar;
