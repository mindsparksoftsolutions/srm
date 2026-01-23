import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import RegisterPage from './pages/RegisterPage';
import StudentsPage from './pages/StudentsPage';
import CollegeRegisterPage from './pages/CollegeRegisterPage';
import CollegeStudentsPage from './pages/CollegeStudentsPage';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<RegisterPage />} />
          <Route path="/students" element={<StudentsPage />} />
          <Route path="/college-register" element={<CollegeRegisterPage />} />
          <Route path="/college-students" element={<CollegeStudentsPage />} />
          <Route path="/college-register-list" element={<CollegeStudentsPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
