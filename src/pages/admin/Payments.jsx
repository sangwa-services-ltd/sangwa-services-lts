import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [filters, setFilters] = useState({
    status: '',
    client: '',
    date_from: '',
    date_to: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [summary, setSummary] = useState({
    total_revenue: 0,
    pending_amount: 0,
    completed_payments: 0,
    failed_payments: 0
  });

  useEffect(() => {
    fetchPayments();
  }, [filters]);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      const [paymentsRes, summaryRes] = await Promise.all([
        axios.get(`/api/admin/payments?${params.toString()}`),
        axios.get('/api/admin/payments/summary')
      ]);
      setPayments(paymentsRes.data);
      setSummary(summaryRes.data);
      setError(null);
    } catch (err) {
      setError('Failed to load payments');
      console.error(err);
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

  const handleMarkCompleted = async (paymentId) => {
    try {
      await axios.put(`/api/admin/payments/${paymentId}/complete`);
      fetchPayments();
    } catch (err) {
      setError('Failed to update payment');
    }
  };

  const handleGenerateReceipt = async (paymentId) => {
    try {
      const response = await axios.get(`/api/admin/payments/${paymentId}/receipt`, {
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `receipt-${paymentId}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      setError('Failed to generate receipt');
    }
  };

  if (loading) return <div className="loading">Loading payments...</div>;

  return (
    <div className="admin-payments-page">
      <div className="container">
        <h1>Payment Management</h1>

        {error && <div className="error-message">{error}</div>}

        {/* Summary Cards */}
        <div className="summary-cards">
          <div className="summary-card">
            <h3>Total Revenue</h3>
            <p className="amount">RWF {summary.total_revenue?.toLocaleString() || 0}</p>
          </div>
          <div className="summary-card">
            <h3>Pending Payments</h3>
            <p className="amount">RWF {summary.pending_amount?.toLocaleString() || 0}</p>
          </div>
          <div className="summary-card">
            <h3>Completed</h3>
            <p className="amount">{summary.completed_payments || 0}</p>
          </div>
          <div className="summary-card">
            <h3>Failed</h3>
            <p className="amount">{summary.failed_payments || 0}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="filters-section">
          <h3>Filter Payments</h3>
          <div className="filters-grid">
            <div className="filter-group">
              <label>Status</label>
              <select name="status" value={filters.status} onChange={handleFilterChange}>
                <option value="">All</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Client</label>
              <input
                type="text"
                name="client"
                value={filters.client}
                onChange={handleFilterChange}
                placeholder="Filter by client name"
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
            <div className="filter-group">
              <label>To Date</label>
              <input
                type="date"
                name="date_to"
                value={filters.date_to}
                onChange={handleFilterChange}
              />
            </div>
          </div>
        </div>

        {/* Payments Table */}
        <div className="payments-table-section">
          <table className="payments-table">
            <thead>
              <tr>
                <th>Payment Code</th>
                <th>Client</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Status</th>
                <th>Transaction Ref</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(payment => (
                <tr key={payment.id}>
                  <td>
                    <Link to={`/admin/payments/${payment.id}`}>
                      {payment.payment_code}
                    </Link>
                  </td>
                  <td>{payment.client_name}</td>
                  <td>{payment.currency} {payment.amount.toLocaleString()}</td>
                  <td>{payment.payment_method}</td>
                  <td>
                    <span className={`badge badge-${payment.status}`}>
                      {payment.status}
                    </span>
                  </td>
                  <td>{payment.transaction_ref || '-'}</td>
                  <td>{new Date(payment.created_at).toLocaleDateString()}</td>
                  <td className="actions">
                    {payment.status === 'pending' && (
                      <button
                        onClick={() => handleMarkCompleted(payment.id)}
                        className="btn btn-sm btn-success"
                      >
                        Mark Completed
                      </button>
                    )}
                    <button
                      onClick={() => handleGenerateReceipt(payment.id)}
                      className="btn btn-sm btn-outline"
                    >
                      Receipt
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Payments;