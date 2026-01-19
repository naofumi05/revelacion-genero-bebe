import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './ResetButton.css';

const ResetButton = ({ onClick }) => {
  const [isHovering, setIsHovering] = React.useState(false);

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={6} className="text-center">
          <Button
            variant="danger"
            size="lg"
            onClick={onClick}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className={`btn-reset ${isHovering ? 'btn-reset-hover' : ''}`}
          >
            🔄 Reiniciar Evento
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ResetButton;
