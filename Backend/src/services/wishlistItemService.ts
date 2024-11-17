// Author: Malek Ouaida
// File: wishlistItemService.ts
/*-- wishlistItemService.ts -------------------------------------------------------------

   This file provides services for managing wishlist items within the application.
   Services include creating a new wishlist item, retrieving all wishlist items for a user 
   with product details, retrieving a specific wishlist item by ID, and deleting a wishlist 
   item by ID.

   Services:
      createWishlistItem     : Creates a new wishlist item for a user
      getAllWishlistItems    : Retrieves all wishlist items for a specific user with product details
      getWishlistItemById    : Retrieves a specific wishlist item by its ID with product details
      deleteWishlistItem     : Deletes a specific wishlist item by its ID

----------------------------------------------------------------------------------------*/

import WishlistItem, { WishlistItemDocument } from '../models/WishlistItem';

// Service to create a new wishlist item for a user
export const createWishlistItem = async (wishlistItemData: Partial<WishlistItemDocument>): Promise<WishlistItemDocument> => {
    try {
        const newWishlistItem = await WishlistItem.create(wishlistItemData);
        return newWishlistItem;
    } catch (error) {
        console.error('Error creating wishlist item:', error);
        throw new Error('Failed to create wishlist item');
    }
};

// Service to retrieve all wishlist items for a specific user with populated product details
export const getAllWishlistItems = async (userId: string): Promise<WishlistItemDocument[]> => {
    try {
        const wishlistItems = await WishlistItem.find({ userId }).populate('productId');
        return wishlistItems;
    } catch (error) {
        console.error('Error retrieving wishlist items:', error);
        throw new Error('Failed to retrieve wishlist items');
    }
};

// Service to retrieve a specific wishlist item by ID with populated product details
export const getWishlistItemById = async (id: string): Promise<WishlistItemDocument | null> => {
    try {
        const wishlistItem = await WishlistItem.findById(id).populate('productId');
        return wishlistItem;
    } catch (error) {
        console.error('Error retrieving wishlist item by ID:', error);
        throw new Error('Failed to retrieve wishlist item');
    }
};

// Service to delete a specific wishlist item by ID
export const deleteWishlistItem = async (id: string): Promise<WishlistItemDocument | null> => {
    try {
        const wishlistItem = await WishlistItem.findById(id);
        if (!wishlistItem) {
            throw new Error(`Wishlist item with the id ${id} is not found`);
        }
        await wishlistItem.deleteOne();
        return wishlistItem;
    } catch (error) {
        console.error('Error deleting wishlist item:', error);
        throw new Error('Failed to delete wishlist item');
    }
};
