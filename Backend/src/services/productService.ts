// Author: Malek Ouaida
// File: productService.ts
/*-- productService.ts ------------------------------------------------------------------

   This file provides services for managing products within the application.
   Services include creating, retrieving, updating, and deleting products, as well as
   upserting products based on data from external sources (e.g., Clarifai).

   Services:
      createProduct             : Creates a new product
      getAllProducts            : Retrieves all products with optional filters and sorting
      getProductById            : Retrieves a specific product by ID
      updateProduct             : Updates a specific product by ID
      deleteProduct             : Deletes a specific product by ID
      upsertProductFromClarifai : Creates or updates a product based on Clarifai data

----------------------------------------------------------------------------------------*/

import Product, { ProductDocument } from '../models/Product';

// Service to create a new product
export const createProduct = async (productData: Partial<ProductDocument>): Promise<ProductDocument> => {
    try {
        const newProduct = await Product.create(productData);
        return newProduct;
    } catch (error) {
        console.error('Error creating product:', error);
        throw new Error('Failed to create product');
    }
};

// Service to retrieve all products with optional filters and sorting
export const getAllProducts = async (
    query: any = {},
    sortOptions: any = {}
): Promise<ProductDocument[]> => {
    try {
        const products = await Product.find(query).sort(sortOptions);
        return products;
    } catch (error) {
        console.error('Error retrieving products:', error);
        throw new Error('Failed to retrieve products');
    }
};

// Service to retrieve a specific product by ID
export const getProductById = async (id: string): Promise<ProductDocument | null> => {
    try {
        const product = await Product.findById(id);
        return product;
    } catch (error) {
        console.error('Error retrieving product by ID:', error);
        throw new Error('Failed to retrieve product');
    }
};

// Service to update a specific product by ID
export const updateProduct = async (
    id: string,
    productData: Partial<ProductDocument>
): Promise<ProductDocument | null> => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, productData, { new: true });
        return updatedProduct;
    } catch (error) {
        console.error('Error updating product:', error);
        throw new Error('Failed to update product');
    }
};

// Service to delete a specific product by ID
export const deleteProduct = async (id: string): Promise<ProductDocument | null> => {
    try {
        const product = await Product.findById(id);
        if (!product) {
            throw new Error(`Product with the id ${id} is not found`);
        }
        await product.deleteOne();
        return product;
    } catch (error) {
        console.error('Error deleting product:', error);
        throw new Error('Failed to delete product');
    }
};

// Service to create or update a product from Clarifai data
export const upsertProductFromClarifai = async (clarifaiData: Partial<ProductDocument>): Promise<ProductDocument> => {
    try {
        const existingProduct = await Product.findOne({ name: clarifaiData.name, brand: clarifaiData.brand });
        
        if (existingProduct) {
            const updatedProduct = await Product.findByIdAndUpdate(existingProduct._id, clarifaiData, { new: true });
            return updatedProduct!;
        } else {
            const newProduct = await Product.create(clarifaiData);
            return newProduct;
        }
    } catch (error) {
        console.error('Error creating or updating product from Clarifai data:', error);
        throw new Error('Failed to process Clarifai product data');
    }
};
