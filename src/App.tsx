import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Relatorios from './pages/Relatorios';
import Tabelas from './pages/Tabelas';
import GlobalStyle from './styles/global';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const App : React.FC = () => (
  <ThemeProvider theme={theme}>
    <Router>
      <Switch>
        <Route path="/tabelas/ppcs">
          <Tabelas table="ppcs" />
        </Route>
        <Route path="/tabelas/professores">
          <Tabelas table="professores" />
        </Route>

        <Route path="/tabelas/disciplinas">
          <Tabelas table="disciplinas" />
        </Route>

        <Route path="/tabelas/cursos">
          <Tabelas table="cursos" />
        </Route>

        <Route path="/tabelas/cargas">
          <Tabelas table="cargas" />
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
