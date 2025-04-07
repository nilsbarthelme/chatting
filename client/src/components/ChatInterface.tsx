import React, { useState, useEffect, useRef } from 'react';
import { Message } from '../types';
import './ChatInterface.css';

interface ChatInterfaceProps {
  username: string;
  messages: Message[];
  onSendMessage: (content: string) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  username,
  messages,
  onSendMessage,
}) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  const formatTimestamp = (timestamp: string | Date) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="chat-container">
      <header className="chat-header">
        <h2>Chat Room</h2>
        <div className="user-info">Logged in as: <span className="username-display">{username}</span></div>
      </header>

      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="no-messages">No messages yet. Be the first to send one!</div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`message-item ${
                message.username === username ? 'own-message' : 'other-message'
              }`}
            >
              <div className="message-header">
                <span className="message-username">{message.username}</span>
                <span className="message-time">{formatTimestamp(message.timestamp)}</span>
              </div>
              <div className="message-content">{message.content}</div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <form className="message-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="message-input"
          maxLength={500}
        />
        <button
          type="submit"
          className="send-button"
          disabled={!newMessage.trim()}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;
