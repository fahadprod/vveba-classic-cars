// components/DatePicker.js
import { useState } from 'react';

export default function DatePicker({ onDateSelect }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState('');
  const [showCarDropdown, setShowCarDropdown] = useState(false);

  // Sample available cars for rental
  const availableCars = [
    { id: 1, name: "Ford Mustang GT", price: 200, available: true },
    { id: 2, name: "Chevrolet Camaro", price: 180, available: true },
    { id: 3, name: "Dodge Challenger", price: 220, available: false },
    { id: 4, name: "Cadillac Eldorado", price: 250, available: true },
    { id: 5, name: "Jeep Wagoneer", price: 150, available: true },
  ];

//   const availableCarsOptions = availableCars.filter(car => car.available);

  const handleDateChange = (type, value) => {
    if (type === 'start') {
      setStartDate(value);
      if (endDate && value > endDate) {
        setEndDate('');
      }
    } else {
      setEndDate(value);
    }
  };

  const handleCarSelect = (car) => {
    setSelectedCar(car.id);
    setShowCarDropdown(false);
  };

  const calculateTotal = () => {
    if (!startDate || !endDate || !selectedCar) return 0;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    
    const car = availableCars.find(c => c.id === selectedCar);
    return days * (car?.price || 0);
  };

  const getSelectedCarName = () => {
    if (!selectedCar) return 'Select a car';
    const car = availableCars.find(c => c.id === selectedCar);
    return car ? car.name : 'Select a car';
  };

  const handleConfirm = () => {
    if (startDate && endDate && selectedCar) {
      const car = availableCars.find(c => c.id === selectedCar);
      onDateSelect({ 
        startDate, 
        endDate,
        carId: selectedCar,
        carName: car?.name,
        dailyPrice: car?.price,
        totalDays: Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)),
        totalPrice: calculateTotal()
      });
      setIsOpen(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Select date';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="date-picker-container">
      <div className="date-picker-trigger" onClick={() => setIsOpen(!isOpen)}>
        <div className="date-display">
          <span className="date-label">From</span>
          <span className="date-value">{formatDate(startDate)}</span>
        </div>
        <div className="date-arrow">→</div>
        <div className="date-display">
          <span className="date-label">To</span>
          <span className="date-value">{formatDate(endDate)}</span>
        </div>
      </div>

      {isOpen && (
        <div className="date-picker-modal">
          <div className="date-picker-header">
            <h3>Select Rental Period</h3>
            <button 
              className="close-btn"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
          </div>

          <div className="date-inputs">
            <div className="date-input-group">
              <label className="date-input-label">Start Date</label>
              <input 
                type="date" 
                value={startDate}
                onChange={(e) => handleDateChange('start', e.target.value)}
                className="date-input"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="date-separator">to</div>

            <div className="date-input-group">
              <label className="date-input-label">End Date</label>
              <input 
                type="date" 
                value={endDate}
                onChange={(e) => handleDateChange('end', e.target.value)}
                className="date-input"
                min={startDate || new Date().toISOString().split('T')[0]}
                disabled={!startDate}
              />
            </div>
          </div>

          {/* Car Selection Dropdown */}
          <div className="car-selection">
            <label className="date-input-label">Select Car</label>
            <div className="car-dropdown">
              <button 
                className="car-dropdown-trigger"
                onClick={() => setShowCarDropdown(!showCarDropdown)}
              >
                <span className="car-selected-value">{getSelectedCarName()}</span>
                <span className="car-dropdown-arrow">▼</span>
              </button>
              
              {showCarDropdown && (
                <div className="car-dropdown-menu">
                  {availableCars.map(car => (
                    <div
                      key={car.id}
                      className="car-dropdown-item"
                      onClick={() => handleCarSelect(car)}
                    >
                      <span className="picker-car-name">{car.name}</span>
                      <span className="picker-car-price">${car.price}/day</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {startDate && endDate && selectedCar && (
            <div className="rental-summary">
              <h4>Rental Summary</h4>
              <div className="summary-details">
                <div className="summary-item">
                  <span>Selected Car:</span>
                  <span>{getSelectedCarName()}</span>
                </div>
                <div className="summary-item">
                  <span>Total Days:</span>
                  <span>{Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24))}</span>
                </div>
                <div className="summary-item">
                  <span>Daily Rate:</span>
                  <span>${availableCars.find(car => car.id === selectedCar)?.price}/day</span>
                </div>
                <div className="summary-item total">
                  <span>Total Price:</span>
                  <span>${calculateTotal()}</span>
                </div>
              </div>
            </div>
          )}

          <button 
            className="confirm-btn"
            onClick={handleConfirm}
            disabled={!startDate || !endDate || !selectedCar}
          >
            Confirm Rental
          </button>
        </div>
      )}
    </div>
  );
}