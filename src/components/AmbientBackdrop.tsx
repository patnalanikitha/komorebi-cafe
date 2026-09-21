import React, { useEffect, useRef, useState } from 'react';
import { sounds } from '../utils/soundEngine';
import { CloudRain, Volume2, VolumeX, Sun, Moon } from 'lucide-react';

export type LightingMode = 'rainy' | 'day' | 'evening';

interface AmbientBackdropProps {
  lighting: LightingMode;
  onSetLighting: (l: LightingMode) => void;
}

export const AmbientBackdrop: React.FC<AmbientBackdropProps> = ({
  lighting,
  onSetLighting,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [rainSoundActive, setRainSoundActive] = useState<boolean>(false);
  const [rainVolume, setRainVolume] = useState<number>(0.25);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Procedural Canvas Raindrops on Window Pane
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    const height = (canvas.height = canvas.parentElement?.clientHeight || 400);

    interface Drop {
      x: number;
      y: number;
      length: number;
      speed: number;
      opacity: number;
    }

    const drops: Drop[] = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      length: 12 + Math.random() * 18,
      speed: 1.5 + Math.random() * 3.5,
      opacity: 0.15 + Math.random() * 0.35,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Rain density depends on lighting mode
      const dropMultiplier = lighting === 'rainy' ? 1.0 : 0.25;

      ctx.lineWidth = 1.2;
      ctx.lineCap = 'round';

      drops.forEach((drop) => {
        ctx.strokeStyle = `rgba(215, 235, 245, ${drop.opacity * dropMultiplier})`;
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x - 1, drop.y + drop.length);
        ctx.stroke();

        drop.y += drop.speed * (lighting === 'rainy' ? 1.2 : 0.6);
        if (drop.y > height) {
          drop.y = -drop.length;
          drop.x = Math.random() * width;
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [lighting]);

  const toggleRainAudio = () => {
    const nextState = !rainSoundActive;
    setRainSoundActive(nextState);
    sounds.toggleRain(nextState, rainVolume);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setRainVolume(vol);
    if (rainSoundActive) {
      sounds.toggleRain(true, vol);
    }
  };

  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    sounds.setMuted(nextMute);
  };

  return (
    <div className="w-full relative overflow-hidden rounded-3xl border-2 border-[#45271a] shadow-2xl mb-6">
      
      {/* Background Lighting Sky Gradient */}
      <div 
        className={`w-full h-56 transition-all duration-1000 relative flex items-center justify-center ${
          lighting === 'rainy'
            ? 'bg-gradient-to-b from-[#18232c] via-[#283845] to-[#402a20]'
            : lighting === 'evening'
            ? 'bg-gradient-to-b from-[#241324] via-[#4d2838] to-[#542d1f]'
            : 'bg-gradient-to-b from-[#4a6b82] via-[#859ea8] to-[#472d20]'
        }`}
      >
        {/* Distant Rainy Silhouette Trees / Houses */}
        <div className="absolute inset-x-0 bottom-0 h-28 opacity-25 pointer-events-none flex items-end justify-between px-10">
          <div className="w-16 h-24 bg-[#111920] rounded-t-full" />
          <div className="w-24 h-16 bg-[#111920] rounded-t-lg -ml-6" />
          <div className="w-20 h-28 bg-[#111920] rounded-t-full" />
          <div className="w-28 h-20 bg-[#111920] rounded-t-xl -mr-4" />
          <div className="w-14 h-22 bg-[#111920] rounded-t-full" />
        </div>

        {/* Raindrop Canvas on Glass */}
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />

        {/* Wooden Window Panes / Mullions */}
        <div className="absolute inset-0 pointer-events-none z-10 flex">
          {/* Vertical mullions */}
          <div className="w-1/3 h-full border-r-4 border-[#301a11]/90 shadow-md" />
          <div className="w-1/3 h-full border-r-4 border-[#301a11]/90 shadow-md" />
        </div>
        <div className="absolute inset-0 pointer-events-none z-10 flex items-center">
          {/* Horizontal transom bar */}
          <div className="w-full h-4 bg-[#301a11]/90 border-y border-[#4a2b1d] shadow-md" />
        </div>

        {/* Hanging Brass Café Pendant Lamp */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none">
          {/* Cord */}
          <div className="w-0.5 h-16 bg-[#1a0f0a]" />
          {/* Brass shade */}
          <div className="w-24 h-10 bg-gradient-to-b from-[#8f6336] to-[#d4984f] rounded-t-full border-t border-[#f7d594] shadow-lg flex items-center justify-center relative">
            <div className="w-28 h-2 bg-[#70481f] rounded-full absolute -bottom-1" />
          </div>
          {/* Warm Bulb Glow */}
          <div className="w-10 h-10 rounded-full bg-amber-300/30 blur-md -mt-2 animate-pulse" />
        </div>

        {/* Floating Top Controls Overlay */}
        <div className="absolute top-3 inset-x-4 z-30 flex items-center justify-between">
          
          {/* Café Title & Status */}
          <div className="flex items-center gap-2 bg-[#1f120c]/85 px-3.5 py-1.5 rounded-2xl border border-[#472718] backdrop-blur-sm shadow-md">
            <span className="text-base">☕</span>
            <div>
              <h1 className="font-cozy text-xs font-bold text-[#faf0e1] tracking-wide">
                Komorebi Café & Roastery
              </h1>
              <span className="text-[9px] font-pixel text-emerald-400 block -mt-0.5">
                ● COZY COUNTER OPEN
              </span>
            </div>
          </div>

          {/* Sensory Sound & Lighting Controls */}
          <div className="flex items-center gap-2 bg-[#1f120c]/85 p-1.5 rounded-2xl border border-[#472718] backdrop-blur-sm shadow-md">
            
            {/* Lighting Mode Presets */}
            <div className="flex gap-1 pr-2 border-r border-[#3d2013]">
              <button
                onClick={() => onSetLighting('rainy')}
                className={`p-1.5 rounded-xl text-xs transition-all ${
                  lighting === 'rainy' ? 'bg-[#402619] text-sky-300 shadow-sm' : 'text-[#8f6e59] hover:text-[#d1b29d]'
                }`}
                title="Rainy Window Ambiance"
              >
                <CloudRain className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onSetLighting('day')}
                className={`p-1.5 rounded-xl text-xs transition-all ${
                  lighting === 'day' ? 'bg-[#402619] text-amber-300 shadow-sm' : 'text-[#8f6e59] hover:text-[#d1b29d]'
                }`}
                title="Gentle Morning Sunbeams"
              >
                <Sun className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onSetLighting('evening')}
                className={`p-1.5 rounded-xl text-xs transition-all ${
                  lighting === 'evening' ? 'bg-[#402619] text-purple-300 shadow-sm' : 'text-[#8f6e59] hover:text-[#d1b29d]'
                }`}
                title="Cozy Evening Amber"
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Procedural Rain Sound Toggle */}
            <button
              onClick={toggleRainAudio}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-cozy transition-all ${
                rainSoundActive
                  ? 'bg-sky-950/80 text-sky-300 border border-sky-800/60 font-semibold'
                  : 'bg-[#2b160d] text-[#a68069] hover:bg-[#3b2014]'
              }`}
              title="Toggle Procedural Rain Audio"
            >
              <CloudRain className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
              <span>{rainSoundActive ? 'Rain Audio On' : 'Play Rain'}</span>
            </button>

            {/* Rain Volume Slider */}
            {rainSoundActive && (
              <input
                type="range"
                min="0.05"
                max="0.5"
                step="0.05"
                value={rainVolume}
                onChange={handleVolumeChange}
                className="w-16 accent-sky-400 cursor-pointer h-1.5 bg-[#3b2014] rounded-lg"
                title={`Rain Volume: ${Math.round(rainVolume * 200)}%`}
              />
            )}

            {/* Global Mute Toggle */}
            <button
              onClick={toggleMute}
              className="p-1.5 rounded-xl bg-[#2b160d] text-[#a68069] hover:text-white transition-all"
              title={isMuted ? 'Unmute All Sounds' : 'Mute Sounds'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};
