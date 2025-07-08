import React, { useState } from 'react';
import { mockStudents, mockTeacher, mockAssignments } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { Users, CheckCircle, Calendar, BarChart, AlertCircle } from 'lucide-react';
import AssignmentList from '../Shared/AssignmentList';
import CreateAssignmentModal from './CreateAssignmentModal';
import { useNavigate } from 'react-router-dom';
import { Assignment } from '../../types';
import { assignmentService } from '../../services/assignmentService';
import { useEffect } from 'react';

const TeacherDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'students'>('overview');
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load assignments when component mounts or user changes
  useEffect(() => {
    if (user?.id) {
      loadAssignments();
    }
  }, [user?.id]);

  const loadAssignments = async () => {
    if (!user?.id) return;
    
    try {
      setLoading(true);
      setError(null);
      console.log('Loading assignments for user:', user.id);
      const teacherAssignments = await assignmentService.getTeacherAssignments(user.id);
      console.log('Loaded assignments:', teacherAssignments);
      setAssignments(teacherAssignments);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load assignments';
      setError(errorMessage);
      console.error('Error loading assignments:', err);
    } finally {
      setLoading(false);
    }
  };

  // Calculate stats
  const totalAssignments = assignments.length;
  const submittedAssignments = assignments.filter(
    a => a.status === 'Submitted' || a.status === 'Graded'
  ).length;
  
  // Calculate average score (single student)
  const averageScore = mockStudents.length > 0 ? mockStudents[0].averageScore : 0;

  const handleCreateAssignment = (newAssignment: Assignment) => {
    setAssignments(prev => [newAssignment, ...prev]);
  };

  const handleStudentClick = (studentId: string) => {
    navigate(`/teacher/student/${studentId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome, {mockTeacher.name}
          </h1>
          <p className="text-gray-600">
            Manage your class assignments and review {mockStudents[0]?.name}'s progress.
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
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
              <span className="text-red-700">{error}</span>
              <button 
                onClick={loadAssignments}
                className="ml-auto text-red-600 hover:text-red-800 text-sm font-medium"
              >
                Retry
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-700">Student</h3>
                <Users className="h-5 w-5 text-indigo-600" />
              </div>
              <p className="text-3xl font-bold text-gray-800">{mockStudents.length}</p>
              <p className="text-sm text-gray-500">Active Student</p>
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
                <h3 className="font-semibold text-gray-700">Student Score</h3>
                <BarChart className="h-5 w-5 text-cyan-600" />
              </div>
              <p className="text-3xl font-bold text-gray-800">{averageScore}%</p>
              <p className="text-sm text-gray-500">{mockStudents[0]?.name}'s Score</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 bg-white rounded-lg shadow-md border border-slate-200 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Assignments</h2>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                  <span className="ml-2 text-gray-600">Loading assignments...</span>
                </div>
              ) : assignments.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No assignments created yet</p>
                  <button 
                    onClick={() => setIsCreateModalOpen(true)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    Create Your First Assignment
                  </button>
                </div>
              ) : (
                <AssignmentList userRole="teacher" assignments={assignments} />
              )}
            </div>
            
            <div className="bg-white rounded-lg shadow-md border border-slate-200 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Submissions</h2>
              <div className="space-y-4">
                {mockStudents.slice(0, 1).map(student => (
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
                        <p className="text-sm text-gray-500">{mockAssignments[0]?.title}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${student.averageScore >= 85 ? 'text-green-600' : 'text-amber-600'}`}>
                        {student.averageScore}%
                      </p>
                      <p className="text-xs text-gray-500">1 day ago</p>
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
              <h2 className="text-xl font-bold text-gray-800">Student</h2>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Search student..."
                  className="border border-slate-200 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Student</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Grade</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-500">Score</th>
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
                      <span className="text-gray-600">1/1</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-gray-600">1 day ago</span>
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