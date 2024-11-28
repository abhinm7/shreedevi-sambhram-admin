import React, { useContext, useEffect, useState } from "react";
import { Storecontext } from "../../Contexts/Storecontext";
import Dashboard from "../../Components/Dashboard/Dashboard";
import EventTable from "../../Components/EvetTable/EventTable";
import ParticipantTable from "../../Components/ParticipantTable/ParticipantTable";
import axios from "axios";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import "./AdminPage.css";
import Overview from "../../Components/Overview/Overview";

DataTable.use(DT);

const AdminPage = () => {
  const [tableData, setTableData] = useState([]);
  const [eventsData, setEventsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const participantsUrl =
  `${import.meta.env.VITE_API_URL}/api/admin/participants`;
  const eventsUrl =
    `${import.meta.env.VITE_API_URL}/api/v1/auth/events`;

  const { currentView, token,showEvent,showParticipants,setShowParticipants,handleEventTable,handleShowParticipants } = useContext(Storecontext);
  
   
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

  const eventRegistrationCounts = tableData.reduce((acc, participant) => {
    participant.registrations.forEach((reg) => {
      if (reg.payment_status === "paid") {
        acc[reg.event_id] = (acc[reg.event_id] || 0) + 1;
      }
    });
    return acc;
  }, {});

  const getEventParticipants = (eventId) => {
    // Filter participants who have a valid registration for the event with 'paid' status
    const participantsForEvent = tableData.filter((participant) =>
      participant.registrations.some(
        (reg) => reg.event_id === eventId && reg.payment_status === "paid"
      )
    );

    setShowParticipants(participantsForEvent);
  };

  useEffect(()=>{
    
  },[showParticipants])

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="admin">
      <Dashboard />
      <div className="admin-view">
        {currentView === "overview" && (
          <Overview partData={tableData} />
        )}

        {currentView === "all" && (
          <DataTable className="display">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>College</th>
                <th>No. of Events</th>
                <th>Events</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={row._id || index}>
                  <td>{row.name}</td>
                  <td>{row.phone}</td>
                  <td>{row.college}</td>
                  <td>{row.registrations.length}</td>
                  <td>
                    <button onClick={() => handleEventTable(row.registrations)}>
                      View Events
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </DataTable>
        )}

        {currentView === "events" && (
          <DataTable className="display">
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Event Sub Name</th>
                <th>Student Coordinator</th>
                <th>Coordinator Contact</th>
                <th>Registrations</th>
                <th>View Details</th>
              </tr>
            </thead>
            <tbody>
              {eventsData.map((event) => (
                <tr key={event.event_id}>
                  <td>{event.eventName}</td>
                  <td>{event.eventSubName}</td>
                  <td>{event.studentCoordinator}</td>
                  <td>{event.studentCoordinatorContact}</td>
                  <td>{eventRegistrationCounts[event._id] || 0}</td>
                  <td>
                    <button
                      onClick={() => getEventParticipants(event._id)}
                      className="store-btn"
                    >
                      View participants
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </DataTable>
        )}

        {
          showParticipants&&(
            <div className="event-table">
            <ParticipantTable pdata={showParticipants} partStatus={handleShowParticipants} />
          </div>
          )
        }

        {showEvent && (
          <div className="event-table">
            <EventTable data={showEvent} EventStatus={handleEventTable} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
