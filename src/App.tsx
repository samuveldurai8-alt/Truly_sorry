import React, { useState } from 'react';
import { FloatingParticles } from './components/FloatingParticles';
import { MusicPlayer } from './components/MusicPlayer';
import { EnvelopeOpening } from './components/EnvelopeOpening';
import { LetterContent } from './components/LetterContent';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    // Smooth scroll to top of reading area
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#fcf9f5] font-sans-clean text-[#332630]">
      {/* Background ambient lighting and interactive floating particles */}
      <FloatingParticles />

      {/* Floating Music Toggle (Compliant: Never autoplays) */}
      <MusicPlayer />

      {/* Main View Transition */}
      <main className="relative z-10 w-full min-h-screen flex flex-col justify-center items-center">
        {!isOpen ? (
          <div className="w-full flex items-center justify-center transition-opacity duration-700">
            <EnvelopeOpening onOpen={handleOpen} />
          </div>
        ) : (
          <div className="w-full transition-opacity duration-1000 animate-[fadeIn_0.9s_ease-out]">
            <LetterContent onReset={handleReset} />
          </div>
        )}
      </main>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
