import MenuItem from '@material-ui/core/MenuItem';
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { TextField, Select } from 'unform-material-ui';


import api from '../../api';
import DefaultPage from '../../components/DefaultPage';
import Form from '../../components/Form';
import Loading from '../../components/Loading';
import { Ppc } from '../../models';


export default function EditPpc() {
  const history = useHistory();
  const { id } = useParams<{id: string}>();
  const [annual, setAnnual] = useState<boolean>(true);
  const [ppc, setPpc] = useState<Ppc>();

  useEffect(() => {
    api.show('ppcs', id)
      .then(setPpc);
  }, []);

  useEffect(() => {
    setAnnual(!ppc?.semestral);
  }, [ppc]);

  async function handleSubmit(newDataForPpc: Object) {
    await api.update('ppcs', id, newDataForPpc);
    history.push('/tabelas/ppcs');
  }

  return (
    <DefaultPage>
      {ppc
        ? (
          <Form
            title="Editar PPC"
            onSubmit={handleSubmit}
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
              onChange={(e) => setAnnual(e.target.value === '0')}
              defaultValue={ppc?.semestral.toString()}
            >
              <MenuItem value="1">Semestral</MenuItem>
              <MenuItem value="0">Anual</MenuItem>
            </Select>
            <TextField
              name="duracao"
              label={`Duração em ${annual ? 'anos' : 'semestres'}`}
              type="number"
              inputProps={{ min: 1 }}
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
