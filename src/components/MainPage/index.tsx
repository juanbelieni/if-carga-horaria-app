import React from 'react';

import Sidebar from '../Sidebar';
import { Container, Content } from './styles';

function MainPage({ children }: {children: React.ReactNode}) {
  return (
    <Container>
      <Sidebar page={0} />
      <Content>
        {children}
      </Content>
    </Container>
  );
}

export default MainPage;
