import React from "react";
import { PieChart, Pie, Tooltip } from "recharts";

import "./Overview.css";

const Overview = ({ partData }) => {

  const pieData = Object.values(
    partData.reduce((acc, curr) => {
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

  const successfulParticipants = partData.filter((participant) =>
    participant.registrations.some(
      (reg) => reg.payment_status === "paid"
    )
  );
  
  return (
    <>
      <div className="overview">
        <div className="pie-chart">
          <PieChart width={300} height={300}>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d9"
              label
            />
            <Tooltip />
          </PieChart>
        </div>

        <div className="overview-view">
          <div className="total-registration">
            <h1>Total Registrations</h1>
            <p>{successfulParticipants.length}</p>
          </div>
        </div>
        <div className="mobile-warning">
          <p>Please switch to pc for accessing all details</p>
        </div>
      </div>
    </>
  );
};

export default Overview;
