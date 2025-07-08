import React from 'react';
import { Mic } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Header: React.FC = () => {
  const { user, logout, role, setRole } = useAuth();

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Mic className="h-8 w-8" />
          <h1 className="text-2xl font-bold">SpeakEasy</h1>
        </div>
        
        {user ? (
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <img 
                src={user.avatarUrl} 
                alt={user.name} 
                className="h-8 w-8 rounded-full border-2 border-white"
              />
              <span>{user.name}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <select
                value={role || ''}
                onChange={(e) => setRole(e.target.value as 'student' | 'teacher' | null)}
                className="bg-white/20 text-white rounded px-2 py-1 text-sm"
              >
                <option value="student">Student View</option>
                <option value="teacher">Teacher View</option>
              </select>
              
              <button
                onClick={logout}
                className="bg-white/20 hover:bg-white/30 rounded px-3 py-1 text-sm transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div>
            <span className="text-sm mr-2">Switch role:</span>
            <button
              onClick={() => setRole('student')}
              className="bg-white/20 hover:bg-white/30 rounded px-3 py-1 text-sm mr-2 transition-colors"
            >
              Student
            </button>
            <button
              onClick={() => setRole('teacher')}
              className="bg-white/20 hover:bg-white/30 rounded px-3 py-1 text-sm transition-colors"
            >
              Teacher
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;