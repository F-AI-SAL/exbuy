// frontend/src/pages/api/auth/register.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

// ✅ MongoDB connection helper
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/exbuy';

if (!mongoose.connection.readyState) {
  mongoose.connect(MONGODB_URI).catch((err) => {
    console.error('MongoDB connection error:', err);
  });
}

// ✅ User schema/model
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, password } = req.body as {
    name?: string;
    email?: string;
    password?: string;
  };

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email and password are required' });
  }

  try {
    // ✅ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Save user to MongoDB
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // ✅ Generate JWT
    const secret = process.env.JWT_SECRET || 'your-secret-key';
    const token = jwt.sign({ email, name }, secret, { expiresIn: '1h' });

    // ✅ Set cookie
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60, // 1 hour
      })
    );

    return res.status(201).json({ success: true, token });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
