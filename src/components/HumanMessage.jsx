import React from "react";

const HumanMessage = ({ content }) => {
  return (
    <div className="chat outgoing bg-light-subtle">
      <div className="chat-details">
        <img src="/user.jpg" alt="User Avatar" />
        <div>{content}</div>
      </div>
    </div>
  );
};

export default HumanMessage;
