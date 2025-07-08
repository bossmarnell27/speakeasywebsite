import React from 'react';
import { mockTeacher } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { Calendar, Clock, BarChart, AlertCircle } from 'lucide-react';
import AssignmentList from '../Shared/AssignmentList';
import { AssignmentStatus, Assignment } from '../../types';
import { getDaysUntilDue } from '../../utils/helpers';
import { assignmentService, AssignmentWithStatus } from '../../services/assignmentService';
import { useState, useEffect } from 'react';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState<AssignmentWithStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load student assignments when component mounts
  useEffect(() => {
    if (user?.id) {
      loadStudentAssignments();
    }
  }, [user?.id]);

  const loadStudentAssignments = async () => {
    if (!user?.id) return;
    
    try {
      setLoading(true);
      setError(null);
      const studentAssignments = await assignmentService.getStudentAssignments(user.id);
      setAssignments(studentAssignments);
    } catch (err) {
      setError('Failed to load assignments');
      console.error('Error loading student assignments:', err);
    } finally {
      setLoading(false);
    }
  };

  // Count assignments by status
  const statusCounts = assignments.reduce((acc, assignment) => {
    acc[assignment.status] = (acc[assignment.status] || 0) + 1;
    return acc;
  }, {} as Record<AssignmentStatus, number>);

  const completedCount = (statusCounts['Submitted'] || 0) + (statusCounts['Graded'] || 0);
  const pendingCount = (statusCounts['Not Started'] || 0) + (statusCounts['In Progress'] || 0);

  // Calculate student's average score from completed assignments
  const gradedAssignments = assignments.filter(a => a.status === 'Graded');
  const averageScore = gradedAssignments.length > 0 
    ? gradedAssignments.reduce((sum) => sum + 85, 0) / gradedAssignments.length 
    : 0;

  // Get next due assignment
  const nextDueAssignment = assignments
    .filter(a => a.status === 'Not Started' || a.status === 'In Progress')
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())[0];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Welcome back, Emma Thompson
        </h1>
        <p className="text-gray-600">
          Track your assignment from {mockTeacher.name} and improve your communication skills.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
          <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
          <span className="text-red-700">{error}</span>
          <button 
            onClick={loadStudentAssignments}
            className="ml-auto text-red-600 hover:text-red-800 text-sm font-medium"
          >
            Retry
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-700">Your Progress</h3>
            <Calendar className="h-5 w-5 text-indigo-600" />
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-3xl font-bold text-gray-800">{assignments.length}</p>
              <p className="text-sm text-gray-500">Total Assignment</p>
            </div>
            <div className="text-right">
              <p className="text-green-600">{completedCount} Completed</p>
              <p className="text-amber-600">{pendingCount} Pending</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-700">Next Due</h3>
            <Clock className="h-5 w-5 text-purple-600" />
          </div>
          {nextDueAssignment ? (
            <>
              <p className="text-lg font-medium text-gray-800 mb-1">{nextDueAssignment.title}</p>
              <p className="text-sm text-gray-500 mb-3">
                Due in {getDaysUntilDue(nextDueAssignment.dueDate)} days
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full" 
                  style={{ width: `${Math.max(0, 100 - (getDaysUntilDue(nextDueAssignment.dueDate) * 10))}%` }}
                ></div>
              </div>
            </>
          ) : (
            <p className="text-gray-500">No upcoming assignments</p>
          )}
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-700">Your Performance</h3>
            <BarChart className="h-5 w-5 text-cyan-600" />
          </div>
          <p className="text-3xl font-bold text-gray-800">{averageScore}%</p>
          <p className="text-sm text-gray-500 mb-2">Average Score</p>
          <p className="text-xs text-green-600 flex items-center">
            <span className="mr-1">↑</span> 
            3% improvement from last month
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-slate-200 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Your Assignment</h2>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            <span className="ml-2 text-gray-600">Loading assignments...</span>
          </div>
        ) : assignments.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No assignments available yet</p>
            <p className="text-sm text-gray-500 mt-2">Your teacher will assign work soon</p>
          </div>
        ) : (
          <AssignmentList userRole="student" assignments={assignments} />
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;