import React, { useState, useEffect } from 'react';
import api from '../services/api';

export default function Estimates() {
  const [estimates, setEstimates] = useState([]);
  const [itemMap, setItemMap] = useState({});
  const [workerMap, setWorkerMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    item: '',
    worker: '',
    date: '',
    cost: '',
    reasoning: '',
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const [estRes, itemsRes, workersRes] = await Promise.all([
        api.get('/estimates/'),
        api.get('/items/'),
        api.get('/workers/'),
      ]);

      setEstimates(estRes.data);
      setItemMap(Object.fromEntries(itemsRes.data.map((i) => [i.id, i.name])));
      setWorkerMap(
        Object.fromEntries(workersRes.data.map((w) => [w.id, `${w.first_name} ${w.last_name}`])),
      );
    } catch (error) {
      throw new Error('Failed to load data');
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        item: parseInt(formData.item, 10),
        worker: parseInt(formData.worker, 10),
        cost: parseFloat(formData.cost),
      };
      await api.post('/estimates/', payload);
      setFormData({
        item: '',
        worker: '',
        date: '',
        cost: '',
        reasoning: '',
      });
      await loadData();
    } catch (error) {
      throw new Error('Failed to submit estimate');
    }
  };

  return (
    <div className="estimates-container">
      <div className="estimate-form-card">
        <h2>New Item Estimate</h2>
        <form id="new-estimate-form" onSubmit={handleSubmit}>
          <div className="estimate-form-grid">
            <div className="form-group">
              <label className="form-label" htmlFor="item-id">
                Item ID
              </label>
              <input
                className="form-input"
                type="number"
                id="item-id"
                name="item"
                value={formData.item}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="worker-id">
                Worker ID
              </label>
              <input
                className="form-input"
                type="number"
                id="worker-id"
                name="worker"
                value={formData.worker}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="estimate-date">
                Date
              </label>
              <input
                className="form-input"
                type="date"
                id="estimate-date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="estimate-cost">
                Price
              </label>
              <input
                className="form-input"
                type="number"
                id="estimate-cost"
                name="cost"
                value={formData.cost}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="form-label" htmlFor="estimate-reasoning">
                Reasoning
              </label>
              <textarea
                className="form-textarea"
                id="estimate-reasoning"
                name="reasoning"
                value={formData.reasoning}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="estimate-form-actions">
            <button className="btn btn-primary" type="submit">
              Submit Estimate
            </button>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={() =>
                setFormData({
                  item: '',
                  worker: '',
                  date: '',
                  cost: '',
                  reasoning: '',
                })
              }
            >
              Clear
            </button>
          </div>
        </form>
      </div>

      <div className="pending-section">
        <h2>Estimates</h2>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Worker</th>
                <th>Reasoning</th>
                <th>Date</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center' }}>
                    Loading...
                  </td>
                </tr>
              ) : estimates.length > 0 ? (
                estimates.map((est) => (
                  <tr key={est.id}>
                    <td>{itemMap[est.item] || `Item #${est.item}`}</td>
                    <td>{workerMap[est.worker] || `Worker #${est.worker}`}</td>
                    <td>{est.reasoning || '-'}</td>
                    <td>{est.date}</td>
                    <td>{`$${est.cost}`}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center' }}>
                    No estimates found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
