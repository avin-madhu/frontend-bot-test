import React, { useState } from 'react';
import './App.css'; 

function Chatbot() {
  const [inputValue, setInputValue] = useState('');
  const [selectedText, setSelectedText] = useState('');
  const [messages, setMessages] = useState([]);

  const textOptions = [
    'College of Engineering Chengannur',
    'College of Engineering Adoor',
  ];
  
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSelectChange = (e) => {
    setSelectedText(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() || selectedText) {
      const newMessage = inputValue.trim() || selectedText;
      setMessages([...messages, newMessage]);
      setInputValue('');
      setSelectedText('');
    }
  };

  return (
    <div className="chatbot">
      <header className="chatbot-header">
        <h1>Chatbot Interface</h1>
      </header>
      <div className="chatbot-body">
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className="message">
              {msg}
            </div>
          ))}
        </div>
        <div className="input-area">
          <select value={selectedText} onChange={handleSelectChange}>
            <option value="">Select a text</option>
            {textOptions.map((text, index) => (
              <option key={index} value={text}>
                {text}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Type your message..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;