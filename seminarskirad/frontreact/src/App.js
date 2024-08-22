import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import { useNavigate, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import { useAuthContext, getToken } from "./context/AuthContext";
import Login from "./components/Login";
import Events from "./components/Events";
import Form from "./components/Form";

function App() {
  const { user, login } = useAuthContext();
  const handleDateClick = (date) => {
    console.log("Clicked on date:", date);
  };

  const [loggedInUser, setLoggedInUser] = useState(null);
  const [events, setEvents] = useState([]);

  const handleLogin = (userResponse) => {
    let userData = userResponse.User;
    userData.token = userResponse.Token;
    setLoggedInUser(userData);

    let sessionData = JSON.stringify(userData);
    window.sessionStorage.setItem("userData", sessionData);
    axios.defaults.headers.common["Authorization"] = `Bearer: ${getToken()}`;
    window.location.href = "/";
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    window.sessionStorage.removeItem("userData");
    axios.defaults.headers.common["Authorization"] = null;
  };

  const handleAddEvent = (newEvent) => {
    setEvents((prevEvents) => {
      const updatedEvents = [...prevEvents, newEvent];
      console.log(updatedEvents);
      return updatedEvents;
    });
  };

  return (
    <Routes>
      <Route
        path="/calendar"
        element={<Calendar onDateClick={handleDateClick} />}
      />

      <Route
        path="/login"
        element={!loggedInUser ? <Login /> : <Navigate to="/" />}
      />
      <Route path="/events" element={<Events events={events} />} />
      <Route path="/form" element={<Form onAddEvent={handleAddEvent} />} />
    </Routes>
  );
}

export default App;
