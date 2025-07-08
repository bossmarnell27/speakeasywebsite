import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TeacherDashboard from '../components/Teacher/TeacherDashboard';
import TeacherAssignmentView from '../components/Teacher/TeacherAssignmentView';
import StudentReport from '../components/Teacher/StudentReport';
import StudentProfile from '../components/Teacher/StudentProfile';

const TeacherPage: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<TeacherDashboard />} />
      <Route path="/assignment/:id" element={<TeacherAssignmentView />} />
      <Route path="/assignment/:assignmentId/student/:studentId" element={<StudentReport />} />
      <Route path="/student/:studentId" element={<StudentProfile />} />
    </Routes>
  );
};

export default TeacherPage;