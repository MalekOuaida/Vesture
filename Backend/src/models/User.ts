// Author: Malek Ouaida
// File: User.ts
/*-- User.ts -----------------------------------------------------------------------

   This file defines the User model for storing user information in the application.
   Each user document contains information such as username, email, password hash,
   profile details, follower/following data, and timestamps for creation and updates.

   Properties:
      username       : Unique username for the user (required)
      email          : User's email address, unique in the database (required)
      passwordHash   : Hashed password for authentication (required)
      bio            : Optional user biography text
      profilePhoto   : URL for the user's profile photo
      website        : Optional URL for the user's website or social media
      followerCount  : Count of followers the user has (default: 0)
      followingCount : Count of users this user is following (default: 0)
      followers      : Array of user IDs who follow this user
      following      : Array of user IDs this user is following
      createdAt      : Timestamp for when the user was created (default: current date)
      updatedAt      : Timestamp for the last update to the user's profile (default: current date)

----------------------------------------------------------------------------------*/

import mongoose, { Schema, Document } from 'mongoose';

// Interface defining the structure of a User document
export interface UserDocument extends Document {
  username: string;               // User's unique username
  email: string;                  // User's email address
  passwordHash: string;           // Hashed password
  bio?: string;                   // Optional user biography
  profilePhoto?: string;          // URL to profile photo
  website?: string;               // Optional URL for user's website
  followerCount?: number;         // Number of followers
  followingCount?: number;        // Number of users followed
  followers: mongoose.Types.ObjectId[]; // Array of user IDs who follow this user
  following: mongoose.Types.ObjectId[]; // Array of user IDs this user follows
  createdAt?: Date;               // Creation timestamp
  updatedAt?: Date;               // Update timestamp
}

// Schema for the User model
const UserSchema = new Schema<UserDocument>({
  username: { type: String, required: true },          // User's unique username
  email: { type: String, required: true, unique: true }, // User's email, must be unique
  passwordHash: { type: String, required: true },      // Hashed password for security
  bio: { type: String, default: '' },                  // Optional biography
  profilePhoto: { type: String, default: null },       // Optional profile photo URL
  website: { type: String, default: '' },              // Optional website URL
  followerCount: { type: Number, default: 0 },         // Initial follower count
  followingCount: { type: Number, default: 0 },        // Initial following count
  followers: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Users following this user
  following: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Users this user is following
  createdAt: { type: Date, default: Date.now },        // User creation timestamp
  updatedAt: { type: Date, default: Date.now },        // Timestamp of last profile update
});

export default mongoose.model<UserDocument>('User', UserSchema);
