# Sangwa Services Ltd

## Trusted Concierge & Service Coordination Platform for Rwanda

Sangwa Services Ltd is a premium concierge, coordination, and service aggregation company that connects individuals and organizations with trusted, vetted service providers through a single point of contact.

Rather than directly delivering most services, Sangwa Services acts as a trusted intermediary that simplifies service discovery, provider selection, coordination, communication, monitoring, and customer support.

The platform serves expatriates, diaspora investors, tourists, business travelers, entrepreneurs, NGOs, embassies, local professionals, and households seeking reliable access to services across Rwanda.

---

## Mission

To simplify access to trusted services through professional coordination, local expertise, and exceptional customer support.

## Vision

To become East Africa's most trusted concierge and service coordination platform.

---

## Value Proposition

Sangwa Services addresses three major customer challenges:

### Service Discovery

Finding reliable service providers can be difficult and time-consuming.

### Trust

Customers often face uncertainty regarding quality, reliability, pricing, and accountability.

### Coordination

Managing multiple providers and service requests consumes significant time and effort.

Sangwa Services eliminates these challenges through a curated provider network, structured coordination processes, and dedicated customer support.

---

# Business Operating Model

```text
Customer
    ↓
Sangwa Services
    ↓
Verified Service Providers
    ↓
Service Delivery
```

Sangwa Services acts as the coordination layer between customers and service providers by:

* Managing communications
* Coordinating engagements
* Monitoring progress
* Providing customer support
* Tracking service quality
* Managing escalations

Providers remain responsible for actual service delivery.

---

# Customer Journey

## 1. Service Discovery

Customers discover Sangwa Services through:

* Website
* WhatsApp
* Social Media
* Referrals
* Strategic Partnerships

## 2. Service Request

Customers submit:

* Service category
* Selected package
* Requirements
* Timeline
* Additional expectations

Requests are submitted through the web application.

## 3. Consultation

A service representative:

* Reviews requirements
* Clarifies expectations
* Recommends options
* Confirms package selection

## 4. Payment

Upon payment:

* Service case is opened
* Coordinator is assigned
* Receipt is generated
* Compliance with RDB and RRA regulations is maintained

## 5. Provider Identification

The coordination team:

* Reviews provider database
* Verifies availability
* Shortlists suitable providers
* Performs quality checks

## 6. Client Approval

The client:

* Reviews recommendations
* Evaluates quotations
* Selects preferred provider

## 7. Direct Provider Engagement

The selected provider enters a direct service relationship with the client.

## 8. Service Coordination

Depending on the package level, Sangwa Services may:

* Schedule appointments
* Coordinate logistics
* Monitor progress
* Facilitate communication
* Escalate issues

## 9. Service Completion

Upon completion:

* Customer satisfaction is confirmed
* Feedback is collected
* Provider ratings are updated

## 10. Aftercare Support

Premium packages may include:

* Follow-up assistance
* Ongoing coordination
* Priority support
* Future service facilitation

---

# Service Categories

Current service categories include:

* Hospitality & Short Stay
* Relocation Concierge
* Mobility & Transport
* Construction & Property
* Business & Professional Services
* Everyday Services

Additional categories may be introduced based on market demand.

---

# Revenue Model

## Primary Revenue Sources

* Service Packages
* Concierge Plans
* Corporate Retainers
* Subscription Programs

## Secondary Revenue Sources

* Referral Commissions
* Strategic Partnerships
* Premium Placement Opportunities

---

# Technology Stack

## Frontend

* React.js

## Backend

* PHP (OOP + Procedural Hybrid)

## Database

* MySQL

## Infrastructure

* Ubuntu Server 24.04 LTS
* NGINX
* KM1 VPS Hosting

## Authentication

* Session-Based Authentication

---

# Platform Architecture

## Public Website

### Pages

* Home
* About Us
* Services
* Service Packages
* Become a Provider
* Contact Us
* FAQ
* Login

---

## Client Portal

### Features

#### Dashboard

* Active Requests
* Request Status
* Assigned Coordinator
* Notifications

#### Service Requests

* Submit Request
* Upload Documents
* Add Requirements
* View Request History

#### Payments

* Package Payments
* Receipts
* Payment History

#### Messages

* Coordinator Communication
* Notifications

#### Profile

* Personal Information
* Preferences
* Account Settings

---

## Provider Portal

### Features

* Provider Dashboard
* Opportunity Management
* Availability Updates
* Profile Management
* Rating Visibility
* Quotation Submission
* Service History

---

## Admin Portal

### Dashboard Metrics

* Total Clients
* Active Requests
* Revenue
* Providers
* Coordinators
* Customer Satisfaction

### Analytics

* Revenue Trends
* Service Demand
* Provider Performance
* Coordinator Performance
* SLA Compliance

---

# Admin Operations Structure

## Super Administrator

* Full System Access
* User Management
* Provider Approval
* Revenue Oversight
* System Configuration

## Operations Manager

* Request Assignment
* Service Monitoring
* Escalation Management
* Reporting

## Service Coordinator

* Client Communication
* Provider Coordination
* Progress Tracking
* Case Resolution

## Finance Officer

* Payment Verification
* Receipt Management
* Revenue Reporting

## Support Officer

* Customer Support
* Ticket Management
* Follow-Ups
* Feedback Collection

---

# Request Workflow

```text
Create Request
      ↓
Review Request
      ↓
Assign Coordinator
      ↓
Find Providers
      ↓
Client Approval
      ↓
Service Coordination
      ↓
Completion
      ↓
Feedback
```

---

# Provider Management

All providers undergo a structured vetting process based on:

* Business Legitimacy
* Experience
* Reputation
* References
* Responsiveness
* Service Quality

Provider performance is continuously monitored through customer feedback and operational metrics.

---

# Security & Compliance

## Role-Based Access Control (RBAC)

Supported roles:

* Super Administrator
* Operations Manager
* Finance Officer
* Service Coordinator
* Support Officer

## Audit Trail

All critical activities are logged, including:

* Login Activity
* Assignments
* Status Changes
* Payments
* Administrative Actions

---

# Success Metrics

The platform measures success through:

* Customer Satisfaction Score
* Repeat Customer Rate
* Provider Quality Score
* Average Response Time
* Service Completion Rate
* Referral Rate
* Revenue Per Customer
* Corporate Retention Rate

---

# Brand Promise

### FAST

Quick response and execution.

### TRUSTED

Verified providers and transparent communication.

### CONVENIENT

One point of contact for multiple services.

### PROFESSIONAL

High service standards and accountability.

### RELIABLE

Consistent follow-through until resolution.

---

## Status

🚧 Project currently under development.

The Sangwa Services Platform is being built to provide a scalable, transparent, and technology-driven concierge and service coordination ecosystem for Rwanda and the East African market.
README NOTES FOR DEVELOPERS
Architecture
Frontend:
React
React Router
Axios
Context API
TailwindCSS
Backend:
PHP
OOP + Procedural Hybrid
Session Authentication
Database:
MySQL 8
Server:
Ubuntu 24.04
NGINX
KM1 VPS
Coding Rules
Every CRUD action must create an audit log.
Every request status change must create:
request_status_history
request_activities
records.
Never hardcode statuses.
Use:
request_statuses
table.
Every uploaded file must be validated.
Every notification must be queued through:
notifications
table.
Every permission check must use RBAC.
Every page must check session authentication.
Soft delete wherever possible.
Use transactions for:
Payments
Receipts
Request assignment
Provider approval
Every module must expose:
List
View
Create
Update
Delete
where applicable.

