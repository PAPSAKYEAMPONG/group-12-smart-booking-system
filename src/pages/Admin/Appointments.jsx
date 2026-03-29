import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import './Appointments.css';

const Appointments = () => {
  const [todaysBookings, setTodaysBookings] = useState([]);
  const [dailyRevenue, setDailyRevenue] = useState(0);
  const [activeTeam, setActiveTeam] = useState([]);

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'
  ];

  useEffect(() => {
    const fetchTodaysBookings = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'bookings'));
        const allBookings = [];
        querySnapshot.forEach((doc) => {
          allBookings.push({ id: doc.id, ...doc.data() });
        });

        const today = new Date();
        const isToday = (dateStr) => {
          if (!dateStr) return false;
          const d = new Date(dateStr);
          if (isNaN(d)) return dateStr.toString().includes(today.getDate().toString());
          return d.getDate() === today.getDate() && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
        };

        const todayArray = allBookings.filter(b => isToday(b.date));
        
        setTodaysBookings(todayArray);

        const rev = todayArray.reduce((sum, b) => sum + parseInt(b.service?.price?.replace(/[^0-9]/g, '') || 0), 0);
        setDailyRevenue(rev);

        const staffMap = {};
        todayArray.forEach(b => {
          if (b.specialist) {
            staffMap[b.specialist] = (staffMap[b.specialist] || 0) + 1;
          }
        });

        const activeArr = Object.keys(staffMap).map((name, index) => {
          const count = staffMap[name];
          return {
            name,
            role: "Salon Professional",
            status: count > 1 ? 'Fully Booked' : `${count} Bookings Left`,
            colorClass: ['green', 'pink', 'gray'][index % 3]
          };
        });
        
        setActiveTeam(activeArr);

      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    fetchTodaysBookings();
  }, []);

  const getInitials = (firstName, lastName) => {
    if (!firstName) return 'C';
    if (!lastName) return firstName[0].toUpperCase();
    return (firstName[0] + lastName[0]).toUpperCase();
  };

  // Dynamic Calendar Logic
  const today = new Date();
  const currentMonthYear = today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }).toUpperCase();
  const currentDay = today.getDay(); 
  const adjustedDay = currentDay === 0 ? 6 : currentDay - 1;
  
  const weekDates = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - adjustedDay + i);
    weekDates.push({
      date: d.getDate(),
      isToday: d.getDate() === today.getDate() && d.getMonth() === today.getMonth()
    });
  }
  
  const dayNames = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <div className="appt-container">
      {/* Left Timeline Panel */}
      <div className="timeline-panel">
        
        <div className="timeline-header">
          <div className="date-nav">
            <button className="nav-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg></button>
            <h3 className="current-date-lbl">Today</h3>
            <button className="nav-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg></button>
          </div>
          
          <div className="legend-badges">
            <span className="legend-badge booked"><span className="dot pink"></span> Booked</span>
            <span className="legend-badge available"><span className="dot gray"></span> Available</span>
          </div>
        </div>

        <div className="timeline-grid">
          
          {timeSlots.map((slot, index) => {
            const isMatchingTime = (bkTime, slotStr) => {
               if (!bkTime) return false;
               let hour12;
               let ampm;
               
               if (bkTime.includes(':')) {
                 const [hPart] = bkTime.split(':');
                 const h = parseInt(hPart, 10);
                 
                 if (bkTime.toUpperCase().includes('AM')) {
                   hour12 = h;
                   ampm = 'AM';
                 } else if (bkTime.toUpperCase().includes('PM')) {
                   hour12 = h;
                   ampm = 'PM';
                 } else { // 24-hr format
                   ampm = h >= 12 ? 'PM' : 'AM';
                   hour12 = h % 12 || 12;
                 }
               }
               
               const slotHour = parseInt(slotStr.split(':')[0], 10);
               const slotAmPm = slotStr.split(' ')[1];
               return hour12 === slotHour && ampm === slotAmPm;
            };
            
            const b = todaysBookings.find(bk => isMatchingTime(bk.time, slot));
            const isCurrentTimeSlot = index === 3; 
            
            return (
              <React.Fragment key={slot}>
                <div className={`time-row ${!b ? 'empty-row' : ''}`}>
                  <div className="time-lbl">{slot}</div>
                  <div className="time-content">
                    {b ? (
                      <div className={`appt-card ${index % 2 === 0 ? 'dark-appt' : 'light-appt slim-appt'}`}>
                        <div className="appt-client-info">
                          <div className={`customer-badge badge-${index % 2 === 0 ? 'dark' : 'pink'}`} style={{width: 55, height: 55, fontSize: '1.2rem', flexShrink: 0}}>
                             {getInitials(b.customerDetails?.firstName, b.customerDetails?.lastName)}
                          </div>
                          <div className="appt-details">
                            <h4>{b.customerDetails?.firstName} {b.customerDetails?.lastName}</h4>
                            <p>{b.service?.title} — <span className="stylist-name">{b.specialist}</span></p>
                          </div>
                        </div>
                        {index % 2 === 0 ? (
                          <div className="appt-actions">
                            <button className="icon-btn circle-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg></button>
                          </div>
                        ) : (
                          <button className="action-menu-btn">⋮</button>
                        )}
                      </div>
                    ) : (
                      <div className="empty-slot"></div>
                    )}
                  </div>
                </div>

                {/* Current Time Indicator Line */}
                {isCurrentTimeSlot && (
                  <div className="current-time-indicator">
                    <span className="time-dot"></span>
                    <hr className="time-line" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Right Sidebar Widget Panel */}
      <div className="appt-widgets">
        
        {/* Daily Revenue */}
        <div className="revenue-widget">
          <span className="widget-label">DAILY REVENUE</span>
          <h2 className="revenue-val">GH₵{dailyRevenue.toLocaleString()}</h2>
          <div className="revenue-trend">
            <span className="trend-badge">+12%</span>
            <span className="trend-text">vs. yesterday</span>
          </div>
        </div>

        {/* Team Active */}
        <div className="team-widget">
          <div className="widget-header">
            <h3>Team Active</h3>
            <a href="#view-all">VIEW ALL</a>
          </div>
          
          <div className="team-list">
            
            {activeTeam.length === 0 ? (
               <p style={{color: '#888', fontSize: '0.85rem'}}>No staff active today.</p>
            ) : (
              activeTeam.map((staff, i) => (
                <div className="team-member" key={i}>
                  <div className="member-avatar-wrapper">
                     <div className="micro-avatar" style={{width: 45, height: 45, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f4f4f4', fontWeight: 'bold', color: '#111'}}>
                        {staff.name[0]}
                     </div>
                    <span className={`status-dot ${staff.colorClass}`}></span>
                  </div>
                  <div className="member-info">
                    <h4>{staff.name}</h4>
                    <p>{staff.role}</p>
                  </div>
                  <div className="member-status">
                    <span className={`status-val ${staff.colorClass === 'gray' ? 'italic' : (staff.colorClass === 'pink' ? 'pink-text' : '')}`}>{staff.status}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Mini Calendar */}
        <div className="calendar-widget">
          <div className="cal-header">
            <h3>{currentMonthYear}</h3>
            <div className="cal-nav">
              <button><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg></button>
              <button><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg></button>
            </div>
          </div>
          <div className="cal-grid">
            {dayNames.map((name, i) => (
              <div key={`name-${i}`} className={`cal-day-name ${weekDates[i].isToday ? 'pink-text' : ''}`}>
                {name}
              </div>
            ))}

            {weekDates.map((d, i) => (
              <div key={`date-${i}`} className={`cal-day ${d.isToday ? 'active-day' : ''}`}>
                {d.date}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Appointments;
