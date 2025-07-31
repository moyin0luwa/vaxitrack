import express from 'express';
import { createUser, getAllUsers, updateUser, getUser, deleteUser } from '../controllers/adminController.js';
const adminRouter = express.Router();

// Define routes for admin functionality
// Create user route, taking the controller function from adminController and mapping it to the appropriate path.
adminRouter.post('/create-user', createUser);
adminRouter.get('/allusers', getAllUsers);
adminRouter.get('/user/:userId', getUser);
adminRouter.put('/update-user/:userId', updateUser);
adminRouter.delete('/delete-user/:userId', deleteUser);

export default adminRouter;