import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import api from '../../../services/api';
import { confirmAlert } from 'react-confirm-alert';

import { PatientsToolbar, PatientsTable } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const PatientList = () => {
  const classes = useStyles();

  const [patients, setPatients] = useState([]);

  useEffect(() => {
    async function loadPacients() {
      const reponse = await api.get('/pacients');
      setPatients(reponse.data);
    }
    loadPacients();
  }, []);

  return (
    <div className={classes.root}>
      <PatientsToolbar />
      <div className={classes.content}>
        <PatientsTable patients={patients} setPatients={setPatients} />
      </div>
    </div>
  );
};

export default PatientList;
