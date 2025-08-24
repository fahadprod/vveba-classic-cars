// components/BookingProgress.js
import { useState, useEffect } from 'react';

export default function BookingProgress() {
  const [currentStep, setCurrentStep] = useState(2); // Default to step 2 for demo
  const [isAnimating, setIsAnimating] = useState(false);
  
  const steps = [
    { 
      id: 1, 
      name: 'Select Car', 
      description: 'Choose your classic vehicle',
      icon: '🚗'
    },
    { 
      id: 2, 
      name: 'Choose Dates', 
      description: 'Pick rental period',
      icon: '📅'
    },
    { 
      id: 3, 
      name: 'Add Extras', 
      description: 'Insurance & accessories',
      icon: '⭐'
    },
    { 
      id: 4, 
      name: 'Review & Pay', 
      description: 'Confirm details & payment',
      icon: '✓'
    },
    { 
      id: 5, 
      name: 'Confirmation', 
      description: 'Booking complete!',
      icon: '🎉'
    }
  ];

  // Demo animation to show progress
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(prev => prev >= steps.length ? 1 : prev + 1);
        setIsAnimating(false);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className='wrapper'>
        <div className="booking-progress-container target">
      <div className="progress-header">
        <h2>Booking Progress</h2>
        <p>Track your journey to driving a classic car</p>
      </div>

      <div className="progress-tracker">
        {/* Progress Bar */}
        <div className="track-progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        {/* Steps */}
        <div className="steps-container">
          {steps.map((step, index) => {
            const isCompleted = step.id < currentStep;
            const isActive = step.id === currentStep;
            const stepPosition = (index / (steps.length - 1)) * 100;

            return (
              <div 
                key={step.id}
                className={`step ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`}
                style={{ left: `${stepPosition}%` }}
              >
                <div className="step-marker">
                  <div className="track-marker-icon">
                    {isCompleted ? '✓' : step.icon}
                  </div>
                  {isActive && <div className="active-pulse"></div>}
                </div>
                
                <div className="step-content">
                  <h4 className="step-name">{step.name}</h4>
                  <p className="step-description">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Info */}
        <div className="track-progress-info">
          <div className="track-progress-status">
            <span className="track-status-text">
              {currentStep === 1 && 'Selecting your classic car...'}
              {currentStep === 2 && 'Choosing rental dates...'}
              {currentStep === 3 && 'Adding extras to your rental...'}
              {currentStep === 4 && 'Reviewing details & payment...'}
              {currentStep === 5 && 'Booking confirmed! Ready to drive!'}
            </span>
          </div>
          
          <div className="track-progress-percentage">
            <span className="track-percentage-value">{Math.round(progressPercentage)}%</span>
            <span className="track-percentage-label">Complete</span>
          </div>
        </div>
      </div>

      {/* Demo Controls */}
      <div className="demo-controls">
        <p className="demo-note">Demo: Progress automatically cycles for demonstration</p>
        <div className="control-buttons">
          <button 
            onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
            className="control-btn"
          >
            Previous Step
          </button>
          <button 
            onClick={() => setCurrentStep(prev => Math.min(steps.length, prev + 1))}
            disabled={currentStep === steps.length}
            className="control-btn primary"
          >
            Next Step
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}