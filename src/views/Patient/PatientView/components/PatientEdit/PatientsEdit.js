import React from 'react';

function PatientEdit(props) {
  const { patient, ...rest } = props;

  return <div {...rest}>{patient.name}</div>;
}

export default PatientEdit;
