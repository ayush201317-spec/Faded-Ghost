import React, { useState } from 'react';
import { PromptFormData, Mode, CharacterType, StyleType } from '../types';
import { generateSoraPrompt } from '../services/geminiService';
import GlassCard from './GlassCard';
import { CAMERAS, MOODS, ANGLES } from '../constants';

const PromptGenerator: React.FC = () => {
  const [mode, setMode] = useState<Mode>('alpha');
  const [formData, setFormData] = useState<PromptFormData>({
    description: '',
    duration: 10,
    characterType: 'non-cameo',
    style: 'hyper-realistic',
  });
  const [generatedResult, setGeneratedResult] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!formData.description) return;
    setIsGenerating(true);
    setGeneratedResult(null);
    const result = await generateSoraPrompt(formData);
    setGeneratedResult(result);
    setIsGenerating(false);
  };

  const updateField = (field: keyof PromptFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      
      {/* Mode Switcher */}
      <div className="flex justify-center mb-8">
        <div className="bg-black/40 backdrop-blur-md p-1 rounded-full border border-white/10 flex relative">
          <div 
            className={`absolute top-1 bottom-1 w-1/2 bg-luxury-accent rounded-full transition-all duration-300 ease-out shadow-glow ${mode === 'sigma' ? 'left-1/2' : 'left-0'}`}
          />
          <button 
            onClick={() => setMode('alpha')}
            className={`relative z-10 px-8 py-2 rounded-full font-bold text-sm tracking-wider transition-colors ${mode === 'alpha' ? 'text-white' : 'text-gray-400'}`}
          >
            ALPHA
          </button>
          <button 
            onClick={() => setMode('sigma')}
            className={`relative z-10 px-8 py-2 rounded-full font-bold text-sm tracking-wider transition-colors ${mode === 'sigma' ? 'text-white' : 'text-gray-400'}`}
          >
            SIGMA
          </button>
        </div>
      </div>

      {/* Input Form */}
      <GlassCard title={`${mode.toUpperCase()} CONFIGURATION`} is3D className="animate-float">
        <div className="space-y-6">
          
          {/* Common Fields */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-gray-400">Core Concept</label>
            <textarea 
              value={formData.description}
              onChange={(e) => updateField('description', e.target.value)}
              placeholder="Describe your vision (e.g., A cyberpunk samurai walking through neon rain...)"
              className="w-full h-32 bg-black/30 border border-white/10 rounded-xl p-4 text-white focus:border-luxury-accent focus:ring-1 focus:ring-luxury-accent outline-none transition-all resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-gray-400 flex justify-between">
                <span>Duration</span>
                <span className="text-luxury-accent">{formData.duration}s</span>
              </label>
              <input 
                type="range" 
                min="1" 
                max="50" 
                value={formData.duration}
                onChange={(e) => updateField('duration', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-luxury-accent"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-gray-400">Visual Style</label>
              <div className="grid grid-cols-2 gap-2">
                {(['hyper-realistic', 'cinematic'] as StyleType[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => updateField('style', s)}
                    className={`py-2 px-4 rounded-lg text-sm border transition-all ${
                      formData.style === s 
                        ? 'bg-white/10 border-luxury-accent text-white' 
                        : 'bg-transparent border-white/10 text-gray-500 hover:border-white/30'
                    }`}
                  >
                    {s === 'hyper-realistic' ? 'Hyper Realistic' : 'Cinematic'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-2">
             <label className="text-xs uppercase tracking-widest text-gray-400">Character Source</label>
             <div className="flex gap-4">
               <label className="flex items-center gap-3 cursor-pointer group">
                 <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${formData.characterType === 'cameo' ? 'border-luxury-accent' : 'border-gray-600'}`}>
                    {formData.characterType === 'cameo' && <div className="w-3 h-3 bg-luxury-accent rounded-full" />}
                 </div>
                 <input type="radio" className="hidden" checked={formData.characterType === 'cameo'} onChange={() => updateField('characterType', 'cameo')} />
                 <span className={`text-sm transition-colors ${formData.characterType === 'cameo' ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}`}>
                   Cameo <span className="text-xs text-gray-600">(Your Character)</span>
                 </span>
               </label>

               <label className="flex items-center gap-3 cursor-pointer group">
                 <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${formData.characterType === 'non-cameo' ? 'border-luxury-accent' : 'border-gray-600'}`}>
                    {formData.characterType === 'non-cameo' && <div className="w-3 h-3 bg-luxury-accent rounded-full" />}
                 </div>
                 <input type="radio" className="hidden" checked={formData.characterType === 'non-cameo'} onChange={() => updateField('characterType', 'non-cameo')} />
                 <span className={`text-sm transition-colors ${formData.characterType === 'non-cameo' ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}`}>
                   Non-Cameo <span className="text-xs text-gray-600">(AI Character)</span>
                 </span>
               </label>
             </div>
          </div>

          {/* SIGMA Features */}
          {mode === 'sigma' && (
            <div className="pt-6 border-t border-dashed border-white/10 animate-fade-in space-y-6">
               <div className="flex items-center gap-2 mb-4">
                 <span className="text-luxury-gold text-lg">✦</span>
                 <h4 className="text-luxury-gold font-bold tracking-widest text-sm">PRO TOOLS ENABLED</h4>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 <div className="space-y-2">
                   <label className="text-xs text-gray-400">Camera System</label>
                   <select 
                     onChange={(e) => updateField('camera', e.target.value)}
                     className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-sm text-gray-300 focus:border-luxury-gold outline-none"
                   >
                     <option value="">Auto Select</option>
                     {CAMERAS.map(c => <option key={c} value={c}>{c}</option>)}
                   </select>
                 </div>

                 <div className="space-y-2">
                   <label className="text-xs text-gray-400">Atmospheric Mood</label>
                   <select 
                     onChange={(e) => updateField('mood', e.target.value)}
                     className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-sm text-gray-300 focus:border-luxury-gold outline-none"
                   >
                     <option value="">Auto Select</option>
                     {MOODS.map(m => <option key={m} value={m}>{m}</option>)}
                   </select>
                 </div>

                 <div className="space-y-2">
                   <label className="text-xs text-gray-400">Key Angle</label>
                   <select 
                     onChange={(e) => updateField('cameraAngle', e.target.value)}
                     className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-sm text-gray-300 focus:border-luxury-gold outline-none"
                   >
                     <option value="">Auto Select</option>
                     {ANGLES.map(a => <option key={a} value={a}>{a}</option>)}
                   </select>
                 </div>
               </div>
            </div>
          )}

          {/* Action Button */}
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !formData.description}
            className={`
              w-full py-4 rounded-xl font-bold tracking-[0.2em] text-white uppercase
              transition-all duration-300 transform active:scale-[0.98]
              ${isGenerating 
                ? 'bg-gray-800 cursor-not-allowed opacity-50' 
                : 'bg-gradient-to-r from-indigo-900 via-luxury-accent to-purple-900 hover:shadow-glow hover:brightness-110'}
            `}
          >
            {isGenerating ? 'Synthesizing...' : 'Generate Timeline Prompt'}
          </button>

        </div>
      </GlassCard>

      {/* Result Display */}
      {generatedResult && (
        <GlassCard className="animate-pulse-slow border-luxury-accent/30" title="GENERATED SEQUENCE">
          <div className="prose prose-invert max-w-none">
             <div className="whitespace-pre-wrap font-mono text-sm text-gray-300 leading-relaxed p-4 bg-black/50 rounded-lg border border-white/5 shadow-inner">
               {generatedResult}
             </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button 
              onClick={() => navigator.clipboard.writeText(generatedResult)}
              className="text-xs text-luxury-accent hover:text-white uppercase tracking-wider font-semibold"
            >
              Copy to Clipboard
            </button>
          </div>
        </GlassCard>
      )}

    </div>
  );
};

export default PromptGenerator;