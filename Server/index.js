import express, { json, urlencoded } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import connectDB from './config/connectDb.js';
import authRoutes from './Routes/authRoutes.js';
import awardRoutes from './Routes/awards.js';

dotenv.config();

const port = process.env.PORT || 8000;

// Connect to the database
await connectDB();

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));

// CORS Configuration
const whitelist = [
  'http://localhost:3000',
  'http://localhost:19006',
  'http://localhost:8081',
  'exp://127.0.0.1:19000',
  'exp://172.20.10.3:8081',
  'exp://192.168.0.120:8081',
  'exp://192.168.0.1:19000',
  'exp://192.168.245.50:19000',
  'exp://10.20.224.35:19000',
  'exp://10.20.224.207:19000',
  'exp://192.168.0.115:19000',
  'https://your-production-domain.com',
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true); // Allow requests with no origin (e.g., mobile apps) or in whitelist
    } else {
      console.error(`Blocked by CORS: ${origin}`); // Log blocked origin
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

app.use(cors());

// Routes
app.get('/', (req, res) => res.send('Hello World!'));
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/award', awardRoutes);

// Jobs
// checkOverdueTasks;
// dueDateNotification;

// Start the server
app.listen(port, () => console.log(`Server running on port ${port}`));
