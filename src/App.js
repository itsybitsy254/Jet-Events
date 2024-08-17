import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/shared/Navbar';
import Home from './components/shared/Home';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminPasswordPrompt from './components/admin/AdminPasswordPrompt';
import Login from './components/user/Login';
import EventsList from './components/user/EventsList';
import EventDetails from './components/user/EventDetails';
import BuyTickets from './components/user/BuyTickets';
import Profile from './components/user/Profile';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setIsAdminLoggedIn(false); // Log out from admin as well
  };

  const handleAdminLogin = () => {
    setIsAdminLoggedIn(true);
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
  };

  return (
    <Router>
      <div>
        <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} currentUser={currentUser} />
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />
          <Route path="/events" element={<EventsList />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/buy/:id" element={<BuyTickets currentUser={currentUser} />} />
          <Route path="/profile" element={isLoggedIn ? <Profile currentUser={currentUser} handleLogout={handleLogout} /> : <Navigate to="/login" />} />

          {/* Admin Routes */}
          <Route path="/admin" element={isAdminLoggedIn ? <AdminDashboard onLogout={handleAdminLogout} /> : <Navigate to="/admin-login" />} />
          <Route path="/admin-login" element={<AdminPasswordPrompt onPasswordSubmit={handleAdminLogin} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
