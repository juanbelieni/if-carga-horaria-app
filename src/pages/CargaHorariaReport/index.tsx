import React, { useState, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import LinearProgress from '@material-ui/core/LinearProgress';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GetAppIcon from '@material-ui/icons/GetApp';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { ExportToCsv } from 'export-to-csv';

import api from '../../api';
import DefaultPage from '../../components/DefaultPage';
import { Turma, Professor } from '../../models';
import {
  Content,
  ReportOptionsContainer,
  InputsContainer,
  ExportContainer,
} from './styles';

type reportOptionsNames = 'default' | 'detailed' | 'simplified'

const reportOptions: { [key in reportOptionsNames]: { title: string, description: string } } = {
  default: {
    title: 'Relatório padrão',
    description: 'Retorna a carga horária do(s) professor(es) nas turmas selecionadas.',
  },
  detailed: {
    title: 'Relatório detalhado',
    description: 'Retorna a carga horária do(s) professor(es) por disciplina nas turmas selecionadas.',
  },
  simplified: {
    title: 'Relatório simplificado',
    description: 'Retorna apenas a carga horária total do(s) professor(es) no semestre.',
  },
};

const CargaHorariaReport: React.FC = () => {
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [selectedReportOption, setSelectedReportOption] = useState<reportOptionsNames>('default');
  const [selectedTurmas, setSelectedTurmas] = useState<number[]>([]);
  const [professores, setProfessores] = useState<Professor[]>([]);
  const [selectedProfessores, setSelectedProfessores] = useState<number[]>([]);
  const [selectedAno, setSelectedAno] = useState<number>(2020);
  const [selectedSemestre, setSelectedSemestre] = useState<number>(1);
  const [exporting, setExporting] = useState<boolean>(false);
  const [anchorReportMenu, setAnchorReportMenu] = useState<null | HTMLElement>(null);
  const [snackbarInfo, setSnackbarInfo] = useState({ open: false, message: '' });

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

  function openReportMenu(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorReportMenu(event.currentTarget);
  }

  function closeReportMenu() {
    setAnchorReportMenu(null);
  }

  function handleSelectReportOption(reportOption: reportOptionsNames) {
    setSelectedReportOption(reportOption);
    closeReportMenu();
  }

  function handleSelectTurma(event: any, newSelectedTurmas: Turma[]) {
    setSelectedTurmas(newSelectedTurmas.map(({ id }) => id));
  }

  function handleSelectProfessor(event: any, newSelectedProfessores: Professor[]) {
    setSelectedProfessores(newSelectedProfessores.map(({ id }) => id));
  }

  function showMessage(message: string) {
    setSnackbarInfo({
      open: true,
      message,
    });
  }

  function handleSnackbarClose() {
    setSnackbarInfo({
      open: false,
      message: '',
    });
  }

  async function handleExport() {
    setExporting(true);

    const params = {
      option: selectedReportOption,
      turmas: selectedTurmas.length === 0 ? undefined : selectedTurmas,
      professores: selectedProfessores.length === 0 ? undefined : selectedProfessores,
      ano: selectedAno,
      semestre: selectedSemestre,
    };

    const csvOptions = {
      quoteStrings: '"',
      showLabels: true,
      filename: `carga-horaria-${selectedAno}-${selectedSemestre}-${new Date().getTime()}`,
      useKeysAsHeaders: true,
    };

    try {
      const reportData = await api.getReport('carga-horaria', params);

      if (reportData.length === 0) {
        showMessage('Não existem dados suficientes no banco de dados');
      } else {
        const csvExporter = new ExportToCsv(csvOptions);
        csvExporter.generateCsv(reportData);
      }
    } catch (e) {
      showMessage('Erro ao exportar CSV');
    }
    setExporting(false);
  }

  return (
    <DefaultPage>
      <LinearProgress hidden={!exporting} />
      <Content>
        <Typography variant="h4" component="h1">Carga horária</Typography>
        <ReportOptionsContainer>
          <Card variant="outlined">
            <CardHeader
              action={(
                <IconButton onClick={openReportMenu}>
                  <ExpandMoreIcon />
                </IconButton>
            )}
              title={reportOptions[selectedReportOption].title}
              subheader={reportOptions[selectedReportOption].description}
            />
            <Menu
              anchorEl={anchorReportMenu}
              keepMounted
              open={Boolean(anchorReportMenu)}
              onClose={closeReportMenu}
            >
              <MenuItem onClick={() => handleSelectReportOption('default')}>
                {reportOptions.default.title}
              </MenuItem>
              <MenuItem onClick={() => handleSelectReportOption('simplified')}>
                {reportOptions.simplified.title}
              </MenuItem>
              <MenuItem onClick={() => handleSelectReportOption('detailed')}>
                {reportOptions.detailed.title}
              </MenuItem>
            </Menu>
          </Card>
        </ReportOptionsContainer>

        <InputsContainer>
          <Divider />
          <Autocomplete<Turma>
            multiple
            autoHighlight
            className="input"
            limitTags={2}
            options={turmas}
            onChange={handleSelectTurma}
            getOptionLabel={({ turma }) => turma}
            groupBy={({ ano_ingresso }) => String(ano_ingresso)}
            loading={turmas.length === 0}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Turmas"
                variant="outlined"
                helperText="Se quiser dados de todas as turmas, basta selecionar nenhuma opção"
              />
            )}
          />
          <Autocomplete<Professor>
            multiple
            autoHighlight
            className="input"
            limitTags={2}
            options={professores}
            onChange={handleSelectProfessor}
            getOptionLabel={({ nome }) => nome}
            groupBy={({ nome }) => nome.substring(0, 1)}
            loading={professores.length === 0}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Professores"
                variant="outlined"
                helperText="Se quiser dados de todas os professores, basta selecionar nenhuma opção"
              />
            )}
          />
          <TextField
            value={selectedAno}
            onChange={(e) => setSelectedAno(Number(e.target.value))}
            label="Ano"
            type="number"
            variant="outlined"
            className="input"
          />
          <FormControl variant="outlined" className="input">
            <InputLabel>Semestre</InputLabel>
            <Select
              value={selectedSemestre}
              onChange={(e) => setSelectedSemestre(Number(e.target.value))}
              label="Semestre"
            >
              <MenuItem value={1}>1º semestre</MenuItem>
              <MenuItem value={2}>2º semestre</MenuItem>
            </Select>
          </FormControl>
        </InputsContainer>

        <ExportContainer>
          <Button
            endIcon={<GetAppIcon />}
            onClick={handleExport}
            disabled={exporting}
            variant="contained"
            color="primary"
          >
            Exportar como CSV
          </Button>
        </ExportContainer>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={snackbarInfo.open}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          message={snackbarInfo.message}
        />
      </Content>
    </DefaultPage>
  );
};

export default CargaHorariaReport;
