import React, { useState, useContext } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function Login() {
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (user) {
    return <Navigate to="/users" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate('/users');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <main className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="login-logo">🏛️</div>
            <h2>Pawnshop Network</h2>
            <p>Enter your credentials to access the system</p>
          </div>
          <div className="login-body">
            {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="username">
                  Username
                </label>
                <input
                  className="form-input"
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="password">
                  Password
                </label>
                <input
                  className="form-input"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button className="btn btn-primary login-btn" type="submit">
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
