import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import LaunchIcon from '@material-ui/icons/Launch';
import SubjectIcon from '@material-ui/icons/Subject';
import Skeleton from '@material-ui/lab/Skeleton';
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import api from '../../api';
import Loading from '../../components/Loading';
import ShowData from '../../components/ShowData';
import { Turma, Disciplina, CargaHoraria } from '../../models';

export default function ShowTurma() {
  const { id } = useParams<{id: string}>();
  const [turma, setTurma] = useState<Turma>();
  const [cargas, setCargas] = useState<CargaHoraria[]>();
  const [periodos, setPeriodos] = useState<Disciplina[][]>();
  const history = useHistory();

  useEffect(() => {
    api.show('turmas', id).then((data) => {
      setTurma(data);
    });
  }, [id]);

  useEffect(() => {
    if (turma) {
      api.index('disciplinas', { ppc_id: turma.ppc_id })
        .then((data: Disciplina[]) => {
          const toPeriodos: typeof periodos = [];
          for (let i = 0; i < turma.duracao; i += 1) {
            toPeriodos.push([]);
          }
          data.forEach((disciplina) => {
            toPeriodos[disciplina.periodo - 1].push(disciplina);
          });

          setPeriodos(toPeriodos);
        });

      api.index('cargas', { turma_id: turma.id })
        .then(setCargas);
    }
  }, [turma]);


  function getProfessor(disciplina_id: number) {
    const carga = cargas?.find((c) => c.disciplina_id === disciplina_id);

    return carga?.professor || 'Nenhum professor';
  }


  return (
    <ShowData
      title="Turma"
      data={[
        {
          name: 'PPC',
          value: turma?.ppc,
          icon: SubjectIcon,
          onClick: () => history.push(`/tabelas/ppcs/${turma?.ppc_id}`),
        },
        {
          name: 'Ano de ingresso',
          value: turma?.ano_ingresso,
          icon: CalendarIcon,
        },
        {
          name: 'Semestre de ingresso',
          value: turma && (turma.semestral ? `${turma.semestre_ingresso}º semestre` : 'Anual'),
          icon: CalendarIcon,
        },
      ]}
    >
      {
        periodos?.map((disciplinas, i) => {
          const periodo = i + 1;
          if (disciplinas.length > 0) {
            return (
              <div key={periodo}>
                <Typography variant="h5" component="h2">{`${periodo}º ${turma?.semestral ? 'semestre' : 'ano'}`}</Typography>
                <List>
                  {
                    disciplinas.map((disciplina) => (
                      <ListItem key={periodo + disciplina.nome}>
                        <ListItemText primary={disciplina.nome} secondary={cargas ? getProfessor(disciplina.id) : <Skeleton variant="text" />} />
                        <ListItemSecondaryAction onClick={() => history.push(`/tabelas/turmas/${id}/${disciplina.id}`)}>
                          <Tooltip title="Definir professor">
                            <IconButton edge="end">
                              <LaunchIcon />
                            </IconButton>
                          </Tooltip>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))
                  }
                </List>
              </div>
            );
          }
          return null;
        })
        || <Loading />
      }
    </ShowData>
  );
}
