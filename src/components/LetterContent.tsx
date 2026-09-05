import React, { useState, useEffect, useRef } from 'react';
import { Heart, Sparkles, ChevronDown, RefreshCw, Feather } from 'lucide-react';
import { audioEngine } from '../utils/audio';

interface LetterContentProps {
  onReset: () => void;
}

export const LetterContent: React.FC<LetterContentProps> = ({ onReset }) => {
  const [activeSegment, setActiveSegment] = useState<number>(0);
  const [warmthSent, setWarmthSent] = useState<boolean>(false);

  // References to segments for smooth navigation
  const sec0Ref = useRef<HTMLDivElement | null>(null);
  const sec1Ref = useRef<HTMLDivElement | null>(null);
  const sec2Ref = useRef<HTMLDivElement | null>(null);
  const sec3Ref = useRef<HTMLDivElement | null>(null);
  const sec4Ref = useRef<HTMLDivElement | null>(null);
  const sec5Ref = useRef<HTMLDivElement | null>(null);

  const segmentRefs = [sec0Ref, sec1Ref, sec2Ref, sec3Ref, sec4Ref, sec5Ref];

  const scrollToSegment = (index: number) => {
    const target = segmentRefs[index]?.current;
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Track active reading position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.42;
      for (let i = segmentRefs.length - 1; i >= 0; i--) {
        const el = segmentRefs[i]?.current;
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSegment(i);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [segmentRefs]);

  const handleSendWarmth = () => {
    audioEngine.playChime();
    setWarmthSent(true);
  };

  return (
    <div className="relative z-10 w-full min-h-screen pb-28 px-4 sm:px-6 max-w-2xl mx-auto select-none">
      
      {/* Top reading progress indicator */}
      <div className="sticky top-0 z-30 pt-3 pb-2 -mx-4 px-4 bg-gradient-to-b from-[#fcf9f5] via-[#fcf9f5]/90 to-transparent backdrop-blur-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#dfa2b4] animate-pulse" />
          <span className="text-xs font-serif-elegant italic text-[#876579] tracking-wider">
            A small note from my heart 🤍
          </span>
        </div>

        {/* Minimal dot progress */}
        <div className="flex items-center gap-1.5">
          {[0, 1, 2, 3, 4].map((idx) => (
            <button
              key={idx}
              onClick={() => scrollToSegment(idx + 1)}
              aria-label={`Read page ${idx + 1}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                activeSegment === idx + 1
                  ? 'w-5 h-1.5 bg-[#c98097]'
                  : 'w-1.5 h-1.5 bg-[#e4cfd8] hover:bg-[#c98097]/60'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Intro greeting banner */}
      <div 
        ref={sec0Ref}
        className="pt-8 pb-10 text-center space-y-3.5 animate-fade-in"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#faedf2] border border-[#f0d8e2] text-xs font-sans-clean text-[#9a5e78] shadow-2xs">
          <Feather className="w-3.5 h-3.5 text-[#dfa2b4]" />
          <span>Straight from the heart 🌸</span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif-elegant text-[#352532] font-normal tracking-wide">
          Thank you for opening this 🤍
        </h2>

        <p className="text-sm sm:text-base font-sans-clean text-[#7c6475] max-w-md mx-auto leading-relaxed">
          Please take your own sweet time to read this. There is absolutely no rush and no pressure at all, seriously—just a few honest things I really wanted to tell you. 🕊️✨
        </p>

        <div className="pt-2 flex justify-center">
          <button
            onClick={() => scrollToSegment(1)}
            className="flex items-center gap-1.5 text-xs text-[#b07b91] hover:text-[#8a4d67] transition-colors pt-2 animate-bounce cursor-pointer"
          >
            <span>Scroll gently 🤍</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. I'm Really Sorry (Natural Casual Spoken English) */}
      {/* ========================================================================= */}
      <div 
        ref={sec1Ref}
        className="my-8 sm:my-12 scroll-mt-20"
      >
        <div className="relative rounded-3xl letter-paper p-7 sm:p-11 border border-[#eedfd3] transition-all duration-500 hover:shadow-md">
          {/* Delicate stamp */}
          <div className="absolute top-5 right-5 w-9 h-9 rounded-xl border border-dashed border-[#dfc3b5] flex items-center justify-center rotate-6 bg-white/60 shadow-2xs">
            <Heart className="w-4 h-4 text-[#d99fae] fill-[#fae8ee]" />
          </div>

          <div className="space-y-5">
            <h3 className="text-2xl sm:text-3xl font-serif-elegant font-normal text-[#2e212c] flex items-center gap-2">
              <span>I’m really sorry.</span>
              <span className="text-2xl">🥲🤍</span>
            </h3>

            <div className="w-12 h-0.5 bg-gradient-to-r from-[#dfa2b4] to-transparent rounded-full" />

            <div className="space-y-4 text-base sm:text-lg font-sans-clean text-[#382b36] leading-relaxed pt-1">
              <p className="font-medium text-[#2d222b]">
                I know I was completely wrong, and there’s honestly no excuse for how I acted. 😔
              </p>

              <p>
                You were already going through a difficult time and carrying so much stress. Instead of being calm, patient, and understanding, I just lost my temper and scolded you. Looking back at that moment, I honestly feel so terrible about it. 💔
              </p>

              <p className="text-[#5a4253]">
                When you just needed some peace, a listening ear, and someone to be gentle with you, I ended up getting irritated and added more stress to your day. That was really not okay, and it was so unfair to you. 🥀
              </p>

              <p className="font-serif-elegant italic text-lg sm:text-xl text-[#7d445c] bg-[#faedf2]/70 p-4 sm:p-5 rounded-2xl border border-[#f0d6e1] leading-relaxed">
                “I’m truly, deeply sorry for that. I really wish I had just taken a breath and handled that moment with more patience and care.” 🤍🕊️
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <div className="w-1 h-6 bg-gradient-to-b from-[#eedfd3] to-transparent rounded-full" />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. I Understand (Simple, Honest, Mature) */}
      {/* ========================================================================= */}
      <div 
        ref={sec2Ref}
        className="my-8 sm:my-12 scroll-mt-20"
      >
        <div className="relative rounded-3xl letter-paper p-7 sm:p-11 border border-[#eedfd3] transition-all duration-500 hover:shadow-md">
          <div className="space-y-5">
            <h3 className="text-2xl sm:text-3xl font-serif-elegant font-normal text-[#2e212c]">
              I should have understood you better. 🌿✨
            </h3>

            <div className="w-12 h-0.5 bg-gradient-to-r from-[#cfb0db] to-transparent rounded-full" />

            <div className="space-y-4 text-base sm:text-lg font-sans-clean text-[#382b36] leading-relaxed pt-1">
              <p>
                Sometimes when someone is having a rough day or feeling overwhelmed, they don’t need questions, lectures, or someone getting annoyed with them. What they really need is just quiet support, some warmth, and someone who understands without asking for explanations. 🥺
              </p>

              <p>
                I’m really learning that now, and it made me realize that I need to be much more thoughtful. 🤍
              </p>

              <p className="font-serif-elegant italic text-lg sm:text-xl text-[#62475e] bg-[#fbf4fa]/80 p-4 sm:p-5 rounded-2xl border border-[#efe0ef] leading-relaxed">
                “I promise myself to be way more patient, more understanding, and far more careful with your feelings. You mean too much to me for me to ever forget that.” 🌸🤍
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <div className="w-1 h-6 bg-gradient-to-b from-[#eedfd3] to-transparent rounded-full" />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. Thank You (Warm, Personal, Sincere Gratitude) */}
      {/* ========================================================================= */}
      <div 
        ref={sec3Ref}
        className="my-8 sm:my-12 scroll-mt-20"
      >
        <div className="relative rounded-3xl letter-paper p-7 sm:p-11 border border-[#eedfd3] transition-all duration-500 hover:shadow-md overflow-hidden">
          
          <div className="relative z-10 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl sm:text-3xl font-serif-elegant font-normal text-[#2e212c]">
                And… thank you so much. 🤍🌸
              </h3>
              <div className="flex items-center gap-1.5 text-[#dfa2b4]">
                <Heart className="w-4 h-4 fill-[#dfa2b4] animate-pulse" />
                <Sparkles className="w-3.5 h-3.5 text-[#e5c777]" />
              </div>
            </div>

            <div className="w-12 h-0.5 bg-gradient-to-r from-[#dfa2b4] to-transparent rounded-full" />

            <div className="space-y-4 text-base sm:text-lg font-sans-clean text-[#382b36] leading-relaxed pt-1">
              <p className="font-serif-elegant text-xl sm:text-2xl text-[#7d445c] italic">
                Alongside saying sorry, I really wanted to thank you for everything you do for me. ✨
              </p>

              <p className="text-[#594252] leading-relaxed">
                Seriously, thank you for all the little, quiet things that you probably don’t even think twice about: 🌷
              </p>

              {/* Natural flow of thoughts */}
              <div className="space-y-3.5 pl-2 sm:pl-3 border-l-2 border-[#eed5dd]">
                <p className="text-[#3b2a37]">
                  🎧 <strong className="font-medium text-[#2d1e29]">Thank you for listening to me:</strong> Even when I was talking nonstop, rambling about random things, or my thoughts were totally scattered, you always listened to me patiently without judging.
                </p>
                <p className="text-[#3b2a37]">
                  🕊️ <strong className="font-medium text-[#2d1e29]">Thank you for understanding me:</strong> For dealing with my moods, for being so patient, and for understanding me even on days when I was hard to deal with.
                </p>
                <p className="text-[#3b2a37]">
                  🌸 <strong className="font-medium text-[#2d1e29]">Thank you for supporting me:</strong> Whenever things felt heavy or uncertain, just knowing you’re there in my life always brought a comfort that means the world to me.
                </p>
                <p className="text-[#3b2a37]">
                  🌙 <strong className="font-medium text-[#2d1e29]">Thank you for being there through so many moments:</strong> Through random calls, late talks, silly arguments, inside jokes, and all the everyday moments in between.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#fef5f8] via-[#fdf1f6] to-[#fbf0f9] border border-[#f3dee7] mt-4 shadow-2xs">
                <p className="font-serif-elegant text-lg sm:text-xl text-[#3d2a37] leading-relaxed italic">
                  “Thank you for every laugh, every conversation, every memory, and all those little moments that became so special just because they were with you.” ☕✨🌷
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <div className="w-1 h-6 bg-gradient-to-b from-[#eedfd3] to-transparent rounded-full" />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. You Mean A Lot (Natural, Warm, Affectionate) */}
      {/* ========================================================================= */}
      <div 
        ref={sec4Ref}
        className="my-8 sm:my-12 scroll-mt-20"
      >
        <div className="relative rounded-3xl letter-paper p-7 sm:p-11 border border-[#eedfd3] transition-all duration-500 hover:shadow-md text-center">
          
          {/* Glowing Heart */}
          <div className="relative my-3 flex items-center justify-center">
            <div className="absolute w-36 h-36 rounded-full bg-gradient-to-r from-[#fae2ea] via-[#f7d6e0] to-[#faeedf] blur-2xl opacity-80 animate-gentle-pulse" />

            <div 
              className="relative group cursor-pointer" 
              onClick={() => audioEngine.playHeartNote()}
              title="Tap to hear a soft chime"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-b from-white to-[#fbf0f4] border border-[#f1d7e2] shadow-sm flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <Heart 
                  className="w-10 h-10 sm:w-12 sm:h-12 text-[#dfa2b4] fill-[#dfa2b4] soft-glow-heart transition-all group-hover:text-[#c98097] group-hover:fill-[#c98097]" 
                />
              </div>
              <Sparkles className="w-4 h-4 text-[#e5c777] absolute -top-1 -right-1 animate-pulse" />
              <Heart className="w-3.5 h-3.5 text-[#dfa2b4] fill-[#dfa2b4] absolute -bottom-1 -left-1 opacity-70 animate-bounce" />
            </div>
          </div>

          <div className="space-y-4 max-w-lg mx-auto">
            <h3 className="text-2xl sm:text-3xl font-serif-elegant font-normal text-[#2e212c]">
              You really mean a lot to me 🤍✨
            </h3>

            <div className="w-12 h-0.5 bg-gradient-to-r from-[#dfa2b4] to-transparent rounded-full mx-auto" />

            <div className="space-y-4 text-base sm:text-lg font-sans-clean text-[#382b36] leading-relaxed pt-2">
              <p className="text-[#6d5767]">
                I know I’m not always great at expressing things or putting my feelings into words properly… 🥺
              </p>
              <p className="font-serif-elegant text-2xl sm:text-3xl text-[#7d445c] font-normal italic">
                “but I genuinely value you with all my heart.” 🤍
              </p>
              <p className="leading-relaxed">
                Having you in my life has made things so much warmer and happier. Your kindness, your sweet smile, and just the way you are—it really brightens up everything. 🌷
              </p>
              <p className="text-[#61495b] text-sm sm:text-base italic">
                You’ve become a truly special person to me, and I never, ever take you for granted. 🕊️✨
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <div className="w-1 h-6 bg-gradient-to-b from-[#eedfd3] to-transparent rounded-full" />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. Handwritten Final Letter (Caring, Gentle, Simple) */}
      {/* ========================================================================= */}
      <div 
        ref={sec5Ref}
        className="my-10 sm:my-16 scroll-mt-16"
      >
        <div className="relative rounded-3xl letter-paper p-7 sm:p-12 border-2 border-[#e6d3c3] shadow-[0_14px_40px_-10px_rgba(80,45,65,0.13)]">
          
          <div className="space-y-6">
            
            {/* Header of final note */}
            <div className="border-b border-[#e9ded3] pb-4 flex items-center justify-between">
              <p className="font-serif-elegant text-xl sm:text-2xl text-[#6b4759] italic flex items-center gap-2">
                <span>Just one last thing…</span>
                <span>🌙🤍</span>
              </p>
            </div>

            {/* Handwritten realistic letter body */}
            <div className="space-y-6 font-handwriting text-2xl sm:text-3xl text-[#3b2735] leading-relaxed tracking-wide">
              <p className="leading-snug">
                I’m really sorry for hurting you. 🥺🤍
              </p>
              
              <p className="text-[#6d3249] leading-snug">
                And thank you, truly, for just being you. 🌸
              </p>

              <p className="text-[#4e3447] leading-snug">
                Please eat properly on time, sleep well, and don't stress over things too much, okay? You deserve only peace, happiness, and gentle days. 🕊️✨
              </p>

              <p className="font-semibold text-[#803853] text-3xl sm:text-4xl leading-snug">
                You really mean a lot to me. 🤍
              </p>
            </div>

            {/* Handwritten Signature */}
            <div className="pt-6 border-t border-[#e9ded3] flex flex-col items-end">
              <div className="font-handwriting text-2xl sm:text-3xl text-[#644256] text-right">
                — From someone who is truly grateful for you 🤍🌸
              </div>
              <span className="text-xs font-serif-elegant italic text-[#9f8595] mt-1.5">
                Always wishing the very best for you 🕊️
              </span>
            </div>

          </div>
        </div>

        {/* Peaceful Closing & Interactive Warmth Touch */}
        <div className="mt-12 text-center space-y-6">
          <div className="p-6 sm:p-7 rounded-2xl bg-white/80 backdrop-blur-xs border border-[#ecdfe4] max-w-md mx-auto shadow-xs">
            <p className="text-sm font-sans-clean text-[#6a5463] mb-4 leading-relaxed">
              Seriously, there is zero pressure to reply. You don't have to reply at all. Just take this as a small reminder that you are deeply cared for and valued. Take good care of yourself! 🕊️🤍
            </p>

            {!warmthSent ? (
              <button
                id="send-warmth-btn"
                onClick={handleSendWarmth}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-[#faedf2] to-[#f6e1eb] hover:from-[#f7e0eb] hover:to-[#f3d4e3] text-[#8a425b] border border-[#dfa2b4]/60 text-sm font-sans-clean font-medium shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-[#dfa2b4] text-[#dfa2b4]" />
                <span>Leave a quiet heart 🤍🌸</span>
              </button>
            ) : (
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#f4eef9] text-[#714f85] border border-[#d6c4e5] text-sm font-sans-clean animate-fade-in shadow-2xs">
                <Sparkles className="w-4 h-4 text-[#b998d3]" />
                <span>Warmth received. Wishing you gentle peace and a happy day ahead. 🕊️🌸</span>
              </div>
            )}
          </div>

          {/* Re-read envelope toggle */}
          <div className="pt-2">
            <button
              onClick={onReset}
              className="inline-flex items-center gap-2 text-xs font-sans-clean text-[#8e7686] hover:text-[#523d4c] transition-colors py-2.5 px-4 rounded-full hover:bg-white/70 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Fold letter back into envelope 💌</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
