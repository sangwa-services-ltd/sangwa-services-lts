import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Analytics = () => {
  const [activeTab, setActiveTab] = useState('customer');
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAnalytics(activeTab);
  }, [activeTab]);

  const fetchAnalytics = async (tab) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/admin/analytics/${tab}`);
      setAnalyticsData(response.data);
    } catch (err) {
      setError('Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading analytics...</div>;

  return (
    <div className="analytics-page">
      <div className="container">
        <h1>Analytics</h1>

        {error && <div className="error-message">{error}</div>}

        <div className="tabs">
          {['customer', 'provider', 'service', 'revenue'].map(tab => (
            <button
              key={tab}
              className={`tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} Analytics
            </button>
          ))}
        </div>

        <div className="analytics-content">
          {analyticsData && (
            <>
              <div className="chart-container">
                <h3>Chart will be displayed here</h3>
              </div>
              <div className="stats-grid">
                {Object.entries(analyticsData).map(([key, value]) => (
                  <div key={key} className="stat-card">
                    <h4>{key.replace(/_/g, ' ')}</h4>
                    <p className="stat-value">{value}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;