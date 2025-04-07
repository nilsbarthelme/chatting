# Requirements Document: Local Network Chat Application

## 1. Introduction

This document outlines the requirements for a full-stack web application enabling real-time chat functionality within a local network. The application will allow users on the same local network to communicate through a shared group chat interface without requiring authentication.

## 2. Project Overview

The Local Network Chat Application will consist of a TypeScript-based server and a React frontend. The server will host the web application and facilitate real-time communication between clients using WebSockets. All messages will be stored in a relational database, allowing users to view message history upon joining.

## 3. Functional Requirements

### 3.1. Server Functionality

- FR-1.1: The server shall be implemented in TypeScript.
- FR-1.2: The server shall host and serve the frontend application.
- FR-1.3: The server shall be accessible to all devices within the same local network.
- FR-1.4: The server shall implement WebSocket connections for real-time bidirectional communication.
- FR-1.5: The server shall store all messages in a relational database.
- FR-1.6: The server shall retrieve and provide the last 1000 messages to new users upon connection.
- FR-1.7: The server shall broadcast new messages to all connected clients in real-time.
- FR-1.8: The server shall prevent duplicate usernames by checking if a requested username is already in use by checking the database if the username was used before.

### 3.2. Frontend Functionality

- FR-2.1: The frontend shall be implemented using TypeScript and React.
- FR-2.2: The frontend shall prompt users to select a username before entering the chat.
- FR-2.3: The frontend shall display a notification if the chosen username is already in use.
- FR-2.4: The frontend shall display the last 1000 messages upon successful connection.
- FR-2.5: The frontend shall provide a text field for composing new messages.
- FR-2.6: The frontend shall allow message submission via button click or pressing Enter.
- FR-2.7: The frontend shall display new messages in real-time as they are received from the server.

## 4. Non-Functional Requirements

### 4.1. Performance

- NFR-1.1: The application shall support a minimum of 50 concurrent users.
- NFR-1.2: Message delivery shall occur within 500ms of submission under normal network conditions.
- NFR-1.3: The application shall load and display the message history within 2 seconds of connection.

### 4.2. Usability

- NFR-2.1: The user interface shall follow modern design principles with an intuitive layout.
- NFR-2.2: The application shall be responsive and usable on both desktop and mobile devices connected to the local network.
- NFR-2.3: The chat shall clearly distinguish between messages from different users.

### 4.3. Reliability

- NFR-3.1: The application shall handle network disconnections gracefully, attempting to reconnect automatically.
- NFR-3.2: The application shall maintain message integrity in the database.

## 5. Technical Requirements

### 5.1. Server Technology

- TR-1.1: The server shall be implemented using Express.js with TypeScript.
   - Rationale: Express.js is lightweight, well-documented, and has excellent TypeScript support. It's suitable for creating a local network server with minimal overhead.
- TR-1.2: WebSocket communication shall be implemented using Socket.IO.
   - Rationale: Socket.IO provides reliable real-time bidirectional communication with fallback options and room/namespace features that simplify managing connections.
- TR-1.3: The application shall use a relational database (PostgreSQL) for message storage.
   - Rationale: PostgreSQL offers strong data integrity, transaction support, and can efficiently handle the structured message data.

### 5.2. Frontend Technology

- TR-2.1: The frontend shall be developed using React with TypeScript.
- TR-2.2: The frontend shall use Socket.IO client for WebSocket communication.
- TR-2.3: The frontend shall use CSS modules or a styling library (e.g., Tailwind CSS) for modern design implementation.

## 6. User Interface Requirements

### 6.1. Login Screen

- UI-1.1: The login screen shall prompt users to enter a username.
- UI-1.2: The login screen shall validate that the username is not already in use.
- UI-1.3: The login screen shall display an error message if the username is already taken.

### 6.2. Chat Interface

- UI-2.1: The chat interface shall display messages in chronological order, with the most recent messages at the bottom.
- UI-2.2: Each message shall display the sender's username and the message content.
- UI-2.3: Messages shall be visually distinguished between the current user and other users.
- UI-2.4: The chat interface shall include a text input field for composing messages.
- UI-2.5: The chat interface shall display a send button and support Enter key submission.
- UI-2.6: The chat interface shall auto-scroll to the most recent message when new messages arrive.

## 7. Database Requirements

- DB-1.1: The database shall store messages with at minimum the following attributes:
  - Message ID (primary key)
  - Username (sender)
  - Message content
  - Timestamp
- DB-1.2: The database shall be configured to efficiently retrieve the last 1000 messages.
- DB-1.3: The database shall be configured to handle concurrent read/write operations.

## 8. Constraints and Limitations

- The application does not require user authentication.
- The application is intended for local network use only and not for internet deployment.
- The application does not support file or media sharing.
- The application does not include message moderation features.
