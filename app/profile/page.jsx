'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Mail, Phone, Award, Briefcase, GraduationCap, FileText, Edit3, Save, X, Upload, Zap, CheckCircle, XCircle, Clock, Building2, IndianRupee } from 'lucide-react'


const defaultProfile = {
  name: '',
  phone: '',
  resume: '',
  skills: '',
  experience: '',
  education: '',
};

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState(defaultProfile);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [autofillLoading, setAutofillLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) return router.push('/login');

      try {
        const res = await fetch('/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 401) return router.push('/login');

        const data = await res.json();
        const user = data?.user ?? {};

        setProfile({
          name: user?.profile?.name ?? '',
          phone: user?.profile?.phone ?? '',
          resume: user?.resume ?? '',
          skills: Array.isArray(user?.profile?.skills)
            ? user.profile.skills.join(', ')
            : user?.profile?.skills ?? '',
          experience: user?.profile?.experience ?? '',
          education: user?.profile?.education ?? '',
        });

        setEmail(user?.email ?? '');

        // Fetch applied jobs
        const jobRes = await fetch('/api/user/applied-jobs', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const jobData = await jobRes.json();
        setAppliedJobs(jobData.jobs || []);
      } catch (err) {
        console.error(err);
        setErrorMsg('Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleAutofill = async () => {
    if (!profile.resume) {
      alert('Please paste your resume URL first.');
      return;
    }

    setAutofillLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/parse-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeUrl: profile.resume }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Auto-fill failed');

      setProfile((prev) => ({
        ...prev,
        ...data.profile,
        skills: Array.isArray(data.profile?.skills)
          ? data.profile.skills.join(', ')
          : data.profile?.skills || '',
      }));
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message);
    } finally {
      setAutofillLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login first');
      return router.push('/login');
    }

    try {
      const res = await fetch('/api/user/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...profile,
          skills: typeof profile.skills === 'string'
            ? profile.skills.split(',').map((s) => s.trim()).filter(Boolean)
            : [],
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update profile');
      alert('Profile saved successfully!');
      setEditMode(false);
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600">Loading your profile…</p>
      </div>
    );
  }

  return (
    // Import statement for Lucide icons:
// import { User, Mail, Phone, Award, Briefcase, GraduationCap, FileText, Edit3, Save, X, Upload, Zap, CheckCircle, XCircle, Clock, Building2, IndianRupee } from 'lucide-react'

<div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-10">
  <div className="max-w-4xl mx-auto">
    {/* Profile Header */}
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 mb-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5"></div>
      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <User className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-blue-800 to-indigo-800 bg-clip-text mb-2">
                My Profile
              </h1>
              <p className="text-gray-600 text-lg">Manage your professional information</p>
            </div>
          </div>
          <button
            onClick={() => setEditMode(!editMode)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              editMode 
                ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
            }`}
          >
            {editMode ? <X className="w-5 h-5" /> : <Edit3 className="w-5 h-5" />}
            <span>{editMode ? 'Cancel Edit' : 'Edit Profile'}</span>
          </button>
        </div>
      </div>
    </div>

    {/* Error Message */}
    {errorMsg && (
      <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
        <p className="text-red-600 font-medium">{errorMsg}</p>
      </div>
    )}

    {/* Profile Content */}
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {!editMode ? (
        /* View Mode */
        <div className="p-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
                  <User className="w-5 h-5 text-blue-600" />
                  <span>Basic Information</span>
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium">{profile.name || 'Not provided'}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">{email || 'Not provided'}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">Phone:</span>
                    <span className="font-medium">{profile.phone || 'Not provided'}</span>
                  </div>
                </div>
              </div>

              {/* Professional Info */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                  <span>Professional Details</span>
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Briefcase className="w-4 h-4 text-gray-400 mt-1" />
                    <div>
                      <span className="text-gray-600 block">Experience:</span>
                      <span className="font-medium">{profile.experience || 'Not specified'}</span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <GraduationCap className="w-4 h-4 text-gray-400 mt-1" />
                    <div>
                      <span className="text-gray-600 block">Education:</span>
                      <span className="font-medium">{profile.education || 'Not provided'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills and Resume */}
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
                  <Award className="w-5 h-5 text-blue-600" />
                  <span>Skills</span>
                </h3>
                {profile.skills ? (
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.split(',').map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg font-medium border border-blue-200">
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No skills added yet</p>
                )}
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <span>Resume</span>
                </h3>
                {profile.resume ? (
                  <a 
                    href={profile.resume} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 inline-flex"
                  >
                    <FileText className="w-4 h-4" />
                    <span>View Resume</span>
                  </a>
                ) : (
                  <p className="text-gray-500">No resume uploaded</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Edit Mode */
        <div className="p-8">
          {/* Resume Upload Section */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
              <Upload className="w-5 h-5 text-green-600" />
              <span>Resume Auto-Fill</span>
            </h3>
            <div className="space-y-4">
              <input
                type="url"
                name="resume"
                value={profile.resume}
                onChange={handleChange}
                placeholder="Paste Resume PDF URL"
                className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              />
              <button
                type="button"
                onClick={handleAutofill}
                disabled={autofillLoading}
                className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Zap className="w-5 h-5" />
                <span>{autofillLoading ? 'Auto-Filling…' : 'Auto-Fill from Resume'}</span>
              </button>
            </div>
          </div>

          {/* Edit Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                    <User className="w-4 h-4 text-blue-600" />
                    <span>Full Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                    <Mail className="w-4 h-4 text-blue-600" />
                    <span>Email Address</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    disabled
                    className="w-full border border-gray-300 px-4 py-3 rounded-xl bg-gray-100 text-gray-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                    <Phone className="w-4 h-4 text-blue-600" />
                    <span>Phone Number</span>
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                    <Award className="w-4 h-4 text-blue-600" />
                    <span>Skills</span>
                  </label>
                  <input
                    type="text"
                    name="skills"
                    value={profile.skills}
                    onChange={handleChange}
                    placeholder="e.g. React, Node.js, Python"
                    className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                  />
                  <p className="text-xs text-gray-500">Separate skills with commas</p>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                    <Briefcase className="w-4 h-4 text-blue-600" />
                    <span>Experience Level</span>
                  </label>
                  <select
                    name="experience"
                    value={profile.experience}
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                  >
                    <option value="">Select Experience Level</option>
                    <option value="fresher">🎓 Fresher</option>
                    <option value="junior">💼 1-3 Years</option>
                    <option value="mid">🚀 3-5 Years</option>
                    <option value="senior">⭐ Senior (5+ Years)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                    <GraduationCap className="w-4 h-4 text-blue-600" />
                    <span>Education</span>
                  </label>
                  <input
                    type="text"
                    name="education"
                    value={profile.education}
                    onChange={handleChange}
                    placeholder="e.g. B.Tech Computer Science"
                    className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                  />
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 rounded-xl hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Save className="w-5 h-5" />
                <span>Save Profile</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>

    {/* Applied Jobs Section */}
    <div className="mt-8">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
            <Briefcase className="w-6 h-6 text-blue-600" />
            <span>Jobs You've Applied For</span>
            {appliedJobs.length > 0 && (
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                {appliedJobs.length}
              </span>
            )}
          </h2>
        </div>

        <div className="p-6">
          {appliedJobs.length === 0 ? (
            <div className="text-center py-12">
              <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-xl text-gray-500 mb-2">No applications yet</p>
              <p className="text-gray-400">Start applying to jobs to see them here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {appliedJobs.map((job) => (
                <div key={job._id} className="bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-all duration-300">
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                          <Building2 className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-transparent bg-gradient-to-r from-blue-800 to-indigo-800 bg-clip-text mb-2">
                            {job.title || 'Untitled Job'}
                          </h3>
                          <p className="text-lg font-semibold text-gray-600 mb-2">{job.company || 'Unknown Company'}</p>
                          <div className="flex items-center space-x-2 text-green-600">
                            <IndianRupee className="w-4 h-4" />
                            <span className="font-bold">₹{job.salary?.toLocaleString() || 'N/A'}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-semibold ${
                        job.status === 'approved'
                          ? 'bg-green-100 text-green-700'
                          : job.status === 'rejected'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {job.status === 'approved' && <CheckCircle className="w-4 h-4" />}
                        {job.status === 'rejected' && <XCircle className="w-4 h-4" />}
                        {(job.status === 'pending' || !job.status) && <Clock className="w-4 h-4" />}
                        <span className="capitalize">{job.status || 'pending'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
</div>
  );
}
