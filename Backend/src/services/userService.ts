// Author: Malek Ouaida
// File: userService.ts
/*-- userService.ts ---------------------------------------------------------------------

   This file provides services for managing users in the application.
   Services include creating, retrieving, updating, and deleting users, as well as
   managing follow/unfollow actions between users.

   Services:
      createUser       : Creates a new user with hashed password
      getAllUsers      : Retrieves all users with selected fields
      getUserById      : Retrieves a specific user by ID
      getUserByEmail   : Retrieves a user by their email
      updateUser       : Updates user details, including optional password hashing
      deleteUser       : Deletes a user by ID
      followUser       : Adds a follow relationship from one user to another
      unfollowUser     : Removes a follow relationship from one user to another

--------------------------------------------------------------------------------------*/

import User, { UserDocument } from '../models/User';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const saltRounds = 10;

// Service to create a new user with hashed password
export const createUser = async (username: string, email: string, passwordHash: string): Promise<UserDocument> => {
    const newUser = new User({ username, email, passwordHash });
    return await newUser.save();
};

// Service to retrieve all users with selected fields
export const getAllUsers = async (): Promise<UserDocument[]> => {
    try {
        const users = await User.find({}, 'username email followerCount followingCount');
        return users;
    } catch (error) {
        console.error('Error retrieving users:', error);
        throw new Error('Failed to retrieve users');
    }
};

// Service to retrieve a specific user by ID
export const getUserById = async (id: string): Promise<UserDocument | null> => {
    try {
        const user = await User.findById(id);
        if (user) {
            return user;
        }
        return null;
    } catch (error) {
        console.error('Error retrieving user by ID:', error);
        throw new Error('Failed to retrieve user');
    }
};

// Service to retrieve a user by their email
export const getUserByEmail = async (email: string): Promise<UserDocument | null> => {
    return await User.findOne({ email });
};

// Service to update user details, with optional password hashing
export const updateUser = async (id: string, username?: string, email?: string, password?: string): Promise<UserDocument | null> => {
    try {
        const updateData: Partial<UserDocument> = { username, email };
        if (password) {
            updateData.passwordHash = await bcrypt.hash(password, saltRounds);
        }
        const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
        return updatedUser;
    } catch (error) {
        console.error('Error updating user:', error);
        throw new Error('Failed to update user');
    }
};

// Service to delete a user by ID
export const deleteUser = async (id: string): Promise<UserDocument | null> => {
    try {
        const user = await User.findById(id);
        if (!user) {
            throw new Error(`User with the id ${id} is not found`);
        }
        await user.deleteOne();
        return user;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw new Error('Failed to delete user');
    }
};

// Service to add a follow relationship from one user to another
export const followUser = async (userId: string, followUserId: string): Promise<void> => {
    const user = await User.findById(userId);
    const followUser = await User.findById(followUserId);

    if (!user || !followUser) throw new Error('User not found');

    const followUserObjectId = new mongoose.Types.ObjectId(followUserId);
    const userObjectId = new mongoose.Types.ObjectId(userId);

    if (!user.following.includes(followUserObjectId)) {
        user.following.push(followUserObjectId);
        user.followingCount = (user.followingCount || 0) + 1;
    }

    if (!followUser.followers.includes(userObjectId)) {
        followUser.followers.push(userObjectId);
        followUser.followerCount = (followUser.followerCount || 0) + 1;
    }

    await user.save();
    await followUser.save();
};

// Service to remove a follow relationship from one user to another
export const unfollowUser = async (userId: string, unfollowUserId: string): Promise<void> => {
    const user = await User.findById(userId);
    const unfollowUser = await User.findById(unfollowUserId);

    if (!user || !unfollowUser) throw new Error('User not found');

    const unfollowUserObjectId = new mongoose.Types.ObjectId(unfollowUserId);
    const userObjectId = new mongoose.Types.ObjectId(userId);

    user.following = user.following.filter(id => !id.equals(unfollowUserObjectId));
    user.followingCount = Math.max(0, (user.followingCount || 0) - 1);

    unfollowUser.followers = unfollowUser.followers.filter(id => !id.equals(userObjectId));
    unfollowUser.followerCount = Math.max(0, (unfollowUser.followerCount || 0) - 1);

    await user.save();
    await unfollowUser.save();
};
