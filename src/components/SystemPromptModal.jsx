import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const SystemPromptModal = ({ show, systemPrompt, onSave, onClose }) => {
  const [localPrompt, setLocalPrompt] = useState(systemPrompt);

  const handleSave = () => {
    // Pass the prompt to the parent to save it, including the REST API call
    onSave(localPrompt);
    onClose();
  };

  useEffect(() => {
    setLocalPrompt(systemPrompt); // Sync local state with the passed systemPrompt
  }, [systemPrompt]);

  return (
    <Modal
      show={show}
      onHide={onClose}
      aria-labelledby="systemPromptModalLabel"
    >
      <Modal.Header closeButton>
        <Modal.Title id="systemPromptModalLabel">System Prompt</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="systemPromptTextarea">
          <Form.Label className="visually-hidden">System Prompt</Form.Label>
          <Form.Control
            as="textarea"
            rows={10}
            value={localPrompt}
            onChange={(e) => setLocalPrompt(e.target.value)}
            placeholder="Enter your system prompt..."
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SystemPromptModal;
