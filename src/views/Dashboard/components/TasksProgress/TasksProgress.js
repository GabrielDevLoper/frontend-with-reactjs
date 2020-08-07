import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';

import api from '../../../../services/api';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.success.main,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  difference: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  },
  differenceIcon: {
    color: theme.palette.success.dark
  },
  differenceValue: {
    color: theme.palette.success.dark,
    marginRight: theme.spacing(1)
  }
}));

const TotalPatients = props => {
  const { className, ...rest } = props;

  const [totalPatients, setTotalPatients] = useState([]);

  useEffect(() => {
    async function loadPatients() {
      const { data } = await api.get('/pacients');
      setTotalPatients(data);
    }
    loadPatients();
  }, []);

  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2">
              TOTAL DE PACIENTES
            </Typography>
            <Typography variant="h3">{totalPatients.length}</Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <LocalHospitalIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
        <div className={classes.difference}>
          <Typography className={classes.caption} variant="caption">
            Pacientes cadastrados no sistema
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

TotalPatients.propTypes = {
  className: PropTypes.string
};

export default TotalPatients;
