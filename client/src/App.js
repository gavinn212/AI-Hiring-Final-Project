import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { theme } from './styles/theme';
import Navbar from './components/Navbar';
import Home from './components/Home';
import JobSeekerForm from './components/JobSeekerForm';
import EmployerForm from './components/EmployerForm';
import JobList from './components/JobList';
import InterviewPrep from './components/InterviewPrep';
import SkillAssessment from './components/SkillAssessment';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/job-seeker" element={<JobSeekerForm />} />
              <Route path="/employer" element={<EmployerForm />} />
              <Route path="/jobs" element={<JobList />} />
              <Route path="/interview-prep" element={<InterviewPrep />} />
              <Route path="/skill-assessment" element={<SkillAssessment />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
