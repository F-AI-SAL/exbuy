// frontend/src/app/api/categories/lens/route.ts
// Enterprise‑grade Lens API route with auto-cleanup.
// POST   → create new lens job
// GET    → check job status
// PATCH  → update job status
// DELETE → remove old job
// Auto‑cleanup → removes jobs older than JOB_TTL

import { NextResponse } from 'next/server';

// In-memory store for demo (future: DB/queue)
const jobs: Record<string, { status: string; createdAt: number }> = {};

// Job TTL (time-to-live) in milliseconds (e.g. 10 minutes)
const JOB_TTL = 10 * 60 * 1000;

// Auto‑cleanup: run every minute to remove expired jobs
setInterval(() => {
  const now = Date.now();
  for (const id in jobs) {
    if (now - jobs[id].createdAt > JOB_TTL) {
      delete jobs[id];
      if (process.env.NODE_ENV === 'development') {
        console.log(`🧹 Auto-cleanup removed job: ${id}`);
      }
    }
  }
}, 60 * 1000);

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);

    const jobId = `lens_job_${Date.now()}`;
    jobs[jobId] = { status: 'pending', createdAt: Date.now() };

    return NextResponse.json(
      {
        success: true,
        id: jobId,
        received: body ?? null,
        message: 'Lens job created successfully',
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('❌ Lens route POST error:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to create lens job' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const jobId = searchParams.get('id');

    if (!jobId) {
      return NextResponse.json(
        { success: false, error: 'Missing job id' },
        { status: 400 }
      );
    }

    const job = jobs[jobId];
    if (!job) {
      return NextResponse.json(
        { success: false, error: 'Job not found or expired' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      id: jobId,
      status: job.status,
      createdAt: job.createdAt,
    });
  } catch (err) {
    console.error('❌ Lens route GET error:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch job status' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: 'Missing job id or status' },
        { status: 400 }
      );
    }

    const job = jobs[id];
    if (!job) {
      return NextResponse.json(
        { success: false, error: 'Job not found or expired' },
        { status: 404 }
      );
    }

    const allowedStatuses = ['pending', 'processing', 'completed', 'failed'];
    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, error: 'Invalid status value' },
        { status: 400 }
      );
    }

    jobs[id].status = status;

    return NextResponse.json({
      success: true,
      id,
      status,
      message: 'Job status updated successfully',
    });
  } catch (err) {
    console.error('❌ Lens route PATCH error:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to update job status' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const jobId = searchParams.get('id');

    if (!jobId) {
      return NextResponse.json(
        { success: false, error: 'Missing job id' },
        { status: 400 }
      );
    }

    if (!jobs[jobId]) {
      return NextResponse.json(
        { success: false, error: 'Job not found or expired' },
        { status: 404 }
      );
    }

    delete jobs[jobId];

    return NextResponse.json({
      success: true,
      id: jobId,
      message: 'Job deleted successfully',
    });
  } catch (err) {
    console.error('❌ Lens route DELETE error:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to delete job' },
      { status: 500 }
    );
  }
}
