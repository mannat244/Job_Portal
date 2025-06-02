import { NextResponse } from 'next/server';
import Job from '../../models/Job';
import { connectDB } from '../../lib/db';
import { verifyToken } from '../../lib/auth';

export async function GET(req) {
  await connectDB();

  const url = new URL(req.url);
  const token = req.headers.get('authorization')?.split(' ')[1];
  const user = token ? verifyToken(token) : null;

  const postedByMe = url.searchParams.get('postedBy') === 'me';
  const search = url.searchParams.get('search')?.trim() || '';

  let filter = {};

  if (postedByMe) {
    if (!user || user.role !== 'employer') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    filter.postedBy = user.id;
  }

  if (search) {
    const searchRegex = new RegExp(search, 'i'); // case-insensitive

    filter.$or = [
      { title: searchRegex },
      { company: searchRegex },
      { skills: searchRegex },
    ];
  }

  try {
    const jobs = await Job.find(filter).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ jobs });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function POST(req) {
  await connectDB();

  const token = req.headers.get('authorization')?.split(' ')[1];
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = verifyToken(token);

  if (!user || user.role !== 'employer') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { title, company, description, type, salary, skills } = body;

  if (!title || !company || !description || !type || !salary || !skills || !Array.isArray(skills)) {
    return NextResponse.json({ error: 'Missing or invalid required fields' }, { status: 400 });
  }

  try {
    const job = new Job({
      title,
      company,
      description,
      type,
      salary,
      skills,
      postedBy: user.id,
    });

    await job.save();

    return NextResponse.json({ message: 'Job posted successfully', job }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
