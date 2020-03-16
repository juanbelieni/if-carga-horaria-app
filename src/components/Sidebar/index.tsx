import PropTypes from 'prop-types';
import React from 'react';
import {
  Link,
} from 'react-router-dom';

import ifSvg from '../../assets/svg/if.svg';
import relatoriosSvg from '../../assets/svg/relatorios.svg';
import tabelasSvg from '../../assets/svg/tabelas.svg';
import { Container, Logo, Item } from './styles';

const Sidebar : React.FC<{page: Number}> = ({ page }) => (
  <Container>
    <Logo>
      <img src={ifSvg} alt="Logo" />
      <p>Instituto Federal</p>
    </Logo>

    <Item selected={page === 0}>
      <img src={tabelasSvg} alt="" />
      <Link to="/tabelas">Tabelas</Link>
    </Item>

    <Item selected={page === 1}>
      <img src={relatoriosSvg} alt="" />
      <Link to="/relatorios">Relatórios</Link>
    </Item>

  </Container>
);


Sidebar.propTypes = {
  page: PropTypes.number.isRequired,
};

export default Sidebar;
