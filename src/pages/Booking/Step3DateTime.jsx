import React, { useState } from 'react';
import './Step3DateTime.css';

const Step3DateTime = ({ bookingData, onNext }) => {
  const [currentDateObj] = useState(new Date()); // Today (e.g., 2026)
  const currentYear = currentDateObj.getFullYear();
  const currentMonth = currentDateObj.getMonth();

  const initialDate = bookingData?.date 
    ? parseInt(bookingData.date.match(/\d+/)?.[0] || currentDateObj.getDate(), 10) 
    : currentDateObj.getDate();
  
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [selectedTime, setSelectedTime] = useState(bookingData?.time || '13:00');

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const currentMonthName = monthNames[currentMonth];

  // Calculate days in the current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Get start day offset (0 = Mon, 6 = Sun)
  let firstDay = new Date(currentYear, currentMonth, 1).getDay();
  firstDay = firstDay === 0 ? 6 : firstDay - 1;
  const emptySlots = Array.from({ length: firstDay }, (_, i) => i);

  const morningSlots = ['09:00', '09:30', '10:30'];
  const afternoonSlots = ['13:00', '14:00', '15:30', '17:00', '17:30'];
  const eveningSlots = ['18:00', '19:00'];

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      onNext({
        date: `${currentMonthName} ${selectedDate}, ${currentYear}`,
        time: selectedTime
      });
    }
  };

  return (
    <div className="step3-container">
      <div className="datetime-header-col">
        <span className="step-badge">STEP 03 / 04</span>
        <h1 className="specialist-title">Choose your <br /><span className="title-highlight">perfect time.</span></h1>
      </div>

      <div className="datetime-grid">
        {/* Left Side: Calendar */}
        <div className="calendar-card">
          <div className="calendar-header">
            <h3>{currentMonthName} {currentYear}</h3>
          </div>
          <div className="calendar-grid">
            <div className="cal-day-header">MON</div>
            <div className="cal-day-header">TUE</div>
            <div className="cal-day-header">WED</div>
            <div className="cal-day-header">THU</div>
            <div className="cal-day-header">FRI</div>
            <div className="cal-day-header">SAT</div>
            <div className="cal-day-header">SUN</div>

            {/* Empty days for offset based on the 1st of the month */}
            {emptySlots.map(slot => (
              <div key={`empty-${slot}`} className="cal-day empty"></div>
            ))}

            {days.map(day => {
              const isPast = day < currentDateObj.getDate();
              return (
                <div 
                  key={day} 
                  className={`cal-day ${selectedDate === day ? 'selected' : ''} ${isPast ? 'empty' : ''}`}
                  onClick={() => {
                    if (!isPast) setSelectedDate(day);
                  }}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Times & Summary */}
        <div className="times-summary-col">
          
          <div className="available-times-header">
            <h2>Available Times</h2>
          </div>

          <div className="time-section">
            <div className="time-section-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
              MORNING SLOTS
            </div>
            <div className="time-pills">
              {morningSlots.map(time => (
                <button 
                  key={time} 
                  className={`time-pill ${selectedTime === time ? 'selected' : ''}`}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <div className="time-section">
            <div className="time-section-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
              AFTERNOON SLOTS
            </div>
            <div className="time-pills">
              {afternoonSlots.map((time, idx) => (
                <button 
                  key={time} 
                  className={`time-pill ${selectedTime === time ? 'selected' : ''} ${idx >= 3 ? 'faded' : ''}`}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <div className="time-section">
            <div className="time-section-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
              EVENING SLOTS
            </div>
            <div className="time-pills">
              {eveningSlots.map(time => (
                <button 
                  key={time} 
                  className={`time-pill ${selectedTime === time ? 'selected' : ''}`}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Selected Details Dark Card */}
          <div className="selected-details-card">
            <h3 className="sd-title">Selected Details</h3>
            
            <div className="sd-row">
              <div className="sd-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11v6h2v-6h-2zm0-4v2h2V7h-2z"></path></svg>
              </div>
              <div className="sd-info">
                <span className="sd-label">SERVICE</span>
                <span className="sd-value">{bookingData?.service?.title || "No service selected"}</span>
              </div>
            </div>

            <div className="sd-row">
              <div className="sd-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              </div>
              <div className="sd-info">
                <span className="sd-label">DATE & TIME</span>
                <span className="sd-value">{currentMonthName.substring(0, 3)} {selectedDate} &bull; {selectedTime}</span>
              </div>
            </div>

            <button 
              className="btn-red sd-confirm-btn" 
              onClick={handleConfirm}
              disabled={!selectedDate || !selectedTime}
            >
              CONTINUE TO REVIEW
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Step3DateTime;