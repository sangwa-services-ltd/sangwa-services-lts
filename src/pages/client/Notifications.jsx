import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNotifications();
  }, [filter]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/notifications?filter=${filter}`);
      setNotifications(response.data);
    } catch (err) {
      setError('Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      await axios.put(`/api/notifications/${notificationId}/read`);
      fetchNotifications();
    } catch (err) {
      setError('Failed to update notification');
    }
  };

  if (loading) return <div className="loading">Loading notifications...</div>;

  return (
    <div className="notifications-page">
      <div className="container">
        <h1>Notifications</h1>

        {error && <div className="error-message">{error}</div>}

        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`filter-btn ${filter === 'unread' ? 'active' : ''}`}
            onClick={() => setFilter('unread')}
          >
            Unread
          </button>
          <button
            className={`filter-btn ${filter === 'read' ? 'active' : ''}`}
            onClick={() => setFilter('read')}
          >
            Read
          </button>
        </div>

        <div className="notifications-list">
          {notifications.map(notif => (
            <div key={notif.id} className={`notification-item ${notif.status === 'unread' ? 'unread' : ''}`}>
              <div className="notification-content">
                <h3>{notif.title}</h3>
                <p>{notif.body}</p>
                <p className="notification-time">{new Date(notif.created_at).toLocaleString()}</p>
              </div>
              {notif.status === 'unread' && (
                <button
                  onClick={() => handleMarkAsRead(notif.id)}
                  className="btn-small"
                >
                  Mark as Read
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;