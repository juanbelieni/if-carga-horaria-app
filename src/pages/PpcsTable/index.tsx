import MaterialTable from 'material-table';
import React from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../api';
import DefaultPage from '../../components/DefaultPage';
import MTLocalization from '../../localization/MaterialTable';
import { Ppc } from '../../models';

function PpcsTable() {
  const history = useHistory();

  return (
    <DefaultPage>
      <MaterialTable<Ppc>
        title="PPCs"
        columns={[
          {
            title: 'Nome',
            field: 'nome',
          },
          {
            title: 'Formação',
            field: 'formacao',
            lookup: {
              Integrado: 'Integrado',
              Subsequente: 'Subsequente',
              Superior: 'Superior',
            },
          },
          {
            title: 'Semestral ou anual',
            field: 'semestral',
            render: ({ semestral }) => (semestral === 1 ? 'Semestral' : 'Anual'),
            lookup: { 1: 'Semestral', 0: 'Anual' },
          },
          {
            title: 'Duração',
            field: 'duracao',
            render: ({ semestral, duracao }) => `${duracao} ${semestral ? 'semestre' : 'ano'}${duracao > 1 ? 's' : ''}`,
          },
          {
            title: 'Ano',
            field: 'ano',
          },
        ]}
        data={({ page, pageSize, filters }) => new Promise((resolve) => {
          const params: {[key: string]: any} = {
            page: page + 1,
            perPage: pageSize,
          };

          filters.forEach(({ column, value }) => {
            if (column.field) {
              params[column.field.toString()] = value;
            }
          });

          api.index('ppcs', params)
            .then((data) => {
              resolve({
                data: data.data,
                page: data.page - 1,
                totalCount: data.total,
              });
            });
        })}
        editable={{
          onRowAdd: (newData) => new Promise((resolve, reject) => {
            api.store('ppcs', newData)
              .then(resolve)
              .catch(reject);
          }),

          onRowUpdate: (newData) => new Promise((resolve, reject) => {
            api.update('ppcs', newData.id, newData)
              .then(resolve)
              .catch(reject);
          }),

          onRowDelete: (oldData) => new Promise((resolve, reject) => {
            api.destroy('ppcs', oldData.id)
              .then(resolve)
              .catch(reject);
          }),
        }}
        actions={[
          {
            icon: 'launch',
            tooltip: 'Mostrar',
            onClick: (event, rowData: any) => history.push(`/tabelas/ppcs/${rowData.id}`),
          },
        ]}
        options={{
          draggable: false,
          filtering: true,
          sorting: false,
          search: false,
          actionsColumnIndex: -1,
          debounceInterval: 1000,
        }}
        style={{
          width: '100%',
        }}
        localization={MTLocalization}
      />
    </DefaultPage>
  );
}
export default PpcsTable;
