import { NextResponse } from 'next/server';
import { connectDB } from '../../../lib/db';
import { verifyToken } from '../../../lib/auth';
import Job from '../../../models/Job';

export async function GET(req) {
  await connectDB();

  const token = req.headers.get('authorization')?.split(' ')[1];
  const userData = verifyToken(token);

  if (!userData) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = userData.id;

  try {
    const appliedJobs = await Job.find({
      'applicants.user': userId
    })
      .select('title company salary type createdAt applicants')  // make sure to include applicants
      .sort({ createdAt: -1 });

    const jobsWithStatus = appliedJobs.map(job => {
      // Ensure applicants exist and filter properly
      const applicant = (job.applicants || []).find(
        (a) => a.user && a.user.toString() === userId.toString()
      );

      return {
        _id: job._id,
        title: job.title,
        company: job.company,
        salary: job.salary,
        type: job.type,
        createdAt: job.createdAt,
        status: applicant?.status || 'pending',
      };
    });

    return NextResponse.json({ jobs: jobsWithStatus });
  } catch (err) {
    console.error('Error fetching applied jobs:', err);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
