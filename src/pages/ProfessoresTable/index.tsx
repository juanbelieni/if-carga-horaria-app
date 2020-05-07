import MaterialTable from 'material-table';
import React from 'react';

import api from '../../api';
import DefaultPage from '../../components/DefaultPage';
import MTLocalization from '../../localization/MaterialTable';
import { Professor } from '../../models';

const ProfessoresTable = () => (
  <DefaultPage>
    <MaterialTable<Professor>
      title="Professores"
      columns={[
        {
          title: 'Nome',
          field: 'nome',
        },
        {
          title: 'SIAPE',
          field: 'siape',
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

        api.index('professores', params)
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
          api.store('professores', newData)
            .then(resolve)
            .catch(reject);
        }),

        onRowUpdate: (newData) => new Promise((resolve, reject) => {
          api.update('professores', newData.id, newData)
            .then(resolve)
            .catch(reject);
        }),

        onRowDelete: (oldData) => new Promise((resolve, reject) => {
          api.destroy('professores', oldData.id)
            .then(resolve)
            .catch(reject);
        }),
      }}
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

export default ProfessoresTable;
