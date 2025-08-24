// components/HeroHeader.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const HeroHeader = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Fetch car makes from RapidAPI
  const fetchCarMakes = async (query = '') => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const options = {
        method: 'GET',
        url: 'https://car-api2.p.rapidapi.com/api/makes',
        params: {
          direction: 'asc',
          sort: 'id'
        },
        headers: {
          'x-rapidapi-key': '02568f3f37mshad37887cb2a68d7p139623jsn934736b0fcb7',
          'x-rapidapi-host': 'car-api2.p.rapidapi.com'
        }
      };

      const response = await axios.request(options);
      const filteredMakes = response.data.data.filter(make =>
        make.name.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filteredMakes.slice(0, 5)); // Show top 5 results
    } catch (error) {
      console.error('Error fetching car makes:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.length > 1) {
        fetchCarMakes(searchQuery);
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (make) => {
    setSearchQuery(make.name);
    setShowSuggestions(false);
    // You can add navigation or other actions here
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // Add your search logic here
      setShowSuggestions(false);
    }
  };

  return (
    <div className="wrapper">
      <section className="section-1 target center" id="home">
        <h1 className="section-heading section-1-heading">Classic Cars</h1>
        
        {/* Search Bar */}
        <div className="hero-search-container">
          <form className="hero-search-form" onSubmit={handleSearchSubmit}>
            <div className="search-input-wrapper">
              <input
                type="text"
                placeholder="Search car makes..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => setShowSuggestions(true)}
                className="hero-search-input"
              />
              <button type="submit" className="hero-search-btn">
                <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
            
            {showSuggestions && suggestions.length > 0 && (
              <div className="search-suggestions">
                {suggestions.map((make) => (
                  <div
                    key={make.id}
                    className="suggestion-item"
                    onClick={() => handleSuggestionClick(make)}
                  >
                    {make.name}
                  </div>
                ))}
              </div>
            )}
            
            {isLoading && (
              <div className="search-loading">
                <div className="loading-spinner"></div>
                Searching...
              </div>
            )}
          </form>
        </div>

        <img src="/images/car-section1.png" className="section-1-img" />
      </section>
    </div>
  );
};

export default HeroHeader;