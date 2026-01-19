import React from 'react';
import { Container, Row, Col, Modal, Button, ProgressBar } from 'react-bootstrap';
import WelcomePage from './UI/pages/WelcomePage';
import EventForm from './UI/components/EventForm';
import SurpriseBox from './UI/components/SurpriseBox';
import MouseSensor from './UI/components/MouseSensor';
import Confetti from './UI/components/Confetti';
import ResetButton from './UI/components/ResetButton';
import { createConfetti } from './Services/confettiService';
import { getGenderBgStyle, getTextColor } from './Services/colorService';
import './App.css';

function App() {
  // Estados principales
  const [showWelcome, setShowWelcome] = React.useState(true);
  const [showIntro, setShowIntro] = React.useState(false); // Intro modal state
  const [babyName, setBabyName] = React.useState('');
  const [genderSelected, setGenderSelected] = React.useState('');
  const [boxState, setBoxState] = React.useState('neutral');
  const [isRevealed, setIsRevealed] = React.useState(false);
  const [showAlert, setShowAlert] = React.useState(false);
  const [confetti, setConfetti] = React.useState([]);
  const [mouseCoords, setMouseCoords] = React.useState({ x: 0, y: 0 });
  const [stars, setStars] = React.useState([]);
  const starIdRef = React.useRef(0);

  // Calculate progress
  const getProgress = () => {
    if (isRevealed) return 100;
    if (babyName && genderSelected) return 66;
    if (!showWelcome) return 33;
    return 0;
  };

  // useEffect 1: Inicialización - setear estado inicial
  React.useEffect(() => {
    console.log('useEffect 1: Inicialización - cargando tema neutral');
    document.body.style.backgroundColor = '#f8f9fa';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  // useEffect 2: Sincronización visual - cuando cambia el género o revelado
  React.useEffect(() => {
    console.log('useEffect 2: Sincronización visual -', { isRevealed, genderSelected });
    if (isRevealed && genderSelected) {
      // The background is now handled by CSS classes on the container, 
      // but we keep this for body fallback or specific overrides if needed.
      // document.body.style.background = ... (handled by CSS now for better performance)
    }
  }, [isRevealed, genderSelected]);

  // useEffect 3: Temporizado - mostrar confeti y alerta por 3 segundos
  React.useEffect(() => {
    if (isRevealed && genderSelected) {
      console.log('useEffect 3: Temporizado - mostrar confeti por 3 segundos');
      const confettiElements = createConfetti(genderSelected);
      setConfetti(confettiElements);
      setShowAlert(true);

      const timer = setTimeout(() => {
        setConfetti([]);
        setShowAlert(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isRevealed, genderSelected]);

  // useEffect 4: Rastro de estrellas mágicas al mover mouse
  React.useEffect(() => {
    let throttleTimer = null;

    const handleMouseMove = (e) => {
      if (throttleTimer) return;

      throttleTimer = setTimeout(() => {
        const newStar = {
          id: starIdRef.current++,
          x: e.clientX,
          y: e.clientY,
          emoji: ['✨', '⭐', '💫', '🌟'][Math.floor(Math.random() * 4)],
          size: Math.random() * 15 + 15 + 'px'
        };

        setStars(prevStars => [...prevStars, newStar]);

        // Remover estrella después de la animación
        setTimeout(() => {
          setStars(prevStars => prevStars.filter(s => s.id !== newStar.id));
        }, 1000);

        throttleTimer = null;
      }, 50);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (throttleTimer) clearTimeout(throttleTimer);
    };
  }, []);

  // Handler: Comenzar desde la página de bienvenida
  const handleStartEvent = React.useCallback(() => {
    setShowWelcome(false);
    setShowIntro(true); // Show intro tutorial
  }, []);

  // Handler: Envío del formulario (onSubmit)
  const handleFormSubmit = React.useCallback(({ name, gender }) => {
    console.log('Evento: onSubmit - Formulario guardado');
    setBabyName(name);
    setGenderSelected(gender);
  }, []);

  // Handler: Mouse enter en la caja sorpresa
  const handleBoxMouseEnter = React.useCallback(() => {
    console.log('Evento: onMouseEnter - Caja en tensión');
    setBoxState('hover');
  }, []);

  // Handler: Mouse leave en la caja sorpresa
  const handleBoxMouseLeave = React.useCallback(() => {
    console.log('Evento: onMouseLeave - Caja neutral');
    setBoxState('neutral');
  }, []);

  // Handler: Click en botón revelar
  const handleReveal = React.useCallback(() => {
    console.log('Evento: onClick - Revelación activada');
    setIsRevealed(true);
    setBoxState('revealed');
  }, []);

  // Handler: Mouse move en el sensor
  const handleMouseMove = React.useCallback((coords) => {
    setMouseCoords(coords);
  }, []);

  // Handler: Reiniciar evento
  const handleReset = React.useCallback(() => {
    console.log('Evento: Reiniciando evento');
    setBabyName('');
    setGenderSelected('');
    setBoxState('neutral');
    setIsRevealed(false);
    setShowAlert(false);
    setConfetti([]);
    setMouseCoords({ x: 0, y: 0 });
    document.body.style.backgroundColor = '#f8f9fa';
  }, []);

  if (showWelcome) {
    return <WelcomePage onStart={handleStartEvent} />;
  }

  const themeClass = isRevealed && genderSelected
    ? (genderSelected === 'niña' ? 'bg-light-pink-theme' : 'bg-light-blue-theme')
    : '';

  return (
    <div className={`app-container ${themeClass}`}>
      {/* Background Bubbles */}
      <div className="bg-pattern-bubbles">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="bubble"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`
            }}
          />
        ))}
      </div>

      {/* Rastro de estrellas mágicas */}
      {stars.map(star => (
        <div
          key={star.id}
          className="magic-star"
          style={{
            left: `${star.x}px`,
            top: `${star.y}px`,
            fontSize: star.size
          }}
        >
          {star.emoji}
        </div>
      ))}

      <Confetti gender={genderSelected} confettiElements={confetti} />

      {/* Intro Modal */}
      <Modal
        show={showIntro}
        onHide={() => setShowIntro(false)}
        centered
        dialogClassName="modal-glass-container"
        contentClassName="modal-glass-content"
        backdrop="static"
      >
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="w-100 text-center">
            <h2 className="modal-title-gradient mb-0">✨ ¡Bienvenido! ✨</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-4 pb-4 pt-2">
          <p className="text-center text-muted mb-4 lead">
            Sigue estos pasos para vivir la magia:
          </p>

          <div className="steps-container">
            <div className="step-item">
              <div className="step-icon">📝</div>
              <div className="step-text">
                <strong>1. Configura</strong>
                <span className="text-small">Ingresa los datos del bebé</span>
              </div>
            </div>

            <div className="step-arrow">⬇️</div>

            <div className="step-item">
              <div className="step-icon">🎁</div>
              <div className="step-text">
                <strong>2. Interactúa</strong>
                <span className="text-small">Juega con la caja sorpresa</span>
              </div>
            </div>

            <div className="step-arrow">⬇️</div>

            <div className="step-item highlight">
              <div className="step-icon">🎊</div>
              <div className="step-text">
                <strong>3. ¡Revela!</strong>
                <span className="text-small">Descubre si es Niño o Niña</span>
              </div>
            </div>
          </div>

          <Button
            variant="primary"
            onClick={() => setShowIntro(false)}
            className="glass-button w-100 mt-4 py-3 fw-bold text-uppercase"
            style={{ letterSpacing: '2px' }}
          >
            ¡Comenzar la Magia! 🚀
          </Button>
        </Modal.Body>
      </Modal>

      <Container fluid className="py-5 position-relative" style={{ zIndex: 1 }}>
        {/* Progress Bar */}
        <Row className="mb-4 justify-content-center">
          <Col xs={12} md={8}>
            <div className="glass-panel p-3 mb-4">
              <h5 className="text-center mb-2">Progreso de la Revelación</h5>
              <ProgressBar
                now={getProgress()}
                label={`${getProgress()}%`}
                variant="info"
                animated
                style={{ height: '20px', borderRadius: '10px' }}
              />
            </div>
          </Col>
        </Row>

        {/* Sección 1: Formulario */}
        <Row className="mb-5 justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <div className="glass-panel p-4">
              <EventForm onSubmit={handleFormSubmit} initialName={babyName} initialGender={genderSelected} />
            </div>
          </Col>
        </Row>

        {/* Sección 2: Caja Sorpresa */}
        {babyName && genderSelected && (
          <Row className="mb-5 justify-content-center">
            <Col xs={12} md={8} lg={6}>
              <SurpriseBox
                state={boxState}
                gender={genderSelected}
                babyName={babyName}
                onMouseEnter={handleBoxMouseEnter}
                onMouseLeave={handleBoxMouseLeave}
                onReveal={handleReveal}
                isRevealed={isRevealed}
                showAlert={showAlert}
              />
            </Col>
          </Row>
        )}

        {/* Sección 3: Sensor de Emociones */}
        {babyName && genderSelected && (
          <Row className="mb-5 mt-5 pt-5 justify-content-center">
            <Col xs={12} md={8}>
              <div className="glass-panel p-4">
                <MouseSensor onMouseMove={handleMouseMove} />
              </div>
            </Col>
          </Row>
        )}

        {/* Sección 4: Botón Reiniciar */}
        {(babyName || genderSelected || isRevealed) && (
          <Row className="justify-content-center">
            <Col xs={12} md={6} className="text-center">
              <ResetButton onClick={handleReset} />
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
}

export default App;
