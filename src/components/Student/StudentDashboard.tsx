import React from 'react';
import { mockAssignments } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { Calendar, Clock, BarChart } from 'lucide-react';
import AssignmentList from '../Shared/AssignmentList';
import { AssignmentStatus } from '../../types';
import { getDaysUntilDue } from '../../utils/helpers';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();

  // Count assignments by status
  const statusCounts = mockAssignments.reduce((acc, assignment) => {
    acc[assignment.status] = (acc[assignment.status] || 0) + 1;
    return acc;
  }, {} as Record<AssignmentStatus, number>);

  const completedCount = (statusCounts['Submitted'] || 0) + (statusCounts['Graded'] || 0);
  const pendingCount = (statusCounts['Not Started'] || 0) + (statusCounts['In Progress'] || 0);

  // Calculate student's average score from completed assignments
  const studentAssignments = mockAssignments.filter(a => a.status === 'Graded');
  const averageScore = studentAssignments.length > 0 
    ? studentAssignments.reduce((sum) => sum + 85, 0) / studentAssignments.length 
    : 0;

  // Get next due assignment
  const nextDueAssignment = mockAssignments
    .filter(a => a.status === 'Not Started' || a.status === 'In Progress')
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())[0];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Welcome back, {user?.name || 'Student'}
        </h1>
        <p className="text-gray-600">
          Track your assignments and improve your communication skills.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-700">Your Progress</h3>
            <Calendar className="h-5 w-5 text-indigo-600" />
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-3xl font-bold text-gray-800">{mockAssignments.length}</p>
              <p className="text-sm text-gray-500">Total Assignments</p>
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
        <h2 className="text-xl font-bold text-gray-800 mb-4">Your Assignments</h2>
        <AssignmentList userRole="student" />
      </div>
    </div>
  );
};

export default StudentDashboard;