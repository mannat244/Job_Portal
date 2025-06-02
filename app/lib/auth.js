// /lib/auth.js
import jwt from 'jsonwebtoken';
const SECRET = process.env.JWT_SECRET || 'supersecret';

export function signToken(user) {
  return jwt.sign({ id: user._id, email: user.email,      role: user.role,  }, SECRET, { expiresIn: '7d' });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}
