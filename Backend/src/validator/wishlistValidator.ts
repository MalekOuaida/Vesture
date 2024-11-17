// Author: Malek Ouaida
// File: wishlistItemValidator.ts
/*-- wishlistItemValidator.ts ------------------------------------------------------------

   This file provides validators for managing wishlist items in the application.
   Each validator checks for correct data formats and required fields for wishlist item-related 
   operations, ensuring data consistency and proper request handling.

   Validators:
      validateCreateWishlistItem   : Validates fields required for creating a new wishlist item
      validateGetAllWishlistItems  : Validates the user ID when fetching all wishlist items for a user
      validateGetWishlistItemById  : Validates the wishlist item ID when retrieving a specific wishlist item by ID
      validateDeleteWishlistItem   : Validates the wishlist item ID when deleting a wishlist item by ID

   Helper:
      handleValidationErrors       : Middleware to handle validation errors, responding with 
                                     error details if validation fails

------------------------------------------------------------------------------------------*/

import { body, param, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// Middleware to handle validation errors
const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Validator for creating a new WishlistItem
export const validateCreateWishlistItem = [
    body('userId').isMongoId().withMessage('User ID must be a valid MongoDB ObjectId'),
    body('productId').isMongoId().withMessage('Product ID must be a valid MongoDB ObjectId'),
    handleValidationErrors
];

// Validator for fetching all WishlistItems for a specific user
export const validateGetAllWishlistItems = [
    param('userId').isMongoId().withMessage('User ID must be a valid MongoDB ObjectId'),
    handleValidationErrors
];

// Validator for fetching a WishlistItem by ID
export const validateGetWishlistItemById = [
    param('id').isMongoId().withMessage('Wishlist item ID must be a valid MongoDB ObjectId'),
    handleValidationErrors
];

// Validator for deleting a WishlistItem by ID
export const validateDeleteWishlistItem = [
    param('id').isMongoId().withMessage('Wishlist item ID must be a valid MongoDB ObjectId'),
    handleValidationErrors
];
