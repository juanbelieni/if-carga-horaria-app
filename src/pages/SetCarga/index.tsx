import MenuItem from '@material-ui/core/MenuItem';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SchoolIcon from '@material-ui/icons/School';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TextField, Select } from 'unform-material-ui';

import api from '../../api';
import Form from '../../components/Form';
import ShowData from '../../components/ShowData';
import { CargaHoraria, Professor } from '../../models';


export default function SetCarga() {
  const { curso_id, disciplina_id } = useParams<{
    curso_id: string,
    disciplina_id: string,
  }>();
  const [carga, setCarga] = useState<CargaHoraria>();
  const [professores, setProfessores] = useState<Professor[]>();

  useEffect(() => {
    api.index('cargas', { curso_id, disciplina_id })
      .then((data: CargaHoraria[]) => {
        if (data.length > 0) {
          setCarga(data[0]);
        }
      });
  }, [curso_id, disciplina_id]);

  useEffect(() => {
    api.index('professores')
      .then(setProfessores);
  }, []);

  return (
    <ShowData
      title="Definir professor"
      data={[
        {
          name: 'Curso',
          value: carga?.curso,
          icon: SchoolIcon,
        },
        {
          name: 'Disciplina',
          value: carga?.disciplina,
          icon: MenuBookIcon,
        },
      ]}
    >
      {carga && (
        <Form
          table="cargas"
          redirect={`/tabelas/cursos/${curso_id}`}
          defaultValues={{ curso_id, disciplina_id }}
        >
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
      )}
    </ShowData>
  );
}
