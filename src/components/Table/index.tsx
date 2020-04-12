// eslint-disable-next-line no-unused-vars
import MaterialTable, { Column } from 'material-table';
import React from 'react';

import api from '../../api';
import { Container } from './styles';

export interface TableProps {
  name: string,
  table: string,
  columns: Column<any>[]
}

function Table({ name, table, columns }: TableProps) {
  return (
    <Container>
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
        options={{
          draggable: false,
          selection: true,
          filtering: true,
          sorting: false,
          search: false,
        }}
      />
    </Container>
  );
}
export default Table;
