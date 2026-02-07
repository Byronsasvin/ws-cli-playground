import React from 'react';
import { challenges } from '../data/challenges';
import { useStore } from '../store/useStore';
import { CheckCircle, Trophy } from 'lucide-react';

export const ChallengesPanel = () => {
    const { completedChallenges } = useStore();

    return (
        <div className="flex flex-col gap-4 overflow-y-auto max-h-[calc(100vh-250px)] pr-2">
            <h2 className="text-xl font-bold flex items-center gap-2">
                <Trophy className="text-yellow-400" /> Challenges
            </h2>
            {challenges.map((ch) => (
                <div
                    key={ch.id}
                    className={`p-4 rounded-lg border transition-all ${completedChallenges.includes(ch.id)
                            ? 'bg-green-900/20 border-green-500/50'
                            : 'bg-slate-800/50 border-slate-700 hover:border-slate-500'
                        }`}
                >
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{ch.title}</h3>
                        {completedChallenges.includes(ch.id) && <CheckCircle className="text-green-500 w-5 h-5" />}
                    </div>
                    <p className="text-xs text-slate-400 mb-3">{ch.description}</p>
                    <div className="flex justify-between items-center text-xs">
                        <span className="px-2 py-1 bg-slate-700 rounded text-slate-300 uppercase tracking-tighter">
                            {ch.difficulty}
                        </span>
                        <span className="text-yellow-500 font-bold">+{ch.reward} pts</span>
                    </div>
                </div>
            ))}
        </div>
    );
};
