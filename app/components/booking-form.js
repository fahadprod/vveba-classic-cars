// components/BookingForm.js
import { useState } from 'react';

export default function BookingForm({ carId, price, carName }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    startDate: '',
    endDate: '',
    address: '',
    city: '',
    zipCode: '',
    specialRequests: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Date validation
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    } else if (new Date(formData.startDate) < new Date().setHours(0, 0, 0, 0)) {
      newErrors.startDate = 'Start date cannot be in the past';
    }

    if (!formData.endDate) {
      newErrors.endDate = 'End date is required';
    } else if (formData.startDate && new Date(formData.endDate) <= new Date(formData.startDate)) {
      newErrors.endDate = 'End date must be after start date';
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    // City validation
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    // Zip code validation
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'Zip code is required';
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      newErrors.zipCode = 'Please enter a valid zip code';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const calculateTotal = () => {
    if (!formData.startDate || !formData.endDate) return 0;
    
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    
    return days * price;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // AJAX call to submit booking (commented out for demo)
      /*
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, carId, totalPrice: calculateTotal() }),
      });
      
      if (!response.ok) throw new Error('Booking failed');
      */
      
      setIsSubmitted(true);
      alert('Booking submitted successfully!');
      
    } catch (error) {
      alert('Booking failed. Please try again.');
      console.error('Booking error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      startDate: '',
      endDate: '',
      address: '',
      city: '',
      zipCode: '',
      specialRequests: ''
    });
    setErrors({});
  };

  if (isSubmitted) {
    return (
      <div className="booking-success">
        <div className="success-icon">✓</div>
        <h3>Booking Confirmed!</h3>
        <p>Your booking for {carName} has been confirmed.</p>
        <p>We&apos;ve sent a confirmation email to {formData.email}</p>
        <button 
          className="success-btn"
          onClick={() => setIsSubmitted(false)}
        >
          Book Another Car
        </button>
      </div>
    );
  }

  return (
    <div className="booking-form-container">
      <div className="booking-header">
        <h2>Book Your Rental</h2>
        <p>Complete the form below to reserve your {carName}</p>
      </div>

      <form onSubmit={handleSubmit} className="booking-form">
        <div className="form-grid">
          {/* Personal Information */}
          <div className="form-section">
            <h3 className="section-title">Personal Information</h3>
            
            <div className="input-group">
              <label htmlFor="name" className="input-label">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`form-input ${errors.name ? 'error' : ''}`}
                placeholder="Enter your full name"
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="input-group">
              <label htmlFor="email" className="input-label">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="your.email@example.com"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="input-group">
              <label htmlFor="phone" className="input-label">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`form-input ${errors.phone ? 'error' : ''}`}
                placeholder="(555) 123-4567"
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>
          </div>

          {/* Rental Dates */}
          <div className="form-section">
            <h3 className="section-title">Rental Period</h3>
            
            <div className="input-group">
              <label htmlFor="startDate" className="input-label">Start Date *</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className={`form-input ${errors.startDate ? 'error' : ''}`}
                min={new Date().toISOString().split('T')[0]}
              />
              {errors.startDate && <span className="error-message">{errors.startDate}</span>}
            </div>

            <div className="input-group">
              <label htmlFor="endDate" className="input-label">End Date *</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                className={`form-input ${errors.endDate ? 'error' : ''}`}
                min={formData.startDate || new Date().toISOString().split('T')[0]}
                disabled={!formData.startDate}
              />
              {errors.endDate && <span className="error-message">{errors.endDate}</span>}
            </div>

            {formData.startDate && formData.endDate && (
              <div className="price-summary">
                <div className="summary-item">
                  <span>Daily Rate:</span>
                  <span>${price}/day</span>
                </div>
                <div className="summary-item">
                  <span>Total Days:</span>
                  <span>{Math.ceil((new Date(formData.endDate) - new Date(formData.startDate)) / (1000 * 60 * 60 * 24))}</span>
                </div>
                <div className="summary-item total">
                  <span>Total Price:</span>
                  <span>${calculateTotal()}</span>
                </div>
              </div>
            )}
          </div>

          {/* Address Information */}
          <div className="form-section">
            <h3 className="section-title">Address Information</h3>
            
            <div className="input-group">
              <label htmlFor="address" className="input-label">Street Address *</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={`form-input ${errors.address ? 'error' : ''}`}
                placeholder="123 Main St"
              />
              {errors.address && <span className="error-message">{errors.address}</span>}
            </div>

            <div className="input-group">
              <label htmlFor="city" className="input-label">City *</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className={`form-input ${errors.city ? 'error' : ''}`}
                placeholder="New York"
              />
              {errors.city && <span className="error-message">{errors.city}</span>}
            </div>

            <div className="input-group">
              <label htmlFor="zipCode" className="input-label">Zip Code *</label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                className={`form-input ${errors.zipCode ? 'error' : ''}`}
                placeholder="10001"
              />
              {errors.zipCode && <span className="error-message">{errors.zipCode}</span>}
            </div>
          </div>

          {/* Special Requests */}
          <div className="form-section full-width">
            <h3 className="section-title">Special Requests</h3>
            
            <div className="input-group">
              <label htmlFor="specialRequests" className="input-label">Additional Notes</label>
              <textarea
                id="specialRequests"
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleInputChange}
                className="form-textarea"
                placeholder="Any special requests or additional information..."
                rows="4"
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={handleReset}
            className="reset-btn"
            disabled={isSubmitting}
          >
            Clear Form
          </button>
          
          <button
            type="submit"
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="spinner"></div>
                Processing...
              </>
            ) : (
              `Book Now - $${calculateTotal()}`
            )}
          </button>
        </div>
      </form>

    </div>
  );
}