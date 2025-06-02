'use client';

import React, { useEffect, useState } from 'react';

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState('');
  const [loginError, setLoginError] = useState('');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    if (loggedIn) fetchData();
  }, [loggedIn]);

  async function fetchData() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/admin/api/admin');
      if (!res.ok) throw new Error('Failed to fetch data');
      const data = await res.json();
      setUsers(data.users || []);
      setJobs(data.jobs || []);
      setApplications(data.applications || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(e) {
    e.preventDefault();
    setLoginError('');
    setLoading(true);
    try {
      const res = await fetch('/admin/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'login', username, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      setLoggedIn(true);
      setUsername('');
      setPassword('');
    } catch (err) {
      setLoginError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleAction(type, id, action) {
    setActionLoading(true);
    setError('');
    try {
      const res = await fetch('/admin/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, id, action }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Action failed');
      await fetchData();
      alert(data.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  }

  if (!loggedIn)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded shadow-md max-w-sm w-full"
        >
          <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">
            Admin Login
          </h1>
          {loginError && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-center">
              {loginError}
            </div>
          )}
          <label className="block mb-2 font-semibold">Username</label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="w-full mb-4 p-2 border border-gray-300 rounded"
            required
            disabled={loading}
            autoComplete="username"
          />
          <label className="block mb-2 font-semibold">Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full mb-6 p-2 border border-gray-300 rounded"
            required
            disabled={loading}
            autoComplete="current-password"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    );

  if (loading) return <p className="p-4">Loading admin data...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6 max-w-7xl mx-auto">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">Admin Moderation Panel</h1>
        <button
          onClick={() => setLoggedIn(false)}
          className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </header>
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      {/* Users Section */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Users</h2>
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2 text-left">Name</th>
                <th className="border border-gray-300 p-2 text-left">Email</th>
                <th className="border border-gray-300 p-2 text-left">Status</th>
                <th className="border border-gray-300 p-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map(({ _id, name, email, isBlocked }) => (
                <tr key={_id} className="odd:bg-white even:bg-gray-50">
                  <td className="border border-gray-300 p-2">{name || 'N/A'}</td>
                  <td className="border border-gray-300 p-2">{email || 'N/A'}</td>
                  <td className="border border-gray-300 p-2">
                    {isBlocked ? (
                      <span className="text-red-600 font-semibold">Blocked</span>
                    ) : (
                      <span className="text-green-600 font-semibold">Active</span>
                    )}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {isBlocked ? (
                      <button
                        disabled={actionLoading}
                        onClick={() => handleAction('user', _id, 'unblock')}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      >
                        Unblock
                      </button>
                    ) : (
                      <button
                        disabled={actionLoading}
                        onClick={() => handleAction('user', _id, 'block')}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Block
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Jobs Section */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Jobs</h2>
        {jobs.length === 0 ? (
          <p>No jobs found.</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2 text-left">Title</th>
                <th className="border border-gray-300 p-2 text-left">Company</th>
                <th className="border border-gray-300 p-2 text-left">Status</th>
                <th className="border border-gray-300 p-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map(({ _id, title, company, status }) => (
                <tr key={_id} className="odd:bg-white even:bg-gray-50">
                  <td className="border border-gray-300 p-2">{title || 'N/A'}</td>
                  <td className="border border-gray-300 p-2">{company || 'N/A'}</td>
                  <td className="border border-gray-300 p-2">
                    {status === 'approved' ? (
                      <span className="text-green-600 font-semibold">Approved</span>
                    ) : status === 'rejected' ? (
                      <span className="text-red-600 font-semibold">Rejected</span>
                    ) : (
                      <span className="text-yellow-600 font-semibold">Pending</span>
                    )}
                  </td>
                  <td className="border border-gray-300 p-2 space-x-2">
                    {status !== 'approved' && (
                      <button
                        disabled={actionLoading}
                        onClick={() => handleAction('job', _id, 'approved')}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      >
                        Approve
                      </button>
                    )}
                    {status !== 'rejected' && (
                      <button
                        disabled={actionLoading}
                        onClick={() => handleAction('job', _id, 'rejected')}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Reject
                      </button>
                    )}
                    <button
                      disabled={actionLoading}
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this job?')) {
                          handleAction('job', _id, 'delete');
                        }
                      }}
                      className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Applications Section */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Applications</h2>
        {applications.length === 0 ? (
          <p>No applications found.</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2 text-left">Job Title</th>
                <th className="border border-gray-300 p-2 text-left">Applicant ID</th>
                <th className="border border-gray-300 p-2 text-left">Status</th>
                <th className="border border-gray-300 p-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {applications.map(({ _id, jobTitle, userId, status }) => (
                <tr key={_id} className="odd:bg-white even:bg-gray-50">
                  <td className="border border-gray-300 p-2">{jobTitle || 'N/A'}</td>
                  <td className="border border-gray-300 p-2">{userId || 'N/A'}</td>
                  <td className="border border-gray-300 p-2">
                    {status === 'approved' ? (
                      <span className="text-green-600 font-semibold">Approved</span>
                    ) : status === 'rejected' ? (
                      <span className="text-red-600 font-semibold">Rejected</span>
                    ) : (
                      <span className="text-yellow-600 font-semibold">Pending</span>
                    )}
                  </td>
                  <td className="border border-gray-300 p-2 space-x-2">
                    {status !== 'approved' && (
                      <button
                        disabled={actionLoading}
                        onClick={() => handleAction('application', _id, 'approved')}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      >
                        Approve
                      </button>
                    )}
                    {status !== 'rejected' && (
                      <button
                        disabled={actionLoading}
                        onClick={() => handleAction('application', _id, 'rejected')}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Reject
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
