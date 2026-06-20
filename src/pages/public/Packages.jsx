import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/packages');
      setPackages(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load packages. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading packages...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="packages-page">
      <div className="container">
        <h1>Service Packages</h1>
        <p className="subtitle">Choose the package that best fits your needs</p>

        <div className="packages-grid">
          {packages.map((pkg) => (
            <div key={pkg.id} className="package-card">
              <div className="package-header">
                <h2>{pkg.name}</h2>
                <div className="price">
                  <span className="currency">{pkg.currency}</span>
                  <span className="amount">{pkg.price}</span>
                </div>
              </div>
              <p className="description">{pkg.description}</p>
              {pkg.billing_type === 'subscription' && (
                <p className="billing-info">Billed {pkg.billing_cycle}</p>
              )}
              <ul className="features">
                {pkg.features && pkg.features.map((feature, idx) => (
                  <li key={idx}>✓ {feature}</li>
                ))}
              </ul>
              <Link to="/register" className="btn btn-primary">Get Started</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Packages;