import React, { useContext } from 'react';

import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Switch from '@material-ui/core/Switch';
import { isMobile } from 'react-device-detect';
import { useHistory } from 'react-router-dom';

import ifSvg from '../../assets/svg/if.svg';
import DarkModeContext from '../../contexts/darkMode';
import {
  Container, Logo, ListTitle, ListLink,
} from './styles';

interface SidebarProps{
  open: boolean,
  onClose: () => any,
}

const Sidebar : React.FC<SidebarProps> = ({ open, onClose }) => {
  const history = useHistory();
  const { darkMode, setDarkMode } = useContext(DarkModeContext);

  return (
    <Container>
      <Drawer
        variant={isMobile ? 'temporary' : 'persistent'}
        anchor="left"
        open={open}
        onClose={onClose}
        style={{
          width: open ? 210 : 0,
        }}
        transitionDuration={0}
      >
        <Logo>
          <img src={ifSvg} alt="Logo" />
          <p>Instituto Federal</p>
        </Logo>
        <Divider />
        <List>
          <ListTitle button>
            <ListItemText>Tabelas</ListItemText>
          </ListTitle>
          <ListLink onClick={() => history.push('/tabelas/ppcs')} button>
            <ListItemText>PPCs</ListItemText>
          </ListLink>
          <ListLink onClick={() => history.push('/tabelas/turmas')} button>
            <ListItemText>Turmas</ListItemText>
          </ListLink>
          <ListLink onClick={() => history.push('/tabelas/professores')} button>
            <ListItemText>Professores</ListItemText>
          </ListLink>
        </List>
        <List>
          <ListTitle button>
            <ListItemText>Relatórios</ListItemText>
          </ListTitle>
          <ListLink onClick={() => history.push('/relatorios/carga-horaria')} button>
            <ListItemText>Carga horária</ListItemText>
          </ListLink>
        </List>
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
};

export default Sidebar;
