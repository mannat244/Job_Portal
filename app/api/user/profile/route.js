import { NextResponse } from 'next/server';
import User from '../../../models/User';
import { connectDB } from '../../../lib/db';
import { verifyToken } from '../../../lib/auth';

export async function GET(req) {
  await connectDB();

  const token = req.headers.get('authorization')?.split(' ')[1];
  const userData = verifyToken(token);
  if (!userData) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await User.findById(userData.id).select('-password');
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json({ user });
}

export async function POST(req) {
  await connectDB();

  const token = req.headers.get('authorization')?.split(' ')[1];
  const userData = verifyToken(token);
  if (!userData) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { name, phone, experience, skills, education, resume } = await req.json();

  if (!name || name.trim() === '') {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 });
  }

  const user = await User.findById(userData.id);
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  user.profile = {
    name,
    phone: phone || '',
    experience: experience || '',
    skills: Array.isArray(skills) ? skills : (skills ? skills.split(',').map(s => s.trim()) : []),
    education: education || '',
  };

  if (resume) {
    user.resume = resume;
  }

  await user.save();
  return NextResponse.json({ message: 'Profile updated successfully' });
}
