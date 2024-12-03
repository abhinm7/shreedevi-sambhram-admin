import React from "react";
import "./SpotRegistration.css";
import { useState, useContext } from "react";
import axios from "axios";
import { Storecontext } from "../../Contexts/Storecontext";
import { toast } from "react-toastify";

import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";

DataTable.use(DT);

const SpotRegistration = () => {
  const collegeNames = [
    "ACS College of Engineering, Bangalore",
    "A J Institute of Engineering and Technology, Mangalore",
    "Alva's Institute of Engineering and Technology, Moodbidri",
    "Bearys Institute of Technology, Mangalore",
    "B L D E A's V P Dr P G Halakatti College of Engineering and Technology, Bijapur",
    "BMS Institute of Technology and Management, Bangalore",
    "Cambridge Institute of Technology, Bangalore",
    "Canara Engineering College (CE), Mangalore",
    "City College, Mangalore",
    "Dayananda Sagar College of Engineering, Bangalore",
    "Dr Ambedkar Institute of Technology",
    "Dr M V Shetty Institute of Technology",
    "Dr Sri Sri Sri Shivakumara Mahaswamy College of Engineering",
    "Dr T M A Pai Polytechnic (TMAP Polytechnic), Manipal",
    "East West Institute of Technology, Bangalore",
    "Ghousia College of Engineering, Ramanagaram",
    "Global Academy of Technology, Bangalore",
    "Government Polytechnic for Women, Karkala (GPFW, Karkala)",
    "Government Polytechnic, Bajpe (GP, Bajpe)",
    "Government Polytechnic, Bantwal (GP, Bantwal)",
    "Government Polytechnic, Ujire (GP, Ujire)",
    "Government Polytechnic, Udipi (GP, Udipi)",
    "Guru Nanak Dev Engineering College, Bidar",
    "HKBK College of Engineering, Bangalore",
    "Impact Polytechnic, Udupi",
    "Indira Shiva Rao Polytechnic, Udupi",
    "JSS Academy of Technical Education",
    "Jawaharlal Nehru National College of Engineering",
    "K L E Society's College of Engineering and Technology",
    "K L S Gogte Institute of Technology",
    "Karavali Institute of Technology, Mangalore",
    "KVG Engineering College",
    "K V Gowda Polytechnic (KVG Polytechnic), Sullia",
    "K P T, Mangalore",
    "Manglore Marine College and Technology",
    "Mangalore Institute of Technology and Engineering (MITE), Moodbidri",
    "Manipal Institute of Technology (MIT), Manipal",
    "M S Ramaiah Institute of Technology",
    "National Institute of Technology Karnataka (NITK), Surathkal",
    "N A M Institute of Technology, Nitte",
    "N M A M Institute of Technology, Nitte",
    "Nitte Meenakshi Institute of Technology, Bangalore",
    "N R A M Polytechnic, Nitte",
    "Oxford Business School",
    "P A College of Engineering, (PACE)",
    "R L Jalappa Institute of Technology",
    "Rajarajeswari College of Engineering",
    "Rajeev Institute of Technology",
    "Reva Institute of Science and Management",
    "Reva Institute of Technology and Management",
    "RNS Institute of Technology",
    "Rural Engineering College",
    "Sahyadri College of Engineering and Management (SCE)",
    "SBRR Mahajana First Grade College",
    "SDM College of Engineering and Technology (SDMC)",
    "SDM Polytechnic, Ujire",
    "Shri Madhwa Vadiraja Institute of Technology and Management (SMVIT), Bantakal",
    "Shree Devi Institute of Engineering and Technology",
    "Siddaganga Institute of Technology",
    "SJEC - St Joseph Engineering College",
    "SJB Institute of Technology",
    "S N M Polytechnic, Moodbidri",
    "S N S Polytechnic, Bajpe",
    "Sri Dharmasthala Manjunatheshwara Polytechnic (SDMP, Ujire)",
    "Sri Revana Siddeshwara Institute of Technology",
    "Srinivas Institute of Technology (SIT), valachil",
    "Srinivas Institute of Technology (SIT), Mukka",
    "Sri Krishna School of Engineering and Management",
    "Sri Taralabalu Jagadguru Institute of Technology",
    "St Aloysius College, Beeri",
    "St Joseph Engineering College, Vamanjoor",
    "Vemana Institute of Technology",
    "Vivekananda College of Engineering and Technology, Puttur",
    "Vivekananda Polytechnic (VC Polytechnic), Puttur",
    "Yenepoya Institute of Arts, Science and Commerce, Mangalore",
    "Yenepoya Institute of Technology (YIT), Moodbidri",
    "Other",
  ];
  const { eventsData, token } = useContext(Storecontext);
  const [selectedEvent, setSelectedEvent] = useState([]);
  const [viewTable, setViewTable] = useState(false);
  const handleTableView = () => {
    setViewTable(!viewTable);
  };
  const url =
    "https://o83h8nltlc.execute-api.ap-south-1.amazonaws.com/api/admin/Create-participants";

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const Discount =
    selectedEvent.length === 4
      ? 150
      : selectedEvent.length === 3
      ? 80
      : selectedEvent.length === 2
      ? 40
      : 0;

  const addToSelectedEvent = (newEvents) => {
    if (selectedEvent.length < 4) {
      setSelectedEvent((prevEvents) => [
        ...prevEvents,
        ...(Array.isArray(newEvents) ? newEvents : [newEvents]),
      ]);
      toast.success(newEvents.eventName + " Added ");
    } else {
      toast.error("Only 4 Events can added");
    }
  };

  const removeSelectedEvent = (id) => {
    setSelectedEvent((prev) => prev.filter((event) => event._id !== id));
    toast.success("Event removed");
  };

  const [data, setData] = useState({
    name: "",
    usn: "",
    college: "",
    mobile: "",
    Othercollege: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = () => {

    let updatedRegistrations = selectedEvent.map(function (registration) {
      return {
        event_id: registration._id, // Keep only the _id as event_id
        amount: selectedEvent.length * 100 - Discount, // Add amount
        payment_status: "paid", // Add payment status
      };
    });

    let dataToSend = {
      name: data.name,
      usn: data.usn,
      college: data.college === "Other" ? data.Othercollege : data.college,
      phone: data.mobile,
      registrations: updatedRegistrations,
    };
    

    axios
      .post(url, dataToSend, { headers })
      .then((response) => {
        console.log("Response:", response.data);
        if (response.data.success) {
          toast.success("Registered Succesfully");
          setData({
            name: "",
            usn: "",
            college: "",
            mobile: "",
            Othercollege: "",
          });
          setSelectedEvent([])
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error(error.response.data.message)
      });
  };

  return (
    <div className="spot-page">
      <div className="spot-head">
        <h1>SPOT REGISTRATION</h1>
      </div>
      <div className="spot-form">
        <input
          className="form-name"
          type="text"
          placeholder="Enter Your Name"
          name="name"
          onChange={onChangeHandler}
          value={data.name}
          required
        />
        <div className="spot-form-inputs">
          <input
            type="number"
            placeholder="Enter Your Mobile Number"
            name="mobile"
            onChange={onChangeHandler}
            value={data.mobile}
            required
          />
          <input
            type="text"
            placeholder="Enter USN"
            name="usn"
            onChange={onChangeHandler}
            value={data.usn}
            required
          />
        </div>

        <div className="spot-form-inputs">
          <select
            name="college"
            onChange={onChangeHandler}
            value={data.college}
            required
          >
            <option value="" disabled>
              Select College
            </option>
            {collegeNames.map((college, index) => (
              <option key={index} value={college}>
                {college}
              </option>
            ))}
          </select>
          {data.college == "Other" ? (
            <input
              type="text"
              placeholder="Enter College Name"
              name="Othercollege"
              onChange={onChangeHandler}
              value={data.Othercollege}
              required
            />
          ) : (
            <></>
          )}
        </div>
        <div className="selected-events">
          <div className="selected-event-container">
            <h1>SELECTED EVENTS</h1>

            {selectedEvent.map((event, index) => (
              <div key={event._id || index} className="selected-event">
                <p>{event.eventName}</p>
                <i
                  className="fa-solid fa-xmark"
                  onClick={() => removeSelectedEvent(event._id)}
                ></i>
              </div>
            ))}
            {selectedEvent.length < 4 && (
              <button className="add-event-btn" onClick={handleTableView}>
                <i className="fa-solid fa-plus"></i> Add Events
              </button>
            )}
          </div>
          <div className="selected-event-price">
            <div className="selected-price">
              <p>AMOUNT</p>
              <div className="price-div">
                <p>Total</p> <p>{selectedEvent.length * 100}</p>
              </div>
              <div className="price-div">
                <p>Pass Discount</p> <p>{Discount}</p>
              </div>
              <div className="price-div">
                <p>Grand Total</p>{" "}
                <p>{selectedEvent.length * 100 - Discount}</p>
              </div>
              <div className="lines"></div>
              <div className="price-div-final">
                <p>Grand Total</p>{" "}
                <p>{selectedEvent.length * 100 - Discount}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="button-sect">
          <button className="event-register-btn" onClick={handleSubmit}>
            Register
          </button>
        </div>
      </div>

      {viewTable && (
        <div className="event-select">
          <div className="event-select-head">
            <p></p>
            <h1>SELECT EVENT</h1>
            <p>
              <i onClick={handleTableView} className="fa-solid fa-xmark"></i>
            </p>
          </div>
          <DataTable className="display">
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Event Sub Name</th>
                <th>Add event</th>
              </tr>
            </thead>
            <tbody>
              {eventsData.map((event, index) => (
                <tr key={index}>
                  <td>{event.eventName}</td>
                  <td>{event.eventSubName}</td>
                  <td>
                    {selectedEvent.some(
                      (selected) => selected._id === event._id
                    ) ? (
                      <i
                        onClick={() => removeSelectedEvent(event._id)}
                        className="fa-solid fa-xmark"
                      ></i>
                    ) : (
                      <i
                        onClick={() => addToSelectedEvent(event)}
                        className="fa-solid fa-plus"
                      ></i>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </DataTable>
        </div>
      )}
    </div>
  );
};

export default SpotRegistration;
