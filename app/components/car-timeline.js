// components/CarTimeline.js
import { useState } from 'react';

export default function CarTimeline() {
  // Sample timeline data
  const eras = [
    {
      decade: "1950s",
      description: "The birth of American automotive design with tailfins and chrome",
      cars: [
        {
          id: 1,
          name: "Chevrolet Bel Air",
          image: "/images/car-1.jpg",
          year: 1957,
          description: "Iconic American classic with iconic tailfins and chrome details",
          price: "$150,000",
          engine: "4.6L V8",
          horsepower: 180
        },
        {
          id: 2,
          name: "Cadillac Series 62",
          image: "/images/car-2.jpg",
          year: 1959,
          description: "Luxury car with the most dramatic tailfins ever produced",
          price: "$200,000",
          engine: "6.4L V8",
          horsepower: 325
        }
      ]
    },
    {
      decade: "1960s",
      description: "Muscle cars and performance vehicles take center stage",
      cars: [
        {
          id: 3,
          name: "Ford Mustang",
          image: "/images/car-3.jpg",
          year: 1965,
          description: "The original pony car that started a revolution",
          price: "$120,000",
          engine: "4.7L V8",
          horsepower: 271
        },
        {
          id: 4,
          name: "Chevrolet Corvette Stingray",
          image: "/images/gallery-car-1.jpg",
          year: 1963,
          description: "American sports car icon with split-window design",
          price: "$180,000",
          engine: "5.4L V8",
          horsepower: 360
        },
        {
          id: 5,
          name: "Porsche 911",
          image: "/images/gallery-car-2.jpg",
          year: 1964,
          description: "German engineering masterpiece that defined sports cars",
          price: "$250,000",
          engine: "2.0L Flat-6",
          horsepower: 130
        }
      ]
    },
    {
      decade: "1970s",
      description: "The era of personal luxury and performance muscle",
      cars: [
        {
          id: 6,
          name: "Dodge Charger",
          image: "/images/gallery-car-3.jpg",
          year: 1970,
          description: "Muscle car legend featured in numerous films",
          price: "$160,000",
          engine: "7.2L V8",
          horsepower: 425
        },
        {
          id: 7,
          name: "Ferrari Dino 246 GT",
          image: "/images/gallery-car-4.jpg",
          year: 1972,
          description: "Mid-engine V6 masterpiece from Ferrari",
          price: "$350,000",
          engine: "2.4L V6",
          horsepower: 195
        }
      ]
    },
    {
      decade: "1980s",
      description: "Digital dashboards and turbocharging become mainstream",
      cars: [
        {
          id: 8,
          name: "DeLorean DMC-12",
          image: "/images/gallery-car-5.jpg",
          year: 1981,
          description: "Stainless steel gull-wing doors made famous by Back to the Future",
          price: "$80,000",
          engine: "2.8L V6",
          horsepower: 130
        },
        {
          id: 9,
          name: "BMW M3 E30",
          image: "/images/gallery-car-6.jpg",
          year: 1986,
          description: "The original sports sedan that defined a generation",
          price: "$120,000",
          engine: "2.3L I4",
          horsepower: 192
        }
      ]
    }
  ];

  const [activeEra, setActiveEra] = useState(eras[0].decade);
  const [selectedCar, setSelectedCar] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleEraClick = (decade) => {
    setActiveEra(decade);
    setSelectedCar(null);
    setIsExpanded(true);
  };

  const handleCarClick = (car) => {
    setSelectedCar(car);
  };

  const handleCloseDetails = () => {
    setSelectedCar(null);
  };

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const getActiveEra = () => eras.find(era => era.decade === activeEra);

  return (
    <div className="car-timeline-container">
      <div className="timeline-header">
        <h2>Classic Car Timeline</h2>
        <p>Explore the evolution of automotive excellence through the decades</p>
      </div>

      {/* Timeline Navigation */}
      <div className="timeline-nav">
        {eras.map((era, index) => (
          <button
            key={era.decade}
            className={`timeline-nav-item ${activeEra === era.decade ? 'active' : ''}`}
            onClick={() => handleEraClick(era.decade)}
            style={{ '--index': index }}
          >
            <span className="nav-decade">{era.decade}</span>
            <span className="nav-dot"></span>
          </button>
        ))}
        <div className="timeline-line"></div>
      </div>

      {/* Era Content */}
      <div className={`era-content ${isExpanded ? 'expanded' : ''}`}>
        {eras.map(era => (
          <div
            key={era.decade}
            className={`era-panel ${activeEra === era.decade ? 'active' : ''}`}
          >
            <div className="era-header">
              <h3 className="era-title">{era.decade}</h3>
              <p className="era-description">{era.description}</p>
            </div>

            <div className="era-cars-grid">
              {era.cars.map(car => (
                <div
                  key={car.id}
                  className="timeline-car-card"
                  onClick={() => handleCarClick(car)}
                >
                  <div className="timeline-car-image">
                    <img src={car.image} alt={car.name} />
                    <div className="timeline-car-overlay">
                      <span className="timeline-view-details">View Details</span>
                    </div>
                  </div>
                  <div className="timeline-car-info">
                    <h4 className="timeline-car-name">{car.name}</h4>
                    <p className="timeline-car-year">{car.year}</p>
                    <p className="timeline-car-price">{car.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Expand/Collapse Button */}
      <div className="expand-toggle">
        <button onClick={handleToggleExpand} className="expand-btn">
          {isExpanded ? 'Collapse Timeline' : 'Expand Timeline'}
          <span className={`expand-arrow ${isExpanded ? 'expanded' : ''}`}>▼</span>
        </button>
      </div>

      {/* Car Detail Modal */}
      {selectedCar && (
        <div className="car-detail-modal">
          <div className="modal-content">
            <button className="modal-close" onClick={handleCloseDetails}>
              ×
            </button>
            
            <div className="modal-header">
              <img src={selectedCar.image} alt={selectedCar.name} className="modal-image" />
              <div className="modal-title">
                <h2>{selectedCar.name}</h2>
                <p className="modal-year">{selectedCar.year}</p>
                <p className="modal-price">{selectedCar.price}</p>
              </div>
            </div>

            <div className="modal-body">
              <p className="modal-description">{selectedCar.description}</p>
              
              <div className="modal-specs">
                <div className="spec-item">
                  <span className="spec-label">Engine</span>
                  <span className="spec-value">{selectedCar.engine}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Horsepower</span>
                  <span className="spec-value">{selectedCar.horsepower} HP</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Decade</span>
                  <span className="spec-value">{activeEra}</span>
                </div>
              </div>

              <button className="modal-action-btn">
                View Full Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}