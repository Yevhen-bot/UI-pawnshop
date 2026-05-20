import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import EditUserModal from '../components/EditUserModal';

export default function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/workers/${id}/`);
      setUser(res.data);
    } catch (error) {
      navigate('/users');
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, navigate]);

  const handleUpdateUser = async (updatedData) => {
    try {
      await api.put(`/workers/${id}/`, updatedData);
      await loadData();
    } catch (error) {
      // error handling
    }
  };

  if (loading) {
    return <div>Loading user profile...</div>;
  }

  if (!user) {
    return <div>User not found.</div>;
  }

  return (
    <>
      <div className="profile-back">
        <Link className="btn btn-small btn-secondary" to="/users">
          ← Back to Users
        </Link>
      </div>

      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {user.first_name[0]}
            {user.last_name[0]}
          </div>
          <div className="profile-info">
            <h2>{`${user.first_name} ${user.last_name}`}</h2>
            <span className="badge badge-active">Active</span>
          </div>
        </div>
        <div className="profile-details">
          <div className="profile-detail">
            <div className="detail-label">Worker ID</div>
            <div className="detail-value">{user.id}</div>
          </div>
          <div className="profile-detail">
            <div className="detail-label">Email</div>
            <div className="detail-value">{user.email}</div>
          </div>
          <div className="profile-detail">
            <div className="detail-label">Phone</div>
            <div className="detail-value">{user.phone_number}</div>
          </div>
          <div className="profile-detail">
            <div className="detail-label">Birth Date</div>
            <div className="detail-value">{user.birth_date}</div>
          </div>
        </div>
      </div>

      <button type="button" className="btn btn-primary" onClick={() => setIsEditModalOpen(true)}>
        Edit User
      </button>

      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onUserUpdated={handleUpdateUser}
        user={user}
      />
    </>
  );
}
