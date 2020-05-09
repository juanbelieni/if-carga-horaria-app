import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Switch from '@material-ui/core/Switch';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import ifSvg from '../../assets/svg/if.svg';
import DarkModeContext from '../../contexts/darkMode';
import { Container, Logo } from './styles';

export default function () {
  const history = useHistory();
  const { darkMode, setDarkMode } = useContext(DarkModeContext);

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
          <ListItem onClick={() => history.push('/tabelas/turmas')} button>
            <ListItemText>Turmas</ListItemText>
          </ListItem>
          <ListItem onClick={() => history.push('/tabelas/professores')} button>
            <ListItemText>Professores</ListItemText>
          </ListItem>
        </List>
        <Divider />
        <List id="dark-mode-switch">
          <ListItem>
            <FormControlLabel
              control={(
                <Switch
                  checked={darkMode}
                  onChange={
                    (e: React.ChangeEvent<HTMLInputElement>) => setDarkMode(e.target.checked)
                  }
                  name="Mode escuro"
                />
              )}
              label="Modo escuro"
            />
          </ListItem>
        </List>


      </Drawer>
    </Container>
  );
}
