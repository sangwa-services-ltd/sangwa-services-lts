import React, { useState } from 'react';
import axios from 'axios';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      await axios.post('/api/contact', formData);
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-us-page">
      <div className="container">
        <h1>Contact Us</h1>
        <p className="subtitle">We'd love to hear from you</p>

        <div className="contact-content">
          <div className="contact-info">
            <div className="info-card">
              <h3>Address</h3>
              <p>Kigali, Rwanda</p>
            </div>
            <div className="info-card">
              <h3>Email</h3>
              <p>info@sangwaservices.com</p>
            </div>
            <div className="info-card">
              <h3>Phone</h3>
              <p>+250 (0) 123 456 789</p>
            </div>
            <div className="info-card">
              <h3>Hours</h3>
              <p>Monday - Friday: 8am - 6pm<br/>Saturday: 9am - 5pm</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="contact-form">
            {success && <div className="success-message">✓ Message sent successfully!</div>}
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label>Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Message *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;