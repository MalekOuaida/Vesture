# Vesture Project Documentation

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Getting Started](#getting-started)
4. [Environment Variables](#environment-variables)
5. [Backend Setup](#backend-setup)
6. [Frontend Setup](#frontend-setup)
7. [Project Structure](#project-structure)
8. [Usage](#usage)
9. [Dependencies](#dependencies)
10. [Contributing](#contributing)
11. [License](#license)

---

## Introduction

Vesture is a fashion platform where users can save items, create outfits, and share style inspiration. This project combines backend functionality with a React frontend to deliver a full-stack web application.

## Features
- **User Authentication** (sign-up, login, JWT-based authentication).
- **CRUD operations** for closet items, OOTD posts, wishlist items, and products.
- **API integrations** with Cloudinary for image storage and Clarifai for image recognition.
- **User profiles** with features like following, commenting, and liking posts.
- **Animations and navigation** with GSAP for smooth transitions.

---

## Getting Started

### Prerequisites
- **Node.js** and **npm** installed on your machine.
- **MongoDB** instance running locally or using a cloud MongoDB service (e.g., MongoDB Atlas).
- **Cloudinary** and **Clarifai API keys** for image storage and AI functionalities.

### Backend Setup

1. **Navigate to the backend directory**:
   ```bash
   cd vesture/backend
## Getting Started

### Prerequisites

- **Node.js** and **npm** installed on your machine.
- **MongoDB** instance running locally or using a cloud MongoDB service (e.g., MongoDB Atlas).
- **Cloudinary** and **Clarifai API keys** for image storage and AI functionalities.

### Backend Setup

To set up and run the backend server:

1. **Navigate to the backend directory**:

   ```bash
   cd vesture/backend

2. **Install dependencies**:
bash
Copy code
npm install

3. **Create a .env file in the backend/src/config directory and populate it with the following variables**:
PORT=3000
MONGO_URI=<Your MongoDB URI>
JWT_SECRET=<Your JWT Secret>
CLOUDINARY_API_KEY=<Your Cloudinary API Key>
CLOUDINARY_API_SECRET=<Your Cloudinary API Secret>
CLARIFAI_API_KEY=<Your Clarifai API Key>

4. **Start the backend server**:
npm start
The backend should now be running at http://localhost:3000.

## Environment Variables

### Backend

| Variable              | Description                                 |
|-----------------------|---------------------------------------------|
| `PORT`               | Port on which the server will run           |
| `MONGO_URI`          | MongoDB connection URI                      |
| `JWT_SECRET`         | Secret for signing JWT tokens               |
| `CLOUDINARY_API_KEY` | Cloudinary API key for image storage        |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret                    |
| `CLARIFAI_API_KEY`   | Clarifai API key for image recognition      |

## Project Structure

### Backend

- `/controllers`: Contains all Express controllers.
- `/models`: Mongoose schemas for MongoDB collections.
- `/routes`: Route handlers.
- `/services`: Business logic for controllers.
- `/middleware`: Middleware functions.
- `/config`: Database and environment configurations.

### Frontend

- `/components`: React components.
- `/pages`: Page components for different routes.
- `App.tsx`: Main app file.
- `/styles`: CSS and styling.

## Usage

### User Authentication
- Sign up, login, and secure routes with JWT tokens.

### Closet Feature
- Add items to the closet with product details or as custom items.

### OOTD Posts
- Create and share outfit posts with options for likes, comments, and saves.

### Notifications
- Users receive notifications for likes, comments, follows, and more.

## Dependencies

### Backend
- **express**: Web framework for Node.js.
- **mongoose**: MongoDB object modeling tool.
- **jsonwebtoken**: For JWT token generation and verification.
- **cloudinary**: For image storage and management.
- **clarifai**: For AI-powered image recognition.
- **bcrypt**: For password hashing.

### Frontend
- **react**: JavaScript library for building user interfaces.
- **react-router-dom**: Routing for React.
- **gsap**: Animation library for smooth transitions.
- **axios**: HTTP client for making API requests.
