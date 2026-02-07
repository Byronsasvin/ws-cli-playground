import React, { useEffect, useRef } from 'react';
import { Terminal as XTerm } from 'xterm';
import { FitAddon } from '@xterm/addon-fit';
import 'xterm/css/xterm.css';
import { commands } from '../data/commands';
import { challenges } from '../data/challenges';
import { useStore } from '../store/useStore';

import { findClosestMatch } from '../utils/commandUtils';

export const Terminal = ({ onCompleteAction }) => {
    const terminalRef = useRef(null);
    const xtermRef = useRef(null);
    const { addPoints, addToHistory, completeChallenge, completedChallenges } = useStore();
    const currentLine = useRef('');

    // Lista de comandos planos para sugerencias
    const allFlattenedCommands = Object.keys(commands).flatMap(service => {
        if (service === 'help') return ['aws help'];
        return Object.keys(commands[service].subcommands || {}).map(sub => `aws ${service} ${sub}`);
    });

    const services = Object.keys(commands).filter(s => s !== 'help');

    useEffect(() => {
        const term = new XTerm({
            cursorBlink: true,
            theme: {
                background: 'transparent',
                foreground: '#f8fafc',
                cursor: '#FF9900',
                selection: 'rgba(255, 153, 0, 0.3)',
            },
            fontFamily: 'JetBrains Mono, Menlo, monospace',
            fontSize: 14,
            allowProposedApi: true
        });

        const fitAddon = new FitAddon();
        term.loadAddon(fitAddon);

        term.open(terminalRef.current);
        fitAddon.fit();
        xtermRef.current = term;

        term.writeln('\x1b[1;33mWelcome to AWS CLI Playground\x1b[0m');
        term.writeln('Type \x1b[1;36maws help\x1b[0m to list available services.\n');
        term.write('\x1b[1;32m➜\x1b[0m \x1b[1;34m~\x1b[0m ');

        term.onData((data) => {
            if (data === '\r') {
                const input = currentLine.current.trim();
                term.writeln('');
                handleCommand(input);
                currentLine.current = '';
                term.write('\x1b[1;32m➜\x1b[0m \x1b[1;34m~\x1b[0m ');
            } else if (data === '\u007F') { // Backspace
                if (currentLine.current.length > 0) {
                    clearSuggestion();
                    currentLine.current = currentLine.current.slice(0, -1);
                    term.write('\b \b');
                    showSuggestion();
                }
            } else if (data === '\t') { // Tab for autocomplete
                const suggestion = getSuggestion(currentLine.current);
                if (suggestion) {
                    const remaining = suggestion.slice(currentLine.current.length);
                    currentLine.current += remaining;
                    term.write(remaining);
                }
            } else {
                clearSuggestion();
                currentLine.current += data;
                term.write(data);
                showSuggestion();
            }
        });

        const showSuggestion = () => {
            const suggestion = getSuggestion(currentLine.current);
            if (suggestion && suggestion !== currentLine.current) {
                const remaining = suggestion.slice(currentLine.current.length);
                term.write(`\x1b[90m${remaining}\x1b[0m`);
                // Move cursor back
                for (let i = 0; i < remaining.length; i++) term.write('\b');
            }
        };

        const clearSuggestion = () => {
            const suggestion = getSuggestion(currentLine.current);
            if (suggestion && suggestion !== currentLine.current) {
                const remaining = suggestion.slice(currentLine.current.length);
                for (let i = 0; i < remaining.length; i++) term.write(' ');
                for (let i = 0; i < remaining.length; i++) term.write('\b');
            }
        };

        const getSuggestion = (input) => {
            if (!input || input.length < 2) return null;
            return allFlattenedCommands.find(c => c.startsWith(input));
        };

        const handleResize = () => fitAddon.fit();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            term.dispose();
        };
    }, []);

    const handleCommand = (input) => {
        if (!input) return;
        addToHistory(input);

        const parts = input.split(' ').filter(p => p !== '');
        const [main, service, sub, ...args] = parts;

        if (main !== 'aws') {
            const suggestion = findClosestMatch(main, ['aws']);
            xtermRef.current.writeln(`\x1b[31merror:\x1b[0m command not found: ${main}`);
            if (suggestion) xtermRef.current.writeln(`\x1b[33m¿Quisiste decir "${suggestion}"?\x1b[0m`);
            return;
        }

        if (!service || service === 'help') {
            xtermRef.current.writeln(commands.help.execute().output);
            return;
        }

        const cmdService = commands[service];
        if (!cmdService) {
            const suggestion = findClosestMatch(service, services);
            xtermRef.current.writeln(`\x1b[31merror:\x1b[0m unknown service: ${service}`);
            if (suggestion) xtermRef.current.writeln(`\x1b[33m¿Quisiste decir "aws ${suggestion}"?\x1b[0m`);
            return;
        }

        const subcommands = Object.keys(cmdService.subcommands || {});
        const cmdSub = cmdService.subcommands[sub];
        if (!cmdSub) {
            const suggestion = findClosestMatch(sub, subcommands);
            xtermRef.current.writeln(`\x1b[31merror:\x1b[0m unknown subcommand '${sub}' for service '${service}'`);
            if (suggestion) {
                xtermRef.current.writeln(`\x1b[33m¿Quisiste decir "aws ${service} ${suggestion}"?\x1b[0m`);
            } else {
                xtermRef.current.writeln(`\x1b[90mTip: usa 'aws ${service} help' para ver comandos disponibles.\x1b[0m`);
            }
            return;
        }

        // Ejecutar comando
        const result = cmdSub.execute(args, {});
        xtermRef.current.writeln(result.output);

        // Notificar acción
        if (result.success && onCompleteAction) onCompleteAction();

        // Validar Retos
        challenges.forEach(ch => {
            if (!completedChallenges.includes(ch.id) && input === ch.solution) {
                completeChallenge(ch.id);
                addPoints(ch.reward);
            }
        });
    };

    return (
        <div className="flex-1 glass-morphism rounded-3xl p-6 shadow-2xl border border-white/5 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div ref={terminalRef} className="h-full w-full" />
        </div>
    );
};
