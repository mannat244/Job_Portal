// app/api/jobs/[id]/route.js
import { NextResponse } from 'next/server';
import { connectDB } from '../../../lib/db';
import Job from '../../../models/Job';

export async function GET(req, { params }) {
  await connectDB();
  const { id } = await params;

  try {
    const job = await Job.findById(id);
    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    return NextResponse.json({ job });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid job ID' }, { status: 400 });
  }
}
