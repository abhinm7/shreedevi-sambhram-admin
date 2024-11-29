    import React from "react";
    import "./EventType.css";

    import DataTable from "datatables.net-react";
    import DT from "datatables.net-dt";
    DataTable.use(DT);

    const EventType = ({ data, getParticipants, eventRegistrationCounts, eventype }) => {
     
       
        const filterEvents = data.filter((event) => event.eventType === eventype);
        console.log(filterEvents,eventype);
        console.log(data);
        
       
    return (
        <>
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
                    <td>{event.studentCoordinatorContact}</td>
                    <td>{eventRegistrationCounts[event._id] || 0}</td>
                    <td>
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
