import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPasswordPrompt.css'; // Import the CSS file

function AdminPasswordPrompt({ onPasswordSubmit }) {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const correctPassword = 'admin';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      onPasswordSubmit(); // This should set isAdminLoggedIn to true
      console.log('Password correct, updating admin login state.');
      navigate('/admin'); // Navigate to the Admin Dashboard
    } else {
      alert('Incorrect password. Please try again.');
    }
  };

  return (
    <div className="admin-password-prompt">
      <h1>Admin Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter admin password"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AdminPasswordPrompt;
