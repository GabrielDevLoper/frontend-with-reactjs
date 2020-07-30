import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import api from '../../services/api';

import { UsersToolbar, UsersTable } from './components';
import { Transictions } from '../../components/Transictions';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const UserList = () => {
  const classes = useStyles();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadPacients() {
      const reponse = await api.get('/users');
      setUsers(reponse.data);
    }
    loadPacients();
  }, []);

  return (
    <div className={classes.root}>
      <Transictions>
        <UsersToolbar />
        <div className={classes.content}>
          <UsersTable users={users} />
        </div>
      </Transictions>
    </div>
  );
};

export default UserList;
