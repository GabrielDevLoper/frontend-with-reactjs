import React, { createContext, useState } from 'react';

const Patient = createContext();

function PatientProvider({ children }) {
  const [openEdit, setOpenEdit] = useState(false);

  const open = () => {
    setOpenEdit(!openEdit);
  };

  return (
    <Patient.Provider
      value={{
        openEdit,
        open,
        setOpenEdit
      }}>
      {children}
    </Patient.Provider>
  );
}

export { Patient, PatientProvider };
