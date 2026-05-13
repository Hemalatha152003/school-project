import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { GraduationCap, ArrowRight } from 'lucide-react';

const classes = [
  { id: 'Class 6', name: 'Grade 6', description: 'Foundation principles and basic observations.' },
  { id: 'Class 7', name: 'Grade 7', description: 'Exploring natural phenomena and simple machines.' },
  { id: 'Class 8', name: 'Grade 8', description: 'Deepening scientific inquiry and structural basics.' },
  { id: 'Class 9', name: 'Grade 9', description: 'Advanced physics, chemistry, and life sciences.' },
  { id: 'Class 10', name: 'Grade 10', description: 'Professional laboratory modules and board prep.' },
];

export default function ClassSelection() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-8">
      <div className="container mx-auto">
        <div className="mb-20 text-center">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-6xl md:text-8xl font-black mb-6 tracking-tighter uppercase text-slate-900"
          >
            SELECT <span className="text-primary italic">LEVEL</span>
          </motion.h1>
          <div className="h-1 w-32 bg-primary mx-auto mb-8" />
          <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Choose your academic tier to initialize class-specific scientific modules.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {classes.map((cls, i) => (
            <motion.div
              key={cls.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link 
                to={`/classes/${encodeURIComponent(cls.id)}`}
                className="group block glass-card p-10 relative overflow-hidden h-full bg-white border-slate-100 hover:shadow-2xl transition-all duration-500"
              >
                <div className="absolute top-0 right-0 -m-8 w-32 h-32 bg-primary/5 rounded-full blur-[40px] group-hover:bg-primary/10 transition-all duration-700" />
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all">
                    <GraduationCap className="w-8 h-8" />
                  </div>
                  
                  <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight uppercase group-hover:text-primary transition-colors">
                    {cls.name}
                  </h2>
                  <p className="text-slate-500 font-medium leading-relaxed mb-8">
                    {cls.description}
                  </p>
                  
                  <div className="flex items-center space-x-3 text-xs font-black uppercase tracking-[0.2em] text-primary">
                    <span>Initialize Tier</span>
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
