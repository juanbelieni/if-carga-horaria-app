import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import React, { useState, useEffect } from 'react';
import { TextField, Select, Checkbox } from 'unform-material-ui';

import api from '../../api';
import DefaultPage from '../../components/DefaultPage';
import Form from '../../components/Form';
import Loading from '../../components/Loading';
import { Ppc } from '../../models';


export default function AddPpc() {
  const [ppcs, setPpcs] = useState<Ppc[]>();
  const [selectedPpc, setSelectedPpc] = useState<Ppc>();

  useEffect(() => {
    if (!ppcs) {
      api.index('ppcs').then(setPpcs);
    }
  }, []);
  return (
    <DefaultPage>
      {ppcs ? (
        <Form
          title="Adicionar turma"
          action={{
            type: 'add',
            table: 'turmas',
            redirect: '/tabelas/turmas',
          }}
        >
          <Select
            name="ppc_id"
            label="PPC"
            className="input"
            onChange={(ev) => setSelectedPpc(ppcs.find(({ id }) => id === ev.target.value))}
          >
            {
              ppcs?.map((ppc) => <MenuItem value={ppc.id}>{`${ppc.nome} ${ppc.formacao} ${ppc.ano}`}</MenuItem>)
            }
          </Select>

          <TextField name="ano_ingresso" label="Ano" type="number" inputProps={{ min: 2000 }} className="input" required />

          {
            selectedPpc?.semestral === 1
            && (
              <Select name="semestre_ingresso" label="Semestre de ingresso" className="input">
                <MenuItem value={1}>1º semestre</MenuItem>
                <MenuItem value={2}>2º semestre</MenuItem>
              </Select>
            )
          }

          <Select name="simulado" label="Simulação?" className="input" defaultValue={0}>
            <MenuItem value={0}>Não</MenuItem>
            <MenuItem value={1}>Sim</MenuItem>
          </Select>

        </Form>
      ) : <Loading />}
    </DefaultPage>
  );
}
