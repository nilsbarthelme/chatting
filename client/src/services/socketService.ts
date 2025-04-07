import { io, Socket } from 'socket.io-client';
import { JoinResponse, Message, UserEvent } from '../types';

class SocketService {
  private socket: Socket | null = null;
  private readonly SERVER_URL = process.env.NODE_ENV === 'production'
    ? window.location.origin
    : 'http://localhost:5000';

  // Initialize socket connection
  init(): void {
    if (this.socket) return;

    this.socket = io(this.SERVER_URL);
    
    this.socket.on('connect', () => {
      console.log('Connected to server');
    });
    
    this.socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    this.socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });
  }

  // Request to join chat with username
  joinRequest(username: string): void {
    if (!this.socket) this.init();
    this.socket?.emit('join_request', username);
  }

  // Send a chat message
  sendMessage(content: string): void {
    if (!this.socket) return;
    this.socket.emit('new_message', { content });
  }

  // Handle server response to join request
  onJoinResponse(callback: (response: JoinResponse) => void): void {
    this.socket?.on('join_response', callback);
  }

  // Handle incoming messages
  onMessageReceived(callback: (message: Message) => void): void {
    this.socket?.on('message_received', callback);
  }

  // Handle user joined event
  onUserJoined(callback: (data: UserEvent) => void): void {
    this.socket?.on('user_joined', callback);
  }

  // Handle user left event
  onUserLeft(callback: (data: UserEvent) => void): void {
    this.socket?.on('user_left', callback);
  }

  // Disconnect socket
  disconnect(): void {
    this.socket?.disconnect();
    this.socket = null;
  }
}

// Create and export singleton instance
export const socketService = new SocketService();
