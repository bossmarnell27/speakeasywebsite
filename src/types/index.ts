// Core types for the SpeakEasy application



export type UserRole = 'student' | 'teacher' | null;

export type AssignmentStatus = 'Not Started' | 'In Progress' | 'Submitted' | 'Graded';
export type AssignmentDifficulty = 'Easy' | 'Medium' | 'Hard';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatarUrl: string;
  email?: string;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  timeLimit: number; // in minutes
  status: AssignmentStatus;
  difficulty: AssignmentDifficulty;
  createdAt?: string;
  updatedAt?: string;
}

export interface Report {
  id: string;
  assignmentId: string;
  studentId: string;
  overallScore: number;
  tone: {
    score: number;
    feedback: string;
  };
  rhythm: {
    score: number;
    feedback: string;
  };
  bodyLanguage: {
    score: number;
    feedback: string;
  };
  fillerWords: {
    um: number;
    like: number;
    youKnow: number;
  };
  recordingUrl: string;
  submittedAt: string;
  gradedAt?: string;
}

export interface Student {
  id: string;
  name: string;
  grade: string;
  averageScore: number;
  email?: string;
  avatarUrl?: string;
  teacherId?: string;
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface AuthContextType {
  user: User | null;
  role: UserRole;
  setRole: (role: UserRole) => void;
  login: (role: UserRole) => void;
  logout: () => void;
  isLoading: boolean;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  search?: string;
  filter?: Record<string, any>;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
} 