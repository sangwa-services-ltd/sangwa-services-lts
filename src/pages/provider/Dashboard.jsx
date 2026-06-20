import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProviderDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    active_opportunities: 0,
    active_jobs: 0,
    average_rating: 0,
    completion_rate: 0
  });
  const [recentOpportunities, setRecentOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [dashboard, opportunities] = await Promise.all([
        axios.get('/api/providers/dashboard'),
        axios.get('/api/opportunities?limit=5')
      ]);
      setDashboardData(dashboard.data);
      setRecentOpportunities(opportunities.data);
    } catch (err) {
      setError('Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading dashboard...</div>;

  return (
    <div className="provider-dashboard">
      <div className="sidebar">
        <nav>
          <Link to="/provider/dashboard" className="nav-item active">Dashboard</Link>
          <Link to="/provider/opportunities" className="nav-item">Opportunities</Link>
          <Link to="/provider/quotes" className="nav-item">Quotes</Link>
          <Link to="/provider/profile" className="nav-item">Profile</Link>
          <Link to="/provider/services" className="nav-item">Services</Link>
          <Link to="/provider/availability" className="nav-item">Availability</Link>
          <Link to="/provider/ratings" className="nav-item">Ratings</Link>
        </nav>
      </div>

      <div className="main-content">
        <h1>Provider Dashboard</h1>

        {error && <div className="error-message">{error}</div>}

        {/* Summary Cards */}
        <div className="summary-cards">
          <div className="card">
            <div className="card-icon">📋</div>
            <div className="card-content">
              <h3>Active Opportunities</h3>
              <p className="card-value">{dashboardData.active_opportunities}</p>
            </div>
          </div>
          <div className="card">
            <div className="card-icon">💼</div>
            <div className="card-content">
              <h3>Active Jobs</h3>
              <p className="card-value">{dashboardData.active_jobs}</p>
            </div>
          </div>
          <div className="card">
            <div className="card-icon">⭐</div>
            <div className="card-content">
              <h3>Average Rating</h3>
              <p className="card-value">{dashboardData.average_rating.toFixed(2)}</p>
            </div>
          </div>
          <div className="card">
            <div className="card-icon">✓</div>
            <div className="card-content">
              <h3>Completion Rate</h3>
              <p className="card-value">{dashboardData.completion_rate.toFixed(0)}%</p>
            </div>
          </div>
        </div>

        {/* Recent Opportunities */}
        <div className="dashboard-section">
          <h2>Recent Opportunities</h2>
          <div className="opportunities-list">
            {recentOpportunities.length > 0 ? (
              recentOpportunities.map(opp => (
                <div key={opp.id} className="opportunity-card">
                  <h3>{opp.category_name}</h3>
                  <p>{opp.requirements}</p>
                  <p className="timeline">Timeline: {opp.preferred_timeline}</p>
                  <Link to={`/provider/opportunities/${opp.id}`} className="btn btn-primary">View Details</Link>
                </div>
              ))
            ) : (
              <p>No opportunities available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;