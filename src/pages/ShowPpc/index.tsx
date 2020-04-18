import CalendarIcon from '@material-ui/icons/CalendarToday';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import SchoolIcon from '@material-ui/icons/School';
import Skeleton from '@material-ui/lab/Skeleton';
import MaterialTable from 'material-table';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import api from '../../api';
import ShowData from '../../components/ShowData';
import MTLocalization from '../../localization/MaterialTable.json';
import { Ppc, Disciplina } from '../../models';

export default function ShowPpc() {
  const { id } = useParams<{id: string}>();
  const [data, setData] = useState<Ppc>();

  useEffect(() => {
    api.show('ppcs', id).then((_data) => {
      setData(_data);
    });
  }, [id]);

  function createAllTables() {
    const tables = [];
    for (let periodo = 1; periodo <= (data?.duracao || 0); periodo += 1) {
      tables.push(
        <MaterialTable
          title={`${periodo}º ${data?.semestral ? 'semestre' : 'ano'}`}
          columns={[
            { title: 'Discplina', field: 'nome' },
            { title: 'Duracao da aula (min)', field: 'duracao_aula' },
            { title: 'Aulas por semana', field: 'aulas_semana' },
          ]}
          data={({ page, pageSize }) => new Promise((resolve) => {
            const params = {
              page: page + 1,
              perPage: pageSize,
              ppc_id: id,
              periodo,
            };

            api.index('disciplinas', params)
              .then((disciplinas) => {
                resolve({
                  data: disciplinas.data,
                  page: disciplinas.page - 1,
                  totalCount: disciplinas.total,
                });
              });
          })}
          editable={{
            onRowAdd: (newData: Object) => new Promise((resolve, reject) => {
              api.store('disciplinas', { ...newData, periodo, ppc_id: id })
                .then(resolve);
            }),

            onRowUpdate: (newData: Disciplina) => new Promise((resolve, reject) => {
              api.update('disciplinas', newData.id, newData)
                .then(resolve);
            }),
            onRowDelete: (oldData: Disciplina) => new Promise((resolve, reject) => {
              api.destroy('disciplinas', oldData.id)
                .then(resolve);
            }),
          }}
          options={{
            draggable: false,
            filtering: false,
            sorting: false,
            search: false,
          }}
          style={{
            width: '100%',
          }}
          localization={MTLocalization}
        />,
      );
      tables.push(<br />);
    }
    return tables;
  }

  return (
    <ShowData
      title="PPC"
      data={[
        {
          name: 'Nome',
          value: data?.nome,
          icon: LocalOfferIcon,
        },
        {
          name: 'Formação',
          value: data?.formacao,
          icon: SchoolIcon,
        },
        {
          name: 'Ano',
          value: data?.ano,
          icon: CalendarIcon,
        },
        {
          name: 'Semestral ou anual',
          value: data && (data?.semestral ? 'Semestral' : 'Anual'),
          icon: CalendarIcon,
        },
      ]}
    >

      {data ? createAllTables() : <Skeleton variant="rect" height={350} />}

    </ShowData>
  );
}
