// Author: Malek Ouaida
// File: wishlistItemRoutes.ts
/*-- wishlistItemRoutes.ts ---------------------------------------------------------------

   This file defines the routes for managing wishlist items within the application.
   Users can add items to their wishlist, retrieve all wishlist items or specific items 
   by ID, and delete items from their wishlist.

   Routes:
      POST   /               : Creates a new wishlist item
      GET    /user/:userId   : Retrieves all wishlist items for a specific user
      GET    /:id            : Retrieves a specific wishlist item by its ID
      DELETE /:id            : Deletes a specific wishlist item by its ID

-----------------------------------------------------------------------------------------*/

import express from 'express';
import {
    createWishlistItemController,    // Controller to create a new wishlist item
    getAllWishlistItemsController,   // Controller to retrieve all wishlist items for a user
    getWishlistItemByIdController,   // Controller to retrieve a specific wishlist item by ID
    deleteWishlistItemController     // Controller to delete a wishlist item by ID
} from '../controllers/wishlistItemController';

const router = express.Router();

// Route to create a new wishlist item
router.post('/', createWishlistItemController);

// Route to get all wishlist items for a specific user
router.get('/user/:userId', getAllWishlistItemsController);

// Route to get a specific wishlist item by ID
router.get('/:id', getWishlistItemByIdController);

// Route to delete a specific wishlist item by ID
router.delete('/:id', deleteWishlistItemController);

export default router;
