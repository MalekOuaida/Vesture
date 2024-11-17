// Author: Malek Ouaida
// File: UserControllers.ts
/*-- UserControllers.ts ---------------------------------------------------------

   This file includes controller functions for managing users within the application.
   It covers user creation, authentication, profile management, following/unfollowing 
   other users, and profile updates.

   Controllers:
      createUserController          : Creates a new user with hashed password
      loginController               : Authenticates a user and generates a JWT
      getAllUsersController         : Retrieves all users
      getUserByIdController         : Retrieves a user by ID
      updateUserController          : Updates user information by ID
      deleteUserController          : Deletes a user by ID
      followUserController          : Adds a user to another user's following list
      unfollowUserController        : Removes a user from another user's following list
      addProfileController          : Adds profile information (bio, profile photo, website)
      updateProfileController       : Updates profile information
      removeProfileController       : Clears profile fields without deleting the user
      updateBioController           : Updates a user's bio
      removeProfilePhotoController  : Removes the profile photo

----------------------------------------------------------------------------------*/

import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { ObjectId } from 'mongoose';
import User, { UserDocument } from '../models/User';
import { createUser, getAllUsers, getUserById, updateUser, deleteUser, getUserByEmail } from '../services/userService';
import { generateToken } from '../middleware/authToken';

// Creates a new user with hashed password
export const createUserController = async (req: Request, res: Response): Promise<void> => {
    const { username, email, password } = req.body;

    try {
        if (!username || !email || !password) {
            res.status(400).json({ message: "Missing required fields" });
            return;
        }

        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await createUser(username, email, hashedPassword);
        const userId = (newUser._id as string | ObjectId).toString();
        const savedUser = await getUserById(userId);
        const token = generateToken(userId);

        res.status(201).json({ message: "New user created", user: newUser, token });
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
};

// Authenticates a user and returns a JWT token
export const loginController = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        const user = await getUserByEmail(email);
        if (!user) {
            res.status(401).json({ message: 'Invalid email or password' });
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Invalid email or password' });
            return;
        }

        const token = generateToken(String(user._id));
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
};

// Retrieves all users in the system
export const getAllUsersController = async (_req: Request, res: Response): Promise<void> => {
    try {
        const users = await getAllUsers();
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
};

// Retrieves a user by their ID
export const getUserByIdController = async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.id.trim();

    try {
        const user = await getUserById(userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
        } else {
            res.status(200).json({ user });
        }
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
};

// Updates a user's information by their ID
export const updateUserController = async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.id;
    const { username, email, password } = req.body;

    try {
        const updatedUser = await updateUser(userId, username, email, password);
        if (!updatedUser) {
            res.status(404).json({ message: "User not found" });
        } else {
            res.status(200).json({ message: "User updated successfully", user: updatedUser });
        }
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
};

// Deletes a user by their ID
export const deleteUserController = async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.id;

    try {
        const deletedUser = await deleteUser(userId);
        if (!deletedUser) {
            res.status(404).json({ message: "User not found" });
        } else {
            res.status(200).json({ message: "User deleted successfully", user: deletedUser });
        }
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
};

// Allows a user to follow another user
export const followUserController = async (req: Request, res: Response): Promise<void> => {
    const userId = new mongoose.Types.ObjectId(req.body.userId);
    const followUserId = new mongoose.Types.ObjectId(req.params.id);

    try {
        if (userId.equals(followUserId)) {
            res.status(400).json({ message: "You cannot follow yourself" });
            return;
        }

        const user = await User.findById(userId);
        const followUser = await User.findById(followUserId);

        if (!user || !followUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        if (user.following.includes(followUserId)) {
            res.status(400).json({ message: "You already follow this user" });
            return;
        }

        user.following.push(followUserId);
        user.followingCount = (user.followingCount || 0) + 1;

        followUser.followers.push(userId);
        followUser.followerCount = (followUser.followerCount || 0) + 1;

        await user.save();
        await followUser.save();

        res.status(200).json({ message: `You are now following ${followUser.username}` });
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
};

// Allows a user to unfollow another user
export const unfollowUserController = async (req: Request, res: Response): Promise<void> => {
    const userId = new mongoose.Types.ObjectId(req.body.userId);
    const unfollowUserId = new mongoose.Types.ObjectId(req.params.id);

    try {
        if (userId.equals(unfollowUserId)) {
            res.status(400).json({ message: "You cannot unfollow yourself" });
            return;
        }

        const user = await User.findById(userId);
        const unfollowUser = await User.findById(unfollowUserId);

        if (!user || !unfollowUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        if (!user.following.includes(unfollowUserId)) {
            res.status(400).json({ message: "You are not following this user" });
            return;
        }

        user.following = user.following.filter(id => !id.equals(unfollowUserId));
        user.followingCount = Math.max(0, (user.followingCount || 0) - 1);

        unfollowUser.followers = unfollowUser.followers.filter(id => !id.equals(userId));
        unfollowUser.followerCount = Math.max(0, (unfollowUser.followerCount || 0) - 1);

        await user.save();
        await unfollowUser.save();

        res.status(200).json({ message: `You have unfollowed ${unfollowUser.username}` });
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
};

// Adds profile information (bio, profile photo, website) for a user
export const addProfileController = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { bio, profilePhoto, website } = req.body;

    try {
        const user = await User.findById(id);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        if (!user.bio && bio) user.bio = bio;
        if (!user.profilePhoto && profilePhoto) user.profilePhoto = profilePhoto;
        if (!user.website && website) user.website = website;

        const updatedUser = await user.save();
        res.status(200).json({ message: "Profile information added", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while adding profile information.' });
    }
};

// Updates profile information (bio, profile photo, website) for a user
export const updateProfileController = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { bio, profilePhoto, website } = req.body;

    try {
        const user = await User.findByIdAndUpdate(id, { bio, profilePhoto, website }, { new: true });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({ message: "Profile updated successfully", user });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while updating profile information.' });
    }
};

// Clears profile information without deleting the user
export const removeProfileController = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        user.bio = '';
        user.profilePhoto = undefined;
        user.website = '';

        const updatedUser = await user.save();
        res.status(200).json({ message: "Profile information removed", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while removing profile information.' });
    }
};

// Updates a user's bio
export const updateBioController = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { bio } = req.body;

    try {
        const user = await User.findByIdAndUpdate(id, { bio }, { new: true });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({ message: "Bio updated successfully", user });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while updating the bio.' });
    }
};

// Removes a user's profile photo
export const removeProfilePhotoController = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        user.profilePhoto = undefined;
        const updatedUser = await user.save();
        res.status(200).json({ message: "Profile photo removed", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while removing the profile photo.' });
    }
};
