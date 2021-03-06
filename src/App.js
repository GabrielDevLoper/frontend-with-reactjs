import React from 'react';
import { Router } from 'react-router-dom';
import { Chart } from 'react-chartjs-2';
import { ThemeProvider } from '@material-ui/styles';
import validate from 'validate.js';
import { chartjs } from './helpers';
import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import validators from './common/validators';
import Routes from './Routes';
import { AuthProvider } from './context/AuthContext';
import { PatientProvider } from './context/hooks/Pacient';
import history from './history';
import { Transictions } from './components/Transictions';
Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw
});

validate.validators = {
  ...validate.validators,
  ...validators
};

export default function App() {
  return (
    <Transictions>
      <AuthProvider>
        <PatientProvider>
          <ThemeProvider theme={theme}>
            <Router history={history}>
              <Routes />
            </Router>
          </ThemeProvider>
        </PatientProvider>
      </AuthProvider>
    </Transictions>
  );
}
