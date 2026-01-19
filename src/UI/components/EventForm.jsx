import React from 'react';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { validateForm } from '../../Services/validationService';
import './EventForm.css';

const EventForm = ({ onSubmit, initialName = '', initialGender = '' }) => {
  const [name, setName] = React.useState(initialName);
  const [gender, setGender] = React.useState(initialGender);
  const [errors, setErrors] = React.useState({ nameError: false, genderError: false });
  const [genderChanged, setGenderChanged] = React.useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
    setGenderChanged(true);
    setTimeout(() => setGenderChanged(false), 600);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validateForm(name, gender);

    if (!validation.isValid) {
      setErrors({
        nameError: validation.nameError,
        genderError: validation.genderError
      });
      return;
    }

    setErrors({ nameError: false, genderError: false });
    onSubmit({ name, gender });
  };

  return (
    <Container className="py-2">
      <Row className="justify-content-center">
        <Col xs={12}>
          <Card className="glass-panel border-0 animate-form">
            <Card.Header className="bg-transparent border-0 text-center pt-4">
              <h4 className="mb-0 fw-bold text-gradient">📋 Configuración del Evento</h4>
            </Card.Header>
            <Card.Body className="p-4">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                  <Form.Label className="form-label">
                    👶 Nombre del Bebé
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingresa el nombre del bebé"
                    value={name}
                    onChange={handleNameChange}
                    isInvalid={errors.nameError}
                    className="form-input glass-input"
                  />
                  <Form.Control.Feedback type="invalid">
                    El nombre es obligatorio
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="form-label">
                    🎀 Género (Secreto)
                  </Form.Label>
                  <Form.Select
                    value={gender}
                    onChange={handleGenderChange}
                    isInvalid={errors.genderError}
                    className={`form-select glass-input ${genderChanged ? 'pulse-gender' : ''}`}
                  >
                    <option value="">Selecciona el género</option>
                    <option value="Rosa">👧 Rosa (Niña)</option>
                    <option value="Celeste">👦 Celeste (Niño)</option>
                  </Form.Select>
                  {gender && (
                    <div className={`gender-indicator mt-3 ${gender === 'Rosa' ? 'pink-flash' : 'blue-flash'}`}>
                      {gender === 'Rosa' ? '💕 ¡Será una niña!' : '💙 ¡Será un niño!'}
                    </div>
                  )}
                  <Form.Control.Feedback type="invalid">
                    Debes seleccionar un género
                  </Form.Control.Feedback>
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 btn-submit glass-button"
                >
                  💾 Guardar Configuración
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EventForm;
