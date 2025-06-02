'use client';
import React from 'react';
import Link from 'next/link';
import { Search, Users, TrendingUp, ArrowRight, Briefcase, Building2, Award, Zap, Globe, Star, CheckCircle } from 'lucide-react'

export default function HomePage() {
  return (
  // Import statement for Lucide icons:
// import { Search, Users, TrendingUp, ArrowRight, Briefcase, Target } from 'lucide-react'


<main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col">
      <header className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white p-6 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:justify-between items-center relative z-10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              JobLinkIndia
            </h1>
          </div>
          <nav className="mt-4 md:mt-0 flex space-x-1">
            <Link href="/login" className="px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 hover:scale-105 backdrop-blur-sm">
              Login
            </Link>
            <Link href="/signup" className="px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 hover:scale-105 backdrop-blur-sm">
              Sign Up
            </Link>
            <Link href="/jobs" className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/20">
              Jobs
            </Link>
          </nav>
        </div>
      </header>

      <section className="flex-grow flex flex-col justify-center items-center text-center px-6 py-20 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -left-4 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-indigo-400/10 rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        <div className="relative z-10 space-y-8 max-w-6xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium animate-fade-in">
            <TrendingUp className="w-4 h-4" />
            <span>India&apos;s Fastest Growing Job Platform</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-extrabold text-transparent bg-gradient-to-r from-blue-800 via-indigo-700 to-purple-700 bg-clip-text mb-6 leading-tight animate-fade-in">
            Bridging Talent with Opportunity
          </h2>
          
          <p className="text-xl md:text-2xl font-medium text-gray-600 mb-12 max-w-4xl mx-auto animate-fade-in">
            Your Gateway to India&apos;s Best Jobs!
            <br />
            <span className="text-lg text-gray-500">Connect with top employers and unlock your career potential</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
            <Link
              href="/jobs"
              className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <Search className="w-5 h-5 relative z-10" />
              <span className="relative z-10">Explore Jobs</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>50K+ Active Users</span>
              </div>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <div className="flex items-center space-x-1">
                <Briefcase className="w-4 h-4" />
                <span>10K+ Jobs Posted</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Companies Section */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Leading Companies</h3>
            <p className="text-gray-600 text-lg">Join thousands of companies that trust JobLinkIndia for their hiring needs</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
            <div className="flex items-center justify-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300 group">
              <Building2 className="w-12 h-12 text-gray-400 group-hover:text-blue-600 transition-colors duration-300" />
            </div>
            <div className="flex items-center justify-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300 group">
              <Globe className="w-12 h-12 text-gray-400 group-hover:text-indigo-600 transition-colors duration-300" />
            </div>
            <div className="flex items-center justify-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300 group">
              <Zap className="w-12 h-12 text-gray-400 group-hover:text-purple-600 transition-colors duration-300" />
            </div>
            <div className="flex items-center justify-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300 group">
              <Award className="w-12 h-12 text-gray-400 group-hover:text-green-600 transition-colors duration-300" />
            </div>
            <div className="flex items-center justify-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300 group">
              <Star className="w-12 h-12 text-gray-400 group-hover:text-yellow-600 transition-colors duration-300" />
            </div>
            <div className="flex items-center justify-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300 group">
              <CheckCircle className="w-12 h-12 text-gray-400 group-hover:text-blue-600 transition-colors duration-300" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Why Choose JobLinkIndia?</h3>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Discover what makes us the preferred choice for job seekers and employers across India</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">Smart Job Matching</h4>
              <p className="text-gray-600 leading-relaxed">Advanced algorithms match you with the perfect opportunities based on your skills, experience, and preferences.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">Vast Network</h4>
              <p className="text-gray-600 leading-relaxed">Connect with over 50,000 professionals and thousands of companies across all industries in India.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">Career Growth</h4>
              <p className="text-gray-600 leading-relaxed">Access resources, insights, and opportunities that accelerate your professional development and career advancement.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 py-16 px-6 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold">50K+</div>
              <div className="text-blue-200">Active Users</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold">10K+</div>
              <div className="text-blue-200">Jobs Posted</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold">500+</div>
              <div className="text-blue-200">Partner Companies</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold">95%</div>
              <div className="text-blue-200">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">Ready to Find Your Dream Job?</h3>
          <p className="text-xl text-gray-600 mb-8">Join thousands of professionals who have transformed their careers with JobLinkIndia</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/jobs"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Search className="w-5 h-5" />
              <span>Browse Jobs</span>
            </Link>
            <Link
              href="/signup"
              className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-xl border-2 border-blue-600 hover:bg-blue-50 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Users className="w-5 h-5" />
              <span>Join Now</span>
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-gradient-to-r from-gray-100 to-gray-200 text-center text-gray-600 py-8 mt-auto border-t border-gray-300/50">
        <div className="max-w-6xl mx-auto">
          <p className="font-medium">
            &copy; {new Date().getFullYear()} JobLinkIndia. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Empowering careers across India
          </p>
        </div>
      </footer>
    </main>
  );
}
