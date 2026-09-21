// Procedural Web Audio API Sound Engine
// 100% offline, zero latency, no external audio assets needed!

class SoundEngine {
  private ctx: AudioContext | null = null;
  private rainNode: AudioNode | null = null;
  private rainGain: GainNode | null = null;
  private isMuted: boolean = false;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // --- AMBIENT RAIN SOUNDSCAPE ---
  public toggleRain(enable: boolean, volume = 0.25) {
    this.initCtx();
    if (!this.ctx) return;

    if (!enable) {
      if (this.rainGain) {
        this.rainGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.4);
        setTimeout(() => {
          this.rainNode?.disconnect();
          this.rainGain?.disconnect();
          this.rainNode = null;
          this.rainGain = null;
        }, 500);
      }
      return;
    }

    if (this.rainNode) {
      // Adjust volume
      if (this.rainGain) {
        this.rainGain.gain.setTargetAtTime(volume, this.ctx.currentTime, 0.2);
      }
      return;
    }

    // Procedural pink noise for rain
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.08;
      b6 = white * 0.115926;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Filter to simulate raindrops against window pane
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 950;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(volume, this.ctx.currentTime + 1.2);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    whiteNoise.start(0);
    this.rainNode = whiteNoise;
    this.rainGain = gain;
  }

  // --- CERAMIC CUP CLINK ---
  public playCupClink() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1620, now);
    osc.frequency.exponentialRampToValueAtTime(1400, now + 0.15);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.2);
  }

  // --- ESPRESSO PULL / DRIP MACHINE ---
  public playEspressoPull() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Low mechanical pump hum
    const hum = this.ctx.createOscillator();
    const humGain = this.ctx.createGain();
    hum.type = 'sawtooth';
    hum.frequency.setValueAtTime(110, now);
    humGain.gain.setValueAtTime(0.08, now);
    humGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
    hum.connect(humGain);
    humGain.connect(this.ctx.destination);
    hum.start(now);
    hum.stop(now + 1.2);

    // Liquid steam trickle
    const noiseLen = this.ctx.sampleRate * 1.2;
    const buffer = this.ctx.createBuffer(1, noiseLen, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < noiseLen; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.1;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, now);
    filter.Q.value = 3.0;

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.18, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.ctx.destination);

    noise.start(now);
    noise.stop(now + 1.2);
  }

  // --- WATER / LIQUID POUR ---
  public playPour() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const noiseLen = this.ctx.sampleRate * 0.9;
    const buffer = this.ctx.createBuffer(1, noiseLen, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < noiseLen; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.15;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, now);
    filter.frequency.linearRampToValueAtTime(1500, now + 0.9);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(now);
    noise.stop(now + 0.9);
  }

  // --- STEAM WAND / FROTHER ---
  public playSteamWand() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const noiseLen = this.ctx.sampleRate * 1.4;
    const buffer = this.ctx.createBuffer(1, noiseLen, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < noiseLen; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.25;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(2400, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.02, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(now);
    noise.stop(now + 1.4);
  }

  // --- TACTILE DROP (Ice cube / Gelato scoop / Syrup pump) ---
  public playDrop() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(380, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.12);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.15);
  }

  // --- BRASS SERVICE BELL CHIME ---
  public playBellChime() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const freqs = [1980, 3120, 4800, 6200];
    const decays = [1.8, 1.2, 0.8, 0.5];

    freqs.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.2 / (idx + 1), now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + decays[idx]);

      osc.connect(gain);
      gain.connect(this.ctx!.destination);

      osc.start(now);
      osc.stop(now + decays[idx]);
    });
  }

  // --- PAPER TICKET RUSTLE ---
  public playPaperRustle() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const noiseLen = this.ctx.sampleRate * 0.15;
    const buffer = this.ctx.createBuffer(1, noiseLen, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < noiseLen; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.1;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(3000, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(now);
    noise.stop(now + 0.15);
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && this.rainGain) {
      this.rainGain.gain.setValueAtTime(0, this.ctx?.currentTime || 0);
    }
  }

  public getMuted() {
    return this.isMuted;
  }
}

export const sounds = new SoundEngine();
