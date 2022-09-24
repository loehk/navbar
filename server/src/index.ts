import express from 'express';
import  "dotenv/config";
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

// Database connection
import dbConnection from './utils/dbConnection';

// Routes
import authRouter from './routes/authRoutes';
import userRouter from './routes/userRoutes';
import locationRouter from './routes/locationRoutes';

const app = express();
const port = 3000;

// Middlewares
app.use(bodyParser.json());
app.use(cookieParser());

// Cors
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next()
});

// Routes
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/location', locationRouter)

app.listen(port, () => {
  dbConnection()
  console.log(`Express server started on port ${port}`);
});
