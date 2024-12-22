import React from "react";
import { Form, Button } from "react-bootstrap";

const UpperMenu = ({
  indexes,
  files,
  models,
  selectedModel,
  selectedIndex,
  selectedFile,
  onModelSelect,
  onIndexSelect,
  onFileSelect,
  onOpenParametersModal,
  onOpenSystemPromptModal,
  doRAG,
  onRAGSwitchChange,
}) => {
  const handleModelChange = (event) => {
    onModelSelect(event.target.value);
  };

  const handleIndexChange = (event) => {
    onIndexSelect(event.target.value);
  };

  const handleFileChange = (event) => {
    onFileSelect(event.target.value);
  };

  return (
    <div className="upper-menu border-bottom">
      <div className="hstack py-3">
        <div className="me-2">
          <Form.Label htmlFor="model-select">Model</Form.Label>
        </div>
        <div>
          <Form.Select
            id="model-select"
            aria-label="model-select"
            value={selectedModel || ""}
            onChange={handleModelChange}
          >
            {models.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
          </Form.Select>
        </div>

        <div className="ms-5 me-2">
          <Form.Label htmlFor="index-select">Index</Form.Label>
        </div>
        <div>
          <Form.Select
            id="index-select"
            aria-label="index-select"
            value={selectedIndex || ""}
            onChange={handleIndexChange}
          >
            {indexes.map((index) => (
              <option key={index.id} value={index.id}>
                {index.name}
              </option>
            ))}
          </Form.Select>
        </div>

        <div className="ms-5 me-2">
          <Form.Label htmlFor="file-select">File</Form.Label>
        </div>
        <div>
          <Form.Select
            id="file-select"
            aria-label="file-select"
            value={selectedFile || ""}
            onChange={handleFileChange}
          >
            <option value="-1">All</option>
            {files.map((file) => (
              <option key={file.id} value={file.id}>
                {file.name}
              </option>
            ))}
          </Form.Select>
        </div>

        <div className="ms-5 me-3 ms-auto">
          <Button variant="secondary" onClick={onOpenParametersModal}>
            Parameters
          </Button>
        </div>
        <div className="me-4">
          <Button variant="secondary" onClick={onOpenSystemPromptModal}>
            System Prompt
          </Button>
        </div>

        <div className="form-check form-switch">
          <Form.Check
            type="switch"
            id="checkbox-rag"
            label="檢索文件"
            name="checkbox-rag"
            checked={doRAG}
            onChange={onRAGSwitchChange}
          />
        </div>
      </div>
    </div>
  );
};

export default UpperMenu;
