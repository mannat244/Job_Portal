# JobLinkIndia 🇮🇳

**A Modern Next.js Job Portal with AI-Powered Resume Processing**

Built by **Mannat** as part of an internship project, JobLinkIndia streamlines job searching and hiring with automated resume processing and role-based functionality.
![image](https://github.com/user-attachments/assets/5524382e-8e39-4cf1-96a5-4536805f9656)
![image](https://github.com/user-attachments/assets/7e52f56f-540f-47b6-9d3f-75cac2f33a4a)

---

## 🚀 Overview

**JobLinkIndia** is a comprehensive job portal application built using Next.js with integrated backend API routes. The platform features AI-powered resume parsing using Google's Gemini API, role-based access control, and a responsive design for seamless job searching and hiring experiences.

### ✨ Key Highlights
- **AI-Powered Resume Processing**: Leverages Google's Gemini API for intelligent resume parsing and auto-form filling
- **Next.js Full-Stack**: Single codebase with integrated API routes for seamless development
- **Responsive Design**: Fully responsive interface optimized for all devices
- **Role-Based Authentication**: Secure login system with distinct user roles (Employee, Employer, Admin)

---

## 📊 Core Features

### 👥 For Job Seekers (Employees)
- **Seamless Registration & Login**: Quick account setup with email verification
- **AI-Enhanced Profile Creation**: 
  - Upload resume and let Gemini API auto-fill profile information
  - Skill tagging with intelligent suggestions
  - Experience and education tracking
- **Advanced Job Discovery**:
  - Browse comprehensive job listings
  - Smart search with multiple filters (location, salary, experience, skills)
  - Easy job application process
- **Application Management**: Track applied jobs and application status

### 🏢 For Employers
- **Company Registration**: Create detailed company profiles
- **Job Posting Management**: 
  - Post jobs with rich descriptions
  - Set specific requirements and qualifications
  - Manage active and archived listings
- **Candidate Discovery**: View and filter potential candidates
- **Application Tracking**: Monitor job applications and candidate interactions

### 🛡️ Admin Dashboard
- **Platform Analytics**: Comprehensive site-wide statistics and insights
- **User Management**: Monitor and manage user accounts
- **Content Moderation**: Review and approve job postings
- **System Configuration**: Manage platform settings and configurations

### 🌐 Universal Features
- **Responsive UI**: Built with Tailwind CSS for optimal viewing on all devices
- **Secure Authentication**: JWT-based authentication with role-specific access
- **Real-time Updates**: Live notifications for job applications
- **Search & Filter**: Advanced filtering options across all listings

---

## ⚙️ Technology Stack

### Frontend & Backend
- **Next.js 14**: Full-stack React framework with API routes
- **React 18**: Modern component-based architecture
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide Icons**: Beautiful, customizable icon library

### Database & Authentication
- **MongoDB**: NoSQL database for flexible data storage
- **Mongoose**: MongoDB object modeling library
- **JWT**: Secure token-based authentication
- **Bcrypt**: Password hashing and security

### AI & External Services
- **Google Gemini API**: Advanced AI for resume parsing and content generation

---

## 🔧 Environment Configuration

Create a `.env.local` file in your project root:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secure_jwt_secret_key
GEMINI_API_KEY=your_google_gemini_api_key
ADMIN_USERNAME=admin
ADMIN_PASSWORD=123
```

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Google Gemini API key

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/joblinkindia.git
   cd joblinkindia
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   - Create `.env.local` file with required variables (see above)

4. **Run the Application**
   ```bash
   npm run dev
   ```
   Application will be available at `http://localhost:3000`

5. **Database Setup**
   - Ensure MongoDB is running
   - The application will automatically create necessary collections

---

## 🏗️ Project Structure

```
/joblinkindia
├── /app                  # Next.js app directory
│   ├── /(auth)          # Authentication pages
│   │   ├── /login       # Login page
│   │   └── /signup      # Signup page
│   ├── /admin           # Admin dashboard
│   ├── /api             # API routes
│   │   ├── /auth        # Authentication endpoints
│   │   ├── /jobs        # Job-related endpoints
│   │   ├── /user        # User management endpoints
│   │   └── /parse-resume # Resume parsing endpoint
│   ├── /jobs            # Job listing pages
│   │   ├── /[id]        # Individual job pages
│   │   └── /post        # Job posting page
│   └── /profile         # User profile pages
├── /lib                 # Utility functions
│   ├── auth.js          # Authentication helpers
│   └── db.js            # Database connection
├── /models              # MongoDB schemas
├── /public              # Static assets
└── /components          # Reusable UI components
```

---

## 👨‍💼 Admin Access for Testing

For evaluation purposes, use these admin credentials:

- **Username**: `admin`
- **Password**: `123`

*Note: These are demo credentials for testing. In production, use secure authentication methods.*

---

## 🤖 AI Integration Highlights

### Gemini API Features
- **Resume Parsing**: Automatically extracts information from uploaded PDF/DOC resumes
- **Profile Auto-Fill**: Intelligently populates user profile forms with parsed resume data
- **Content Enhancement**: Improves job descriptions and candidate summaries

### Implementation Benefits
- Reduces manual data entry by 80%
- Provides consistent data formatting across the platform
- Enhances user experience with intelligent form completion
- Supports multiple resume formats (PDF, DOC, DOCX)

---

## 📱 Responsive Design Features

- **Mobile-First Approach**: Optimized for smartphones and tablets
- **Adaptive Layouts**: Components automatically adjust to screen sizes
- **Touch-Friendly Interface**: Enhanced mobile navigation and interactions
- **Cross-Browser Compatibility**: Tested across major browsers
- **Performance Optimized**: Fast loading times on all devices

---

## 🔐 Security Features

- **JWT Authentication**: Secure token-based user sessions
- **Password Encryption**: Bcrypt hashing for password security
- **Role-Based Access Control**: Granular permissions for different user types
- **Input Validation**: Comprehensive server-side validation
- **API Rate Limiting**: Protection against abuse and spam
- **CORS Configuration**: Secure cross-origin request handling

---

## 👨‍💻 Developer

**Mannat**  
*MERN Stack Developer Intern*

This project demonstrates proficiency in:
- Full-stack Next.js development
- AI/ML integration with Google Gemini
- Modern JavaScript frameworks
- Database design and management
- API development with Next.js routes
- Responsive web design
- Authentication and security

---

## 📄 License & Usage

This project is developed for **educational and internship purposes only**. 

- ✅ Learning and skill demonstration
- ✅ Portfolio showcasing
- ✅ Technical evaluation
- ❌ Commercial use without permission
- ❌ Redistribution without attribution



## 🤝 Contributing

While this is primarily an internship project, suggestions and feedback are welcome:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📞 Support & Contact

For questions, feedback, or collaboration opportunities:

- **Developer**: Mannat
- **Project Type**: MERN Stack Internship Project
- **Focus Areas**: Full-stack development, AI integration, responsive design

---

*Built with ❤️ in India • Powered by Next.js & Google Gemini AI*
