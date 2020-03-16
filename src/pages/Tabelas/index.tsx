import React from 'react';

import List from '../../components/List';
import MainPage from '../../components/MainPage';
import Sidebar from '../../components/Sidebar';
import {
  // eslint-disable-next-line no-unused-vars
  Ppc, Disciplina, Professor, Curso, CargaHoraria,
} from '../../models';

interface TabelasProps {
  table: 'ppcs' | 'disciplinas' | 'professores' | 'cursos' | 'cargas'
}

interface Table<T> {
  name: string,
  table: string,
  fields: {
    title: string,
    getValue: (row: T) => string | number,
  }[]
}


function Tabelas({ table } : TabelasProps) {
  const tables : {
    ppcs: Table<Ppc>,
    disciplinas: Table<Disciplina>,
    professores: Table<Professor>,
    cursos: Table<Curso>,
    cargas: Table<CargaHoraria>,
  } = {
    ppcs: {
      name: 'PPCS',
      table: 'ppcs',
      fields: [
        { title: 'Nome', getValue: ({ nome }) => nome },
        { title: 'Formacao', getValue: ({ formacao }) => formacao },
        { title: 'Semestral', getValue: ({ semestral }) => (semestral === 1 ? 'Semestral' : 'Anual') },
        { title: 'Duracao', getValue: ({ semestral, duracao }) => `${duracao} ${semestral ? 'semestre' : 'ano'}${duracao > 0 ? '(s)' : ''}` },
        { title: 'Ano', getValue: ({ ano }) => ano },
      ],
    },
    professores: {
      name: 'Professores',
      table: 'professores',
      fields: [
        { title: 'Nome', getValue: ({ nome }) => nome },
        { title: 'Siape', getValue: ({ siape }) => siape },
      ],
    },
    disciplinas: {
      name: 'Disciplinas',
      table: 'disciplinas',
      fields: [
        { title: 'Nome', getValue: ({ nome }) => nome },
        { title: 'Periodo', getValue: ({ periodo }) => `${periodo}º` },
        { title: 'Duracao da aula', getValue: ({ duracao_aula }) => `${duracao_aula} minutos` },
        { title: 'Aulas por semana', getValue: ({ aulas_semana }) => `${aulas_semana} aulas` },
        { title: 'PPC', getValue: ({ ppc }) => `${ppc.nome} ${ppc.formacao} ${ppc.ano}` },
      ],
    },
    cursos: {
      name: 'Cursos',
      table: 'cursos',
      fields: [
        { title: 'PPC', getValue: ({ ppc }) => `${ppc.nome} ${ppc.formacao} ${ppc.ano}` },
        { title: 'Ano de ingresso', getValue: ({ ano_ingresso }) => ano_ingresso },
        { title: 'Semestre de ingresso', getValue: ({ semestre_ingresso, ppc }) => (ppc.semestral ? semestre_ingresso : 'Anual') },
      ],
    },
    cargas: {
      name: 'Carga horária',
      table: 'cargas',
      fields: [
        { title: 'Professor(a)', getValue: ({ professor }) => professor },
        { title: 'Disciplina', getValue: ({ disciplina }) => disciplina },
        { title: 'Periodo', getValue: ({ periodo }) => `${periodo}º` },
        { title: 'Curso', getValue: ({ curso }) => curso },
        { title: 'Duracao da aula', getValue: ({ duracao_aula }) => `${duracao_aula} minutos` },
        { title: 'Aulas por semana', getValue: ({ aulas_semana }) => `${aulas_semana} aulas` },
        { title: 'Carga Horária', getValue: ({ carga_horaria }) => `${carga_horaria} minutos` },
      ],
    },
  };
  return (
    <MainPage>
      <Sidebar page={0} />
      <List
        name={tables[table].name}
        table={tables[table].table}
        fields={tables[table].fields}
      />
    </MainPage>
  );
}

export default Tabelas;
