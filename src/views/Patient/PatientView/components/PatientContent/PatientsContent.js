import React, { useContext } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Patient } from '../../../../../context/hooks/Pacient';

import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Checkbox, Box } from '@material-ui/core';

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
    font: '400 1.4rem Poppins'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  },
  title: {
    textAlign: 'center'
  },
  exams: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}));

const PatientsContent = props => {
  const classes = useStyles();
  const { patients, address, exams } = props;
  const { openEdit } = useContext(Patient);

  const data_de_criação = moment(patients.created_at).format('DD/MM/YYYY');

  return (
    <Card className={clsx(classes.root)}>
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          {openEdit ? (
            <PatientsEdit patient={patients} address={address} exame={exams} />
          ) : (
            <Transictions>
              <div className={classes.inner}>
                <div>
                  <div className={classes.nameContainer}>
                    <h4>Nome: </h4>
                    <span>{patients.name}</span>
                  </div>
                  <div className={classes.nameContainer}>
                    <h4>Pront./Reque./Interno: </h4>
                    <span>{patients.pront_req_interno}</span>
                  </div>
                  <div className={classes.nameContainer}>
                    <h4>Convênio: </h4>
                    <span>{patients.convenio}</span>
                  </div>
                  <div className={classes.nameContainer}>
                    <h4>Procedência: </h4>
                    <span>{patients.procedencia}</span>
                  </div>
                </div>
                <div>
                  <div className={classes.nameContainer}>
                    <h4>Médico Solicitante: </h4>
                    <span>{patients.medico_solicitante}</span>
                  </div>
                  <div className={classes.nameContainer}>
                    <h4>Fone: </h4>
                    <span>{patients.fone}</span>
                  </div>
                  <div className={classes.nameContainer}>
                    <h4>Data de Entrega: </h4>
                    <span>{patients.data_entrega}</span>
                  </div>
                  <div className={classes.nameContainer}>
                    <h4>Data de Criação: </h4>
                    <span>{data_de_criação}</span>
                  </div>
                </div>
              </div>
              {/* ENDEREÇO E EXAMES */}
              <div className={classes.inner}>
                <div>
                  <div>
                    <h1>Endereço</h1>
                  </div>
                  <div className={classes.nameContainer}>
                    <h4>UF: </h4>
                    <span>{patients.uf}</span>
                  </div>
                  <div className={classes.nameContainer}>
                    <h4>Cidade: </h4>
                    <span>{patients.city}</span>
                  </div>
                  <div className={classes.nameContainer}>
                    <h4>Bairro: </h4>
                    <span>{patients.neighborhood}</span>
                  </div>
                  <div className={classes.nameContainer}>
                    <h4>Rua: </h4>
                    <span>{patients.street}</span>
                  </div>
                  <div className={classes.nameContainer}>
                    <h4>CEP: </h4>
                    <span>{patients.zipcode}</span>
                  </div>
                  <div className={classes.nameContainer}>
                    <h4>Número: </h4>
                    <span>{patients.number}</span>
                  </div>
                </div>
              </div>

              <div className={classes.inner}>
                <div>
                  <div>
                    <h1>Exames</h1>
                  </div>
                  {exams.map(exam => (
                    <div className={classes.nameContainer}>
                      <span>
                        Código: {exam.code} Descrição: {exam.description}
                      </span>
                    </div>
                  ))}
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
