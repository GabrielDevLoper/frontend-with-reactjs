import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button, IconButton } from '@material-ui/core';
import history from '../../../../../history';
import api from '../../../../../services/api';
import Swal from 'sweetalert2';

import { SearchInput } from 'components';

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
  const { className, ...rest } = props;

  const classes = useStyles();

  const handleGoToPatientAdd = () => {
    history.push('/patient-add');
  };

  const handlePDF = async () => {
    await api.get('/all-users');
    Swal.fire('Sucesso', 'PDF gerado na area de trabalho', 'success');
  };

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div className={classes.row}>
        <span className={classes.spacer} />
        <Button className={classes.importButton}>Import</Button>
        <Button className={classes.exportButton} onClick={handlePDF}>
          Gerar PDF
        </Button>
        <Button
          color="primary"
          variant="contained"
          className={classes.btnAdd}
          onClick={handleGoToPatientAdd}>
          Cadastrar Paciente
        </Button>
      </div>
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="Encontrar paciente"
        />
      </div>
    </div>
  );
};

PatientsToolbar.propTypes = {
  className: PropTypes.string
};

export default PatientsToolbar;
