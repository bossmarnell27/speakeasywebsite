import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StudentDashboard from '../components/Student/StudentDashboard';
import AssignmentDetails from '../components/Student/AssignmentDetails';
import ReportView from '../components/Student/ReportView';

const StudentPage: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<StudentDashboard />} />
      <Route path="/assignment/:id" element={<AssignmentDetails />} />
      <Route path="/report/:id" element={<ReportView />} />
    </Routes>
  );
};

export default StudentPage;