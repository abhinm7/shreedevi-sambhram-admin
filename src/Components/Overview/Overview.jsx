import { React, useContext } from "react";
import { PieChart, Pie, Tooltip } from "recharts";
import { Storecontext } from "../../Contexts/Storecontext";

import "./Overview.css";

const Overview = ({ partData,collegecount }) => {
  const { successfulParticipants, NonsuccessfulParticipants,eventsData } =
    useContext(Storecontext);

  const totalSuccessfulRegistrations = partData.reduce((total, participant) => {
    const successfulRegs = participant.registrations.filter(
      (registration) => registration.payment_status === "paid"
    );
    return total + successfulRegs.length;
  }, 0);

  const totalfailedfulRegistrations = partData.reduce((total, participant) => {
    const successfulRegs = participant.registrations.filter(
      (registration) => registration.payment_status === "failed"
    );
    return total + successfulRegs.length;
  }, 0);



  const pieDataEvent = partData
  .flatMap(participant => 
    participant.registrations
      .filter(registration => registration.payment_status === "paid")  // Only successful registrations
      .map(registration => registration.event_id) // Get the event_id
  )
  .reduce((acc, eventId) => {
    // Group and count by event_id
    acc[eventId] = (acc[eventId] || 0) + 1;
    return acc;
  }, {});

  

// Convert to pieData format for PieChart with event name instead of _id
const chartData = Object.keys(pieDataEvent).map(eventId => {
  // Find the corresponding event name from eventsData using _id
  const event = eventsData.find(event => event._id === eventId);
  return {
    name: event ? event.eventName : eventId,  
    value: pieDataEvent[eventId],  // count of successful registrations
  };
});

  return (
    <>
      <div className="overview">
        <div className="overview-up">
          <div className="pie-chart">
            <PieChart width={300} height={300}>
              <Pie
                data={collegecount}
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
          <div className="pie-chart">
            <PieChart width={300} height={300}>
              <Pie
                data={chartData}
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
          

        </div>
        <div className="overview-down">
          <div className="total-registration">
            <h1>Succesfull Participants</h1>
            <p>{successfulParticipants.length}</p>
          </div>
          <div className="total-registration">
            <h1>Total Participants</h1>
            <p>{partData.length}</p>
          </div>
          <div className="total-registration">
            <h1>Total Colleges</h1>
            <p>{collegecount.length}</p>
          </div>
        </div>
      
        <div className="overview-down">

          <div className="total-registration">
            <h1>Successfull Registrations</h1>
            <p>{totalSuccessfulRegistrations}</p>
          </div>
          <div className="total-registration">
            <h1>Failed Registrations</h1>
            <p>{totalfailedfulRegistrations}</p>
          </div>

          <div className="total-registration">
            <h1>Failed Participants</h1>
            <p>{NonsuccessfulParticipants.length}</p>
          </div>
        </div>

        {/* <div className="overview-down">
          <div className="total-registration">
            <h1>Events Registered</h1>
            <p>{uniqueEvents.length}</p>
          </div>
           <div className="total-registration">
            <h1>Total Registrations</h1>
            <p>{totalRegistrations}</p>
          </div>
        </div> */}
        <div className="mobile-warning">
          <p>Please switch to pc for accessing all details</p>
        </div>
      </div>
    </>
  );
};

export default Overview;
