import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProviderRatings = () => {
  const [ratings, setRatings] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRatings();
  }, []);

  const fetchRatings = async () => {
    try {
      setLoading(true);
      const [ratingsRes, reviewsRes] = await Promise.all([
        axios.get('/api/providers/ratings'),
        axios.get('/api/providers/reviews')
      ]);
      setRatings(ratingsRes.data);
      setReviews(reviewsRes.data);
    } catch (err) {
      setError('Failed to load ratings');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading ratings...</div>;

  return (
    <div className="provider-ratings-page">
      <div className="container">
        <h1>My Ratings & Reviews</h1>

        {error && <div className="error-message">{error}</div>}

        {ratings && (
          <div className="ratings-summary">
            <div className="rating-card">
              <div className="overall-rating">
                <p className="label">Overall Rating</p>
                <p className="rating">{ratings.average_rating ? ratings.average_rating.toFixed(1) : 0}/5</p>
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`star ${i < Math.round(ratings.average_rating) ? 'filled' : ''}`}>★</span>
                  ))}
                </div>
              </div>
              <div className="rating-stats">
                <p><strong>Total Reviews:</strong> {ratings.total_reviews || 0}</p>
                <p><strong>Completion Rate:</strong> {ratings.completion_rate?.toFixed(1) || 0}%</p>
                <p><strong>Response Time Score:</strong> {ratings.response_speed_score?.toFixed(1) || 0}/5</p>
                <p><strong>Reliability Score:</strong> {ratings.reliability_score?.toFixed(1) || 0}/5</p>
              </div>
            </div>
          </div>
        )}

        <div className="reviews-section">
          <h2>Recent Reviews</h2>
          {reviews.length > 0 ? (
            <div className="reviews-list">
              {reviews.map(review => (
                <div key={review.id} className="review-card">
                  <div className="review-header">
                    <div className="reviewer-info">
                      <p className="reviewer-name">{review.client_name}</p>
                      <p className="review-date">{new Date(review.created_at).toLocaleDateString()}</p>
                    </div>
                    <div className="review-rating">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`star ${i < review.rating ? 'filled' : ''}`}>★</span>
                      ))}
                    </div>
                  </div>
                  <p className="review-text">{review.comments}</p>
                  {review.request_code && (
                    <p className="request-ref">For Request: {review.request_code}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No reviews yet. Complete more jobs to receive reviews!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProviderRatings;