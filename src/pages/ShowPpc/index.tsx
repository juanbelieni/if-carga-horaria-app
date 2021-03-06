import CalendarIcon from '@material-ui/icons/CalendarToday';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import SchoolIcon from '@material-ui/icons/School';
import MaterialTable from 'material-table';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import api from '../../api';
import Loading from '../../components/Loading';
import ShowData from '../../components/ShowData';
import MTLocalization from '../../localization/MaterialTable';
import { Ppc, Disciplina } from '../../models';

export default function ShowPpc() {
  const { id } = useParams<{id: string}>();
  const [ppc, setPpc] = useState<Ppc>();

  useEffect(() => {
    api.show('ppcs', id).then((data) => {
      setPpc(data);
    });
  }, [id]);

  function createAllTables() {
    const tables = [];
    for (let periodo = 1; periodo <= (ppc?.duracao || 0); periodo += 1) {
      tables.push(
        <MaterialTable<Disciplina>
          title={`${periodo}º ${ppc?.semestral ? 'semestre' : 'ano'}`}
          columns={[
            { title: 'Discplina', field: 'nome' },
            { title: 'Duração da aula', field: 'duracao_aula', render: ({ duracao_aula }) => `${duracao_aula} minutos` },
            { title: 'Aulas por semana', field: 'aulas_semana', render: ({ aulas_semana }) => `${aulas_semana} aulas` },
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
            onRowAdd: (newData) => new Promise((resolve, reject) => {
              api.store('disciplinas', { ...newData, periodo, ppc_id: id })
                .then(resolve)
                .catch(reject);
            }),

            onRowUpdate: (newData) => new Promise((resolve, reject) => {
              api.update('disciplinas', newData.id, newData)
                .then(resolve)
                .catch(reject);
            }),
            onRowDelete: (oldData) => new Promise((resolve, reject) => {
              api.destroy('disciplinas', oldData.id)
                .then(resolve)
                .catch(reject);
            }),
          }}
          options={{
            draggable: false,
            filtering: false,
            sorting: false,
            search: false,
            actionsColumnIndex: -1,
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
          value: ppc?.nome,
          icon: LocalOfferIcon,
        },
        {
          name: 'Formação',
          value: ppc?.formacao,
          icon: SchoolIcon,
        },
        {
          name: 'Ano',
          value: ppc?.ano,
          icon: CalendarIcon,
        },
        {
          name: 'Semestral ou anual',
          value: ppc && (ppc?.semestral ? 'Semestral' : 'Anual'),
          icon: CalendarIcon,
        },
      ]}
    >

      {ppc ? createAllTables() : <Loading />}

    </ShowData>
  );
}
