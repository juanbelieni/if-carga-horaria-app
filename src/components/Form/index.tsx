import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../api';
import { Container, Unform } from './styles';

interface FormProps {
  children: React.ReactNode,
  title?: string,
  table: string,
  redirect?: string,
  defaultValues?: Object,
}

export default function Form({
  children, title, table, redirect, defaultValues,
}: FormProps) {
  const history = useHistory();
  const [open, setOpen] = React.useState(false);

  async function submit(data: Object) {
    try {
      await api.store(table, { ...defaultValues, ...data });
      history.push(redirect || `/tabelas/${table}`);
    } catch (err) {
      setOpen(true);
    }
  }

  return (
    <Container>
      {title && <Typography variant="h4" component="h1">{title}</Typography>}
      <Unform onSubmit={submit}>
        {children}
        <Button variant="contained" color="primary" className="button" type="submit" style={{ color: 'white' }}>Concluir</Button>
      </Unform>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={open}
        onClose={() => setOpen(false)}
        autoHideDuration={3000}
        message="Erro ao concluir"
      />
    </Container>
  );
}
