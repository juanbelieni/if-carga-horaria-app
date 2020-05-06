import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import MaterialTable from 'material-table';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../api';
import DefaultPage from '../../components/DefaultPage';
import MTLocalization from '../../localization/MaterialTable';
import { Turma, Ppc } from '../../models';

function TurmasTable() {
  const history = useHistory();
  const [ppcs, setPpcs] = useState<Ppc[]>();

  useEffect(() => {
    if (!ppcs) {
      api.index('ppcs')
        .then(setPpcs);
    }
  }, [ppcs]);

  return (
    <DefaultPage>
      <MaterialTable<Turma>
        title="Turmas"
        columns={[
          {
            title: 'PPC',
            field: 'ppc',
            render: ({ ppc }) => ppc,
            editComponent: ({ onChange, rowData }) => (
              <Select
                defaultValue={rowData.ppc_id}
                onChange={(e) => onChange(e.target.value)}
                style={{ fontSize: '13px' }}
              >
                {
                  ppcs?.map((ppc) => <MenuItem value={ppc.id} key={ppc.id}>{ppc.ppc}</MenuItem>)
                }
              </Select>
            ),
          },
          {
            title: 'Ano de ingresso',
            field: 'ano_ingresso',
          },
          {
            title: 'Semestre de ingresso',
            field: 'semestre_ingresso',
            render: ({ semestre_ingresso, semestral }) => (semestral ? `${semestre_ingresso}º semestre` : 'Anual'),
            lookup: { 1: '1º semestre', 2: '2º semestre', 0: 'Anual' },
          },
        ]}
        data={({ page, pageSize, filters }) => new Promise((resolve, reject) => {
          const params: {[key: string]: any} = {
            page: page + 1,
            perPage: pageSize,
          };

          filters.forEach(({ column, value }) => {
            if (column.field) {
              params[column.field.toString()] = value;
            }
          });

          api.index('turmas', params)
            .then((turmas) => resolve({
              data: turmas.data,
              page: turmas.page - 1,
              totalCount: turmas.total,
            }))
            .catch(reject);
        })}
        editable={{
          onRowAdd: (newData) => new Promise((resolve, reject) => {
            api.store('turmas', { ...newData, ppc_id: newData.ppc })
              .then(resolve)
              .catch(reject);
          }),

          onRowUpdate: (newData) => new Promise((resolve, reject) => {
            api.update('turmas', newData.id, { ...newData, ppc_id: newData.ppc })
              .then(resolve)
              .catch(reject);
          }),

          onRowDelete: (oldData) => new Promise((resolve, reject) => {
            api.destroy('turmas', oldData.id)
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
          exportButton: true,
        }}
        style={{
          width: '100%',
        }}
        localization={MTLocalization}
      />
    </DefaultPage>
  );
}
export default TurmasTable;
