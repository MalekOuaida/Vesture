// Author: Malek Ouaida
// File: notificationService.ts
/*-- notificationService.ts -----------------------------------------------------------

   This file provides services for managing notifications in the application.
   Services include creating a new notification, retrieving all notifications for a user,
   retrieving a notification by ID, marking notifications as read, and deleting notifications.

   Services:
      createNotification       : Creates a new notification
      getAllNotifications      : Retrieves all notifications for a specific user
      getNotificationById      : Retrieves a notification by its ID
      markNotificationAsRead   : Marks a notification as read by updating its status
      deleteNotification       : Deletes a notification by its ID

--------------------------------------------------------------------------------------*/

import Notification, { NotificationDocument } from '../models/Notification';

// Service for creating a new notification
export const createNotification = async (notificationData: Partial<NotificationDocument>): Promise<NotificationDocument> => {
    try {
        const newNotification = await Notification.create(notificationData);
        return newNotification;
    } catch (error) {
        console.error('Error creating notification:', error);
        throw new Error('Failed to create notification');
    }
};

// Service for retrieving all notifications for a specific user
export const getAllNotifications = async (userId: string): Promise<NotificationDocument[]> => {
    try {
        const notifications = await Notification.find({ userId });
        return notifications;
    } catch (error) {
        console.error('Error retrieving notifications:', error);
        throw new Error('Failed to retrieve notifications');
    }
};

// Service for retrieving a notification by ID
export const getNotificationById = async (id: string): Promise<NotificationDocument | null> => {
    try {
        const notification = await Notification.findById(id);
        return notification;
    } catch (error) {
        console.error('Error retrieving notification by ID:', error);
        throw new Error('Failed to retrieve notification');
    }
};

// Service for marking a notification as read
export const markNotificationAsRead = async (id: string): Promise<NotificationDocument | null> => {
    try {
        const updatedNotification = await Notification.findByIdAndUpdate(id, { isRead: true }, { new: true });
        return updatedNotification;
    } catch (error) {
        console.error('Error marking notification as read:', error);
        throw new Error('Failed to mark notification as read');
    }
};

// Service for deleting a notification by ID
export const deleteNotification = async (id: string): Promise<NotificationDocument | null> => {
    try {
        const notification = await Notification.findById(id);
        if (!notification) {
            throw new Error(`Notification with the id ${id} is not found`);
        }
        await notification.deleteOne();
        return notification;
    } catch (error) {
        console.error('Error deleting notification:', error);
        throw new Error('Failed to delete notification');
    }
};
