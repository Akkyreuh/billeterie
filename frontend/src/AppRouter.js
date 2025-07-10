import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Events from './pages/Events';
import Booking from './pages/Booking';

function AppRouter() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleLogin = (jwt, userObj) => {
    setToken(jwt);
    setUser(userObj);
  };


  const handleLogout = () => {
    setToken(null);
    setUser(null);
    setSelectedEvent(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/events"
          element={user ? <Events onSelectEvent={setSelectedEvent} /> : <Navigate to="/login" />}
        />
        <Route
          path="/booking"
          element={user && selectedEvent ? (
            <Booking event={selectedEvent} user={user} token={token} />
          ) : (
            <Navigate to="/events" />
          )}
        />
        <Route path="*" element={<Navigate to={user ? "/events" : "/login"} />} />
      </Routes>
      {user && (
        <div className="navbar">
          <span>Connecté en tant que {user.email}</span>
          <button onClick={handleLogout}>Déconnexion</button>
        </div>
      )}
    </Router>
  );
}

export default AppRouter;
