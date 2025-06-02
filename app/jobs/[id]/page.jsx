'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
  import { Building2, MapPin, Clock, IndianRupee, User, Mail, Calendar, CheckCircle, XCircle, Clock as ClockIcon, Send, Users, Award, Briefcase } from 'lucide-react'

export default function JobDetailPage() {



  const { id } = useParams();
  const router = useRouter();

  const [job, setJob] = useState(null);
  const [similarJobs, setSimilarJobs] = useState([]);
  const [role, setRole] = useState(null);
  const [userSkills, setUserSkills] = useState([]);
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState('');
  const [loadingApplications, setLoadingApplications] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const role = localStorage.getItem('role');
      setRole(role);

      // Fetch job details
      const res = await fetch(`/api/jobs/${id}`);
      const data = await res.json();
      setJob(data.job);

      // Fetch all jobs for similar jobs
      const allRes = await fetch('/api/jobs');
      const allJobs = await allRes.json();

      // For employees: fetch profile skills and filter similar jobs
      if (role === 'employee') {
        const profRes = await fetch('/api/user/profile', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        const profData = await profRes.json();
        const skills = profData.user?.profile?.skills || [];
        setUserSkills(skills);

        const similar = allJobs.jobs.filter(
          (j) =>
            j._id !== id &&
            j.skills &&
            j.skills.filter((skill) => skills.includes(skill)).length >= 2
        );
        setSimilarJobs(similar);
      }

      // For employer: fetch applications for this job
      if (role === 'employer') {
        fetchApplications();
      }
    };

    fetchData();
  }, [id]);

  // Fetch applications for employer
  const fetchApplications = async () => {
    setLoadingApplications(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/jobs/${id}/applications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Failed to fetch applications');

      setApplications(data.applications || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingApplications(false);
    }
  };

  // Handle employee apply action
  const handleApply = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/jobs/${id}/apply`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Error applying');
      alert('Applied successfully!');
    } catch (err) {
      alert(err.message);
    }
  };

  // Employer approves or rejects application
  const handleUpdateApplicationStatus = async (applicationId, status) => {
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/jobs/${id}/applications`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ applicationId, status }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update application status');
      fetchApplications();
    } catch (err) {
      setError(err.message);
    }
  };

  if (!job) return <div className="p-4">Loading...</div>;

  return (
   // Import statement for Lucide icons:

<div className="max-w-6xl mx-auto px-4 py-10">
      {/* Job Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 mb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5"></div>
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
            <div className="flex-1">
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-blue-800 to-indigo-800 bg-clip-text mb-2">
                    {job.title}
                  </h1>
                  <div className="flex items-center space-x-3 text-gray-600">
                    <p className="text-xl font-semibold">{job.company}</p>
                    {job.location && (
                      <>
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{job.location}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col space-y-3">
              <div className="flex items-center space-x-2 text-green-600">
                <IndianRupee className="w-6 h-6" />
                <span className="text-2xl font-bold">₹{job.salary?.toLocaleString()}</span>
              </div>
              <span className={`text-sm px-4 py-2 rounded-full font-medium capitalize ${
                job.type === 'full-time' ? 'bg-green-100 text-green-700' :
                job.type === 'part-time' ? 'bg-blue-100 text-blue-700' :
                job.type === 'contract' ? 'bg-purple-100 text-purple-700' :
                job.type === 'internship' ? 'bg-orange-100 text-orange-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {job.type}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Job Description */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
              <Briefcase className="w-6 h-6 text-blue-600" />
              <span>Job Description</span>
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
                {job.description}
              </p>
            </div>
          </div>

          {/* Skills Required */}
          {job.skills && job.skills.length > 0 && (
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                <Award className="w-6 h-6 text-blue-600" />
                <span>Skills Required</span>
              </h3>
              <div className="flex flex-wrap gap-3">
                {job.skills.map((skill, index) => (
                  <span key={index} className="px-4 py-2 bg-blue-50 text-blue-700 rounded-xl font-medium border border-blue-200 hover:bg-blue-100 transition-colors duration-200">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Apply Button for Employees */}
          {role === 'employee' && (
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <button
                onClick={handleApply}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 rounded-xl hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>Apply Now</span>
              </button>
            </div>
          )}

          {/* Job Details Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h4 className="text-lg font-bold text-gray-900 mb-4">Job Details</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Job Type</span>
                <span className="font-medium capitalize">{job.type}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Salary</span>
                <span className="font-medium text-green-600">₹{job.salary?.toLocaleString()}</span>
              </div>
              {job.experience && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Experience</span>
                  <span className="font-medium">{job.experience}</span>
                </div>
              )}
              {job.postedDate && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Posted</span>
                  <span className="font-medium">2 days ago</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Employer's Application Management Section */}
      {role === 'employer' && (
        <div className="mt-12">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                <Users className="w-6 h-6 text-blue-600" />
                <span>Applications</span>
                {applications.length > 0 && (
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                    {applications.length}
                  </span>
                )}
              </h2>
            </div>

            <div className="p-6">
              {loadingApplications && (
                <div className="text-center py-8">
                  <ClockIcon className="w-8 h-8 text-gray-400 mx-auto mb-2 animate-spin" />
                  <p className="text-gray-500">Loading applications...</p>
                </div>
              )}
              
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
                  <p className="text-red-600 font-medium">{error}</p>
                </div>
              )}
              
              {!loadingApplications && applications.length === 0 && (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-xl text-gray-500 mb-2">No applications yet</p>
                  <p className="text-gray-400">Applications will appear here once candidates start applying</p>
                </div>
              )}

              <div className="space-y-6">
                {applications.map(({ _id: applicationId, status, appliedAt, user }) => (
                  <div key={applicationId} className="bg-gray-50 border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow duration-300">
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-500 rounded-xl flex items-center justify-center">
                            <User className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{user.name}</h3>
                            <div className="space-y-2 text-sm text-gray-600">
                              <div className="flex items-center space-x-2">
                                <Mail className="w-4 h-4" />
                                <span>{user.email}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Calendar className="w-4 h-4" />
                                <span>Applied on {new Date(appliedAt).toLocaleDateString()}</span>
                              </div>
                            </div>
                            {user.skills && user.skills.length > 0 && (
                              <div className="mt-3">
                                <p className="text-sm text-gray-600 mb-2">Skills:</p>
                                <div className="flex flex-wrap gap-2">
                                  {user.skills.map((skill, index) => (
                                    <span key={index} className="px-2 py-1 bg-white text-gray-700 rounded-lg text-xs border">
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end space-y-3">
                        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-semibold ${
                          status === 'approved'
                            ? 'bg-green-100 text-green-700'
                            : status === 'rejected'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {status === 'approved' && <CheckCircle className="w-4 h-4" />}
                          {status === 'rejected' && <XCircle className="w-4 h-4" />}
                          {status === 'pending' && <ClockIcon className="w-4 h-4" />}
                          <span className="capitalize">{status}</span>
                        </div>

                        {status === 'pending' && (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleUpdateApplicationStatus(applicationId, 'approved')}
                              className="flex items-center space-x-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm font-medium"
                            >
                              <CheckCircle className="w-4 h-4" />
                              <span>Approve</span>
                            </button>
                            <button
                              onClick={() => handleUpdateApplicationStatus(applicationId, 'rejected')}
                              className="flex items-center space-x-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm font-medium"
                            >
                              <XCircle className="w-4 h-4" />
                              <span>Reject</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Similar Jobs for Employee */}
      {role === 'employee' && similarJobs.length > 0 && (
        <div className="mt-12">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                <Briefcase className="w-6 h-6 text-blue-600" />
                <span>Similar Jobs</span>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                  {similarJobs.length}
                </span>
              </h2>
            </div>

            <div className="p-6">
              <div className="grid gap-6">
                {similarJobs.map((similar) => (
                  <div
                    key={similar._id}
                    className="bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-2xl p-6 hover:shadow-md hover:border-blue-300 transition-all duration-300 cursor-pointer group"
                    onClick={() => router.push(`/jobs/${similar._id}`)}
                  >
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
                            <Building2 className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-transparent bg-gradient-to-r from-blue-800 to-indigo-800 bg-clip-text mb-2 group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-300">
                              {similar.title}
                            </h3>
                            <div className="flex items-center space-x-3 text-gray-600 mb-3">
                              <p className="text-lg font-semibold">{similar.company}</p>
                              {similar.location && (
                                <>
                                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                                  <div className="flex items-center space-x-1">
                                    <MapPin className="w-4 h-4" />
                                    <span>{similar.location}</span>
                                  </div>
                                </>
                              )}
                            </div>
                            {similar.skills && similar.skills.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-3">
                                {similar.skills.slice(0, 3).map((skill, index) => (
                                  <span key={index} className="px-2 py-1 bg-white text-gray-700 rounded-lg text-xs border border-gray-300">
                                    {skill}
                                  </span>
                                ))}
                                {similar.skills.length > 3 && (
                                  <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded-lg text-xs border border-gray-300">
                                    +{similar.skills.length - 3} more
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end space-y-3">
                        <div className="flex items-center space-x-2 text-green-600">
                          <IndianRupee className="w-5 h-5" />
                          <span className="text-xl font-bold">₹{similar.salary?.toLocaleString()}</span>
                        </div>
                        {similar.type && (
                          <span className={`text-sm px-3 py-1 rounded-full font-medium capitalize ${
                            similar.type === 'full-time' ? 'bg-green-100 text-green-700' :
                            similar.type === 'part-time' ? 'bg-blue-100 text-blue-700' :
                            similar.type === 'contract' ? 'bg-purple-100 text-purple-700' :
                            similar.type === 'internship' ? 'bg-orange-100 text-orange-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {similar.type}
                          </span>
                        )}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="text-sm text-blue-600 font-medium flex items-center space-x-1">
                            <span>View Details</span>
                            <Send className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
