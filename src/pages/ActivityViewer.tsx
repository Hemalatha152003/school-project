import React, { useState } from 'react';
import { useParams, Navigate, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, FlaskConical, Target, 
  Wrench, ListChecks, Activity, Share2, 
  HelpCircle, CheckCircle2, RotateCcw, Play, Pause,
  Eye, Zap
} from 'lucide-react';
import { activities } from '../experiments/registry';
import P5Wrapper from '../components/shared/P5Wrapper';
import { thermalExpansionSketch } from '../experiments/thermal-expansion/sketch';
import { factoryTankSketch } from '../experiments/factory-tank/sketch';
import { engineCoolingSketch } from '../experiments/engine-cooling/sketch';
import { speedVsVelocitySketch } from '../experiments/speed-vs-velocity/sketch';
import { electricCircuitsSketch } from '../experiments/electric-circuits/sketch';

// Mapping slugs to sketches
const sketchMap: Record<string, any> = {
  'thermal-expansion-liquids': thermalExpansionSketch,
  'factory-tank-expansion': factoryTankSketch,
  'engine-cooling-system': engineCoolingSketch,
  'speed-vs-velocity': speedVsVelocitySketch,
  'electric-circuits': electricCircuitsSketch,
};

export default function ActivityViewer() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const activity = activities.find(a => a.slug === slug);
  const [activeTab, setActiveTab] = useState<'protocol' | 'simulation' | 'quiz'>('protocol');
  const [isHeating, setIsHeating] = useState(false);
  const [quizScores, setQuizScores] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  if (!activity) return <Navigate to="/classes" />;

  const tabs = [
    { id: 'protocol', name: 'Protocol', icon: ListChecks },
    { id: 'simulation', name: 'Live Simulation', icon: Activity },
    { id: 'quiz', name: 'Final Quiz', icon: HelpCircle },
  ];

  const handleQuizAnswer = (questionIndex: number, optionIndex: number) => {
    setQuizScores(prev => ({ ...prev, [questionIndex]: optionIndex }));
  };

  const backUrl = `/classes/${encodeURIComponent(activity.classLevel)}/${encodeURIComponent(activity.subject)}/${encodeURIComponent(activity.chapter)}`;

  return (
    <div className="h-screen bg-slate-50 flex flex-col overflow-hidden selection:bg-primary/30 selection:text-primary-foreground">
      {/* Header - Compact */}
      <header className="bg-white border-b border-slate-200 z-40 flex-shrink-0">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate(backUrl)}
              className="p-2 bg-slate-100 border border-slate-200 rounded-xl hover:bg-slate-200 transition-all group"
            >
              <ArrowLeft className="h-4 w-4 text-slate-500" />
            </button>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[8px] font-black uppercase tracking-[0.2em] text-primary">Operational Module</span>
                <span className="text-[8px] text-slate-300">•</span>
                <span className="text-[8px] text-slate-400 uppercase tracking-widest">{activity.classLevel}</span>
              </div>
              <h1 className="text-sm font-black tracking-tight text-slate-900 uppercase leading-none">{activity.title}</h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right hidden sm:block">
              <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Efficiency</p>
              <p className="text-[10px] font-black text-primary">99.9% SYNC</p>
            </div>
            <button className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all">
              <Share2 className="h-4 w-4 text-slate-400" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 min-h-0 container mx-auto px-6 py-6 overflow-hidden">
        <div className="grid lg:grid-cols-12 gap-6 h-full min-h-0">
          
          {/* Main Content Area */}
          <div className="lg:col-span-9 flex flex-col min-h-0">
            {/* Tabs - Compact */}
            <div className="flex space-x-2 bg-slate-200/50 p-1 rounded-xl mb-4 border border-slate-200 w-fit">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-6 py-2 text-[9px] font-black uppercase tracking-widest rounded-lg transition-all ${
                    activeTab === tab.id 
                      ? 'bg-white text-primary shadow-sm border border-slate-200' 
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <tab.icon className="h-3 w-3" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>

            {/* Tab Content - Scrollable if needed, but intended to fit */}
            <div className="flex-1 min-h-0 relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="h-full"
                >
                  {activeTab === 'protocol' && (
                    <div className="h-full overflow-y-auto pr-2 space-y-4 custom-scrollbar">
                      {/* Aim & Objective */}
                      <section className="bg-white border border-slate-200 p-6 rounded-2xl">
                        <div className="text-[8px] font-black text-primary uppercase tracking-[0.4em] mb-4 flex items-center space-x-2">
                          <Target className="h-3 w-3" />
                          <span>Objective</span>
                        </div>
                        <p className="text-lg text-slate-700 font-bold leading-tight italic border-l-2 border-primary pl-4">
                          "{activity.aim}"
                        </p>
                      </section>

                      <div className="grid grid-cols-2 gap-4">
                        {/* Materials */}
                        <section className="bg-white border border-slate-200 p-6 rounded-2xl">
                          <div className="text-[8px] font-black text-primary uppercase tracking-[0.4em] mb-4 flex items-center space-x-2">
                            <Wrench className="h-3 w-3" />
                            <span>Materials</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {activity.materials.map((m, i) => (
                              <span key={i} className="px-3 py-1.5 bg-slate-50 text-[10px] font-bold text-slate-500 rounded-lg border border-slate-100">
                                {m}
                              </span>
                            ))}
                          </div>
                        </section>

                        {/* Observation/Result */}
                        <section className="bg-white border border-slate-200 p-6 rounded-2xl">
                          <div className="text-[8px] font-black text-primary uppercase tracking-[0.4em] mb-4 flex items-center space-x-2">
                            <Eye className="h-3 w-3" />
                            <span>Observation</span>
                          </div>
                          <p className="text-[11px] text-slate-500 leading-relaxed italic">{activity.observation}</p>
                        </section>
                      </div>

                      {/* Procedure */}
                      <section className="bg-white border border-slate-200 p-6 rounded-2xl">
                        <div className="text-[8px] font-black text-primary uppercase tracking-[0.4em] mb-6 flex items-center space-x-2">
                          <ListChecks className="h-3 w-3" />
                          <span>Procedure</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {activity.procedure.map((p, i) => (
                            <div key={i} className="flex gap-4 items-start">
                              <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-400 border border-slate-200">{i + 1}</span>
                              <p className="text-[11px] text-slate-600 font-medium leading-tight">{p}</p>
                            </div>
                          ))}
                        </div>
                      </section>
                    </div>
                  )}

                  {activeTab === 'simulation' && (
                    <div className="h-full flex flex-col space-y-4">
                      <div className="flex-1 bg-white border border-slate-200 rounded-3xl overflow-hidden relative shadow-sm">
                        <div className="absolute top-4 left-4 z-10 flex gap-2">
                          <div className="px-3 py-1 bg-white/90 border border-slate-200 rounded-lg text-[8px] font-black uppercase tracking-widest text-slate-400">P5.js Engine</div>
                          {isHeating && (
                            <div className="px-3 py-1 bg-red-50 text-red-600 border border-red-100 rounded-lg text-[8px] font-black uppercase tracking-widest animate-pulse">Thermal Active</div>
                          )}
                        </div>
                        
                        <div className="w-full h-full">
                          {sketchMap[activity.slug] ? (
                            <P5Wrapper sketch={sketchMap[activity.slug]} options={{ isHeating }} />
                          ) : (
                            <div className="h-full flex items-center justify-center">
                              <p className="text-xs text-slate-300 font-black uppercase tracking-[0.3em]">Initializing Simulation...</p>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="bg-white border border-slate-200 p-4 rounded-2xl flex items-center justify-between flex-shrink-0">
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => setIsHeating(!isHeating)}
                            className={`flex items-center space-x-3 px-8 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all shadow-md ${
                              isHeating ? 'bg-red-600 text-white' : 'bg-primary text-white'
                            }`}
                          >
                            {isHeating ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                            <span>{isHeating ? 'End Process' : 'Start Experiment'}</span>
                          </button>
                          <button 
                            onClick={() => setIsHeating(false)}
                            className="p-3 bg-slate-100 text-slate-400 rounded-xl hover:bg-slate-200 transition-all border border-slate-200"
                          >
                            <RotateCcw className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Telemetry Status</p>
                          <div className="flex items-center space-x-2">
                            <span className="text-[10px] font-black text-slate-900 uppercase">Operational</span>
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'quiz' && (
                    <div className="h-full bg-white border border-slate-200 p-8 rounded-2xl overflow-y-auto custom-scrollbar">
                      <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">Audit <span className="text-primary italic">Protocol</span></h2>
                        <span className="text-[9px] font-black text-slate-400 uppercase p-2 bg-slate-50 rounded-lg">{activity.quiz.length} Units</span>
                      </div>
                      <div className="space-y-10">
                        {activity.quiz.map((q, i) => (
                          <div key={i} className="space-y-4">
                            <p className="text-sm font-black text-slate-900 uppercase tracking-tight">{i + 1}. {q.question}</p>
                            <div className="grid grid-cols-2 gap-3">
                              {q.options.map((option, j) => (
                                <button
                                  key={j}
                                  onClick={() => handleQuizAnswer(i, j)}
                                  className={`text-left px-6 py-3 rounded-xl border transition-all text-xs font-bold ${
                                    quizScores[i] === j
                                      ? 'bg-primary text-white border-primary shadow-md'
                                      : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-white hover:border-primary/20'
                                  }`}
                                >
                                  {option}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      <button 
                        onClick={() => setShowResults(!showResults)}
                        className="w-full py-4 bg-slate-900 text-white font-black uppercase tracking-[0.5em] text-[10px] rounded-xl hover:bg-primary transition-all mt-10"
                      >
                        {showResults ? 'Clear Results' : 'Finalize Audit'}
                      </button>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Sidebar - Compact and Scrollable if needed */}
          <div className="lg:col-span-3 h-full overflow-y-auto pr-2 space-y-6 custom-scrollbar pb-6">
            <div className="bg-white border border-slate-200 p-6 rounded-2xl group transition-all hover:shadow-lg">
              <h3 className="text-[8px] font-black uppercase tracking-[0.4em] mb-6 flex items-center space-x-2 text-indigo-600">
                <Zap className="h-4 w-4" />
                <span>Spotlight</span>
              </h3>
              <div className="space-y-4">
                {activity.realWorldApps.map((app, i) => (
                  <p key={i} className="text-[10px] text-slate-500 font-bold leading-relaxed border-l-2 border-indigo-100 pl-4">{app}</p>
                ))}
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-6 rounded-2xl">
              <h3 className="text-[8px] font-black uppercase tracking-[0.4em] mb-6 text-primary">Metrics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="font-bold text-slate-400 uppercase tracking-widest text-[8px]">Complexity</span>
                  <span className="font-black text-slate-900">{activity.difficulty}</span>
                </div>
                <div className="flex justify-between items-center text-[10px]">
                  <span className="font-bold text-slate-400 uppercase tracking-widest text-[8px]">Category</span>
                  <span className="font-black text-slate-900">{activity.category}</span>
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: '85%' }} className="h-full bg-primary" />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-[8px] font-black uppercase tracking-[0.4em] text-slate-400 ml-2">Sequential</h3>
              {activities.filter(a => a.slug !== slug && a.classLevel === activity.classLevel).slice(0, 2).map((a) => (
                <Link key={a.id} to={`/activity/${a.slug}`} className="flex items-center space-x-3 p-3 bg-white border border-slate-100 rounded-xl hover:border-primary/20 hover:shadow-md transition-all group">
                  <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-slate-50">
                    <img src={a.thumbnail} className="w-full h-full object-cover" alt="" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-[9px] font-black text-slate-900 line-clamp-1 uppercase leading-none mb-1">{a.title}</h4>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{a.category}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
