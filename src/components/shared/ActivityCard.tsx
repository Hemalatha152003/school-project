import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Play, ArrowRight, BookOpen } from 'lucide-react';
import { Activity } from '../../types';

interface ActivityCardProps {
  activity: Activity;
  index: number;
  key?: string | number;
}

export default function ActivityCard({ activity, index }: ActivityCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className="group relative glass-card h-full flex flex-col bg-white border-slate-100"
    >
      <div className="relative aspect-video overflow-hidden rounded-2xl mb-6">
        <img
          src={activity.thumbnail}
          alt={activity.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-60" />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] bg-primary text-white rounded-lg shadow-lg shadow-primary/20">
            {activity.classLevel}
          </span>
          <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] bg-white/80 text-slate-900 rounded-lg border border-slate-200 backdrop-blur-md">
            {activity.category}
          </span>
        </div>
      </div>
      
      <div className="flex items-center gap-2 mb-2">
        <BookOpen className="w-3 h-3 text-primary" />
        <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400">
          {activity.chapter}
        </span>
      </div>

      <h3 className="text-xl font-bold mb-3 text-slate-900 group-hover:text-primary transition-colors tracking-tight">
        {activity.title}
      </h3>
      
      <p className="text-sm text-slate-500 mb-8 line-clamp-2 leading-relaxed font-medium">
        {activity.aim}
      </p>

      <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
        <Link
          to={`/activity/${activity.slug}`}
          className="flex items-center space-x-2 text-xs font-black uppercase tracking-widest text-primary hover:text-cyan-600 transition-colors"
        >
          <span>Initialize Simulation</span>
          <ArrowRight className="h-3 w-3" />
        </Link>
        <div className="h-10 w-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
          <Play className="h-4 w-4 fill-current" />
        </div>
      </div>
    </motion.div>
  );
}
