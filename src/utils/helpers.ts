// Common utility functions for the SpeakEasy application

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString();
};

export const getDaysUntilDue = (dueDate: string): number => {
  const today = new Date();
  const due = new Date(dueDate);
  const diffTime = due.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const getDifficultyColor = (difficulty: string): string => {
  switch (difficulty) {
    case 'Easy':
      return 'bg-green-100 text-green-800';
    case 'Medium':
      return 'bg-amber-100 text-amber-800';
    case 'Hard':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'Not Started':
      return 'text-gray-600';
    case 'In Progress':
      return 'text-blue-600';
    case 'Submitted':
      return 'text-green-600';
    case 'Graded':
      return 'text-purple-600';
    default:
      return 'text-gray-600';
  }
};

export const getScoreColor = (score: number): string => {
  if (score >= 90) return 'text-green-600';
  if (score >= 80) return 'text-indigo-600';
  if (score >= 70) return 'text-amber-600';
  return 'text-red-600';
};

export const generateId = (): string => {
  return `id-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}; 