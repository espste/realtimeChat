import './App.css';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';


function App() {
  const socket = io.connect("http://localhost:3001");
  const [message, setMessage] = useState('');
  const [messageReceived, setMessageReceived] = useState('');
  
  const sendMessage = (room) => {
    socket.emit("send_message", { message, room });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    })
  }, [socket]);

  return (
    <div className="App">
      <input 
        placeholder="Message..." 
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <button onClick={sendMessage}>Send Message</button>
      <h3>Message:</h3>
      {messageReceived}
    </div>
  );
}

export default App;
