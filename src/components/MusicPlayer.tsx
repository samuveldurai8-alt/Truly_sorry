import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Sparkles } from 'lucide-react';
import { audioEngine } from '../utils/audio';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showPrompt, setShowPrompt] = useState<boolean>(true);

  useEffect(() => {
    // Hide initial subtle hint after 10 seconds if untouched
    const timer = setTimeout(() => setShowPrompt(false), 9000);
    return () => clearTimeout(timer);
  }, []);

  const toggleMusic = () => {
    const newState = audioEngine.toggle();
    setIsPlaying(newState);
    if (newState) {
      setShowPrompt(false);
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
      {showPrompt && !isPlaying && (
        <div 
          onClick={toggleMusic}
          className="cursor-pointer hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#edd5dd] text-xs font-sans-clean text-[#7a5568] shadow-sm animate-bounce hover:bg-white transition-all"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#dfa2b4]" />
          <span>Tap for soft melody</span>
        </div>
      )}

      <button
        id="music-toggle-btn"
        onClick={toggleMusic}
        aria-label={isPlaying ? "Pause peaceful melody" : "Play peaceful melody"}
        className={`group flex items-center gap-2 px-3.5 py-2 rounded-full backdrop-blur-md transition-all duration-300 shadow-sm border ${
          isPlaying 
            ? 'bg-[#fae8ee]/90 border-[#dfa2b4] text-[#8a425b] ring-2 ring-[#f3d3dc]/60' 
            : 'bg-white/80 hover:bg-white border-[#ecdde5] text-[#735c6b] hover:text-[#523d4a]'
        }`}
      >
        <div className="relative flex items-center justify-center">
          {isPlaying ? (
            <>
              <Volume2 className="w-4 h-4 text-[#c98097] animate-pulse" />
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#dfa2b4] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c98097]"></span>
              </span>
            </>
          ) : (
            <Music className="w-4 h-4 text-[#9b7e90] group-hover:scale-110 transition-transform" />
          )}
        </div>
        
        <span className="text-xs font-sans-clean font-medium tracking-wide">
          {isPlaying ? "Melody playing 🤍" : "Play melody"}
        </span>

        {isPlaying ? (
          <span className="flex items-center gap-0.5 ml-0.5">
            <span className="w-1 h-3 bg-[#c98097] rounded-full animate-[gentlePulse_1.2s_ease-in-out_infinite]"></span>
            <span className="w-1 h-4 bg-[#dfa2b4] rounded-full animate-[gentlePulse_1.6s_ease-in-out_infinite_0.3s]"></span>
            <span className="w-1 h-2 bg-[#c98097] rounded-full animate-[gentlePulse_1.4s_ease-in-out_infinite_0.6s]"></span>
          </span>
        ) : null}
      </button>
    </div>
  );
};
