// Author: Malek Ouaida
// File: Product.ts
/*-- Product.ts ----------------------------------------------------------------------

   This file defines the Product model for storing product details in the application.
   Each product includes details about the brand, type, color, season, price, availability,
   and additional metadata like category, tags, and image links.

   Properties:
      brand        : Brand name of the product (required)
      name         : Name or title of the product (default: 'Untitled Item')
      type         : Type of product (e.g., coat, shirt) (required)
      color        : Color of the product (required)
      season       : Season suitability (e.g., summer, winter)
      occasion     : Suitable occasion (e.g., formal, casual)
      price        : Price of the product (required)
      availability : Availability status (e.g., in stock, out of stock)
      link         : URL link to the product page (required)
      category     : Category of the product (optional)
      tags         : Array of tags for categorization
      image        : URL of the main product image (required)
      customImage  : Optional URL for a custom image
      source       : Source of the product (e.g., 'UserUploaded', 'Clarifai') (required)
      createdAt    : Timestamp for product creation (default: current date)

----------------------------------------------------------------------------------*/

import mongoose, { Schema, Document } from 'mongoose';

// Interface defining the structure of a Product document
export interface ProductDocument extends Document {
  brand: string;         // Brand of the product
  name: string;          // Name or title
  type: string;          // Type of product (e.g., coat, shirt)
  color: string;         // Product color
  season: string;        // Season suitability (e.g., summer, winter)
  occasion: string;      // Occasion suitability (e.g., formal, casual)
  price: number;         // Product price
  availability: string;  // Availability status
  link: string;          // Product link
  category: string;      // Product category
  tags: string[];        // Tags for categorization
  image: string;         // Main image URL
  customImage?: string;  // Optional custom image URL
  source: string;        // Source of product data
  createdAt?: Date;      // Timestamp for creation
}

// Schema for the Product model
const ProductSchema = new Schema<ProductDocument>({
    brand: { type: String, required: true },           // Brand name (required)
    name: { type: String, default: 'Untitled Item' },  // Default name if not provided
    type: { type: String, required: true },            // Product type (required)
    color: { type: String, required: true },           // Product color (required)
    price: { type: Number, required: true },           // Product price (required)
    link: { type: String, required: true },            // URL link to product page (required)
    category: { type: String },                        // Optional category
    availability: { type: String },                    // Optional availability status
    occasion: { type: String },                        // Optional occasion suitability
    season: { type: String },                          // Optional season suitability
    tags: [{ type: String }],                          // Array of tags for categorization
    image: { type: String, required: true },           // Main product image (required)
    customImage: { type: String, default: null },      // Optional custom image URL
    source: { type: String, required: true },          // Data source (required)
    createdAt: { type: Date, default: Date.now }       // Timestamp for when product was added
});

export default mongoose.model<ProductDocument>('Product', ProductSchema);
