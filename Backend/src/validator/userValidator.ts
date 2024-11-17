// Author: Malek Ouaida
// File: userValidator.ts
/*-- userValidator.ts ---------------------------------------------------------------------

   This file provides validators for managing users in the application.
   Each validator enforces correct data formats and required fields for user-related 
   operations, ensuring data integrity and proper request validation.

   Validators:
      createUserValidation   : Validates fields required for creating a new user
      updateUserValidation   : Validates fields for updating an existing user by ID
      getUserByIdValidation  : Validates the user ID when retrieving a user by ID
      deleteUserValidation   : Validates the user ID when deleting a user by ID

------------------------------------------------------------------------------------------*/

import { body, param } from 'express-validator';

// Validation for creating a new user
export const createUserValidation = [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('A valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

// Validation for updating a user
export const updateUserValidation = [
    param('id').isMongoId().withMessage('Invalid user ID'),
    body('username').optional().notEmpty().withMessage('Username cannot be empty'),
    body('email').optional().isEmail().withMessage('A valid email is required'),
    body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

// Validation for retrieving a user by ID
export const getUserByIdValidation = [
    param('id').isMongoId().withMessage('Invalid user ID')
];

// Validation for deleting a user by ID
export const deleteUserValidation = [
    param('id').isMongoId().withMessage('Invalid user ID')
];
