import express from 'express';
import { loginUser } from '../controllers/authControllers.js';

const authRouter = express.Router();

// Define routes for user authentication
authRouter.post("/user-login", loginUser);

export default authRouter;