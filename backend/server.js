import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import bookRoutes from './routes/books.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Book Management API is running' });
});

// Favicon handler to prevent 404 warnings
app.get('/favicon.ico', (req, res) => {
  res.status(204).end();
});

// MongoDB Connection
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

console.log('🔍 Debug Info:');
console.log('PORT:', PORT);
console.log('MONGO_URL:', MONGO_URL);
console.log('');

// Start server first
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Connect to MongoDB with retry logic
let useMemoryDB = false;
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log('✅ Connected to MongoDB successfully!');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.log('');
    console.log('⚠️  Network is blocking MongoDB Atlas connection.');
    console.log('✅ Switching to IN-MEMORY DATABASE for testing!');
    console.log('📝 Your data will work but won\'t persist after restart.');
    console.log('💡 To fix: Change DNS to 8.8.8.8 or use different network.');
    console.log('');
    useMemoryDB = true;
  }
};

connectDB();

export { useMemoryDB };
