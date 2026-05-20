import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import CreateUserModal from '../components/CreateUserModal';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [usersRes, rolesRes, storesRes] = await Promise.all([
        api.get('/workers/'),
        api.get('/roles/'),
        api.get('/stores/'),
      ]);
      setUsers(usersRes.data);
      setRoles(rolesRes.data);
      setStores(storesRes.data);
    } catch (error) {
      setMessage({ text: 'Failed to load users from server.', type: 'error' });
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const showTemporaryMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 5000);
  };

  const handleCreateUser = async (userData) => {
    try {
      const res = await api.post('/workers/', userData);
      if (res.status === 201 || res.status === 200) {
        showTemporaryMessage('User created successfully!', 'success');
        await loadData();
      } else {
        showTemporaryMessage('Failed to create user. Please check your data.', 'error');
      }
    } catch (error) {
      // Extract a clean message or use a generic one if it's an HTML dump
      let msg = 'Error creating user.';
      if (error.response?.data && typeof error.response.data === 'object') {
        msg = JSON.stringify(error.response.data);
      } else if (error.response?.status === 500) {
        msg = 'Server Error (Integrity Error). Likely duplicate Email or Phone.';
      }
      showTemporaryMessage(msg, 'error');
    }
  };

  const handleDeleteUser = async (id) => {
    // eslint-disable-next-line no-alert
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      const res = await api.delete(`/workers/${id}/`);
      if (res.status === 204 || res.status === 200) {
        showTemporaryMessage('User deleted successfully!', 'success');
        await loadData();
      } else {
        showTemporaryMessage('Failed to delete user.', 'error');
      }
    } catch (error) {
      showTemporaryMessage('Error deleting user.', 'error');
    }
  };

  const roleMap = Object.fromEntries(roles.map((r) => [r.id, r.role]));

  return (
    <>
      <div className="page-actions">
        <h2>User List</h2>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setIsCreateModalOpen(true)}
        >
          + Create User
        </button>
      </div>

      {message.text && (
        <div
          className={`notification ${message.type}`}
          style={{
            padding: '15px',
            marginBottom: '20px',
            borderRadius: '4px',
            backgroundColor: message.type === 'success' ? '#d4edda' : '#f8d7da',
            color: message.type === 'success' ? '#155724' : '#721c24',
            border: `1px solid ${message.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`,
            wordBreak: 'break-all',
          }}
        >
          {message.text}
        </div>
      )}

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Role</th>
              <th>Status</th>
              <th>Birth Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center' }}>
                  Loading...
                </td>
              </tr>
            ) : users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{`${user.first_name} ${user.last_name}`}</td>
                  <td>
                    <span
                      className={`badge ${
                        roleMap[user.role] === 'Admin' ? 'badge-admin' : 'badge-regular'
                      }`}
                    >
                      {roleMap[user.role] || 'Worker'}
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-active">Active</span>
                  </td>
                  <td>{user.birth_date}</td>
                  <td>
                    <div className="table-actions">
                      <Link className="btn btn-small btn-secondary" to={`/user-profile/${user.id}`}>
                        View
                      </Link>
                      <button
                        type="button"
                        className="btn btn-small btn-danger"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center' }}>
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <CreateUserModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onUserCreated={handleCreateUser}
        roles={roles}
        stores={stores}
      />
    </>
  );
}
