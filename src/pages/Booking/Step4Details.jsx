import React, { useState } from 'react';
import './Step4Details.css';

const Step4Details = ({ bookingData, onNext }) => {
  const [formData, setFormData] = useState(bookingData?.details || {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    requests: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.firstName && formData.lastName && formData.email) {
      onNext(formData);
    }
  };

  const isFormValid = formData.firstName && formData.lastName && formData.email && formData.phone;

  return (
    <div className="step4-details-container">
      <div className="details-header-col">
        <span className="step-badge">STEP 04 / 05</span>
        <h1 className="specialist-title">Your <br /><span className="title-highlight">Information.</span></h1>
        <p className="specialist-subtitle">
          Please provide your details so we can confirm your bespoke appointment.
        </p>
      </div>

      <div className="details-form-card">
        <form className="booking-form" onSubmit={handleSubmit}>

          <div className="form-row-group">
            <div className="form-group-booking">
              <label>First Name *</label>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required placeholder="First name" />
            </div>
            <div className="form-group-booking">
              <label>Last Name *</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required placeholder="Last name" />
            </div>
          </div>

          <div className="form-row-group">
            <div className="form-group-booking">
              <label>Email Address *</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="you@example.com" />
            </div>
            <div className="form-group-booking">
              <label>Phone Number *</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+233 -- --- ----" />
            </div>
          </div>

          <div className="form-group-booking full-width">
            <label>Special Requests / Notes</label>
            <textarea name="requests" rows="4" value={formData.requests} onChange={handleChange} placeholder="Any allergies, specific styling requests, or important notes we should know..."></textarea>
          </div>

          <button type="submit" className="btn-red next-step-btn" disabled={!isFormValid}>
            CONTINUE TO REVIEW
          </button>
        </form>
      </div>
    </div>
  );
};

export default Step4Details;