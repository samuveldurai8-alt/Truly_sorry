// Ethereal ambient piano and music box lullaby engine using Web Audio API
// Created to provide a peaceful, comforting atmosphere with zero external audio asset dependencies.

class AmbientAudioEngine {
  private ctx: AudioContext | null = null;
  private isRunning: boolean = false;
  private intervalId: number | null = null;
  private masterGain: GainNode | null = null;
  private volume: number = 0.22;

  private notes = [
    // Peaceful pentatonic and major 7th chords (Frequencies in Hz)
    // C4, E4, G4, B4, D5, C5, A4, G4, E4, D4
    261.63, 329.63, 392.00, 493.88, 587.33, 523.25, 440.00, 392.00, 329.63, 293.66,
    // Higher octave sparkles
    659.25, 783.99, 987.77, 1046.50
  ];

  // Warm chord progressions (root, third, fifth, seventh)
  private chords = [
    [261.63, 329.63, 392.00, 493.88], // Cmaj7
    [220.00, 261.63, 329.63, 392.00], // Am7
    [174.61, 220.00, 261.63, 329.63], // Fmaj7
    [196.00, 246.94, 293.66, 392.00], // G6/Gadd9
  ];

  private currentChordIndex = 0;
  private stepInChord = 0;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play a soft, bell-like piano note with warm harmonic overtone
  private playNote(freq: number, duration: number = 2.4, velocity: number = 0.35) {
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;

    // Fundamental oscillator (sine for soft warmth)
    const osc1 = this.ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    // Subtle second oscillator for acoustic fullness (triangle)
    const osc2 = this.ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 1.001, now); // slight detune for chorus warmth

    // Lowpass filter for cozy, mellow softness
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, now);
    filter.frequency.exponentialRampToValueAtTime(600, now + duration);

    // Note Gain Envelope
    const noteGain = this.ctx.createGain();
    noteGain.gain.setValueAtTime(0.0001, now);
    // Soft attack (80ms to avoid any harsh click)
    noteGain.gain.exponentialRampToValueAtTime(velocity, now + 0.08);
    // Natural long exponential decay
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    // Delay/Reverb simulation for spacious dreaminess
    const delay = this.ctx.createDelay();
    delay.delayTime.setValueAtTime(0.32, now);
    const delayFeedback = this.ctx.createGain();
    delayFeedback.gain.setValueAtTime(0.28, now);
    const delayFilter = this.ctx.createBiquadFilter();
    delayFilter.frequency.setValueAtTime(1000, now);

    // Connect routing
    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(noteGain);

    noteGain.connect(this.masterGain);

    // Send through delay loop
    noteGain.connect(delay);
    delay.connect(delayFilter);
    delayFilter.connect(delayFeedback);
    delayFeedback.connect(delay);
    delayFeedback.connect(this.masterGain);

    osc1.start(now);
    osc2.start(now);

    osc1.stop(now + duration + 0.5);
    osc2.stop(now + duration + 0.5);
  }

  // Soft sparkle chime when envelope opens
  public playChime() {
    try {
      this.initContext();
      if (!this.ctx) return;
      const chimeNotes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
      chimeNotes.forEach((freq, i) => {
        setTimeout(() => {
          this.playNote(freq, 2.0, 0.25);
        }, i * 110);
      });
    } catch {
      // Audio not permitted or supported
    }
  }

  // Soft single heart tap note
  public playHeartNote() {
    try {
      this.initContext();
      if (!this.ctx) return;
      const notes = [659.25, 783.99, 880.00, 1046.50];
      const randomNote = notes[Math.floor(Math.random() * notes.length)];
      this.playNote(randomNote, 1.8, 0.2);
    } catch {
      // Audio not permitted
    }
  }

  public start() {
    if (this.isRunning) return;
    this.initContext();
    this.isRunning = true;

    // Gentle arpeggio loop: ~600ms per note, creating a slow, comforting tempo
    this.intervalId = window.setInterval(() => {
      if (!this.isRunning) return;

      const currentChord = this.chords[this.currentChordIndex];
      const noteFreq = currentChord[this.stepInChord % currentChord.length];

      // Occasional peaceful high sparkle note
      if (Math.random() > 0.65) {
        const sparkle = this.notes[Math.floor(Math.random() * this.notes.length)];
        setTimeout(() => {
          if (this.isRunning) {
            this.playNote(sparkle, 2.8, 0.12);
          }
        }, 300);
      }

      this.playNote(noteFreq, 2.5, 0.22);

      this.stepInChord++;
      if (this.stepInChord >= currentChord.length * 2) {
        this.stepInChord = 0;
        this.currentChordIndex = (this.currentChordIndex + 1) % this.chords.length;
      }
    }, 750);
  }

  public stop() {
    this.isRunning = false;
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  public toggle(): boolean {
    if (this.isRunning) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isRunning;
  }

  public setVolumeLevel(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public getVolumeLevel(): number {
    return this.volume;
  }
}

export const audioEngine = new AmbientAudioEngine();
