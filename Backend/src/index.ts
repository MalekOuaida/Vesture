// Author: Malek Ouaida
// File: server.ts
/*-- server.ts -------------------------------------------------------------------------

   This file initializes and configures the Express server for the Vesture API.
   It sets up middleware, connects to the MongoDB database, defines API routes, 
   and starts the server. The server also includes a global error handler and CORS 
   configuration for cross-origin requests.

   Main Components:
      Environment Setup           : Loads environment variables from .env file
      Middleware                  : Parses JSON bodies, enables CORS, and sets up a global error handler
      Database Connection         : Connects to MongoDB using connectDB()
      Routes                      : Defines API routes with /api prefix for each module
      Root Route                  : Returns a welcome message to confirm server status
      Error Handling              : Global error handler to catch unhandled errors
      Server Start                : Starts the server on the specified port

----------------------------------------------------------------------------------------*/

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import userRoutes from './routes/userRoutes';
import closetItemRoutes from './routes/closetItemRoutes';
import notificationRoutes from './routes/notificationRoutes';
import ootdPostRoutes from './routes/ootdPostRoutes';
import productRoutes from './routes/productRoutes';
import wishlistItemRoutes from './routes/wishlistItemRoutes';
import connectDB from './config/database';
import { verifyToken } from './middleware/authToken';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Configure CORS to allow requests from your frontend
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true,
}));

// Connect to MongoDB
connectDB();

// Define API routes with /api prefix
app.use('/api/users', userRoutes);
app.use('/api/closet-items', closetItemRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/ootd-posts', ootdPostRoutes);
app.use('/api/products', productRoutes);
app.use('/api/wishlist-items', wishlistItemRoutes);

// Root route to check server status
app.get('/', (req, res) => {
  res.send('Welcome to Vesture API!');
});

// Global error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
