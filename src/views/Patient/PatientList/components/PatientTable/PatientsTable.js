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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  IconButton,
  Button
} from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { getInitials } from 'helpers';
import history from '../../../../../history';
import DeleteIcon from '@material-ui/icons/Delete';
import api from '../../../../../services/api';
import { confirmAlert } from 'react-confirm-alert';
import Swal from 'sweetalert2';

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
  },
  btnGroup: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  btnYes: {
    width: '160px',
    padding: '10px',
    color: '#fff',
    cursor: 'pointer',
    marginLeft: 10
  },
  confirmDelete: {
    textAlign: 'center',
    width: '500px',
    padding: '40px',
    backgroundColor: '#373B53',
    boxShadow: '0 20px 75px rgba(0, 0, 0, 0.23)',
    color: '#fff'
  }
}));

const PatientsTable = props => {
  const { className, patients, setPatients, ...rest } = props;

  const classes = useStyles();
  const [selectedPatients, setSelectedPatients] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  // const handleSelectAll = event => {
  //   const { patients } = props;

  //   let selectedPatients;

  //   if (event.target.checked) {
  //     selectedPatients = patients.map(patient => patient.id);
  //   } else {
  //     selectedPatients = [];
  //   }
  //   setSelectedPatients(selectedPatients);
  // };

  // const handleSelectOne = (event, id) => {
  //   const selectedIndex = selectedPatients.indexOf(id);
  //   let newSelectedPatients = [];

  //   if (selectedIndex === -1) {
  //     newSelectedPatients = newSelectedPatients.concat(selectedPatients, id);
  //   } else if (selectedIndex === 0) {
  //     newSelectedPatients = newSelectedPatients.concat(
  //       selectedPatients.slice(1)
  //     );
  //   } else if (selectedIndex === selectedPatients.length - 1) {
  //     newSelectedPatients = newSelectedPatients.concat(
  //       selectedPatients.slice(0, -1)
  //     );
  //   } else if (selectedIndex > 0) {
  //     newSelectedPatients = newSelectedPatients.concat(
  //       selectedPatients.slice(0, selectedIndex),
  //       selectedPatients.slice(selectedIndex + 1)
  //     );
  //   }

  //   setSelectedPatients(newSelectedPatients);
  // };

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  async function handlePatientDelete(patient_id) {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className={classes.confirmDelete}>
            <h1>Você tem certeza?</h1>
            <p>Deseja excluir este paciente?</p>
            <div className={classes.btnGroup}>
              <Button
                variant="contained"
                className={classes.btnYes}
                color="primary"
                onClick={onClose}>
                Não
              </Button>
              <Button
                variant="contained"
                color="secondary"
                className={classes.btnYes}
                onClick={async () => {
                  await api.delete(`/pacients/${patient_id}`);
                  setPatients(
                    patients.filter(patient => patient.id !== patient_id)
                  );
                  onClose();
                  Swal.fire('Sucesso', 'Excluído com sucesso', 'success');
                }}>
                Sim, exclua-o!
              </Button>
            </div>
          </div>
        );
      }
    });
  }

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
                  {/* Comentando os check box */}
                  {/* <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedPatients.length === patients.length}
                      color="primary"
                      indeterminate={
                        selectedPatients.length > 0 &&
                        selectedPatients.length < patients.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell> */}
                  <TableCell>Nome</TableCell>
                  <TableCell>Pront./Req./Interno</TableCell>
                  <TableCell>Convenio</TableCell>
                  <TableCell>Procedencia</TableCell>
                  <TableCell>Data de Criação</TableCell>
                  <TableCell>Visualizar</TableCell>
                  <TableCell>Excluir</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {patients.slice(0, rowsPerPage).map(patient => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={patient.id}
                    selected={selectedPatients.indexOf(patient.id) !== -1}>
                    {/* <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedPatients.indexOf(patient.id) !== -1}
                        color="primary"
                        onChange={event => handleSelectOne(event, patient.id)}
                        value="true"
                      />
                    </TableCell> */}
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
                    <TableCell>
                      <IconButton
                        onClick={() => handlePatientDelete(patient.id)}>
                        <DeleteIcon />
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
