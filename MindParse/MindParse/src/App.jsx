import { Toaster } from 'react-hot-toast';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Heii from './pages/heii.jsx';
import Dashboard from './pages/dashboard';
import Quiz from './pages/quiz';
import Summarizer from './pages/summarizer';
import PDFQuestions from './pages/pdfquestions.jsx';
import History from './pages/history';
import Settings from './pages/Settings';
import DoubtSolver from './pages/DoubtSolver.jsx';
import PrivateRoute from "./components/PrivateRoute";
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<Heii />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />

          <Route path="/quiz" element={
            <PrivateRoute>
              <Quiz />
            </PrivateRoute>
          } />

          <Route path="/summarizer" element={
            <PrivateRoute>
              <Summarizer />
            </PrivateRoute>
          } />

          <Route path="/pdf-questions" element={
            <PrivateRoute>
              <PDFQuestions />
            </PrivateRoute>
          } />

          <Route path="/history" element={
            <PrivateRoute>
              <History />
            </PrivateRoute>
          } />

          <Route path="/settings" element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          } />

          <Route path="/doubt-solver" element={
            <PrivateRoute>
              <DoubtSolver />
            </PrivateRoute>
          } />
        </Routes>
      </Router>
      <Toaster position="top-right" />
    </ThemeProvider>
  );
}

export default App;
