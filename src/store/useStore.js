import create from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
    persist(
        (set) => ({
            points: 0,
            level: 1,
            completedChallenges: [],
            history: [],

            addPoints: (amount) => set((state) => {
                const newPoints = state.points + amount;
                const newLevel = Math.floor(newPoints / 1000) + 1;
                return { points: newPoints, level: newLevel };
            }),

            completeChallenge: (id) => set((state) => ({
                completedChallenges: [...new Set([...state.completedChallenges, id])]
            })),

            addToHistory: (cmd) => set((state) => ({
                history: [cmd, ...state.history].slice(0, 50)
            })),

            resetProgress: () => set({ points: 0, level: 1, completedChallenges: [], history: [] })
        }),
        {
            name: 'aws-playground-storage',
        }
    )
);
