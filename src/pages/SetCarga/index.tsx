import MenuItem from '@material-ui/core/MenuItem';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SchoolIcon from '@material-ui/icons/School';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { TextField, Select } from 'unform-material-ui';

import api from '../../api';
import Form from '../../components/Form';
import Loading from '../../components/Loading';
import ShowData from '../../components/ShowData';
import { CargaHoraria, Professor } from '../../models';


export default function SetCarga() {
  const history = useHistory();
  const { turma_id, disciplina_id } = useParams<{
    turma_id: string,
    disciplina_id: string,
  }>();
  const [carga, setCarga] = useState<CargaHoraria>();
  const [professores, setProfessores] = useState<Professor[]>();

  useEffect(() => {
    api.index('cargas', { turma_id, disciplina_id })
      .then((data) => (data.length > 0) && setCarga(data[0]));
  }, [turma_id, disciplina_id]);

  useEffect(() => {
    api.index('professores')
      .then(setProfessores);
  }, []);

  async function handleSubmit({ professor_id }: CargaHoraria) {
    await api.store('cargas', { turma_id, disciplina_id, professor_id });
    history.push(`/tabelas/turmas/${turma_id}`);
  }


  return (
    <ShowData
      title="Definir professor"
      data={[
        {
          name: 'Turma',
          value: carga?.turma,
          icon: SchoolIcon,
        },
        {
          name: 'Disciplina',
          value: carga?.disciplina,
          icon: MenuBookIcon,
        },
      ]}
    >
      {(carga && professores) ? (
        <Form onSubmit={handleSubmit}>
          <Select
            name="professor_id"
            label="Professor"
            className="input"
            defaultValue={carga.professor_id}
          >
            {professores?.map((professor) => (
              <MenuItem
                value={professor.id}
                key={professor.id}
              >
                {professor.nome}
              </MenuItem>
            ))}
          </Select>
        </Form>
      ) : <Loading />}
    </ShowData>
  );
}
