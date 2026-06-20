import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProviderProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/providers/profile');
      setProfileData(response.data);
    } catch (err) {
      setError('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/providers/profile', profileData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Failed to update profile');
    }
  };

  if (loading) return <div className="loading">Loading profile...</div>;
  if (!profileData) return <div>Profile not found</div>;

  return (
    <div className="provider-profile-page">
      <div className="container">
        <h1>Provider Profile</h1>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">✓ Profile updated successfully</div>}

        <form onSubmit={handleSubmit} className="profile-form">
          <fieldset>
            <legend>Company Information</legend>
            <div className="form-group">
              <label>Company Name</label>
              <input
                type="text"
                name="company_name"
                value={profileData.company_name || ''}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Contact Person</label>
              <input
                type="text"
                name="contact_person"
                value={profileData.contact_person || ''}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="contact_email"
                value={profileData.contact_email || ''}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="contact_phone"
                value={profileData.contact_phone || ''}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Business Registration Number</label>
              <input
                type="text"
                name="business_reg_number"
                value={profileData.business_reg_number || ''}
                onChange={handleChange}
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Verification Status</legend>
            <p><strong>Status:</strong> {profileData.verification_status}</p>
          </fieldset>

          <button type="submit" className="btn btn-primary">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default ProviderProfile;