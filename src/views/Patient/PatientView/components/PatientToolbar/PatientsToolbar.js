import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button, IconButton } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Patient } from '../../../../../context/hooks/Pacient';
import history from '../../../../../history';

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
  const { open, openEdit, setOpenEdit } = useContext(Patient);

  const classes = useStyles();

  const handleBack = () => {
    setOpenEdit(false);
    history.goBack();
  };

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div className={classes.row}>
        <span className={classes.spacer} />
        <Button className={classes.importButton}>Import</Button>
        <Button className={classes.exportButton}>Export</Button>
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

PatientsToolbar.propTypes = {
  className: PropTypes.string
};

export default PatientsToolbar;
