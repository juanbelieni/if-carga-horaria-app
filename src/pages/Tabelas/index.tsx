// eslint-disable-next-line no-unused-vars
import { Column } from 'material-table';
import React from 'react';

import DefaultPage from '../../components/DefaultPage';
import Table from '../../components/Table';
import {
  Ppc, Professor, Turma,
} from '../../models';

interface TabelasProps {
  table: 'ppcs' | 'professores' | 'turmas',
}

interface Table<T extends Object> {
  name: string,
  table: string,
  title: string,
  columns: Column<T>[],
}


function Tabelas({ table } : TabelasProps) {
  const tables : {
    ppcs: Table<Ppc>,
    professores: Table<Professor>,
    turmas: Table<Turma>,
  } = {
    ppcs: {
      name: 'PPC',
      title: 'PPCs',
      table: 'ppcs',
      columns: [
        { title: 'Nome', field: 'nome', filtering: false },
        { title: 'Formacao', field: 'formacao', lookup: { Integrado: 'Integrado', Subsequente: 'Subsequente', Superior: 'Superior' } },
        {
          title: 'Semestral ou anual',
          field: 'semestral',
          render: ({ semestral }) => (semestral === 1 ? 'Semestral' : 'Anual'),
          lookup: { 1: 'Semestral', 0: 'Anual' },
        },
        { title: 'Duracao', render: ({ semestral, duracao }) => `${duracao} ${semestral ? 'semestre' : 'ano'}${duracao > 1 ? 's' : ''}` },
        { title: 'Ano', field: 'ano' },
      ],
    },
    professores: {
      name: 'professor',
      title: 'Professores',
      table: 'professores',
      columns: [
        { title: 'Nome', field: 'nome' },
        { title: 'Siape', field: 'siape' },
      ],
    },
    turmas: {
      name: 'turma',
      title: 'Turmas',
      table: 'turmas',
      columns: [
        { title: 'PPC', field: 'ppc', filtering: false },
        { title: 'Ano de ingresso', field: 'ano_ingresso' },
        {
          title: 'Semestre de ingresso',
          field: 'semestre_ingresso',
          render: ({ semestre_ingresso, semestral }) => (semestral ? `${semestre_ingresso}º semestre` : 'Anual'),
          lookup: { 1: '1º semestre', 2: '2º semestre', 0: 'Anual' },
        },
      ],
    },
  };
  return (
    <DefaultPage>
      <Table
        name={tables[table].name}
        title={tables[table].title}
        table={tables[table].table}
        columns={tables[table].columns}
      />
    </DefaultPage>
  );
}

export default Tabelas;
