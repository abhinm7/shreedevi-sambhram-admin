import React from "react";
import "./EventType.css";
import * as XLSX from "xlsx";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
DataTable.use(DT);

const EventType = ({
  data,
  getParticipants,
  eventRegistrationCounts,
  eventype,
}) => {

  const exportXL = (eventdata, name) => {
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
    XLSX.writeFile(workbook, name + "_event_details.xlsx");
  };

  const filterEvents = data.filter((event) => event.eventType === eventype);
  

  return (
    <>
      <div className="btn-container">
        <p>{eventype} events list</p>
        <i
          onClick={() => exportXL(filterEvents,eventype)}
          className="fa-solid fa-download fa-xl"
        ></i>
      </div>
      <div className="event-type">
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
            {filterEvents.map((event) => (
              <tr key={event.event_id}>
                <td>{event.eventName}</td>
                <td>{event.eventSubName}</td>
                <td>{event.studentCoordinator}</td>
                <td className="td-center">{event.studentCoordinatorContact}</td>
                <td className="td-center">
                  {eventRegistrationCounts[event._id] || 0}
                </td>
                <td className="td-center">
                  <button
                    onClick={() => getParticipants(event._id)}
                    className="store-btn"
                  >
                    View participants
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </DataTable>
      </div>
    </>
  );
};

export default EventType;
