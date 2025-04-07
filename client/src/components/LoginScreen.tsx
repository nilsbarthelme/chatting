import React, { useState } from 'react';
import './LoginScreen.css';

interface LoginScreenProps {
  onLogin: (username: string) => void;
  error: string;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, error }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username.trim());
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Chat Application</h1>
        <p className="login-subtitle">Enter a username to join the chat</p>
        
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="username-input"
            maxLength={20}
            autoFocus
          />
          {error && <p className="error-message">{error}</p>}
          <button 
            type="submit" 
            className="login-button"
            disabled={!username.trim()}
          >
            Join Chat
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
