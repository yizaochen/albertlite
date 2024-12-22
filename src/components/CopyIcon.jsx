import React from "react";

const CopyIcon = ({ onCopy }) => {
  const handleCopy = () => {
    onCopy();
  };

  return (
    <span onClick={handleCopy}>
      <i className="bi bi-copy btn fs-4"></i>
    </span>
  );
};

export default CopyIcon;
