import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/db';
import Job from '../../../../models/Job';
import User from '../../../../models/User';
import { verifyToken } from '../../../../lib/auth';

export async function POST(req, { params }) {
  await connectDB();

  const token = req.headers.get('authorization')?.split(' ')[1];
  const userData = verifyToken(token);
  if (!userData) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const job = await Job.findById(params.id);
  if (!job) {
    return NextResponse.json({ error: 'Job not found' }, { status: 404 });
  }

  const user = await User.findById(userData.id);
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // Add this applicant to the job
  if (!job.applicants) job.applicants = [];
  const alreadyApplied = job.applicants.find(app => app.toString() === user.id);
  if (alreadyApplied) {
    return NextResponse.json({ error: 'Already applied' }, { status: 400 });
  }

job.applicants.push({ user: user._id });
  await job.save();

  return NextResponse.json({ message: 'Applied successfully' });
}
