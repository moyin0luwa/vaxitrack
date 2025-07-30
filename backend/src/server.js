import express from 'express';
import adminRouter from './routes/adminRoutes.js';
import userRouter from './routes/userRoutes.js';

const app = express(); 

app.use("/vaxitrack/admin", adminRouter);
app.use("/vaxitrack/user", userRouter);

app.listen(7000 , () => {
  console.log('Vaxitrack Server is running on port 7000');
});