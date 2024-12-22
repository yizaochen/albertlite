import React, { useState, useCallback } from "react";

const HistorySession = ({ session, isActive, onDelete, onSelect }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(session.title);

  const handleEditClick = useCallback((e) => {
    e.stopPropagation();
    setIsEditing(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsEditing(false);
    console.log(`Updated title for chat ${session.id}: ${title}`);
  }, [session.id, title]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") {
        setIsEditing(false);
        console.log(`Updated title for chat ${session.id}: ${title}`);
      }
    },
    [session.id, title]
  );

  const handleDeleteClick = useCallback(
    (e) => {
      e.stopPropagation();
      onDelete(session.id);
    },
    [onDelete, session.id]
  );

  const handleSelect = useCallback(() => {
    onSelect(session.id);
  }, [onSelect, session.id]);

  const containerClass = `list-group-item list-group-item-action py-2 hstack gap-2 history-session ${
    isActive ? "active" : ""
  }`;

  return (
    <div className={containerClass} onClick={handleSelect}>
      {isEditing ? (
        <input
          type="text"
          className="form-control chat-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <span className="chat-title me-auto">{title}</span>
      )}
      <span className="edit" onClick={handleEditClick}>
        <i className="bi bi-pencil-square fs-5"></i>
      </span>
      <span className="delete" onClick={handleDeleteClick}>
        <i className="bi bi-trash3 fs-5"></i>
      </span>
    </div>
  );
};

export default HistorySession;
