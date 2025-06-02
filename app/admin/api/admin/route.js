import { NextResponse } from 'next/server';
import { connectDB } from '../../../lib/db';
import User from '../../../models/User';
import Job from '../../../models/Job';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export async function GET() {
  await connectDB();
  try {
    // Fetch moderation data
    const users = await User.find().select('name email isBlocked');
    const jobs = await Job.find().select('title company postedBy status applicants');
    const applications = [];
    for (const job of jobs) {
      for (const applicant of job.applicants) {
        applications.push({
          _id: applicant._id,
          jobId: job._id,
          jobTitle: job.title,
          userId: applicant.user,
          status: applicant.status,
        });
      }
    }
    return NextResponse.json({ users, jobs, applications });
  } catch (err) {
    console.error('Admin GET error:', err);
    return NextResponse.json({ error: 'Error fetching moderation data' }, { status: 500 });
  }
}

export async function POST(req) {
  await connectDB();

  const body = await req.json();  // Consume body once here

  const { type } = body;

  if (type === 'login') {
    const { username, password } = body;  // Use already parsed body here
    if (
      username === ADMIN_USERNAME &&
      password === ADMIN_PASSWORD
    ) {
      return NextResponse.json({ message: 'Login successful' });
    }
    return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
  }

  // moderation actions
  const { id, action } = body;

  try {
    if (type === 'user') {
      const isBlocked = action === 'block';
      await User.findByIdAndUpdate(id, { isBlocked });
      return NextResponse.json({ message: `User ${action}ed successfully` });
    } else if (type === 'job') {
      if (action === 'delete') {
        await Job.findByIdAndDelete(id);
      } else {
        await Job.findByIdAndUpdate(id, { status: action });
      }
      return NextResponse.json({ message: `Job ${action}ed successfully` });
    } else if (type === 'application') {
      const job = await Job.findOne({ 'applicants._id': id });
      if (!job) throw new Error('Application not found');
      const applicant = job.applicants.id(id);
      if (!applicant) throw new Error('Applicant not found');
      applicant.status = action;
      await job.save();
      return NextResponse.json({ message: `Application ${action}ed successfully` });
    }
    throw new Error('Invalid type');
  } catch (err) {
    console.error('Admin POST error:', err);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
