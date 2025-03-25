import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, BookOpen, CheckSquare, ArrowRight } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-black text-white">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold">FUSO</div>
          <div className="space-x-4">
            <Link to="/login" className="text-gray-300 hover:text-white">Login</Link>
            <Link to="/signup" className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-100">Sign Up</Link>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="bg-black text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Organize Your Academic Life</h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
            FUSO helps you manage your classes, assignments, and schedule in one beautiful, minimalist interface.
          </p>
          <Link 
            to="/signup" 
            className="inline-flex items-center bg-white text-black px-6 py-3 rounded-md text-lg font-medium hover:bg-gray-100"
          >
            Get Started <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Everything You Need</h2>
          
          <div className="grid md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="bg-black text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Calendar View</h3>
              <p className="text-gray-600">
                See all your tasks and assignments in a clean, intuitive calendar interface.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-black text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Subject Management</h3>
              <p className="text-gray-600">
                Organize tasks by subject with custom colors for easy visual recognition.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-black text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckSquare size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Task Tracking</h3>
              <p className="text-gray-600">
                Create, edit, and complete tasks with detailed descriptions and due dates.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Organized?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Join thousands of students who use FUSO to stay on top of their academic responsibilities.
          </p>
          <div className="space-x-4">
            <Link 
              to="/signup" 
              className="bg-black text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-gray-800"
            >
              Sign Up Free
            </Link>
            <Link 
              to="/login" 
              className="border border-black px-6 py-3 rounded-md text-lg font-medium hover:bg-gray-200"
            >
              Log In
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-black text-white py-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-2xl font-bold mb-4 md:mb-0">FUSO</div>
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} FUSO. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;