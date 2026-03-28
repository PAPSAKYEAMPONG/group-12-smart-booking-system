import React, { useState } from 'react';
import './Step5Review.css';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const Step5Review = ({ bookingData, onConfirm }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirmBooking = async () => {
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'bookings'), {
        service: bookingData.service,
        specialist: bookingData.specialist,
        date: bookingData.date,
        time: bookingData.time,
        customerDetails: bookingData.details,
        createdAt: new Date().toISOString(),
        status: 'pending'
      });
      setIsSubmitting(false);
      onConfirm();
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("There was an error securing your appointment. Please check your connection and try again.");
      setIsSubmitting(false);
    }
  };

  const basePrice = parseInt(bookingData?.service?.price?.replace(/[^0-9]/g, '') || '0', 10);
  const ecoFee = 4.50;
  const total = (basePrice + ecoFee).toFixed(2);

  return (
    <div className="step5-container">
      <div className="review-header">
        <span className="step-badge">FINAL REVIEW</span>
        <h1 className="review-title">Your bespoke <br />experience.</h1>
      </div>

      {/* Main Review Card */}
      <div className="review-card-container">
        <div className="review-service-info">
          <h2 className="rs-title">{bookingData?.service?.title || 'Signature Editorial Cut & Style'}</h2>
          <p className="rs-duration">{bookingData?.service?.duration || '90 MIN'} of Artistry</p>
          
          <div className="rs-stylist-section">
            <span className="rs-label">STYLIST</span>
            <p className="rs-stylist-name">{bookingData?.specialist || 'Julian Thorne'}</p>
          </div>
        </div>

        <div className="review-datetime-box">
          <svg className="rd-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          <h3 className="rd-date">{bookingData?.date || 'Tuesday, October 24'}</h3>
          <span className="rd-label">Arrival Time</span>
          <p className="rd-time">{bookingData?.time || '14:30'}</p>
        </div>
      </div>

      {/* Investment Details */}
      <div className="review-section">
        <h4 className="section-heading">INVESTMENT DETAILS</h4>
        <div className="investment-box">
          <div className="inv-row">
            <span>Service Base Rate</span>
            <span>GH₵{basePrice.toFixed(2)}</span>
          </div>
          <div className="inv-row">
            <span>Eco-Sustainability Fee</span>
            <span>GH₵{ecoFee.toFixed(2)}</span>
          </div>
          <div className="inv-divider"></div>
          <div className="inv-row inv-total-row">
            <div className="inv-total-label">TOTAL DUE</div>
            <div className="inv-total-price">
              GH₵{total}
              <span className="tax-badge">TAX INCLUDED</span>
            </div>
          </div>
        </div>
      </div>

      {/* Studio Policies */}
      <div className="review-section">
        <h4 className="section-heading">STUDIO POLICIES</h4>
        <div className="policies-grid">
          <div className="policy-card">
            <div className="policy-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              Cancellation
            </div>
            <p>Please provide 24-hour notice for cancellations to avoid a 50% service fee.</p>
          </div>
          <div className="policy-card">
            <div className="policy-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              Grace Period
            </div>
            <p>We offer a 15-minute grace period. Late arrivals may require service adjustment.</p>
          </div>
        </div>
      </div>

      {/* Confirm Button */}
      <div className="review-actions">
        <button 
          className="btn-dark final-confirm-btn" 
          onClick={handleConfirmBooking} 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Confirming...' : 'Confirm Booking'}
          {!isSubmitting && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>}
        </button>
        <p className="terms-text">BY CONFIRMING, YOU AGREE TO OUR TERMS OF SERVICE.</p>
      </div>

    </div>
  );
};

export default Step5Review;