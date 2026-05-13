import React from 'react';
import { motion } from 'motion/react';
import { useParams, useNavigate } from 'react-router-dom';
import { Search, ArrowLeft, Target, Play } from 'lucide-react';
import { activities } from '../experiments/registry';
import ActivityCard from '../components/shared/ActivityCard';

export default function ActivityList() {
  const { classLevel, subject, chapter } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredActivities = activities.filter((activity) => {
    const matchesFilters = 
      activity.classLevel === classLevel && 
      activity.subject === subject && 
      activity.chapter === chapter;
    
    const matchesSearch = 
      activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.aim.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilters && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-32 pb-20 px-8">
      <div className="container mx-auto">
        <div className="mb-12">
          <button 
            onClick={() => navigate(`/classes/${encodeURIComponent(classLevel || '')}/${encodeURIComponent(subject || '')}`)}
            className="flex items-center space-x-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Unit Index</span>
          </button>
        </div>

        {/* Header */}
        <div className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-3 mb-6 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full"
          >
            <Target className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">{chapter} Prototypes</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-6xl md:text-8xl font-black mb-6 tracking-tighter uppercase text-slate-900"
          >
            PRACTICAL <span className="text-primary italic">MODULES</span>
          </motion.h1>
          <div className="h-1 w-32 bg-primary mx-auto mb-8" />
          <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Select an active simulation to begin observation and data acquisition within the {chapter} framework.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 mb-20 items-center justify-between">
          <div className="relative w-full lg:max-w-xl group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Query Active Simulations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-16 pr-8 py-5 bg-white border border-slate-100 rounded-[30px] focus:ring-2 focus:ring-primary/20 focus:border-primary/50 outline-none transition-all shadow-xl text-slate-900 font-medium placeholder:text-slate-300"
            />
          </div>
          
          <div className="flex items-center space-x-4 px-6 py-3 bg-white border border-slate-100 rounded-2xl shadow-sm">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">System Ready: {filteredActivities.length} Modules Online</span>
          </div>
        </div>

        {/* Results */}
        {filteredActivities.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredActivities.map((activity, i) => (
              <ActivityCard key={activity.id} activity={activity} index={i} />
            ))}
          </div>
        ) : (
          <div className="py-32 text-center">
            <div className="inline-flex h-24 w-24 items-center justify-center rounded-[30px] bg-slate-50 border border-slate-100 mb-8">
              <Play className="h-10 w-10 text-slate-300" />
            </div>
            <h3 className="text-3xl font-black mb-4 text-slate-900 uppercase tracking-tighter">Null Result</h3>
            <p className="text-slate-500 font-medium font-mono uppercase tracking-widest text-xs">No practical modules found for your current filter parameters.</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-10 px-8 py-4 bg-white text-primary font-black uppercase tracking-widest text-xs rounded-xl hover:shadow-lg transition-all border border-slate-100"
            >
              Reset Query
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
