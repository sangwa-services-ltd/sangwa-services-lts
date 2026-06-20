import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const RequestDetails = () => {
  const { requestId } = useParams();
  const [request, setRequest] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchRequestDetails();
  }, [requestId]);

  const fetchRequestDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/requests/${requestId}`);
      setRequest(response.data);
    } catch (err) {
      setError('Failed to load request details');
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/requests/${requestId}/messages`, { message });
      setMessage('');
      fetchRequestDetails();
    } catch (err) {
      setError('Failed to send message');
    }
  };

  const handleApproveQuote = async (quoteId) => {
    try {
      await axios.put(`/api/quotes/${quoteId}/approve`);
      fetchRequestDetails();
    } catch (err) {
      setError('Failed to approve quote');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!request) return <div>Request not found</div>;

  return (
    <div className="request-details-page">
      <div className="container">
        <h1>Request #{request.request_code}</h1>

        <div className="tabs">
          <button
            className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`tab ${activeTab === 'messages' ? 'active' : ''}`}
            onClick={() => setActiveTab('messages')}
          >
            Messages
          </button>
          <button
            className={`tab ${activeTab === 'quotes' ? 'active' : ''}`}
            onClick={() => setActiveTab('quotes')}
          >
            Quotes
          </button>
          <button
            className={`tab ${activeTab === 'documents' ? 'active' : ''}`}
            onClick={() => setActiveTab('documents')}
          >
            Documents
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'overview' && (
            <div className="overview-tab">
              <div className="status-timeline">
                <h3>Status: {request.status}</h3>
                <div className="timeline">
                  {['New', 'Assigned', 'Provider Identified', 'In Progress', 'Completed'].map(status => (
                    <div key={status} className={`timeline-item ${request.status === status ? 'active' : ''}`}>
                      {status}
                    </div>
                  ))}
                </div>
              </div>

              <div className="request-info">
                <h3>Request Details</h3>
                <p><strong>Category:</strong> {request.category_name}</p>
                <p><strong>Requirements:</strong> {request.requirements}</p>
                <p><strong>Timeline:</strong> {request.preferred_timeline}</p>
                <p><strong>Created:</strong> {new Date(request.created_at).toLocaleDateString()}</p>
              </div>

              {request.coordinator && (
                <div className="coordinator-card">
                  <h3>Your Coordinator</h3>
                  <p><strong>Name:</strong> {request.coordinator.full_name}</p>
                  <p><strong>Email:</strong> {request.coordinator.email}</p>
                  <p><strong>Phone:</strong> {request.coordinator.phone}</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="messages-tab">
              <div className="messages-list">
                {request.messages && request.messages.map(msg => (
                  <div key={msg.id} className={`message ${msg.sender_type === 'client' ? 'own' : ''}`}>
                    <p className="sender">{msg.sender_name}</p>
                    <p className="text">{msg.message}</p>
                    <p className="time">{new Date(msg.created_at).toLocaleString()}</p>
                  </div>
                ))}
              </div>
              <form onSubmit={handleSendMessage} className="message-form">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                />
                <button type="submit" className="btn btn-primary">Send</button>
              </form>
            </div>
          )}

          {activeTab === 'quotes' && (
            <div className="quotes-tab">
              {request.quotes && request.quotes.length > 0 ? (
                request.quotes.map(quote => (
                  <div key={quote.id} className="quote-card">
                    <h4>{quote.provider_name}</h4>
                    <p className="amount">{quote.currency} {quote.amount}</p>
                    <p>{quote.notes}</p>
                    {quote.status === 'pending' && (
                      <button
                        onClick={() => handleApproveQuote(quote.id)}
                        className="btn btn-primary"
                      >
                        Approve Quote
                      </button>
                    )}
                    {quote.status === 'accepted' && <p className="accepted">✓ Accepted</p>}
                  </div>
                ))
              ) : (
                <p>No quotes yet</p>
              )}
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="documents-tab">
              {request.documents && request.documents.length > 0 ? (
                <ul className="documents-list">
                  {request.documents.map(doc => (
                    <li key={doc.id}>
                      <a href={doc.file_path} download>{doc.file_name}</a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No documents</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestDetails;