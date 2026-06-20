import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [filters, setFilters] = useState({
    module: '',
    action: '',
    user: '',
    date_from: '',
    date_to: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLogs();
  }, [filters]);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      const response = await axios.get(`/api/admin/audit-logs?${params.toString()}`);
      setLogs(response.data);
    } catch (err) {
      setError('Failed to load audit logs');
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

  if (loading) return <div className="loading">Loading audit logs...</div>;

  return (
    <div className="audit-logs-page">
      <div className="container">
        <h1>Audit Logs</h1>

        {error && <div className="error-message">{error}</div>}

        <div className="filters-section">
          <h3>Filter Logs</h3>
          <div className="filters-grid">
            <div className="filter-group">
              <label>Module</label>
              <input
                type="text"
                name="module"
                value={filters.module}
                onChange={handleFilterChange}
                placeholder="e.g., requests, payments"
              />
            </div>
            <div className="filter-group">
              <label>Action</label>
              <input
                type="text"
                name="action"
                value={filters.action}
                onChange={handleFilterChange}
                placeholder="e.g., create, update, delete"
              />
            </div>
            <div className="filter-group">
              <label>User</label>
              <input
                type="text"
                name="user"
                value={filters.user}
                onChange={handleFilterChange}
                placeholder="Username or email"
              />
            </div>
            <div className="filter-group">
              <label>From Date</label>
              <input
                type="date"
                name="date_from"
                value={filters.date_from}
                onChange={handleFilterChange}
              />
            </div>
            <div className="filter-group">
              <label>To Date</label>
              <input
                type="date"
                name="date_to"
                value={filters.date_to}
                onChange={handleFilterChange}
              />
            </div>
          </div>
        </div>

        <div className="logs-table-section">
          <table className="logs-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>User</th>
                <th>Module</th>
                <th>Action</th>
                <th>Entity</th>
                <th>IP Address</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {logs.map(log => (
                <tr key={log.id}>
                  <td>{new Date(log.created_at).toLocaleString()}</td>
                  <td>{log.user_name || 'System'}</td>
                  <td>{log.module}</td>
                  <td><span className={`badge badge-${log.action}`}>{log.action}</span></td>
                  <td>{log.entity_type}</td>
                  <td>{log.ip_address}</td>
                  <td>
                    {log.old_value && log.new_value && (
                      <details>
                        <summary>View Changes</summary>
                        <div className="changes-detail">
                          <p><strong>Old:</strong> {JSON.stringify(log.old_value, null, 2)}</p>
                          <p><strong>New:</strong> {JSON.stringify(log.new_value, null, 2)}</p>
                        </div>
                      </details>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AuditLogs;