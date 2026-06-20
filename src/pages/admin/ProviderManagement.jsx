import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProviderManagement = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProviders(activeTab);
  }, [activeTab]);

  const fetchProviders = async (status) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/admin/providers?verification_status=${status}`);
      setProviders(response.data);
    } catch (err) {
      setError('Failed to load providers');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (providerId) => {
    try {
      await axios.put(`/api/admin/providers/${providerId}/approve`);
      fetchProviders(activeTab);
    } catch (err) {
      setError('Failed to approve provider');
    }
  };

  const handleReject = async (providerId) => {
    try {
      await axios.put(`/api/admin/providers/${providerId}/reject`);
      fetchProviders(activeTab);
    } catch (err) {
      setError('Failed to reject provider');
    }
  };

  if (loading) return <div className="loading">Loading providers...</div>;

  return (
    <div className="provider-management-page">
      <div className="container">
        <h1>Provider Management</h1>

        {error && <div className="error-message">{error}</div>}

        <div className="tabs">
          {['pending', 'active', 'suspended', 'rejected'].map(tab => (
            <button
              key={tab}
              className={`tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="providers-list">
          {providers.map(provider => (
            <div key={provider.id} className="provider-card">
              <h3>{provider.company_name}</h3>
              <p><strong>Contact:</strong> {provider.contact_person}</p>
              <p><strong>Email:</strong> {provider.contact_email}</p>
              <p><strong>Status:</strong> {provider.verification_status}</p>
              <div className="card-actions">
                <Link to={`/admin/providers/${provider.id}`} className="btn btn-primary">View Details</Link>
                {activeTab === 'pending' && (
                  <>
                    <button onClick={() => handleApprove(provider.id)} className="btn btn-success">Approve</button>
                    <button onClick={() => handleReject(provider.id)} className="btn btn-danger">Reject</button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProviderManagement;