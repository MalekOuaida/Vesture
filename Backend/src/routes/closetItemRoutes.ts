// Author: Malek Ouaida
// File: closetItemRoutes.ts
/*-- closetItemRoutes.ts ------------------------------------------------------------

   This file defines the routes for managing closet items within the application.
   Users can add items to their closet, retrieve all items or specific items,
   update existing closet items, and delete items from their closet.

   Routes:
      POST   /              : Adds a new closet item (either custom or based on an existing product)
      GET    /user/:userId  : Retrieves all closet items for a specific user, with optional filtering
      GET    /:id           : Retrieves a specific closet item by its ID
      PUT    /:id           : Updates a specific closet item by its ID
      DELETE /:id           : Deletes a specific closet item by its ID

----------------------------------------------------------------------------------*/

import express from 'express';
import {
    iOwnThisProductController,  // Controller to add a new closet item
    getAllClosetItemsController, // Controller to get all or filtered items for a user
    getClosetItemByIdController, // Controller to get a specific closet item by ID
    updateClosetItemController,  // Controller to update a specific closet item by ID
    deleteClosetItemController   // Controller to delete a specific closet item by ID
} from '../controllers/closetItemController';

const router = express.Router();

// Route to add a new closet item (custom or from a product page)
router.post('/', iOwnThisProductController);

// Route to get all closet items for a specific user (with filtering options)
router.get('/user/:userId', getAllClosetItemsController);

// Route to get a specific closet item by ID
router.get('/:id', getClosetItemByIdController);

// Route to update a specific closet item by ID
router.put('/:id', updateClosetItemController);

// Route to delete a specific closet item by ID
router.delete('/:id', deleteClosetItemController);

export default router;
