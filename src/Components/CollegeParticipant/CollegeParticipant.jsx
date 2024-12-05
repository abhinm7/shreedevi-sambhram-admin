import React from 'react'
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
DataTable.use(DT);

import './CollegeParticipant.css'

const CollegeParticipant = ({data}) => {
  return (
    <>
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
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.name}</td>
              <td>{row.phone}</td>
              <td>{row.usn}</td>
              <td>{row.college}</td>
            </tr> 
          ))}
        </tbody>
      </DataTable>
    </>
  )
}

export default CollegeParticipant
