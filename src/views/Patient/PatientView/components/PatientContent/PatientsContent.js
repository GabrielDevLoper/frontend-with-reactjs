import React, { useState, useContext } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Patient } from '../../../../../context/hooks/Pacient';

import { makeStyles } from '@material-ui/styles';
import { Card, CardContent } from '@material-ui/core';

import PatientsEdit from '../PatientEdit';
import { Transictions } from 'components/Transictions';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050,
    padding: 10,
    display: 'flex',
    justifyContent: 'space-between'
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const PatientsContent = props => {
  const classes = useStyles();
  const { patients } = props;

  const data_de_criação = moment(patients.created_at).format('DD/MM/YYYY');

  const { openEdit } = useContext(Patient);

  return (
    <Card className={clsx(classes.root)}>
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          {openEdit ? (
            <PatientsEdit patient={patients} className={classes.inner} />
          ) : (
            <Transictions>
              <div className={classes.inner}>
                <div>
                  <h3>Nome: {patients.name}</h3>
                  <h3>Pront./Reque./Interno: {patients.pront_req_interno}</h3>
                  <h3>Convênio: {patients.convenio}</h3>
                  <h3>Procedência:{patients.procedencia}</h3>
                </div>
                <div>
                  <h3>Médico Solicitante: {patients.medico_solicitante}</h3>
                  <h3>Fone: {patients.fone}</h3>
                  <h3>Data de Entrega: {patients.data_entrega}</h3>
                  <h3>Data de Criação: {data_de_criação}</h3>
                </div>
              </div>
            </Transictions>
          )}
        </PerfectScrollbar>
      </CardContent>
    </Card>
  );
};

PatientsContent.propTypes = {
  className: PropTypes.string,
  patients: PropTypes.array.isRequired
};

export default PatientsContent;
