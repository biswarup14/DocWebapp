import { createContext, useState } from 'react';

export const AppointmentContext = createContext();

export function AppointmentProvider({ children }) {
  const [appointments, setAppointments] = useState([]);

  const bookAppointment = (appointment) => {
    const newAppointment = {
      ...appointment,
      id: Date.now(),
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };
    setAppointments((prev) => [...prev, newAppointment]);
    return newAppointment;
  };

  const cancelAppointment = (id) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status: 'cancelled' } : apt))
    );
  };

  return (
    <AppointmentContext.Provider
      value={{ appointments, bookAppointment, cancelAppointment }}
    >
      {children}
    </AppointmentContext.Provider>
  );
}
