import './ParticipantTable.css'

import React from 'react'
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
DataTable.use(DT);

const ParticipantTable = ({pdata,partStatus}) => {
 
    
  return (
    <div>
      <div className="event-table">
      <div className="header">
        <button className="close" onClick={partStatus}>
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
            <th>Name</th>
            <th>Phone</th>
            <th>USN</th>
            <th>College</th>
          </tr>
        </thead>
        <tbody>
          {pdata.map((row, index) => (
            <tr key={index}>
              <td>{row.name}</td>
              <td>{row.phone}</td>
              <td>{row.usn}</td>
              <td>{row.college}</td>
            </tr> 
          ))}
        </tbody>
      </DataTable>
    </div>
    </div>
  )
}

export default ParticipantTable
