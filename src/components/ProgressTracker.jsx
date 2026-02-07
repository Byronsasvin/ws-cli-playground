import React from 'react';
import { useStore } from '../store/useStore';
import { Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export const ProgressTracker = () => {
    const { points, level } = useStore();
    const progress = (points % 1000) / 10;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-morphism p-6 rounded-3xl border border-white/5 shadow-2xl overflow-hidden relative"
        >
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-3xl -mr-16 -mt-16 rounded-full" />

            <div className="flex items-center justify-between mb-5 relative z-10">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-lg shadow-orange-500/20">
                        <Shield className="text-white w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-0.5">Rango Actual</p>
                        <p className="text-2xl font-black text-white tracking-tight">LEVEL {level}</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-0.5">Exp Totales</p>
                    <p className="text-2xl font-black text-orange-500 tracking-tight">{points.toLocaleString()} XP</p>
                </div>
            </div>

            <div className="relative h-4 w-full bg-slate-800/50 rounded-full p-1 border border-white/5 overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 rounded-full shadow-[0_0_12px_rgba(255,153,0,0.4)]"
                />
            </div>

            <div className="flex justify-between mt-3 text-[10px] text-slate-400 font-bold uppercase tracking-[.2em]">
                <span>Progreso de Nivel</span>
                <span className="text-white">{Math.floor(progress)}%</span>
            </div>
        </motion.div>
    );
};
