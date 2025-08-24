// components/ComparisonTool.js
import { useState } from 'react';

export default function ComparisonTool() {
  // Sample cars data for comparison
  const cars = [
    {
      id: 1,
      name: "Ford Mustang GT",
      thumbnail: "/images/car-1.jpg",
      year: 1967,
      price: 200000,
      engine: "4.7L V8",
      horsepower: 320,
      transmission: "Manual",
      fuelEconomy: "15 mpg",
      seats: 4,
      features: ["Classic Design", "Power Steering", "AM/FM Radio"],
      rating: 4.8
    },
    {
      id: 2,
      name: "Chevrolet Camaro",
      thumbnail: "/images/car-2.jpg",
      year: 1969,
      price: 180000,
      engine: "5.0L V8",
      horsepower: 290,
      transmission: "Automatic",
      fuelEconomy: "14 mpg",
      seats: 4,
      features: ["Sport Package", "Air Conditioning", "Tachometer"],
      rating: 4.6
    },
    {
      id: 3,
      name: "Dodge Challenger",
      thumbnail: "/images/car-3.jpg",
      year: 1970,
      price: 220000,
      engine: "6.2L Hemi V8",
      horsepower: 425,
      transmission: "Manual",
      fuelEconomy: "13 mpg",
      seats: 5,
      features: ["Hemi Engine", "Racing Stripes", "Premium Sound"],
      rating: 4.9
    },
    {
      id: 4,
      name: "Cadillac Eldorado",
      thumbnail: "/images/gallery-car-4.jpg",
      year: 1959,
      price: 250000,
      engine: "6.4L V8",
      horsepower: 345,
      transmission: "Automatic",
      fuelEconomy: "12 mpg",
      seats: 6,
      features: ["Convertible", "Power Windows", "Cruise Control"],
      rating: 4.7
    }
  ];

  const [selectedCars, setSelectedCars] = useState([]);
  const [showComparison, setShowComparison] = useState(false);

  const toggleCarSelection = (carId) => {
    if (selectedCars.includes(carId)) {
      setSelectedCars(selectedCars.filter(id => id !== carId));
    } else if (selectedCars.length < 3) {
      setSelectedCars([...selectedCars, carId]);
    }
  };

  const clearSelection = () => {
    setSelectedCars([]);
    setShowComparison(false);
  };

  const compareCars = () => {
    if (selectedCars.length >= 2) {
      setShowComparison(true);
    }
  };

  const getSelectedCarDetails = (carId) => {
    return cars.find(car => car.id === carId);
  };

  const renderFeatureComparison = (feature, getValue) => (
    <tr>
      <td className="feature-name">{feature}</td>
      {selectedCars.map(carId => {
        const car = getSelectedCarDetails(carId);
        return <td key={carId} className="feature-value">{getValue(car)}</td>;
      })}
    </tr>
  );

  const renderRatingStars = (rating) => {
    return (
      <div className="rating-stars">
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            className={`star ${index < Math.floor(rating) ? 'filled' : ''} ${index === Math.floor(rating) && rating % 1 > 0 ? 'half' : ''}`}
          >
            ⭐
          </span>
        ))}
        <span className="rating-text">({rating})</span>
      </div>
    );
  };

  return (
    <div className="comparison-tool-container">
      <div className="comparison-header">
        <h2>Compare Classic Cars</h2>
        <p>Select up to 3 cars to compare features and specifications</p>
      </div>

      <div className="car-selection-section">
        <div className="selection-header">
          <h3>Select Cars to Compare</h3>
          <div className="selection-info">
            <span className="selected-count">{selectedCars.length} of 3 selected</span>
            {selectedCars.length > 0 && (
              <button onClick={clearSelection} className="clear-btn">
                Clear All
              </button>
            )}
          </div>
        </div>

        <div className="comp-cars-grid">
          {cars.map(car => (
            <div
              key={car.id}
              className={`comp-car-card ${selectedCars.includes(car.id) ? 'selected' : ''} ${selectedCars.length >= 3 && !selectedCars.includes(car.id) ? 'disabled' : ''}`}
              onClick={() => toggleCarSelection(car.id)}
            >
              <div className="comp-car-image">
                <img src={car.thumbnail} alt={car.name} />
                <div className="selection-indicator">
                  {selectedCars.includes(car.id) ? '✓' : '+'}
                </div>
              </div>
              <div className="comp-car-info">
                <h4 className="comp-car-name">{car.name}</h4>
                <p className="comp-car-year">{car.year}</p>
                <p className="comp-car-price">${car.price.toLocaleString()}</p>
                {renderRatingStars(car.rating)}
              </div>
            </div>
          ))}
        </div>

        {selectedCars.length >= 2 && (
          <div className="compare-actions">
            <button onClick={compareCars} className="compare-btn">
              Compare Selected Cars
            </button>
          </div>
        )}
      </div>

      {showComparison && (
        <div className="comparison-results">
          <div className="results-header">
            <h3>Comparison Results</h3>
            <button onClick={clearSelection} className="close-comparison">
              ×
            </button>
          </div>

          <div className="comparison-table-container">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th className="feature-column">Feature</th>
                  {selectedCars.map(carId => {
                    const car = getSelectedCarDetails(carId);
                    return (
                      <th key={carId} className="car-column">
                        <div className="car-header">
                          <img src={car.thumbnail} alt={car.name} className="car-thumbnail" />
                          <div className="car-header-info">
                            <h4>{car.name}</h4>
                            <p>{car.year} • ${car.price.toLocaleString()}</p>
                            {renderRatingStars(car.rating)}
                          </div>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              
              <tbody>
                {/* Basic Information */}
                <tr className="section-divider">
                  <td colSpan={selectedCars.length + 1}>
                    <span className="section-title">Basic Information</span>
                  </td>
                </tr>
                
                {renderFeatureComparison('Price', car => `$${car.price.toLocaleString()}`)}
                {renderFeatureComparison('Year', car => car.year)}
                {renderFeatureComparison('Rating', car => renderRatingStars(car.rating))}

                {/* Specifications */}
                <tr className="section-divider">
                  <td colSpan={selectedCars.length + 1}>
                    <span className="section-title">Specifications</span>
                  </td>
                </tr>
                
                {renderFeatureComparison('Engine', car => car.engine)}
                {renderFeatureComparison('Horsepower', car => `${car.horsepower} HP`)}
                {renderFeatureComparison('Transmission', car => car.transmission)}
                {renderFeatureComparison('Fuel Economy', car => car.fuelEconomy)}
                {renderFeatureComparison('Seating Capacity', car => `${car.seats} seats`)}

                {/* Features */}
                <tr className="section-divider">
                  <td colSpan={selectedCars.length + 1}>
                    <span className="section-title">Features</span>
                  </td>
                </tr>
                
                {renderFeatureComparison('Key Features', car => (
                  <ul className="features-list">
                    {car.features.map((feature, index) => (
                      <li key={index}>✓ {feature}</li>
                    ))}
                  </ul>
                ))}

                {/* Action Buttons */}
                <tr className="action-row">
                  <td></td>
                  {selectedCars.map(carId => {
                    const car = getSelectedCarDetails(carId);
                    return (
                      <td key={carId}>
                        <button className="action-btn">
                          View Details
                        </button>
                        <button className="action-btn primary">
                          Rent Now
                        </button>
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}