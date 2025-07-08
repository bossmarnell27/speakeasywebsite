import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockAssignments, mockReports, generateRandomReport } from '../../data/mockData';
import { ArrowLeft, Play, Pause, RefreshCw } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const ReportView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isPlaying, setIsPlaying] = useState(false);
  const [report, setReport] = useState(
    mockReports.find(r => r.assignmentId === id) || 
    (user && generateRandomReport(id || '', user.id))
  );
  
  const assignment = mockAssignments.find(a => a.id === id);
  
  if (!assignment || !report) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Report Not Found</h2>
        <p className="text-gray-600 mb-4">The report you're looking for doesn't exist.</p>
        <button 
          onClick={() => navigate('/student')}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const handleReRecord = () => {
    navigate(`/student/assignment/${id}`);
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={() => navigate('/student')}
        className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Assignments
      </button>
      
      <div className="bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden">
        <div className="border-b border-slate-200 p-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">{assignment.title} - Report</h1>
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
                <button
                  onClick={handleReRecord}
                  className="flex items-center justify-center w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <RefreshCw className="h-5 w-5 mr-2" />
                  Re-record Submission
                </button>
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
                  <h3 className="font-semibold text-gray-800">Your Recording</h3>
                  <p className="text-xs text-gray-500">Submitted on {new Date(report.submittedAt).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="font-semibold text-gray-800 mb-2">Key Improvement Areas</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="bg-indigo-100 text-indigo-600 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
                    <span className="text-gray-600">Reduce filler words, especially "um"</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-indigo-100 text-indigo-600 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
                    <span className="text-gray-600">Maintain consistent volume throughout</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-indigo-100 text-indigo-600 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
                    <span className="text-gray-600">Use more hand gestures to emphasize points</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportView;