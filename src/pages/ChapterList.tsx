import React from 'react';
import { motion } from 'motion/react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Layers, Zap, Wind, FlaskConical } from 'lucide-react';
import { activities } from '../experiments/registry';

export default function ChapterList() {
  const { classLevel, subject } = useParams();
  const navigate = useNavigate();

  // Get unique chapters for the selected class/subject
  const chapters = Array.from(new Set(
    activities
      .filter(a => a.classLevel === classLevel && a.subject === subject)
      .map(a => a.chapter)
  ));

  const chapterIcons: Record<string, any> = {
    'Heat': FlaskConical,
    'Motion': Zap,
    'Electricity & Circuits': Wind,
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-8">
      <div className="container mx-auto">
        <div className="mb-12">
          <button 
            onClick={() => navigate(`/classes/${encodeURIComponent(classLevel || '')}`)}
            className="flex items-center space-x-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Subjects</span>
          </button>
        </div>

        <div className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-3 mb-6 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full"
          >
            <Layers className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Library Catalog</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-6xl md:text-8xl font-black mb-6 tracking-tighter uppercase text-slate-900"
          >
            {subject} <span className="text-primary italic">CHAPTERS</span>
          </motion.h1>
          <div className="h-1 w-32 bg-primary mx-auto mb-8" />
          <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Select a core module from {classLevel} to begin practical discovery.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {chapters.length > 0 ? chapters.map((chapter, i) => (
            <motion.div
              key={chapter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link 
                to={`/classes/${encodeURIComponent(classLevel || '')}/${encodeURIComponent(subject || '')}/${encodeURIComponent(chapter)}`}
                className="group block glass-card p-8 bg-white border-slate-100 hover:shadow-2xl transition-all duration-500"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    {chapterIcons[chapter] ? React.createElement(chapterIcons[chapter], { className: 'w-6 h-6' }) : <BookOpen className="w-6 h-6" />}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Unit 0{i + 1}</span>
                </div>
                
                <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight uppercase line-clamp-1 group-hover:text-primary transition-colors">
                  {chapter}
                </h2>
                
                <div className="flex items-center space-x-3 text-xs font-black uppercase tracking-[0.2em] text-primary">
                  <span>Explore Activities</span>
                  <div className="h-px flex-grow bg-primary/20 group-hover:bg-primary/50 transition-all" />
                </div>
              </Link>
            </motion.div>
          )) : (
            <div className="col-span-full py-20 text-center">
              <BookOpen className="w-16 h-16 text-slate-700 mx-auto mb-6 opacity-50" />
              <p className="text-slate-500 font-black uppercase tracking-widest animate-pulse italic">Awaiting Module Implementation...</p>
              <p className="text-slate-600 text-sm mt-2 max-w-xs mx-auto">New {subject} modules for {classLevel} are being synchronized to the neural database.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
