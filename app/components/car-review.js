// components/ReviewSystem.js
import { useState } from 'react';

export default function ReviewSystem({ carId, reviews }) {
  const [userReview, setUserReview] = useState({ 
    rating: 0, 
    comment: '',
    title: ''
  });
  const [allReviews, setAllReviews] = useState(reviews || []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  // Sample reviews if none provided
  const sampleReviews = [
    {
      id: 1,
      author: "Michael Rodriguez",
      date: "2023-10-15",
      rating: 5,
      title: "Absolutely Incredible Experience",
      comment: "This classic Mustang drove like a dream. The maintenance was impeccable and the rental process was smooth. Will definitely rent again for special occasions!",
      verified: true
    },
    {
      id: 2,
      author: "Sarah Johnson",
      date: "2023-09-22",
      rating: 4,
      title: "Beautiful Car, Great Service",
      comment: "The Corvette Stingray was in perfect condition. Only reason for 4 stars is the limited mileage policy, but understandable for classic cars.",
      verified: true
    },
    {
      id: 3,
      author: "James Wilson",
      date: "2023-08-30",
      rating: 5,
      title: "Birthday Weekend to Remember",
      comment: "Rented the 1967 Ford Mustang for my husband's 50th birthday. The car turned heads everywhere we went! Flawless experience from booking to return.",
      verified: false
    }
  ];

  const displayReviews = allReviews.length > 0 ? allReviews : sampleReviews;
  
  // Calculate average rating
  const averageRating = displayReviews.length > 0 
    ? (displayReviews.reduce((sum, review) => sum + review.rating, 0) / displayReviews.length).toFixed(1)
    : 0;
  
  // Rating distribution
  const ratingDistribution = [0, 0, 0, 0, 0];
  displayReviews.forEach(review => {
    ratingDistribution[5 - review.rating]++;
  });

  const submitReview = async () => {
    if (userReview.rating === 0 || userReview.comment.trim() === '') return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newReview = {
      id: Date.now(),
      author: "You",
      date: new Date().toISOString().split('T')[0],
      rating: userReview.rating,
      title: userReview.title,
      comment: userReview.comment,
      verified: false
    };
    
    setAllReviews([newReview, ...displayReviews]);
    setUserReview({ rating: 0, comment: '', title: '' });
    setIsSubmitting(false);
  };

  const filteredReviews = activeFilter === 'all' 
    ? displayReviews 
    : displayReviews.filter(review => review.rating === parseInt(activeFilter));

  const renderStars = (rating, size = 'medium') => {
    const sizeClass = size === 'large' ? 'stars-large' : 'stars-medium';
    return (
      <div className={`rating-stars ${sizeClass}`}>
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            className={`star ${index < rating ? 'filled' : ''}`}
          >
            {index < rating ? '★' : '☆'}
          </span>
        ))}
      </div>
    );
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="review-system-container">
      <div className="reviews-header">
        <h2>Customer Reviews</h2>
        <p>See what others are saying about this classic beauty</p>
      </div>

      <div className="reviews-content">
        {/* Rating Summary */}
        <div className="rating-summary">
          <div className="overall-rating">
            <div className="average-score">{averageRating}</div>
            <div className="average-stars">{renderStars(Math.round(averageRating), 'large')}</div>
            <div className="total-reviews">{displayReviews.length} reviews</div>
          </div>
          
          <div className="rating-distribution">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = ratingDistribution[5 - rating];
              const percentage = displayReviews.length > 0 
                ? (count / displayReviews.length) * 100 
                : 0;
              
              return (
                <div key={rating} className="distribution-row">
                  <span className="rating-label">{rating} star</span>
                  <div className="distribution-bar">
                    <div 
                      className="distribution-fill" 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="rating-count">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Add Review Form */}
        <div className="add-review-section">
          <h3>Share Your Experience</h3>
          <div className="review-form">
            <div className="form-group">
              <label>Your Rating</label>
              <div className="rating-input">
                {[1, 2, 3, 4, 5].map(star => (
                  <span 
                    key={star} 
                    onClick={() => setUserReview({...userReview, rating: star})}
                    className={`rating-star ${star <= userReview.rating ? 'selected' : ''}`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            
            <div className="form-group">
              <label>Review Title</label>
              <input 
                type="text" 
                placeholder="Summarize your experience in a few words"
                value={userReview.title}
                onChange={(e) => setUserReview({...userReview, title: e.target.value})}
              />
            </div>
            
            <div className="form-group">
              <label>Your Review</label>
              <textarea 
                placeholder="Share details about your experience with this classic car..."
                rows="4"
                value={userReview.comment}
                onChange={(e) => setUserReview({...userReview, comment: e.target.value})}
              />
            </div>
            
            <button 
              onClick={submitReview}
              disabled={isSubmitting || userReview.rating === 0 || userReview.comment.trim() === ''}
              className="submit-review-btn"
            >
              {isSubmitting ? (
                <>
                  <div className="spinner"></div>
                  Submitting...
                </>
              ) : (
                'Submit Review'
              )}
            </button>
          </div>
        </div>

        {/* Reviews Filter */}
        <div className="reviews-filter">
          <span className="filter-label">Filter by:</span>
          <button 
            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All Reviews
          </button>
          {[5, 4, 3, 2, 1].map(rating => (
            <button 
              key={rating}
              className={`filter-btn ${activeFilter === rating.toString() ? 'active' : ''}`}
              onClick={() => setActiveFilter(rating.toString())}
            >
              {rating} Star{rating > 1 ? 's' : ''}
            </button>
          ))}
        </div>

        {/* Reviews List */}
        <div className="reviews-list">
          {filteredReviews.length === 0 ? (
            <div className="no-reviews">
              <div className="no-reviews-icon">💬</div>
              <h4>No reviews yet</h4>
              <p>Be the first to share your experience with this classic car!</p>
            </div>
          ) : (
            filteredReviews.map((review) => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <div className="reviewer-info">
                    <div className="reviewer-name">{review.author}</div>
                    {review.verified && <span className="verified-badge">✓ Verified Rental</span>}
                  </div>
                  <div className="review-date">{formatDate(review.date)}</div>
                </div>
                
                <div className="review-rating">
                  {renderStars(review.rating)}
                </div>
                
                {review.title && (
                  <h4 className="review-title">{review.title}</h4>
                )}
                
                <p className="review-comment">{review.comment}</p>
                
                {review.author === "You" && (
                  <div className="your-review-badge">Your Review</div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}