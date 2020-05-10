import React, { useState, useEffect, useContext } from 'react';

import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import GetApp from '@material-ui/icons/GetApp';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { ExportToCsv } from 'export-to-csv';

import api from '../../api';
import DefaultPage from '../../components/DefaultPage';
import DarkModeContext from '../../contexts/darkMode';
import { Turma, Professor } from '../../models';
import {
  Content,
  ButtonsContainer,
  Button,
  InputsContainer,
  ExportContainer,
} from './styles';

const fields = [
  { name: 'professor', title: 'Professor' },
  { name: 'disciplina', title: 'Disciplina' },
  // { name: 'aulas_semana', title: 'Quantidade de aulas por semana' },
  // { name: 'duracao_aula', title: 'Duração da aula' },
  { name: 'turma', title: 'Turma' },
  // { name: 'periodo', title: 'Período' },
  // { name: 'ano_semestre', title: 'Ano/semestre' },
];

const CargaHorariaReport: React.FC = () => {
  const { darkMode } = useContext(DarkModeContext);
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [selectedTurmas, setSelectedTurmas] = useState<number[]>([]);
  const [professores, setProfessores] = useState<Professor[]>([]);
  const [selectedProfessores, setSelectedProfessores] = useState<number[]>([]);
  const [exporting, setExporting] = useState<boolean>(false);

  useEffect(() => {
    if (turmas.length === 0) {
      api.index('turmas').then(setTurmas);
    }
  }, [turmas]);

  useEffect(() => {
    if (professores.length === 0) {
      api.index('professores').then(setProfessores);
    }
  }, [professores]);

  function handleSelectField(fieldName: string) {
    if (selectedFields.includes(fieldName)) {
      setSelectedFields(selectedFields.filter((field) => field !== fieldName));
    } else {
      setSelectedFields([...selectedFields, fieldName]);
    }
  }

  function handleSelectTurma(event: any, newSelectedTurmas: Turma[]) {
    setSelectedTurmas(newSelectedTurmas.map(({ id }) => id));
  }

  function handleSelectProfessor(event: any, newSelectedProfessores: Professor[]) {
    setSelectedProfessores(newSelectedProfessores.map(({ id }) => id));
  }

  async function handleExport() {
    setExporting(true);

    const params = {
      fields: selectedFields,
      turmas: selectedTurmas,
      professores: selectedProfessores,
    };

    const options = {
      quoteStrings: '"',
      showLabels: true,
      filename: `carga-horaria-${new Date().getTime()}`,
      useKeysAsHeaders: true,
    };

    try {
      const reportData = await api.getReport('carga-horaria', params);
      const csvExporter = new ExportToCsv(options);
      console.debug(reportData);
      csvExporter.generateCsv(reportData);
    } catch (e) {
      // Fazer algo melhor depois
      alert('Erro ao exportar CSV');
    }
    setExporting(false);
  }

  return (
    <DefaultPage>
      <LinearProgress hidden={!exporting} />
      <Content>
        <Typography variant="h4" component="h1">Carga horária</Typography>
        <ButtonsContainer container darkMode={darkMode} spacing={2}>
          {fields.map((field, i) => {
            const selected = selectedFields.includes(field.name);
            return (
              <Grid item key={field.name}>
                <Button
                  onClick={() => handleSelectField(field.name)}
                  disableElevation={!selected}
                >
                  {field.title}
                  { !selected && (<div className="filter" />) }
                </Button>
              </Grid>
            );
          })}
        </ButtonsContainer>
        <InputsContainer>
          <Autocomplete<Turma>
            multiple
            className="input"
            limitTags={2}
            options={turmas}
            onChange={handleSelectTurma}
            getOptionLabel={({ turma }) => turma}
            loading={turmas.length === 0}
            renderInput={(params) => (
              <TextField {...params} label="Turmas" variant="outlined" />
            )}
          />
          <Autocomplete<Professor>
            multiple
            className="input"
            limitTags={2}
            options={professores}
            onChange={handleSelectProfessor}
            getOptionLabel={({ nome }) => nome}
            loading={professores.length === 0}
            renderInput={(params) => (
              <TextField {...params} label="Professores" variant="outlined" />
            )}
          />
        </InputsContainer>
        <ExportContainer>
          <Button
            endIcon={<GetApp />}
            onClick={handleExport}
            disabled={exporting}
          >
            Exportar como CSV

          </Button>
        </ExportContainer>
      </Content>
    </DefaultPage>
  );
};

export default CargaHorariaReport;
