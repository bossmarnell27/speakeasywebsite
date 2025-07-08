import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockAssignments, generateRandomReport } from '../../data/mockData';
import { Play, Clock, ArrowLeft, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AssignmentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const timerRef = useRef<number | null>(null);
  
  const assignment = mockAssignments.find(a => a.id === id);
  
  if (!assignment) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Assignment Not Found</h2>
        <p className="text-gray-600 mb-4">The assignment you're looking for doesn't exist.</p>
        <button 
          onClick={() => navigate('/student')}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const startRecording = () => {
    setIsRecording(true);
    timerRef.current = window.setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setIsRecording(false);
    setSubmitting(true);
    
    // Simulate processing time
    setTimeout(() => {
      if (user) {
        navigate(`/student/report/${assignment.id}`);
      }
    }, 2000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{assignment.title}</h1>
          <p className="text-gray-600 mb-4">{assignment.description}</p>
          
          <div className="flex flex-wrap gap-4">
            <div className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              Time Limit: {assignment.timeLimit} minutes
            </div>
            <div className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm">
              Due: {new Date(assignment.dueDate).toLocaleDateString()}
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Recording Instructions</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Find a quiet location with minimal background noise</li>
              <li>Position yourself so your face and upper body are clearly visible</li>
              <li>Speak clearly and at a natural pace</li>
              <li>Your recording will be limited to {assignment.timeLimit} minutes maximum</li>
              <li>You can re-record if you're not satisfied with your first attempt</li>
            </ul>
          </div>
          
          <div className="bg-slate-800 rounded-lg overflow-hidden relative aspect-video mb-6">
            {submitting ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
                  <p className="text-xl font-semibold">Processing your submission...</p>
                  <p className="text-sm opacity-75">Please wait while we analyze your presentation.</p>
                </div>
              </div>
            ) : (
              <>
                {isRecording ? (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full flex items-center text-sm">
                    <span className="animate-pulse h-3 w-3 bg-white rounded-full mr-2"></span>
                    <span>Recording: {formatTime(recordingTime)}</span>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <div className="mb-4">
                      <Play className="h-12 w-12" />
                    </div>
                    <p className="text-xl font-semibold">Ready to record your presentation</p>
                    <p className="text-sm opacity-75">Click the button below to start recording</p>
                  </div>
                )}
              </>
            )}
          </div>
          
          <div className="flex justify-center">
            {isRecording ? (
              <button
                onClick={stopRecording}
                className="bg-red-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-red-700 transition-colors"
              >
                <span className="h-6 w-6 bg-white rounded-sm"></span>
              </button>
            ) : (
              <button
                onClick={startRecording}
                disabled={submitting}
                className={`${
                  submitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
                } text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg transition-colors`}
              >
                <div className="h-6 w-6 bg-red-500 rounded-full"></div>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentDetails;