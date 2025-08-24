// components/PriceCalculator.js
import { useState, useEffect } from 'react';

export default function PriceCalculator({ basePrice, carName, currency = '$' }) {
  const [days, setDays] = useState(1);
  const [total, setTotal] = useState(basePrice);
  const [insurance, setInsurance] = useState(true);
  const [gps, setGps] = useState(false);
  const [childSeat, setChildSeat] = useState(0);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  // Additional services pricing
  const services = {
    insurance: 25, // per day
    gps: 10,       // per day
    childSeat: 5   // per seat per day
  };

  // Promo codes and their discounts
  const promoDiscounts = {
    'SUMMER25': 0.25,
    'WINTER15': 0.15,
    'FIRST10': 0.10
  };

  useEffect(() => {
    calculateTotal();
  }, [days, insurance, gps, childSeat, discount, basePrice]);

  const calculateTotal = () => {
    let subtotal = basePrice * days;
    
    // Add services
    if (insurance) subtotal += services.insurance * days;
    if (gps) subtotal += services.gps * days;
    subtotal += services.childSeat * childSeat * days;
    
    // Apply discount
    const discountAmount = subtotal * discount;
    const finalTotal = subtotal - discountAmount;
    
    setTotal(finalTotal);
  };

  const handlePromoCodeApply = () => {
    const code = promoCode.trim().toUpperCase();
    if (promoDiscounts[code]) {
      setDiscount(promoDiscounts[code]);
    } else {
      setDiscount(0);
      alert('Invalid promo code');
    }
  };

  const handleDaysChange = (value) => {
    const numValue = Math.max(1, Math.min(365, parseInt(value) || 1));
    setDays(numValue);
  };

  const formatPrice = (price) => {
    return `${currency}${price.toFixed(2)}`;
  };

  const getDiscountAmount = () => {
    return basePrice * days * discount;
  };

  return (
    <div className="price-calculator-container">
      <div className="calculator-header">
        <h2>Price Calculator</h2>
        <p>Calculate your rental cost for {carName}</p>
      </div>

      <div className="calculator-content">
        {/* Base Rental */}
        <div className="calculator-section">
          <h3 className="section-title">Rental Details</h3>
          
          <div className="input-group">
            <label className="input-label">Rental Duration</label>
            <div className="days-selector">
              <button 
                className="quantity-btn"
                onClick={() => handleDaysChange(days - 1)}
                disabled={days <= 1}
              >
                −
              </button>
              <input
                type="number"
                min="1"
                max="365"
                value={days}
                onChange={(e) => handleDaysChange(e.target.value)}
                className="days-input"
              />
              <button 
                className="quantity-btn"
                onClick={() => handleDaysChange(days + 1)}
                disabled={days >= 365}
              >
                +
              </button>
              <span className="days-label">day{days !== 1 ? 's' : ''}</span>
            </div>
          </div>

          <div className="price-breakdown">
            <div className="breakdown-item">
              <span>{days} day{days !== 1 ? 's' : ''} × {formatPrice(basePrice)}</span>
              <span>{formatPrice(basePrice * days)}</span>
            </div>
          </div>
        </div>

        {/* Additional Services */}
        <div className="calculator-section">
          <h3 className="section-title">Additional Services</h3>
          
          <div className="services-list">
            <label className="service-checkbox">
              <input
                type="checkbox"
                checked={insurance}
                onChange={(e) => setInsurance(e.target.checked)}
                className="checkbox-input"
              />
              <span className="checkmark"></span>
              <div className="service-info">
                <span className="service-name">Insurance Coverage</span>
                <span className="service-price">{formatPrice(services.insurance)}/day</span>
              </div>
            </label>

            <label className="service-checkbox">
              <input
                type="checkbox"
                checked={gps}
                onChange={(e) => setGps(e.target.checked)}
                className="checkbox-input"
              />
              <span className="checkmark"></span>
              <div className="service-info">
                <span className="service-name">GPS Navigation</span>
                <span className="service-price">{formatPrice(services.gps)}/day</span>
              </div>
            </label>

            <div className="service-quantity">
              <div className="service-info">
                <span className="service-name">Child Seats</span>
                <span className="service-price">{formatPrice(services.childSeat)}/seat/day</span>
              </div>
              <div className="quantity-controls">
                <button 
                  className="quantity-btn small"
                  onClick={() => setChildSeat(Math.max(0, childSeat - 1))}
                  disabled={childSeat <= 0}
                >
                  −
                </button>
                <span className="quantity-display">{childSeat}</span>
                <button 
                  className="quantity-btn small"
                  onClick={() => setChildSeat(Math.min(3, childSeat + 1))}
                  disabled={childSeat >= 3}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {((insurance || gps || childSeat > 0)) && (
            <div className="price-breakdown">
              {insurance && (
                <div className="breakdown-item">
                  <span>Insurance × {days} days</span>
                  <span>{formatPrice(services.insurance * days)}</span>
                </div>
              )}
              {gps && (
                <div className="breakdown-item">
                  <span>GPS × {days} days</span>
                  <span>{formatPrice(services.gps * days)}</span>
                </div>
              )}
              {childSeat > 0 && (
                <div className="breakdown-item">
                  <span>{childSeat} child seat{childSeat !== 1 ? 's' : ''} × {days} days</span>
                  <span>{formatPrice(services.childSeat * childSeat * days)}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Promo Code */}
        <div className="calculator-section">
          <h3 className="section-title">Promo Code</h3>
          
          <div className="promo-code-input">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Enter promo code"
              className="promo-input"
            />
            <button 
              onClick={handlePromoCodeApply}
              className="promo-apply-btn"
              disabled={!promoCode.trim()}
            >
              Apply
            </button>
          </div>

          {discount > 0 && (
            <div className="discount-applied">
              <span className="discount-text">{Object.keys(promoDiscounts).find(key => promoDiscounts[key] === discount)} applied</span>
              <span className="discount-amount">-{formatPrice(getDiscountAmount())}</span>
            </div>
          )}

          <div className="promo-codes-hint">
            <p>Try: SUMMER25, WINTER15, or FIRST10</p>
          </div>
        </div>

        {/* Total Summary */}
        <div className="calculator-section total-section">
          <div className="total-summary">
            <div className="summary-line">
              <span>Subtotal:</span>
              <span>{formatPrice(basePrice * days + 
                (insurance ? services.insurance * days : 0) +
                (gps ? services.gps * days : 0) +
                (services.childSeat * childSeat * days)
              )}</span>
            </div>
            
            {discount > 0 && (
              <div className="summary-line discount">
                <span>Discount ({discount * 100}%):</span>
                <span>-{formatPrice(getDiscountAmount())}</span>
              </div>
            )}

            <div className="summary-line total">
              <span>Total Amount:</span>
              <span className="final-price">{formatPrice(total)}</span>
            </div>
          </div>

          <button className="reserve-btn">
            Reserve Now
          </button>
        </div>
      </div>

    </div>
  );
}