import React, { useEffect, useRef } from 'react';
import { Terminal as XTerm } from 'xterm';
import { FitAddon } from '@xterm/addon-fit';
import 'xterm/css/xterm.css';
import { commands } from '../data/commands';
import { useStore } from '../store/useStore';

export const Terminal = () => {
    const terminalRef = useRef(null);
    const xtermRef = useRef(null);
    const { addPoints, addToHistory } = useStore();
    const currentLine = useRef('');

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
                    currentLine.current = currentLine.current.slice(0, -1);
                    term.write('\b \b');
                }
            } else {
                currentLine.current += data;
                term.write(data);
            }
        });

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
            xtermRef.current.writeln(`\x1b[31merror:\x1b[0m command not found: ${main}`);
            return;
        }

        if (!service || service === 'help') {
            xtermRef.current.writeln(commands.help.execute().output);
            return;
        }

        const cmdService = commands[service];
        if (!cmdService) {
            xtermRef.current.writeln(`\x1b[31merror:\x1b[0m unknown service: ${service}`);
            return;
        }

        const cmdSub = cmdService.subcommands[sub];
        if (!cmdSub) {
            xtermRef.current.writeln(`\x1b[31merror:\x1b[0m unknown subcommand '${sub}' for service '${service}'`);
            return;
        }

        const result = cmdSub.execute(args, {});
        xtermRef.current.writeln(result.output);
        if (result.reward) addPoints(result.reward);
    };

    return (
        <div className="flex-1 glass-morphism rounded-3xl p-6 shadow-2xl border border-white/5 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div ref={terminalRef} className="h-full w-full" />
        </div>
    );
};
