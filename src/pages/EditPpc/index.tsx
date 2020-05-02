import MenuItem from '@material-ui/core/MenuItem';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TextField, Select } from 'unform-material-ui';

import api from '../../api';
import DefaultPage from '../../components/DefaultPage';
import Form from '../../components/Form';
import Loading from '../../components/Loading';
import { Ppc } from '../../models';


export default function EditPpc() {
  const { id } = useParams<{id: string}>();
  const [anual, setAnual] = useState<boolean>(true);
  const [ppc, setPpc] = useState<Ppc>();

  useEffect(() => {
    api.show('ppcs', id)
      .then(setPpc);
  }, []);

  return (
    <DefaultPage>
      {ppc
        ? (
          <Form
            title="Editar PPC"
            action={{
              type: 'edit',
              table: 'ppcs',
              redirect: '/tabelas/ppcs',
              id,
            }}
          >
            <TextField
              name="nome"
              label="Nome"
              className="input"
              defaultValue={ppc?.nome}
              required
            />
            <Select
              name="formacao"
              label="Formacao"
              className="input"
              defaultValue={ppc?.formacao}
            >
              <MenuItem value="Integrado">Integrado</MenuItem>
              <MenuItem value="Subsequente">Subsequente</MenuItem>
              <MenuItem value="Superior">Superior</MenuItem>
            </Select>
            <TextField
              name="ano"
              label="Ano"
              type="number"
              inputProps={{ min: 2000 }}
              className="input"
              defaultValue={ppc?.ano}
              required
            />
            <Select
              name="semestral"
              label="Semestral ou anual?"
              className="input"
              onChange={(e) => setAnual(e.target.value === '0')}
              defaultValue={ppc?.semestral.toString()}
            >
              <MenuItem value="1">Semestral</MenuItem>
              <MenuItem value="0">Anual</MenuItem>
            </Select>
            <TextField
              name="duracao"
              label={`Duração em ${anual ? 'anos' : 'semestres'}`}
              type="number"
              className="input"
              defaultValue={ppc?.duracao}
              required
            />
          </Form>
        )
        : <Loading />}
    </DefaultPage>
  );
}
