import green from '@material-ui/core/colors/green';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import AddPpc from './pages/AddPpc';
import Relatorios from './pages/Relatorios';
import ShowCurso from './pages/ShowCurso';
import ShowPpc from './pages/ShowPpc';
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


      <Route path="/tabelas/professores" exact>
        <Tabelas table="professores" />
      </Route>

      <Route path="/tabelas/cursos" exact>
        <Tabelas table="cursos" />
      </Route>

      <Route path="/tabelas/cursos/:id" exact>
        <ShowCurso />
      </Route>

      <Route path="/relatorios" exact>
        <Relatorios />
      </Route>
    </Router>
    <GlobalStyle />
  </ThemeProvider>
);

export default App;
