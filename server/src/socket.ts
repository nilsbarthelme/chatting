import { Server, Socket } from 'socket.io';
import { messageRepository, userRepository } from './database';

// Socket events
const EVENTS = {
  CONNECTION: 'connection',
  DISCONNECT: 'disconnect',
  JOIN_REQUEST: 'join_request',
  JOIN_RESPONSE: 'join_response',
  NEW_MESSAGE: 'new_message',
  MESSAGE_RECEIVED: 'message_received',
  USER_JOINED: 'user_joined',
  USER_LEFT: 'user_left',
};

export function initializeSocketServer(io: Server): void {
  io.on(EVENTS.CONNECTION, (socket: Socket) => {
    console.log(`New connection: ${socket.id}`);
    let currentUsername: string | null = null;

    // Handle join request
    socket.on(EVENTS.JOIN_REQUEST, async (username: string) => {
      // Check if username is already taken
      if (userRepository.isUsernameTaken(username)) {
        socket.emit(EVENTS.JOIN_RESPONSE, {
          success: false,
          message: 'Username is already taken. Please choose a different one.'
        });
        return;
      }

      // Username is available, register user
      currentUsername = username;
      userRepository.addUser(username);

      // Send success response with message history
      const messageHistory = await messageRepository.getRecentMessages();
      socket.emit(EVENTS.JOIN_RESPONSE, {
        success: true,
        username,
        messages: messageHistory
      });

      // Notify all users about the new user
      io.emit(EVENTS.USER_JOINED, {
        username,
        timestamp: new Date()
      });

      console.log(`User joined: ${username}`);
    });

    // Handle new messages
    socket.on(EVENTS.NEW_MESSAGE, async (messageData: { content: string }) => {
      if (!currentUsername || !messageData.content.trim()) return;

      try {
        // Save message to database
        const savedMessage = await messageRepository.saveMessage(
          currentUsername, 
          messageData.content.trim()
        );

        if (savedMessage) {
          // Broadcast message to all connected clients
          io.emit(EVENTS.MESSAGE_RECEIVED, savedMessage);
        }
      } catch (error) {
        console.error('Error processing message:', error);
      }
    });

    // Handle disconnection
    socket.on(EVENTS.DISCONNECT, () => {
      if (currentUsername) {
        // Remove user from active users
        userRepository.removeUser(currentUsername);
        
        // Notify all users
        io.emit(EVENTS.USER_LEFT, {
          username: currentUsername,
          timestamp: new Date()
        });
        
        console.log(`User left: ${currentUsername}`);
      }
    });
  });
}
