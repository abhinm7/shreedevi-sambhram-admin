import React, { useContext, useEffect, useState } from "react";
import { Storecontext } from "../../Contexts/Storecontext";

import Dashboard from "../../Components/Dashboard/Dashboard";
import EventTable from "../../Components/EvetTable/EventTable";
import EventType from "../../Components/EventType/EventType";
import SpotRegistration from "../../Components/SpotRegistration/SpotRegistration";
import ParticipantTable from "../../Components/ParticipantTable/ParticipantTable";
import Overview from "../../Components/Overview/Overview";

import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";

import "./AdminPage.css";

DataTable.use(DT);

const AdminPage = () => {
  const {
    currentView,
    showEvent,
    showParticipants,
    setShowParticipants,
    handleEventTable,
    handleShowParticipants,
    tableData,
    eventsData,
    successfulParticipants,
    isLoading,
    error,
  } = useContext(Storecontext);

  const eventRegistrationCounts = tableData.reduce((acc, participant) => {
    participant.registrations.forEach((reg) => {
      if (reg.payment_status === "paid") {
        acc[reg.event_id] = (acc[reg.event_id] || 0) + 1;
      }
    });
    return acc;
  }, {});

  const getEventParticipants = (eventId) => {
    const participantsForEvent = tableData.filter((participant) =>
      participant.registrations.some(
        (reg) => reg.event_id === eventId && reg.payment_status === "paid"
      )
    );

    setShowParticipants(participantsForEvent);
  };

  const filteredTableData = tableData.filter(item => 
    item.registrations.some(registration => registration.payment_status === "paid")
);
  

  useEffect(() => {}, [showParticipants]);

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
        {currentView === "overview" && <Overview partData={tableData} />}

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
              {successfulParticipants.map((row, index) => (
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

        {currentView === "Technical" && (
          <EventType
            data={eventsData}
            getParticipants={getEventParticipants}
            eventRegistrationCounts={eventRegistrationCounts}
            eventype={currentView}
          />
        )}

        {currentView === "Cultural" && (
          <EventType
            data={eventsData}
            getParticipants={getEventParticipants}
            eventRegistrationCounts={eventRegistrationCounts}
            eventype={currentView}
          />
        )}

        {currentView === "Special" && (
          <EventType
            data={eventsData}
            getParticipants={getEventParticipants}
            eventRegistrationCounts={eventRegistrationCounts}
            eventype={currentView}
          />
        )}
         {currentView === "spot" && (

          <SpotRegistration/>
        )}

        {showParticipants && (
          <div className="event-table">
            <ParticipantTable
              pdata={showParticipants}
              partStatus={handleShowParticipants}
            />
          </div>
        )}

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
