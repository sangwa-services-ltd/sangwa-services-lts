import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [services, setServices] = useState([]);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [servicesRes, packagesRes] = await Promise.all([
        axios.get('/api/services'),
        axios.get('/api/packages')
      ]);
      setServices(servicesRes.data);
      setPackages(packagesRes.data);
      setError(null);
    } catch (err) {
      setError('Failed to load data. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-page">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="logo">Sangwa Services</div>
          <nav className="nav">
            <a href="#services">Services</a>
            <a href="#packages">Packages</a>
            <a href="#faq">FAQ</a>
            <Link to="/login">Login</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Trusted Service Coordination in Rwanda</h1>
          <p>Connect with vetted service providers through a single point of contact</p>
          <div className="hero-buttons">
            <Link to="/request-service" className="btn btn-primary">Request Service</Link>
            <Link to="/become-provider" className="btn btn-secondary">Become Provider</Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-us">
        <div className="container">
          <h2>Why Choose Us</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Fast</h3>
              <p>Quick service coordination and provider matching</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✓</div>
              <h3>Trusted</h3>
              <p>All providers are vetted and verified</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏢</div>
              <h3>Reliable</h3>
              <p>Consistent quality service delivery</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h3>Professional</h3>
              <p>Expert coordinators handling every request</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="services" id="services">
        <div className="container">
          <h2>Our Services</h2>
          {loading ? (
            <p className="loading">Loading services...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : (
            <div className="services-grid">
              {services.map((service) => (
                <div key={service.id} className="service-card">
                  <div className="service-icon">{service.icon}</div>
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="container">
          <h2>How It Works</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Request</h3>
              <p>Create and submit your service request</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Coordinator Assigned</h3>
              <p>We assign a dedicated coordinator</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Provider Selected</h3>
              <p>Best provider matched to your needs</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Service Delivered</h3>
              <p>Service completed to your satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="packages" id="packages">
        <div className="container">
          <h2>Our Packages</h2>
          {loading ? (
            <p className="loading">Loading packages...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : (
            <div className="packages-grid">
              {packages.map((pkg) => (
                <div key={pkg.id} className="package-card">
                  <h3>{pkg.name}</h3>
                  <div className="price">{pkg.currency} {pkg.price}</div>
                  <p>{pkg.description}</p>
                  <ul className="features">
                    {pkg.features && pkg.features.map((feature, idx) => (
                      <li key={idx}>✓ {feature}</li>
                    ))}
                  </ul>
                  <button className="btn btn-primary">Choose Plan</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="container">
          <h2>Testimonials</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p>"Excellent service coordination. Highly recommended!"</p>
              <p className="author">- John Doe</p>
            </div>
            <div className="testimonial-card">
              <p>"Professional and reliable. Made my relocation so easy."</p>
              <p className="author">- Jane Smith</p>
            </div>
            <div className="testimonial-card">
              <p>"Best service I've experienced in Rwanda."</p>
              <p className="author">- Paul Johnson</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq" id="faq">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          <div className="accordion">
            <details>
              <summary>How does Sangwa Services work?</summary>
              <p>You submit a service request, we assign a coordinator, they identify the best provider, and the service is delivered to your satisfaction.</p>
            </details>
            <details>
              <summary>Are the providers verified?</summary>
              <p>Yes, all providers go through a thorough verification process before being approved to work with us.</p>
            </details>
            <details>
              <summary>What payment methods do you accept?</summary>
              <p>We accept mobile money, bank transfers, cards, and cash payments.</p>
            </details>
            <details>
              <summary>Can I track my request?</summary>
              <p>Yes, you can track your request status in real-time through your client portal.</p>
            </details>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2026 Sangwa Services Ltd. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;