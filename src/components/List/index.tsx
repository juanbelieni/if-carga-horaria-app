// eslint-disable-next-line no-unused-vars
import MaterialTable, { Column } from 'material-table';
import React, { useState, useEffect } from 'react';

import api from '../../api';
// eslint-disable-next-line no-unused-vars
import { DefaultModel } from '../../models';
import { Container } from './styles';

export interface ListProps {
  name: string,
  table: string,
  columns: Column<any>[]
}

function List({ name, table, columns }: ListProps) {
  const [data, setData] = useState<DefaultModel[]>();
  useEffect(() => {
    api.index(table).then((_data) => setData(_data));
  }, []);

  return (
    <Container>
      { data && (
      <MaterialTable
        title={name}
        columns={columns}
        data={data}
        options={{
          draggable: false,
          selection: true,
        }}
      />
      ) }
    </Container>
  );
}
export default List;
