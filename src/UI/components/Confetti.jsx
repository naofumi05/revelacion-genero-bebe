import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './Confetti.css';

const Confetti = ({ gender, confettiElements }) => {
  if (!confettiElements || confettiElements.length === 0) {
    return null;
  }

  return (
    <div className="confetti-container">
      {confettiElements.map((conf) => {
        const isStarConfetti = Math.random() > 0.6; // 40% de estrellas
        return (
          <div
            key={conf.id}
            className={`confetti ${isStarConfetti ? 'confetti-star' : 'confetti-circle'}`}
            style={{
              left: `${conf.left}%`,
              '--delay': `${conf.delay}s`,
              '--duration': `${conf.duration}s`,
              '--color': conf.color,
              '--size': `${conf.size}px`,
            }}
          />
        );
      })}
    </div>
  );
};

export default Confetti;
