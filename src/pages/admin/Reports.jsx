import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Reports = () => {
  const [activeTab, setActiveTab] = useState('daily');
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateFilter, setDateFilter] = useState('');

  useEffect(() => {
    fetchReports();
  }, [activeTab, dateFilter]);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (dateFilter) params.append('date', dateFilter);
      const response = await axios.get(`/api/admin/reports/${activeTab}?${params.toString()}`);
      setReportData(response.data);
    } catch (err) {
      setError('Failed to load reports');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async (format) => {
    try {
      const response = await axios.get(`/api/admin/reports/${activeTab}/export?format=${format}`, {
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `report-${activeTab}.${format}`);
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      setError('Failed to export report');
    }
  };

  if (loading) return <div className="loading">Loading reports...</div>;

  return (
    <div className="reports-page">
      <div className="container">
        <h1>Reports</h1>

        {error && <div className="error-message">{error}</div>}

        <div className="reports-toolbar">
          <div className="tabs">
            {['daily', 'weekly', 'monthly', 'revenue', 'providers', 'coordinators', 'sla'].map(tab => (
              <button
                key={tab}
                className={`tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="report-controls">
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              placeholder="Filter by date"
            />
            <button onClick={() => handleExport('pdf')} className="btn btn-outline">Export PDF</button>
            <button onClick={() => handleExport('csv')} className="btn btn-outline">Export CSV</button>
          </div>
        </div>

        {reportData && (
          <div className="report-content">
            <h2>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Report</h2>
            <div className="report-summary">
              {Object.entries(reportData).map(([key, value]) => (
                <div key={key} className="summary-card">
                  <p className="label">{key.replace(/_/g, ' ')}</p>
                  <p className="value">{typeof value === 'number' ? value.toLocaleString() : value}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;