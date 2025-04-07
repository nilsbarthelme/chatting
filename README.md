# Local Network Chat Application

A real-time chat application for local networks built with TypeScript, React, Express.js, Socket.IO, and PostgreSQL.

## Features

- Real-time messaging using WebSockets (Socket.IO)
- Username selection with duplicate prevention
- Message history (last 1000 messages)
- Modern and responsive UI
- No authentication required - simple username-based entry

## Project Structure

- `/client` - React frontend application
- `/server` - Express.js backend server

## Setup Instructions

### Prerequisites

- Node.js (v14+)
- PostgreSQL

### Database Setup

1. Create a PostgreSQL database named `chatapp`
2. Run the SQL setup script:
```
psql -U postgres -d chatapp -f server/database/setup.sql
```

### Server Setup

1. Navigate to the server directory:
```
cd server
```

2. Install dependencies:
```
npm install
```

3. Create a `.env` file with the following variables:
```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=chatapp
PORT=5000
```

4. Start the server:
```
npm run dev
```

### Client Setup

1. Navigate to the client directory:
```
cd client
```

2. Install dependencies:
```
npm install
```

3. Start the client:
```
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

## Technical Stack

- **Frontend**: TypeScript, React
- **Backend**: TypeScript, Express.js
- **Database**: PostgreSQL
- **Real-time Communication**: Socket.IO
