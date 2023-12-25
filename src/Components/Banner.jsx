import React, { useEffect, useRef } from "react";
import "./styleB.css";

const Banner = ({ Title }) => {
  const parallaxRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const translateY = scrollY * 0.5;

      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${translateY}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="banner-container">
      <div className="parallax-bg" ref={parallaxRef}>
        <img
          className="w-auto rounded-t-xl"
          src="/poto.jpeg"
          alt="Your Company"
        />
      </div>
      <div className="banner-content">
        <h1 className="text-7xl">{Title}</h1>
        <p>Where all our great things begin</p>
      </div>
    </div>
  );
};

export default Banner;
