import React, { useState, useEffect } from 'react';
import { Terminal } from './components/Terminal';
import { ChallengesPanel } from './components/ChallengesPanel';
import { ProgressTracker } from './components/ProgressTracker';
import { ManualModal } from './components/ManualModal';
import { Cloud, Github, Layout, HelpCircle, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

function App() {
    const [isManualOpen, setIsManualOpen] = useState(false);

    useEffect(() => {
        const hasSeenManual = localStorage.getItem('was_manual_seen');
        if (!hasSeenManual) {
            setIsManualOpen(true);
            localStorage.setItem('was_manual_seen', 'true');
        }
    }, []);

    return (
        <div className="h-screen flex flex-col bg-[#020617] text-slate-100 overflow-hidden">
            <ManualModal isOpen={isManualOpen} onClose={() => setIsManualOpen(false)} />

            {/* Navbar */}
            <header className="h-20 border-b border-white/5 flex items-center justify-between px-10 bg-slate-950/20 backdrop-blur-xl sticky top-0 z-50">
                <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-2.5 rounded-2xl shadow-lg shadow-orange-500/20">
                        <Cloud className="text-white w-7 h-7" />
                    </div>
                    <h1 className="text-2xl font-black tracking-tight tracking-tighter">
                        AWS CLI <span className="text-orange-500">PLAYGROUND</span>
                    </h1>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsManualOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full text-sm font-bold border border-white/5 transition-all text-slate-300 hover:text-white"
                    >
                        <HelpCircle className="w-4 h-4" />
                        ¿Cómo Jugar?
                    </button>
                    <div className="w-px h-6 bg-white/10 mx-2" />
                    <a href="#" className="p-2 bg-white/5 hover:bg-white/10 rounded-full border border-white/5 transition-all text-slate-300 hover:text-white">
                        <Github className="w-5 h-5" />
                    </a>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex overflow-hidden p-8 gap-8">
                {/* Left Side: Terminal */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex-1 flex flex-col gap-6"
                >
                    <div className="flex items-center justify-between px-2">
                        <div className="flex items-center gap-3">
                            <div className="flex gap-1.5 px-3 py-1.5 bg-white/5 rounded-full border border-white/5">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80 animate-pulse" />
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                            </div>
                            <span className="text-xs text-slate-500 font-black uppercase tracking-[.3em]">Console Instance: running</span>
                        </div>
                        <div className="flex items-center gap-2 text-orange-500/80 text-xs font-black uppercase tracking-widest">
                            <Zap className="w-4 h-4" />
                            <span>Simulated Environment</span>
                        </div>
                    </div>
                    <Terminal />
                </motion.div>

                {/* Right Side: Challenges & Stats */}
                <motion.aside
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-[400px] flex flex-col gap-8"
                >
                    <ProgressTracker />
                    <div className="flex-1 glass-morphism rounded-3xl p-6 border border-white/5 overflow-hidden flex flex-col">
                        <ChallengesPanel />
                    </div>
                </motion.aside>
            </main>
        </div>
    );
}

export default App;
