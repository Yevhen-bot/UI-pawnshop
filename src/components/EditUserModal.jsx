import React, { useState, useEffect } from 'react';

export default function EditUserModal({ isOpen, onClose, onUserUpdated, user }) {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    birth_date: '',
    role: 1,
    store: 1,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        phone_number: user.phone_number || '',
        birth_date: user.birth_date || '',
        role: user.role || 1,
        store: user.store || 1,
      });
    }
  }, [user]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onUserUpdated(formData);
    onClose();
  };

  return (
    <div style={{ position: 'relative', zIndex: 10000 }}>
      {/* Direct style overrides to ensure visibility regardless of CSS target rules */}
      <div
        className="modal"
        style={{
          display: 'block',
          opacity: 1,
          visibility: 'visible',
          pointerEvents: 'auto',
        }}
      >
        <div className="modal-header">
          <h2 className="modal-title">Edit User</h2>
          <button type="button" className="modal-close" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <form id="edit-user-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="first_name">
                First Name
              </label>
              <input
                className="form-input"
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="last_name">
                Last Name
              </label>
              <input
                className="form-input"
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                className="form-input"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="phone_number">
                Phone
              </label>
              <input
                className="form-input"
                type="text"
                id="phone_number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="birth_date">
                Birth Date
              </label>
              <input
                className="form-input"
                type="date"
                id="birth_date"
                name="birth_date"
                value={formData.birth_date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <div
        className="modal-overlay"
        style={{
          display: 'block',
          opacity: 1,
          visibility: 'visible',
          pointerEvents: 'auto',
        }}
        onClick={onClose}
      />
    </div>
  );
}
