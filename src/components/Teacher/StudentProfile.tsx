import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockStudents, mockAssignments, mockReports, generateRandomReport } from '../../data/mockData';
import { ArrowLeft, BarChart, Calendar, Clock } from 'lucide-react';

const StudentProfile: React.FC = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const navigate = useNavigate();
  
  const student = mockStudents.find(s => s.id === studentId);
  
  if (!student) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Student Not Found</h2>
        <button 
          onClick={() => navigate('/teacher')}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  // Generate mock submission data for each assignment
  const studentSubmissions = mockAssignments.map(assignment => {
    const report = mockReports.find(r => r.assignmentId === assignment.id && r.studentId === studentId) 
      || generateRandomReport(assignment.id, studentId);
    return { assignment, report };
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
          <div className="flex items-center mb-4">
            <img 
              src={`https://i.pravatar.cc/80?u=${student.id}`} 
              alt={student.name} 
              className="w-20 h-20 rounded-full mr-6" 
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-1">{student.name}</h1>
              <div className="flex items-center space-x-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                  Grade {student.grade}
                </span>
                <span className="text-gray-500">Student ID: {student.id}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-slate-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-700">Average Score</h3>
                <BarChart className="h-5 w-5 text-indigo-600" />
              </div>
              <p className="text-2xl font-bold text-gray-800">{student.averageScore}%</p>
            </div>
            
            <div className="bg-slate-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-700">Completed</h3>
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-gray-800">
                {studentSubmissions.filter(s => s.report.overallScore > 0).length}/{studentSubmissions.length}
              </p>
            </div>
            
            <div className="bg-slate-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-700">Time Spent</h3>
                <Clock className="h-5 w-5 text-cyan-600" />
              </div>
              <p className="text-2xl font-bold text-gray-800">4.5 hrs</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Assignment History</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 text-sm font-medium text-gray-500">Assignment</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-500">Due Date</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-500">Score</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-500">Submission Date</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {studentSubmissions.map(({ assignment, report }) => (
                  <tr key={assignment.id} className="hover:bg-slate-50">
                    <td className="py-4">
                      <div>
                        <p className="font-medium text-gray-800">{assignment.title}</p>
                        <p className="text-sm text-gray-500">{assignment.description}</p>
                      </div>
                    </td>
                    <td className="py-4">
                      <span className="text-sm text-gray-600">
                        {new Date(assignment.dueDate).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="py-4">
                      <span className={`font-medium ${
                        report.overallScore >= 90 ? 'text-green-600' :
                        report.overallScore >= 80 ? 'text-indigo-600' :
                        'text-amber-600'
                      }`}>
                        {report.overallScore}/100
                      </span>
                    </td>
                    <td className="py-4">
                      <span className="text-sm text-gray-600">
                        {new Date(report.submittedAt).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="py-4">
                      <button
                        onClick={() => navigate(`/teacher/assignment/${assignment.id}/student/${student.id}`)}
                        className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                      >
                        View Report
                      </button>
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

export default StudentProfile;