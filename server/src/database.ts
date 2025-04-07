import { Pool } from 'pg';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create a PostgreSQL connection pool
export const db = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'chatapp',
});

// Test database connection
db.connect()
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((err) => {
    console.error('Database connection error:', err.message);
  });

// Message types
export interface Message {
  id: number;
  username: string;
  content: string;
  timestamp: Date;
}

// Database functions for messages
export const messageRepository = {
  // Get the latest messages (limited to 1000 as per requirements)
  async getRecentMessages(limit: number = 1000): Promise<Message[]> {
    try {
      const result = await db.query<Message>(
        'SELECT * FROM messages ORDER BY timestamp DESC LIMIT $1',
        [limit]
      );
      return result.rows.reverse(); // Return in chronological order
    } catch (error) {
      console.error('Error fetching recent messages:', error);
      return [];
    }
  },

  // Save a new message
  async saveMessage(username: string, content: string): Promise<Message | null> {
    try {
      const result = await db.query<Message>(
        'INSERT INTO messages (username, content) VALUES ($1, $2) RETURNING *',
        [username, content]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error saving message:', error);
      return null;
    }
  }
};

// User management (in-memory for active users)
const activeUsers = new Set<string>();

export const userRepository = {
  // Check if a username is already in use
  isUsernameTaken(username: string): boolean {
    return activeUsers.has(username.toLowerCase());
  },

  // Add a new active user
  addUser(username: string): void {
    activeUsers.add(username.toLowerCase());
  },

  // Remove a user when they disconnect
  removeUser(username: string): void {
    activeUsers.delete(username.toLowerCase());
  },

  // Get all active users
  getActiveUsers(): string[] {
    return Array.from(activeUsers);
  }
};
