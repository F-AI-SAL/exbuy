// frontend/src/app/api/categories/route.ts
// Enterprise‑grade Categories API route with pagination + search.
// GET    → fetch categories (with pagination + search)
// POST   → insert new category
// PATCH  → update category by id
// DELETE → remove category by id

import connectDB from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const query = searchParams.get('q')?.toLowerCase() || '';

    const conn = await connectDB();
    const db = conn.connection.db;

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

export async function POST(req: Request) {
  try {
    const conn = await connectDB();
    const db = conn.connection.db;
    const body = await req.json();

    if (!body?.name || !body?.slug) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: name, slug' },
        { status: 400 }
      );
    }

    const result = await db.collection('categories').insertOne({
      name: body.name,
      slug: body.slug,
      image: body.image ?? null,
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      id: result.insertedId,
      message: 'Category created successfully',
    });
  } catch (err) {
    console.error('❌ POST category error:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to create category' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const conn = await connectDB();
    const db = conn.connection.db;
    const body = await req.json();

    const { id, name, slug, image } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Missing category id' },
        { status: 400 }
      );
    }

    const updateFields: Record<string, any> = {};
    if (name) updateFields.name = name;
    if (slug) updateFields.slug = slug;
    if (image !== undefined) updateFields.image = image;

    const result = await db.collection('categories').updateOne(
      { _id: new ObjectId(id) },
      { $set: updateFields }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Category not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      id,
      message: 'Category updated successfully',
    });
  } catch (err) {
    console.error('❌ PATCH category error:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to update category' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const conn = await connectDB();
    const db = conn.connection.db;
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Missing id' },
        { status: 400 }
      );
    }

    const result = await db.collection('categories').deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Category not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      id,
      message: 'Category deleted successfully',
    });
  } catch (err) {
    console.error('❌ DELETE category error:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to delete category' },
      { status: 500 }
    );
  }
}
