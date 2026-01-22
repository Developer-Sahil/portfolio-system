import React from 'react';
import { motion } from 'framer-motion';

const LoadingState = ({ message = "Loading System..." }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] w-full bg-transparent">
            <div className="relative w-24 h-24 mb-8">
                {/* Central Core */}
                <motion.div
                    className="absolute inset-0 m-auto w-4 h-4 rounded-full bg-primary blur-[2px]"
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Inner Ring */}
                <motion.div
                    className="absolute inset-0 border-2 border-primary/30 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />

                {/* Outer Ring with Pulse */}
                <motion.div
                    className="absolute -inset-4 border border-accent/20 rounded-full"
                    animate={{ rotate: -180, scale: [0.95, 1.05, 0.95] }}
                    transition={{
                        rotate: { duration: 12, repeat: Infinity, ease: "linear" },
                        scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                    }}
                />

                {/* Orbiting Particles */}
                <motion.div
                    className="absolute inset-0"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-2 h-2 rounded-full bg-accent blur-[1px]" />
                </motion.div>
            </div>

            {/* Loading Text */}
            <motion.p
                className="text-muted-foreground font-serif tracking-widest text-sm uppercase"
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
                {message}
            </motion.p>
        </div>
    );
};

export default LoadingState;
