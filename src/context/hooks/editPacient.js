import React, { createContext, useState } from 'react';

const PatientEdit = createContext();

function PatientProvider({ children }) {
  const [openEdit, setOpenEdit] = useState(false);

  const open = () => {
    setOpenEdit(!openEdit);
  };

  return (
    <PatientEdit.Provider value={{ openEdit, open, setOpenEdit }}>
      {children}
    </PatientEdit.Provider>
  );
}

export { PatientEdit, PatientProvider };
