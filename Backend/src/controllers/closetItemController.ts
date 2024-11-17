// Author: Malek Ouaida
// File: closetItemController.ts
/*-- closetItemController.ts --------------------------------------------------------------------

   This file contains controllers for managing closet items within the application. 
   Controllers include functionality for creating, retrieving, updating, and deleting closet items.
   Items can either be added as custom items or sourced from existing product entries.
   
   Key Functions:
      - iOwnThisProductController       : Adds an item to the user's closet.
      - getAllClosetItemsController     : Retrieves all closet items for a user with optional filters.
      - getClosetItemByIdController     : Retrieves a specific closet item by ID.
      - updateClosetItemController      : Updates an existing closet item by ID.
      - deleteClosetItemController      : Deletes a specific closet item by ID.
   
   Dependencies:
      - express                         : For Request and Response handling.
      - closetItemService               : Service functions to interact with the closet item database.
      - Product                         : Model for product data in MongoDB.

------------------------------------------------------------------------------------------------*/

import { Request, Response } from 'express';
import {
    createClosetItem,
    getAllClosetItems,
    getClosetItemById,
    updateClosetItem,
    deleteClosetItem
} from '../services/closetItemService';
import Product from '../models/Product';

// Adds a new item to the closet, either using a product ID or custom item details
export const iOwnThisProductController = async (req: Request, res: Response): Promise<void> => {
    const { productId, name, type, color, season, occasion, tags, customImage } = req.body;

    try {
        // Validate required fields for custom items
        if (!season || !occasion) {
            res.status(400).json({ message: "Fields 'season' and 'occasion' are required and must be provided by the user." });
            return;
        }

        let closetItemData: any = {
            userId: req.body.userId,
            type,
            color,
            season,
            occasion,
            tags,
            customImage
        };

        // If productId exists, fetch product details
        if (productId) {
            const product = await Product.findById(productId);

            if (!product) {
                console.error("Product not found for provided productId:", productId);
                res.status(404).json({ message: "Product not found" });
                return;
            }

            // Combine product data with the custom closet item data
            closetItemData = {
                ...closetItemData,
                productId,
                type: product.type || type,
                customImage: product.image || customImage,
                name: product.name || name
            };
        } else if (name) {
            closetItemData.name = name;
        } else {
            res.status(400).json({ message: "Either productId or custom item details (including name) must be provided" });
            return;
        }

        const newClosetItem = await createClosetItem(closetItemData);
        res.status(201).json({ message: "Item added to closet successfully", closetItem: newClosetItem });
    } catch (error) {
        console.error("Error adding item to closet:", error);
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
};

// Gets all closet items with optional filters (e.g., name, category, season, etc.)
export const getAllClosetItemsController = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;
    const { name, category, tags, season, type, occasion } = req.query;

    try {
        if (!userId) {
            res.status(400).json({ message: "User ID is required" });
            return;
        }

        const query: any = { userId };

        if (name) query.name = { $regex: name, $options: 'i' };
        if (category) query.category = category;
        if (season) query.season = season;
        if (type) query.type = type;
        if (occasion) query.occasion = occasion;
        if (tags && typeof tags === 'string') {
            query.tags = { $in: tags.split(',') };
        }

        const closetItems = await getAllClosetItems(userId, query);
        res.status(200).json({ closetItems });
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
};

// Gets a specific closet item by its ID
export const getClosetItemByIdController = async (req: Request, res: Response): Promise<void> => {
    const closetItemId = req.params.id;

    try {
        if (!closetItemId) {
            res.status(400).json({ message: "Closet item ID is required" });
            return;
        }

        const closetItem = await getClosetItemById(closetItemId);
        if (!closetItem) {
            res.status(404).json({ message: "Closet item not found" });
            return;
        }

        res.status(200).json({ closetItem });
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
};

// Updates a closet item by its ID
export const updateClosetItemController = async (req: Request, res: Response): Promise<void> => {
    const closetItemId = req.params.id;

    try {
        if (!closetItemId) {
            res.status(400).json({ message: "Closet item ID is required" });
            return;
        }

        const updatedClosetItem = await updateClosetItem(closetItemId, req.body);
        if (!updatedClosetItem) {
            res.status(404).json({ message: "Closet item not found" });
            return;
        }

        res.status(200).json({ message: "Closet item updated successfully", closetItem: updatedClosetItem });
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
};

// Deletes a closet item by its ID
export const deleteClosetItemController = async (req: Request, res: Response): Promise<void> => {
    const closetItemId = req.params.id;

    try {
        if (!closetItemId) {
            res.status(400).json({ message: "Closet item ID is required" });
            return;
        }

        const deletedClosetItem = await deleteClosetItem(closetItemId);
        if (!deletedClosetItem) {
            res.status(404).json({ message: "Closet item not found" });
            return;
        }

        res.status(200).json({ message: "Closet item deleted successfully", closetItem: deletedClosetItem });
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
};
