// Author: Malek Ouaida
// File: WishlistItem.ts
/*-- WishlistItem.ts ---------------------------------------------------------------

   This file defines the WishlistItem model, representing items that users add to their wishlist.
   Each wishlist item is associated with a user and a product, and includes a timestamp for
   when the item was added.

   Properties:
      userId   : References the user who added the item to their wishlist (required)
      productId: References the product that was added to the wishlist (required)
      addedAt  : Timestamp for when the item was added to the wishlist (default: current date)

----------------------------------------------------------------------------------*/

import mongoose, { Schema, Document } from 'mongoose';

// Interface defining the structure of a WishlistItem document
export interface WishlistItemDocument extends Document {
  userId: mongoose.Types.ObjectId;   // ID of the user who added the item
  productId: mongoose.Types.ObjectId; // ID of the product in the wishlist
  addedAt?: Date;                    // Timestamp of when the item was added
}

// Schema for the WishlistItem model
const WishlistItemSchema = new Schema<WishlistItemDocument>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },   // User ID reference
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true }, // Product ID reference
  addedAt: { type: Date, default: Date.now }                              // Date added (default to now)
});

export default mongoose.model<WishlistItemDocument>('WishlistItem', WishlistItemSchema);
