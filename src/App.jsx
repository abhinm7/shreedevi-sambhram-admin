import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login/Login";
import AdminPage from "./Pages/AdminPage/AdminPage";
import Navbar from "./Components/Navbar/Navbar.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContextProvider } from "./Contexts/Storecontext";


function App() {
  return (
    <>
      <ContextProvider>
        <Navbar/>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </ContextProvider>
    </>
  );
}

export default App;
