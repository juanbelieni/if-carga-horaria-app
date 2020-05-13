import React from 'react';

import ifSvg from '../../assets/svg/if.svg';
import DefaultPage from '../../components/DefaultPage';
import { Logo } from './styles';

const Landing: React.FC = () => (
  <DefaultPage>
    <Logo>
      <img src={ifSvg} alt="Logo" />
      <p>Instituto Federal</p>
    </Logo>
  </DefaultPage>
);

export default Landing;
