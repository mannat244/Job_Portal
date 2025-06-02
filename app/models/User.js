import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['employee', 'employer'], required: true },

  // Only for employees
  resume: { type: String }, // Store file URL or base64
  profile: {
    name: String,
    phone: String,
    experience: String,
    skills: [String],
    education: String,
  },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
