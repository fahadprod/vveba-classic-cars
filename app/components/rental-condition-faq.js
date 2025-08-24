// components/RentalConditions.js
import { useState } from 'react';

export default function RentalConditions() {
  const [openSection, setOpenSection] = useState(null);

  const conditions = [
    { 
      title: 'Driver Requirements', 
      content: 'Must be 25+ years old with a valid driver\'s license held for at least 3 years. International renters must present a valid passport and International Driving Permit. A clean driving record is required with no major violations in the past 5 years.',
      icon: '👤'
    },
    { 
      title: 'Insurance Coverage', 
      content: 'Basic liability insurance included with all rentals. Collision Damage Waiver available for $25/day. Theft Protection included at no extra cost. Personal Accident Insurance covers up to $100,000 for medical expenses. Additional premium insurance options available for exotic models.',
      icon: '🛡️'
    },
    { 
      title: 'Mileage Policy', 
      content: '200 miles included per rental day. Additional miles charged at $0.50 per mile. Weekly rentals include 1,400 miles total. Unlimited mileage packages available for $30/day. Mileage is tracked via GPS and calculated at return.',
      icon: '📊'
    },
    { 
      title: 'Fuel Policy', 
      content: 'Vehicle must be returned with the same fuel level as at pickup. Refueling service available at $7.99 per gallon plus service fee. Premium unleaded fuel (91 octane or higher) required for all performance vehicles. Fuel level is documented with photos at rental commencement.',
      icon: '⛽'
    },
    { 
      title: 'Cancellation Policy', 
      content: 'Free cancellation up to 48 hours before reservation. 50% charge for cancellations within 24-48 hours. No refund for cancellations within 24 hours of reservation. Weather-related cancellations may be waived with proper documentation. Reservation changes subject to availability and rate differences.',
      icon: '❌'
    },
    { 
      title: 'Security Deposit', 
      content: '$500 refundable security deposit required for all rentals. Deposit may be held on credit card for duration of rental. Additional security deposit up to $2,500 required for premium and exotic vehicles. Deposit refund processed within 5-7 business days after vehicle return and inspection.',
      icon: '💰'
    }
  ];

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  return (
   <div className='wrapper'>
     <div className="rental-conditions-container target">
      <div className="conditions-header">
        <h2>Rental Conditions & Policies</h2>
        <p>Important information about your classic car rental</p>
      </div>

      <div className="accordion">
        {conditions.map((condition, index) => (
          <div 
            key={index} 
            className={`accordion-item ${openSection === index ? 'active' : ''}`}
          >
            <button 
              className="accordion-header"
              onClick={() => toggleSection(index)}
              aria-expanded={openSection === index}
            >
              <div className="header-content">
                <span className="condition-icon">{condition.icon}</span>
                <span className="condition-title">{condition.title}</span>
              </div>
              <span className="accordion-indicator">
                {openSection === index ? '−' : '+'}
              </span>
            </button>
            
            <div 
              className="accordion-content"
              style={{
                maxHeight: openSection === index ? '500px' : '0'
              }}
            >
              <div className="content-inner">
                <p>{condition.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
   </div>
  );
}