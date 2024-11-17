// Author: Malek Ouaida
// File: AuthToken.ts
/*-- AuthToken.ts -----------------------------------------------------------------

   This file provides functionality for JWT-based authentication, including:
   
      - Generating a token with a 1-hour expiration time
      - Middleware to verify tokens for protected routes

   Functions:
      generateToken : Generates a JWT for a specific user ID
      verifyToken   : Middleware to verify the JWT from the request header

----------------------------------------------------------------------------------*/

import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

// Load environment variables from the specified path
dotenv.config({ path: '/Users/malekouaida/Desktop/CSIS/CSIS279/vesture/Backend/src/config/.env' });

// Confirm JWT_SECRET is loaded for debugging purposes
console.log("Loaded JWT_SECRET:", process.env.JWT_SECRET);

// Use the JWT secret from environment variables or a default key if not found
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key';

// Generates a JWT for a given user ID, valid for 1 hour
export const generateToken = (userId: string): string => {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
};

// Middleware to verify the JWT in the Authorization header of the request
export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).json({ message: 'No token provided' });
        return;
    }

    const token = authHeader.split(' ')[1]; // Extracts the token from the "Bearer" format

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            res.status(403).json({ message: 'Failed to authenticate token' });
            return;
        }

        // Attach the decoded user ID to the request body for access in the next middleware or route
        req.body.userId = (decoded as { userId: string }).userId;
        next();
    });
};
