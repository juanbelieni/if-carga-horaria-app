import React from 'react';

import green from '@material-ui/core/colors/green';
import { ptBR } from '@material-ui/core/locale';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import DarkModeContext from './contexts/darkMode';
import CargaHorariaReport from './pages/CargaHorariaReport';
import Landing from './pages/Landing';
import PpcsTable from './pages/PpcsTable';
import ProfessoresTable from './pages/ProfessoresTable';
import ShowPpc from './pages/ShowPpc';
import ShowTurma from './pages/ShowTurma';
import TurmasTable from './pages/TurmasTable';
import GlobalStyle from './styles/global';
import usePersistedState from './utils/usePersistedState';

const App : React.FC = () => {
  const [darkMode, setDarkMode] = usePersistedState('dark-mode', false);

  const theme = createMuiTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: green,
      secondary: green,
    },
  }, ptBR);

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      <ThemeProvider theme={theme}>
        <Router>
          <Route path="/tabelas/ppcs" exact>
            <PpcsTable />
          </Route>

          <Route path="/tabelas/ppcs/:id" exact>
            <ShowPpc />
          </Route>

          <Route path="/tabelas/turmas" exact>
            <TurmasTable />
          </Route>

          <Route path="/tabelas/turmas/:id" exact>
            <ShowTurma />
          </Route>

          <Route path="/tabelas/professores" exact>
            <ProfessoresTable />
          </Route>

          <Route path="/relatorios/carga-horaria" exact>
            <CargaHorariaReport />
          </Route>

          <Route>
            <Landing />
          </Route>
        </Router>
        <GlobalStyle />
      </ThemeProvider>
    </DarkModeContext.Provider>
  );
};

export default App;
