import React, { useState, useEffect } from 'react';

export default function CreateUserModal({ isOpen, onClose, onUserCreated, roles, stores }) {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    birth_date: '',
    role: '',
    store: '',
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        birth_date: '',
        role: roles.length ? roles[0].id : '',
        store: stores.length ? stores[0].id : '',
      });
    }
  }, [isOpen, roles, stores]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onUserCreated(formData);
    onClose();
  };

  return (
    <div style={{ position: 'relative', zIndex: 10000 }}>
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
          <h2 className="modal-title">Create User</h2>
          <button type="button" className="modal-close" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          <form id="create-user-form" onSubmit={handleSubmit}>
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
            <div className="form-group">
              <label className="form-label" htmlFor="role">
                Role
              </label>
              <select
                className="form-select"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                {roles.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.role}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="store">
                Store
              </label>
              <select
                className="form-select"
                id="store"
                name="store"
                value={formData.store}
                onChange={handleChange}
                required
              >
                {stores.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Create User
              </button>
            </div>
          </form>
        </div>
      </div>
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
