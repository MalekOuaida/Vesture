// Author: Malek Ouaida
// File: connectDB.ts
/*-- connectDB.ts --------------------------------------------------------------------------

   This file sets up the MongoDB connection using Mongoose and environment variables. 
   It loads the MongoDB URI from a specified .env file path and exports a function to 
   initiate the connection. If the URI is missing or the connection fails, it logs an 
   error and stops the application to prevent further issues.

   Key Features:
      - Environment Setup    : Loads MongoDB URI from environment variables.
      - Error Handling       : Logs clear errors for missing URIs or failed connections.
      - Process Management   : Stops the app on connection failure for stability.
   
   Dependencies:
      - mongoose             : MongoDB ORM for handling connections and database interactions.
      - dotenv               : Loads environment variables from .env files.

------------------------------------------------------------------------------------------*/

// Importing mongoose to interact with MongoDB and dotenv to handle environment variables
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load .env variables from a specific path (verify this path is correct)
dotenv.config({ path: '/Users/malekouaida/Desktop/CSIS/CSIS279/vesture/Backend/src/config/.env' });

// Retrieve the MongoDB URI from the environment
const MONGO_URI = process.env.MONGO_URI;

console.log("Loaded MONGO_URI:", MONGO_URI);  // Quick check to confirm the URI loaded correctly

// If no URI is provided, log an error and stop the process
if (!MONGO_URI) {
  console.error("MongoDB connection URI is missing from environment variables.");
  process.exit(1); // Stop the app to avoid future issues
}

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB with URI:', MONGO_URI); // Confirming connection attempt

    // Try to connect to MongoDB
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB'); // Success message
  } catch (error) {
    // If connection fails, display the error message
    if (error instanceof Error) {
      console.error('Error connecting to MongoDB:', error.message); // Log error message for clarity
    } else {
      console.error('Error connecting to MongoDB:', error); // Log full error for unexpected cases
    }
    process.exit(1); // Stop the app on error to maintain stability
  }
};

// Export the function for use in other parts of the application
export default connectDB;
