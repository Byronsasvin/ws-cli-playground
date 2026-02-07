import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Terminal as TerminalIcon, Shield, Trophy, Layout } from 'lucide-react';

const steps = [
    {
        title: "¡Bienvenido a la Nube!",
        description: "AWS CLI Playground es un simulador educativo para aprender los comandos de Amazon Web Services sin riesgos ni costos.",
        icon: <TerminalIcon className="w-10 h-10 text-orange-500" />,
        color: "bg-orange-500/20"
    },
    {
        title: "La Consola Central",
        description: "Escribe tus comandos en la terminal. Siempre deben empezar con 'aws' (ej: aws s3 ls).",
        icon: <Layout className="w-10 h-10 text-blue-500" />,
        color: "bg-blue-500/20"
    },
    {
        title: "Supera los Challenges",
        description: "A la derecha verás una lista de retos. Complétalos ejecutando el comando correcto para ganar puntos.",
        icon: <Trophy className="w-10 h-10 text-yellow-500" />,
        color: "bg-yellow-500/20"
    },
    {
        title: "Niveles y Progreso",
        description: "Gana XP para subir de nivel. Tu progreso se guarda automáticamente en este navegador.",
        icon: <Shield className="w-10 h-10 text-green-500" />,
        color: "bg-green-500/20"
    }
];

export const ManualModal = ({ isOpen, onClose }) => {
    const [currentStep, setCurrentStep] = useState(0);

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ scale: 0.9, y: 20, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.9, y: 20, opacity: 0 }}
                        className="relative w-full max-w-lg glass-morphism rounded-3xl overflow-hidden shadow-2xl"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5 text-slate-400" />
                        </button>

                        <div className="p-8">
                            <div className="flex flex-col items-center text-center">
                                <motion.div
                                    key={currentStep}
                                    initial={{ rotate: -10, scale: 0.8 }}
                                    animate={{ rotate: 0, scale: 1 }}
                                    className={`${steps[currentStep].color} p-5 rounded-3xl mb-6`}
                                >
                                    {steps[currentStep].icon}
                                </motion.div>

                                <h2 className="text-3xl font-black mb-4 tracking-tight">
                                    {steps[currentStep].title}
                                </h2>
                                <p className="text-slate-400 text-lg leading-relaxed mb-8">
                                    {steps[currentStep].description}
                                </p>

                                <div className="flex gap-2 mb-8">
                                    {steps.map((_, i) => (
                                        <div
                                            key={i}
                                            className={`h-1.5 rounded-full transition-all duration-300 ${i === currentStep ? 'w-8 bg-orange-500' : 'w-2 bg-slate-700'
                                                }`}
                                        />
                                    ))}
                                </div>

                                <button
                                    onClick={nextStep}
                                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 group transition-all"
                                >
                                    {currentStep === steps.length - 1 ? "¡Empezar a Jugar!" : "Continuar"}
                                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
