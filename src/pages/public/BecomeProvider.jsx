import React, { useState } from 'react';
import axios from 'axios';

const BecomeProvider = () => {
  const [formData, setFormData] = useState({
    company_name: '',
    contact_person: '',
    contact_email: '',
    contact_phone: '',
    business_reg_number: '',
    category: '',
    services: '',
    documents: null
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      documents: e.target.files
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      const data = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'documents' && formData[key]) {
          Array.from(formData[key]).forEach(file => {
            data.append('documents', file);
          });
        } else if (key !== 'documents') {
          data.append(key, formData[key]);
        }
      });

      await axios.post('/api/providers/apply', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setSuccess(true);
      setFormData({
        company_name: '',
        contact_person: '',
        contact_email: '',
        contact_phone: '',
        business_reg_number: '',
        category: '',
        services: '',
        documents: null
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="become-provider-page">
      <div className="container">
        <h1>Become a Service Provider</h1>
        <p className="subtitle">Join our network of trusted service providers</p>

        {success && (
          <div className="success-message">
            <p>✓ Your application has been submitted successfully!</p>
            <p>Our team will review your application and contact you shortly.</p>
          </div>
        )}

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="provider-form">
          <div className="form-section">
            <h2>Company Information</h2>
            <div className="form-group">
              <label>Company Name *</label>
              <input
                type="text"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Business Registration Number</label>
                <input
                  type="text"
                  name="business_reg_number"
                  value={formData.business_reg_number}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="hospitality">Hospitality</option>
                  <option value="relocation">Relocation</option>
                  <option value="construction">Construction</option>
                  <option value="transport">Transport</option>
                  <option value="business">Business Services</option>
                  <option value="everyday">Everyday Services</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Contact Information</h2>
            <div className="form-group">
              <label>Contact Person *</label>
              <input
                type="text"
                name="contact_person"
                value={formData.contact_person}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="contact_email"
                  value={formData.contact_email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone *</label>
                <input
                  type="tel"
                  name="contact_phone"
                  value={formData.contact_phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Services</h2>
            <div className="form-group">
              <label>Services Offered *</label>
              <textarea
                name="services"
                value={formData.services}
                onChange={handleChange}
                placeholder="Describe the services you offer"
                required
              />
            </div>
          </div>

          <div className="form-section">
            <h2>Documents</h2>
            <div className="form-group">
              <label>Upload Documents (Business License, ID, etc.)</label>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BecomeProvider;