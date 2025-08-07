import express from 'express';
import { getDashboard } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get("/dashboard/:userId", getDashboard);

export default userRouter;