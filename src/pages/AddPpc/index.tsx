import MenuItem from '@material-ui/core/MenuItem';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TextField, Select } from 'unform-material-ui';

import api from '../../api';
import DefaultPage from '../../components/DefaultPage';
import Form from '../../components/Form';


export default function AddPpc() {
  const history = useHistory();
  const [annual, setAnnual] = useState<boolean>(true);

  async function handleSubmit(newPpc: Object) {
    await api.store('ppcs', newPpc);
    history.push('/tabelas/ppcs');
  }

  return (
    <DefaultPage>
      <Form
        title="Adicionar PPC"
        onSubmit={handleSubmit}
      >
        <TextField name="nome" label="Nome" className="input" required />
        <Select name="formacao" label="Formacao" className="input">
          <MenuItem value="Integrado">Integrado</MenuItem>
          <MenuItem value="Subsequente">Subsequente</MenuItem>
          <MenuItem value="Superior">Superior</MenuItem>
        </Select>
        <TextField name="ano" label="Ano" type="number" inputProps={{ min: 2000 }} className="input" required />
        <Select name="semestral" label="Semestral ou anual?" className="input" onChange={(e) => setAnnual(e.target.value === '0')}>
          <MenuItem value="1">Semestral</MenuItem>
          <MenuItem value="0">Anual</MenuItem>
        </Select>
        <TextField name="duracao" label={`Duração em ${annual ? 'anos' : 'semestres'}`} type="number" inputProps={{ min: 1 }} className="input" required />
      </Form>
    </DefaultPage>
  );
}
