// Author: Malek Ouaida
// File: closetItemService.ts
/*-- closetItemService.ts ---------------------------------------------------------------

   This file provides services for managing closet items in the application.
   Services include creating a new closet item (custom or based on a product),
   retrieving all closet items with optional filters, retrieving a closet item
   by ID, updating a closet item, and deleting a closet item.

   Services:
      createClosetItem        : Creates a new closet item, either custom or product-based
      getAllClosetItems       : Retrieves all closet items for a user with optional filters
      getClosetItemById       : Retrieves a closet item by its ID
      updateClosetItem        : Updates a closet item by its ID
      deleteClosetItem        : Deletes a closet item by its ID

----------------------------------------------------------------------------------------*/

import ClosetItem, { ClosetItemDocument } from '../models/ClosetItem';
import Product from '../models/Product';

// Service for creating a new closet item (custom or product-based)
export const createClosetItem = async (closetItemData: Partial<ClosetItemDocument>): Promise<ClosetItemDocument> => {
    try {
        if (closetItemData.productId) {
            const product = await Product.findById(closetItemData.productId);
            if (!product) {
                throw new Error('Product not found');
            }
            // Populate closet item fields based on product data if productId is provided
            closetItemData = {
                ...closetItemData,
                type: product.type || closetItemData.type,
                color: product.color || closetItemData.color,
                season: product.season || closetItemData.season,
                occasion: product.occasion || closetItemData.occasion,
                customImage: product.image || closetItemData.customImage,
                name: product.name || closetItemData.name,
            };
        } else if (!closetItemData.name) {
            throw new Error("Custom item requires a 'name' field");
        }

        const newClosetItem = await ClosetItem.create(closetItemData);
        return newClosetItem;
    } catch (error) {
        console.error('Error creating closet item:', error);
        throw new Error('Failed to create closet item');
    }
};

// Service for retrieving all closet items with optional filters
export const getAllClosetItems = async (userId: string, query: any = {}): Promise<ClosetItemDocument[]> => {
    try {
        const filterQuery = { ...query, userId }; // Ensure userId is part of the query
        const closetItems = await ClosetItem.find(filterQuery);
        return closetItems;
    } catch (error) {
        console.error('Error retrieving closet items:', error);
        throw new Error('Failed to retrieve closet items');
    }
};

// Service for retrieving a closet item by ID
export const getClosetItemById = async (id: string): Promise<ClosetItemDocument | null> => {
    try {
        const closetItem = await ClosetItem.findById(id);
        return closetItem;
    } catch (error) {
        console.error('Error retrieving closet item by ID:', error);
        throw new Error('Failed to retrieve closet item');
    }
};

// Service for updating a closet item by ID
export const updateClosetItem = async (id: string, closetItemData: Partial<ClosetItemDocument>): Promise<ClosetItemDocument | null> => {
    try {
        const updatedClosetItem = await ClosetItem.findByIdAndUpdate(id, closetItemData, { new: true });
        return updatedClosetItem;
    } catch (error) {
        console.error('Error updating closet item:', error);
        throw new Error('Failed to update closet item');
    }
};

// Service for deleting a closet item by ID
export const deleteClosetItem = async (id: string): Promise<ClosetItemDocument | null> => {
    try {
        const closetItem = await ClosetItem.findById(id);
        if (!closetItem) {
            throw new Error(`Closet item with the id ${id} is not found`);
        }
        await closetItem.deleteOne();
        return closetItem;
    } catch (error) {
        console.error('Error deleting closet item:', error);
        throw new Error('Failed to delete closet item');
    }
};
