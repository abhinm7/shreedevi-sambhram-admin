import React, { useContext, useState } from "react";
import { Storecontext } from "../../Contexts/Storecontext";
import "./Dashboard.css";

const Dashboard = () => {
  const [activeView, setActiveView] = useState("overview");

  const { setCurrentView, handleEventTable, handleShowParticipants } =
    useContext(Storecontext);

  const setView = (curr) => {
    setCurrentView(curr);
    setActiveView(curr);
  };

  return (
    <>
      <div
        className="dashboard"
        onClick={() => {
          handleEventTable();
          handleShowParticipants();
        }}
      >
        <div
          className={`dashboard-card ${
            activeView === "overview" ? "active" : ""
          }`}
          onClick={() => setView("overview")}
        >
          Overview
        </div>
        <div
            className={`dashboard-card ${
              activeView === "college" ? "active" : ""
            }`}
            onClick={() => setView("college")}
          >
            College list
          </div>
        <div
          className={`dashboard-card ${activeView === "all" ? "active" : ""}`}
          onClick={() => setView("all")}
        >
          Registered Participants
        </div>
        <div
          className={`dashboard-card ${
            activeView === "events" ? "active" : ""
          }`}
          onClick={() => setView("events")}
        >
          All Events
        </div>
        <div
          className={`dashboard-card ${
            activeView === "Technical" ? "active" : ""
          }`}
          onClick={() => setView("Technical")}
        >
          Technical Events
        </div>
        <div
          className={`dashboard-card ${
            activeView === "Cultural" ? "active" : ""
          }`}
          onClick={() => setView("Cultural")}
        >
          Cultural Events
        </div>
        <div
          className={`dashboard-card ${
            activeView === "Special" ? "active" : ""
          }`}
          onClick={() => setView("Special")}
        >
          Special Events
        </div>

        <div
          className={`dashboard-card ${activeView === "spot" ? "active" : ""}`}
          onClick={() => setView("spot")}
        >
          Spot Registration
        </div>
      </div>
    </>
  );
};

export default Dashboard;
