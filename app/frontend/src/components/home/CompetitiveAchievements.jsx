import React from 'react';
import { Trophy, Target, Award, TrendingUp, Star, ChevronRight } from 'lucide-react';
import { Badge } from '../ui/badge';

export default function CompetitiveAchievements() {
    // Mock Data
    const ratingData = {
        current: 1863,
        level: "Knight",
        globalRank: "43,125/818,912",
        attended: 2,
        topPercent: "5.43%",
        history: [1500, 1863]
    };

    const solvedData = {
        total: 285,
        totalQuestions: 3817,
        easy: 122,
        easyTotal: 922,
        medium: 134,
        mediumTotal: 1993,
        hard: 29,
        hardTotal: 902
    };

    const badges = [
        { id: 1, name: "100 Days Badge", icon: "🏆", color: "blue" },
        { id: 2, name: "Knight Badge", icon: "🛡️", color: "green" },
        { id: 3, name: "50 Days Badge", icon: "⭐", color: "yellow" },
    ];

    // Helper to generate SVG path for the graph
    const generateGraphPath = (data, width, height) => {
        if (!data || data.length === 0) return "";
        const maxVal = Math.max(...data);
        const minVal = Math.min(...data);
        const range = maxVal - minVal;

        // Normalize points
        const points = data.map((val, index) => {
            const x = (index / (data.length - 1)) * width;
            const y = height - ((val - minVal) / range) * height; // Invert Y
            return `${x},${y}`;
        });

        return `M ${points.join(' L ')}`;
    };

    return (
        <section className="py-8 lg:py-12">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-10">
                    <p className="text-blue-500 font-bold mb-2 tracking-wide uppercase text-sm">
                        Continuous Improvement
                    </p>
                    <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-slate-900">
                        Competitive Programming
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Rating Card */}
                    <div className="bg-slate-900 text-white rounded-[2rem] p-6 lg:p-8 relative overflow-hidden shadow-xl shadow-blue-900/20 flex flex-col justify-between group">
                        {/* Background Effects */}
                        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-blue-500/20 transition-colors duration-500"></div>

                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">Contest Rating</span>
                                        <Badge variant="ice-blue" className="bg-blue-500/20 text-blue-200 border-blue-500/30 text-[10px] px-2 py-0.5">
                                            {ratingData.level}
                                        </Badge>
                                    </div>
                                    <div className="font-serif text-4xl lg:text-5xl font-bold text-white tracking-tight mb-2">
                                        {ratingData.current.toLocaleString()}
                                    </div>
                                    <div className="text-slate-400 text-xs flex gap-3">
                                        <span>Global Ranking <strong className="text-white">{ratingData.globalRank}</strong></span>
                                        <span>Attended <strong className="text-white">{ratingData.attended}</strong></span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">Top</div>
                                    <div className="font-serif text-3xl font-bold text-white">{ratingData.topPercent}</div>
                                </div>
                            </div>

                            {/* Graph Container */}
                            <div className="h-24 w-full relative mt-2">
                                <svg viewBox="0 0 400 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                                    {/* Gradient Definition */}
                                    <defs>
                                        <linearGradient id="lineGradient" x1="0" x2="0" y1="0" y2="1">
                                            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.5" />
                                            <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>
                                    <path
                                        d={generateGraphPath(ratingData.history, 400, 100)}
                                        fill="none"
                                        stroke="#3b82f6"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="drop-shadow-lg"
                                    />
                                    {/* Dot at the end */}
                                    <circle cx="400" cy="0" r="4" fill="#ffffff" />
                                </svg>
                                <div className="flex justify-between text-[10px] text-slate-500 mt-2 font-medium uppercase tracking-wider">
                                    <span>Jan 2026</span>
                                    <span>Jan 2026</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats & Badges Grid */}
                    <div className="flex flex-col gap-4">

                        {/* Solved Problems Card */}
                        <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-xl shadow-blue-900/5 relative overflow-hidden flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                            <div className="relative w-32 h-32 mx-auto sm:mx-0">
                                {/* Custom Circle Chart */}
                                <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                                    {/* Background Ring */}
                                    <path className="text-slate-100"
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                    />
                                    {/* Easy Segment (Teal) */}
                                    <path className="text-teal-400"
                                        strokeDasharray={`${(solvedData.easy / solvedData.total) * 100}, 100`}
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                    />
                                    {/* Medium Segment (Yellow) */}
                                    <path className="text-yellow-400"
                                        strokeDasharray={`${(solvedData.medium / solvedData.total) * 100}, 100`}
                                        strokeDashoffset={-((solvedData.easy / solvedData.total) * 100)}
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                    />
                                    {/* Hard Segment (Red) */}
                                    <path className="text-red-400"
                                        strokeDasharray={`${(solvedData.hard / solvedData.total) * 100}, 100`}
                                        strokeDashoffset={-(((solvedData.easy + solvedData.medium) / solvedData.total) * 100)}
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                                    <span className="text-2xl font-serif font-bold text-slate-900">{solvedData.total}</span>
                                    <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Solved</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                                    <span className="text-xs font-medium text-slate-600">Easy</span>
                                    <span className="text-xs font-bold text-slate-900"><span className="text-teal-500">{solvedData.easy}</span><span className="text-slate-300">/</span>{solvedData.easyTotal}</span>
                                </div>
                                <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                                    <span className="text-xs font-medium text-slate-600">Med.</span>
                                    <span className="text-xs font-bold text-slate-900"><span className="text-yellow-500">{solvedData.medium}</span><span className="text-slate-300">/</span>{solvedData.mediumTotal}</span>
                                </div>
                                <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                                    <span className="text-xs font-medium text-slate-600">Hard</span>
                                    <span className="text-xs font-bold text-slate-900"><span className="text-red-500">{solvedData.hard}</span><span className="text-slate-300">/</span>{solvedData.hardTotal}</span>
                                </div>
                            </div>
                        </div>

                        {/* Badges Card */}
                        <div className="bg-slate-900/5 rounded-[2rem] p-6 border border-white/50 backdrop-blur-sm relative overflow-hidden group hover:bg-slate-900/10 transition-colors duration-300 flex items-center justify-between">
                            <div>
                                <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Badges</div>
                                <div className="text-3xl font-serif font-bold text-slate-900">3</div>
                            </div>

                            <div className="h-8 w-px bg-slate-200"></div>

                            <div className="text-right">
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Most Recent</div>
                                <div className="text-xl font-serif font-bold text-slate-900 group-hover:text-blue-700 transition-colors">Knight</div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}
