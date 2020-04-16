import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import SchoolIcon from '@material-ui/icons/School';
import Skeleton from '@material-ui/lab/Skeleton';
import MaterialTable from 'material-table';
import React, { useState, useEffect, FunctionComponent } from 'react';
import { useParams } from 'react-router-dom';

import api from '../../api';
import DefaultPage from '../../components/DefaultPage';
import MTLocalization from '../../localization/MaterialTable.json';
import { Ppc, Disciplina } from '../../models';
import { Container } from './styles';

export default function MostrarPpc() {
  const { id } = useParams<{id: string}>();
  const [data, setData] = useState<Ppc>();

  useEffect(() => {
    api.show('ppcs', id).then((_data) => {
      setData(_data);
    });
  }, [id]);

  function createListItem(name: string, value: number | string | undefined, Icon: FunctionComponent) {
    return (
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <Icon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={name} secondary={value ?? <Skeleton variant="text" />} />
      </ListItem>
    );
  }

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
            sorting: true,
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
    <DefaultPage>
      <Container>
        <Typography variant="h4" component="h1">PPC</Typography>
        <List>
          {createListItem('Nome', data?.nome, LocalOfferIcon)}
          <Divider variant="inset" component="li" />
          {createListItem('Formação', data?.formacao, SchoolIcon)}
          <Divider variant="inset" component="li" />
          {createListItem('Ano', data?.ano, CalendarIcon)}
          <Divider variant="inset" component="li" />
          {createListItem('Semestral ou anual', data && (data?.semestral ? 'Semestral' : 'Anual'), CalendarIcon)}
          {/* <Divider variant="inset" component="li" /> */}
        </List>
        {data ? createAllTables() : <Skeleton variant="rect" height={350} />}
      </Container>
    </DefaultPage>
  );
}
