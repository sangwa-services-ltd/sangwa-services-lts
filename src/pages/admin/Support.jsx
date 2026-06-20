import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Support = () => {
  const [tickets, setTickets] = useState([]);
  const [activeTab, setActiveTab] = useState('open');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTickets();
  }, [activeTab]);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/support/tickets?status=${activeTab}`);
      setTickets(response.data);
    } catch (err) {
      setError('Failed to load support tickets');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading support tickets...</div>;

  return (
    <div className="support-page">
      <div className="container">
        <div className="page-header">
          <h1>Support Tickets</h1>
          <Link to="/support/create" className="btn btn-primary">Create New Ticket</Link>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="tabs">
          {['open', 'in_progress', 'waiting_on_client', 'resolved', 'closed'].map(tab => (
            <button
              key={tab}
              className={`tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.replace(/_/g, ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
            </button>
          ))}
        </div>

        <div className="tickets-list">
          {tickets.length > 0 ? (
            tickets.map(ticket => (
              <div key={ticket.id} className="ticket-card">
                <div className="ticket-header">
                  <div>
                    <h3>{ticket.ticket_code}</h3>
                    <p className="subject">{ticket.subject}</p>
                  </div>
                  <span className={`badge badge-${ticket.priority}`}>{ticket.priority}</span>
                </div>
                <p className="description">{ticket.description.substring(0, 100)}...</p>
                <div className="ticket-meta">
                  <p>Created: {new Date(ticket.created_at).toLocaleDateString()}</p>
                  <p>Status: <span className={`badge badge-${ticket.status}`}>{ticket.status}</span></p>
                </div>
                <Link to={`/support/tickets/${ticket.id}`} className="btn btn-secondary">View</Link>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <p>No {activeTab} tickets</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Support;