// Author: Malek Ouaida
// File: OOTDPostControllers.ts
/*-- OOTDPostControllers.ts ---------------------------------------------------------

   This file contains controller functions for managing "Outfit of the Day" (OOTD) posts
   in the application. Main functionalities include:

      - Creating an OOTD post with optional products
      - Retrieving all OOTD posts or posts by specific users
      - Retrieving, updating, and deleting an OOTD post by ID
      - Managing interactions such as likes, comments, and saves on OOTD posts
      - Generating notifications for actions like likes, saves, and comments

   Basic controllers:
      createOOTDPostController   : To create a new OOTD post
      getAllPostsForUserController : To get all posts for a specific user
      getAllOOTDPostsController    : To get all OOTD posts
      getOOTDPostByIdController    : To get a specific post by ID
      updateOOTDPostController     : To update an OOTD post by ID
      deleteOOTDPostController     : To delete an OOTD post by ID
      likeOOTDPostController       : To like a post and notify the post owner
      unlikeOOTDPostController     : To remove a like from a post
      addCommentController         : To add a comment to a post and notify the owner
      saveOOTDPostController       : To save a post and notify the owner
      unsaveOOTDPostController     : To unsave a post
      getOOTDPostCountsController  : To get counts of likes, saves, and comments

----------------------------------------------------------------------------------*/

// Imports
import { Request, Response } from 'express';
import OOTDPost from '../models/OOTDPost';
import { createNotification } from '../services/notificationService';
import Product from '../models/Product';
import mongoose from 'mongoose';

// Creates a new OOTD post with optional products
export const createOOTDPostController = async (req: Request, res: Response): Promise<void> => {
    const { userId, imageURL, caption, tags, products } = req.body;
    try {
        const ootdPostData = { userId, imageURL, caption, tags };
        const ootdPost = await OOTDPost.create(ootdPostData);

        const createdProducts = [];
        for (const product of products) {
            const { brand, type, color, price, link, name } = product;
            if (brand && type && color && price && link) {
                const productData = {
                    brand,
                    name: name || 'Untitled Item',
                    price,
                    link,
                    type,
                    color,
                    tags,
                    image: imageURL,
                    source: 'UserCreated'
                };
                const newProduct = await Product.create(productData);
                createdProducts.push(newProduct);
            }
        }
        res.status(201).json({
            message: "OOTD post created successfully",
            ootdPost,
            createdProducts: createdProducts.length ? createdProducts : "No products were added to the catalog",
        });
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
};

// Gets all OOTD posts for a specific user
export const getAllPostsForUserController = async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.userId;
    try {
        const userPosts = await OOTDPost.find({ userId });
        if (!userPosts.length) {
            res.status(404).json({ message: "No posts found for this user" });
            return;
        }
        res.status(200).json({ userPosts });
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
};

// Gets all OOTD posts
export const getAllOOTDPostsController = async (_req: Request, res: Response): Promise<void> => {
    try {
        const ootdPosts = await OOTDPost.find();
        res.status(200).json({ ootdPosts });
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
};

// Gets an OOTD post by ID
export const getOOTDPostByIdController = async (req: Request, res: Response): Promise<void> => {
    const ootdPostId = req.params.id;
    try {
        const ootdPost = await OOTDPost.findById(ootdPostId);
        if (!ootdPost) {
            res.status(404).json({ message: "OOTD post not found" });
            return;
        }
        res.status(200).json({ ootdPost });
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
};

// Updates an OOTD post by ID
export const updateOOTDPostController = async (req: Request, res: Response): Promise<void> => {
    const ootdPostId = req.params.id;
    try {
        const updatedOOTDPost = await OOTDPost.findByIdAndUpdate(ootdPostId, req.body, { new: true });
        if (!updatedOOTDPost) {
            res.status(404).json({ message: "OOTD post not found" });
            return;
        }
        res.status(200).json({ message: "OOTD post updated successfully", ootdPost: updatedOOTDPost });
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
};

// Deletes an OOTD post by ID
export const deleteOOTDPostController = async (req: Request, res: Response): Promise<void> => {
    const ootdPostId = req.params.id;
    try {
        const deletedOOTDPost = await OOTDPost.findByIdAndDelete(ootdPostId);
        if (!deletedOOTDPost) {
            res.status(404).json({ message: "OOTD post not found" });
            return;
        }
        res.status(200).json({ message: "OOTD post deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
};

// Adds a like to an OOTD post and creates a notification for the owner
export const likeOOTDPostController = async (req: Request, res: Response): Promise<void> => {
    const ootdPostId = req.params.id;
    const userId = req.body.userId;
    try {
        const ootdPost = await OOTDPost.findByIdAndUpdate(
            ootdPostId,
            { $addToSet: { likes: userId } },
            { new: true }
        );
        if (!ootdPost) {
            res.status(404).json({ message: "OOTD post not found" });
            return;
        }
        if (ootdPost.userId.toString() !== userId) {
            await createNotification({
                userId: ootdPost.userId,
                type: 'like',
                relatedId: new mongoose.Types.ObjectId(ootdPostId),
                message: `User ${userId} liked your post.`,
            });
        }
        res.status(200).json({ message: "Post liked successfully", likesCount: ootdPost.likes.length });
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
};

// Removes a like from an OOTD post
export const unlikeOOTDPostController = async (req: Request, res: Response): Promise<void> => {
    const ootdPostId = req.params.id;
    const userId = req.body.userId;
    try {
        const ootdPost = await OOTDPost.findByIdAndUpdate(
            ootdPostId,
            { $pull: { likes: userId } },
            { new: true }
        );
        if (!ootdPost) {
            res.status(404).json({ message: "OOTD post not found" });
            return;
        }
        res.status(200).json({ message: "Like removed successfully", likesCount: ootdPost.likes.length });
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
};

// Adds a comment to an OOTD post and notifies the owner
export const addCommentController = async (req: Request, res: Response): Promise<void> => {
    const ootdPostId = req.params.id;
    const { userId, text } = req.body;
    try {
        const ootdPost = await OOTDPost.findByIdAndUpdate(
            ootdPostId,
            { $push: { comments: { userId, text, timestamp: new Date() } } },
            { new: true }
        );
        if (!ootdPost) {
            res.status(404).json({ message: "OOTD post not found" });
            return;
        }
        if (ootdPost.userId.toString() !== userId) {
            await createNotification({
                userId: ootdPost.userId,
                type: 'comment',
                relatedId: new mongoose.Types.ObjectId(ootdPostId),
                message: `User ${userId} commented on your post: "${text}"`,
            });
        }
        res.status(200).json({ message: "Comment added successfully", comments: ootdPost.comments });
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
};

// Saves an OOTD post for a user and notifies the post owner
export const saveOOTDPostController = async (req: Request, res: Response): Promise<void> => {
    const ootdPostId = req.params.id;
    const userId = req.body.userId;
    try {
        const ootdPost = await OOTDPost.findByIdAndUpdate(
            ootdPostId,
            { $addToSet: { saves: userId } },
            { new: true }
        );
        if (!ootdPost) {
            res.status(404).json({ message: "OOTD post not found" });
            return;
        }
        if (ootdPost.userId.toString() !== userId) {
            await createNotification({
                userId: ootdPost.userId,
                type: 'save',
                relatedId: new mongoose.Types.ObjectId(ootdPostId),
                message: `User ${userId} saved your post.`,
            });
        }
        res.status(200).json({ message: "Post saved successfully", savesCount: ootdPost.saves.length });
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
};

// Unsaves an OOTD post for a user
export const unsaveOOTDPostController = async (req: Request, res: Response): Promise<void> => {
    const ootdPostId = req.params.id;
    const userId = req.body.userId;
    try {
        const ootdPost = await OOTDPost.findByIdAndUpdate(
            ootdPostId,
            { $pull: { saves: userId } },
            { new: true }
        );
        if (!ootdPost) {
            res.status(404).json({ message: "OOTD post not found" });
            return;
        }
        res.status(200).json({ message: "Post unsaved successfully", savesCount: ootdPost.saves.length });
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
};

// Gets the counts of likes, saves, and comments for a specific OOTD post
export const getOOTDPostCountsController = async (req: Request, res: Response): Promise<void> => {
    const ootdPostId = req.params.id;
    try {
        const ootdPost = await OOTDPost.findById(ootdPostId);
        if (!ootdPost) {
            res.status(404).json({ message: "OOTD post not found" });
            return;
        }
        const likesCount = ootdPost.likes.length;
        const savesCount = ootdPost.saves.length;
        const commentsCount = ootdPost.comments.length;
        res.status(200).json({ likesCount, savesCount, commentsCount });
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
};
