// Author: Malek Ouaida
// File: productValidator.ts
/*-- productValidator.ts -----------------------------------------------------------------

   This file provides validators for managing products within the application.
   Each validator enforces correct data formats and required fields for product-related 
   operations, ensuring data integrity and proper request validation.

   Validators:
      insertProductValidation    : Validates fields required for creating a new product
      updateProductValidation    : Validates fields for updating an existing product by ID

   Helper:
      Validation middleware within each validator : Checks validation errors, responding 
                                                   with error details if validation fails

------------------------------------------------------------------------------------------*/

import { body, param, validationResult } from 'express-validator';

// Validation for creating a product
export const insertProductValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('quantity').optional().isNumeric().withMessage('Quantity must be a number'),
  body('categoryId').optional().isString().withMessage('Category ID must be a string'),
];

// Validation for updating a product
export const updateProductValidation = [
  param('productId').isString().withMessage('Product ID must be a string'),
  body('name').optional().notEmpty().withMessage('Name cannot be empty'),
  body('price').optional().isNumeric().withMessage('Price must be a number'),
  body('quantity').optional().isNumeric().withMessage('Quantity must be a number'),
  body('categoryId').optional().isString().withMessage('Category ID must be a string'),
];
