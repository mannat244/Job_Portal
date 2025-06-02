// /app/api/auth/register/route.js
import { connectDB } from '../../../lib/db';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  await connectDB();
  const { email, password, role } = await req.json();

  const exists = await User.findOne({ email });
  if (exists) return Response.json({ error: 'User exists' }, { status: 400 });

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashed, role });

  return Response.json({ message: 'Registered', user: { email: user.email, role: user.role } });
}
