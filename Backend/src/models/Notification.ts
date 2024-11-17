// Author: Malek Ouaida
// File: Notification.ts
/*-- Notification.ts ----------------------------------------------------------------

   This file defines the Notification model to manage user notifications.
   Each notification includes information about the user it belongs to, the type of 
   notification, related content (e.g., post or comment), and read status.

   Properties:
      userId       : References the user associated with the notification (required)
      type         : Type of notification (e.g., like, comment, follow) (required)
      relatedId    : Optional reference ID related to the notification (e.g., post ID)
      isRead       : Boolean indicating if the notification has been read (default: false)
      message      : The notification message (required)
      timestamp    : Timestamp for when the notification was created (default: current date)

----------------------------------------------------------------------------------*/

import mongoose, { Schema, Document } from 'mongoose';

// Interface defining the structure of a Notification document
export interface NotificationDocument extends Document {
  userId: mongoose.Types.ObjectId;
  type: string;
  relatedId?: mongoose.Types.ObjectId;
  isRead: boolean;
  message: string;
  timestamp?: Date;
}

// Schema for the Notification model
const NotificationSchema = new Schema<NotificationDocument>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // User who receives this notification
  type: { type: String, required: true }, // Type of notification (e.g., like, comment)
  relatedId: { type: Schema.Types.ObjectId, default: null }, // Optional related content ID
  isRead: { type: Boolean, default: false }, // Read status (false by default)
  message: { type: String, required: true }, // Notification message content
  timestamp: { type: Date, default: Date.now } // Date of notification creation
});

export default mongoose.model<NotificationDocument>('Notification', NotificationSchema);
