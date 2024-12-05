import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { theme } from './styles/theme';
import Navbar from './components/Navbar';
import Layout from './components/Layout';
import ChatWidget from './components/ChatWidget';
import Home from './components/Home';
import JobSeekerForm from './components/JobSeekerForm';
import EmployerForm from './components/EmployerForm';
import JobList from './components/JobList';
import InterviewPrep from './components/InterviewPrep';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <Navbar />
          <Layout>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/job-seeker" element={<JobSeekerForm />} />
              <Route path="/employer" element={<EmployerForm />} />
              <Route path="/jobs" element={<JobList />} />
              <Route path="/interview-prep" element={<InterviewPrep />} />
            </Routes>
          </Layout>
          <ChatWidget />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
