import React, { useState, useEffect } from 'react';
import api from '../services/api';

export default function Catalog() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const res = await api.get('/items/');
        setItems(res.data);
      } catch (error) {
        // handle error
      }
      setLoading(false);
    };
    loadItems();
  }, []);

  return (
    <div className="catalog-container">
      <header className="page-header">
        <h2>Product Catalog</h2>
      </header>

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
