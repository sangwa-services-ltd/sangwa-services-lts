import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Availability = () => {
  const [availability, setAvailability] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    available_from: '',
    available_to: '',
    notes: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchAvailability();
  }, []);

  const fetchAvailability = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/providers/availability');
      setAvailability(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load availability');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/providers/availability', formData);
      setSuccess(true);
      setFormData({ available_from: '', available_to: '', notes: '' });
      setShowForm(false);
      fetchAvailability();
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save availability');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this availability period?')) {
      try {
        await axios.delete(`/api/providers/availability/${id}`);
        fetchAvailability();
      } catch (err) {
        setError('Failed to delete availability');
      }
    }
  };

  if (loading) return <div className="loading">Loading availability...</div>;

  return (
    <div className="provider-availability-page">
      <div className="container">
        <div className="page-header">
          <h1>My Availability</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn btn-primary"
          >
            {showForm ? 'Cancel' : 'Add Availability Period'}
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">✓ Availability saved successfully</div>}

        {showForm && (
          <div className="add-availability-card">
            <h2>Add Availability Period</h2>
            <form onSubmit={handleSubmit} className="availability-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Available From *</label>
                  <input
                    type="datetime-local"
                    name="available_from"
                    value={formData.available_from}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Available To *</label>
                  <input
                    type="datetime-local"
                    name="available_to"
                    value={formData.available_to}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Notes (Optional)</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="e.g., Limited availability due to other projects"
                  rows="3"
                />
              </div>

              <button type="submit" className="btn btn-primary">Save Availability</button>
            </form>
          </div>
        )}

        <div className="availability-list">
          <h2>Availability Periods</h2>
          {availability.length > 0 ? (
            <div className="periods-grid">
              {availability.map(period => {
                const fromDate = new Date(period.available_from);
                const toDate = new Date(period.available_to);
                const isActive = new Date() >= fromDate && new Date() <= toDate;

                return (
                  <div key={period.id} className={`period-card ${isActive ? 'active' : 'upcoming'}`}>
                    <div className="period-header">
                      <span className={`status-badge ${isActive ? 'active' : 'upcoming'}`}>
                        {isActive ? '✓ Active' : 'Upcoming'}
                      </span>
                    </div>

                    <div className="period-details">
                      <div className="date-range">
                        <p className="label">From</p>
                        <p className="date">{fromDate.toLocaleString()}</p>
                      </div>
                      <div className="date-range">
                        <p className="label">To</p>
                        <p className="date">{toDate.toLocaleString()}</p>
                      </div>
                    </div>

                    {period.notes && (
                      <div className="notes">
                        <p><strong>Notes:</strong> {period.notes}</p>
                      </div>
                    )}

                    <div className="period-duration">
                      <p><strong>Duration:</strong> {Math.ceil((toDate - fromDate) / (1000 * 60 * 60 * 24))} days</p>
                    </div>

                    <button
                      onClick={() => handleDelete(period.id)}
                      className="btn btn-danger btn-small"
                    >
                      Delete
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="empty-state">
              <p>📅 No availability periods set yet</p>
              <button onClick={() => setShowForm(true)} className="btn btn-primary">
                Add Your First Availability Period
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Availability;