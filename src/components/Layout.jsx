import React, { useContext } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function Layout() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
    navigate('/login');
  };

  return (
    <div className="app-layout">
      <aside className="app-sidebar sidebar">
        <div className="sidebar-logo">
          <h2>Pawnshop</h2>
          <p>Network Manager</p>
        </div>
        <nav>
          <ul className="sidebar-nav">
            <li>
              <NavLink
                to="/users"
                className={({ isActive }) => (isActive ? 'sidebar-link active' : 'sidebar-link')}
              >
                <span className="sidebar-icon">👥</span>
                Users
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/catalog"
                className={({ isActive }) => (isActive ? 'sidebar-link active' : 'sidebar-link')}
              >
                <span className="sidebar-icon">📦</span>
                Catalog
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/estimates"
                className={({ isActive }) => (isActive ? 'sidebar-link active' : 'sidebar-link')}
              >
                <span className="sidebar-icon">💰</span>
                Estimates
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/operations"
                className={({ isActive }) => (isActive ? 'sidebar-link active' : 'sidebar-link')}
              >
                <span className="sidebar-icon">📋</span>
                Operations
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      <div className="app-content">
        <header className="app-header">
          <h1 className="app-title">Dashboard</h1>
          <div className="app-user">
            <div className="app-user-info">
              <div className="app-user-name">{user?.username || 'User'}</div>
              <div className="app-user-role">Administrator</div>
            </div>
            <a href="/login" onClick={handleLogout} className="app-logout">
              Logout
            </a>
          </div>
        </header>

        <main className="app-main">
          <Outlet />
        </main>

        <footer className="footer">
          <p>&copy; 2024 Pawnshop Network. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
