import green from '@material-ui/core/colors/green';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import CriarPpc from './pages/CriarPpc';
import Relatorios from './pages/Relatorios';
import Tabelas from './pages/Tabelas';
import GlobalStyle from './styles/global';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: green,
  },
});

const App : React.FC = () => (
  <ThemeProvider theme={theme}>
    <Router>
      <Switch>
        <Route path="/tabelas/ppcs" exact>
          <Tabelas table="ppcs" />
        </Route>

        <Route path="/tabelas/ppcs/criar" exact>
          <CriarPpc />
        </Route>

        <Route path="/tabelas/professores">
          <Tabelas table="professores" />
        </Route>

        <Route path="/tabelas/cursos">
          <Tabelas table="cursos" />
        </Route>

        <Route path="/relatorios">
          <Relatorios />
        </Route>
      </Switch>
      <GlobalStyle />
    </Router>
  </ThemeProvider>
);

export default App;
