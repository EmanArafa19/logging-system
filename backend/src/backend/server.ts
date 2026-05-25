import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import applicationRoutes from './routes/applications';
import logRoutes from './routes/logs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


app.use('/api/users', authRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api', logRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});


mongoose.connect(process.env.MONGODB_URI!)
  .then(() => {
    console.log(' Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(' MongoDB connection error:', error);
    process.exit(1);
  });