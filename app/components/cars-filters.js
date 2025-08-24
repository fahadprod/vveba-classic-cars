// components/CarFilter.js
import { useState, useMemo } from 'react';

export default function CarFilter() {
  // Static array of cars for filtering
  const carsData = [
    {
      id: 1,
      name: "Ford Mustang GT",
      image: "/images/car-1.jpg",
      price: 200000,
      decade: "1960s",
      bodyStyle: "coupe",
      transmission: "manual"
    },
    {
      id: 2,
      name: "Chevrolet Camaro",
      image: "/images/car-2.jpg",
      price: 100000,
      decade: "1970s",
      bodyStyle: "coupe",
      transmission: "automatic"
    },
    {
      id: 3,
      name: "Dodge Challenger",
      image: "/images/car-3.jpg",
      price: 150000,
      decade: "1970s",
      bodyStyle: "coupe",
      transmission: "manual"
    },
    {
      id: 4,
      name: "Cadillac Eldorado",
      image: "/images/gallery-car-1.jpg",
      price: 120000,
      decade: "1950s",
      bodyStyle: "convertible",
      transmission: "automatic"
    },
    {
      id: 5,
      name: "Jeep Wagoneer",
      image: "/images/gallery-car-2.jpg",
      price: 80000,
      decade: "1980s",
      bodyStyle: "suv",
      transmission: "automatic"
    },
    {
      id: 6,
      name: "Volkswagen Golf GTI",
      image: "/images/gallery-car-3.jpg",
      price: 60000,
      decade: "1990s",
      bodyStyle: "hatchback",
      transmission: "manual"
    }
  ];

  const [filters, setFilters] = useState({
    decade: '',
    priceRange: '',
    bodyStyle: '',
    transmission: ''
  });

  const filteredCars = useMemo(() => {
    return carsData.filter(car => {
      // Filter by decade
      if (filters.decade && car.decade !== filters.decade) return false;
      
      // Filter by price range
      if (filters.priceRange) {
        if (filters.priceRange === '0-50000' && car.price > 50000) return false;
        if (filters.priceRange === '50000-100000' && (car.price < 50000 || car.price > 100000)) return false;
        if (filters.priceRange === '100000-200000' && (car.price < 100000 || car.price > 200000)) return false;
        if (filters.priceRange === '200000+' && car.price < 200000) return false;
      }
      
      // Filter by body style
      if (filters.bodyStyle && car.bodyStyle !== filters.bodyStyle) return false;
      
      // Filter by transmission
      if (filters.transmission && car.transmission !== filters.transmission) return false;
      
      return true;
    });
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      decade: '',
      priceRange: '',
      bodyStyle: '',
      transmission: ''
    });
  };

  return (
    <div className="wrapper">
      <div className="car-filter-section target">
        <h1 className="section-heading">All Cars</h1>
        
        {/* Filter Controls */}
        <div className="filter-controls">
          <select name="decade" onChange={handleFilterChange} value={filters.decade}>
            <option value="">All Decades</option>
            <option value="1950s">1950s</option>
            <option value="1960s">1960s</option>
            <option value="1970s">1970s</option>
            <option value="1980s">1980s</option>
            <option value="1990s">1990s</option>
          </select>
          
          <select name="priceRange" onChange={handleFilterChange} value={filters.priceRange}>
            <option value="">Any Price</option>
            <option value="0-50000">Under $50,000</option>
            <option value="50000-100000">$50,000-$100,000</option>
            <option value="100000-200000">$100,000-$200,000</option>
            <option value="200000+">$200,000+</option>
          </select>
          
          <select name="bodyStyle" onChange={handleFilterChange} value={filters.bodyStyle}>
            <option value="">All Body Styles</option>
            <option value="coupe">Coupe</option>
            <option value="sedan">Sedan</option>
            <option value="convertible">Convertible</option>
            <option value="suv">SUV</option>
            <option value="hatchback">Hatchback</option>
          </select>
          
          <select name="transmission" onChange={handleFilterChange} value={filters.transmission}>
            <option value="">All Transmissions</option>
            <option value="automatic">Automatic</option>
            <option value="manual">Manual</option>
          </select>

          <button type="button" onClick={handleClearFilters} className="clear-btn">
            Clear Filters
          </button>
        </div>

        {/* Filtered Results */}
        <div className="filter-cards-wrapper center">
          {filteredCars.map((car) => (
            <div key={car.id} className="filter-card">
              <h2 className="filter-car-name">{car.name}</h2>
              <img src={car.image} className="filter-card-img" alt={car.name} />
              <h3 className="filter-car-price">${car.price.toLocaleString()}</h3>
              <div className="filter-car-details">
                <span>{car.decade}</span> • <span>{car.bodyStyle}</span> • <span>{car.transmission}</span>
              </div>
              <button type="button" className="filter-card-btn">
                See More
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}