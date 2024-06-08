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
      {description.length === 0 ? (
        <div style={{backgroundColor:'transparent',
        alignItems:'center',
        display:'flex',
        justifyContent:'center',
        fontFamily:'Helvetica',
        fontWeight:'lighter',
        fontSize:'1.5rem',
        color:'antiquewhite'
      }}>No hay descripciones aún</div>
      ) : (
        <>
          <div
            className="carousel-inner"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {description.map((des, index) => (
              <div
                className={`carousel-item ${index === currentIndex ? 'active' : ''}`}
                key={index}
              >
                <div className="carousel-content" style={{padding:'3rem'}}>
                <p style={{color:'antiquewhite',
                    fontFamily:'Helvetica',
                    fontWeight:'600',
                    fontSize:'1rem',
                    marginBottom:'0.3rem'
                  }}>Contexto</p>
                  <p
                    style={{color:'antiquewhite',
                    fontFamily:'Helvetica',
                    fontWeight:'lighter',
                    fontSize:'0.8rem',
                    textAlign:'center',
                    marginBottom:'2rem'
                  }}>{des.context}</p>
                  <p style={{color:'antiquewhite',
                    fontFamily:'Helvetica',
                    fontWeight:'600',
                    fontSize:'1rem',
                    marginBottom:'0.3rem'
                  }}>URL de pdf</p>
                  <p
                    style={{color:'antiquewhite',
                    fontFamily:'Helvetica',
                    fontWeight:'lighter',
                    fontSize:'0.8rem',
                    textAlign:'center',
                    marginBottom:'2rem'
                  }}>{des.pdfurl}</p>
                  <p style={{color:'antiquewhite',
                    fontFamily:'Helvetica',
                    fontWeight:'600',
                    fontSize:'1rem',
                    marginBottom:'0.3rem'
                  }}>Pregunta</p>
                  <p
                    style={{color:'antiquewhite',
                    fontFamily:'Helvetica',
                    fontWeight:'lighter',
                    fontSize:'0.8rem',
                    textAlign:'center',
                    marginBottom:'2rem'
                  }}>{des.description}</p>
                  <p style={{color:'antiquewhite',
                    fontFamily:'Helvetica',
                    fontWeight:'600',
                    fontSize:'1rem',
                    marginBottom:'0.3rem'
                  }}>Respuesta</p>
                  <p
                    style={{color:'antiquewhite',
                    fontFamily:'Helvetica',
                    fontWeight:'lighter',
                    fontSize:'0.8rem',
                    textAlign:'left'
                  }}>{des.prescription}</p>
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
        </>
      )}
    </div>
  );
};

export default PrevDescription;
