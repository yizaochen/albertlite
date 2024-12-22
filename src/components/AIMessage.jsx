import React from "react";
import CopyIcon from "./CopyIcon";
import { marked } from "marked";

const escapeMathDelimiters = (input) =>
  input
    .replace(/\\\[/g, "\\\\[")
    .replace(/\\\]/g, "\\\\]")
    .replace(/\\\(/g, "\\\\(")
    .replace(/\\\)/g, "\\\\)");

const escapeUnderscores = (input) => input.replace(/_/g, "\\_");

const markedParse = (content) => marked(content);

const AIMessage = ({ content, sourceInfoList }) => {
  return (
    <div className="chat incoming bg-light">
      <div className="chat-details">
        <img src="/chatbot.jpg" alt="AI Avatar" />
        <div className="markdown-body">
          <div
            dangerouslySetInnerHTML={{
              __html: content
                ? markedParse(escapeMathDelimiters(escapeUnderscores(content)))
                : "No content to display. Something went wrong!",
            }}
          />
          {Array.isArray(sourceInfoList) && sourceInfoList.length > 0 && (
            <>
              <hr />
              <div className="source-info">
                {sourceInfoList.map((source, idx) => (
                  <p key={idx}>{source}</p>
                ))}
              </div>
            </>
          )}
        </div>
        <CopyIcon
          onCopy={() => {
            navigator.clipboard.writeText(content || "");
            console.log("Copied to clipboard!");
          }}
        />
      </div>
    </div>
  );
};

export default AIMessage;
