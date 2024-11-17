// Author: Malek Ouaida
// File: ClosetItem.ts
/*-- ClosetItem.ts ----------------------------------------------------------------

   This file defines the ClosetItem model for items added to a user's closet.
   It includes properties like userId, productId, item details (name, type, color, etc.),
   and optional image and timestamp fields.

   Properties:
      userId       : References the user who owns the closet item (required)
      productId    : Optional reference to a Product if the item matches an existing product
      name         : Name of the item, if custom-defined
      type         : Type of clothing (e.g., shirt, pants) (required)
      color        : Color of the item (required)
      season       : Season suitability (e.g., summer, winter) (required)
      occasion     : Occasion suitability (e.g., casual, formal) (required)
      tags         : Array of tags associated with the item (optional)
      customImage  : Optional image URL for the item
      addedAt      : Timestamp for when the item was added to the closet

----------------------------------------------------------------------------------*/

import mongoose, { Schema, Document } from 'mongoose';

// Interface defining the structure of a ClosetItem document
export interface ClosetItemDocument extends Document {
  userId: mongoose.Types.ObjectId;
  productId?: mongoose.Types.ObjectId;
  name?: string;
  type: string;
  color: string;
  season: string;
  occasion: string;
  tags: string[];
  customImage?: string;
  addedAt?: Date;
}

// Schema for the ClosetItem model
const ClosetItemSchema = new Schema<ClosetItemDocument>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // References the user who owns this item
  productId: { type: Schema.Types.ObjectId, ref: 'Product', default: null }, // References a product if applicable
  name: { type: String }, // Optional name for custom items
  type: { type: String, required: true }, // Clothing type (required)
  color: { type: String, required: true }, // Color of the item (required)
  season: { type: String, required: true }, // Season suitability (required)
  occasion: { type: String, required: true }, // Occasion suitability (required)
  tags: [{ type: String }], // Array of tags for categorization
  customImage: { type: String, default: null }, // Optional custom image
  addedAt: { type: Date, default: Date.now } // Date item was added to closet
});

export default mongoose.model<ClosetItemDocument>('ClosetItem', ClosetItemSchema);
