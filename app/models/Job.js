import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, enum: ['remote', 'hybrid', 'office'], required: true },
  salary: { type: Number, required: true },

  skills: [{ type: String, required: true }],

  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  applicants: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      appliedAt: { type: Date, default: Date.now },
      status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
      }
    }
  ]
}, { timestamps: true });

export default mongoose.models.Job || mongoose.model('Job', JobSchema);
