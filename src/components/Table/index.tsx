// eslint-disable-next-line no-unused-vars
import MaterialTable, { Column } from 'material-table';
import React from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../api';

export interface TableProps {
  name: string,
  table: string,
  columns: Column<any>[]
}

function Table({ name, table, columns }: TableProps) {
  const history = useHistory();

  return (
    <MaterialTable
      title={name}
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
          icon: 'add',
          tooltip: `Adicionar ${name}`,
          isFreeAction: true,
          onClick: () => history.push(`/tabelas/${table}/adicionar`),
        },
      ]}
      options={{
        draggable: false,
        selection: true,
        filtering: true,
        sorting: false,
        search: false,
      }}
      style={{
        width: '100%',
      }}
    />
  );
}
export default Table;
