import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Sliders, Sparkles, RefreshCw, Zap } from 'lucide-react';

/**
 * Reusable AnimatedVortex Component (originally AnimatedOrb wrapper)
 * Renders the beautiful spiral vortex of rotating squares matching the visual spec.
 */
const AnimatedOrb = ({
  isPlaying = true,
  speed = 1,
  glowIntensity = 1,
  blurAmount = 40,
  orbSize = 250,
}) => {
  // Base duration for spin
  const rotateDuration = 25 / speed;
  const squareCount = 18;
  const squares = Array.from({ length: squareCount }, (_, i) => i);

  return (
    <div className="relative flex items-center justify-center" style={{ width: orbSize + 150, height: orbSize + 150 }}>
      {/* Container holding the vortex */}
      <motion.div
        className="relative flex items-center justify-center"
        style={{
          width: `${orbSize}px`,
          height: `${orbSize}px`,
        }}
        animate={isPlaying ? { rotate: [0, 360] } : {}}
        transition={isPlaying ? { duration: rotateDuration, repeat: Infinity, ease: 'linear' } : {}}
      >
        {squares.map((idx) => {
          // Scale down each nested square slightly more than the previous
          const scale = 1 - idx * 0.05;
          if (scale <= 0.05) return null;

          // Sequential rotation offset for spiral vortex layout
          const rotateOffset = idx * 9;
          
          return (
            <motion.div
              key={idx}
              className="absolute border rounded-3xl will-change-transform"
              style={{
                width: '100%',
                height: '100%',
                scale: scale,
                rotate: rotateOffset,
                borderColor: `rgba(255, 255, 255, ${0.4 - (idx * 0.018)})`,
                boxShadow: `0 0 ${glowIntensity * 12}px rgba(255, 255, 255, ${0.06 * glowIntensity})`,
                filter: `blur(${blurAmount * 0.04}px)`,
              }}
              animate={
                isPlaying
                  ? {
                      // Micro-movements matching organic SaaS physics
                      scale: [scale, scale * 1.04, scale * 0.96, scale],
                      rotate: [rotateOffset, rotateOffset + (idx % 2 === 0 ? 12 : -12), rotateOffset],
                    }
                  : {}
              }
              transition={
                isPlaying
                  ? {
                      scale: { duration: (10 + idx * 0.6) / speed, repeat: Infinity, ease: 'easeInOut' },
                      rotate: { duration: (12 + idx * 0.8) / speed, repeat: Infinity, ease: 'easeInOut' },
                    }
                  : {}
              }
            />
          );
        })}
      </motion.div>
    </div>
  );
};

/**
 * Main Standalone AnimationPreview Page Component
 */
const AnimationPreview = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1.0);
  const [glowIntensity, setGlowIntensity] = useState(1.2);
  const [blurAmount, setBlurAmount] = useState(20);
  const [orbSize, setOrbSize] = useState(260);

  // Background ambient floating particles
  const backgroundParticles = [
    { id: 1, size: 3, x: '20%', y: '30%', delay: 0, duration: 8 },
    { id: 2, size: 5, x: '80%', y: '20%', delay: 1, duration: 10 },
    { id: 3, size: 4, x: '75%', y: '75%', delay: 3, duration: 9 },
    { id: 4, size: 3, x: '15%', y: '85%', delay: 2, duration: 11 },
    { id: 5, size: 6, x: '50%', y: '10%', delay: 4, duration: 13 },
  ];

  const resetSliders = () => {
    setSpeed(1.0);
    setGlowIntensity(1.2);
    setBlurAmount(20);
    setOrbSize(260);
  };

  return (
    <div className="relative min-h-screen bg-[#07080b] overflow-hidden flex flex-col justify-between font-sans text-gray-200 selection:bg-white/30">
      
      {/* Background overlay grid & gradient accents */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-white/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-white/5 rounded-full blur-[140px] pointer-events-none"></div>

      {/* Ambient background particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {backgroundParticles.map((pt) => (
          <motion.div
            key={pt.id}
            style={{
              width: pt.size,
              height: pt.size,
              left: pt.x,
              top: pt.y,
              boxShadow: '0 0 8px rgba(255, 255, 255, 0.3)',
            }}
            className="absolute rounded-full bg-white/30"
            animate={
              isPlaying
                ? {
                    y: [0, -30, 30, -30, 0],
                    x: [0, 20, -20, 20, 0],
                    opacity: [0.2, 0.6, 0.3, 0.7, 0.2],
                  }
                : {}
            }
            transition={
              isPlaying
                ? {
                    duration: pt.duration / (speed || 1),
                    delay: pt.delay,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }
                : { duration: 0.5 }
            }
          />
        ))}
      </div>

      {/* 1. Header Bar */}
      <header className="relative z-20 w-full px-6 py-4 flex items-center justify-between border-b border-white/5 bg-[#07080b]/55 backdrop-blur-md">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-white/10 text-white border border-white/10">
            <Zap size={16} />
          </div>
          <span className="font-extrabold text-sm uppercase tracking-wider text-white">THECLASSMATE</span>
          <span className="text-[10px] text-white/70 font-bold bg-white/10 px-2 py-0.5 rounded-full border border-white/10">VORTEX STUDIO</span>
        </div>
        
        <div className="text-[10px] text-gray-500 font-medium hidden sm:block">
          GPU Transforms Enabled &bull; 60 FPS Engine
        </div>
      </header>

      {/* 2. Main Centered Vortex Viewport */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 relative z-10 py-6">
        
        <div className="text-center mb-6 max-w-sm pointer-events-none">
          <h1 className="text-base font-bold text-white tracking-tight flex items-center justify-center">
            <Sparkles size={14} className="text-white mr-1.5 animate-pulse" />
            Rotating Square Vortex
          </h1>
          <p className="text-[10px] text-gray-400 mt-1 leading-relaxed">
            Elegant layered rotating squares with custom blur filters and responsive transform mechanics.
          </p>
        </div>

        {/* Square Vortex Container */}
        <AnimatedOrb
          isPlaying={isPlaying}
          speed={speed}
          glowIntensity={glowIntensity}
          blurAmount={blurAmount}
          orbSize={orbSize}
        />

      </main>

      {/* 3. Bottom Premium Floating Control Panel */}
      <footer className="relative z-20 w-full max-w-4xl mx-auto px-4 pb-8 pt-2">
        <div className="bg-[#0c0d13]/85 backdrop-blur-xl border border-white/5 rounded-2xl p-6 shadow-2xl flex flex-col space-y-6">
          
          {/* Row 1: Action Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/5 pb-4">
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsPlaying(true)}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 cursor-pointer transition-all border ${
                  isPlaying
                    ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.25)]'
                    : 'bg-transparent text-gray-400 border-white/10 hover:text-white hover:border-white/20'
                }`}
              >
                <Play size={12} fill={isPlaying ? 'currentColor' : 'none'} />
                <span>Play Animation</span>
              </button>

              <button
                onClick={() => setIsPlaying(false)}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 cursor-pointer transition-all border ${
                  !isPlaying
                    ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.25)]'
                    : 'bg-transparent text-gray-400 border-white/10 hover:text-white hover:border-white/20'
                }`}
              >
                <Pause size={12} fill={!isPlaying ? 'currentColor' : 'none'} />
                <span>Pause Animation</span>
              </button>
            </div>

            <div className="flex items-center space-x-2.5">
              <div className="flex items-center space-x-1 text-[10px] text-gray-400 uppercase font-bold">
                <Sliders size={12} className="text-white" />
                <span>Vortex Parameters</span>
              </div>
              <button
                onClick={resetSliders}
                className="p-1.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:text-white rounded-lg text-gray-400 transition-colors cursor-pointer"
                title="Reset Sliders"
              >
                <RefreshCw size={12} />
              </button>
            </div>

          </div>

          {/* Row 2: Sliders Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Speed Slider */}
            <div className="space-y-2 text-left">
              <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-wider text-gray-400">
                <span>Speed Factor</span>
                <span className="text-white font-mono font-extrabold">{speed.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="3.0"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-full accent-white h-1 bg-white/10 rounded-lg cursor-pointer appearance-none focus:outline-none"
              />
              <div className="flex justify-between text-[8px] font-bold text-gray-500">
                <span>0.1x (Slow)</span>
                <span>3.0x (Fast)</span>
              </div>
            </div>

            {/* Glow Intensity Slider */}
            <div className="space-y-2 text-left">
              <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-wider text-gray-400">
                <span>Glow Intensity</span>
                <span className="text-white font-mono font-extrabold">{(glowIntensity * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="2.5"
                step="0.1"
                value={glowIntensity}
                onChange={(e) => setGlowIntensity(parseFloat(e.target.value))}
                className="w-full accent-white h-1 bg-white/10 rounded-lg cursor-pointer appearance-none focus:outline-none"
              />
              <div className="flex justify-between text-[8px] font-bold text-gray-500">
                <span>20% (Dim)</span>
                <span>250% (Max)</span>
              </div>
            </div>

            {/* Blur Amount Slider */}
            <div className="space-y-2 text-left">
              <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-wider text-gray-400">
                <span>Blur Diffusion</span>
                <span className="text-white font-mono font-extrabold">{blurAmount}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="60"
                step="2"
                value={blurAmount}
                onChange={(e) => setBlurAmount(parseInt(e.target.value))}
                className="w-full accent-white h-1 bg-white/10 rounded-lg cursor-pointer appearance-none focus:outline-none"
              />
              <div className="flex justify-between text-[8px] font-bold text-gray-500">
                <span>0px (Sharp)</span>
                <span>60px (Soft)</span>
              </div>
            </div>

            {/* Vortex Diameter Slider */}
            <div className="space-y-2 text-left">
              <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-wider text-gray-400">
                <span>Vortex Diameter</span>
                <span className="text-white font-mono font-extrabold">{orbSize}px</span>
              </div>
              <input
                type="range"
                min="100"
                max="500"
                step="10"
                value={orbSize}
                onChange={(e) => setOrbSize(parseInt(e.target.value))}
                className="w-full accent-white h-1 bg-white/10 rounded-lg cursor-pointer appearance-none focus:outline-none"
              />
              <div className="flex justify-between text-[8px] font-bold text-gray-500">
                <span>100px (Min)</span>
                <span>500px (Max)</span>
              </div>
            </div>

          </div>

        </div>
      </footer>

    </div>
  );
};

export default AnimationPreview;
