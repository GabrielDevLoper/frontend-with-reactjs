import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  IconButton
} from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';

import { getInitials } from 'helpers';

import history from '../../../../../history';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
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

const PatientsTable = props => {
  const { className, patients, ...rest } = props;

  const classes = useStyles();
  const [selectedPatients, setSelectedPatients] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = event => {
    const { patients } = props;

    let selectedPatients;

    if (event.target.checked) {
      selectedPatients = patients.map(patient => patient.id);
    } else {
      selectedPatients = [];
    }

    setSelectedPatients(selectedPatients);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedPatients.indexOf(id);
    let newSelectedPatients = [];

    if (selectedIndex === -1) {
      newSelectedPatients = newSelectedPatients.concat(selectedPatients, id);
    } else if (selectedIndex === 0) {
      newSelectedPatients = newSelectedPatients.concat(
        selectedPatients.slice(1)
      );
    } else if (selectedIndex === selectedPatients.length - 1) {
      newSelectedPatients = newSelectedPatients.concat(
        selectedPatients.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedPatients = newSelectedPatients.concat(
        selectedPatients.slice(0, selectedIndex),
        selectedPatients.slice(selectedIndex + 1)
      );
    }

    setSelectedPatients(newSelectedPatients);
  };

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  const handlePatientView = patient_id => {
    history.push(`/patient-view/${patient_id}`);
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedPatients.length === patients.length}
                      color="primary"
                      indeterminate={
                        selectedPatients.length > 0 &&
                        selectedPatients.length < patients.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>Nome</TableCell>
                  <TableCell>Pront./Req./Interno</TableCell>
                  <TableCell>Convenio</TableCell>
                  <TableCell>Procedencia</TableCell>
                  <TableCell>Data de Criação</TableCell>
                  <TableCell>Visualizar</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {patients.slice(0, rowsPerPage).map(patient => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={patient.id}
                    selected={selectedPatients.indexOf(patient.id) !== -1}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedPatients.indexOf(patient.id) !== -1}
                        color="primary"
                        onChange={event => handleSelectOne(event, patient.id)}
                        value="true"
                      />
                    </TableCell>
                    <TableCell>
                      <div className={classes.nameContainer}>
                        <Avatar
                          className={classes.avatar}
                          src={patient.avatarUrl}>
                          {getInitials(patient.name)}
                        </Avatar>
                        <Typography variant="body1">{patient.name}</Typography>
                      </div>
                    </TableCell>
                    <TableCell>{patient.pront_req_interno}</TableCell>
                    <TableCell>{patient.convenio}</TableCell>
                    <TableCell>{patient.procedencia}</TableCell>
                    <TableCell>
                      {moment(patient.created_at).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handlePatientView(patient.id)}>
                        <VisibilityIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={patients.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card>
  );
};

PatientsTable.propTypes = {
  className: PropTypes.string,
  patients: PropTypes.array.isRequired
};

export default PatientsTable;
