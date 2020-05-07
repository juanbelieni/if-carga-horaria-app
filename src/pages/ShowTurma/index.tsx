import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import SubjectIcon from '@material-ui/icons/Subject';
import MaterialTable from 'material-table';
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import api from '../../api';
import Loading from '../../components/Loading';
import ShowData from '../../components/ShowData';
import MTLocalization from '../../localization/MaterialTable';
import { Turma, CargaHoraria, Professor } from '../../models';

export default function ShowTurma() {
  const { id } = useParams<{id: string}>();
  const [turma, setTurma] = useState<Turma>();
  const [professores, setProfessores] = useState<Professor[]>();
  const history = useHistory();

  useEffect(() => {
    api.show('turmas', id)
      .then(setTurma);

    api.index('professores')
      .then(setProfessores);
  }, [id]);

  function createAllTables() {
    const tables = [];
    for (let periodo = 1; periodo <= (turma?.duracao || 0); periodo += 1) {
      tables.push(
        <MaterialTable<CargaHoraria>
          title={`${periodo}º ${turma?.semestral ? 'semestre' : 'ano'}`}
          columns={[
            {
              title: 'Discplina',
              field: 'disciplina',
              editable: 'never',
            },
            {
              title: 'Professor',
              field: 'professor_id',
              render: ({ professor }) => professor,
              editComponent: ({ onChange, value }) => (
                <Select
                  defaultValue={value}
                  onChange={(e) => onChange(e.target.value)}
                  style={{ fontSize: '13px' }}
                >
                  {
                    professores?.map(({ id: professor_id, nome }) => (
                      <MenuItem
                        value={professor_id}
                        key={professor_id}
                      >
                        {nome}
                      </MenuItem>
                    ))
                  }
                </Select>
              ),
            },
          ]}
          data={({ page, pageSize }) => new Promise((resolve) => {
            const params = {
              page: page + 1,
              perPage: pageSize,
              turma_id: id,
              periodo,
            };

            api.index('cargas', params)
              .then((cargas) => {
                resolve({
                  data: cargas.data,
                  page: cargas.page - 1,
                  totalCount: cargas.total,
                });
              });
          })}
          editable={{
            onRowUpdate: ({ disciplina_id, professor_id }) => new Promise((resolve, reject) => {
              api.store('cargas', { turma_id: id, disciplina_id, professor_id })
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
      title="Turma"
      data={[
        {
          name: 'PPC',
          value: turma?.ppc,
          icon: SubjectIcon,
          onClick: () => history.push(`/tabelas/ppcs/${turma?.ppc_id}`),
        },
        {
          name: 'Ano de ingresso',
          value: turma?.ano_ingresso,
          icon: CalendarIcon,
        },
        {
          name: 'Semestre de ingresso',
          value: turma && (turma.semestral ? `${turma.semestre_ingresso}º semestre` : 'Anual'),
          icon: CalendarIcon,
        },
      ]}
    >
      { turma ? createAllTables() : <Loading />}
    </ShowData>
  );
}
