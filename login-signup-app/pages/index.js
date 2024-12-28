import React, {useState, useEffect} from "react";
import Navbar from "../components/Navbar";
import "../styles/index.css"; // Import the CSS for the slider

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    "/images/slide-1.jpg",
    "/images/slide-2.jpg",
    "/images/slide-2.jpg",
  ];

  // Function to go to the next slide
  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextSlide();
    }, 5000); // Changes slide every 5 seconds
    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="slider-container">
        {/* Slider Images */}
        <div
          className="slider"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
            transition: "transform 0.8s ease-in-out",
          }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="slide">
              <img
                src={slide}
                alt={`Slide ${index + 1}`}
                className="slide-image"
              />
            </div>
          ))}
        </div>

        {/* Dot Indicator */}
        <div className="dot-indicator">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`dot ${currentSlide === index ? "active" : ""}`}
              onClick={() => setCurrentSlide(index)} // Click to navigate to a specific slide
            ></span>
          ))}
        </div>
      </div>
    </>
  );
}
