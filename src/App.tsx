import green from '@material-ui/core/colors/green';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import AdicionarPpc from './pages/AdicionarPpc';
import MostrarPpc from './pages/MostrarPpc';
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
      <Route path="/tabelas/ppcs" exact>
        <Tabelas table="ppcs" />
      </Route>
      
      <Route path="/tabelas/ppcs/adicionar" exact>
        <AdicionarPpc />
      </Route>

      <Route path="/tabelas/ppcs/:id" exact>
        <MostrarPpc />
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
    </Router>
    <GlobalStyle />
  </ThemeProvider>
);

export default App;
