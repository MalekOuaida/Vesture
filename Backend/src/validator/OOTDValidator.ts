// Author: Malek Ouaida
// File: ootdPostValidator.ts
/*-- ootdPostValidator.ts -----------------------------------------------------------------

   This file provides validators for managing "Outfit of the Day" (OOTD) posts in the application.
   Each validator checks for correct data formats and required fields for OOTD post-related 
   operations, ensuring data integrity and proper request handling.

   Validators:
      validateCreateOOTDPost   : Validates fields required for creating a new OOTD post
      validateGetOOTDPostById  : Validates the OOTD post ID when fetching a specific post by ID
      validateUpdateOOTDPost   : Validates fields for updating an OOTD post by ID
      validateDeleteOOTDPost   : Validates the OOTD post ID when deleting a post by ID

   Helper:
      Validation middleware within each validator  : Checks validation errors, responding with 
                                                     error details if validation fails

------------------------------------------------------------------------------------------*/

import { body, param, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// Validation rules for creating a new OOTD post
export const validateCreateOOTDPost = [
    body('userId').isMongoId().withMessage('Invalid user ID format'),
    body('imageURL').isURL().withMessage('Invalid image URL'),
    body('caption').optional().isString().withMessage('Caption must be a string'),
    body('tags').isArray().withMessage('Tags must be an array of strings'),
    body('tags.*').isString().withMessage('Each tag must be a string'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Validation rules for getting a specific OOTD post by ID
export const validateGetOOTDPostById = [
    param('id').isMongoId().withMessage('Invalid OOTD post ID format'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Validation rules for updating an OOTD post
export const validateUpdateOOTDPost = [
    param('id').isMongoId().withMessage('Invalid OOTD post ID format'),
    body('userId').optional().isMongoId().withMessage('Invalid user ID format'),
    body('imageURL').optional().isURL().withMessage('Invalid image URL'),
    body('caption').optional().isString().withMessage('Caption must be a string'),
    body('tags').optional().isArray().withMessage('Tags must be an array of strings'),
    body('tags.*').optional().isString().withMessage('Each tag must be a string'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Validation rules for deleting an OOTD post by ID
export const validateDeleteOOTDPost = [
    param('id').isMongoId().withMessage('Invalid OOTD post ID format'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
