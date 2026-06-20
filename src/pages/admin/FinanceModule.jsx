import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FinanceModule = () => {
  const [activeTab, setActiveTab] = useState('payments');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFinanceData(activeTab);
  }, [activeTab]);

  const fetchFinanceData = async (tab) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/admin/finance/${tab}`);
      setData(response.data);
    } catch (err) {
      setError('Failed to load finance data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="finance-module-page">
      <div className="container">
        <h1>Finance Management</h1>

        {error && <div className="error-message">{error}</div>}

        <div className="tabs">
          {['payments', 'receipts', 'subscriptions', 'commissions'].map(tab => (
            <button
              key={tab}
              className={`tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <table className="finance-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id}>
                <td>{new Date(item.created_at).toLocaleDateString()}</td>
                <td>{item.description}</td>
                <td>{item.currency} {item.amount}</td>
                <td><span className={`badge badge-${item.status}`}>{item.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FinanceModule;