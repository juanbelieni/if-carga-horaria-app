import React, { useState } from 'react';

import { isMobile } from 'react-device-detect';

import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import { Container, Content } from './styles';

function DefaultPage({ children }: {children: React.ReactNode}) {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(!isMobile);

  return (
    <Container>
      <Sidebar
        open={sidebarIsOpen}
        onClose={() => setSidebarIsOpen(false)}
      />
      <Content>
        <Navbar
          onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
        />
        <div className="scrollable">
          {children}
        </div>
      </Content>
    </Container>
  );
}

export default DefaultPage;
