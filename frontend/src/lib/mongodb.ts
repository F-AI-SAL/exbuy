// frontend/src/lib/mongodb.ts
import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URI: string =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/exbuy';

if (!MONGODB_URI) {
  throw new Error(
    '❌ Please define the MONGODB_URI environment variable in your .env.local file'
  );
}

// Global cache type
interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Attach to global to prevent multiple connections in dev mode
let cached: MongooseCache = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectDB(): Promise<Mongoose> {
  if (cached.conn) {
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ Using existing MongoDB connection');
    }
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000, // fail fast if server not reachable
    });
  }

  try {
    cached.conn = await cached.promise;
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ New MongoDB connection established');
    }
    return cached.conn;
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    cached.promise = null;
    throw err;
  }
}

export default connectDB;
