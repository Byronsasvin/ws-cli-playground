```javascript
import React, { useState, useEffect, useCallback } from 'react';
import { Terminal } from './components/Terminal';
import { ChallengesPanel } from './components/ChallengesPanel';
import { ProgressTracker } from './components/ProgressTracker';
import { ManualModal } from './components/ManualModal';
import { NotificationToast } from './components/NotificationToast';
import { Cloud, Github, HelpCircle, Zap, LayoutDashboard, Terminal as TerminalIcon, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useStore } from './store/useStore';
import { challenges } from './data/challenges';

/*
### 1. Guía Inteligente de Comandos (Did you mean?)
- **Algoritmo de Levenshtein**: Implementado en `src / utils / commandUtils.js` para calcular la similitud entre comandos.
- **Sugerencias Contextuales**: La terminal ahora sugiere el comando correcto si el usuario comete un error tipográfico (ej. sugerir `aws s3` si se escribe `aws s4`).
- **Ayuda de Subcomandos**: Si se introduce un subcomando erróneo, la terminal lista las opciones válidas para ese servicio.

### 2. Optimización UX Móvil
- **Layout Adaptativo**: Ajustado el layout para que el panel de Retos y la Consola se apilen verticalmente en pantallas pequeñas.
- **Orden de Lectura**: Se configuró para que la Consola aparezca al final en móviles, priorizando la visibilidad de los objetivos y el progreso.
- **Header Responsivo**: El logo y los botones se ajustan automáticamente; el botón principal cambia a modo "INFO" compacto en celulares.
- **Utilidades de Visibilidad**: Añadidas clases `.hide - mobile` y `.show - mobile` para un control fino de elementos por dispositivo.
*/

function App() {
    const [isManualOpen, setIsManualOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const { points, level, completedChallenges } = useStore();

    useEffect(() => {
        const hasSeenManual = localStorage.getItem('was_manual_seen');
        if (!hasSeenManual) {
            setIsManualOpen(true);
            localStorage.setItem('was_manual_seen', 'true');
        }
    }, []);

    useEffect(() => {
        if (level > 1) {
            triggerConfetti();
            addNotification('¡Subida de Nivel!', `Has alcanzado el Nivel ${ level } `, 'achievement');
        }
    }, [level]);

    useEffect(() => {
        if (completedChallenges.length > 0) {
            addNotification('Reto Completado', `¡Buen trabajo! Has ganado puntos de experiencia.`, 'success');
            triggerConfetti();
        }
    }, [completedChallenges.length]);

    const triggerConfetti = () => {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#FF9900', '#232F3E', '#FFFFFF']
        });
    };

    const addNotification = useCallback((title, message, type = 'info') => {
        const id = Date.now();
        setNotifications(prev => [...prev, { id, title, message, type }]);
        setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== id));
        }, 4000);
    }, []);

    return (
        <div className="app-container">
            <ManualModal isOpen={isManualOpen} onClose={() => setIsManualOpen(false)} />
            <NotificationToast notifications={notifications} />

            {/* Header Premium con Clases de Respaldo */}
            <header className="premium-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
                    <div style={{ background: 'linear-gradient(to bottom right, #FF9900, #cc7a00)', padding: '10px', borderRadius: '14px' }}>
                        <Cloud color="white" size={24} />
                    </div>
                    <div>
                        <h1 style={{ fontSize: '24px', fontWeight: '900', letterSpacing: '-0.5px' }} className="header-title">
                            AWS <span style={{ color: '#FF9900' }}>PLAYGROUND</span>
                        </h1>
                        <p style={{ fontSize: '9px', color: '#64748b', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase' }} className="header-subtitle">Cloud Simulation Environment</p>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <button
                        onClick={() => setIsManualOpen(true)}
                        className="btn-how-to-play"
                        style={{
                            display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px',
                            background: 'rgba(255,255,255,0.05)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)',
                            color: 'white', fontWeight: '800', fontSize: '10px'
                        }}
                    >
                        <HelpCircle size={14} /> <span className="hide-mobile">¿CÓMO JUGAR?</span><span className="show-mobile">INFO</span>
                    </button>
                    <a href="#" style={{ color: '#94a3b8' }}><Github size={20} /></a>
                </div>
            </header>

            {/* Main Layout con Clases Directas */}
            <main className="main-layout">

                {/* Lado Izquierdo: Consola */}
                <section className="terminal-section">
                    <div className="terminal-header">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0,0,0,0.3)', padding: '8px 15px', borderRadius: '10px', border: '1px solid var(--border)' }}>
                                <TerminalIcon size={14} color="#FF9900" />
                                <span style={{ fontSize: '10px', fontWeight: '900', color: '#cbd5e1', letterSpacing: '2px', textTransform: 'uppercase' }}>Interactive Shell</span>
                            </div>
                            <div className="badge-live">
                                <div className="pulse-dot" /> LIVE
                            </div>
                        </div>
                    </div>

                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <Terminal onCompleteAction={() => addNotification('Acción Exitosa', 'El comando se ha procesado correctamente.', 'success')} />
                    </div>
                </section>

                {/* Lado Derecho: Sidebar */}
                <aside className="sidebar-section">
                    <ProgressTracker />

                    <div className="card-challenges glass-morphism">
                        <div className="card-header">
                            <h2 style={{ fontSize: '20px', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <Target color="#FF9900" size={24} /> RETOS
                            </h2>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: '10px' }}>
                                <p style={{ fontSize: '10px', color: '#64748b', fontWeight: '800', textTransform: 'uppercase' }}>Completa misiones para ganar XP</p>
                                <span style={{ fontSize: '11px', fontWeight: '900', color: '#FF9900' }}>{completedChallenges.length}/{challenges.length}</span>
                            </div>
                        </div>

                        <ChallengesPanel />
                    </div>
                </aside>

            </main>
        </div>
    );
}

export default App;
