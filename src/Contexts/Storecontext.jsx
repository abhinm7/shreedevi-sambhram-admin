import { useState, createContext, useEffect } from "react";
import axios from 'axios'

export const Storecontext = createContext();

export const ContextProvider = ({ children }) => {
  const [currentView, setCurrentView] = useState("overview");
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const [tableData, setTableData] = useState([]);
  const [eventsData, setEventsData] = useState([]);

  const [showEvent, setShowEvent] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  const participantsUrl = `${
    import.meta.env.VITE_API_URL
  }/api/admin/participants`;
  const eventsUrl = `${import.meta.env.VITE_API_URL}/api/v1/auth/events`;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [participantsRes, eventsRes] = await Promise.all([
          axios.get(participantsUrl, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get(eventsUrl),
        ]);

        setTableData(participantsRes.data.participants || []);
        setEventsData(eventsRes.data || []);
      } catch (err) {
        console.error("Error fetching data", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    }
  }, [token]);


  const successfulParticipants = tableData.filter((participant) =>
    participant.registrations.some(
      (reg) => reg.payment_status === "paid"
    )
  );
  const NonsuccessfulParticipants = tableData.filter((participant) =>
    participant.registrations.some(
      (reg) => reg.payment_status === "failed"
    )
  );

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
    handleShowParticipants,
    tableData,
    setTableData,
    eventsData,
    setEventsData,
    successfulParticipants,
    NonsuccessfulParticipants,
    isLoading,
    error
  };

  return (
    <Storecontext.Provider value={contextvalue}>
      {children}
    </Storecontext.Provider>
  );
};
