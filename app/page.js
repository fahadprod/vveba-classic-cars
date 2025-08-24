'use client'

import { useEffect } from "react";
import ContactUs from "./components/contact-us";
import HeroHeader from "./components/hero-header";
import ImageGallery from "./components/image-gallery";
import Navbar from "./components/navbar";
import PopularCars from "./components/popular-cars";
import VideoGallery from "./components/video-gallery";
import CarFilter from "./components/cars-filters";
import BookingForm from "./components/booking-form";
import PriceCalculator from "./components/price-calculator";
import AvailabilityChecker from "./components/availability-checker";
import ComparisonTool from "./components/comparison-tool";
import CarTimeline from "./components/car-timeline";
import LocationFinder from "./components/location-finder";
import RentalConditions from "./components/rental-condition-faq";
import InteractiveViewer from "./components/viewer-360";
import ReviewSystem from "./components/car-review";
import SpecialOffers from "./components/special-offers-banner";
import BookingProgress from "./components/booking-progress-tracker";

export default function Home() {
  useEffect(() => {
    // Menu click handler
    const menu = document.querySelector(".menu");
    const handleMenuClick = () => {
      document.querySelectorAll(".target").forEach((item) => {
        item.classList.toggle("change");
      });
    };

    // Wrapper click handler
    const wrappers = document.querySelectorAll(".wrapper");
    const handleWrapperClick = () => {
      document.querySelectorAll(".target").forEach((item) => {
        item.classList.remove("change");
      });
    };

    // Video hover handlers
    const videos = document.querySelectorAll(".video");
    const handleVideoMouseOver = (video) => {
      return () => video.play();
    };
    const handleVideoMouseOut = (video) => {
      return () => video.pause();
    };

    // Add event listeners
    if (menu) menu.addEventListener("click", handleMenuClick);

    wrappers.forEach(wrapper => {
      wrapper.addEventListener("click", handleWrapperClick);
    });

    videos.forEach(video => {
      video.addEventListener("mouseover", handleVideoMouseOver(video));
      video.addEventListener("mouseout", handleVideoMouseOut(video));
    });

    // Cleanup function
    return () => {
      if (menu) menu.removeEventListener("click", handleMenuClick);

      wrappers.forEach(wrapper => {
        wrapper.removeEventListener("click", handleWrapperClick);
      });

      videos.forEach(video => {
        video.removeEventListener("mouseover", handleVideoMouseOver(video));
        video.removeEventListener("mouseout", handleVideoMouseOut(video));
      });
    };
  }, []);

  const carReviews = [
  {
    id: 1,
    author: "John Doe",
    date: "2025-03-15",
    rating: 5,
    title: "Amazing Experience",
    comment: "This classic car was in perfect condition!",
    verified: true
  },
  {
    id: 2,
    author: "Jane Smith", 
    date: "2024-09-20",
    rating: 4,
    title: "Great Car",
    comment: "Beautiful vehicle, smooth driving experience.",
    verified: false
  }
];
  return (
    <>
      <Navbar />
      <HeroHeader />
       <PriceCalculator
        basePrice={200}
        carName="BMW"
        currency="$"
      />
      <PopularCars />
      <SpecialOffers/>
      <CarFilter />
      <AvailabilityChecker 
      carId={1}
      carName="Ford Mustang GT"
      />
      <VideoGallery />
      <ImageGallery />
       <BookingProgress/>
      <BookingForm
        carId={1}
        price={200}
        carName="Audi" />
        <ComparisonTool/>
        <CarTimeline/>
        <RentalConditions/>
        <InteractiveViewer/>
        <LocationFinder/>
        <ReviewSystem 
        carId={123} 
        reviews={carReviews}
        />
      <ContactUs />
    </>
  );
}
