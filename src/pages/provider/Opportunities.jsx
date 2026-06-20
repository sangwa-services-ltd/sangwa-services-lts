import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Opportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    location: '',
    date_from: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOpportunities();
  }, [filters]);

  const fetchOpportunities = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.category) params.append('category', filters.category);
      if (filters.location) params.append('location', filters.location);
      if (filters.date_from) params.append('date_from', filters.date_from);

      const response = await axios.get(`/api/opportunities?${params.toString()}`);
      setOpportunities(response.data);
    } catch (err) {
      setError('Failed to load opportunities');
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

  if (loading) return <div className="loading">Loading opportunities...</div>;

  return (
    <div className="opportunities-page">
      <div className="container">
        <h1>Service Opportunities</h1>

        {error && <div className="error-message">{error}</div>}

        <div className="filters">
          <div className="filter-group">
            <label>Category</label>
            <input
              type="text"
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              placeholder="Search by category"
            />
          </div>
          <div className="filter-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              placeholder="Search by location"
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
        </div>

        <div className="opportunities-grid">
          {opportunities.map(opp => (
            <div key={opp.id} className="opportunity-card">
              <h3>{opp.category_name}</h3>
              <p className="request-id">Request: {opp.request_code}</p>
              <p className="description">{opp.requirements}</p>
              <p className="timeline">Timeline: {opp.preferred_timeline}</p>
              <div className="card-actions">
                <Link to={`/provider/opportunities/${opp.id}`} className="btn btn-primary">View</Link>
                <Link to={`/provider/quotes/new?opportunity_id=${opp.id}`} className="btn btn-secondary">Submit Quote</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Opportunities;