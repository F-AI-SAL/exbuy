// frontend/src/app/api/categories/route.ts
import connectDB from '../../../lib/mongodb';
import { ObjectId, Db } from 'mongodb';
import { NextResponse } from 'next/server';

async function getDB(): Promise<Db> {
  const conn = await connectDB();
  if (!conn?.connection?.db) {
    throw new Error('Database connection not initialized');
  }
  return conn.connection.db as Db;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const query = searchParams.get('q')?.toLowerCase() || '';

    const db = await getDB();

    const filter: Record<string, any> = {};
    if (query) {
      filter.$or = [
        { name: { $regex: query, $options: 'i' } },
        { slug: { $regex: query, $options: 'i' } },
      ];
    }

    const skip = (page - 1) * limit;

    const categories = await db
      .collection('categories')
      .find(filter)
      .skip(skip)
      .limit(limit)
      .toArray();

    const total = await db.collection('categories').countDocuments(filter);

    return NextResponse.json({
      success: true,
      data: categories,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      message: 'Categories fetched successfully',
    });
  } catch (err) {
    console.error('❌ GET categories error:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

// একইভাবে POST, PATCH, DELETE এও ব্যবহার করো:
export async function POST(req: Request) {
  try {
    const db = await getDB();
    const body = await req.json();
    // ...rest of your code
  } catch (err) {
    // error handling
  }
}