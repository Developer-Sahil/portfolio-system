import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { Loader2 } from 'lucide-react';

mermaid.initialize({
    startOnLoad: false,
    theme: 'dark',
    securityLevel: 'loose',
    fontFamily: 'ui-sans-serif, system-ui, sans-serif',
    flowchart: {
        htmlLabels: true,
        useMaxWidth: true,
    },
    themeVariables: {
        darkMode: true,
        primaryColor: '#1e293b', // slate-800
        primaryTextColor: '#f8fafc', // slate-50
        secondaryColor: '#334155', // slate-700
        tertiaryColor: '#0f172a', // slate-950
        lineColor: '#94a3b8', // slate-400
        fontSize: '16px',
    }
});

const MermaidDiagram = ({ chart }) => {
    const containerRef = useRef(null);
    const [svg, setSvg] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const renderChart = async () => {
            if (!chart) return;

            setLoading(true);
            setError(null);

            try {
                const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
                const { svg } = await mermaid.render(id, chart);
                setSvg(svg);
            } catch (err) {
                console.error("Mermaid rendering error:", err);
                setError("Failed to render diagram");
            } finally {
                setLoading(false);
            }
        };

        renderChart();
    }, [chart]);

    if (error) {
        return (
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono">
                {error}
                <pre className="mt-2 text-[10px] opacity-70 overflow-auto">{chart}</pre>
            </div>
        );
    }

    return (
        <div className="my-6 w-full flex flex-col items-center">
            {loading && (
                <div className="flex items-center gap-2 text-muted-foreground text-sm my-4">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Rendering diagram...
                </div>
            )}
            <div
                ref={containerRef}
                className={`mermaid-container overflow-hidden bg-slate-950/50 p-6 rounded-xl border border-glass-border flex justify-center items-center shadow-inner ${loading ? 'opacity-0 absolute' : 'opacity-100'}`}
                style={{ width: '100%', maxWidth: '850px' }}
                dangerouslySetInnerHTML={{ __html: svg }}
            />
        </div>
    );
};

export default MermaidDiagram;

