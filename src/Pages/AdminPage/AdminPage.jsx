import React, { useContext, useEffect, useState } from "react";
import { Storecontext } from "../../Contexts/Storecontext";

import Dashboard from "../../Components/Dashboard/Dashboard";
import EventTable from "../../Components/EvetTable/EventTable";
import EventType from "../../Components/EventType/EventType";
import SpotRegistration from "../../Components/SpotRegistration/SpotRegistration";
import ParticipantTable from "../../Components/ParticipantTable/ParticipantTable";
import Overview from "../../Components/Overview/Overview";

import * as XLSX from "xlsx";

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

    setShowParticipants({data:participantsForEvent,name:eventId});
  };

  const pieData = Object.values(
    tableData.reduce((acc, curr) => {
      // Filter registrations for 'paid' status
      const hasPaidRegistration = curr.registrations.some(
        (reg) => reg.payment_status === "paid"
      );

      if (hasPaidRegistration) {
        const college = curr.college;
        if (acc[college]) {
          acc[college].value += 1;
        } else {
          acc[college] = { name: college, value: 1 };
        }
      }

      return acc;
    }, {})
  );

  useEffect(() => {}, [showParticipants]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const downloadXl = (jsonData, xlname) => {
    const worksheet = XLSX.utils.json_to_sheet(jsonData);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

    XLSX.writeFile(workbook, `${xlname}.xlsx`);
  };

  const exportToExcel = (eventdata, name) => {
    // Prepare data for Excel
    const excelEvents = eventdata.map((event) => ({
      "Event Name": event.eventName,
      "Event Sub Name": event.eventSubName,
      "Student Coordinator": event.studentCoordinator,
      "Coordinator Contact": event.studentCoordinatorContact,
      Registrations: eventRegistrationCounts[event._id] || 0,
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelEvents);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Events");

    // Generate Excel file
    XLSX.writeFile(workbook, name + ".xlsx");
  };

  const viewCollegeRegs =(college)=>{
   
    const participantsForCollege = tableData.filter(
      (participant) =>
        participant.college === college &&
        participant.registrations.some(
          (reg) => reg.payment_status === "paid"
        )
    );
    setShowParticipants({data:participantsForCollege,name:college})
    
  }

  return (
    <div className="admin">
      <Dashboard />
      <div className="admin-view">
        {currentView === "overview" && (
          <Overview partData={tableData} collegecount={pieData} />
        )}

        {currentView === "all" && (
          <>
            <div className="btn-container">
              <p>All Participants</p>
              <i
                onClick={() =>
                  downloadXl(successfulParticipants, "participants_list")
                }
                className="fa-solid fa-download fa-xl"
              ></i>
            </div>
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
                    <td className="td-center">{row.registrations.length}</td>
                    <td className="td-center">
                      <button
                        onClick={() => handleEventTable(row.registrations)}
                      >
                        View Events
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </DataTable>
          </>
        )}

        {currentView === "events" && (
          <>
            <div className="btn-container">
              <p>All Events</p>
              <i
                onClick={() => exportToExcel(eventsData, "event-details")}
                className="fa-solid fa-download fa-xl"
              ></i>
            </div>
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
                    <td className="td-center">
                      {event.studentCoordinatorContact}
                    </td>
                    <td className="td-center">
                      {eventRegistrationCounts[event._id] || 0}
                    </td>
                    <td className="td-center">
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
          </>
        )}

        {currentView === "college" && (
          <>
            <div className="btn-container">
              <p>College List</p>
              <i
                onClick={() => downloadXl(pieData, "college_list")}
                className="fa-solid fa-download fa-xl"
              ></i>
            </div>
            <DataTable className="display">
              <thead>
                <tr>
                  <th>College</th>
                  <th>Number of Registrations</th>
                  <th>View Participants Details</th>
                </tr>
              </thead>
              <tbody>
                {pieData.map((college) => (
                  <tr>
                    <td>{college.name}</td>
                    <td className="td-center">{college.value}</td>

                    <td className="td-center">
                      <button onClick={()=>viewCollegeRegs(college.name)}>
                        &nbsp;
                        <i className="fa-solid fa-circle-info"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </DataTable>
          </>
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

        {currentView === "spot" && <SpotRegistration />}

        {showParticipants && (
          <div className="event-table">
            <ParticipantTable
              pdata={showParticipants.data}
              partStatus={handleShowParticipants}
              name={showParticipants.name}
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
