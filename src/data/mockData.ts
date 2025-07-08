// Mock data for SpeakEasy prototype - Single student and assignment
import { Assignment, Report, Student, AssignmentStatus, AssignmentDifficulty } from '../types';

// Single mock assignment
export const mockAssignments: Assignment[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    title: 'Persuasive Speech: Environmental Action',
    description: 'Prepare a 3-minute persuasive speech about an environmental issue you care about. Focus on clear arguments, emotional appeal, and call to action.',
    dueDate: '2025-05-15',
    timeLimit: 3,
    status: 'Graded',
    difficulty: 'Medium',
    createdAt: '2025-04-01',
    updatedAt: '2025-05-13',
  }
];

// Single mock student
export const mockStudents: Student[] = [
  { 
    id: '550e8400-e29b-41d4-a716-446655440002', 
    name: 'Emma Thompson', 
    grade: '8A', 
    averageScore: 88, 
    email: 'emma.thompson@school.edu', 
    avatarUrl: 'https://i.pravatar.cc/150?u=emma' 
  }
];

// Single mock teacher
export const mockTeacher = {
  id: '550e8400-e29b-41d4-a716-446655440001',
  name: 'Ms. Johnson',
  email: 'ms.johnson@school.edu',
  avatarUrl: 'https://i.pravatar.cc/150?u=teacher'
};

// Single mock report
export const mockReports: Report[] = [
  {
    id: 'r1',
    assignmentId: '550e8400-e29b-41d4-a716-446655440003',
    studentId: '550e8400-e29b-41d4-a716-446655440002',
    overallScore: 88,
    tone: {
      score: 85,
      feedback: 'Good vocal variety and emotional expression. Try to project your voice more in the conclusion.',
    },
    rhythm: {
      score: 90,
      feedback: 'Excellent pacing throughout the speech. Good use of pauses for emphasis.',
    },
    bodyLanguage: {
      score: 86,
      feedback: 'Strong eye contact and confident posture. Consider using more hand gestures to emphasize key points.',
    },
    fillerWords: {
      um: 2,
      like: 1,
      youKnow: 1,
    },
    recordingUrl: 'https://example.com/recording/emma-speech-1',
    submittedAt: '2025-05-12T10:30:00Z',
    gradedAt: '2025-05-13T14:20:00Z',
  }
];

// Function to generate a random report (keeping for compatibility)
export const generateRandomReport = (assignmentId: string, studentId: string): Report => {
  // Return the existing report if it matches, otherwise create a new one
  const existingReport = mockReports.find(r => r.assignmentId === assignmentId && r.studentId === studentId);
  if (existingReport) return existingReport;

  const overallScore = Math.floor(Math.random() * 31) + 70; // 70-100
  const toneScore = Math.floor(Math.random() * 31) + 70;
  const rhythmScore = Math.floor(Math.random() * 31) + 70;
  const bodyLanguageScore = Math.floor(Math.random() * 31) + 70;
  
  const toneFeedback = ['Work on volume', 'Improve clarity', 'Great tone variation', 'More enthusiasm needed'];
  const rhythmFeedback = ['Work on pace', 'Better pauses needed', 'Good rhythm overall', 'Work on transitions'];
  const bodyLanguageFeedback = ['Improve eye contact', 'More hand gestures', 'Stand up straighter', 'Great presence'];
  
  return {
    id: `r-${Date.now()}`,
    assignmentId,
    studentId,
    overallScore,
    tone: {
      score: toneScore,
      feedback: toneFeedback[Math.floor(Math.random() * toneFeedback.length)],
    },
    rhythm: {
      score: rhythmScore,
      feedback: rhythmFeedback[Math.floor(Math.random() * rhythmFeedback.length)],
    },
    bodyLanguage: {
      score: bodyLanguageScore,
      feedback: bodyLanguageFeedback[Math.floor(Math.random() * bodyLanguageFeedback.length)],
    },
    fillerWords: {
      um: Math.floor(Math.random() * 6),
      like: Math.floor(Math.random() * 5),
      youKnow: Math.floor(Math.random() * 4),
    },
    recordingUrl: 'https://example.com/recording/sample',
    submittedAt: new Date().toISOString(),
    gradedAt: new Date().toISOString(),
  };
};

// Helper functions
export const getStudentById = (id: string): Student | undefined => {
  return mockStudents.find(student => student.id === id);
};

export const getAssignmentById = (id: string): Assignment | undefined => {
  return mockAssignments.find(assignment => assignment.id === id);
};

export const getReportsByStudentId = (studentId: string): Report[] => {
  return mockReports.filter(report => report.studentId === studentId);
};

export const getReportsByAssignmentId = (assignmentId: string): Report[] => {
  return mockReports.filter(report => report.assignmentId === assignmentId);
};