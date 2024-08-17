import React from "react";
import { Link } from "react-router-dom";
import '../../App.css';

function Navbar({ isLoggedIn, handleLogout, currentUser }) {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">Jet Events</Link>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/events">Events</Link></li>
        <li><Link to="/admin">Admin</Link></li>
        {isLoggedIn ? (
          <>
            <li><Link to="/profile">{currentUser?.username || 'Profile'}</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <li><Link to="/login">Login</Link></li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
