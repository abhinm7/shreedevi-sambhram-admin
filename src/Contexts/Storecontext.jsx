import { useState, createContext, useEffect } from "react";

export const Storecontext = createContext();

export const ContextProvider = ({ children }) => {
  const [currentView, setCurrentView] = useState("overview");
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const [showEvent, setShowEvent] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);

  useEffect(() => {
    if (token) { 
      localStorage.setItem("token", token);
    }
  }, [token]);

  const handleEventTable = (registrations) => {
    setShowEvent(registrations || false);
  };

  const handleShowParticipants = () => {
    setShowParticipants(false);
  };

  const contextvalue = {
    currentView,
    setCurrentView,
    token,
    setToken,
    showParticipants,
    setShowParticipants,
    showEvent,
    setShowEvent,
    handleEventTable,
    handleShowParticipants
  };

  return (
    <Storecontext.Provider value={contextvalue}>
      {children}
    </Storecontext.Provider>
  ); 
};
