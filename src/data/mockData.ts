// Mock data for SpeakEasy prototype
import { Assignment, Report, Student, AssignmentStatus, AssignmentDifficulty } from '../types';

// Mock assignments
export const mockAssignments: Assignment[] = [
  {
    id: 'a1',
    title: 'Persuasive Speech: Environmental Action',
    description: 'Prepare a 3-minute persuasive speech about an environmental issue you care about.',
    dueDate: '2025-05-15',
    timeLimit: 3,
    status: 'Not Started',
    difficulty: 'Medium',
    createdAt: '2025-04-01',
    updatedAt: '2025-04-01',
  },
  {
    id: 'a2',
    title: 'Book Report Presentation',
    description: 'Present a 4-minute summary and analysis of the book you read this month.',
    dueDate: '2025-05-10',
    timeLimit: 4,
    status: 'In Progress',
    difficulty: 'Easy',
    createdAt: '2025-03-28',
    updatedAt: '2025-04-05',
  },
  {
    id: 'a3',
    title: 'Science Fair Project Pitch',
    description: 'Deliver a 5-minute pitch explaining your science fair project and findings.',
    dueDate: '2025-05-25',
    timeLimit: 5,
    status: 'Not Started',
    difficulty: 'Hard',
    createdAt: '2025-04-02',
    updatedAt: '2025-04-02',
  },
  {
    id: 'a4',
    title: 'Historical Figure Biography',
    description: 'Present a 3-minute biography of a historical figure of your choice.',
    dueDate: '2025-05-20',
    timeLimit: 3,
    status: 'Submitted',
    difficulty: 'Medium',
    createdAt: '2025-03-25',
    updatedAt: '2025-05-12',
  },
  {
    id: 'a5',
    title: 'Debate: Technology in Education',
    description: 'Participate in a 4-minute debate about the role of technology in modern education.',
    dueDate: '2025-04-30',
    timeLimit: 4,
    status: 'Graded',
    difficulty: 'Hard',
    createdAt: '2025-03-20',
    updatedAt: '2025-05-01',
  },
  {
    id: 'a6',
    title: 'Personal Storytelling',
    description: 'Share a 3-minute personal story that taught you an important lesson.',
    dueDate: '2025-04-15',
    timeLimit: 3,
    status: 'Graded',
    difficulty: 'Easy',
    createdAt: '2025-03-10',
    updatedAt: '2025-04-16',
  },
];

// Mock students with realistic names and data
export const mockStudents: Student[] = [
  { id: 's1', name: 'Emma Thompson', grade: '8A', averageScore: 85, email: 'emma.thompson@school.edu', avatarUrl: 'https://i.pravatar.cc/150?u=s1' },
  { id: 's2', name: 'Marcus Chen', grade: '8A', averageScore: 92, email: 'marcus.chen@school.edu', avatarUrl: 'https://i.pravatar.cc/150?u=s2' },
  { id: 's3', name: 'Sofia Rodriguez', grade: '8B', averageScore: 78, email: 'sofia.rodriguez@school.edu', avatarUrl: 'https://i.pravatar.cc/150?u=s3' },
  { id: 's4', name: 'Lucas Williams', grade: '8A', averageScore: 88, email: 'lucas.williams@school.edu', avatarUrl: 'https://i.pravatar.cc/150?u=s4' },
  { id: 's5', name: 'Ava Patel', grade: '8B', averageScore: 95, email: 'ava.patel@school.edu', avatarUrl: 'https://i.pravatar.cc/150?u=s5' },
  { id: 's6', name: 'Noah Kim', grade: '8A', averageScore: 83, email: 'noah.kim@school.edu', avatarUrl: 'https://i.pravatar.cc/150?u=s6' },
  { id: 's7', name: 'Isabella Garcia', grade: '8B', averageScore: 91, email: 'isabella.garcia@school.edu', avatarUrl: 'https://i.pravatar.cc/150?u=s7' },
  { id: 's8', name: 'Ethan Johnson', grade: '8A', averageScore: 76, email: 'ethan.johnson@school.edu', avatarUrl: 'https://i.pravatar.cc/150?u=s8' },
  { id: 's9', name: 'Olivia Brown', grade: '8B', averageScore: 89, email: 'olivia.brown@school.edu', avatarUrl: 'https://i.pravatar.cc/150?u=s9' },
  { id: 's10', name: 'Alexander Lee', grade: '8A', averageScore: 94, email: 'alexander.lee@school.edu', avatarUrl: 'https://i.pravatar.cc/150?u=s10' },
  { id: 's11', name: 'Mia Anderson', grade: '8B', averageScore: 87, email: 'mia.anderson@school.edu', avatarUrl: 'https://i.pravatar.cc/150?u=s11' },
  { id: 's12', name: 'William Zhang', grade: '8A', averageScore: 93, email: 'william.zhang@school.edu', avatarUrl: 'https://i.pravatar.cc/150?u=s12' },
  { id: 's13', name: 'Charlotte Davis', grade: '8B', averageScore: 82, email: 'charlotte.davis@school.edu', avatarUrl: 'https://i.pravatar.cc/150?u=s13' },
  { id: 's14', name: 'James Wilson', grade: '8A', averageScore: 86, email: 'james.wilson@school.edu', avatarUrl: 'https://i.pravatar.cc/150?u=s14' },
  { id: 's15', name: 'Sophia Martinez', grade: '8B', averageScore: 90, email: 'sophia.martinez@school.edu', avatarUrl: 'https://i.pravatar.cc/150?u=s15' }
];

// Mock reports
export const mockReports: Report[] = [
  {
    id: 'r1',
    assignmentId: 'a4',
    studentId: 's1',
    overallScore: 95,
    tone: {
      score: 80,
      feedback: 'Work on volume',
    },
    rhythm: {
      score: 90,
      feedback: 'Work on pace',
    },
    bodyLanguage: {
      score: 90,
      feedback: 'Great eye contact',
    },
    fillerWords: {
      um: 3,
      like: 2,
      youKnow: 2,
    },
    recordingUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    submittedAt: '2025-05-12',
    gradedAt: '2025-05-13',
  },
  {
    id: 'r2',
    assignmentId: 'a2',
    studentId: 's2',
    overallScore: 75,
    tone: {
      score: 80,
      feedback: 'Work on volume',
    },
    rhythm: {
      score: 90,
      feedback: 'Work on pauses',
    },
    bodyLanguage: {
      score: 90,
      feedback: 'Improve gestures',
    },
    fillerWords: {
      um: 3,
      like: 2,
      youKnow: 2,
    },
    recordingUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    submittedAt: '2025-05-08',
    gradedAt: '2025-05-09',
  },
  {
    id: 'r3',
    assignmentId: 'a5',
    studentId: 's1',
    overallScore: 88,
    tone: {
      score: 85,
      feedback: 'Good tone variation',
    },
    rhythm: {
      score: 90,
      feedback: 'Excellent pacing',
    },
    bodyLanguage: {
      score: 85,
      feedback: 'Good posture and gestures',
    },
    fillerWords: {
      um: 2,
      like: 1,
      youKnow: 1,
    },
    recordingUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    submittedAt: '2025-04-30',
    gradedAt: '2025-05-01',
  },
  {
    id: 'r4',
    assignmentId: 'a6',
    studentId: 's1',
    overallScore: 92,
    tone: {
      score: 95,
      feedback: 'Excellent emotional expression',
    },
    rhythm: {
      score: 90,
      feedback: 'Great storytelling rhythm',
    },
    bodyLanguage: {
      score: 88,
      feedback: 'Very engaging presence',
    },
    fillerWords: {
      um: 1,
      like: 0,
      youKnow: 1,
    },
    recordingUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    submittedAt: '2025-04-15',
    gradedAt: '2025-04-16',
  },
];

// Function to generate a random report
export const generateRandomReport = (assignmentId: string, studentId: string): Report => {
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
    recordingUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
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