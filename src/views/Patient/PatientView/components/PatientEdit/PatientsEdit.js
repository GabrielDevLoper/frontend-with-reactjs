import React, { useRef, useEffect, useState, useContext } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles, withStyles } from '@material-ui/styles';
import Input from '../../../../../components/Input';
import api from '../../../../../services/api';
import Swal from 'sweetalert2';
import axios from 'axios';
import history from '../../../../../history';
import { Patient } from '../../../../../context/hooks/Pacient';

import { Form } from '@unform/web';
import {
  Card,
  CardActions,
  CardContent,
  Checkbox,
  TextField,
  Box,
  Button,
  Divider,
  InputLabel,
  Select
} from '@material-ui/core';
import { Transictions } from 'components/Transictions';

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
    marginTop: theme.spacing(2)
    // textAlign: 'center'
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
    marginTop: 15
  },
  divider: {
    margin: 20
  },
  exams: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  title: {
    margin: '20px 0',
    display: 'flex',
    justifyContent: 'center',
    color: '#8493a1'
  },

  input: {
    width: 320,
    height: 30,
    padding: '0 10px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#d1d9e0',
    fontSize: '16px',
    margin: '8px 0',
    outline: 0
  }
}));

const PatientsEdit = props => {
  const { patient, address, exame, className, ...rest } = props;
  const formRef = useRef(null);
  const { setOpenEdit } = useContext(Patient);

  const [ufs, setUfs] = useState([]);
  const [city, setCity] = useState([]);

  const [exams, setExams] = useState([]);
  const [selectedExams, setSelectedExams] = useState([]);
  const [selectedUf, setSelectedUf] = useState(address.uf);
  const [selectedCity, setSelectedCity] = useState(address.city);

  const classes = useStyles();

  async function handleEditPatient(data, { reset }) {
    const {
      name,
      pront_req_interno,
      procedencia,
      convenio,
      medico_solicitante,
      fone,
      data_entrega,

      neighborhood,
      street,
      number,
      zipcode
    } = data;

    // pegando id disponivel no localstorage do browser
    const user_id = localStorage.getItem('id');
    try {
      const { data } = await api.put(
        `/users/${user_id}/pacients/${patient.id}`,
        {
          name,
          pront_req_interno,
          procedencia,
          convenio,
          medico_solicitante,
          fone,
          data_entrega,
          exams: selectedExams,

          uf: selectedUf,
          city: selectedCity,
          neighborhood,
          street,
          number,
          zipcode
        }
      );

      if (data.messageAlert) {
        Swal.fire('Erro', 'Paciente já se encontra cadastrado', 'error');
      }

      //desativando botão do editar paciente e voltando para a tela de visualizar
      setOpenEdit(false);
      history.push('/patients');
      Swal.fire('Sucesso', 'Alterado com sucesso', 'success');
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setSelectedExams(exame.map(exam => exam.id));
  }, []);

  useEffect(() => {
    async function loadExams() {
      const { data } = await api.get('/exams');
      setExams(data);
    }
    loadExams();
  }, []);

  useEffect(() => {
    async function loadUfs() {
      const { data } = await axios.get(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
      );
      const ufInitials = data.map(uf => uf.sigla);
      setUfs(ufInitials);
    }
    loadUfs();
  }, []);

  useEffect(() => {
    async function loadCities() {
      const { data } = await axios.get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
      );

      const city = data.map(cities => cities.nome);

      setCity(city);
    }
    loadCities();
  }, [selectedUf]);

  function handleSelectExam(id) {
    const alreadySelected = selectedExams.findIndex(item => item === id);

    if (alreadySelected >= 0) {
      const filteredExams = selectedExams.filter(item => item !== id);
      setSelectedExams(filteredExams);
    } else {
      setSelectedExams([...selectedExams, id]);
    }
  }

  return (
    <Transictions>
      <Card {...rest} className={clsx(classes.root, className)}>
        <PerfectScrollbar>
          <CardContent className={classes.content}>
            <div className={classes.title}>
              <h2>DADOS DO PACIENTE</h2>
            </div>
            <Form
              className={classes.form}
              ref={formRef}
              onSubmit={handleEditPatient}>
              <Box className={classes.inner}>
                <Box className={classes.inputGroup}>
                  <label>Nome</label>
                  <Input
                    name="name"
                    defaultValue={patient.name}
                    className={classes.input}
                  />
                  <label>Pront./Req./Interno</label>
                  <Input
                    name="pront_req_interno"
                    defaultValue={patient.pront_req_interno}
                    className={classes.input}
                  />
                  <label>Convênio</label>
                  <Input
                    name="convenio"
                    defaultValue={patient.convenio}
                    className={classes.input}
                  />
                </Box>
                <Box className={classes.inputGroup}>
                  <label>Procedência</label>
                  <Input
                    name="procedencia"
                    defaultValue={patient.procedencia}
                    className={classes.input}
                  />
                  <label>Médico Solicitante</label>
                  <Input
                    name="medico_solicitante"
                    defaultValue={patient.medico_solicitante}
                    className={classes.input}
                  />
                  <label>Fone</label>
                  <Input
                    name="fone"
                    defaultValue={patient.fone}
                    className={classes.input}
                  />
                </Box>
                <Box className={classes.inputGroup}>
                  <label>Data de Entrega</label>

                  <Input
                    name="data_entrega"
                    defaultValue={patient.data_entrega}
                    className={classes.input}
                  />
                </Box>
              </Box>
              <div className={classes.title}>
                <h2>ENDEREÇO</h2>
              </div>
              <Box className={classes.inner}>
                <Box className={classes.inputGroup}>
                  <label htmlFor="uf">Estado (UF)</label>
                  <select
                    name="uf"
                    id="uf"
                    value={selectedUf}
                    onChange={e => setSelectedUf(e.target.value)}
                    className={classes.input}>
                    <option value="0">Selecione uma UF</option>
                    {ufs.map(uf => (
                      <option key={uf} value={uf}>
                        {uf}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="city">Cidade</label>
                  <select
                    name="city"
                    id="city"
                    value={selectedCity}
                    onChange={e => setSelectedCity(e.target.value)}
                    className={classes.input}>
                    <option value="0">Selecione uma Cidade</option>
                    {city.map(cities => (
                      <option key={cities} value={cities}>
                        {cities}
                      </option>
                    ))}
                  </select>
                </Box>
                <Box className={classes.inputGroup}>
                  <label>Bairro</label>
                  <Input
                    name="neighborhood"
                    defaultValue={patient.neighborhood}
                    className={classes.input}
                  />
                  <label>Rua</label>

                  <Input
                    name="street"
                    defaultValue={patient.street}
                    className={classes.input}
                  />
                </Box>
                <Box className={classes.inputGroup}>
                  <label>Número</label>
                  <Input
                    name="number"
                    defaultValue={patient.number}
                    className={classes.input}
                  />
                  <label>CEP</label>
                  <Input
                    name="zipcode"
                    defaultValue={patient.zipcode}
                    className={classes.input}
                  />
                </Box>
              </Box>

              <Divider className={classes.divider} />
              <div className={classes.title}>
                <h2>SELECIONE OS EXAMES</h2>
              </div>
              <Box className={classes.exams}>
                <ul>
                  <h3 className={classes.title}>BIOQUIMICA</h3>
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
                                  defaultChecked={
                                    selectedExams.includes(exam.id)
                                      ? true
                                      : false
                                  }
                                  onClick={() => handleSelectExam(exam.id)}
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
                  <h3 className={classes.title}>IMONOLOGIA</h3>

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
                                  defaultChecked={
                                    selectedExams.includes(exam.id)
                                      ? true
                                      : false
                                  }
                                  onClick={() => handleSelectExam(exam.id)}
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
                  <h3 className={classes.title}>HEMATOLOGIA</h3>
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
                                  defaultChecked={
                                    selectedExams.includes(exam.id)
                                      ? true
                                      : false
                                  }
                                  onClick={() => handleSelectExam(exam.id)}
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
                  <h3 className={classes.title}>PARASITOLOGIA</h3>
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
                                  defaultChecked={
                                    selectedExams.includes(exam.id)
                                      ? true
                                      : false
                                  }
                                  onClick={() => handleSelectExam(exam.id)}
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
          </CardContent>
          <CardActions className={classes.actions}></CardActions>
        </PerfectScrollbar>
      </Card>
    </Transictions>
  );
};

PatientsEdit.propTypes = {
  className: PropTypes.string,
  patients: PropTypes.array.isRequired
};

export default PatientsEdit;
