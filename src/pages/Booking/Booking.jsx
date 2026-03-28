import React, { useState } from 'react';
import './Booking.css';
import Step1Service from './Step1Service';
import Step2Specialist from './Step2Specialist';
import Step3DateTime from './Step3DateTime';
import Step4Details from './Step4Details';
import Step5Review from './Step5Review';

const STEPS = [
  { id: 1, label: 'Service' },
  { id: 2, label: 'Specialist' },
  { id: 3, label: 'Date & Time' },
  { id: 4, label: 'Your Details' },
  { id: 5, label: 'Confirmation' },
];

const Booking = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    service: null,
    specialist: null,
    date: null,
    time: null,
  });

  const handleServiceSelect = (service) => {
    setBookingData({ ...bookingData, service });
    setCurrentStep(2);
  };

  const isStepClickable = (stepId) => {
    if (stepId === 1) return true;
    if (stepId === 2) return !!bookingData.service;
    if (stepId === 3) return !!bookingData.specialist;
    if (stepId === 4) return !!bookingData.date && !!bookingData.time;
    if (stepId === 5) return !!bookingData.details;
    return false;
  };

  const handleStepClick = (stepId) => {
    if (isStepClickable(stepId)) {
      setCurrentStep(stepId);
    }
  };

  return (
    <div className="booking-container">
      {/* Progress Bar */}
      <div className="progress-container">
        <div className="progress-steps">
          {STEPS.map((step, index) => {
            const clickable = isStepClickable(step.id);
            return (
              <React.Fragment key={step.id}>
                <div 
                  className="step-wrapper"
                  onClick={() => handleStepClick(step.id)}
                  style={{ cursor: clickable ? 'pointer' : 'default', opacity: (!clickable && step.id > currentStep) ? 0.5 : 1 }}
                >
                  <div className={`step-circle ${currentStep >= step.id ? 'active' : ''}`}>
                    {step.id}
                  </div>
                  <span className={`step-label ${currentStep >= step.id ? 'active-label' : ''}`}>
                    {step.label}
                  </span>
                </div>
                {index < STEPS.length - 1 && (
                  <div className={`step-line ${currentStep > step.id ? 'active-line' : ''}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <div className="booking-content">
        {currentStep === 1 && (
          <Step1Service 
            onSelectService={handleServiceSelect} 
            selectedService={bookingData.service} 
          />
        )}
        {currentStep === 2 && (
          <Step2Specialist 
            onSelectSpecialist={(specialist) => {
              setBookingData({ ...bookingData, specialist });
              setCurrentStep(3);
            }} 
            selectedSpecialist={bookingData.specialist}
          />
        )}
        {currentStep === 3 && (
          <Step3DateTime 
            bookingData={bookingData}
            onNext={(selection) => {
              setBookingData({ ...bookingData, date: selection.date, time: selection.time });
              setCurrentStep(4);
            }} 
          />
        )}
        {currentStep === 4 && (
          <Step4Details 
            bookingData={bookingData}
            onNext={(details) => {
              setBookingData({ ...bookingData, details });
              setCurrentStep(5);
            }} 
          />
        )}
        {currentStep === 5 && (
          <Step5Review 
            bookingData={bookingData} 
            onConfirm={() => {
              alert('Thank you! Your GraceSalon bespoke appointment is confirmed.');
              // In a real app we'd trigger an API call and navigate to a success summary/home.
              window.location.href = '/';
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Booking;