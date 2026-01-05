import React, { useEffect, useState } from 'react';
import PromptGenerator from './components/PromptGenerator';
import ChatAssistant from './components/ChatAssistant';

const ArcReactor: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden bg-black">
      {/* Cinematic Fog / Atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-luxury-black/90 to-black z-10"></div>
      
      {/* 3D Scene Container */}
      <div className="relative w-full h-full flex items-center justify-center perspective-2000 z-0 scale-75 md:scale-100">
        
        {/* === THE CORE === */}
        {/* Blinding Center Light */}
        <div className="absolute w-24 h-24 rounded-full bg-white shadow-[0_0_100px_40px_rgba(6,182,212,0.8)] animate-flicker z-30"></div>
        <div className="absolute w-32 h-32 rounded-full bg-cyan-400 blur-xl opacity-80 animate-pulse z-30"></div>

        {/* === INNER RINGS (Fast Spinning, High Detail) === */}
        <div className="absolute w-[300px] h-[300px] transform-style-3d animate-spin-slow z-20">
             {/* Mechanical Segments */}
             <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-luxury-cyan border-b-luxury-cyan shadow-[0_0_30px_rgba(6,182,212,0.5)] opacity-90"></div>
             <div className="absolute inset-2 rounded-full border border-dashed border-white/30 opacity-50 rotate-45"></div>
        </div>

        <div className="absolute w-[280px] h-[280px] transform-style-3d animate-spin-reverse z-20">
            <div className="absolute inset-0 rounded-full border-2 border-luxury-plasma/60 border-l-transparent border-r-transparent"></div>
        </div>

        {/* === MIDDLE LAYERS (Tilted 3D Effect) === */}
        {/* We use a container rotated in X to give depth */}
        <div className="absolute w-[600px] h-[600px] rounded-full border border-white/5 animate-spin-slower z-10 flex items-center justify-center transform-style-3d" style={{ transform: 'rotateX(45deg) rotateY(15deg)' }}>
            <div className="absolute inset-0 rounded-full border border-luxury-cyan/20 shadow-hologram animate-pulse"></div>
            {/* Floating Nodes on Ring */}
            <div className="absolute top-0 left-1/2 w-4 h-4 bg-luxury-cyan rounded-full shadow-[0_0_15px_rgba(6,182,212,1)] blur-[1px]"></div>
            <div className="absolute bottom-0 left-1/2 w-4 h-4 bg-luxury-cyan rounded-full shadow-[0_0_15px_rgba(6,182,212,1)] blur-[1px]"></div>
        </div>

        {/* === OUTER CONTAINMENT (Large Structure) === */}
        <div className="absolute w-[800px] h-[800px] rounded-full border-[1px] border-white/5 shadow-2xl animate-spin-slow opacity-40 z-0 flex items-center justify-center">
            {/* Tech markings */}
            <div className="absolute inset-0 rounded-full border-l-[50px] border-r-[50px] border-l-transparent border-r-transparent border-t-2 border-b-2 border-t-luxury-border border-b-luxury-border"></div>
        </div>

        {/* === HOLOGRAPHIC INTERFACE RINGS === */}
        <div className="absolute w-[900px] h-[900px] rounded-full border border-dashed border-luxury-cyan/10 animate-spin-reverse-slow z-0"></div>
        
        {/* === VOLUMETRIC ENERGY BEAMS === */}
        <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-[120%] h-2 bg-gradient-to-r from-transparent via-luxury-cyan/10 to-transparent rotate-45 blur-xl"></div>
             <div className="w-[120%] h-2 bg-gradient-to-r from-transparent via-luxury-cyan/10 to-transparent -rotate-45 blur-xl"></div>
        </div>

        {/* === PARTICLES === */}
        <div className="absolute inset-0 overflow-hidden">
             {[...Array(20)].map((_, i) => (
               <div 
                 key={i}
                 className="absolute w-1 h-1 bg-luxury-cyan rounded-full animate-float opacity-0"
                 style={{
                   left: `${Math.random() * 100}%`,
                   top: `${Math.random() * 100}%`,
                   animationDelay: `${Math.random() * 5}s`,
                   animationDuration: `${5 + Math.random() * 10}s`,
                   opacity: Math.random() * 0.5 + 0.2
                 }}
               />
             ))}
        </div>
      </div>
      
      {/* Vignette Overlay for Focus */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/40 to-black/90 z-20 pointer-events-none"></div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#020202] text-white overflow-x-hidden selection:bg-luxury-cyan selection:text-black relative">
      
      {/* 3D Arc Reactor Background */}
      <ArcReactor />

      <div className="relative z-20 container mx-auto px-4 py-12">
        {/* Header */}
        <header className="text-center mb-16 space-y-4">
          <div className="inline-block relative group cursor-default">
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500 drop-shadow-2xl transition-transform duration-700 group-hover:scale-105">
              SORA 2
            </h1>
            <div className="absolute -inset-10 bg-luxury-cyan/10 blur-[60px] rounded-full -z-10 animate-pulse pointer-events-none"></div>
          </div>
          
          <div className="flex items-center justify-center gap-4 mt-2">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-luxury-cyan"></div>
            <h2 className="text-xl md:text-2xl font-light tracking-[0.5em] text-luxury-cyan uppercase opacity-90 text-shadow-glow">
              Prompt Architect
            </h2>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-luxury-cyan"></div>
          </div>
          
          <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base font-light pt-8 mt-6">
            Engineered for the next generation of generative video. 
            Craft timeline-accurate, cinematographic prompts with <span className="text-luxury-cyan font-semibold">Alpha</span> and <span className="text-luxury-gold font-semibold">Sigma</span> precision.
          </p>
        </header>

        {/* Main Interface */}
        <main>
          <PromptGenerator />
        </main>
        
        {/* Footer */}
        <footer className="mt-32 text-center pb-10">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/5 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs text-gray-400 tracking-widest uppercase font-medium">System Online • Powered by Gemini 1.5 Pro</span>
          </div>
        </footer>
      </div>

      {/* Floating Assistant */}
      <ChatAssistant />
    </div>
  );
};

export default App;