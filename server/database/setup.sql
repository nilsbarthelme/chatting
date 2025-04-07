-- Drop existing tables if they exist
DROP TABLE IF EXISTS messages;

-- Create messages table
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  content TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create an index to optimize retrieval of recent messages
CREATE INDEX idx_timestamp ON messages (timestamp DESC);

-- Insert some sample data
INSERT INTO messages (username, content, timestamp) 
VALUES 
  ('System', 'Welcome to the chat application!', CURRENT_TIMESTAMP),
  ('System', 'Type a message to begin chatting.', CURRENT_TIMESTAMP);
