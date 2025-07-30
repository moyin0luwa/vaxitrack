import express from 'express';
import { homepage } from '../controllers/adminController.js';
const adminRouter = express.Router();

// Define routes for admin functionality
adminRouter.get("/", homepage);

export default adminRouter;