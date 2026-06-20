import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [activeTab, setActiveTab] = useState('pending');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchQuotes();
  }, [activeTab]);

  const fetchQuotes = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/providers/quotes?status=${activeTab}`);
      setQuotes(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load quotes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async (quoteId) => {
    try {
      await axios.delete(`/api/providers/quotes/${quoteId}`);
      fetchQuotes();
    } catch (err) {
      setError('Failed to withdraw quote');
    }
  };

  if (loading) return <div className="loading">Loading quotes...</div>;

  return (
    <div className="provider-quotes-page">
      <div className="container">
        <div className="page-header">
          <h1>My Quotes</h1>
          <Link to="/provider/opportunities" className="btn btn-primary">Submit New Quote</Link>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="tabs">
          {['pending', 'accepted', 'rejected', 'expired'].map(tab => (
            <button
              key={tab}
              className={`tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="quotes-list">
          {quotes.length > 0 ? (
            quotes.map(quote => (
              <div key={quote.id} className="quote-card">
                <div className="quote-header">
                  <h3>{quote.request_code}</h3>
                  <span className={`badge badge-${quote.status}`}>{quote.status}</span>
                </div>

                <div className="quote-body">
                  <div className="quote-info">
                    <p><strong>Category:</strong> {quote.category_name}</p>
                    <p><strong>Client:</strong> {quote.client_name}</p>
                    <p><strong>Description:</strong> {quote.request_description}</p>
                  </div>

                  <div className="quote-details">
                    <div className="amount-box">
                      <p className="label">Quoted Amount</p>
                      <p className="amount">{quote.currency} {quote.amount}</p>
                    </div>
                  </div>

                  <div className="quote-meta">
                    <p><strong>Valid Until:</strong> {quote.valid_until ? new Date(quote.valid_until).toLocaleDateString() : 'N/A'}</p>
                    <p><strong>Submitted:</strong> {new Date(quote.created_at).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="quote-actions">
                  {quote.status === 'pending' && (
                    <>
                      <Link to={`/provider/quotes/${quote.id}/edit`} className="btn btn-secondary">Edit</Link>
                      <button onClick={() => handleWithdraw(quote.id)} className="btn btn-danger">Withdraw</button>
                    </>
                  )}
                  {quote.status === 'accepted' && <p className="accepted-text">✓ Accepted</p>}
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <p>No {activeTab} quotes yet</p>
              <Link to="/provider/opportunities" className="btn btn-primary">Browse Opportunities</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quotes;