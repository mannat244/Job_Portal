'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Building2, FileText, IndianRupee, MapPin, Award, Briefcase, Send, Plus } from 'lucide-react'

export default function PostJobPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: '',
    company: '',
    description: '',
    type: 'remote',
    salary: '',
    skills: '', // new field as comma-separated string
  });
  const [error, setError] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    const userRole = localStorage.getItem('role');
    if (userRole !== 'employer') {
      router.push('/login'); // block unauthorized users
    } else {
      setRole(userRole);
    }
  }, [router]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePost = async (e) => {
    e.preventDefault();
    setError('');

    // Convert skills string to array
    const skillsArray = form.skills
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    if (skillsArray.length === 0) {
      setError('Please enter at least one skill');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          salary: Number(form.salary),
          skills: skillsArray,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      router.push('/jobs');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    // Import statement for Lucide icons:
// import { Building2, FileText, IndianRupee, MapPin, Award, Briefcase, Send, Plus } from 'lucide-react'

<div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-10 px-4">
  <div className="max-w-2xl mx-auto">
    {/* Header Card */}
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 mb-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5"></div>
      <div className="relative z-10 text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-4">
          <Plus className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-blue-800 to-indigo-800 bg-clip-text mb-2">
          Post a Job
        </h1>
        <p className="text-gray-600 text-lg">Find the perfect candidate for your team</p>
      </div>
    </div>

    {/* Main Form Card */}
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="p-8">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        )}

        <form onSubmit={handlePost} className="space-y-6">
          {/* Job Title */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
              <Briefcase className="w-4 h-4 text-blue-600" />
              <span>Job Title</span>
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Senior Software Engineer"
              className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
              required
            />
          </div>

          {/* Company Name */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
              <Building2 className="w-4 h-4 text-blue-600" />
              <span>Company Name</span>
            </label>
            <input
              type="text"
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="e.g. TechCorp Solutions"
              className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
              required
            />
          </div>

          {/* Job Description */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
              <FileText className="w-4 h-4 text-blue-600" />
              <span>Job Description</span>
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe the role, responsibilities, and requirements..."
              rows={6}
              className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white resize-none"
              required
            />
          </div>

          {/* Job Type and Salary Row */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Job Type */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>Work Type</span>
              </label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
              >
                <option value="remote">🏠 Remote</option>
                <option value="hybrid">🏢 Hybrid</option>
                <option value="office">🏬 Office</option>
              </select>
            </div>

            {/* Salary */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                <IndianRupee className="w-4 h-4 text-blue-600" />
                <span>Salary (₹)</span>
              </label>
              <input
                type="number"
                name="salary"
                value={form.salary}
                onChange={handleChange}
                placeholder="e.g. 800000"
                className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                required
              />
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
              <Award className="w-4 h-4 text-blue-600" />
              <span>Required Skills</span>
            </label>
            <input
              type="text"
              name="skills"
              value={form.skills}
              onChange={handleChange}
              placeholder="e.g. React, Node.js, MongoDB, JavaScript"
              className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Separate skills with commas</p>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 rounded-xl hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Send className="w-5 h-5" />
              <span>Post Job</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    {/* Footer Info */}
    <div className="text-center mt-8">
      <p className="text-gray-500 text-sm">
        Your job posting will be reviewed and published within 24 hours
      </p>
    </div>
  </div>
</div>
  );
}
