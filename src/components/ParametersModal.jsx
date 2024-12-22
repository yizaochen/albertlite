import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

const ParametersModal = ({
  show,
  maxResponse,
  temperature,
  onSave,
  onClose,
}) => {
  const [localMaxResponse, setLocalMaxResponse] = useState(maxResponse);
  const [localTemperature, setLocalTemperature] = useState(temperature);

  const handleSave = () => {
    onSave(localMaxResponse, localTemperature);
    onClose();
  };

  useEffect(() => {
    setLocalMaxResponse(maxResponse); // Sync local state with the passed maxResponse
    setLocalTemperature(temperature); // Sync local state with the passed temperature
  }, [maxResponse, temperature]);

  const onDefault = () => {
    setLocalMaxResponse(800);
    setLocalTemperature(0.5);
  };

  return (
    <Modal show={show} onHide={onClose} aria-labelledby="parametersModalLabel">
      <Modal.Header closeButton>
        <Modal.Title id="parametersModalLabel">Parameters</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="align-items-center mb-3">
          <Col md={3}>
            <Form.Label htmlFor="responseRange">Max Response</Form.Label>
          </Col>
          <Col md={6}>
            <Form.Range
              id="responseRange"
              min="1"
              max="4096"
              step="1"
              value={localMaxResponse}
              onChange={(e) => setLocalMaxResponse(e.target.value)}
            />
          </Col>
          <Col md={3}>
            <Form.Control
              type="text"
              value={localMaxResponse}
              readOnly
              disabled
              className="text-center"
            />
          </Col>
        </Row>
        <Row className="align-items-center">
          <Col md={3}>
            <Form.Label htmlFor="temperatureRange">Temperature</Form.Label>
          </Col>
          <Col md={6}>
            <Form.Range
              id="temperatureRange"
              min="0"
              max="1"
              step="0.01"
              value={localTemperature}
              onChange={(e) => setLocalTemperature(e.target.value)}
            />
          </Col>
          <Col md={3}>
            <Form.Control
              type="text"
              value={localTemperature}
              readOnly
              disabled
              className="text-center"
            />
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="warning" onClick={onDefault}>
          Default
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ParametersModal;
