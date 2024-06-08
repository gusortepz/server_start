import React, { useState } from 'react';
import './PrevDescription.css';

const PrevDescription = ({ description }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((currentIndex + 1) % description.length);
  };

  const prevSlide = () => {
    setCurrentIndex((currentIndex - 1 + description.length) % description.length);
  };

  return (
    <div className="carousel">
      <div
        className="carousel-inner"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {description.map((des, index) => (
          <div
            className={`carousel-item ${index === currentIndex ? 'active' : ''}`}
            key={index}
          >
            <div className="carousel-content">
              <p>{des.prescription}</p>
            </div>
          </div>
        ))}
      </div>
      <a className="carousel-control-prev" onClick={prevSlide}>
        <span className="carousel-control-prev-icon" aria-hidden="true">&lt;</span>
        <span className="sr-only">Previous</span>
      </a>
      <a className="carousel-control-next" onClick={nextSlide}>
        <span className="carousel-control-next-icon" aria-hidden="true">&gt;</span>
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
};

export default PrevDescription;
