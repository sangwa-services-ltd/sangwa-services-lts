import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, [activeTab]);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/admin/settings/${activeTab}`);
      setSettings(response.data);
    } catch (err) {
      setError('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/admin/settings/${activeTab}`, settings);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Failed to save settings');
    }
  };

  if (loading) return <div className="loading">Loading settings...</div>;

  return (
    <div className="settings-page">
      <div className="container">
        <h1>Settings</h1>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">✓ Settings saved successfully</div>}

        <div className="tabs">
          {['general', 'packages', 'categories', 'sla', 'email', 'sms'].map(tab => (
            <button
              key={tab}
              className={`tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="settings-form">
          <div className="form-content">
            {Object.entries(settings).map(([key, value]) => (
              <div key={key} className="form-group">
                <label>{key.replace(/_/g, ' ')}</label>
                {typeof value === 'boolean' ? (
                  <input
                    type="checkbox"
                    name={key}
                    checked={value}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      [key]: e.target.checked
                    }))}
                  />
                ) : (
                  <input
                    type="text"
                    name={key}
                    value={value || ''}
                    onChange={handleChange}
                  />
                )}
              </div>
            ))}
          </div>
          <button type="submit" className="btn btn-primary">Save Settings</button>
        </form>
      </div>
    </div>
  );
};

export default Settings;