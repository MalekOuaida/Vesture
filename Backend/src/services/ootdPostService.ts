// Author: Malek Ouaida
// File: ootdPostService.ts
/*-- ootdPostService.ts --------------------------------------------------------------------

   This file provides services for managing "Outfit of the Day" (OOTD) posts in the application.
   Services include creating, retrieving, updating, and deleting posts, as well as interacting 
   with posts by liking, unliking, commenting, saving, and unsaving. Additional functionalities 
   include getting the count of likes, saves, and comments for a specific post.

   Services:
      createOOTDPost          : Creates a new OOTD post
      getAllOOTDPosts         : Retrieves all OOTD posts
      getOOTDPostById         : Retrieves a specific OOTD post by ID
      updateOOTDPost          : Updates a specific OOTD post
      deleteOOTDPost          : Deletes a specific OOTD post by ID
      likeOOTDPost            : Adds a like to a post from a user
      unlikeOOTDPost          : Removes a like from a post by a user
      addComment              : Adds a comment to a post
      saveOOTDPost            : Saves a post to a user's saved posts
      unsaveOOTDPost          : Removes a saved post for a user
      getOOTDPostCounts       : Retrieves counts of likes, saves, and comments for a post

-------------------------------------------------------------------------------------------*/

import OOTDPost, { OOTDPostDocument } from '../models/OOTDPost';

// Service to create a new OOTD post
export const createOOTDPost = async (ootdPostData: Partial<OOTDPostDocument>): Promise<OOTDPostDocument> => {
    try {
        const newOOTDPost = await OOTDPost.create(ootdPostData);
        return newOOTDPost;
    } catch (error) {
        console.error('Error creating OOTD post:', error);
        throw new Error('Failed to create OOTD post');
    }
};

// Service to retrieve all OOTD posts
export const getAllOOTDPosts = async (): Promise<OOTDPostDocument[]> => {
    try {
        const ootdPosts = await OOTDPost.find();
        return ootdPosts;
    } catch (error) {
        console.error('Error retrieving OOTD posts:', error);
        throw new Error('Failed to retrieve OOTD posts');
    }
};

// Service to retrieve a specific OOTD post by ID
export const getOOTDPostById = async (id: string): Promise<OOTDPostDocument | null> => {
    try {
        const ootdPost = await OOTDPost.findById(id);
        return ootdPost;
    } catch (error) {
        console.error('Error retrieving OOTD post by ID:', error);
        throw new Error('Failed to retrieve OOTD post');
    }
};

// Service to update an OOTD post
export const updateOOTDPost = async (id: string, ootdPostData: Partial<OOTDPostDocument>): Promise<OOTDPostDocument | null> => {
    try {
        const updatedOOTDPost = await OOTDPost.findByIdAndUpdate(id, ootdPostData, { new: true });
        return updatedOOTDPost;
    } catch (error) {
        console.error('Error updating OOTD post:', error);
        throw new Error('Failed to update OOTD post');
    }
};

// Service to delete an OOTD post by ID
export const deleteOOTDPost = async (id: string): Promise<OOTDPostDocument | null> => {
    try {
        const ootdPost = await OOTDPost.findById(id);
        if (!ootdPost) {
            throw new Error(`OOTD post with the id ${id} is not found`);
        }
        await ootdPost.deleteOne();
        return ootdPost;
    } catch (error) {
        console.error('Error deleting OOTD post:', error);
        throw new Error('Failed to delete OOTD post');
    }
};

// Service to like an OOTD post
export const likeOOTDPost = async (postId: string, userId: string): Promise<OOTDPostDocument | null> => {
    try {
        const updatedPost = await OOTDPost.findByIdAndUpdate(
            postId,
            { $addToSet: { likes: userId } },
            { new: true }
        );
        return updatedPost;
    } catch (error) {
        console.error('Error liking OOTD post:', error);
        throw new Error('Failed to like OOTD post');
    }
};

// Service to unlike an OOTD post
export const unlikeOOTDPost = async (postId: string, userId: string): Promise<OOTDPostDocument | null> => {
    try {
        const updatedPost = await OOTDPost.findByIdAndUpdate(
            postId,
            { $pull: { likes: userId } },
            { new: true }
        );
        return updatedPost;
    } catch (error) {
        console.error('Error unliking OOTD post:', error);
        throw new Error('Failed to unlike OOTD post');
    }
};

// Service to add a comment to an OOTD post
export const addComment = async (postId: string, userId: string, text: string): Promise<OOTDPostDocument | null> => {
    try {
        const updatedPost = await OOTDPost.findByIdAndUpdate(
            postId,
            { $push: { comments: { userId, text, timestamp: new Date() } } },
            { new: true }
        );
        return updatedPost;
    } catch (error) {
        console.error('Error adding comment to OOTD post:', error);
        throw new Error('Failed to add comment');
    }
};

// Service to save an OOTD post
export const saveOOTDPost = async (postId: string, userId: string): Promise<OOTDPostDocument | null> => {
    try {
        const updatedPost = await OOTDPost.findByIdAndUpdate(
            postId,
            { $addToSet: { saves: userId } },
            { new: true }
        );
        return updatedPost;
    } catch (error) {
        console.error('Error saving OOTD post:', error);
        throw new Error('Failed to save OOTD post');
    }
};

// Service to unsave an OOTD post
export const unsaveOOTDPost = async (postId: string, userId: string): Promise<OOTDPostDocument | null> => {
    try {
        const updatedPost = await OOTDPost.findByIdAndUpdate(
            postId,
            { $pull: { saves: userId } },
            { new: true }
        );
        return updatedPost;
    } catch (error) {
        console.error('Error unsaving OOTD post:', error);
        throw new Error('Failed to unsave OOTD post');
    }
};

// Service to get the counts of likes, saves, and comments for a post
export const getOOTDPostCounts = async (postId: string): Promise<{ likesCount: number, savesCount: number, commentsCount: number } | null> => {
    try {
        const ootdPost = await OOTDPost.findById(postId);
        if (!ootdPost) return null;

        const likesCount = ootdPost.likes.length;
        const savesCount = ootdPost.saves.length;
        const commentsCount = ootdPost.comments.length;

        return { likesCount, savesCount, commentsCount };
    } catch (error) {
        console.error('Error retrieving OOTD post counts:', error);
        throw new Error('Failed to retrieve OOTD post counts');
    }
};
