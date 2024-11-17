// Author: Malek Ouaida
// File: WishlistItemControllers.ts
/*-- WishlistItemControllers.ts --------------------------------------------------

   This file contains controller functions for managing wishlist items.
   Key functionalities include:

      - Creating a new wishlist item
      - Retrieving all wishlist items for a specific user
      - Retrieving a wishlist item by its ID
      - Deleting a wishlist item by its ID

   Controllers:
      createWishlistItemController     : To create a new wishlist item
      getAllWishlistItemsController    : To get all wishlist items for a specific user
      getWishlistItemByIdController    : To get a wishlist item by its ID
      deleteWishlistItemController     : To delete a wishlist item by its ID

----------------------------------------------------------------------------------*/

import { Request, Response } from 'express';
import {
    createWishlistItem,
    getAllWishlistItems,
    getWishlistItemById,
    deleteWishlistItem
} from '../services/wishlistItemService';

// Creates a new wishlist item for the user
export const createWishlistItemController = async (req: Request, res: Response): Promise<void> => {
    try {
        const newWishlistItem = await createWishlistItem(req.body);
        res.status(201).json({ message: "Wishlist item created successfully", wishlistItem: newWishlistItem });
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
};

// Retrieves all wishlist items for a specific user
export const getAllWishlistItemsController = async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.userId;

    try {
        if (!userId) {
            res.status(400).json({ message: "User ID is required" });
            return;
        }

        const wishlistItems = await getAllWishlistItems(userId);
        res.status(200).json({ wishlistItems });
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
};

// Retrieves a specific wishlist item by its ID
export const getWishlistItemByIdController = async (req: Request, res: Response): Promise<void> => {
    const wishlistItemId = req.params.id;

    try {
        if (!wishlistItemId) {
            res.status(400).json({ message: "Wishlist item ID is required" });
            return;
        }

        const wishlistItem = await getWishlistItemById(wishlistItemId);
        if (!wishlistItem) {
            res.status(404).json({ message: "Wishlist item not found" });
            return;
        }

        res.status(200).json({ wishlistItem });
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
};

// Deletes a wishlist item by its ID
export const deleteWishlistItemController = async (req: Request, res: Response): Promise<void> => {
    const wishlistItemId = req.params.id;

    try {
        if (!wishlistItemId) {
            res.status(400).json({ message: "Wishlist item ID is required" });
            return;
        }

        const deletedWishlistItem = await deleteWishlistItem(wishlistItemId);
        if (!deletedWishlistItem) {
            res.status(404).json({ message: "Wishlist item not found" });
            return;
        }

        res.status(200).json({ message: "Wishlist item deleted successfully", wishlistItem: deletedWishlistItem });
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
};
