// Mock data for SpeakEasy prototype

export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  timeLimit: number; // in minutes
  status: 'Not Started' | 'In Progress' | 'Submitted' | 'Graded';
  difficulty: 'Easy' | 'Medium' | 'Hard';
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
}

export interface Student {
  id: string;
  name: string;
  grade: string;
  averageScore: number;
}

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
  },
  {
    id: 'a2',
    title: 'Book Report Presentation',
    description: 'Present a 4-minute summary and analysis of the book you read this month.',
    dueDate: '2025-05-10',
    timeLimit: 4,
    status: 'In Progress',
    difficulty: 'Easy',
  },
  {
    id: 'a3',
    title: 'Science Fair Project Pitch',
    description: 'Deliver a 5-minute pitch explaining your science fair project and findings.',
    dueDate: '2025-05-25',
    timeLimit: 5,
    status: 'Not Started',
    difficulty: 'Hard',
  },
  {
    id: 'a4',
    title: 'Historical Figure Biography',
    description: 'Present a 3-minute biography of a historical figure of your choice.',
    dueDate: '2025-05-20',
    timeLimit: 3,
    status: 'Submitted',
    difficulty: 'Medium',
  },
];

// Mock students with realistic names and data
export const mockStudents: Student[] = [
  { id: 's1', name: 'Emma Thompson', grade: '8A', averageScore: 85 },
  { id: 's2', name: 'Marcus Chen', grade: '8A', averageScore: 92 },
  { id: 's3', name: 'Sofia Rodriguez', grade: '8B', averageScore: 78 },
  { id: 's4', name: 'Lucas Williams', grade: '8A', averageScore: 88 },
  { id: 's5', name: 'Ava Patel', grade: '8B', averageScore: 95 },
  { id: 's6', name: 'Noah Kim', grade: '8A', averageScore: 83 },
  { id: 's7', name: 'Isabella Garcia', grade: '8B', averageScore: 91 },
  { id: 's8', name: 'Ethan Johnson', grade: '8A', averageScore: 76 },
  { id: 's9', name: 'Olivia Brown', grade: '8B', averageScore: 89 },
  { id: 's10', name: 'Alexander Lee', grade: '8A', averageScore: 94 },
  { id: 's11', name: 'Mia Anderson', grade: '8B', averageScore: 87 },
  { id: 's12', name: 'William Zhang', grade: '8A', averageScore: 93 },
  { id: 's13', name: 'Charlotte Davis', grade: '8B', averageScore: 82 },
  { id: 's14', name: 'James Wilson', grade: '8A', averageScore: 86 },
  { id: 's15', name: 'Sophia Martinez', grade: '8B', averageScore: 90 }
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
  };
};