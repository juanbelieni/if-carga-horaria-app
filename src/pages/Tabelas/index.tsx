// eslint-disable-next-line no-unused-vars
import { Column } from 'material-table';
import React from 'react';

import MainPage from '../../components/MainPage';
import Table from '../../components/Table';
import {
  // eslint-disable-next-line no-unused-vars
  Ppc, Disciplina, Professor, Curso, CargaHoraria,
} from '../../models';

interface TabelasProps {
  table: 'ppcs' | 'disciplinas' | 'professores' | 'cursos'
}

interface Table<T extends Object> {
  name: string,
  table: string,
  columns: Column<T>[]
}


function Tabelas({ table } : TabelasProps) {
  const tables : {
    ppcs: Table<Ppc>
    disciplinas: Table<Disciplina>,
    professores: Table<Professor>,
    cursos: Table<Curso>,
  } = {
    ppcs: {
      name: 'PPCS',
      table: 'ppcs',
      columns: [
        { title: 'Nome', field: 'nome', filtering: false },
        { title: 'Formacao', field: 'formacao', lookup: { Integrado: 'Integrado', Subsequente: 'Subsequente', Superior: 'Superior' } },
        {
          title: 'Semestral',
          field: 'semestral',
          render: ({ semestral }) => (semestral === 1 ? 'Semestral' : 'Anual'),
          lookup: { 1: 'Semestral', 0: 'Anual' },
        },
        { title: 'Duracao', render: ({ semestral, duracao }) => `${duracao} ${semestral ? 'semestre' : 'ano'}${duracao > 1 ? 's' : ''}` },
        { title: 'Ano', field: 'ano' },
      ],
    },
    professores: {
      name: 'Professores',
      table: 'professores',
      columns: [
        { title: 'Nome', field: 'nome' },
        { title: 'Siape', field: 'siape' },
      ],
    },
    disciplinas: {
      name: 'Disciplinas',
      table: 'disciplinas',
      columns: [
        { title: 'Nome', field: 'nome' },
        { title: 'Periodo', render: ({ periodo }) => `${periodo}º` },
        { title: 'Duracao da aula', render: ({ duracao_aula }) => `${duracao_aula} minutos` },
        { title: 'Aulas por semana', render: ({ aulas_semana }) => `${aulas_semana} aulas` },
        { title: 'PPC', render: ({ ppc }) => `${ppc.nome} ${ppc.formacao} ${ppc.ano}` },
      ],
    },
    cursos: {
      name: 'Cursos',
      table: 'cursos',
      columns: [
        { title: 'PPC', render: ({ ppc }) => `${ppc.nome} ${ppc.formacao} ${ppc.ano}` },
        { title: 'Ano de ingresso', field: 'ano_ingresso' },
        {
          title: 'Semestre de ingresso',
          field: 'semestre_ingresso',
          render: ({ semestre_ingresso, ppc }) => (ppc.semestral ? `${semestre_ingresso}º semestre` : 'Anual'),
          lookup: { 1: '1º semestre', 2: '2º semestre', 0: 'Anual' },
        },
      ],
    },
  };
  return (
    <MainPage>
      <Table
        name={tables[table].name}
        table={tables[table].table}
        columns={tables[table].columns}
      />
    </MainPage>
  );
}

export default Tabelas;
