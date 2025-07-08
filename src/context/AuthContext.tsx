import React, { createContext, useContext, useState, ReactNode } from 'react';

type UserRole = 'student' | 'teacher' | null;

interface User {
  id: string;
  name: string;
  role: UserRole;
  avatarUrl: string;
}

interface AuthContextType {
  user: User | null;
  role: UserRole;
  setRole: (role: UserRole) => void;
  login: (role: UserRole) => void;
  logout: () => void;
}

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

  const login = (selectedRole: UserRole) => {
    const mockUser: User = {
      id: selectedRole === 'teacher' ? 't1' : 's1',
      name: selectedRole === 'teacher' ? 'Ms. Johnson' : 'Emma Thompson',
      role: selectedRole,
      avatarUrl: `https://i.pravatar.cc/150?u=${selectedRole}`,
    };
    
    setUser(mockUser);
    setRole(selectedRole);
  };

  const logout = () => {
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, setRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};