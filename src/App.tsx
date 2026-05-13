import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import { ThemeProvider } from './components/shared/ThemeContext';
import Home from './pages/Home';
import ActivityList from './pages/ActivityList';
import ActivityViewer from './pages/ActivityViewer';
import ClassSelection from './pages/ClassSelection';
import SubjectSelection from './pages/SubjectSelection';
import ChapterList from './pages/ChapterList';

// Placeholder pages
const About = () => <div className="min-h-screen flex items-center justify-center font-black uppercase tracking-widest text-slate-500">About Matrix Coming Soon</div>;
const Contact = () => <div className="min-h-screen flex items-center justify-center font-black uppercase tracking-widest text-slate-500">Communication Hub Coming Soon</div>;
const Dashboard = () => <div className="min-h-screen flex items-center justify-center font-black uppercase tracking-widest text-slate-500">Student Neural Profile Coming Soon</div>;

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-300 relative overflow-hidden selection:bg-primary selection:text-black">
          {/* Background Decorations */}
          <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse" />
          <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

          <Navbar />
          <main className="flex-grow relative z-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/classes" element={<ClassSelection />} />
              <Route path="/classes/:classLevel" element={<SubjectSelection />} />
              <Route path="/classes/:classLevel/:subject" element={<ChapterList />} />
              <Route path="/classes/:classLevel/:subject/:chapter" element={<ActivityList />} />
              <Route path="/activity/:slug" element={<ActivityViewer />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </main>
          
          <footer className="border-t border-slate-100 py-20 bg-slate-50 backdrop-blur-3xl">
            <div className="container mx-auto px-8">
              <div className="grid md:grid-cols-2 gap-12 items-center text-center md:text-left">
                <div>
                  <span className="text-3xl font-black tracking-tighter text-slate-900 uppercase italic">
                    EDU<span className="text-primary not-italic">MATRIX</span>
                  </span>
                  <p className="text-slate-500 mt-4 font-medium max-w-sm ml-auto mr-auto md:ml-0 md:mr-0">
                    A high-fidelity scientific discovery engine designed for the next generation of engineers and scientists.
                  </p>
                </div>
                <div className="flex flex-col md:items-end justify-center space-y-6">
                  <div className="flex justify-center md:justify-end space-x-10 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                    <a href="#" className="hover:text-primary transition-colors">Privacy Neural Protocol</a>
                    <a href="#" className="hover:text-primary transition-colors">Terms of Operations</a>
                  </div>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                    © 2026 EDUMATRIX SYSTEMS. ALL RIGHTS RESERVED.
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </ThemeProvider>
  );
}
