import express from 'express';
import adminRouter from './routes/adminRoutes.js';
import userRouter from './routes/userRoutes.js';
import vaccineRouter from './routes/vaccineRoutes.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';

const PORT = process.env.PORT || 7000;
const app = express(); 
dotenv.config();

connectDB();

// Middleware
app.use(express.json());

app.use("/vaxitrack/admin", adminRouter);
app.use("/vaxitrack/user", userRouter);
app.use("/vaxitrack/vaccine", vaccineRouter);

app.listen(PORT , () => {
  console.log("Vaxitrack Server is running on PORT:", PORT);
});

