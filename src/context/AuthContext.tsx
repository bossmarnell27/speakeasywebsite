import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = (selectedRole: UserRole) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockUser: User = {
        id: selectedRole === 'teacher' ? 't1' : 's1',
        name: selectedRole === 'teacher' ? 'Ms. Johnson' : 'Emma Thompson',
        role: selectedRole,
        avatarUrl: `https://i.pravatar.cc/150?u=${selectedRole}`,
        email: selectedRole === 'teacher' ? 'ms.johnson@school.edu' : 'emma.thompson@school.edu',
      };
      
      setUser(mockUser);
      setRole(selectedRole);
      setIsLoading(false);
    }, 500);
  };

  const switchRole = (newRole: UserRole) => {
    if (!user) return;
    
    // Update the user's role
    setUser(prev => prev ? { ...prev, role: newRole } : null);
    setRole(newRole);
  };

  const logout = () => {
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      role, 
      setRole: switchRole, // Use switchRole instead of setRole directly
      login, 
      logout, 
      isLoading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};