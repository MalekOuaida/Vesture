// Author: Malek Ouaida
// File: OOTDPost.ts
/*-- OOTDPost.ts --------------------------------------------------------------------

   This file defines the OOTDPost model for posts in an "Outfit of the Day" feature.
   Each post includes details about the user who created it, an image, tags, likes, 
   comments, mentions, saves, and other metadata like location and timestamp.

   Properties:
      userId       : References the user who created the post (required)
      imageURL     : URL of the post image (required)
      caption      : Optional text caption for the post
      tags         : Array of tags associated with the post, e.g., #fashion #ootd
      likes        : Array of user IDs who liked the post
      comments     : Array of comment objects with user references, text, and timestamps
      mentions     : Array of user IDs mentioned in the post
      saves        : Array of user IDs who saved the post
      sharesCount  : Count of how many times the post has been shared
      location     : Optional location metadata for the post
      timestamp    : Timestamp for when the post was created (default: current date)

----------------------------------------------------------------------------------*/

import mongoose, { Schema, Document } from 'mongoose';

// Interface for individual comment structure
export interface CommentDocument {
  userId: mongoose.Types.ObjectId; // User who made the comment
  text: string; // Comment text
  timestamp: Date; // Timestamp for when the comment was made
}

// Interface defining the structure of an OOTD post
export interface OOTDPostDocument extends Document {
  userId: mongoose.Types.ObjectId; // User who created the post
  imageURL: string; // URL of the image for the post
  caption?: string; // Optional text caption
  tags: string[]; // Tags for the post, e.g., #fashion #ootd
  likes: mongoose.Types.ObjectId[]; // Array of user IDs who liked the post
  comments: CommentDocument[]; // Array of comments
  mentions: mongoose.Types.ObjectId[]; // Array of user IDs mentioned in the post
  saves: mongoose.Types.ObjectId[]; // Array of user IDs who saved the post
  sharesCount: number; // Count of how many times the post has been shared
  location?: string; // Optional location metadata for the post
  timestamp?: Date; // Post creation timestamp
}

// Schema for individual comments
const CommentSchema = new Schema<CommentDocument>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // User who made the comment
  text: { type: String, required: true }, // Text of the comment
  timestamp: { type: Date, default: Date.now } // Date of comment creation
});

// Schema for the OOTD post model
const OOTDPostSchema = new Schema<OOTDPostDocument>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // User who created the post
  imageURL: { type: String, required: true }, // URL of the post image
  caption: { type: String, default: '' }, // Optional caption text
  tags: [{ type: String }], // Array of tags for the post
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }], // User IDs of those who liked the post
  comments: [CommentSchema], // Array of comments with user references
  mentions: [{ type: Schema.Types.ObjectId, ref: 'User' }], // User IDs mentioned in the post
  saves: [{ type: Schema.Types.ObjectId, ref: 'User' }], // User IDs of those who saved the post
  sharesCount: { type: Number, default: 0 }, // Count of times shared
  location: { type: String, default: null }, // Optional location metadata
  timestamp: { type: Date, default: Date.now } // Date of post creation
});

export default mongoose.model<OOTDPostDocument>('OOTDPost', OOTDPostSchema);
