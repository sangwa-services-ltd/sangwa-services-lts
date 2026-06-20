import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Services = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/services');
      setCategories(response.data);
      if (response.data.length > 0) {
        setSelectedCategory(response.data[0]);
      }
      setError(null);
    } catch (err) {
      setError('Failed to load services. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading services...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="services-page">
      <div className="container">
        <h1>Our Services</h1>
        <p className="subtitle">Explore the wide range of services we offer</p>

        <div className="services-content">
          <div className="categories-list">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`category-btn ${selectedCategory?.id === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category.icon && <span className="icon">{category.icon}</span>}
                {category.name}
              </button>
            ))}
          </div>

          {selectedCategory && (
            <div className="service-details">
              <h2>{selectedCategory.name}</h2>
              <p>{selectedCategory.description}</p>
              <Link to="/request-service" className="btn btn-primary">
                Request This Service
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Services;