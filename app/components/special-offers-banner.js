// components/SpecialOffers.js
import { useState, useEffect } from 'react';

export default function SpecialOffers() {
  const [offers, setOffers] = useState([]);
  const [currentOffer, setCurrentOffer] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Static offers data
  const staticOffers = [
    {
      id: 1,
      title: "Weekend Getaway Special",
      description: "Get 25% off on weekend rentals of classic convertibles. Perfect for a scenic drive!",
      discount: "25% OFF",
      code: "WEEKEND25",
      expires: "2023-12-15",
      backgroundColor: "linear-gradient(135deg, #ff6b35, #f7931e)",
      textColor: "#fff"
    },
    {
      id: 2,
      title: "Summer Classic Promotion",
      description: "Book any vintage car for 5+ days and get 2 days free. Limited time offer!",
      discount: "2 DAYS FREE",
      code: "SUMMER2FREE",
      expires: "2023-08-31",
      backgroundColor: "linear-gradient(135deg, #4facfe, #00f2fe)",
      textColor: "#fff"
    },
    {
      id: 3,
      title: "Loyalty Rewards",
      description: "Third rental this year? Enjoy 30% off and priority booking for your next classic car adventure.",
      discount: "30% OFF",
      code: "LOYAL30",
      expires: "2023-12-31",
      backgroundColor: "linear-gradient(135deg, #a8edea, #fed6e3)",
      textColor: "#333"
    },
    {
      id: 4,
      title: "Anniversary Special",
      description: "Celebrate our 10th anniversary with 10% off any luxury classic car rental.",
      discount: "10% OFF",
      code: "TENYEARS",
      expires: "2023-10-10",
      backgroundColor: "linear-gradient(135deg, #ff9a9e, #fad0c4)",
      textColor: "#333"
    }
  ];

  useEffect(() => {
    setOffers(staticOffers);
  }, []);

  useEffect(() => {
    if (offers.length > 1 && !isPaused) {
      const timer = setInterval(() => {
        setCurrentOffer((prev) => (prev === offers.length - 1 ? 0 : prev + 1));
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [offers.length, isPaused]);

  const nextOffer = () => {
    setCurrentOffer((prev) => (prev === offers.length - 1 ? 0 : prev + 1));
  };

  const prevOffer = () => {
    setCurrentOffer((prev) => (prev === 0 ? offers.length - 1 : prev - 1));
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (offers.length === 0) return null;

  const current = offers[currentOffer];

  return (
    <div className="special-offers-container">
      <div className="offers-header">
        <h2>Special Offers</h2>
        <p>Exclusive deals on our classic car collection</p>
      </div>

      <div 
        className="offer-banner"
        style={{ 
          background: current.backgroundColor,
          color: current.textColor
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="offer-content">
          <div className="offer-badge">
            {current.discount}
          </div>
          
          <div className="offer-details">
            <h3>{current.title}</h3>
            <p>{current.description}</p>
            
            <div className="offer-meta">
              <div className="offer-code">
                <span className="code-label">Use code:</span>
                <span className="code-value">{current.code}</span>
              </div>
              
              <div className="offer-expiry">
                <span className="expiry-label">Expires:</span>
                <span className="expiry-value">{formatDate(current.expires)}</span>
              </div>
            </div>
          </div>
          
          <div className="offer-actions">
            <button className="offer-button">Claim Offer</button>
          </div>
        </div>
        
        {/* Navigation arrows */}
        {offers.length > 1 && (
          <>
            <button 
              className="nav-arrow prev-arrow"
              onClick={prevOffer}
              aria-label="Previous offer"
            >
              ‹
            </button>
            <button 
              className="nav-arrow next-arrow"
              onClick={nextOffer}
              aria-label="Next offer"
            >
              ›
            </button>
          </>
        )}
        
        {/* Progress indicator */}
        {offers.length > 1 && (
          <div className="offer-progress">
            <div 
              className="progress-bar" 
              style={{ 
                width: `${((currentOffer + 1) / offers.length) * 100}%`,
                animation: isPaused ? 'none' : 'progress 5s linear'
              }}
            ></div>
          </div>
        )}
      </div>
      
      {/* Indicators */}
      {offers.length > 1 && (
        <div className="offer-indicators">
          {offers.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentOffer ? 'active' : ''}`}
              onClick={() => setCurrentOffer(index)}
              aria-label={`Go to offer ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}