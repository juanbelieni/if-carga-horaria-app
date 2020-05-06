import MaterialTable, { Column } from 'material-table';
import React from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../api';
import MTLocalization from '../../localization/MaterialTable';

export interface TableProps {
  name: string,
  title: string,
  table: string,
  columns: Column<any>[],
}

function Table({
  title, name, table, columns,
}: TableProps) {
  const history = useHistory();

  return (
    <MaterialTable
      title={title}
      columns={columns}
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

        api.index(table, params)
          .then((data) => {
            resolve({
              data: data.data,
              page: data.page - 1,
              totalCount: data.total,
            });
          });
      })}
      actions={[
        {
          icon: 'launch',
          tooltip: 'Mostrar',
          onClick: (event, rowData) => history.push(`/tabelas/${table}/${rowData.id}`),
        },
        {
          icon: 'edit',
          tooltip: 'Editar',
          onClick: (event, rowData) => history.push(`/tabelas/${table}/${rowData.id}/editar`),
        },
        {
          icon: 'add',
          tooltip: 'Adicionar',
          isFreeAction: true,
          onClick: () => history.push(`/tabelas/${table}/adicionar`),
        },
      ]}
      editable={{
        onRowDelete: (oldData) => api.destroy(table, oldData.id),
      }}
      options={{
        draggable: false,
        // selection: true,
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
  );
}
export default Table;
