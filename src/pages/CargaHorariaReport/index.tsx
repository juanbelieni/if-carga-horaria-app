import React, { useState } from 'react';

import Typography from '@material-ui/core/Typography';

import DefaultPage from '../../components/DefaultPage';
import Button from './Button';
import { Content, Buttons } from './styles';

const fields = [
  { name: 'professor', title: 'Professor' },
  { name: 'turma', title: 'Turma' },
  { name: 'disciplina', title: 'Disciplina' },
  { name: 'carga_horaria', title: 'Carga horária em minutos' },
  { name: 'periodo', title: 'Período' },
  { name: 'ano_semestre', title: 'Ano/semestre' },
];

const CargaHorariaReport: React.FC = () => {
  const [selectedFields, setSelectedFields] = useState<string[]>([]);

  function handleSelectField(fieldName: string) {
    if (selectedFields.includes(fieldName)) {
      setSelectedFields(selectedFields.filter((field) => field !== fieldName));
    } else {
      setSelectedFields([...selectedFields, fieldName]);
    }
  }

  return (
    <DefaultPage>
      <Content>
        <Typography variant="h4" component="h1">Carga horária</Typography>
        <Buttons container spacing={2}>
          {fields.map((field, i) => (
            <Button
              key={field.name}
              selected={selectedFields.includes(field.name)}
              onClick={() => handleSelectField(field.name)}
            >
              {field.title}
            </Button>
          ))}
        </Buttons>
      </Content>
    </DefaultPage>
  );
};

export default CargaHorariaReport;
