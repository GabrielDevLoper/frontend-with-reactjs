import React from 'react';
import { Transictions } from 'components/Transictions';

function PatientEdit(props) {
  const { patient, ...rest } = props;

  return (
    <Transictions>
      {' '}
      <div {...rest}>{patient.name}</div>
    </Transictions>
  );
}

export default PatientEdit;
