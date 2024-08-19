import React, { createContext, useContext, useState, useEffect } from "react";

// Kreiranje konteksta za upravljanje događajima
const EventContext = createContext();

export const EventProvider = ({ children }) => {
  // State hook za čuvanje liste događaja
  const [events, setEvents] = useState([]);

  // Funkcija za dodavanje novog događaja u listu
  const addEvent = (event) => {
    setEvents((prevEvents) => [...prevEvents, event]);
  };

  // useEffect hook koji reaguje na promene u listi događaja
  useEffect(() => {}, [events]);

  return (
    <EventContext.Provider value={{ events, addEvent }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEventContext = () => {
  return useContext(EventContext);
};
