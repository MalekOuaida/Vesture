// Author: Malek Ouaida
// File: notificationValidator.ts
/*-- notificationValidator.ts -----------------------------------------------------------

   This file provides validators for managing notifications in the application.
   Each validator enforces correct data formats and required fields for notification-related 
   operations, ensuring data consistency and proper request validation.

   Validators:
      validateCreateNotification      : Validates fields required for creating a new notification
      validateGetAllNotifications     : Validates the user ID when fetching all notifications for a user
      validateGetNotificationById     : Validates the notification ID when fetching a specific notification by ID
      validateMarkNotificationAsRead  : Validates the notification ID when marking it as read
      validateDeleteNotification      : Validates the notification ID when deleting a notification

   Helper:
      handleValidationErrors          : Middleware to handle validation errors, responding with 
                                        error details if validation fails

------------------------------------------------------------------------------------------*/

import { body, param, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// Validation middleware to check for validation errors
const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Validation rules for creating a new notification
export const validateCreateNotification = [
    body('userId').isMongoId().withMessage('Invalid user ID format'),
    body('type').isString().withMessage('Type is required and must be a string'),
    body('relatedId').optional().isMongoId().withMessage('Invalid related ID format'),
    body('message').isString().withMessage('Message is required and must be a string'),
    handleValidationErrors
];

// Validation rules for getting all notifications for a user
export const validateGetAllNotifications = [
    param('userId').isMongoId().withMessage('Invalid user ID format'),
    handleValidationErrors
];

// Validation rules for getting a notification by ID
export const validateGetNotificationById = [
    param('id').isMongoId().withMessage('Invalid notification ID format'),
    handleValidationErrors
];

// Validation rules for marking a notification as read
export const validateMarkNotificationAsRead = [
    param('id').isMongoId().withMessage('Invalid notification ID format'),
    handleValidationErrors
];

// Validation rules for deleting a notification by ID
export const validateDeleteNotification = [
    param('id').isMongoId().withMessage('Invalid notification ID format'),
    handleValidationErrors
];
