import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import TextField from './components/TextField';

function speakText(text) {
  // Check if speech synthesis is supported
  if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
  } else {
      console.log("Speech synthesis not supported in this browser.");
  }
}

// Chatbot Component
const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [selectedContent, setSelectedContent] = useState('');
  const [responseData, setResponseData] = useState(null);

  const handleBackendRequest = async (e) =>{
    const response = await fetch('http://127.0.0.1:5000/get_data', {
      method: 'POST',
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({question: messages[messages.length-1]}),
    });

    if(!response.ok){
      console.error("No response bruh!");
    }

    console.log(response.status + "successs ahda monu")

    const data = await response.json();
    setResponseData(data['output']);
    setMessages([...messages,data['output']]);
    speakText(data['output'])
  }

  const handleSendMessage = (message) => {
      setMessages([...messages, message]);
      // speakText(message);
    }

  useEffect(()=>{
    if(messages.length>0 && messages.length%2){
      console.log("end message: "+messages[messages.length-1]);
      handleBackendRequest();
    }
  },[messages])

  const chatContainerStyle = {
    display: 'flex',
    height: '85vh',
    backgroundColor: '#f4f4f4',
  };

  const sidebarStyle = {
    width: '250px',
    backgroundColor: '#fff',
    padding: '20px',
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
  };

  const chatAreaStyle = {
    flex: 1,
    display: 'flex',
    overflowY: 'auto',
    flexDirection: 'column',
    padding: '20px',
    alignItems: 'center',
    fontFamily: 'raleway',
    backgroundColor: 'rgba(137, 172, 225, 0.15)'
  };

  const messagesStyle = {
    flex: 1,
    overflowY: 'auto',
    marginBottom: '20px',
    padding: '10px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    width: '100%', // Full width for messages area
    maxWidth: '600px', // Max width for messages area
  };

  const dropdownStyle = {
    marginTop: '20px',
    padding: '10px',
    borderRadius: '5px',
    width: '100%',
  };

  // const listStyle = {
  //   listStyleType: 'none',
  //   padding: 0,
  //   maxHeight: '200px', // Limit height for scrolling
  //   overflowY: 'auto', // Enable scrolling
  //   marginBottom: '20px',
  // };

  const footerStyle = {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '10px'
  }

  return (
    <>
    <Navbar/>
    <div style={chatContainerStyle}>
      <div className='sideBar' style={sidebarStyle}>
        {/* to right code so that it is only visible*/}
        {/* <h2>Chat History</h2>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {messages.map((msg, index) => (
            <li key={index} style={listStyle}>
              {msg}
            </li>
          ))}
        </ul> */}
        <select
          style={dropdownStyle}
          value={selectedContent}
          onChange={(e) => setSelectedContent(e.target.value)}
        >
          <option value="">Select College</option>
          <option value="Content 1">College of Engineering Chengannur</option>
          <option value="Content 2">College of Engineering Adoor</option>
          <option value="Content 3">College of Engineering Kalloopaara</option>
        </select>
      </div>
      <div style={chatAreaStyle}>
        <div style={messagesStyle}>
          {messages.map((msg, index) => (
            <div key={index} style={{ margin: '10px 0' }}>
              <div style={{ padding: '10px', borderRadius: '10px', backgroundColor: 'rgba(165, 204, 255, 0.61)' }}>
                {msg}
              </div>
            </div>
          ))}
        </div>
        <TextField onSend={handleSendMessage}/>
      </div>
    </div>
    <div style={footerStyle}>
        <p>IHRD chatbot 2025©</p>
    </div>
    </>
  );
};

export default Chatbot;