import React from 'react';
import { motion } from 'motion/react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Beaker, Binary, ArrowLeft, ArrowRight } from 'lucide-react';

const subjects = [
  { id: 'Science', icon: Beaker, color: 'text-cyan-400', bg: 'bg-cyan-400/10', border: 'hover:border-cyan-400/50' },
  { id: 'Mathematics', icon: Binary, color: 'text-indigo-400', bg: 'bg-indigo-400/10', border: 'hover:border-indigo-400/50' },
];

export default function SubjectSelection() {
  const { classLevel } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-32 pb-20 px-8">
      <div className="container mx-auto">
        <div className="mb-12">
          <button 
            onClick={() => navigate('/classes')}
            className="flex items-center space-x-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Tiers</span>
          </button>
        </div>

        <div className="mb-20 text-center">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-6xl md:text-8xl font-black mb-6 tracking-tighter uppercase text-slate-900"
          >
            {classLevel} <span className="text-primary italic">STREAMS</span>
          </motion.h1>
          <div className="h-1 w-32 bg-primary mx-auto mb-8" />
          <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Select the primary scientific stream to access categorized laboratory modules.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {subjects.map((sub, i) => (
            <motion.div
              key={sub.id}
              initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link 
                to={`/classes/${encodeURIComponent(classLevel || '')}/${sub.id}`}
                className={`group block glass-card p-12 relative overflow-hidden transition-all bg-white border-slate-100 hover:shadow-2xl duration-500 ${sub.border}`}
              >
                <div className={`absolute top-0 right-0 -m-8 w-40 h-40 ${sub.bg} rounded-full blur-[60px] group-hover:scale-110 transition-transform duration-700`} />
                
                <div className="relative z-10 text-center">
                  <div className={`w-24 h-24 mx-auto ${sub.bg} border border-slate-100 rounded-3xl flex items-center justify-center ${sub.color} mb-10 group-hover:scale-110 transition-all duration-500`}>
                    <sub.icon className="w-12 h-12" />
                  </div>
                  
                  <h2 className="text-4xl font-black text-slate-900 mb-6 uppercase tracking-tight group-hover:text-primary transition-colors">
                    {sub.id}
                  </h2>
                  
                  <div className="flex items-center justify-center space-x-3 text-xs font-black uppercase tracking-[0.3em] text-slate-400 group-hover:text-primary transition-colors">
                    <span>Access Stream</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
