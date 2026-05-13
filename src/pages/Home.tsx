import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Atom, Zap, Microscope, Boxes, ArrowRight, TrendingUp, Users, Award, GraduationCap, Binary, Beaker } from 'lucide-react';
import { activities } from '../experiments/registry';
import ActivityCard from '../components/shared/ActivityCard';

export default function Home() {
  const featuredActivities = activities.slice(0, 4);

  const classCards = [
    { level: 'Class 6', subject: 'Foundations', color: 'text-emerald-500' },
    { level: 'Class 7', subject: 'Phenomena', color: 'text-cyan-500' },
    { level: 'Class 8', subject: 'Principles', color: 'text-indigo-500' },
    { level: 'Class 9', subject: 'Advanced', color: 'text-purple-500' },
    { level: 'Class 10', subject: 'Professional', color: 'text-rose-500' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-10 px-10 flex flex-col">
      <div className="flex-grow grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left: Identity & CTA */}
        <div className="lg:col-span-5 flex flex-col justify-center py-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1 bg-white border border-slate-200 rounded-lg text-[9px] font-black uppercase tracking-[0.4em] text-primary mb-6 shadow-sm">
              Laboratory Protocol / 2026
            </span>
            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter leading-tight uppercase text-slate-900">
              STUDY<br />
              <span className="text-primary italic">PRACTICAL</span>
            </h1>
            <p className="text-sm text-slate-400 max-w-sm mb-10 font-medium leading-relaxed">
              Precision-engineered simulations for educational synthesis. Bridge the gap between theory and industrial application.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/classes"
                className="px-8 py-4 bg-primary text-white font-black rounded-2xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center space-x-3 uppercase tracking-widest text-[10px]"
              >
                <span>Enter Hub</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/activity/factory-tank-expansion"
                className="px-8 py-4 bg-white text-slate-900 font-black rounded-2xl hover:bg-slate-50 transition-all uppercase tracking-widest text-[10px] border border-slate-200 shadow-sm"
              >
                Quick Sync
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Right: Data & Navigation */}
        <div className="lg:col-span-7 flex flex-col space-y-10 min-h-0">
          
          {/* Academic Grid */}
          <div className="flex-shrink-0">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">Academic Tiers</h2>
              <div className="h-px bg-slate-200 flex-1 ml-6" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {classCards.map((card, i) => (
                <motion.div
                  key={card.level}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link 
                    to={`/classes/${encodeURIComponent(card.level)}`}
                    className="group bg-white border border-slate-200 p-6 rounded-2xl flex flex-col items-center hover:border-primary hover:shadow-xl transition-all duration-300"
                  >
                    <div className={`w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all ${card.color}`}>
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-black text-slate-900 uppercase tracking-tighter">{card.level}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Activity Feed */}
          <div className="flex-1 min-h-0 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">Active Plots</h2>
              <div className="h-px bg-slate-200 flex-1 ml-6" />
            </div>
            <div className="grid grid-cols-2 gap-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
              {featuredActivities.map((activity, i) => (
                <ActivityCard key={activity.id} activity={activity} index={i} />
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
