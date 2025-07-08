import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockAssignments, mockStudents, mockReports } from '../../data/mockData';
import { ArrowLeft, Clock, User, Calendar, CheckCircle, XCircle } from 'lucide-react';

const TeacherAssignmentView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const assignment = mockAssignments.find(a => a.id === id);
  
  if (!assignment) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Assignment Not Found</h2>
        <p className="text-gray-600 mb-4">The assignment you're looking for doesn't exist.</p>
        <button 
          onClick={() => navigate('/teacher')}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const handleViewStudentReport = (studentId: string) => {
    navigate(`/teacher/assignment/${id}/student/${studentId}`);
  };

  // Simulate student submission status
  const studentSubmissionStatus = mockStudents.map(student => {
    const hasSubmitted = Math.random() > 0.4; // 60% chance of submission
    const score = hasSubmitted ? Math.floor(Math.random() * 31) + 70 : null; // 70-100
    
    return {
      ...student,
      hasSubmitted,
      score,
      submittedDate: hasSubmitted ? '2025-05-10' : null,
    };
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={() => navigate('/teacher')}
        className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Dashboard
      </button>
      
      <div className="bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden">
        <div className="border-b border-slate-200 p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{assignment.title}</h1>
          <p className="text-gray-600 mb-4">{assignment.description}</p>
          
          <div className="flex flex-wrap gap-4">
            <div className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              Time Limit: {assignment.timeLimit} minutes
            </div>
            <div className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              Due: {new Date(assignment.dueDate).toLocaleDateString()}
            </div>
            <div className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm flex items-center">
              <User className="h-4 w-4 mr-1" />
              {studentSubmissionStatus.filter(s => s.hasSubmitted).length} / {studentSubmissionStatus.length} Submitted
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Student Submissions</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead>
                <tr>
                  <th className="py-3 text-left text-sm font-medium text-gray-500 tracking-wider">Student</th>
                  <th className="py-3 text-left text-sm font-medium text-gray-500 tracking-wider">Status</th>
                  <th className="py-3 text-left text-sm font-medium text-gray-500 tracking-wider">Submission Date</th>
                  <th className="py-3 text-left text-sm font-medium text-gray-500 tracking-wider">Score</th>
                  <th className="py-3 text-left text-sm font-medium text-gray-500 tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {studentSubmissionStatus.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4">
                      <div className="flex items-center">
                        <img 
                          src={`https://i.pravatar.cc/40?u=${student.id}`} 
                          alt={student.name} 
                          className="w-8 h-8 rounded-full mr-3" 
                        />
                        <div>
                          <p className="font-medium text-gray-800">{student.name}</p>
                          <p className="text-xs text-gray-500">Grade {student.grade}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      {student.hasSubmitted ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Submitted
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          <XCircle className="h-3 w-3 mr-1" />
                          Not Submitted
                        </span>
                      )}
                    </td>
                    <td className="py-4">
                      {student.submittedDate ? (
                        <span className="text-sm text-gray-600">
                          {new Date(student.submittedDate).toLocaleDateString()}
                        </span>
                      ) : (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </td>
                    <td className="py-4">
                      {student.score ? (
                        <span className="text-sm font-medium text-gray-800">{student.score}/100</span>
                      ) : (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </td>
                    <td className="py-4">
                      {student.hasSubmitted ? (
                        <button
                          onClick={() => handleViewStudentReport(student.id)}
                          className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                        >
                          View Report
                        </button>
                      ) : (
                        <button
                          className="text-gray-400 cursor-not-allowed text-sm font-medium"
                          disabled
                        >
                          No Submission
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherAssignmentView;