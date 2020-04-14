import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import { TextField, Select } from 'unform-material-ui';

import Form from '../../components/Form';
import MainPage from '../../components/MainPage';
// import { Container } from './styles';

export default function AdicionarPpc() {
  return (
    <MainPage>
      <Form title="PPC" table="ppcs">
        <TextField name="nome" label="Nome" className="input" required />
        <Select name="formacao" label="Formacao" className="input" required>
          <MenuItem value="Integrado">Integrado</MenuItem>
          <MenuItem value="Subsequente">Subsequente</MenuItem>
          <MenuItem value="Superior">Superior</MenuItem>
        </Select>
        <TextField name="ano" label="Ano" type="number" className="input" required />
        <Select name="semestral" label="Semestral ou anual?" className="input" required>
          <MenuItem value="1">Semestral</MenuItem>
          <MenuItem value="0">Anual</MenuItem>
        </Select>
        <TextField name="duracao" label="Duracao (em semestres ou anos)" type="number" className="input" required />
      </Form>
    </MainPage>
  );
}
