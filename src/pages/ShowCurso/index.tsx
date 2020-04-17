import CalendarIcon from '@material-ui/icons/CalendarToday';
import SubjectIcon from '@material-ui/icons/Subject';
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';


import api from '../../api';
import ShowData from '../../components/ShowData';
import { Curso } from '../../models';

export default function ShowPpc() {
  const { id } = useParams<{id: string}>();
  const [data, setData] = useState<Curso>();
  const history = useHistory();

  useEffect(() => {
    api.show('cursos', id).then((_data) => {
      setData(_data);
    });
  }, [id]);


  return (
    <ShowData
      title="Curso"
      data={[
        {
          name: 'PPC',
          value: data?.ppc,
          icon: SubjectIcon,
          onClick: () => history.push(`/tabelas/ppcs/${data?.ppc_id}`),
        },
        {
          name: 'Ano de ingresso',
          value: data?.ano_ingresso,
          icon: CalendarIcon,
        },
        {
          name: 'Semestre de ingresso',
          value: data && (data.semestre_ingresso === 0 ? 'Anual' : `${data.semestre_ingresso}º semestre`),
          icon: CalendarIcon,
        },
      ]}
    >
      <br />
    </ShowData>
  );
}
