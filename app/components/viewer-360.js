// components/InteractiveViewer.js
import { useState, useRef, useEffect } from 'react';

export default function InteractiveViewer() {
  const [currentAngle, setCurrentAngle] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);
  const [loadedImages, setLoadedImages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const viewerRef = useRef(null);
  const startXRef = useRef(0);
  const rotationSpeed = 0.5;
  
  // Sample images if none provided
  const images = [
    '/images/car-1.jpg',
    '/images/car-2.jpg',
    '/images/car-3.jpg',
    '/images/gallery-car-1.jpg',
    '/images/gallery-car-2.jpg',
    '/images/gallery-car-3.jpg',
    '/images/gallery-car-4.jpg',
    '/images/gallery-car-5.jpg',
    '/images/gallery-car-6.jpg',
  ];
  
  const displayImages = images;
  const totalImages = displayImages.length;
  
  useEffect(() => {
    if (loadedImages === totalImages) {
      setIsLoading(false);
    }
  }, [loadedImages, totalImages]);
  
  useEffect(() => {
    let rotationInterval;
    
    if (autoRotate) {
      rotationInterval = setInterval(() => {
        setCurrentAngle(prev => (prev + 1) % 360);
      }, 50);
    }
    
    return () => {
      if (rotationInterval) clearInterval(rotationInterval);
    };
  }, [autoRotate]);
  
  const handleImageLoad = () => {
    setLoadedImages(prev => prev + 1);
  };
  
  const handleMouseDown = (e) => {
    setIsDragging(true);
    startXRef.current = e.clientX;
    document.body.style.cursor = 'grabbing';
  };
  
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - startXRef.current;
    setCurrentAngle(prev => (prev + deltaX * rotationSpeed) % 360);
    startXRef.current = e.clientX;
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
    document.body.style.cursor = 'default';
  };
  
  const handleTouchStart = (e) => {
    setIsDragging(true);
    startXRef.current = e.touches[0].clientX;
  };
  
  const handleTouchMove = (e) => {
    if (!isDragging) return;
    
    const deltaX = e.touches[0].clientX - startXRef.current;
    setCurrentAngle(prev => (prev + deltaX * rotationSpeed) % 360);
    startXRef.current = e.touches[0].clientX;
  };
  
  const handleTouchEnd = () => {
    setIsDragging(false);
  };
  
  const toggleAutoRotate = () => {
    setAutoRotate(prev => !prev);
  };
  
  const resetView = () => {
    setCurrentAngle(0);
    setAutoRotate(false);
  };
  
  const currentImageIndex = Math.floor((currentAngle / 360) * totalImages) % totalImages;

  return (
    <div className="interactive-viewer-container">
      <div className="viewer-header">
        <h2>360° Interactive Viewer</h2>
        <p>Explore every angle of this classic beauty</p>
      </div>
      
      <div className="viewer-content">
        <div 
          ref={viewerRef}
          className="viewer-wrapper"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {isLoading && (
            <div className="viewer-loading">
              <div className="loading-spinner"></div>
              <p>Loading viewer... {Math.floor((loadedImages / totalImages) * 100)}%</p>
            </div>
          )}
          
          <div className="image-container">
            <img 
              src={displayImages[currentImageIndex]} 
              alt={`360 view angle ${currentAngle.toFixed(0)}°`}
              className="viewer-image"
              onLoad={handleImageLoad}
              style={{ opacity: isLoading ? 0 : 1 }}
            />
            
            <div className="viewer-overlay">
              <div className="rotation-guide">
                <div className="guide-arrow left">←</div>
                <div className="guide-text">Drag to rotate</div>
                <div className="guide-arrow right">→</div>
              </div>
            </div>
          </div>
          
          <div className="viewer-controls">
            <button 
              className={`control-btn ${autoRotate ? 'active' : ''}`}
              onClick={toggleAutoRotate}
              aria-label={autoRotate ? 'Stop auto rotation' : 'Start auto rotation'}
            >
              {autoRotate ? '⏹️' : '🔄'}
              <span>{autoRotate ? 'Stop Rotation' : 'Auto Rotate'}</span>
            </button>
            
            <button 
              className="control-btn"
              onClick={resetView}
              aria-label="Reset view"
            >
              &#8634;
              <span>Reset View</span>
            </button>
            
            <div className="angle-indicator">
              <span className="angle-value">{currentAngle.toFixed(0)}°</span>
            </div>
          </div>
        </div>
        
        <div className="viewer-info">
          <div className="info-section">
            <h4>Viewer Tips</h4>
            <ul>
              <li>Click and drag horizontally to rotate the view</li>
              <li>Use the auto-rotate feature for a full tour</li>
              <li>Zoom in with your browser for detail inspection</li>
            </ul>
          </div>
          
          <div className="info-section">
            <h4>Current Position</h4>
            <div className="position-indicator">
              <div className="angle-display">
                <span className="label">Angle:</span>
                <span className="value">{currentAngle.toFixed(0)}°</span>
              </div>
              <div className="image-count">
                <span className="label">Image:</span>
                <span className="value">{currentImageIndex + 1} / {totalImages}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}