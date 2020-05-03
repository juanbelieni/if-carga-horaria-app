import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';

import { Container, Unform } from './styles';

interface FormProps {
  children: React.ReactNode,
  title?: string,
  onSubmit: (data: any) => Promise<any>,
}

export default function Form({ children, title, onSubmit }: FormProps) {
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  async function handleUnformSubmit(data: Object) {
    setDisableButton(true);
    try {
      await onSubmit(data);
    } catch (err) {
      setShowErrorMessage(true);
    }
    setDisableButton(false);
  }


  return (
    <Container>
      {title && <Typography variant="h4" component="h1">{title}</Typography>}
      <Unform onSubmit={handleUnformSubmit}>
        {children}
        <Button
          variant="contained"
          color="primary"
          className="button"
          type="submit"
          style={{ color: 'white' }}
          disabled={disableButton}
        >
          Concluir
        </Button>
      </Unform>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={showErrorMessage}
        onClose={() => setShowErrorMessage(false)}
        autoHideDuration={3000}
        message="Erro ao concluir"
      />
    </Container>
  );
}
