import MenuItem from '@material-ui/core/MenuItem';
import React, { useState } from 'react';
import { TextField, Select } from 'unform-material-ui';

import DefaultPage from '../../components/DefaultPage';
import Form from '../../components/Form';


export default function AdicionarPpc() {
  const [anual, setAnual] = useState<boolean>(true);
  return (
    <DefaultPage>
      <Form name="PPC" table="ppcs">
        <TextField name="nome" label="Nome" className="input" required />
        <Select name="formacao" label="Formacao" className="input">
          <MenuItem value="Integrado">Integrado</MenuItem>
          <MenuItem value="Subsequente">Subsequente</MenuItem>
          <MenuItem value="Superior">Superior</MenuItem>
        </Select>
        <TextField name="ano" label="Ano" type="number" inputProps={{ min: 2000 }} className="input" required />
        <Select name="semestral" label="Semestral ou anual?" className="input" onChange={(e) => setAnual(e.target.value === '0')}>
          <MenuItem value="1">Semestral</MenuItem>
          <MenuItem value="0">Anual</MenuItem>
        </Select>
        <TextField name="duracao" label={`Duração em ${anual ? 'anos' : 'semestres'}`} type="number" className="input" required />
      </Form>
    </DefaultPage>
  );
}
