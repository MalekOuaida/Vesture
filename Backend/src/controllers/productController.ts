// Author: Malek Ouaida
// File: ProductControllers.ts
/*-- ProductControllers.ts ---------------------------------------------------------

   This file contains controller functions for managing products in the application.
   Key functionalities include:

      - Creating, retrieving, updating, and deleting products
      - Applying optional filters and sorting options on product retrieval
      - Upserting a product based on data from the Clarifai API (using fields like brand, type, and color)
   
   Controllers:
      createProductController             : To create a new product
      getAllProductsController            : To retrieve all products with optional filters and sorting
      getProductByIdController            : To get a product by its ID
      updateProductController             : To update a specific product by its ID
      deleteProductController             : To delete a product by its ID
      upsertProductFromClarifaiController : To upsert a product using data from the Clarifai API

----------------------------------------------------------------------------------*/

import { Request, Response } from 'express';
import Product from '../models/Product';
import ClosetItem from '../models/ClosetItem';

// Creates a new product in the database
export const createProductController = async (req: Request, res: Response): Promise<void> => {
    try {
        const newProduct = await Product.create(req.body);
        res.status(201).json({ message: "Product created successfully", product: newProduct });
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
};

// Retrieves all products with optional filters and sorting
export const getAllProductsController = async (req: Request, res: Response): Promise<void> => {
    const { brand, type, season, color, tags, sortBy } = req.query;

    try {
        const query: any = {}; // Filter object to be populated
        if (brand) query.brand = brand;
        if (type) query.type = type;
        if (season) query.season = season;
        if (color) query.color = color;
        if (tags && typeof tags === 'string') {
            query.tags = { $in: tags.split(',') }; // Allows filtering by multiple tags
        }

        const sortOptions: any = {}; // Sort options object
        if (sortBy) {
            const sortFields = (sortBy as string).split(',');
            sortFields.forEach((field) => {
                sortOptions[field.trim()] = 1; // Ascending order
            });
        }

        const products = await Product.find(query).sort(sortOptions); // Find with filters and sorting
        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
};

// Retrieves a specific product by its ID
export const getProductByIdController = async (req: Request, res: Response): Promise<void> => {
    const productId = req.params.id;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.status(200).json({ product });
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
};

// Updates a specific product by its ID
export const updateProductController = async (req: Request, res: Response): Promise<void> => {
    const productId = req.params.id;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true });
        if (!updatedProduct) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
};

// Deletes a specific product by its ID
export const deleteProductController = async (req: Request, res: Response): Promise<void> => {
    const productId = req.params.id;

    try {
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.status(200).json({ message: "Product deleted successfully", product: deletedProduct });
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
};

// Upserts a product in the database based on data from Clarifai API
export const upsertProductFromClarifaiController = async (req: Request, res: Response): Promise<void> => {
    const { brand, name, type, color, price, link, category, tags, image } = req.body;

    try {
        // Check for required fields
        if (!brand || !name || !type || !color || !price || !link) {
            res.status(400).json({ message: "Missing required fields for Clarifai product." });
            return;
        }

        // Check if product already exists by key fields
        const existingProduct = await Product.findOne({ name, brand, type, color });

        if (existingProduct) {
            res.status(200).json({ message: "Product already exists", product: existingProduct });
            return;
        }

        // Construct new product data if it doesn't exist
        const clarifaiProductData = {
            brand,
            name,
            type,
            color,
            price,
            link,
            category,
            tags,
            image,
            source: 'Clarifai'
        };

        const newProduct = await Product.create(clarifaiProductData);
        res.status(201).json({ message: "Product created from Clarifai data", product: newProduct });
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
};
