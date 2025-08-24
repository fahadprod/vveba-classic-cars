// components/LocationFinder.js
import { useState, useEffect } from 'react';

export default function LocationFinder() {
  const [locations, setLocations] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Sample rental locations data
  const sampleLocations = [
    {
      id: 1,
      name: "Classic Cars Downtown",
      address: "123 Main Street, New York, NY 10001",
      phone: "(555) 123-4567",
      hours: "Mon-Sat: 9AM-6PM, Sun: 10AM-4PM",
      distance: 1.2,
      lat: 40.7128,
      lng: -74.0060,
      availableCars: 12,
      rating: 4.8
    },
    {
      id: 2,
      name: "Vintage Motors Midtown",
      address: "456 Park Avenue, New York, NY 10022",
      phone: "(555) 987-6543",
      hours: "Mon-Fri: 8AM-7PM, Sat: 9AM-5PM, Sun: Closed",
      distance: 2.5,
      lat: 40.7549,
      lng: -73.9840,
      availableCars: 8,
      rating: 4.6
    },
    {
      id: 3,
      name: "Heritage Autos Brooklyn",
      address: "789 Brooklyn Blvd, Brooklyn, NY 11201",
      phone: "(555) 456-7890",
      hours: "Mon-Sun: 8AM-8PM",
      distance: 4.8,
      lat: 40.6782,
      lng: -73.9442,
      availableCars: 15,
      rating: 4.9
    },
    {
      id: 4,
      name: "Timeless Rides Queens",
      address: "321 Queens Plaza, Queens, NY 11101",
      phone: "(555) 321-0987",
      hours: "Mon-Sat: 7AM-9PM, Sun: 8AM-6PM",
      distance: 6.3,
      lat: 40.7505,
      lng: -73.9404,
      availableCars: 6,
      rating: 4.7
    }
  ];

  // Mock user location (in real app, this would come from geolocation)
  const mockUserLocation = {
    lat: 40.7128,
    lng: -74.0060,
    city: "New York",
    state: "NY"
  };

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const findNearestLocations = async () => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setUserLocation(mockUserLocation);
    
    // Calculate distances and sort by nearest
    const locationsWithDistances = sampleLocations
      .map(location => ({
        ...location,
        distance: calculateDistance(
          mockUserLocation.lat,
          mockUserLocation.lng,
          location.lat,
          location.lng
        )
      }))
      .sort((a, b) => a.distance - b.distance);

    setLocations(locationsWithDistances);
    setIsLoading(false);
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    // Haversine formula to calculate distance between two points
    const R = 3959; // Earth radius in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return (R * c).toFixed(1);
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
  };

  const handleCloseDetails = () => {
    setSelectedLocation(null);
  };

  const getDirections = (location) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`;
    window.open(url, '_blank');
  };

  const renderStars = (rating) => {
    return (
      <div className="rating-stars">
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            className={`star ${index < Math.floor(rating) ? 'filled' : ''}`}
          >
            ⭐
          </span>
        ))}
        <span className="rating-text">({rating})</span>
      </div>
    );
  };

  return (
    <div className="location-finder-container">
      <div className="finder-header">
        <h2>Find Rental Locations</h2>
        <p>Discover classic car rental locations near you</p>
      </div>

      <div className="finder-content">
        {/* Map Section */}
        <div className="map-section">
          <div className="map-container">
            {!mapLoaded ? (
              <div className="map-loading">
                <div className="loading-spinner"></div>
                <p>Loading map...</p>
              </div>
            ) : (
              <div className="map-placeholder">
                <div className="map-overlay">
                  <div className="user-marker">
                    <div className="marker-pulse"></div>
                    <div className="marker-icon">📍</div>
                  </div>
                  
                  {locations.map(location => (
                    <div
                      key={location.id}
                      className="location-marker"
                      style={{
                        left: `${(location.lng + 74.2) * 100}%`,
                        top: `${(40.8 - location.lat) * 100}%`
                      }}
                      onClick={() => handleLocationSelect(location)}
                    >
                      <div className="location-dot"></div>
                      <div className="location-pulse"></div>
                    </div>
                  ))}
                </div>
                <div className="map-attribution">
                  Interactive Map - {userLocation ? `Centered on ${userLocation.city}` : 'Click find to start'}
                </div>
              </div>
            )}
          </div>

          <div className="map-controls">
            <button
              onClick={findNearestLocations}
              className="find-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="spinner"></div>
                  Finding Locations...
                </>
              ) : (
                'Find Nearest Locations'
              )}
            </button>
          </div>
        </div>

        {/* Locations List */}
        <div className="locations-section">
          <div className="section-header">
            <h3>Rental Locations</h3>
            {userLocation && (
              <span className="user-location">
                Near {userLocation.city}, {userLocation.state}
              </span>
            )}
          </div>

          {locations.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🗺️</div>
              <h4>Find Rental Locations</h4>
              <p>Click &quot;Find Nearest Locations&quot; to discover classic car rental spots near you</p>
            </div>
          ) : (
            <div className="locations-list">
              {locations.map(location => (
                <div
                  key={location.id}
                  className={`location-card ${selectedLocation?.id === location.id ? 'selected' : ''}`}
                  onClick={() => handleLocationSelect(location)}
                >
                  <div className="location-info">
                    <h4 className="location-name">{location.name}</h4>
                    <p className="location-address">{location.address}</p>
                    <p className="location-distance">{location.distance} miles away</p>
                    
                    <div className="location-details">
                      <span className="detail-item">
                        <strong>{location.availableCars}</strong> cars available
                      </span>
                      <span className="detail-item">
                        {renderStars(location.rating)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="location-actions">
                    <button
                      className="action-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        getDirections(location);
                      }}
                    >
                      Directions
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Location Detail Modal */}
      {selectedLocation && (
        <div className="location-modal">
          <div className="modal-content">
            <button className="modal-close" onClick={handleCloseDetails}>
              ×
            </button>
            
            <div className="modal-header">
              <h3>{selectedLocation.name}</h3>
              <p className="modal-distance">{selectedLocation.distance} miles away</p>
            </div>

            <div className="modal-body">
              <div className="modal-section">
                <h4>Address</h4>
                <p>{selectedLocation.address}</p>
              </div>

              <div className="modal-section">
                <h4>Contact & Hours</h4>
                <p className="modal-phone">{selectedLocation.phone}</p>
                <p className="modal-hours">{selectedLocation.hours}</p>
              </div>

              <div className="modal-section">
                <h4>Availability</h4>
                <div className="availability-info">
                  <span className="cars-available">
                    {selectedLocation.availableCars} classic cars available
                  </span>
                  {renderStars(selectedLocation.rating)}
                </div>
              </div>

              <div className="modal-actions">
                <button
                  className="modal-btn secondary"
                  onClick={handleCloseDetails}
                >
                  Close
                </button>
                <button
                  className="modal-btn primary"
                  onClick={() => getDirections(selectedLocation)}
                >
                  Get Directions
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}