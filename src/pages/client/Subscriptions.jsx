import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/subscriptions');
      setSubscriptions(response.data);
    } catch (err) {
      setError('Failed to load subscriptions');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading subscriptions...</div>;

  return (
    <div className="subscriptions-page">
      <div className="container">
        <h1>My Subscriptions</h1>

        {error && <div className="error-message">{error}</div>}

        <div className="subscriptions-list">
          {subscriptions.map(sub => (
            <div key={sub.id} className="subscription-card">
              <h3>{sub.package_name}</h3>
              <p><strong>Status:</strong> {sub.status}</p>
              <p><strong>Billing Cycle:</strong> {sub.billing_cycle}</p>
              <p><strong>Next Billing:</strong> {new Date(sub.next_billing_date).toLocaleDateString()}</p>
              {sub.status === 'active' && (
                <button className="btn btn-secondary">Manage</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;