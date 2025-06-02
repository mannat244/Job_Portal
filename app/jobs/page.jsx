'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Briefcase, Home, User, Plus, Star, Search, Filter } from 'lucide-react'
import { Building2, MapPin, Clock, ArrowRight, IndianRupee, Calendar } from 'lucide-react'

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [role, setRole] = useState(null);
  const [userSkills, setUserSkills] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');


  useEffect(() => {
    const userRole = localStorage.getItem('role');
    setRole(userRole);
    fetchJobs();
    const token = localStorage.getItem('token');

    if (userRole === 'employer') {
      // Fetch only jobs posted by this employer
      fetch('/api/jobs?postedBy=me', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => setJobs(data.jobs || []));
    } else {
      // Employee or guest fetch all jobs
      fetch('/api/jobs')
        .then(res => res.json())
        .then(data => setJobs(data.jobs || []));
    }

    if (userRole === 'employee') {
      fetch('/api/user/profile', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          if (data.user?.profile?.skills) {
            setUserSkills(data.user.profile.skills);
          }
        });
    }
  }, []);

  useEffect(() => {
    if (userSkills.length > 0 && jobs.length > 0) {
      const recommended = jobs.filter(job => {
        if (!job.skills || job.skills.length === 0) return false;
        const matchCount = job.skills.filter(skill => userSkills.includes(skill)).length;
        return matchCount >= 2;
      });
      setRecommendedJobs(recommended);
    }
  }, [userSkills, jobs]);


  const fetchJobs = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const params = new URLSearchParams();
  if (role === 'employer') params.append('postedBy', 'me');
  if (searchQuery.trim()) params.append('search', searchQuery.trim());

  fetch(`/api/jobs?${params.toString()}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  })
    .then(res => res.json())
    .then(data => setJobs(data.jobs || []));
};


  return (

<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navbar */}
      <header className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white p-4 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="max-w-6xl mx-auto flex justify-between items-center relative z-10">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              JobLinkIndia
            </h1>
          </div>
          <nav className="flex space-x-1 text-sm">
            <Link href="/" className="flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 hover:scale-105 backdrop-blur-sm">
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            {!role && <Link href="/login" className="px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 hover:scale-105 backdrop-blur-sm">Login</Link>}
            {!role && <Link href="/signup" className="px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 hover:scale-105 backdrop-blur-sm">Sign Up</Link>}
            {role === 'employer' && (
              <Link href="/jobs/post" className="flex items-center space-x-1 px-3 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/20">
                <Plus className="w-4 h-4" />
                <span>Post a Job</span>
              </Link>
            )}
            {role === 'employee' && (
              <Link href="/profile" className="flex items-center space-x-1 px-3 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/20">
                <User className="w-4 h-4" />
                <span>My Profile</span>
              </Link>
            )}
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10">
        {/* Search and Filter Bar */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-lg border border-white/50">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
  type="text" 
  placeholder="Search jobs, companies, or keywords..." 
  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === 'Enter') fetchJobs();
  }}
/>

            </div>
           <button
  onClick={fetchJobs}
  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300"
>
  <Search className="w-4 h-4" />
  <span>Search</span>
</button>

          </div>
        </div>

        {role === 'employee' && recommendedJobs.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
                Recommended For You
              </h2>
            </div>
            <div className="grid gap-6 mb-8">
              {recommendedJobs.map(job => (
                <Link key={job._id} href={`/jobs/${job._id}`} className="group">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6 hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-gradient-to-l from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-bl-xl text-sm font-medium">
                      <Star className="w-4 h-4 inline mr-1" />
                      Recommended
                    </div>
                    <JobCard job={job} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center space-x-3 mb-6">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
            {role === 'employer' ? 'Jobs You Posted' : 'Available Jobs'}
          </h2>
          {role === 'employer' && (
            <div className="ml-auto">
              <Link href="/jobs/post" className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-sm">
                <Plus className="w-4 h-4" />
                <span>Post New Job</span>
              </Link>
            </div>
          )}
        </div>

        <div className="grid gap-6">
          {jobs.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <p className="text-xl text-gray-500 mb-2">No jobs found</p>
              <p className="text-gray-400">Try adjusting your search criteria or check back later</p>
            </div>
          )}
          {jobs.map(job => (
            <Link key={job._id} href={`/jobs/${job._id}`} className="group">
              <div className="bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 hover:shadow-xl hover:bg-white/90 transform hover:scale-[1.01] transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <JobCard job={job} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Job Stats */}
        {jobs.length > 0 && (
          <div className="mt-12 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 rounded-2xl p-8 text-white">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="space-y-2">
                <div className="text-2xl font-bold">{jobs.length}</div>
                <div className="text-blue-200 text-sm">Total Jobs</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold">24h</div>
                <div className="text-blue-200 text-sm">Avg Response</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold">95%</div>
                <div className="text-blue-200 text-sm">Match Rate</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold">500+</div>
                <div className="text-blue-200 text-sm">Companies</div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function JobCard({ job }) {
  return (
    // Import statement for Lucide icons:
// import { Building2, MapPin, Clock, ArrowRight, IndianRupee, Calendar } from 'lucide-react'

<div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 hover:border-blue-200 transition-all duration-300 cursor-pointer group relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-start space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:shadow-lg transition-shadow duration-300">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-800 transition-colors duration-300 line-clamp-1">
                  {job.title}
                </h3>
                <div className="flex items-center space-x-2 mt-1">
                  <p className="text-gray-600 font-medium">{job.company}</p>
                  {job.location && (
                    <>
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                      <div className="flex items-center space-x-1 text-gray-500">
                        <MapPin className="w-3 h-3" />
                        <span className="text-sm">{job.location}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end space-y-2 ml-4">
            <span className={`text-xs px-3 py-1 rounded-full font-medium capitalize ${
              job.type === 'full-time' ? 'bg-green-100 text-green-700' :
              job.type === 'part-time' ? 'bg-blue-100 text-blue-700' :
              job.type === 'contract' ? 'bg-purple-100 text-purple-700' :
              job.type === 'internship' ? 'bg-orange-100 text-orange-700' :
              'bg-gray-100 text-gray-700'
            }`}>
              {job.type}
            </span>
            {job.postedDate && (
              <div className="flex items-center space-x-1 text-gray-400 text-xs">
                <Calendar className="w-3 h-3" />
                <span>2 days ago</span>
              </div>
            )}
          </div>
        </div>

        <p className="text-gray-600 mt-4 line-clamp-2 leading-relaxed">
          {job.description}
        </p>

        {/* Skills or Requirements */}
        {job.skills && job.skills.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {job.skills.slice(0, 3).map((skill, index) => (
              <span key={index} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-md">
                {skill}
              </span>
            ))}
            {job.skills.length > 3 && (
              <span className="text-xs px-2 py-1 bg-gray-100 text-gray-500 rounded-md">
                +{job.skills.length - 3} more
              </span>
            )}
          </div>
        )}

        <div className="mt-6 flex justify-between items-center">
          <div className="flex items-center space-x-1">
            <IndianRupee className="w-5 h-5 text-green-600" />
            <p className="font-bold text-green-600 text-lg">
              {job.salary ? job.salary.toLocaleString() : 'Not disclosed'}
            </p>
            {job.salaryType && (
              <span className="text-sm text-gray-500">/ {job.salaryType}</span>
            )}
          </div>
          
          <div className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold text-sm group-hover:translate-x-1 transition-transform duration-300">
            <span>View Details</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {/* Urgency indicator */}
        {job.urgent && (
          <div className="absolute top-4 right-4 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>Urgent</span>
          </div>
        )}
      </div>
    </div>
  );
}
