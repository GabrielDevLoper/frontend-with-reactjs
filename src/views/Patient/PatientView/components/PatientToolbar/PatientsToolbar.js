import React, { useContext } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button, IconButton } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Patient } from '../../../../../context/hooks/Pacient';
import api from '../../../../../services/api';
import history from '../../../../../history';
import Swal from 'sweetalert2';

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  }
}));

const PatientsToolbar = props => {
  const { className, patient_id, ...rest } = props;
  const { open, openEdit, setOpenEdit } = useContext(Patient);

  const classes = useStyles();

  const handleBack = () => {
    setOpenEdit(false);
    history.goBack();
  };

  const handlePDF = async () => {
    await api.get(`/show-user/${patient_id}`);
    Swal.fire('Sucesso', 'PDF gerado na area de trabalho', 'success');
  };

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div className={classes.row}>
        <span className={classes.spacer} />
        <Button className={classes.exportButton} onClick={handlePDF}>
          PDF
        </Button>
        <Button color="primary" variant="contained" onClick={open}>
          {openEdit ? 'Visualizar' : 'Editar Paciente'}
        </Button>
      </div>
      <div className={classes.row}>
        <IconButton onClick={handleBack}>
          <ArrowBackIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default PatientsToolbar;
