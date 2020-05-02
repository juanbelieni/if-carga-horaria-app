import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import LaunchIcon from '@material-ui/icons/Launch';
import Skeleton from '@material-ui/lab/Skeleton';
import React, { ReactNode, FC, MouseEvent } from 'react';

import DefaultPage from '../DefaultPage';
import { Container } from './styles';

type onClickEvent = (event: MouseEvent) => void

interface ShowDataProps {
  title: string,
  data: {
    name: string,
    value: number | string | undefined,
    icon: FC,
    onClick?: onClickEvent,
  }[],
  children: ReactNode,
}

export default function ShowData({ children, data, title }: ShowDataProps) {
  function createListItem(
    name: string,
    value: number | string | undefined,
    Icon: FC,
    onClick?: onClickEvent,
  ) {
    return (
      <>
        <ListItem key={name}>
          <ListItemAvatar>
            <Avatar>
              <Icon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={name} secondary={value ?? <Skeleton variant="text" />} />
          {
            onClick
              ? (
                <ListItemSecondaryAction onClick={onClick}>
                  <Tooltip title="Mostrar">
                    <IconButton edge="end">
                      <LaunchIcon />
                    </IconButton>
                  </Tooltip>
                </ListItemSecondaryAction>
              )
              : null
          }
        </ListItem>
        <Divider variant="inset" component="li" />
      </>
    );
  }

  return (
    <DefaultPage>
      <Container>
        <Typography variant="h4" component="h1">{title}</Typography>
        <List>
          {
            data.map((item) => createListItem(item.name, item.value, item.icon, item.onClick))
          }
        </List>
        {children}
      </Container>
    </DefaultPage>
  );
}
