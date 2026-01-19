import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { getBoxClasses } from '../../Services/classesService';
import './SurpriseBox.css';

const SurpriseBox = ({
  state,
  gender,
  babyName,
  onMouseEnter,
  onMouseLeave,
  onReveal,
  isRevealed
}) => {
  const [showOverlay, setShowOverlay] = React.useState(false);
  const [particles, setParticles] = React.useState([]);
  const [countdown, setCountdown] = React.useState(null);
  const [flash, setFlash] = React.useState(false);

  const handleRevealClick = () => {
    // Start Countdown
    setCountdown(3);
  };

  React.useEffect(() => {
    if (countdown === null) return;

    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // Reveal after countdown
      setCountdown(null);
      setShowOverlay(true);
      onReveal();
      triggerExplosion();
    }
  }, [countdown, onReveal]);

  const triggerExplosion = () => {
    // Crear partículas de explosión
    const newParticles = Array.from({ length: 30 }).map((_, i) => {
      const angle = (i / 30) * Math.PI * 2;
      const velocity = 200 + Math.random() * 200;
      return {
        id: i,
        emoji: gender === 'Rosa' ? ['💕', '🎀', '✨', '💗', '🌸'][Math.floor(Math.random() * 5)] : ['💙', '🎩', '✨', '💎', '🌟'][Math.floor(Math.random() * 5)],
        tx: Math.cos(angle) * velocity,
        ty: Math.sin(angle) * velocity,
      };
    });
    setParticles(newParticles);

    // Limpiar partículas después de la animación
    setTimeout(() => {
      setParticles([]);
    }, 3000);
  };

  const handleCapture = (e) => {
    e.stopPropagation();
    setFlash(true);
    setTimeout(() => setFlash(false), 200);
    // Here you would implement actual screenshot logic if needed
    console.log("Moment Captured!");
  };

  return (
    <div className="surprise-box-container my-5">
      <Card
        className={`surprise-box glass-panel ${getBoxClasses(state, gender)} ${state === 'hover' ? 'vibrating' : ''}`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={{ minHeight: '400px', cursor: 'pointer' }}
      >
        {/* Flash Effect */}
        {flash && <div className="camera-flash" />}

        {/* Countdown Overlay */}
        {countdown !== null && (
          <div className="countdown-overlay">
            <div className="countdown-number">{countdown}</div>
          </div>
        )}

        {/* Pantalla de Revelación Espectacular (Dentro de la caja) */}
        {isRevealed && showOverlay && (
          <div className="unified-revelation-overlay active glass-panel">
            <div className="revelation-card">
              <button className="close-revelation" onClick={(e) => { e.stopPropagation(); setShowOverlay(false); }}>×</button>

              <div className="revelation-header">
                <span className="sparkles-left">✨</span>
                <h2 className="main-title">¡MOMENTO MÁGICO!</h2>
                <span className="sparkles-right">✨</span>
              </div>

              <div className="revelation-main-emoji">
                <div className={`emoji-wrapper ${gender === 'Rosa' ? 'pink-theme' : 'blue-theme'}`}>
                  {gender === 'Rosa' ? '👧' : '👦'}
                </div>
              </div>

              <div className="revelation-details">
                <h3 className={`gender-text ${gender === 'Rosa' ? 'text-pink' : 'text-blue'}`}>
                  ¡ES {gender.toUpperCase()}!
                </h3>
                <div className="baby-name-container">
                  <span className="label">Bienvenido/a</span>
                  <h4 className="baby-name-display">{babyName}</h4>
                </div>
              </div>

              <Button
                variant="light"
                className="mt-3 glass-button"
                onClick={handleCapture}
              >
                📸 Capturar Momento
              </Button>
            </div>

            {/* Partículas de explosión */}
            <div className="explosion-particles">
              {particles.map(particle => (
                <div
                  key={particle.id}
                  className="particle"
                  style={{
                    '--tx': `${particle.tx}px`,
                    '--ty': `${particle.ty}px`,
                    left: '50%',
                    top: '50%',
                  }}
                >
                  {particle.emoji}
                </div>
              ))}
            </div>
          </div>
        )}

        <Card.Body className="d-flex flex-column align-items-center justify-content-center position-relative z-1">
          {!isRevealed ? (
            <>
              <div className="box-emoji mb-4">
                <span className="emoji-bounce">🎁</span>
              </div>
              <h3 className="text-muted mb-4">Pasa el mouse y luego revela</h3>
              <Button
                variant="warning"
                size="lg"
                onClick={handleRevealClick}
                className="btn-reveal glass-button"
                disabled={countdown !== null}
              >
                {countdown !== null ? '...' : '🎊 Revelar Género 🎊'}
              </Button>
            </>
          ) : (
            <div className="box-revealed-content">
              <div className={`mini-emoji-circle ${gender === 'Rosa' ? 'pink' : 'blue'}`}>
                {gender === 'Rosa' ? '👧' : '👦'}
              </div>
              <h4 className="mt-3 mb-0">¡Es {gender}!</h4>
              <p className="text-muted mb-3">{babyName}</p>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => setShowOverlay(true)}
                className="rounded-pill glass-button"
              >
                ✨ Ver mensaje de nuevo
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default SurpriseBox;
