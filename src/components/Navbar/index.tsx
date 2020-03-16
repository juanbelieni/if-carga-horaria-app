import React from 'react';

import { Container, Tab } from './styles';

interface NavbarProps {
  tabs: {
    name: String,
    selected?: Boolean
  }[]
}

const Navbar : React.FC<NavbarProps> = ({ tabs }) => (
  <Container>
    {tabs.map((tab) => (<Tab selected={tab.selected}>{tab.name}</Tab>))}
  </Container>
);
export default Navbar;
