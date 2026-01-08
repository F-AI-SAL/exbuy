// frontend/src/app/api/categories/suggestions/route.ts
// Enterprise‑grade Suggestions API route with fuzzy search + ranking + real-time popularity tracking.
// GET    → return product/category suggestions
// POST   → track events (click/sale) and auto-increment popularity

import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import { Db, ObjectId } from 'mongodb';

// Utility: Levenshtein distance (edit distance)
function levenshtein(a: string, b: string): number {
  const matrix: number[][] = [];
  const alen = a.length;
  const blen = b.length;

  for (let i = 0; i <= alen; i++) matrix[i] = [i];
  for (let j = 0; j <= blen; j++) matrix[0][j] = j;

  for (let i = 1; i <= alen; i++) {
    for (let j = 1; j <= blen; j++) {
      if (a.charAt(i - 1) === b.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }
  return matrix[alen][blen];
}

// ✅ Safe DB getter
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
    const q = searchParams.get('q')?.toLowerCase() || '';
    const limit = parseInt(searchParams.get('limit') || '8', 10);

    if (!q) {
      return NextResponse.json({
        success: true,
        data: [],
        count: 0,
        message: 'No query provided',
      });
    }

    const db = await getDB();

    const products = await db.collection('products').find({}).toArray();

    const ranked = products
      .map((p: any) => {
        const lower = p.name.toLowerCase();
        const distance = levenshtein(lower, q);
        const includes = lower.includes(q);

        let relevanceScore = includes ? 0 : distance;
        const popularity = p.popularity ?? 0;

        const finalScore = relevanceScore - popularity / 100;

        return {
          product: p.name,
          score: finalScore,
          popularity,
        };
      })
      .filter((item) => item.score <= 2)
      .sort((a, b) => a.score - b.score)
      .slice(0, limit);

    const suggestions = ranked.map((r) => ({
      name: r.product,
      popularity: r.popularity,
    }));

    return NextResponse.json({
      success: true,
      data: suggestions,
      count: suggestions.length,
      message: suggestions.length
        ? 'Suggestions fetched successfully'
        : 'No suggestions found',
    });
  } catch (err) {
    console.error('❌ Suggestions API GET error:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch suggestions' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { productId, eventType } = body;

    if (!productId || !eventType) {
      return NextResponse.json(
        { success: false, error: 'Missing productId or eventType' },
        { status: 400 }
      );
    }

    const db = await getDB();

    // Auto-increment popularity based on event type
    const incrementValue = eventType === 'sale' ? 5 : 1; // sale = +5, click = +1

    const result = await db.collection('products').updateOne(
      { _id: new ObjectId(productId) },
      { $inc: { popularity: incrementValue } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      productId,
      eventType,
      increment: incrementValue,
      message: 'Popularity updated successfully',
    });
  } catch (err) {
    console.error('❌ Suggestions API POST error:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to update popularity' },
      { status: 500 }
    );
  }
}
