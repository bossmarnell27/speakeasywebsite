import React, { useState } from 'react';
import { mockAssignments, mockStudents } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { Users, CheckCircle, Calendar, BarChart } from 'lucide-react';
import AssignmentList from '../Shared/AssignmentList';
import CreateAssignmentModal from './CreateAssignmentModal';
import { useNavigate } from 'react-router-dom';
import { Assignment } from '../../types';

const TeacherDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'students'>('overview');
  const [assignments, setAssignments] = useState(mockAssignments);

  // Calculate stats
  const totalAssignments = assignments.length;
  const submittedAssignments = assignments.filter(
    a => a.status === 'Submitted' || a.status === 'Graded'
  ).length;
  
  // Calculate average scores
  const averageScore = mockStudents.reduce(
    (sum, student) => sum + student.averageScore, 
    0
  ) / mockStudents.length;

  const handleCreateAssignment = (assignmentData: Omit<Assignment, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => {
    const newAssignment: Assignment = {
      ...assignmentData,
      id: `a${Date.now()}`,
      status: 'Not Started',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    setAssignments(prev => [newAssignment, ...prev]);
    console.log('Created assignment:', newAssignment);
  };

  const handleStudentClick = (studentId: string) => {
    navigate(`/teacher/student/${studentId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome, {user?.name || 'Teacher'}
          </h1>
          <p className="text-gray-600">
            Manage your class assignments and review student progress.
          </p>
        </div>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors flex items-center"
        >
          <span className="mr-2">Create Assignment</span>
          <span className="text-lg">+</span>
        </button>
      </div>

      <div className="mb-6 border-b border-slate-200">
        <div className="flex space-x-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-1 relative ${
              activeTab === 'overview'
                ? 'text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Overview
            {activeTab === 'overview' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab('students')}
            className={`py-3 px-1 relative ${
              activeTab === 'students'
                ? 'text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Students
            {activeTab === 'students' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"></div>
            )}
          </button>
        </div>
      </div>

      {activeTab === 'overview' ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-700">Students</h3>
                <Users className="h-5 w-5 text-indigo-600" />
              </div>
              <p className="text-3xl font-bold text-gray-800">{mockStudents.length}</p>
              <p className="text-sm text-gray-500">Active Students</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-700">Assignments</h3>
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
              <p className="text-3xl font-bold text-gray-800">{totalAssignments}</p>
              <p className="text-sm text-gray-500">Total Assignments</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-700">Completed</h3>
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <p className="text-3xl font-bold text-gray-800">{submittedAssignments}</p>
              <p className="text-sm text-gray-500">Submitted Assignments</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-700">Average Score</h3>
                <BarChart className="h-5 w-5 text-cyan-600" />
              </div>
              <p className="text-3xl font-bold text-gray-800">{averageScore.toFixed(1)}%</p>
              <p className="text-sm text-gray-500">Class Average</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 bg-white rounded-lg shadow-md border border-slate-200 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Class Assignments</h2>
              <AssignmentList userRole="teacher" assignments={assignments} />
            </div>
            
            <div className="bg-white rounded-lg shadow-md border border-slate-200 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Submissions</h2>
              <div className="space-y-4">
                {mockStudents.slice(0, 5).map(student => (
                  <div 
                    key={student.id} 
                    className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                    onClick={() => handleStudentClick(student.id)}
                  >
                    <div className="flex items-center">
                      <img 
                        src={student.avatarUrl || `https://i.pravatar.cc/40?u=${student.id}`}
                        alt={student.name} 
                        className="w-10 h-10 rounded-full mr-3" 
                      />
                      <div>
                        <p className="font-medium text-gray-800">{student.name}</p>
                        <p className="text-sm text-gray-500">Book Report Presentation</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${student.averageScore >= 85 ? 'text-green-600' : 'text-amber-600'}`}>
                        {student.averageScore}%
                      </p>
                      <p className="text-xs text-gray-500">2 days ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white rounded-lg shadow-md border border-slate-200">
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">Students</h2>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Search students..."
                  className="border border-slate-200 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <select className="border border-slate-200 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option value="all">All Grades</option>
                  <option value="8A">Grade 8A</option>
                  <option value="8B">Grade 8B</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Student</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Grade</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Average Score</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Assignments Completed</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Last Submission</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {mockStudents.map((student) => (
                  <tr 
                    key={student.id} 
                    className="hover:bg-slate-50 cursor-pointer"
                    onClick={() => handleStudentClick(student.id)}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <img
                          src={student.avatarUrl || `https://i.pravatar.cc/40?u=${student.id}`}
                          alt={student.name}
                          className="w-8 h-8 rounded-full mr-3"
                        />
                        <span className="font-medium text-gray-800">{student.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        {student.grade}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div
                            className={`h-2 rounded-full ${
                              student.averageScore >= 90
                                ? 'bg-green-500'
                                : student.averageScore >= 80
                                ? 'bg-indigo-500'
                                : 'bg-amber-500'
                            }`}
                            style={{ width: `${student.averageScore}%` }}
                          ></div>
                        </div>
                        <span className="font-medium text-gray-800">{student.averageScore}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-gray-600">3/4</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-gray-600">2 days ago</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <CreateAssignmentModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateAssignment}
      />
    </div>
  );
};

export default TeacherDashboard;