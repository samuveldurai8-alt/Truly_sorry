import React, { useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { audioEngine } from '../utils/audio';

interface EnvelopeOpeningProps {
  onOpen: () => void;
}

export const EnvelopeOpening: React.FC<EnvelopeOpeningProps> = ({ onOpen }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);
    audioEngine.playChime();

    // Give time for envelope flap to rotate and letter to slide up
    setTimeout(() => {
      onOpen();
    }, 1250);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-12 relative z-10 select-none">
      {/* Gentle Header introduction */}
      <div className="text-center max-w-md mx-auto mb-8 sm:mb-10 space-y-3">
        <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-[#ecdbe2] text-xs font-sans-clean text-[#8a556b] shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#d992a7]" />
          <span>For someone special</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif-elegant font-medium text-[#2d222b] tracking-wide leading-tight">
          A little something for you 🤍
        </h1>

        <p className="text-base sm:text-lg font-sans-clean text-[#745f6e] font-light tracking-wide">
          There are a few things I wanted to say…
        </p>
      </div>

      {/* Realistic Interactive Envelope Container */}
      <div 
        onClick={handleOpen}
        className="cursor-pointer group relative w-full max-w-[340px] sm:max-w-[400px] h-[240px] sm:h-[270px] flex items-center justify-center transition-transform duration-500 hover:scale-[1.02]"
        style={{ perspective: '1200px' }}
      >
        {/* Soft shadow under envelope */}
        <div className="absolute -bottom-4 w-[85%] h-8 bg-[#644256]/15 rounded-full blur-xl transition-all group-hover:scale-105 group-hover:opacity-80" />

        {/* The Envelope Body */}
        <div className="relative w-full h-full rounded-2xl bg-gradient-to-b from-[#fbf8f5] to-[#f5ede4] shadow-[0_12px_36px_-8px_rgba(100,60,80,0.14)] border border-[#ede2d8] overflow-visible">
          
          {/* Letter inside that slides up when opening */}
          <div 
            className={`absolute left-4 right-4 top-4 h-[90%] rounded-xl letter-paper border border-[#e4d6c8] p-5 shadow-inner transition-all duration-1000 ease-out flex flex-col items-center justify-center text-center ${
              isOpening 
                ? '-translate-y-28 opacity-100 z-30 shadow-lg scale-105' 
                : 'translate-y-1 opacity-80 z-0'
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-[#fae8ee] flex items-center justify-center mb-2">
              <Heart className="w-4 h-4 text-[#dfa2b4] fill-[#dfa2b4]" />
            </div>
            <p className="font-serif-elegant italic text-sm text-[#8a5d72]">
              A little note from my heart… 🤍
            </p>
            <div className="w-16 h-px bg-[#ecd8cf] my-2" />
            <p className="font-handwriting text-lg text-[#553b4b]">
              Just a few honest thoughts
            </p>
          </div>

          {/* Envelope Pocket (Left & Right folded triangles) */}
          <div 
            className="absolute inset-0 z-10 pointer-events-none rounded-2xl overflow-hidden"
          >
            {/* Bottom pocket */}
            <div 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, #f7efe6 0%, #faefe8 50%, #f3e6dc 100%)',
                clipPath: 'polygon(0% 100%, 50% 48%, 100% 100%)',
                borderBottom: '1px solid #e8dbcf'
              }}
            />

            {/* Left triangle */}
            <div 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to right, #faf3ec, #f5ebe0)',
                clipPath: 'polygon(0% 0%, 0% 100%, 50% 50%)',
                boxShadow: 'inset -2px 0 6px rgba(120, 80, 90, 0.04)'
              }}
            />

            {/* Right triangle */}
            <div 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to left, #faf3ec, #f5ebe0)',
                clipPath: 'polygon(100% 0%, 100% 100%, 50% 50%)',
                boxShadow: 'inset 2px 0 6px rgba(120, 80, 90, 0.04)'
              }}
            />
          </div>

          {/* Top Flap (Flips upward 180 degrees) */}
          <div 
            className={`absolute top-0 left-0 right-0 h-[60%] origin-top transition-all duration-700 ease-in-out z-20 ${
              isOpening ? 'pointer-events-none' : ''
            }`}
            style={{
              transformStyle: 'preserve-3d',
              transform: isOpening ? 'rotateX(175deg)' : 'rotateX(0deg)',
              zIndex: isOpening ? 5 : 25,
            }}
          >
            <div 
              className="w-full h-full rounded-t-2xl shadow-sm"
              style={{
                background: 'linear-gradient(180deg, #fcf8f4 0%, #f6ede3 100%)',
                clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
                borderTop: '1px solid #e8ddd0',
                filter: 'drop-shadow(0 4px 6px rgba(90, 50, 70, 0.07))'
              }}
            />
          </div>

          {/* Wax Seal in Center */}
          <div 
            className={`absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-500 flex items-center justify-center ${
              isOpening ? 'opacity-0 scale-125' : 'opacity-100 scale-100'
            }`}
          >
            <div className="relative wax-seal w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center cursor-pointer shadow-md group-hover:scale-105 transition-transform">
              {/* Seal border indent */}
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/30 flex items-center justify-center">
                <Heart className="w-5 h-5 text-white/90 fill-white/80 animate-pulse" />
              </div>

              {/* Tiny gold shimmer accent */}
              <span className="absolute top-1 right-2 w-1.5 h-1.5 rounded-full bg-white/70 blur-[0.5px]" />
            </div>
          </div>

        </div>
      </div>

      {/* Primary Action Button */}
      <div className="mt-9 sm:mt-11 flex flex-col items-center gap-3">
        <button
          id="open-envelope-btn"
          onClick={handleOpen}
          disabled={isOpening}
          className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#eec2d0] via-[#dfa2b4] to-[#c98097] text-white font-sans-clean font-medium text-base shadow-[0_6px_20px_rgba(223,162,180,0.45)] hover:shadow-[0_8px_26px_rgba(223,162,180,0.65)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-75 disabled:pointer-events-none"
        >
          <span className="tracking-wide">Open this 🤍</span>
          <Heart className="w-4 h-4 text-white/95 fill-white/90 transition-transform group-hover:scale-125" />
        </button>

        <p className="text-xs font-sans-clean text-[#98808e] font-light">
          Tap the envelope or button to read
        </p>
      </div>
    </div>
  );
};
