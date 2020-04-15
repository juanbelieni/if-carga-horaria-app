import React from 'react';

import Sidebar from '../Sidebar';
import { Container, Content } from './styles';

function DefaultPage({ children }: {children: React.ReactNode}) {
  return (
    <Container>
      <Sidebar />
      <Content>
        {children}
      </Content>
    </Container>
  );
}

export default DefaultPage;
