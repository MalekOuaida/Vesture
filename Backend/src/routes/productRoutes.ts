// Author: Malek Ouaida
// File: productRoutes.ts
/*-- productRoutes.ts ----------------------------------------------------------------

   This file defines the routes for managing products within the application.
   Users can create new products, retrieve all products or specific products by ID, 
   update and delete products, and upsert products based on external data (e.g., from Clarifai).

   Routes:
      POST   /            : Creates a new product
      GET    /            : Retrieves all products with optional filtering and sorting
      GET    /:id         : Retrieves a specific product by its ID
      PUT    /:id         : Updates a specific product by its ID
      DELETE /:id         : Deletes a specific product by its ID
      POST   /upsert      : Upserts a product using data from an external source (e.g., Clarifai)

---------------------------------------------------------------------------------------*/

import express from 'express';
import {
    createProductController,            // Controller to create a new product
    getAllProductsController,           // Controller to retrieve all products with filters
    getProductByIdController,           // Controller to get a specific product by ID
    updateProductController,            // Controller to update a specific product by ID
    deleteProductController,            // Controller to delete a specific product by ID
    upsertProductFromClarifaiController // Controller to upsert a product using external data
} from '../controllers/productController';

const router = express.Router();

// Route to create a new product
router.post('/', createProductController);

// Route to get all products with optional filtering and sorting
router.get('/', getAllProductsController);

// Route to get a specific product by ID
router.get('/:id', getProductByIdController);

// Route to update a specific product by ID
router.put('/:id', updateProductController);

// Route to delete a specific product by ID
router.delete('/:id', deleteProductController);

// Route to upsert a product using data from an external source (e.g., Clarifai)
router.post('/upsert', upsertProductFromClarifaiController);

export default router;
