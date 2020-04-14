import Button from '@material-ui/core/Button';
import React from 'react';

import api from '../../api';
import { Container, Unform } from './styles';

interface FormProps {
  children: React.ReactNode,
  title: string,
  table: string,
}

export default function Form({ children, title, table }: FormProps) {
  async function submit(data: Object) {
    api.store(table, data);
  }

  return (
    <Container>
      <h1>{`Adicionar ${title}`}</h1>
      <Unform onSubmit={submit}>
        {children}
        <Button variant="contained" color="primary" className="button" type="submit" style={{ color: 'white' }}>Adicionar</Button>
      </Unform>
    </Container>
  );
}
