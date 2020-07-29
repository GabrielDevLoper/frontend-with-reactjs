import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import api from '../../../services/api';

import { PatientsToolbar, PatientsContent } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const PatientView = props => {
  const classes = useStyles();

  const { patient_id } = props.match.params;

  const [patient, setPatients] = useState([]);

  useEffect(() => {
    async function loadPacient() {
      const reponse = await api.get(`/pacients/${patient_id}`);
      setPatients(reponse.data);
    }
    loadPacient();
  }, []);

  return (
    <div className={classes.root}>
      <PatientsToolbar />
      <div className={classes.content}>
        <PatientsContent patients={patient} />
      </div>
    </div>
  );
};

export default PatientView;
