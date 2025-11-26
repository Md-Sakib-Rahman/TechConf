
# TechConf - Event Management Platform


TechConf is a modern, responsive event management application designed for tech conferences and workshops. Built with Next.js 14 (App Router) for the frontend and a separate Express.js server for the backend, it features a polished UI, secure authentication, and event management capabilities.




## Key Features

- Public Access: Users can browse upcoming events, view details, and search for specific topics.
- Authentication: Secure login via Google OAuth and Email/Password credentials using NextAuth.js.
- Admin Dashboard: Protected routes for authenticated users to list new events and manage their existing posts.
- Responsive Design: Optimized for mobile, tablet, and desktop using Tailwind CSS and DaisyUI.










## Tech Stack
**Frontend:** Next.js (App Router), Tailwind CSS, DaisyUI, Axios, NextAuth.js.

**Backend:** Node.js, Express.js, MongoDB (Mongoose), JWT, Bcrypt.js.


## Setup & Installation Instructions

Prerequisites

Node.js installed.

A MongoDB Atlas connection string.

Google Cloud Console credentials (Client ID & Secret) for OAuth.

### 1. Clone the Repository
```bash
  git clone [https://github.com/your-username/techconf.git](https://github.com/your-username/techconf.git)
cd techconf
```
    
### 2. Backend Setup
Navigate to the backend folder and install dependencies.
```bash
cd Backend
npm install
```

### 3.Create a .env file in the Backend root:
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
```
Start the backend server:
```bash
node index.js
# Server runs on http://localhost:5000
```


### 4. Frontend Setup
```bash
cd Frontend/techconf
npm install
```

Create a .env.local file in the Frontend root:

```bash
# Point to your Express Backend
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_super_secret_jwt_key

# Google OAuth (From Google Cloud Console)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

Start the frontend development server:

```bash
npm run dev
# App runs on http://localhost:3000
```

