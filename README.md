# Luxe Gems E-Commerce

A modern, scalable jewelry e-commerce platform built with the MERN stack (MongoDB, Express, React, Node.js).

## Features
- **Frontend**: React + Vite, Zustand for state management, Framer Motion for animations.
- **Backend**: Node.js + Express, MongoDB with Mongoose.
- **Authentication**: JWT-based custom authentication.
- **Shopping Cart**: Fully functional cart with dynamic pricing.
- **Checkout**: Simulated checkout flow.
- **Architecture**: Modular, heavily structured folder layout separating logical concerns.

## Directory Structure
- `/client`: Frontend React application
- `/server`: Backend Express REST API
- `/database`: Database schemas, seeds, and migrations
- `/public`: Static images and assets
- `/docs`: Additional project documentation

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB running locally or a valid `MONGODB_URI`

### Installation

1. Install backend dependencies:
   ```bash
   cd server
   npm install
   ```

2. Install frontend dependencies:
   ```bash
   cd client
   npm install
   ```

3. Configure Environment Variables in `server/.env`:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/jewelry-shop
   JWT_SECRET=supersecretjewelrytoken2026
   ```

### Running the Application

Start the backend (runs on port 5000):
```bash
cd server
npm run dev
```

Start the frontend (runs on port 3000):
```bash
cd client
npm run dev
```

The application will be available at http://localhost:3000

## License
MIT
