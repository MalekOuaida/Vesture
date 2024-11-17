// Author: Malek Ouaida
// File: userRoutes.ts
/*-- userRoutes.ts ---------------------------------------------------------------------

   This file defines the routes for managing user accounts within the application.
   Users can create accounts, log in, manage profiles, follow/unfollow others, 
   and perform other user-related actions. Routes requiring authentication are 
   protected with the verifyToken middleware.

   Routes:
      POST   /                   : Creates a new user account
      POST   /login              : Authenticates a user and returns a token
      GET    /users              : Retrieves all users
      GET    /:id                : Retrieves a user by their ID
      PUT    /:id                : Updates a user's account details (requires token)
      DELETE /:id                : Deletes a user's account (requires token)
      POST   /:id/follow         : Follows another user
      POST   /:id/unfollow       : Unfollows another user
      POST   /:id/profile        : Adds profile information (requires token)
      PUT    /:id/profile        : Updates profile information (requires token)
      DELETE /:id/profile        : Removes profile information (requires token)
      PUT    /:id/bio            : Updates the user's bio (requires token)
      DELETE /:id/profile-photo  : Removes the user's profile photo (requires token)

---------------------------------------------------------------------------------------*/

import express from 'express';
import {
    createUserController,            // Controller to create a new user account
    loginController,                 // Controller to authenticate a user
    getAllUsersController,           // Controller to retrieve all users
    getUserByIdController,           // Controller to retrieve a specific user by ID
    updateUserController,            // Controller to update a user's account details
    deleteUserController,            // Controller to delete a user's account
    followUserController,            // Controller to follow another user
    unfollowUserController,          // Controller to unfollow another user
    addProfileController,            // Controller to add profile information
    updateProfileController,         // Controller to update profile information
    removeProfileController,         // Controller to remove profile information
    updateBioController,             // Controller to update the user's bio
    removeProfilePhotoController     // Controller to remove the user's profile photo
} from '../controllers/userController';
import { verifyToken } from '../middleware/authToken';

const router = express.Router();

// Route to create a new user account
router.post('/', createUserController);

// Route for user login and token generation
router.post('/login', loginController);

// Route to retrieve all users
router.get('/users', getAllUsersController);

// Route to retrieve a specific user by ID
router.get('/:id', getUserByIdController);

// Route to update a user's account details (requires authentication)
router.put('/:id', verifyToken, updateUserController);

// Route to delete a user's account (requires authentication)
router.delete('/:id', verifyToken, deleteUserController);

// Route to follow another user
router.post('/:id/follow', followUserController);

// Route to unfollow another user
router.post('/:id/unfollow', unfollowUserController);

// Route to add profile information (requires authentication)
router.post('/:id/profile', verifyToken, addProfileController);

// Route to update profile information (requires authentication)
router.put('/:id/profile', verifyToken, updateProfileController);

// Route to remove profile information (requires authentication)
router.delete('/:id/profile', verifyToken, removeProfileController);

// Route to update the user's bio (requires authentication)
router.put('/:id/bio', verifyToken, updateBioController);

// Route to remove the user's profile photo (requires authentication)
router.delete('/:id/profile-photo', verifyToken, removeProfilePhotoController);

export default router;
