// components/AvailabilityChecker.js
import { useState } from 'react';

export default function AvailabilityChecker({ carId, carName }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [availability, setAvailability] = useState(null);
  const [checking, setChecking] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  // Mock availability data for demonstration
  const mockAvailability = {
    '2024-01-15': true,
    '2024-01-16': false,
    '2024-01-17': true,
    '2024-01-18': true,
    '2024-01-19': false,
    '2024-01-20': true,
    '2024-01-21': true,
    '2024-01-22': false,
    '2024-01-23': true,
    '2024-01-24': true,
    '2024-01-25': true,
  };

  const checkAvailability = async () => {
    if (!startDate || !endDate) return;

    setChecking(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock availability check
    const start = new Date(startDate);
    const end = new Date(endDate);
    let allAvailable = true;
    let unavailableDates = [];

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0];
      if (!mockAvailability[dateStr]) {
        allAvailable = false;
        unavailableDates.push(dateStr);
      }
    }

    setAvailability({
      available: allAvailable,
      unavailableDates,
      totalDays: Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1
    });
    setChecking(false);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    setAvailability(null);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
    setAvailability(null);
  };

  const getNextAvailableDate = () => {
    if (!availability || availability.available) return null;
    
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      if (mockAvailability[dateStr]) {
        return dateStr;
      }
    }
    return null;
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const clearDates = () => {
    setStartDate('');
    setEndDate('');
    setAvailability(null);
  };

  const isDateRangeValid = startDate && endDate && new Date(endDate) > new Date(startDate);

  return (
    <div className="availability-checker-container">
      <div className="availability-header">
        <h3>Check Availability</h3>
        <p>Check if {carName} is available for your desired dates</p>
      </div>

      <div className="date-selection">
        <div className="date-input-group">
          <label className="input-label">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            className="date-input"
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        <div className="date-separator">→</div>

        <div className="date-input-group">
          <label className="input-label">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            className="date-input"
            min={startDate || new Date().toISOString().split('T')[0]}
            disabled={!startDate}
          />
        </div>
      </div>

      <div className="availability-actions">
        <button
          onClick={clearDates}
          className="clear-btn"
          disabled={!startDate && !endDate}
        >
          Clear
        </button>
        
        <button
          onClick={checkAvailability}
          className="check-btn"
          disabled={!isDateRangeValid || checking}
        >
          {checking ? (
            <>
              <div className="spinner"></div>
              Checking...
            </>
          ) : (
            'Check Availability'
          )}
        </button>
      </div>

      {availability && (
        <div className={`availability-result ${availability.available ? 'available' : 'unavailable'}`}>
          <div className="result-icon">
            {availability.available ? '✓' : '✗'}
          </div>
          
          <div className="result-content">
            <h4 className="result-title">
              {availability.available ? 'Available!' : 'Not Available'}
            </h4>
            
            <p className="result-message">
              {availability.available ? (
                `Perfect! ${carName} is available for your ${availability.totalDays}-day rental.`
              ) : (
                `Sorry, ${carName} is not available for the selected dates.`
              )}
            </p>

            {!availability.available && availability.unavailableDates.length > 0 && (
              <div className="unavailable-dates">
                <p>Unavailable on:</p>
                <ul>
                  {availability.unavailableDates.slice(0, 3).map(date => (
                    <li key={date}>{formatDate(date)}</li>
                  ))}
                  {availability.unavailableDates.length > 3 && (
                    <li>+{availability.unavailableDates.length - 3} more dates</li>
                  )}
                </ul>
              </div>
            )}

            {!availability.available && (
              <div className="suggestion">
                <p>Next available date: {formatDate(getNextAvailableDate())}</p>
                <button 
                  className="suggestion-btn"
                  onClick={() => {
                    if (getNextAvailableDate()) {
                      setStartDate(getNextAvailableDate());
                      const nextEnd = new Date(getNextAvailableDate());
                      nextEnd.setDate(nextEnd.getDate() + (availability.totalDays || 1));
                      setEndDate(nextEnd.toISOString().split('T')[0]);
                      setAvailability(null);
                    }
                  }}
                >
                  Select These Dates
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="calendar-toggle">
        <button 
          className="calendar-toggle-btn"
          onClick={() => setShowCalendar(!showCalendar)}
        >
          {showCalendar ? 'Hide' : 'Show'} Calendar View
        </button>
      </div>

      {showCalendar && (
        <div className="calendar-view">
          <h4>Availability Calendar</h4>
          <div className="calendar-grid">
            {Object.entries(mockAvailability).slice(0, 14).map(([date, available]) => (
              <div key={date} className={`calendar-day ${available ? 'available' : 'unavailable'} ${date === startDate ? 'selected-start' : ''} ${date === endDate ? 'selected-end' : ''}`}>
                <div className="day-date">{new Date(date).getDate()}</div>
                <div className="day-status">
                  {available ? '✓' : '✗'}
                </div>
                <div className="day-name">
                  {new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
              </div>
            ))}
          </div>
          
          <div className="calendar-legend">
            <div className="legend-item">
              <div className="legend-color available"></div>
              <span>Available</span>
            </div>
            <div className="legend-item">
              <div className="legend-color unavailable"></div>
              <span>Booked</span>
            </div>
            <div className="legend-item">
              <div className="legend-color selected"></div>
              <span>Selected</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}