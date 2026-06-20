import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const StaffManagement = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/admin/staff');
      setStaff(response.data);
    } catch (err) {
      setError('Failed to load staff');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading staff...</div>;

  return (
    <div className="staff-management-page">
      <div className="container">
        <div className="page-header">
          <h1>Staff Management</h1>
          <Link to="/admin/staff/create" className="btn btn-primary">Add Staff Member</Link>
        </div>

        {error && <div className="error-message">{error}</div>}

        <table className="staff-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Email</th>
              <th>Performance Score</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {staff.map(member => (
              <tr key={member.id}>
                <td>{member.full_name}</td>
                <td>{member.role}</td>
                <td>{member.email}</td>
                <td>{member.overall_score?.toFixed(2)}/5</td>
                <td><span className={`badge badge-${member.status}`}>{member.status}</span></td>
                <td>
                  <Link to={`/admin/staff/${member.id}/edit`} className="btn btn-sm">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffManagement;