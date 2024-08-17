import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://jet-events-db.onrender.com/users?email=${encodeURIComponent(email)}`);
      const users = await response.json();

      const user = users.find(user => user.password === password);
      if (user) {
        onLogin(user);
        navigate('/profile');
      } else {
        setError('Invalid email or password.');
      }
    } catch (error) {
      setError('An error occurred.');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://jet-events-db.onrender.com/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        setError(null);
        setIsRegistering(false); // Switch to login form
        alert('Registration successful! Please log in.');
      } else {
        const errorText = await response.text();
        setError(`Registration failed: ${errorText}`);
      }
    } catch (error) {
      setError('An error occurred.');
    }
  };

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
    setEmail('');
    setPassword('');
    setName('');
    setError(null);
  };

  return (
    <div className="auth-container">
      {isRegistering ? (
        <>
          <h1>Register</h1>
          <form onSubmit={handleRegisterSubmit}>
            <label>
              Name:
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </label>
            <label>
              Email:
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>
            <label>
              Password:
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </label>
            <button type="submit">Register</button>
          </form>
          <button onClick={toggleForm}>Already have an account? Login</button>
          {error && <p>{error}</p>}
        </>
      ) : (
        <>
          <h1>Login</h1>
          <form onSubmit={handleLoginSubmit}>
            <label>
              Email:
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>
            <label>
              Password:
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </label>
            <button type="submit">Login</button>
          </form>
          <button onClick={toggleForm}>Don't have an account? Register</button>
          {error && <p>{error}</p>}
        </>
      )}
    </div>
  );
};

export default Login;
