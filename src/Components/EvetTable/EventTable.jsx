import "./EventTable.css";

import React, { useEffect, useState } from "react";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import axios from "axios";
DataTable.use(DT);

const EventTable = ({ data, EventStatus }) => {
  const [eventMappings, setEventMappings] = useState({}); // To store event ID to event name mappings
  const url = import.meta.env.VITE_API_URL; 

  useEffect(() => {
    // Fetch events and map IDs to names
    const fetchEvents = async () => {
      try {
        const res = await axios.get(
        `${url}/api/v1/auth/events`
        );
        const events = res.data;
        const mappings = events.reduce((acc, event) => {
          acc[event._id] = event.eventName; // Map event_id to event name
          return acc;
        }, {});
        setEventMappings(mappings);
      } catch (error) {
        console.error("Error fetching event mappings:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="event-table">
      <div className="header">
        <button className="close" onClick={() => EventStatus(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xml:space="preserve"
            id="close"
            width="30px"
            height="30px"
            x="0"
            y="0"
            version="1.1"
            viewBox="0 0 512 512"
          >
            <path d="M437.5 386.6L306.9 256l130.6-130.6c14.1-14.1 14.1-36.8 0-50.9-14.1-14.1-36.8-14.1-50.9 0L256 205.1 125.4 74.5c-14.1-14.1-36.8-14.1-50.9 0-14.1 14.1-14.1 36.8 0 50.9L205.1 256 74.5 386.6c-14.1 14.1-14.1 36.8 0 50.9 14.1 14.1 36.8 14.1 50.9 0L256 306.9l130.6 130.6c14.1 14.1 36.8 14.1 50.9 0 14-14.1 14-36.9 0-50.9z"></path>
          </svg>
        </button>
      </div>
      
      <DataTable className="display">
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Order ID</th>
            <th>Payment Status</th>
            <th>Amount</th>
            <th>Registration Date</th>
            <th>Ticket</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{eventMappings[row.event_id] || "Unknown Event"}</td>{" "}
              {/* Map event ID to name */}
              <td>{row.order_id}</td>
              <td>{row.payment_status}</td>
              <td>{row.amount}</td>
              <td>{new Date(row.registration_date).toLocaleString()}</td>
              <td>
                <a
                  href={row.ticket_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Ticket
                </a>
              </td>
            </tr> 
          ))}
        </tbody>
      </DataTable>
    </div>
  );
};

export default EventTable;
