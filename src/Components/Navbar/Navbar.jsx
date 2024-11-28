import { React, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Storecontext } from "../../Contexts/Storecontext";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { token } = useContext(Storecontext);
  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <div className="navbar">
        <div className="logo">
          <img src="/sambhram_logo.png" alt="" />
          <h2>Admin Panel</h2>
        </div>
        <div className="nav-right">
          {token && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="30"
              height="30"
              fill="white"
              onClick={handleSignOut}
            >
              <path d="M10 2H4C2.895 2 2 2.895 2 4v16c0 1.105.895 2 2 2h6v-2H4V4h6V2zM20.707 11.293l-4-4-1.414 1.414L17.586 11H9v2h8.586l-2.293 2.293 1.414 1.414 4-4a1 1 0 0 0 0-1.414z" />
            </svg>
          )}    
        </div>
      </div>
    </>
  );
};

export default Navbar;
