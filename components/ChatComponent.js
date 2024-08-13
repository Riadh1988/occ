import React, { useState, useEffect } from 'react';
const ChatComponent = ({ ticketId, handleChatMessageChange, handleSendMessage }) => {
  const [input, setInput] = useState('');
  const chatMessages = [];
  useEffect(() => {
    // Scroll to bottom on new message
    const chatWindow = document.querySelector('.chat-window');
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }, [chatMessages]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = () => {
    handleSendMessage(ticketId, input);
    setInput('');
  };

  return (
    <div className="chat-component">
      <div className="chat-window">
        {chatMessages.map((msg, index) => (
          <div key={index} className={`message ${msg.user === 'me' ? 'user-message' : 'agent-message'}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
        />
        <button onClick={handleSubmit}>Send</button>
        <h3>Chat for Ticket: {ticketId}</h3>
      </div>
    </div>
  );
};
export default ChatComponent;