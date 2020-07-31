import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import api from '../../../services/api';

import { PatientsToolbar, PatientsContent } from './components';
import { Transictions } from 'components/Transictions';

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
  const [address, setAddress] = useState([]);

  useEffect(() => {
    async function loadPacient() {
      const response = await api.get(`/pacients/${patient_id}`);
      setPatients(response.data);
    }
    loadPacient();
  }, []);

  useEffect(() => {
    async function loadAddressForPacient() {
      const response = await api.get(`/pacients/${patient_id}/address`);
      setAddress(response.data);
    }

    loadAddressForPacient();
  }, []);

  return (
    <div className={classes.root}>
      <Transictions>
        <PatientsToolbar />
        <div className={classes.content}>
          <PatientsContent patients={patient} address={address} />
        </div>
      </Transictions>
    </div>
  );
};

export default PatientView;
