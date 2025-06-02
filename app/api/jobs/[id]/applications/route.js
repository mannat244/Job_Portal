import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/db';
import Job from '../../../../models/Job';
import { verifyToken } from '../../../../lib/auth';
import User from '../../../../models/User';

export async function GET(req, context) {
  await connectDB();
  const { id } = await context.params;

  const token = req.headers.get('authorization')?.split(' ')[1];
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const user = verifyToken(token);
  if (!user || user.role !== 'employer') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const job = await Job.findById(id).populate('applicants.user', 'email resume profile');

  if (!job) return NextResponse.json({ error: 'Job not found' }, { status: 404 });
  if (job.postedBy.toString() !== user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const applications = job.applicants.map((app) => ({
    _id: app._id,
    status: app.status,
    appliedAt: app.appliedAt,
    user: {
      _id: app.user._id,
      email: app.user.email,
      resume: app.user.resume,
      name: app.user?.profile?.name || 'Unnamed',
      skills: app.user?.profile?.skills || [],
    },
  }));

  return NextResponse.json({ applications });
}

export async function PATCH(req, context) {
  await connectDB();
  const { id } = await context.params;

  const token = req.headers.get('authorization')?.split(' ')[1];
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const user = verifyToken(token);
  if (!user || user.role !== 'employer') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { applicationId, status } = body;

  if (!applicationId || !['pending', 'approved', 'rejected'].includes(status)) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }

  const job = await Job.findById(id);
  if (!job) return NextResponse.json({ error: 'Job not found' }, { status: 404 });

  if (job.postedBy.toString() !== user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const applicant = job.applicants.id(applicationId);
  if (!applicant) {
    return NextResponse.json({ error: 'Application not found' }, { status: 404 });
  }

  applicant.status = status;
  await job.save();

  return NextResponse.json({ message: `Application ${status} successfully.` });
}
