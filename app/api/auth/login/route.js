// /app/api/auth/login/route.js
import { connectDB } from '../../../lib/db';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';
import { signToken } from '../../../lib/auth';

export async function POST(req) {
  await connectDB();
  const { email, password } = await req.json();

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return Response.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const token = signToken(user); // contains ID + email
  return Response.json({ token, user: { email: user.email, role: user.role } });
}