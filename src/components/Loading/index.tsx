import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';

import { Container } from './styles';

export default function Loading() {
  return (
    <Container>
      <CircularProgress />
    </Container>
  );
}
