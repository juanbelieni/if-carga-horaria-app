import React, {useState, useEffect, FunctionComponent} from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography'
import {Container} from './styles'
import DefaultPage from '../../components/DefaultPage';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import SchoolIcon from '@material-ui/icons/School';
import Divider from '@material-ui/core/Divider';
import MaterialTable from 'material-table';

import api from '../../api';
import {Ppc} from '../../models';

export default function MostrarPpc() {
  const { id } = useParams<{id: string}>();
  const [data, setData] = useState<Ppc>();

  useEffect(() => {
    api.show('ppcs', Number(id)).then((_data) => {
      setData(_data)
    })
  }, [])

  function createListItem(name: string, value: number | string | undefined, Icon: FunctionComponent) {
    return (
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <Icon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={name} secondary={value} />
      </ListItem>
    );
  }

  return (
    <DefaultPage>
      <Container>
        <Typography variant="h4" component="h1">PPC</Typography>
        <List >
          {createListItem('Nome', data?.nome, LocalOfferIcon)}
          <Divider variant="inset" component="li" />
          {createListItem('Formação', data?.formacao, SchoolIcon)}
          <Divider variant="inset" component="li" />
          {createListItem('Ano', data?.ano, CalendarIcon)}
          <Divider variant="inset" component="li" />
          {createListItem('Semestral ou anual', data?.semestral ? 'Semestral' : 'Anual', CalendarIcon)}
          {/* <Divider variant="inset" component="li" /> */}
        </ List>
        <MaterialTable
          title={`1º ${data?.semestral ? 'Semestre' : 'Ano'}`}
          columns={[
            { title: 'Discplina', field: 'nome' },
            { title: 'Duracao da aula (min)', field: 'duracao_aula' },
            { title: 'Aulas por semana', field: 'aulas_semana'  },
          ]}
          data={({ page, pageSize }) => new Promise((resolve) => {
            const params = {
              page: page + 1,
              perPage: pageSize,
              ppc_id: id,
              periodo: 1,
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
            onRowAdd: newData =>
              new Promise((resolve, reject) => {
                api.store('disciplinas', {...newData, periodo: 1, ppc_id: id})
                .then(resolve)
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {

              }),
            onRowDelete: oldData =>
              new Promise((resolve, reject) => {
                
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
      />
      </Container>
    </DefaultPage>
  );
}
