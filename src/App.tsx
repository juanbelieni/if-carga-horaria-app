import green from '@material-ui/core/colors/green';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import AddPpc from './pages/AddPpc';
import AddTurma from './pages/AddTurma';
import EditPpc from './pages/EditPpc';
import Relatorios from './pages/Relatorios';
import SetCarga from './pages/SetCarga';
import ShowPpc from './pages/ShowPpc';
import ShowTurma from './pages/ShowTurma';
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
      <Route path="/tabelas/ppcs" exact>
        <Tabelas table="ppcs" />
      </Route>

      <Route path="/tabelas/ppcs/adicionar" exact>
        <AddPpc />
      </Route>

      <Route path="/tabelas/ppcs/:id" exact>
        <ShowPpc />
      </Route>

      <Route path="/tabelas/ppcs/:id/editar" exact>
        <EditPpc />
      </Route>


      <Route path="/tabelas/professores" exact>
        <Tabelas table="professores" />
      </Route>

      <Route path="/tabelas/turmas" exact>
        <Tabelas table="turmas" />
      </Route>

      <Route path="/tabelas/turmas/adicionar" exact>
        <AddTurma />
      </Route>

      <Route path="/tabelas/turmas/:id" exact>
        <ShowTurma />
      </Route>

      <Route path="/tabelas/turmas/:turma_id/:disciplina_id" exact>
        <SetCarga />
      </Route>

      <Route path="/relatorios" exact>
        <Relatorios />
      </Route>
    </Router>
    <GlobalStyle />
  </ThemeProvider>
);

export default App;
