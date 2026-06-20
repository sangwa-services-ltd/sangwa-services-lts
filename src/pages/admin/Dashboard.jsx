import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    total_revenue: 0,
    active_requests: 0,
    total_providers: 0,
    total_clients: 0,
    satisfaction_score: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/admin/dashboard');
      setDashboardData(response.data);
    } catch (err) {
      setError('Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading dashboard...</div>;

  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        <nav>
          <Link to="/admin/dashboard" className="nav-item active">Dashboard</Link>
          <Link to="/admin/requests" className="nav-item">Requests</Link>
          <Link to="/admin/providers" className="nav-item">Providers</Link>
          <Link to="/admin/clients" className="nav-item">Clients</Link>
          <Link to="/admin/payments" className="nav-item">Payments</Link>
          <Link to="/admin/staff" className="nav-item">Staff</Link>
          <Link to="/admin/reports" className="nav-item">Reports</Link>
          <Link to="/admin/analytics" className="nav-item">Analytics</Link>
          <Link to="/admin/settings" className="nav-item">Settings</Link>
        </nav>
      </div>

      <div className="main-content">
        <h1>Admin Dashboard</h1>

        {error && <div className="error-message">{error}</div>}

        {/* KPI Cards */}
        <div className="kpi-cards">
          <div className="kpi-card">
            <h3>Total Revenue</h3>
            <p className="kpi-value">RWF {dashboardData.total_revenue.toLocaleString()}</p>
          </div>
          <div className="kpi-card">
            <h3>Active Requests</h3>
            <p className="kpi-value">{dashboardData.active_requests}</p>
          </div>
          <div className="kpi-card">
            <h3>Providers</h3>
            <p className="kpi-value">{dashboardData.total_providers}</p>
          </div>
          <div className="kpi-card">
            <h3>Clients</h3>
            <p className="kpi-value">{dashboardData.total_clients}</p>
          </div>
          <div className="kpi-card">
            <h3>Satisfaction</h3>
            <p className="kpi-value">{dashboardData.satisfaction_score.toFixed(1)}/5</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="charts-section">
          <div className="chart-container">
            <h3>Revenue Trend</h3>
            <p>Chart placeholder</p>
          </div>
          <div className="chart-container">
            <h3>Requests Trend</h3>
            <p>Chart placeholder</p>
          </div>
          <div className="chart-container">
            <h3>Category Demand</h3>
            <p>Chart placeholder</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;