// Author: Malek Ouaida
// File: notificationController.ts
/*-- notificationController.ts ----------------------------------------------------------------

   This file defines controller functions to manage notifications in the application. 
   The functionalities include creating, retrieving, updating (marking as read), and deleting notifications.
   
   Main Controllers:
      - createNotificationController       : Creates a new notification.
      - getAllNotificationsController      : Retrieves all notifications for a specific user.
      - getNotificationByIdController      : Retrieves a specific notification by its ID.
      - markNotificationAsReadController   : Marks a specific notification as read.
      - deleteNotificationController       : Deletes a specific notification by its ID.
   
   Dependencies:
      - express                            : For handling HTTP requests and responses.
      - notificationService                : Service functions for notification data access.
      
------------------------------------------------------------------------------------------------*/

import { Request, Response } from 'express';
import {
    createNotification,
    getAllNotifications,
    getNotificationById,
    markNotificationAsRead,
    deleteNotification
} from '../services/notificationService';

// Creates a new notification
export const createNotificationController = async (req: Request, res: Response): Promise<void> => {
    try {
        // Create notification using request body data
        const newNotification = await createNotification(req.body);
        res.status(201).json({ message: "Notification created successfully", notification: newNotification });
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
};

// Gets all notifications for a specific user
export const getAllNotificationsController = async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.userId;

    try {
        // Check if userId is provided
        if (!userId) {
            res.status(400).json({ message: "User ID is required" });
            return;
        }

        // Fetch notifications for the user
        const notifications = await getAllNotifications(userId);
        res.status(200).json({ notifications });
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
};

// Gets a notification by its ID
export const getNotificationByIdController = async (req: Request, res: Response): Promise<void> => {
    const notificationId = req.params.id;

    try {
        // Check if notificationId is provided
        if (!notificationId) {
            res.status(400).json({ message: "Notification ID is required" });
            return;
        }

        // Fetch notification by ID
        const notification = await getNotificationById(notificationId);
        if (!notification) {
            res.status(404).json({ message: "Notification not found" });
            return;
        }

        res.status(200).json({ notification });
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
};

// Marks a notification as read
export const markNotificationAsReadController = async (req: Request, res: Response): Promise<void> => {
    const notificationId = req.params.id;

    try {
        // Check if notificationId is provided
        if (!notificationId) {
            res.status(400).json({ message: "Notification ID is required" });
            return;
        }

        // Mark notification as read
        const updatedNotification = await markNotificationAsRead(notificationId);
        if (!updatedNotification) {
            res.status(404).json({ message: "Notification not found" });
            return;
        }

        res.status(200).json({ message: "Notification marked as read", notification: updatedNotification });
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
};

// Deletes a notification by ID
export const deleteNotificationController = async (req: Request, res: Response): Promise<void> => {
    const notificationId = req.params.id;

    try {
        // Check if notificationId is provided
        if (!notificationId) {
            res.status(400).json({ message: "Notification ID is required" });
            return;
        }

        // Delete the notification
        const deletedNotification = await deleteNotification(notificationId);
        if (!deletedNotification) {
            res.status(404).json({ message: "Notification not found" });
            return;
        }

        res.status(200).json({ message: "Notification deleted successfully", notification: deletedNotification });
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
};
