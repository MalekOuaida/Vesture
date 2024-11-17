// Author: Malek Ouaida
// File: closetItemValidator.ts
/*-- closetItemValidator.ts --------------------------------------------------------------

   This file provides validators for managing closet items in the application.
   Each validator checks the format and presence of necessary fields for closet item-related 
   operations, ensuring data integrity and proper request handling.

   Validators:
      validateCreateClosetItem     : Validates fields required for creating a new closet item
      validateGetAllClosetItems    : Validates the user ID when fetching all closet items for a user
      validateGetClosetItemById    : Validates the closet item ID when fetching a specific item by ID
      validateUpdateClosetItem     : Validates fields for updating a closet item by ID
      validateDeleteClosetItem     : Validates the closet item ID when deleting an item by ID

   Helper:
      handleValidationErrors       : Middleware to handle validation errors, responding with 
                                     error details if validation fails

------------------------------------------------------------------------------------------*/

import { body, param, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// Validation middleware to handle errors
const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Validator for creating a new ClosetItem
export const validateCreateClosetItem = [
    body('userId').isMongoId().withMessage('User ID must be a valid MongoDB ObjectId'),
    body('type').isString().withMessage('Type is required and must be a string'),
    body('color').isString().withMessage('Color is required and must be a string'),
    body('season').isString().withMessage('Season is required and must be a string'),
    body('occasion').isString().withMessage('Occasion is required and must be a string'),
    body('tags').optional().isArray().withMessage('Tags must be an array of strings'),
    body('customImage').optional().isString().withMessage('Custom image URL must be a string'),
    handleValidationErrors
];

// Validator for fetching all ClosetItems for a specific user
export const validateGetAllClosetItems = [
    param('userId').isMongoId().withMessage('User ID must be a valid MongoDB ObjectId'),
    handleValidationErrors
];

// Validator for fetching a specific ClosetItem by ID
export const validateGetClosetItemById = [
    param('id').isMongoId().withMessage('Closet item ID must be a valid MongoDB ObjectId'),
    handleValidationErrors
];

// Validator for updating a specific ClosetItem by ID
export const validateUpdateClosetItem = [
    param('id').isMongoId().withMessage('Closet item ID must be a valid MongoDB ObjectId'),
    body('type').optional().isString().withMessage('Type must be a string'),
    body('color').optional().isString().withMessage('Color must be a string'),
    body('season').optional().isString().withMessage('Season must be a string'),
    body('occasion').optional().isString().withMessage('Occasion must be a string'),
    body('tags').optional().isArray().withMessage('Tags must be an array of strings'),
    body('customImage').optional().isString().withMessage('Custom image URL must be a string'),
    handleValidationErrors
];

// Validator for deleting a ClosetItem by ID
export const validateDeleteClosetItem = [
    param('id').isMongoId().withMessage('Closet item ID must be a valid MongoDB ObjectId'),
    handleValidationErrors
];
