import { useState } from 'react'

import './index.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Heii from './pages/heii.jsx'
import Dashboard from './pages/dashboard';
import Quiz from './pages/quiz';
import Summarizer from './pages/summarizer';
import PDFQuestions from './pages/pdfquestions.jsx';
import History from './pages/history';
import Settings from './pages/Settings';
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {

  return (
    <ThemeProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Heii />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/summarizer" element={<Summarizer />} />
        <Route path="/pdf-questions" element={<PDFQuestions />} />
        <Route path="/history" element={<History />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
    </ThemeProvider>

  )
}

export default App
