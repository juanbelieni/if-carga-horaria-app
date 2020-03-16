import PropTypes from 'prop-types';
import React from 'react';

import { Container } from './styles';

const Tabelas : React.FC<{children: React.ReactNode}> = ({ children }) => (
  <Container>
    {children}
  </Container>
);

Tabelas.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Tabelas;
