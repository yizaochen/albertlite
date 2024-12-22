import { useState, useEffect } from "react";
import "./App.css";
import AppNavbar from "./components/AppNavbar";
import Sidebar from "./components/Sidebar";
import UpperMenu from "./components/UpperMenu";
import ChatContainer from "./components/ChatContainer";
import TypingContainer from "./components/TypingContainer";
import SystemPromptModal from "./components/SystemPromptModal";
import ParametersModal from "./components/ParametersModal";

import mockChatSessions from "./data/chat-data.json";

function App() {
  // Consolidated state
  const [data, setData] = useState({
    indexes: [],
    files: [],
    models: [],
  });
  const [selections, setSelections] = useState({
    model: 1,
    index: 1,
    file: -1,
  });

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      const mockData = {
        indexes: [
          { id: 1, name: "Index 1" },
          { id: 2, name: "Index 2" },
        ],
        files: [
          { id: 1, name: "File 1" },
          { id: 2, name: "File 2" },
        ],
        models: [
          { id: 1, name: "gpt-4o" },
          { id: 2, name: "gpt-4o-mini" },
        ],
      };
      setData(mockData);
    };

    fetchData();
  }, []);

  const [chatSessions, setChatSessions] = useState(mockChatSessions);
  const [activeSessionId, setActiveSessionId] = useState(1);
  const [activeMessages, setActiveMessages] = useState([]);

  // RAG Switch
  const [ragSwitch, setRAGSwitch] = useState(false);
  const toggleRAGSwitch = () => {
    setRAGSwitch((prev) => !prev);
    console.log("RAG Switch toggled, new value:", !ragSwitch);
  };

  // System Prompt Modal
  const [systemPromptModal, setSystemPromptModal] = useState({
    visible: false,
    text: "",
  });
  const toggleSystemPromptModal = (isVisible) => {
    setSystemPromptModal((prev) => ({ ...prev, visible: isVisible }));
  };
  const updateSystemPromptText = async (text) => {
    try {
      // Pseudo code for API call to save the prompt
      // 1. Prepare the payload
      const payload = { prompt: text };

      // 2. Call the REST API (replace with actual API endpoint and method)
      // const response = await fetch('/api/system-prompt', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(payload),
      // });

      // 3. Handle the API response (e.g., update the local state if necessary)
      // const data = await response.json();
      console.log("System prompt saved to database:", text);

      // Update local state after successful save
      setSystemPromptModal((prev) => ({ ...prev, text }));
    } catch (error) {
      console.error("Error saving system prompt:", error);
    }
  };

  // Modals of Parameters
  const [parameters, setParameters] = useState({
    visible: false,
    maxResponse: 800,
    temperature: 0.5,
  });
  const toggleParametersModal = (isVisible) => {
    setParameters((prev) => ({ ...prev, visible: isVisible }));
  };
  const updateParameters = async (maxResponse, temperature) => {
    try {
      // Pseudo code for API call to save the parameters
      // 1. Prepare the payload
      const payload = { maxResponse, temperature };

      // 2. Call the REST API (replace with actual API endpoint and method)
      // const response = await fetch('/api/parameters', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(payload),
      // });

      // 3. Handle the API response (e.g., update the local state if necessary)
      // const data = await response.json();
      console.log("Parameters saved to database:", payload);

      // Update local state after successful save
      setParameters((prev) => ({ ...prev, maxResponse, temperature }));
    } catch (error) {
      console.error("Error saving parameters:", error);
    }
  };

  // Update activeMessages whenever activeSessionId or chatSessions changes
  useEffect(() => {
    const activeChatSession = chatSessions.find(
      (session) => session.id === activeSessionId
    );
    setActiveMessages(activeChatSession ? activeChatSession.messages : []);
  }, [activeSessionId, chatSessions]);
  return (
    <>
      <header>
        <Sidebar
          chatSessions={chatSessions}
          setChatSessions={setChatSessions}
          activeSessionId={activeSessionId}
          setActiveSessionId={setActiveSessionId}
        />
        <AppNavbar versionNumber="v0.3.2" />
      </header>

      <main>
        <div className="container-fluid">
          <UpperMenu
            indexes={data.indexes}
            files={data.files}
            models={data.models}
            selectedModel={selections.model}
            selectedIndex={selections.index}
            selectedFile={selections.file}
            onModelSelect={(id) => setSelections({ ...selections, model: id })}
            onIndexSelect={(id) => setSelections({ ...selections, index: id })}
            onFileSelect={(id) => setSelections({ ...selections, file: id })}
            onOpenParametersModal={() => toggleParametersModal(true)}
            onOpenSystemPromptModal={() => toggleSystemPromptModal(true)}
            doRAG={ragSwitch}
            onRAGSwitchChange={toggleRAGSwitch}
          />
          <ChatContainer messages={activeMessages} />
          <TypingContainer setActiveMessages={setActiveMessages} />
        </div>

        {/* Modals */}
        <SystemPromptModal
          show={systemPromptModal.visible}
          systemPrompt={systemPromptModal.text}
          onSave={updateSystemPromptText}
          onClose={() => toggleSystemPromptModal(false)}
        />
        <ParametersModal
          show={parameters.visible}
          maxResponse={parameters.maxResponse}
          temperature={parameters.temperature}
          onSave={updateParameters}
          onClose={() => toggleParametersModal(false)}
        />
      </main>
    </>
  );
}

export default App;
