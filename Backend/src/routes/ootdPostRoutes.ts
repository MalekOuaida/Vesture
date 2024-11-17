// Author: Malek Ouaida
// File: ootdPostRoutes.ts
/*-- ootdPostRoutes.ts ------------------------------------------------------------------

   This file defines the routes for managing "Outfit of the Day" (OOTD) posts.
   Users can create posts, retrieve all posts or posts by specific users, like and
   unlike posts, add comments, save and unsave posts, and retrieve interaction counts.

   Routes:
      POST   /                  : Creates a new OOTD post
      GET    /:userId/posts     : Retrieves all posts for a specific user
      GET    /                  : Retrieves all OOTD posts
      GET    /:id               : Retrieves a specific OOTD post by ID
      PUT    /:id               : Updates a specific OOTD post by ID
      DELETE /:id               : Deletes a specific OOTD post by ID
      POST   /:id/like          : Adds a like to an OOTD post
      POST   /:id/unlike        : Removes a like from an OOTD post
      POST   /:id/comment       : Adds a comment to an OOTD post
      POST   /:id/save          : Saves an OOTD post for a user
      POST   /:id/unsave        : Removes a saved OOTD post for a user
      GET    /:id/counts        : Retrieves the count of likes, saves, and comments for a post

-----------------------------------------------------------------------------------------*/

import express from 'express';
import {
    createOOTDPostController,       // Controller to create a new OOTD post
    getAllOOTDPostsController,       // Controller to retrieve all OOTD posts
    getAllPostsForUserController,    // Controller to get all posts for a specific user
    getOOTDPostByIdController,       // Controller to retrieve a specific OOTD post by ID
    updateOOTDPostController,        // Controller to update a specific OOTD post by ID
    deleteOOTDPostController,        // Controller to delete a specific OOTD post by ID
    likeOOTDPostController,          // Controller to add a like to a post
    unlikeOOTDPostController,        // Controller to remove a like from a post
    addCommentController,            // Controller to add a comment to a post
    saveOOTDPostController,          // Controller to save a post for a user
    unsaveOOTDPostController,        // Controller to unsave a post for a user
    getOOTDPostCountsController      // Controller to get counts of likes, saves, and comments
} from '../controllers/ootdPostController';

const router = express.Router();

// Route to create a new OOTD post
router.post('/', createOOTDPostController);

// Route to get all posts for a specific user
router.get('/:userId/posts', getAllPostsForUserController);

// Route to get all OOTD posts
router.get('/', getAllOOTDPostsController);

// Route to get a specific OOTD post by ID
router.get('/:id', getOOTDPostByIdController);

// Route to update a specific OOTD post by ID
router.put('/:id', updateOOTDPostController);

// Route to delete a specific OOTD post by ID
router.delete('/:id', deleteOOTDPostController);

// Route to add a like to an OOTD post
router.post('/:id/like', likeOOTDPostController);

// Route to remove a like from an OOTD post
router.post('/:id/unlike', unlikeOOTDPostController);

// Route to add a comment to an OOTD post
router.post('/:id/comment', addCommentController);

// Route to save an OOTD post for a user
router.post('/:id/save', saveOOTDPostController);

// Route to unsave an OOTD post for a user
router.post('/:id/unsave', unsaveOOTDPostController);

// Route to get the counts of likes, saves, and comments for a specific post
router.get('/:id/counts', getOOTDPostCountsController);

export default router;
