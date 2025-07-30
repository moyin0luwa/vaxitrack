import express from 'express';
import { homepage } from '../controllers/userController.js';
const userRouter = express.Router();

// Define routes for admin functionality
userRouter.get("/", homepage);

export default userRouter;