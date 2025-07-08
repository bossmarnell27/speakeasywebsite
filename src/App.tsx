import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Layout/Header';
import RoleSelector from './components/Login/RoleSelector';
import StudentPage from './pages/StudentPage';
import TeacherPage from './pages/TeacherPage';

const AppRoutes = () => {
  const { role } = useAuth();

  if (!role) {
    return <RoleSelector />;
  }

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/student/*" element={<StudentPage />} />
          <Route path="/teacher/*" element={<TeacherPage />} />
          <Route path="/" element={
            <Navigate to={role === 'student' ? '/student' : '/teacher'} replace />
          } />
        </Routes>
      </main>
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-slate-50">
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;