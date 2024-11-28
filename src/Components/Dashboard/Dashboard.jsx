import {React,useContext} from "react";
import { Storecontext } from "../../Contexts/Storecontext";
import "./Dashboard.css";

const Dashboard = () => {
  
  const { setCurrentView,handleEventTable,handleShowParticipants } = useContext(Storecontext);
  const setView = (curr) =>{
    setCurrentView(curr)
  }

  return (
    <>
      <div className="dashboard" onClick={()=>{handleEventTable();handleShowParticipants()}}>
        <div className="dashboard-card" onClick={()=>setView('overview')}>Overview</div>
        <div className="dashboard-card" onClick={()=>setView('all')}>Registered Participants</div>
        <div className="dashboard-card" onClick={()=>setView('events')}>All Events</div>
      </div>
    </>
  );
};

export default Dashboard;
