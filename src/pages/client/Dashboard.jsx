import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ClientDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    active_requests: 0,
    completed_requests: 0,
    pending_payments: 0,
    notifications: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [recentMessages, setRecentMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [dashboard, activities, messages] = await Promise.all([
        axios.get('/api/clients/dashboard'),
        axios.get('/api/clients/activities'),
        axios.get('/api/messages?limit=5')
      ]);
      setDashboardData(dashboard.data);
      setRecentActivity(activities.data);
      setRecentMessages(messages.data);
      setError(null);
    } catch (err) {
      setError('Failed to load dashboard');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading dashboard...</div>;

  return (
    <div className="client-dashboard">
      <div className="sidebar">
        <nav>
          <Link to="/client/dashboard" className="nav-item active">Dashboard</Link>
          <Link to="/client/requests" className="nav-item">Requests</Link>
          <Link to="/client/payments" className="nav-item">Payments</Link>
          <Link to="/client/subscriptions" className="nav-item">Subscriptions</Link>
          <Link to="/client/messages" className="nav-item">Messages</Link>
          <Link to="/client/notifications" className="nav-item">Notifications</Link>
          <Link to="/client/profile" className="nav-item">Profile</Link>
        </nav>
      </div>

      <div className="main-content">
        <h1>Welcome to your Dashboard</h1>

        {error && <div className="error-message">{error}</div>}

        {/* Summary Cards */}
        <div className="summary-cards">
          <div className="card">
            <div className="card-icon">📋</div>
            <div className="card-content">
              <h3>Active Requests</h3>
              <p className="card-value">{dashboardData.active_requests}</p>
            </div>
          </div>
          <div className="card">
            <div className="card-icon">✓</div>
            <div className="card-content">
              <h3>Completed</h3>
              <p className="card-value">{dashboardData.completed_requests}</p>
            </div>
          </div>
          <div className="card">
            <div className="card-icon">💳</div>
            <div className="card-content">
              <h3>Pending Payments</h3>
              <p className="card-value">{dashboardData.pending_payments}</p>
            </div>
          </div>
          <div className="card">
            <div className="card-icon">🔔</div>
            <div className="card-content">
              <h3>Notifications</h3>
              <p className="card-value">{dashboardData.notifications}</p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="dashboard-section">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            {recentActivity.length > 0 ? (
              recentActivity.map((activity) => (
                <div key={activity.id} className="activity-item">
                  <span className="activity-time">{new Date(activity.created_at).toLocaleDateString()}</span>
                  <span className="activity-description">{activity.description}</span>
                </div>
              ))
            ) : (
              <p>No recent activity</p>
            )}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="dashboard-section">
          <h2>Recent Messages</h2>
          <div className="messages-list">
            {recentMessages.length > 0 ? (
              recentMessages.map((msg) => (
                <div key={msg.id} className="message-item">
                  <p className="message-sender">{msg.sender_name}</p>
                  <p className="message-text">{msg.message}</p>
                </div>
              ))
            ) : (
              <p>No messages yet</p>
            )}
          </div>
          <Link to="/client/messages" className="btn btn-secondary">View All Messages</Link>
        </div>

        <Link to="/create-request" className="btn btn-primary btn-large">Create New Request</Link>
      </div>
    </div>
  );
};

export default ClientDashboard;