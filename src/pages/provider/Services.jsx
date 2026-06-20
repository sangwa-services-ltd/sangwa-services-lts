import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Services = () => {
  const [services, setServices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    service_name: '',
    category_id: '',
    description: ''
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchServices();
    fetchCategories();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get('/api/providers/services');
      setServices(response.data);
    } catch (err) {
      setError('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/services');
      setCategories(response.data);
    } catch (err) {
      console.error('Failed to load categories');
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
      if (editingId) {
        await axios.put(`/api/providers/services/${editingId}`, formData);
      } else {
        await axios.post('/api/providers/services', formData);
      }
      setFormData({ service_name: '', category_id: '', description: '' });
      setShowForm(false);
      setEditingId(null);
      fetchServices();
    } catch (err) {
      setError('Failed to save service');
    }
  };

  const handleEdit = (service) => {
    setFormData(service);
    setEditingId(service.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/providers/services/${id}`);
      fetchServices();
    } catch (err) {
      setError('Failed to delete service');
    }
  };

  if (loading) return <div className="loading">Loading services...</div>;

  return (
    <div className="provider-services-page">
      <div className="container">
        <h1>My Services</h1>

        {error && <div className="error-message">{error}</div>}

        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setFormData({ service_name: '', category_id: '', description: '' });
          }}
          className="btn btn-primary"
        >
          {showForm ? 'Cancel' : 'Add Service'}
        </button>

        {showForm && (
          <form onSubmit={handleSubmit} className="service-form">
            <div className="form-group">
              <label>Service Name *</label>
              <input
                type="text"
                name="service_name"
                value={formData.service_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Category *</label>
              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                required
              >
                <option value="">Select category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              {editingId ? 'Update Service' : 'Add Service'}
            </button>
          </form>
        )}

        <div className="services-list">
          {services.map(service => (
            <div key={service.id} className="service-card">
              <h3>{service.service_name}</h3>
              <p className="category">{service.category_name}</p>
              <p>{service.description}</p>
              <div className="card-actions">
                <button onClick={() => handleEdit(service)} className="btn btn-secondary">Edit</button>
                <button onClick={() => handleDelete(service.id)} className="btn btn-danger">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;