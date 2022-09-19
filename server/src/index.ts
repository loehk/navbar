import express from 'express';
import  "dotenv/config";
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

// Database connection
import dbConnection from './utils/dbConnection';

// Routes
import authRouter from './routes/authRoutes';
import userRouter from './routes/userRoutes';

const app = express();
const port = 3000;

// Middlewares
app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.use('/auth', authRouter);
app.use('/user', userRouter);

app.listen(port, () => {
  dbConnection()
  console.log(`Express server started on port ${port}`);
});
