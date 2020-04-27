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
  action: {
    type: 'add' | 'edit',
    table: string,
    redirect: string,
    id?: number | string,
    defaultValues?: Object,
  },

}

export default function Form({ children, title, action }: FormProps) {
  const history = useHistory();
  const [open, setOpen] = React.useState(false);

  async function submit(data: Object) {
    try {
      switch (action.type) {
        case 'add':
          await api.store(action.table, { ...action.defaultValues, ...data });
          break;
        case 'edit':
          await api.update(action.table, action?.id || 0, { ...action.defaultValues, ...data });
          break;
        default:
      }
      history.push(action.redirect);
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
