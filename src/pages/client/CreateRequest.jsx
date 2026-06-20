import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateRequest = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [categories, setCategories] = useState([]);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    category_id: '',
    package_id: '',
    requirements: '',
    preferred_timeline: '',
    additional_notes: '',
    documents: null
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (formData.category_id) {
      fetchPackages(formData.category_id);
    }
  }, [formData.category_id]);

  const fetchInitialData = async () => {
    try {
      const response = await axios.get('/api/services');
      setCategories(response.data);
    } catch (err) {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const fetchPackages = async (categoryId) => {
    try {
      const response = await axios.get(`/api/packages?category_id=${categoryId}`);
      setPackages(response.data);
    } catch (err) {
      console.error('Failed to load packages');
    }
  };

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

  const handleNext = () => {
    if (step === 1 && !formData.category_id) {
      setError('Please select a category');
      return;
    }
    setError(null);
    setStep(step + 1);
  };

  const handleBack = () => {
    setError(null);
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
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

      const response = await axios.post('/api/requests', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      navigate(`/client/requests/${response.data.id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create request');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="create-request-page">
      <div className="container">
        <h1>Create Service Request</h1>
        <div className="steps-indicator">
          {[1, 2, 3, 4].map(s => (
            <div key={s} className={`step ${s === step ? 'active' : ''} ${s < step ? 'completed' : ''}`}>
              <span>{s}</span>
            </div>
          ))}
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* Step 1: Category & Package */}
          {step === 1 && (
            <div className="form-step">
              <h2>Step 1: Select Category and Package</h2>
              <div className="form-group">
                <label>Category *</label>
                <select
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              {formData.category_id && (
                <div className="form-group">
                  <label>Package</label>
                  <select
                    name="package_id"
                    value={formData.package_id}
                    onChange={handleChange}
                  >
                    <option value="">Select a package (optional)</option>
                    {packages.map(pkg => (
                      <option key={pkg.id} value={pkg.id}>{pkg.name} - {pkg.currency} {pkg.price}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Requirements */}
          {step === 2 && (
            <div className="form-step">
              <h2>Step 2: Describe Your Requirements</h2>
              <div className="form-group">
                <label>Requirements *</label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  placeholder="Describe what you need"
                  required
                />
              </div>
              <div className="form-group">
                <label>Preferred Timeline</label>
                <input
                  type="text"
                  name="preferred_timeline"
                  value={formData.preferred_timeline}
                  onChange={handleChange}
                  placeholder="e.g., Within 1 week"
                />
              </div>
              <div className="form-group">
                <label>Additional Notes</label>
                <textarea
                  name="additional_notes"
                  value={formData.additional_notes}
                  onChange={handleChange}
                  placeholder="Any additional information"
                />
              </div>
            </div>
          )}

          {/* Step 3: Upload Files */}
          {step === 3 && (
            <div className="form-step">
              <h2>Step 3: Upload Supporting Documents</h2>
              <div className="form-group">
                <label>Upload Files (Optional)</label>
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                />
                <p className="help-text">You can upload images, PDFs, or other relevant documents</p>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <div className="form-step">
              <h2>Step 4: Review Your Request</h2>
              <div className="review-section">
                <p><strong>Category:</strong> {categories.find(c => c.id == formData.category_id)?.name}</p>
                {formData.package_id && <p><strong>Package:</strong> {packages.find(p => p.id == formData.package_id)?.name}</p>}
                <p><strong>Requirements:</strong> {formData.requirements}</p>
                {formData.preferred_timeline && <p><strong>Timeline:</strong> {formData.preferred_timeline}</p>}
                {formData.additional_notes && <p><strong>Notes:</strong> {formData.additional_notes}</p>}
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="form-buttons">
            {step > 1 && (
              <button type="button" onClick={handleBack} className="btn btn-secondary">Back</button>
            )}
            {step < 4 && (
              <button type="button" onClick={handleNext} className="btn btn-primary">Next</button>
            )}
            {step === 4 && (
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? 'Submitting...' : 'Submit Request'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRequest;