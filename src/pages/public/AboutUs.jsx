import React from 'react';

const AboutUs = () => {
  return (
    <div className="about-us-page">
      <div className="container">
        <h1>About Sangwa Services</h1>

        <section className="company-story">
          <h2>Our Story</h2>
          <p>
            Sangwa Services Ltd was founded with a vision to simplify service coordination in Rwanda.
            We recognized the challenge individuals and organizations face in finding reliable, vetted
            service providers. Our solution connects clients with trusted professionals through a single
            point of contact, ensuring quality, reliability, and professionalism.
          </p>
        </section>

        <section className="mission-vision">
          <div className="mission">
            <h2>Our Mission</h2>
            <p>
              To empower clients and service providers by creating a seamless, transparent platform
              that connects them through trusted coordinators, delivering exceptional value and quality.
            </p>
          </div>
          <div className="vision">
            <h2>Our Vision</h2>
            <p>
              To become the leading service coordination platform in Rwanda, known for reliability,
              innovation, and customer satisfaction.
            </p>
          </div>
        </section>

        <section className="core-values">
          <h2>Core Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>Integrity</h3>
              <p>We operate with honesty and transparency in all dealings</p>
            </div>
            <div className="value-card">
              <h3>Excellence</h3>
              <p>We strive for the highest quality in every interaction</p>
            </div>
            <div className="value-card">
              <h3>Trust</h3>
              <p>We build lasting relationships based on reliability</p>
            </div>
            <div className="value-card">
              <h3>Innovation</h3>
              <p>We continuously improve our platform and services</p>
            </div>
            <div className="value-card">
              <h3>Customer Focus</h3>
              <p>We prioritize customer satisfaction above all</p>
            </div>
            <div className="value-card">
              <h3>Accountability</h3>
              <p>We take responsibility for our actions and results</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;