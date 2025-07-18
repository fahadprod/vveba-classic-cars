'use client'

import { useEffect } from "react";
import ContactUs from "./components/contact-us";
import HeroHeader from "./components/hero-header";
import ImageGallery from "./components/image-gallery";
import Navbar from "./components/navbar";
import PopularCars from "./components/popular-cars";
import VideoGallery from "./components/video-gallery";

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
  return (
    <>
    <Navbar/>
    <HeroHeader/>
    <PopularCars/>
    <VideoGallery/>
    <ImageGallery/>
    <ContactUs/>
    </>
  );
}
