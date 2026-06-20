import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RequestManagement = () => {
  const [requests, setRequests] = useState([]);
  const [filters, setFilters] = useState({
    status: '',
    category: '',
    coordinator: '',
    priority: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, [filters]);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      const response = await axios.get(`/api/admin/requests?${params.toString()}`);
      setRequests(response.data);
    } catch (err) {
      setError('Failed to load requests');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) return <div className="loading">Loading requests...</div>;

  return (
    <div className="request-management-page">
      <div className="container">
        <h1>Request Management</h1>

        {error && <div className="error-message">{error}</div>}

        {/* Filters */}
        <div className="filters-bar">
          <div className="filter-group">
            <label>Status</label>
            <select name="status" value={filters.status} onChange={handleFilterChange}>
              <option value="">All</option>
              <option value="new">New</option>
              <option value="assigned">Assigned</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Category</label>
            <input
              type="text"
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              placeholder="Filter by category"
            />
          </div>
          <div className="filter-group">
            <label>Priority</label>
            <select name="priority" value={filters.priority} onChange={handleFilterChange}>
              <option value="">All</option>
              <option value="low">Low</option>
              <option value="normal">Normal</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
        </div>

        {/* Requests Table */}
        <table className="requests-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Client</th>
              <th>Category</th>
              <th>Coordinator</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(request => (
              <tr key={request.id}>
                <td>{request.request_code}</td>
                <td>{request.client_name}</td>
                <td>{request.category_name}</td>
                <td>{request.coordinator_name || '-'}</td>
                <td><span className={`badge badge-${request.status}`}>{request.status}</span></td>
                <td>{request.priority}</td>
                <td>{new Date(request.created_at).toLocaleDateString()}</td>
                <td>
                  <Link to={`/admin/requests/${request.id}`} className="btn btn-sm">View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestManagement;