import green from '@material-ui/core/colors/green';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import PpcsTable from './pages/PpcsTable';
import Relatorios from './pages/Relatorios';
import ShowPpc from './pages/ShowPpc';
import ShowTurma from './pages/ShowTurma';
import Tabelas from './pages/Tabelas';
import TurmasTable from './pages/TurmasTable';
import GlobalStyle from './styles/global';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: green,
    secondary: green,
  },
});


const App : React.FC = () => (
  <ThemeProvider theme={theme}>
    <Router>
      <Route path="/tabelas/ppcs" exact>
        <PpcsTable />
      </Route>

      <Route path="/tabelas/ppcs/:id" exact>
        <ShowPpc />
      </Route>

      <Route path="/tabelas/professores" exact>
        <Tabelas table="professores" />
      </Route>

      <Route path="/tabelas/turmas" exact>
        <TurmasTable />
      </Route>

      <Route path="/tabelas/turmas/:id" exact>
        <ShowTurma />
      </Route>

      <Route path="/relatorios" exact>
        <Relatorios />
      </Route>
    </Router>
    <GlobalStyle />
  </ThemeProvider>
);

export default App;
