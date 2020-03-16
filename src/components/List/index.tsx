import React, { useState, useEffect } from 'react';

import api from '../../api';
// eslint-disable-next-line no-unused-vars
import { DefaultModel } from '../../models';
import { Container, Table } from './styles';

export interface ListProps {
  name: string,
  table: string,
  fields: {
    title: string,
    getValue: Function,
  }[]
}

function List({ name, table, fields }: ListProps) {
  const [data, setData] = useState<DefaultModel[]>();
  useEffect(() => {
    api.index(table).then((_data) => setData(_data));
  }, []);

  return (
    <Container>
      <h1>{name}</h1>

      <Table>
        <thead>
          <tr>
            <th> </th>
            {fields.map(({ title }) => <th key={title}>{title}</th>)}
          </tr>
        </thead>
        <tbody>
          {data?.map((row, i) => (
            <tr key={i}>
              <td> </td>
              {fields.map(({ title, getValue }) => <td key={`${title}-${row.id}`}>{getValue(row)}</td>)}
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
export default List;
