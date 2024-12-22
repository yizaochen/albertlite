import React from "react";
import AIMessage from "./AIMessage";
import HumanMessage from "./HumanMessage";

const ChatMessage = ({ message }) => {
  if (!message || typeof message !== "object") {
    return <p>Invalid message</p>;
  }

  const { content = "", ai_generated, source_info_list } = message;

  return ai_generated ? (
    <AIMessage content={content} sourceInfoList={source_info_list} />
  ) : (
    <HumanMessage content={content} />
  );
};

export default ChatMessage;
