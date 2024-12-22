import React from "react";
import { Button } from "react-bootstrap";
import HistorySession from "./HistorySession";

const Sidebar = ({
  chatSessions,
  setChatSessions,
  activeSessionId,
  setActiveSessionId,
}) => {
  const handleSelectSession = (id) => {
    setActiveSessionId(id);
  };

  const handleDeleteSession = (id) => {
    setChatSessions(chatSessions.filter((session) => session.id !== id));
    console.log(`Deleted session ${id}`);
  };

  const handleNewChatClick = () => {
    const newId =
      chatSessions.length > 0
        ? Math.max(...chatSessions.map((session) => session.id)) + 1
        : 1;
    const newSession = { id: newId, title: `Session ${newId}`, messages: [] };
    setChatSessions([...chatSessions, newSession]);
    setActiveSessionId(newId);
    console.log(`Added new session: ${newSession.title}`);
  };

  return (
    <div id="sidebarMenu" className="sidebar bg-white shadow-sm">
      <div className="position-sticky">
        <div className="list-group list-group-flush mx-3 mt-3">
          <Button variant="dark" onClick={handleNewChatClick}>
            New Chat
          </Button>
        </div>
        <div className="list-group list-group-flush mx-0 hist-sess-container">
          {chatSessions.map((session) => (
            <HistorySession
              key={session.id}
              session={session}
              isActive={activeSessionId === session.id}
              onSelect={handleSelectSession}
              onDelete={handleDeleteSession}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
