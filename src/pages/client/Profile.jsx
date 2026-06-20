import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('personal');
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
      const response = await axios.get('/api/profile');
      setProfileData(response.data);
    } catch (err) {
      setError('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/profile', profileData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Failed to update profile');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) return <div className="loading">Loading profile...</div>;
  if (!profileData) return <div>Profile not found</div>;

  return (
    <div className="profile-page">
      <div className="container">
        <h1>My Profile</h1>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">✓ Profile updated successfully</div>}

        <div className="profile-tabs">
          <button
            className={`tab ${activeTab === 'personal' ? 'active' : ''}`}
            onClick={() => setActiveTab('personal')}
          >
            Personal Information
          </button>
          <button
            className={`tab ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            Security
          </button>
          <button
            className={`tab ${activeTab === 'preferences' ? 'active' : ''}`}
            onClick={() => setActiveTab('preferences')}
          >
            Preferences
          </button>
        </div>

        {activeTab === 'personal' && (
          <form onSubmit={handleUpdateProfile} className="profile-form">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="full_name"
                value={profileData.full_name || ''}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={profileData.email || ''} disabled />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={profileData.phone || ''}
                onChange={handleChange}
              />
            </div>
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
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={profileData.address || ''}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">Save Changes</button>
          </form>
        )}

        {activeTab === 'security' && (
          <form onSubmit={handleUpdateProfile} className="profile-form">
            <div className="form-group">
              <label>Current Password</label>
              <input type="password" name="current_password" />
            </div>
            <div className="form-group">
              <label>New Password</label>
              <input type="password" name="new_password" />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input type="password" name="password_confirmation" />
            </div>
            <button type="submit" className="btn btn-primary">Change Password</button>
          </form>
        )}

        {activeTab === 'preferences' && (
          <form onSubmit={handleUpdateProfile} className="profile-form">
            <div className="form-group">
              <label>Preferred Language</label>
              <select name="preferred_language" value={profileData.preferred_language || 'en'} onChange={handleChange}>
                <option value="en">English</option>
                <option value="fr">French</option>
                <option value="rw">Kinyarwanda</option>
              </select>
            </div>
            <div className="form-group">
              <label>
                <input type="checkbox" name="email_notifications" /> Email Notifications
              </label>
            </div>
            <button type="submit" className="btn btn-primary">Save Preferences</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;