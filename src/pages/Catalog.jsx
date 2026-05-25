import React, { useState, useEffect } from 'react';
import api from '../services/api';

export default function Catalog() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '' });

  const loadItems = async () => {
    try {
      const res = await api.get('/items/');
      setItems(res.data);
    } catch (error) {
      // handle error
    }
    setLoading(false);
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/items/', formData);
      setFormData({ name: '', description: '' });
      setShowForm(false);
      await loadItems();
    } catch (error) {
      // handle error
    }
  };

  return (
    <div className="catalog-container">
      <header className="page-header">
        <h2>Product Catalog</h2>
        <button type="button" className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add Item'}
        </button>
      </header>

      {showForm && (
        <div className="card" style={{ marginBottom: '20px', padding: '20px' }}>
          <h3>New Item</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="item-name">Name</label>
              <input
                className="form-input"
                type="text"
                id="item-name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="item-desc">Description</label>
              <textarea
                className="form-textarea"
                id="item-desc"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-success">Add Item</button>
          </form>
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>Loading catalog...</div>
      ) : (
        <div className="items-grid">
          {items.length > 0 ? (
            items.map((item) => (
              <div className="item-card" key={item.id}>
                <div className="item-image">📦</div>
                <div className="item-content">
                  <div className="item-header">
                    <h3>{item.name}</h3>
                    <span className="badge badge-active">In Stock</span>
                  </div>
                  <p className="item-description">
                    {item.description || 'No description available'}
                  </p>
                  <div className="item-footer">
                    <span className="item-price">ID: {item.id}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ gridColumn: '1/-1', textAlign: 'center' }}>No items found</div>
          )}
        </div>
      )}
    </div>
  );
}
