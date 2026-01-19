import React from 'react';
import { Container, Row, Col, Card, Badge, ProgressBar } from 'react-bootstrap';
import { getEmotionBadge } from '../../Services/classesService';
import './MouseSensor.css';

const MouseSensor = ({ onMouseMove }) => {
  const [mouseX, setMouseX] = React.useState(0);
  const [mouseY, setMouseY] = React.useState(0);
  const [containerHeight, setContainerHeight] = React.useState(0);
  const containerRef = React.useRef(null);

  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setMouseX(Math.round(x));
      setMouseY(Math.round(y));
      setContainerHeight(rect.height);

      onMouseMove({ x: Math.round(x), y: Math.round(y) });
    }
  };

  const emotionData = getEmotionBadge(mouseY, containerHeight || 1);
  const progressValue = containerHeight > 0 ? Math.round((mouseX / (containerRef.current?.getBoundingClientRect().width || 1)) * 100) : 0;

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-lg mouse-sensor-card">
            <Card.Header className="sensor-header">
              <h4 className="mb-0">📊 Sensor de Emociones</h4>
            </Card.Header>
            <Card.Body onMouseMove={handleMouseMove} ref={containerRef} className="sensor-body">
              <div className="sensor-content">
                <div className="coordinates-display">
                  <div className="coordinate">
                    <span className="coordinate-label">X:</span>
                    <span className="coordinate-value animate-coordinate">{mouseX}</span>
                  </div>
                  <div className="separator">|</div>
                  <div className="coordinate">
                    <span className="coordinate-label">Y:</span>
                    <span className="coordinate-value animate-coordinate">{mouseY}</span>
                  </div>
                </div>

                <div className="progress-display mt-4">
                  <p className="progress-label">Progreso X (Izquierda → Derecha):</p>
                  <ProgressBar 
                    now={progressValue} 
                    className="sensor-progress"
                    label={`${progressValue}%`}
                  />
                </div>

                <div className="emotion-display mt-4">
                  <p className="emotion-label">Estado Emocional:</p>
                  <Badge
                    bg={emotionData.color}
                    className={`emotion-badge animate-emotion emotion-${emotionData.color}`}
                  >
                    {emotionData.text}
                  </Badge>
                </div>

                <p className="sensor-hint mt-4 text-muted">
                  🖱️ Mueve el mouse en esta área para ver cambios en tiempo real
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MouseSensor;
