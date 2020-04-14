import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';
import { useHistory } from 'react-router-dom';

import ifSvg from '../../assets/svg/if.svg';
import { Container, Logo } from './styles';

export default function () {
  const history = useHistory();
  return (
    <Container>
      <Drawer
        variant="permanent"
        anchor="left"
        style={{ width: 210 }}
      >
        <Logo>
          <img src={ifSvg} alt="Logo" />
          <p>Instituto Federal</p>
        </Logo>
        <Divider />
        <List>
          <ListItem onClick={() => history.push('/tabelas/ppcs')} button>
            <ListItemText>PPCs</ListItemText>
          </ListItem>
          <ListItem onClick={() => history.push('/tabelas/cursos')} button>
            <ListItemText>Cursos</ListItemText>
          </ListItem>
          <ListItem onClick={() => history.push('/tabelas/professores')} button>
            <ListItemText>Professores</ListItemText>
          </ListItem>
        </List>
        <Divider />

      </Drawer>
    </Container>
  );
}
