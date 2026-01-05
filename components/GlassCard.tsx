import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  is3D?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', title, is3D = false }) => {
  return (
    <div 
      className={`
        relative overflow-hidden rounded-2xl 
        bg-luxury-glass backdrop-blur-md border border-luxury-border
        transition-all duration-700 cubic-bezier(0.175, 0.885, 0.32, 1.275) shadow-2xl group
        ${is3D ? 'hover:-translate-y-2 hover:scale-[1.02] hover:rotate-[0.5deg] hover:shadow-[0_0_50px_-10px_rgba(6,182,212,0.5)] hover:border-luxury-cyan/70' : ''}
        ${className}
      `}
    >
      {/* Glossy overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none opacity-50 transition-opacity duration-500 group-hover:opacity-100" />
      
      {/* Tech corner accents - active on hover */}
      <div className={`absolute top-0 left-0 w-8 h-8 border-t border-l border-luxury-cyan/30 rounded-tl-xl transition-all duration-500 ${is3D ? 'group-hover:w-16 group-hover:h-16 group-hover:border-luxury-cyan group-hover:shadow-[0_0_25px_rgba(6,182,212,0.6)]' : ''}`}></div>
      <div className={`absolute bottom-0 right-0 w-8 h-8 border-b border-r border-luxury-cyan/30 rounded-br-xl transition-all duration-500 ${is3D ? 'group-hover:w-16 group-hover:h-16 group-hover:border-luxury-cyan group-hover:shadow-[0_0_25px_rgba(6,182,212,0.6)]' : ''}`}></div>
      
      {title && (
        <div className="px-6 py-4 border-b border-white/5 bg-black/40 flex items-center justify-between backdrop-blur-sm z-20 relative">
          <h3 className="text-lg font-semibold text-white tracking-[0.2em] uppercase transition-colors duration-300 group-hover:text-luxury-cyan/90">{title}</h3>
          {is3D && (
            <div className="flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-luxury-cyan shadow-[0_0_10px_rgba(6,182,212,0.8)] animate-pulse" />
            </div>
          )}
        </div>
      )}
      
      <div className="p-6 relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GlassCard;