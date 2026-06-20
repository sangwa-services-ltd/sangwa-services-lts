import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/payments');
      setPayments(response.data);
    } catch (err) {
      setError('Failed to load payments');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading payments...</div>;

  return (
    <div className="payments-page">
      <div className="container">
        <h1>Payment History</h1>

        {error && <div className="error-message">{error}</div>}

        <table className="payments-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Package/Request</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Receipt</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(payment => (
              <tr key={payment.id}>
                <td>{new Date(payment.created_at).toLocaleDateString()}</td>
                <td>{payment.package_name || payment.request_code}</td>
                <td>{payment.currency} {payment.amount}</td>
                <td><span className={`badge badge-${payment.status}`}>{payment.status}</span></td>
                <td>
                  {payment.receipt && (
                    <a href={payment.receipt} download className="btn btn-sm">Download</a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payments;