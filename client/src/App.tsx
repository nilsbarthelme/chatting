import React, { useState, useEffect } from 'react';
import './App.css';
import LoginScreen from './components/LoginScreen';
import ChatInterface from './components/ChatInterface';
import { socketService } from './services/socketService';
import { Message } from './types';

function App() {
  const [username, setUsername] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // Set up socket event handlers
    socketService.init();

    // Handle join response
    socketService.onJoinResponse((response) => {
      if (response.success) {
        setIsLoggedIn(true);
        setUsername(response.username || '');
        setMessages(response.messages || []);
        setError('');
      } else {
        setError(response.message || 'Unknown error');
      }
    });

    // Handle new messages
    socketService.onMessageReceived((message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Clean up on component unmount
    return () => {
      socketService.disconnect();
    };
  }, []);

  const handleLogin = (username: string) => {
    socketService.joinRequest(username);
  };

  const handleSendMessage = (content: string) => {
    socketService.sendMessage(content);
  };

  return (
    <div className="app-container">
      {!isLoggedIn ? (
        <LoginScreen onLogin={handleLogin} error={error} />
      ) : (
        <ChatInterface
          username={username}
          messages={messages}
          onSendMessage={handleSendMessage}
        />
      )}
    </div>
  );
}

export default App;
