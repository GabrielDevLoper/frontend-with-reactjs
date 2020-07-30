import React, { useRef, useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles, withStyles } from '@material-ui/styles';
import Input from '../../../../../components/Input';
import api from '../../../../../services/api';
import InputMask from 'react-input-mask';
import Swal from 'sweetalert2';

import { Form } from '@unform/web';
import {
  Card,
  CardActions,
  CardContent,
  Checkbox,
  TextField,
  Box,
  Button,
  Divider
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 10
  },
  inner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
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

  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(2),
    textAlign: 'center'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column'
  },

  btnGroup: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15
  },

  submitSave: {
    marginTop: 30
  },
  divider: {
    margin: 50
  },
  exams: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  title: {
    marginBottom: 30
  }
}));

const PatientsContent = props => {
  const { className, ...rest } = props;
  const formRef = useRef(null);

  const [exams, setExams] = useState([]);
  const [selectedExams, setSelectedExams] = useState([]);

  const classes = useStyles();

  async function handleAddClient(data, { reset }) {
    const {
      name,
      pront_req_interno,
      procedencia,
      convenio,
      medico_solicitante,
      fone,
      data_entrega
    } = data;
    const user_id = localStorage.getItem('id');

    try {
      const response = await api.post(`/users/${user_id}/pacients`, {
        name,
        pront_req_interno,
        procedencia,
        convenio,
        medico_solicitante,
        fone,
        data_entrega,
        exams: selectedExams
      });
      Swal.fire('Good job!', 'You clicked the button!', 'success');
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function loadExams() {
      const { data } = await api.get('/exams');
      setExams(data);
    }
    loadExams();
  }, []);

  function handleSelectItem(id) {
    const alreadySelected = selectedExams.findIndex(item => item === id);

    if (alreadySelected >= 0) {
      const filteredExams = selectedExams.filter(item => item !== id);
      setSelectedExams(filteredExams);
    } else {
      setSelectedExams([...selectedExams, id]);
    }
  }

  console.log(selectedExams);
  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <Form
            className={classes.form}
            ref={formRef}
            onSubmit={handleAddClient}>
            <Box className={classes.inner}>
              <Box className={classes.inputGroup}>
                <Input id="standard-basic" label="Nome" name="name" required />
                <Input
                  id="standard-basic"
                  required
                  label="Pront./Req./Interno"
                  name="pront_req_interno"
                />
                <Input
                  id="standard-basic"
                  name="convenio"
                  required
                  label="Convênio"
                />
              </Box>
              <Box className={classes.inputGroup}>
                <Input
                  id="standard-basic"
                  name="procedencia"
                  required
                  label="Procedência"
                />
                <Input
                  id="standard-basic"
                  name="medico_solicitante"
                  label="Médico Solicitante"
                />
                <Input id="standard-basic" name="fone" label="Fone" />
              </Box>

              <Box className={classes.inputGroup}>
                <Input
                  id="standard-basic"
                  name="data_entrega"
                  label="Data de Entrega"
                />
              </Box>
            </Box>
            <Divider className={classes.divider} />
            <h2 className={classes.title}>SELECIONE OS EXAMES</h2>
            <Box className={classes.exams}>
              <ul>
                <h3>BIOQUIMICA</h3>
                {exams.map(exam => (
                  <>
                    <li key={exam.id} className={classes.exams}>
                      <Box>
                        {exam.type_exam.title === 'BIOQUIMICA' ? (
                          <>
                            <Box>
                              <Checkbox
                                color="primary"
                                inputProps={{
                                  'aria-label': 'secondary checkbox'
                                }}
                                onClick={() => handleSelectItem(exam.id)}
                              />
                              <span>
                                {exam.code} {exam.description}
                              </span>
                            </Box>
                          </>
                        ) : null}
                      </Box>
                    </li>
                  </>
                ))}
              </ul>

              <ul>
                <h3>IMONOLOGIA</h3>

                {exams.map(exam => (
                  <>
                    <li key={exam.id} className={classes.exams}>
                      <Box>
                        {exam.type_exam.title === 'IMONOLOGIA' ? (
                          <>
                            <Box>
                              <Checkbox
                                color="primary"
                                inputProps={{
                                  'aria-label': 'secondary checkbox'
                                }}
                                onClick={() => handleSelectItem(exam.id)}
                              />
                              <span>
                                {exam.code} {exam.description}
                              </span>
                            </Box>
                          </>
                        ) : null}
                      </Box>
                    </li>
                  </>
                ))}
              </ul>

              <ul>
                <h3>HEMATOLOGIA</h3>
                {exams.map(exam => (
                  <>
                    <li key={exam.id} className={classes.exams}>
                      <Box>
                        {exam.type_exam.title === 'HEMATOLOGIA' ? (
                          <>
                            <Box>
                              <Checkbox
                                color="primary"
                                inputProps={{
                                  'aria-label': 'secondary checkbox'
                                }}
                                onClick={() => handleSelectItem(exam.id)}
                              />
                              <span>
                                {exam.code} {exam.description}
                              </span>
                            </Box>
                          </>
                        ) : null}
                      </Box>
                    </li>
                  </>
                ))}
              </ul>

              <ul>
                <h3>PARASITOLOGIA</h3>
                {exams.map(exam => (
                  <>
                    <li key={exam.id} className={classes.exams}>
                      <Box>
                        {exam.type_exam.title === 'PARASITOLOGIA' ? (
                          <>
                            <Box>
                              <Checkbox
                                color="primary"
                                inputProps={{
                                  'aria-label': 'secondary checkbox'
                                }}
                                onClick={() => handleSelectItem(exam.id)}
                              />
                              <span>
                                {exam.code} {exam.description}
                              </span>
                            </Box>
                          </>
                        ) : null}
                      </Box>
                    </li>
                  </>
                ))}
              </ul>
            </Box>
            <Box component="div" className={classes.btnGroup}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitSave}>
                Salvar
              </Button>
            </Box>
          </Form>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}></CardActions>
    </Card>
  );
};

PatientsContent.propTypes = {
  className: PropTypes.string,
  patients: PropTypes.array.isRequired
};

export default PatientsContent;
