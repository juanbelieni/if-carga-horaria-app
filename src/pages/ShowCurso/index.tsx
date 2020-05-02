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
import { Curso, Disciplina, CargaHoraria } from '../../models';

export default function ShowCurso() {
  const { id } = useParams<{id: string}>();
  const [curso, setCurso] = useState<Curso>();
  const [cargas, setCargas] = useState<CargaHoraria[]>();
  const [periodos, setPeriodos] = useState<Disciplina[][]>();
  const history = useHistory();

  useEffect(() => {
    api.show('cursos', id).then((data) => {
      setCurso(data);
    });
  }, [id]);

  useEffect(() => {
    if (curso) {
      api.index('disciplinas', { ppc_id: curso.ppc_id })
        .then((data: Disciplina[]) => {
          const toPeriodos: typeof periodos = [];
          for (let i = 0; i < curso.duracao; i += 1) {
            toPeriodos.push([]);
          }
          data.forEach((disciplina) => {
            toPeriodos[disciplina.periodo - 1].push(disciplina);
          });

          setPeriodos(toPeriodos);
        });

      api.index('cargas', { curso_id: curso.id })
        .then(setCargas);
    }
  }, [curso]);


  function getProfessor(disciplina_id: number) {
    const carga = cargas?.find((c) => c.disciplina_id === disciplina_id);

    return carga?.professor || 'Nenhum professor';
  }


  return (
    <ShowData
      title="Curso"
      data={[
        {
          name: 'PPC',
          value: curso?.ppc,
          icon: SubjectIcon,
          onClick: () => history.push(`/tabelas/ppcs/${curso?.ppc_id}`),
        },
        {
          name: 'Ano de ingresso',
          value: curso?.ano_ingresso,
          icon: CalendarIcon,
        },
        {
          name: 'Semestre de ingresso',
          value: curso && (curso.semestral ? `${curso.semestre_ingresso}º semestre` : 'Anual'),
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
                <Typography variant="h5" component="h2">{`${periodo}º ${curso?.semestral ? 'semestre' : 'ano'}`}</Typography>
                <List>
                  {
                    disciplinas.map((disciplina) => (
                      <ListItem key={periodo + disciplina.nome}>
                        <ListItemText primary={disciplina.nome} secondary={cargas ? getProfessor(disciplina.id) : <Skeleton variant="text" />} />
                        <ListItemSecondaryAction onClick={() => history.push(`/tabelas/cursos/${id}/${disciplina.id}`)}>
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
