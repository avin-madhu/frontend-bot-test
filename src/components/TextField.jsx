import {useState} from 'react';

const TextField = ({ onSend }) => {

  const [inputValue, setInputValue] = useState('');

  const inputStyle = {
    padding: '15px 15px',
    paddingLeft: '25px',
    border: 'none',
    borderRadius: '25px',
    boxShadow: '0 4px 10px rgba(33, 33, 33, 0.17)',
    fontSize: '16px',
    outline: 'none',
    transition: 'box-shadow 0.3s ease',
    width: '80%',
    fontFamily: 'Roboto Mono, sans-serif',
    fontWeight: 'bold',
    color: 'rgba(48, 48, 48, 0.85)',
  };

  const buttonStyle = {
    marginLeft: '10px',
    padding: '15px 15px',
    border: 'none',
    borderRadius: '50%',
    backgroundColor: 'white',
    color: 'white',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const handleFocus = (e) => {
    e.target.style.boxShadow = '0 4px 20px hsla(215, 100.00%, 76.50%, 0.52)';
  };

  const handleBlur = (e) => {
    e.target.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      onSend(inputValue);
      setInputValue('');
    }
  };

  const startVoiceRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.onstart = () => {
        console.log("Speak up bro, voice started!");
    };
    recognition.onresult = (e) => {
        if (e.results && e.results.length > 0) {
            const transcript = e.results[0][0].transcript;
            onSend(transcript);
          } else {
            console.warn('No results found in speech recognition.');
        }
    };
    recognition.onerror = (event) => {
        console.error('Error occurred in recognition: ' + event.error);
    };
    recognition.onend = () => {
        console.log('Voice recognition ended.');
    };
    recognition.start();
  }

  return (
    <div style={{display: 'flex', alignItems: 'center', width: '70%'}}>
        <input
            type="text"
            placeholder="Type a message..."
            style={inputStyle}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyPress={handleKeyPress}
        />
        <button style={buttonStyle} onClick={startVoiceRecognition}>
        🎤
        </button>
    </div>
  );
};

export default TextField;