import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import RegisterPage from './pages/RegisterPage';
import StudentsPage from './pages/StudentsPage';
import CollegeRegisterPage from './pages/CollegeRegisterPage';
import CollegeStudentsPage from './pages/CollegeStudentsPage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/PrivateRoute';
import AdminSetupPage from './pages/AdminSetupPage';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<RegisterPage />} />
          <Route path="/college-register" element={<CollegeRegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Admin & SuperAdmin Routes */}
          <Route element={<PrivateRoute allowedRoles={['Admin', 'SuperAdmin']} />}>
            <Route path="/students" element={<StudentsPage />} />
            <Route path="/college-students" element={<CollegeStudentsPage />} />
            <Route path="/college-register-list" element={<CollegeStudentsPage />} />
          </Route>

          {/* SuperAdmin Only Routes */}
          <Route element={<PrivateRoute allowedRoles={['SuperAdmin']} />}>
            <Route path="/admin/events" element={<AdminSetupPage />} />
          </Route>
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
