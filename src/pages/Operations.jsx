import React, { useState, useEffect, useMemo } from 'react';
import api from '../services/api';

export default function Operations() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const limit = 20;

  const [relationalData, setRelationalData] = useState({
    ops: {},
    clients: {},
    items: {},
    stores: {},
  });

  const loadRelationalData = async () => {
    try {
      // We append limit=2000 to bypass the pagination for reference data
      const [opRes, clientsRes, itemsRes, storesRes] = await Promise.all([
        api.get('/operations/?limit=2000'),
        api.get('/clients/?limit=2000'),
        api.get('/items/?limit=2000'),
        api.get('/stores/?limit=2000'),
      ]);

      const getData = (res) => {
        if (!res || !res.data) return [];
        if (Array.isArray(res.data)) return res.data;
        if (res.data.results && Array.isArray(res.data.results)) return res.data.results;
        return [];
      };

      setRelationalData({
        ops: Object.fromEntries(getData(opRes).map((o) => [o.id, o.operation])),
        clients: Object.fromEntries(
          getData(clientsRes).map((c) => [c.id, `${c.first_name} ${c.last_name}`]),
        ),
        items: Object.fromEntries(getData(itemsRes).map((i) => [i.id, i.name])),
        stores: Object.fromEntries(getData(storesRes).map((s) => [s.id, s.name])),
      });
    } catch (error) {
      // Silently handle
    }
  };

  const loadHistory = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/op-his/?limit=${limit}&offset=${offset}`);
      if (res.data && res.data.results) {
        setHistory(res.data.results);
        setTotalCount(res.data.count || res.data.results.length);
      } else if (Array.isArray(res.data)) {
        setHistory(res.data);
        setTotalCount(res.data.length);
      } else {
        setHistory([]);
        setTotalCount(0);
      }
    } catch (error) {
      setHistory([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRelationalData();
  }, []);

  useEffect(() => {
    loadHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

  const stats = useMemo(() => {
    if (!Array.isArray(history)) {
      return {
        loans: 0,
        purchases: 0,
        sales: 0,
        netFlow: 0,
      };
    }

    // Map operation IDs to names for reliable logic
    const getOpName = (id) => (relationalData.ops[id] || '').toLowerCase();

    let loans = 0;
    let purchases = 0;
    let sales = 0;
    let netFlow = 0;

    history.forEach((op) => {
      const name = getOpName(op.operation);
      const price = parseFloat(op.price || 0);

      if (name.includes('sell') || name.includes('lend')) {
        // Selling and Lending = Positive (+)
        if (name.includes('sell')) sales += 1;
        if (name.includes('lend')) loans += 1;
        netFlow += price;
      } else if (name.includes('purch') || name.includes('borrow')) {
        // Purchasing and Borrowing = Negative (-)
        if (name.includes('purch')) purchases += 1;
        if (name.includes('borrow')) {
          // Borrowing is often paired with lending, but per user logic it is negative
          // We'll count it in the loans box for consistency, but with negative math
          loans += 1;
        }
        netFlow -= price;
      }
    });

    return {
      loans,
      purchases,
      sales,
      netFlow,
    };
  }, [history, relationalData.ops]);

  return (
    <div className="operations-container">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Page Loans</div>
          <div className="stat-value blue">{stats.loans}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Page Purchases</div>
          <div className="stat-value green">{stats.purchases}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Page Sales</div>
          <div className="stat-value orange">{stats.sales}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Page Net Flow</div>
          <div className={`stat-value ${stats.netFlow >= 0 ? 'dark' : 'red'}`}>
            {`${stats.netFlow >= 0 ? '$' : '-$'}${Math.abs(Math.round(stats.netFlow)).toLocaleString()}`}
          </div>
        </div>
      </div>

      <div className="operations-section">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Customer</th>
                <th>Item</th>
                <th>Store</th>
                <th>Price</th>
                <th>Info</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center' }}>
                    Loading operations...
                  </td>
                </tr>
              ) : Array.isArray(history) && history.length > 0 ? (
                history.map((op) => (
                  <tr key={op.id}>
                    <td>{new Date(op.date).toLocaleDateString()}</td>
                    <td>{relationalData.ops[op.operation] || `Op #${op.operation}`}</td>
                    <td>{relationalData.clients[op.client] || `Client #${op.client}`}</td>
                    <td>{relationalData.items[op.item] || `Item #${op.item}`}</td>
                    <td>{relationalData.stores[op.store] || `Store #${op.store}`}</td>
                    <td>{`$${op.price}`}</td>
                    <td>{op.info || '-'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center' }}>
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div
          className="pagination-controls"
          style={{
            marginTop: '20px',
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <button
            type="button"
            className="btn btn-secondary"
            disabled={offset === 0}
            onClick={() => setOffset(Math.max(0, offset - limit))}
          >
            Previous
          </button>
          <span>
            Showing {offset + 1} - {Math.min(offset + limit, totalCount)} of {totalCount}
          </span>
          <button
            type="button"
            className="btn btn-secondary"
            disabled={offset + limit >= totalCount}
            onClick={() => setOffset(offset + limit)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
