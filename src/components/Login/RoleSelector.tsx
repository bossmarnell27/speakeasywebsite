import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Mic, GraduationCap, BookOpen } from 'lucide-react';

const RoleSelector: React.FC = () => {
  const { login } = useAuth();

  return (
    <div className="min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="bg-indigo-600 text-white p-4 rounded-full">
            <Mic className="h-12 w-12" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to SpeakEasy</h1>
        <p className="text-gray-600 max-w-md mx-auto">
          Your AI-powered communication coaching platform for developing confident, effective speakers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full px-4">
        <div
          onClick={() => login('student')}
          className="bg-white rounded-lg shadow-lg border border-slate-200 p-6 cursor-pointer transform transition-transform hover:scale-105 hover:shadow-xl"
        >
          <div className="flex justify-center mb-4">
            <div className="bg-purple-100 text-purple-600 p-3 rounded-full">
              <GraduationCap className="h-8 w-8" />
            </div>
          </div>
          <h2 className="text-xl font-semibold text-center mb-2">Student</h2>
          <p className="text-gray-600 text-center">
            Practice assignments, record presentations, and receive AI feedback to improve your communication skills.
          </p>
          <div className="mt-4 text-center">
            <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors">
              Enter as Student
            </button>
          </div>
        </div>

        <div
          onClick={() => login('teacher')}
          className="bg-white rounded-lg shadow-lg border border-slate-200 p-6 cursor-pointer transform transition-transform hover:scale-105 hover:shadow-xl"
        >
          <div className="flex justify-center mb-4">
            <div className="bg-indigo-100 text-indigo-600 p-3 rounded-full">
              <BookOpen className="h-8 w-8" />
            </div>
          </div>
          <h2 className="text-xl font-semibold text-center mb-2">Teacher</h2>
          <p className="text-gray-600 text-center">
            Create assignments, review student submissions, and track progress with detailed analytics.
          </p>
          <div className="mt-4 text-center">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
              Enter as Teacher
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelector;