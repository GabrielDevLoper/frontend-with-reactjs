import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { PatientsToolbar, PatientsContent } from './components';

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

  return (
    <div className={classes.root}>
      <PatientsToolbar />
      <div className={classes.content}>
        <PatientsContent />
      </div>
    </div>
  );
};

export default PatientList;
