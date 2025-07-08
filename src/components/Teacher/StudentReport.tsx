import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockAssignments, mockStudents, mockReports } from '../../data/mockData';
import { ArrowLeft, Play, Pause, User } from 'lucide-react';

const StudentReport: React.FC = () => {
  const { assignmentId, studentId } = useParams<{ assignmentId: string, studentId: string }>();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  
  const assignment = mockAssignments.find(a => a.id === assignmentId);
  const student = mockStudents.find(s => s.id === studentId);
  const report = mockReports.find(r => r.assignmentId === assignmentId && r.studentId === studentId) || mockReports[0];
  
  if (!assignment || !student || !report) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Report Not Found</h2>
        <p className="text-gray-600 mb-4">The report you're looking for doesn't exist.</p>
        <button 
          onClick={() => navigate('/teacher')}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

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
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center mb-2">
                <img 
                  src={`https://i.pravatar.cc/40?u=${student.id}`} 
                  alt={student.name} 
                  className="w-10 h-10 rounded-full mr-3" 
                />
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{student.name}</h2>
                  <p className="text-sm text-gray-600">Grade {student.grade} • Average: {student.averageScore}%</p>
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-800">{assignment.title} - Report</h1>
            </div>
            <div className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-lg text-xl font-bold">
              {report.overallScore}/100
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="grid grid-cols-1 gap-4">
                <div className="border border-slate-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-gray-800">Tone</h3>
                    <span className="text-indigo-600 font-bold">{report.tone.score}/100</span>
                  </div>
                  <p className="text-gray-600">{report.tone.feedback}</p>
                </div>
                
                <div className="border border-slate-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-gray-800">Rhythm</h3>
                    <span className="text-indigo-600 font-bold">{report.rhythm.score}/100</span>
                  </div>
                  <p className="text-gray-600">{report.rhythm.feedback}</p>
                </div>
                
                <div className="border border-slate-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-gray-800">Body Language</h3>
                    <span className="text-indigo-600 font-bold">{report.bodyLanguage.score}/100</span>
                  </div>
                  <p className="text-gray-600">{report.bodyLanguage.feedback}</p>
                </div>
                
                <div className="border border-slate-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Filler Word Count</h3>
                  <div className="flex flex-wrap gap-3">
                    <span className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm">
                      um {report.fillerWords.um}x
                    </span>
                    <span className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-sm">
                      like {report.fillerWords.like}x
                    </span>
                    <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                      you know {report.fillerWords.youKnow}x
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="font-semibold text-gray-800 mb-2">Teacher Feedback</h3>
                <textarea 
                  className="w-full border border-slate-200 rounded-lg p-3 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Add your feedback for this student..."
                ></textarea>
                <div className="mt-2 flex justify-end">
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
                    Save Feedback
                  </button>
                </div>
              </div>
            </div>
            
            <div>
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <div className="bg-slate-800 aspect-video relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      onClick={togglePlayback}
                      className="bg-white/20 hover:bg-white/30 rounded-full w-12 h-12 flex items-center justify-center transition-colors"
                    >
                      {isPlaying ? <Pause className="h-6 w-6 text-white" /> : <Play className="h-6 w-6 text-white" />}
                    </button>
                  </div>
                </div>
                <div className="p-3 border-t border-slate-200">
                  <h3 className="font-semibold text-gray-800">Student Recording</h3>
                  <p className="text-xs text-gray-500">Submitted on {new Date(report.submittedAt).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="font-semibold text-gray-800 mb-2">Student Performance Trend</h3>
                <div className="h-40 border border-slate-200 rounded-lg p-3">
                  <div className="h-full flex items-end">
                    <div className="flex-1 flex items-end justify-around h-full">
                      <div className="flex flex-col items-center">
                        <div className="bg-indigo-600 w-8 rounded-t-sm" style={{ height: '30%' }}></div>
                        <p className="text-xs mt-1">Apr</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="bg-indigo-600 w-8 rounded-t-sm" style={{ height: '50%' }}></div>
                        <p className="text-xs mt-1">May</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="bg-indigo-600 w-8 rounded-t-sm" style={{ height: '40%' }}></div>
                        <p className="text-xs mt-1">Jun</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="bg-indigo-600 w-8 rounded-t-sm" style={{ height: '70%' }}></div>
                        <p className="text-xs mt-1">Jul</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="bg-indigo-600 w-8 rounded-t-sm" style={{ height: '60%' }}></div>
                        <p className="text-xs mt-1">Aug</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentReport;