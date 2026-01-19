import React, { useEffect, useCallback } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './WelcomePage.css';

const WelcomePage = ({ onStart }) => {
  const [isAnimating, setIsAnimating] = React.useState(false);

  const handleStartClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      onStart();
    }, 600);
  };

  // Efecto de estrellas al mover el cursor
  const createStar = useCallback((x, y) => {
    const star = document.createElement('div');
    star.className = 'star-trail';
    star.innerHTML = '✨';
    star.style.left = x + 'px';
    star.style.top = y + 'px';
    star.style.fontSize = Math.random() * 15 + 10 + 'px';
    document.body.appendChild(star);

    setTimeout(() => {
      star.remove();
    }, 1000);
  }, []);

  useEffect(() => {
    let throttleTimer = null;
    
    const handleMouseMove = (e) => {
      if (throttleTimer) return;
      
      throttleTimer = setTimeout(() => {
        createStar(e.clientX, e.clientY);
        throttleTimer = null;
      }, 50);
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (throttleTimer) clearTimeout(throttleTimer);
    };
  }, [createStar]);

  return (
    <Container fluid className={`welcome-container magic-cursor ${isAnimating ? 'fade-out' : ''}`}>
      <Row className="min-vh-100 align-items-center justify-content-center">
        <Col md={8} className="text-center">
          <div className="welcome-content">
            <h1 className="welcome-title mb-4 animate-bounce">
              🎉 ¡Revelación de Género! 🎉
            </h1>
            
            <div className="welcome-emoji mb-4">
              <span className="emoji-large">👶✨</span>
            </div>

            <p className="welcome-subtitle lead mb-5">
              Prepárate para un momento mágico... descubre el género de tu bebé de una manera extraordinaria.
            </p>

            <Button
              variant="dark"
              size="lg"
              onClick={handleStartClick}
              className="btn-start animate-pulse"
            >
              Comenzar la Aventura 🚀
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default WelcomePage;
