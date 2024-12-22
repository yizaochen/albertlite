import React, { useState } from "react";
import { FormControl, Spinner } from "react-bootstrap";

const TypingContainer = ({ setActiveMessages }) => {
  const [inputValue, setInputValue] = useState(""); // Local state for input

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add the user's message to the activeMessages
    const userMessage = {
      content: inputValue,
      ai_generated: false,
    };

    const botMessage = {
      content: `Here's a random number: ${Math.floor(Math.random() * 100)}`,
      ai_generated: true,
    };

    // Update activeMessages state
    setActiveMessages((prevMessages) => [
      ...prevMessages,
      userMessage,
      botMessage,
    ]);

    // Clear the input field
    setInputValue("");
  };

  const handleKeyDown = (e) => {
    // If Enter is pressed without Shift
    if (e.key === "Enter" && !e.shiftKey) {
      if (inputValue.trim() !== "") {
        e.preventDefault(); // Prevent default newline behavior
        handleSendMessage();
      }
    }
  };

  return (
    <div className="typing-container">
      <div className="typing-content d-flex align-items-center">
        <div className="typing-textarea text-bg-light">
          <FormControl
            as="textarea"
            id="chat-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown} // Handle keydown for Enter key
            placeholder="Enter a prompt here"
            spellCheck={false}
            className="border rounded-4"
          />
          <span id="send-btn" onClick={handleSendMessage}>
            <i className="bi bi-send btn fs-4"></i>
          </span>
        </div>
        <span id="search-btn" className="ms-3">
          <i className="bi bi-search btn fs-4"></i>
        </span>
        <Spinner
          id="loading-spinner"
          animation="border"
          role="status"
          aria-hidden="true"
          className="ms-3"
        />
      </div>
    </div>
  );
};

export default TypingContainer;
