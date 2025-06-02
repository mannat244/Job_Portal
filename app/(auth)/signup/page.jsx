'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserPlus, Mail, Lock, Users, AlertCircle, CheckCircle, Loader2 } from 'lucide-react'


export default function Signup() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '', role: 'employee' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        setSuccess('Registration successful! Redirecting to login...');
        setTimeout(() => router.push('/login'), 2000);
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      setError('Failed to register. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4">
  <div className="max-w-md w-full bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
    {/* Header Section */}
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5"></div>
      <div className="relative z-10 text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-4">
          <UserPlus className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-800 to-indigo-800 bg-clip-text mb-2">
          JobLinkIndia
        </h1>
        <p className="text-gray-600">Join our community and start your career journey</p>
      </div>
    </div>

    {/* Form Section */}
    <div className="p-8">
      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <p className="text-red-600 font-medium">{error}</p>
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center space-x-3">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
          <p className="text-green-700 font-medium">{success}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="email" className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
            <Mail className="w-4 h-4 text-blue-600" />
            <span>Email Address</span>
          </label>
          <input
            id="email"
            type="email"
            required
            placeholder="you@example.com"
            className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
            <Lock className="w-4 h-4 text-blue-600" />
            <span>Password</span>
          </label>
          <input
            id="password"
            type="password"
            required
            placeholder="Create a secure password"
            className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
            value={form.password}
            onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="role" className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
            <Users className="w-4 h-4 text-blue-600" />
            <span>Account Type</span>
          </label>
          <select
            id="role"
            className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
            value={form.role}
            onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
            disabled={loading}
          >
            <option value="employee">🎓 Employee - Looking for jobs</option>
            <option value="employer">🏢 Employer - Hiring talent</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 rounded-xl hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Creating Account...</span>
            </>
          ) : (
            <>
              <UserPlus className="w-5 h-5" />
              <span>Create Account</span>
            </>
          )}
        </button>
      </form>
    </div>
  </div>
</div>

// Import statement for Lucide icons:
  );
}
