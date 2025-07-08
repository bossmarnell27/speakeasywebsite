import React from 'react';
import { Mic, LogOut, Users, GraduationCap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const { user, logout, role, setRole } = useAuth();
  const navigate = useNavigate();

  const handleRoleChange = (newRole: 'student' | 'teacher') => {
    setRole(newRole);
    // Navigate to the appropriate dashboard
    navigate(newRole === 'student' ? '/student' : '/teacher');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getRoleInfo = (role: 'student' | 'teacher') => {
    return role === 'student' 
      ? { icon: GraduationCap, label: 'Student', color: 'purple' }
      : { icon: Users, label: 'Teacher', color: 'indigo' };
  };

  const currentRoleInfo = role ? getRoleInfo(role) : null;

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
              <span className="font-medium">{user.name}</span>
            </div>
            
            {/* Current Role Indicator */}
            {currentRoleInfo && (
              <div className={`flex items-center space-x-2 bg-white/20 rounded-lg px-3 py-1`}>
                <currentRoleInfo.icon className="h-4 w-4" />
                <span className="text-sm font-medium">Current: {currentRoleInfo.label}</span>
              </div>
            )}
            
            <div className="flex items-center space-x-2">
              {/* Role Switcher */}
              <div className="flex items-center space-x-1 bg-white/20 rounded-lg p-1">
                <button
                  onClick={() => handleRoleChange('student')}
                  className={`flex items-center space-x-1 px-3 py-1 rounded-md text-sm transition-colors ${
                    role === 'student' 
                      ? 'bg-white text-indigo-600 font-medium' 
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  <GraduationCap className="h-4 w-4" />
                  <span>Student</span>
                </button>
                <button
                  onClick={() => handleRoleChange('teacher')}
                  className={`flex items-center space-x-1 px-3 py-1 rounded-md text-sm transition-colors ${
                    role === 'teacher' 
                      ? 'bg-white text-indigo-600 font-medium' 
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  <Users className="h-4 w-4" />
                  <span>Teacher</span>
                </button>
              </div>
              
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 bg-white/20 hover:bg-white/30 rounded px-3 py-1 text-sm transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <span className="text-sm">Choose your role:</span>
            <button
              onClick={() => handleRoleChange('student')}
              className="flex items-center space-x-1 bg-white/20 hover:bg-white/30 rounded px-3 py-1 text-sm transition-colors"
            >
              <GraduationCap className="h-4 w-4" />
              <span>Student</span>
            </button>
            <button
              onClick={() => handleRoleChange('teacher')}
              className="flex items-center space-x-1 bg-white/20 hover:bg-white/30 rounded px-3 py-1 text-sm transition-colors"
            >
              <Users className="h-4 w-4" />
              <span>Teacher</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;