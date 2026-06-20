import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ClientManagement = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/admin/clients');
      setClients(response.data);
    } catch (err) {
      setError('Failed to load clients');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading clients...</div>;

  return (
    <div className="client-management-page">
      <div className="container">
        <h1>Client Management</h1>

        {error && <div className="error-message">{error}</div>}

        <table className="clients-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Type</th>
              <th>Status</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map(client => (
              <tr key={client.id}>
                <td>{client.full_name}</td>
                <td>{client.email}</td>
                <td>{client.client_type}</td>
                <td><span className={`badge badge-${client.status}`}>{client.status}</span></td>
                <td>{new Date(client.created_at).toLocaleDateString()}</td>
                <td>
                  <Link to={`/admin/clients/${client.id}`} className="btn btn-sm">View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientManagement;