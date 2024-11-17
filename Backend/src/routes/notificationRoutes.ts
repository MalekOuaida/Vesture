// Author: Malek Ouaida
// File: notificationRoutes.ts
/*-- notificationRoutes.ts -----------------------------------------------------------

   This file defines the routes for managing notifications within the application.
   Users can create notifications, retrieve all notifications for a user, retrieve a 
   specific notification, mark notifications as read, and delete notifications.

   Routes:
      POST   /               : Creates a new notification
      GET    /user/:userId   : Retrieves all notifications for a specific user
      GET    /:id            : Retrieves a specific notification by its ID
      PUT    /:id/read       : Marks a specific notification as read
      DELETE /:id            : Deletes a specific notification by its ID

----------------------------------------------------------------------------------*/

import express from 'express';
import {
    createNotificationController,    // Controller to create a new notification
    getAllNotificationsController,   // Controller to get all notifications for a user
    getNotificationByIdController,   // Controller to get a specific notification by ID
    markNotificationAsReadController, // Controller to mark a notification as read
    deleteNotificationController     // Controller to delete a notification by ID
} from '../controllers/notificationController';

const router = express.Router();

// Route to create a new notification
router.post('/', createNotificationController);

// Route to get all notifications for a specific user
router.get('/user/:userId', getAllNotificationsController);

// Route to get a specific notification by ID
router.get('/:id', getNotificationByIdController);

// Route to mark a specific notification as read
router.put('/:id/read', markNotificationAsReadController);

// Route to delete a specific notification by ID
router.delete('/:id', deleteNotificationController);

export default router;
