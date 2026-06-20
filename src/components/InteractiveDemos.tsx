import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Sparkles, Film, Eye, Tag, Sliders, Volume2, VolumeX, ListRestart, Layers, CheckCircle2 } from 'lucide-react';

// ==========================================
// 1. SHAPE ANIMATION DEMO
// ==========================================
interface ShapeItem {
  id: number;
  type: 'circle' | 'square' | 'triangle' | 'star';
  x: number;
  y: number;
  size: number;
  color: string;
  vx: number;
  vy: number;
  angle: number;
  spin: number;
}

export const ShapeAnimationDemo: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [morphStyle, setMorphStyle] = useState<'liquid' | 'geometric' | 'spring'>('liquid');
  const [speed, setSpeed] = useState<number>(1);
  const [morphValue, setMorphValue] = useState<number>(0);
  const [shapes, setShapes] = useState<ShapeItem[]>([
    { id: 1, type: 'circle', x: 25, y: 35, size: 45, color: '#A78BFA', vx: 0.4, vy: -0.3, angle: 0, spin: 0.5 },
    { id: 2, type: 'star', x: 75, y: 65, size: 40, color: '#FBCFE8', vx: -0.3, vy: 0.5, angle: 45, spin: -0.8 },
    { id: 3, type: 'triangle', x: 50, y: 70, size: 35, color: '#6EE7B7', vx: 0.5, vy: -0.4, angle: 120, spin: 1.2 },
    { id: 4, type: 'square', x: 30, y: 75, size: 30, color: '#FCD34D', vx: -0.4, vy: -0.5, angle: 10, spin: -0.3 },
  ]);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isPlaying) {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      return;
    }

    const updateFrame = () => {
      // 1. Update positions for standard bouncing shapes
      setShapes((prev) =>
        prev.map((s) => {
          let nx = s.x + s.vx * speed;
          let ny = s.y + s.vy * speed;
          let nvx = s.vx;
          let nvy = s.vy;

          if (nx < 10 || nx > 90) nvx = -nvx;
          if (ny < 15 || ny > 85) nvy = -nvy;

          return {
            ...s,
            x: Math.max(10, Math.min(90, nx)),
            y: Math.max(15, Math.min(85, ny)),
            vx: nvx,
            vy: nvy,
            angle: s.angle + s.spin * speed,
          };
        })
      );

      // 2. Continuous morph cycle
      setMorphValue((prev) => (prev + 0.015 * speed) % (Math.PI * 2));
      animationRef.current = requestAnimationFrame(updateFrame);
    };

    animationRef.current = requestAnimationFrame(updateFrame);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying, speed]);

  const triggerBurst = () => {
    // Add random temporary shapes
    const types: ('circle' | 'square' | 'triangle' | 'star')[] = ['circle', 'square', 'triangle', 'star'];
    const colors = ['#FCA5A5', '#FCD34D', '#86EFAC', '#93C5FD', '#C084FC', '#F472B6'];
    const newItems: ShapeItem[] = Array.from({ length: 6 }).map((_, i) => ({
      id: Date.now() + i,
      type: types[Math.floor(Math.random() * types.length)],
      x: 35 + Math.random() * 30,
      y: 35 + Math.random() * 30,
      size: 15 + Math.random() * 20,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 3,
      vy: (Math.random() - 0.5) * 3,
      angle: Math.random() * 360,
      spin: (Math.random() - 0.5) * 4,
    }));
    setShapes((prev) => [...prev, ...newItems]);

    // Keep shapes capped at 12 to maintain performant limits
    setTimeout(() => {
      setShapes((prev) => prev.slice(0, 4));
    }, 2500);
  };

  // SVG helper to get star paths
  const getStarPath = (size: number) => {
    return `M 0 ${-size} L ${size * 0.3} ${-size * 0.3} L ${size} 0 L ${size * 0.3} ${size * 0.3} L 0 ${size} L ${-size * 0.3} ${size * 0.3} L ${-size} 0 L ${-size * 0.3} ${-size * 0.3} Z`;
  };

  // SVGs for complex morphing container in center
  const getMorphPath = () => {
    if (morphStyle === 'liquid') {
      // Dynamic blob using trig functions
      const r1 = 38 + Math.sin(morphValue) * 8;
      const r2 = 38 + Math.cos(morphValue * 1.3) * 10;
      const r3 = 42 + Math.sin(morphValue * 0.7) * 9;
      const r4 = 36 + Math.cos(morphValue * 1.8) * 7;
      return `M 50 ${50 - r1} C ${50 + r2} ${50 - r1}, ${50 + r2} ${50 + r3}, ${50} ${50 + r3} C ${50 - r4} ${50 + r3}, ${50 - r4} ${50 - r1}, ${50} ${50 - r1}`;
    } else if (morphStyle === 'geometric') {
      // Dynamic rotating polygonal morph
      const edge = 35 + Math.sin(morphValue) * 6;
      return `M 50 ${50 - edge} L ${50 + edge} 50 L 50 ${50 + edge} L ${50 - edge} 50 Z`;
    } else {
      // Organic spring bouncy teardrop
      const squish = Math.sin(morphValue * 2) * 8;
      return `M 50 ${16 + squish} C ${84 - squish} ${38 + squish}, ${74} ${78}, 50 82 C 26 L 50 ${82} C 26 ${78}, ${16 + squish} ${38 + squish}, 50 ${16 + squish}`;
    }
  };

  return (
    <div className="bg-white border-2 border-[#4A3E39] rounded-2xl overflow-hidden shadow-[4px_4px_0px_0px_#4A3E39] w-full flex flex-col">
      {/* Player Header */}
      <div className="bg-[#FAF8F5] border-b-2 border-[#4A3E39] px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-400" />
          <span className="w-3 h-3 rounded-full bg-yellow-400" />
          <span className="w-3 h-3 rounded-full bg-green-400" />
          <span className="font-mono text-xs text-[#7F746E] ml-2">shape_loop.ae</span>
        </div>
        <div className="bg-[#ECE5DD] px-2 py-0.5 rounded-full text-[10px] font-mono text-[#5A504C] flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> LIVE_RENDER
        </div>
      </div>

      {/* Interactive Render Stage */}
      <div className="relative h-64 bg-[#7C3AED]/5 overflow-hidden flex items-center justify-center select-none" style={{ backgroundImage: 'radial-gradient(#4d3d35 9%, transparent 9%)', backgroundSize: '16px 16px', backgroundOpacity: 0.1 }}>
        {/* Main Morphing Vector Shape in Center */}
        <svg className="absolute w-44 h-44 drop-shadow-[0_8px_16px_rgba(124,58,237,0.15)] overflow-visible">
          <path
            d={getMorphPath()}
            fill="url(#morph-gradient)"
            stroke="#6D28D9"
            strokeWidth="3.5"
            className="transition-all duration-75"
          />
          <defs>
            <linearGradient id="morph-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C084FC" />
              <stop offset="50%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#4C1D95" />
            </linearGradient>
          </defs>
        </svg>

        {/* Dynamic Secondary Floating Shapes */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {shapes.map((s) => (
            <g
              key={s.id}
              transform={`translate(${s.x * 3}, ${s.y * 2.4}) rotate(${s.angle})`}
              className="transition-transform duration-75"
            >
              {s.type === 'circle' && (
                <circle cx="0" cy="0" r={s.size / 2.5} fill={s.color} stroke="#4A3E39" strokeWidth="2.5" />
              )}
              {s.type === 'square' && (
                <rect
                  x={-s.size / 2}
                  y={-s.size / 2}
                  width={s.size}
                  height={s.size}
                  rx="6"
                  fill={s.color}
                  stroke="#4A3E39"
                  strokeWidth="2.5"
                />
              )}
              {s.type === 'triangle' && (
                <polygon
                  points={`0,${-s.size / 1.8} ${s.size / 1.8},${s.size / 2} ${-s.size / 1.8},${s.size / 2}`}
                  fill={s.color}
                  stroke="#4A3E39"
                  strokeWidth="2.5"
                />
              )}
              {s.type === 'star' && (
                <path d={getStarPath(s.size * 0.7)} fill={s.color} stroke="#4A3E39" strokeWidth="2.5" />
              )}
            </g>
          ))}
        </svg>

        {/* Floating Play/Pause Status Indicator Layer */}
        {!isPlaying && (
          <div className="absolute inset-0 bg-[#332F2C]/30 backdrop-blur-[1px] flex items-center justify-center transition-all">
            <div className="bg-white/95 text-[#4C1D95] font-semibold text-xs px-3 py-1.5 rounded-full border-2 border-[#4C1D95] shadow-lg flex items-center gap-1.5 animate-bounce">
              <Pause className="w-3.5 h-3.5" /> Трендовый Шейп Стоп-Кадр
            </div>
          </div>
        )}
      </div>

      {/* Control Studio Dock */}
      <div className="bg-[#FAF8F5] border-t-2 border-[#4A3E39] p-4 flex flex-col gap-4">
        {/* Playback & Custom Trigger Buttons */}
        <div className="flex flex-wrap gap-2 items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`p-2.5 rounded-full cursor-pointer border-2 border-[#4A3E39] ${isPlaying ? 'bg-[#ECE5DD] hover:bg-[#DED2C6] text-[#4A3E39]' : 'bg-[#C084FC] hover:bg-[#A78BFA] text-white'} shadow-[2px_2px_0px_0px_#4A3E39] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[0px_0px_0px_0px_#4A3E39] transition-all`}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={() => {
                setShapes([
                  { id: 1, type: 'circle', x: 25, y: 35, size: 45, color: '#A78BFA', vx: 0.4, vy: -0.3, angle: 0, spin: 0.5 },
                  { id: 2, type: 'star', x: 75, y: 65, size: 40, color: '#FBCFE8', vx: -0.3, vy: 0.5, angle: 45, spin: -0.8 },
                  { id: 3, type: 'triangle', x: 50, y: 70, size: 35, color: '#6EE7B7', vx: 0.5, vy: -0.4, angle: 120, spin: 1.2 },
                  { id: 4, type: 'square', x: 30, y: 75, size: 30, color: '#FCD34D', vx: -0.4, vy: -0.5, angle: 10, spin: -0.3 },
                ]);
                setIsPlaying(true);
              }}
              className="p-2.5 rounded-full cursor-pointer border-2 border-[#4A3E39] bg-white text-[#4A3E39] hover:bg-[#FAF8F5] shadow-[2px_2px_0px_0px_#4A3E39] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[0px_0px_0px_0px_#4A3E39] transition-all"
              title="Перезапустить физику"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={triggerBurst}
            className="px-3.5 py-1.5 rounded-xl cursor-pointer border-2 border-[#4A3E39] bg-[#E9D5FF] text-[#4A3E39] font-medium text-xs flex items-center gap-1.5 shadow-[2px_2px_0px_0px_#4A3E39] hover:bg-[#D8B4FE] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[0px_0px_0px_0px_#4A3E39] transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#7C3AED]" /> Взрыв Шейпов
          </button>
        </div>

        {/* Morph Options */}
        <div className="grid grid-cols-3 gap-2">
          {(['liquid', 'geometric', 'spring'] as const).map((style) => (
            <button
              key={style}
              onClick={() => {
                setMorphStyle(style);
                setIsPlaying(true);
              }}
              className={`py-1.5 px-2 rounded-xl text-xs font-medium border-2 cursor-pointer transition-all ${
                morphStyle === style
                  ? 'bg-[#7C3AED] text-white border-[#4A3E39] shadow-[2px_2px_0px_0px_#4A3E39]'
                  : 'bg-white text-[#4A3E39] border-[#E8E2DD] hover:bg-[#FAF8F5]'
              }`}
            >
              {style === 'liquid' && '🌊 Жидкий'}
              {style === 'geometric' && '💎 Грань'}
              {style === 'spring' && '🎈 Пружина'}
            </button>
          ))}
        </div>

        {/* Physics Speed Slider */}
        <div className="flex items-center gap-3 bg-[#F2EDE7] p-2 rounded-xl">
          <span className="text-[10px] uppercase tracking-wider font-bold text-[#7F746E] w-12 font-mono">СКОРОСТЬ:</span>
          <input
            type="range"
            min="0.1"
            max="3"
            step="0.1"
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
            className="grow cursor-pointer accent-[#7C3AED]"
          />
          <span className="font-mono text-xs text-[#5A504C] font-semibold">{speed}x</span>
        </div>
      </div>
    </div>
  );
};


// ==========================================
// 2. LOGO ANIMATION DEMO
// ==========================================
interface LogoConcept {
  id: string;
  name: string;
  tagline: string;
  themeColor: string;
  textColor: string;
  svgIcon: React.ReactNode;
}

export const LogoAnimationDemo: React.FC = () => {
  const [activeLogo, setActiveLogo] = useState<string>('logo1');
  const [revealKey, setRevealKey] = useState<number>(0);
  const [step, setStep] = useState<number>(0); // 0 = start, 1 = reveal paths, 2 = logo text bounce, 3 = perfect final

  const logos: LogoConcept[] = [
    {
      id: 'logo1',
      name: 'AURA',
      tagline: 'SPACE STUDIO',
      themeColor: '#FEF08A', // Yellow/Gold Aura
      textColor: '#854D0E',
      svgIcon: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 overflow-visible">
          <circle cx="50" cy="50" r="30" fill="none" stroke="#FBBF24" strokeWidth="1" strokeDasharray="3 3" className="animate-spin" style={{ animationDuration: '40s' }} />
          <circle cx="50" cy="50" r="24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeDasharray="6 2" className="animate-spin" style={{ animationDuration: '15s' }} />
          {/* Inner aura glow circles */}
          <circle cx="50" cy="50" r="16" fill="url(#aura-glow)" className="animate-pulse" />
          <polygon points="50,30 65,60 35,60" fill="none" stroke="#D97706" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <defs>
            <radialGradient id="aura-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FEF08A" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      )
    },
    {
      id: 'logo2',
      name: 'APEX',
      tagline: 'DYNAMICS',
      themeColor: '#93C5FD', // Ice Blue Tech
      textColor: '#1E3A8A',
      svgIcon: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 overflow-visible">
          {/* Neon lines crossing */}
          <path d="M20,50 L80,50" stroke="#3B82F6" strokeWidth="1" opacity="0.3" />
          <path d="M50,20 L50,80" stroke="#3B82F6" strokeWidth="1" opacity="0.3" />
          {/* Sharp dynamic vector paths */}
          <g className="animate-pulse" style={{ animationDuration: '2s' }}>
            <path d="M30,30 L70,30 L50,75 Z" fill="none" stroke="#1D4ED8" strokeWidth="4" strokeLinejoin="miter" strokeMiterlimit="3" />
            <path d="M50,15 L85,65" fill="none" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M50,15 L15,65" fill="none" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        </svg>
      )
    },
    {
      id: 'logo3',
      name: 'ECO',
      tagline: 'CRAFT',
      themeColor: '#A7F3D0', // Mint/Sage Eco Studio
      textColor: '#065F46',
      svgIcon: (
        <svg viewBox="0 0 100 100" className="w-16 h-16 overflow-visible">
          {/* Organic double circle */}
          <path d="M30,50 A20,20 0 0,1 70,50" fill="none" stroke="#059669" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M70,50 A20,20 0 0,1 30,50" fill="none" stroke="#34D399" strokeWidth="3" strokeDasharray="3 3" />
          {/* Organic curves / leaf look */}
          <path d="M50,30 C65,30 65,55 50,70 C35,55 35,30 50,30 Z" fill="#34D399" opacity="0.3" />
          <circle cx="50" cy="50" r="4" fill="#065F46" />
        </svg>
      )
    }
  ];

  const currentLogo = logos.find(l => l.id === activeLogo) || logos[0];

  useEffect(() => {
    // Reveal script sequences
    setStep(0);
    const t1 = setTimeout(() => setStep(1), 300); // Draw vectors
    const t2 = setTimeout(() => setStep(2), 1100); // Spring text bounce
    const t3 = setTimeout(() => setStep(3), 1800); // Complete glow
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [activeLogo, revealKey]);

  return (
    <div className="bg-white border-2 border-[#4A3E39] rounded-2xl overflow-hidden shadow-[4px_4px_0px_0px_#4A3E39] w-full flex flex-col">
      {/* Player Header */}
      <div className="bg-[#FAF8F5] border-b-2 border-[#4A3E39] px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4A3E39]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#4A3E39]" />
          </div>
          <span className="font-mono text-xs text-[#7F746E]">logo_reveal.pr</span>
        </div>
        <button
          onClick={() => setRevealKey(prev => prev + 1)}
          className="text-[10px] font-bold text-[#E28743] hover:text-[#C57335] flex items-center gap-1 cursor-pointer transition-colors"
        >
          <RotateCcw className="w-3 h-3" /> REPLAY SEQUENCE
        </button>
      </div>

      {/* Interactive Canvas Grid */}
      <div className="h-60 bg-[#1D1B1A] relative flex flex-col items-center justify-center overflow-hidden">
        {/* Playful background guide axes (Grid system) */}
        <div className="absolute inset-x-0 top-1/2 h-0.5 border-t border-[#332F2C] border-dashed pointer-events-none" />
        <div className="absolute inset-y-0 left-1/2 w-0.5 border-l border-[#332F2C] border-dashed pointer-events-none" />
        <div className="absolute top-4 left-4 font-mono text-[9px] text-[#5A504C] tracking-wide select-none">
          COMP_POSITION_GUIDE: (50%, 50%)
        </div>

        {/* Dynamic Interactive Logo Reveal elements */}
        <div className={`flex flex-col items-center transition-all duration-700 ${step >= 1 ? 'scale-110 opacity-100' : 'scale-75 opacity-20'}`}>
          {/* 3D Icon stage */}
          <div className={`relative px-6 py-6 rounded-full flex items-center justify-center transition-all duration-500 bg-radial-gradient ${step >= 3 ? 'drop-shadow-[0_12px_24px_rgba(251,191,36,0.3)]' : ''}`}>
            {/* Outline drawing effect trigger */}
            <div className={`transition-all duration-1000 ${step >= 1 ? 'stroke-dashoffset-0 rotate-12' : 'rotate-180'}`}>
              {currentLogo.svgIcon}
            </div>
            {/* Speed flare rays */}
            {step === 1 && (
              <div className="absolute inset-0 border border-t-[4px] border-[#FAF8F5] opacity-70 rounded-full animate-ping" />
            )}
          </div>

          {/* Spring Letters Slide-Up */}
          <div className="text-center mt-3 select-none overflow-hidden h-14">
            <h3
              className={`font-sans tracking-[0.25em] font-extrabold text-lg text-white transition-all duration-500 ease-out ${
                step >= 2 ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-6 opacity-0 scale-75'
              }`}
            >
              {currentLogo.name}
            </h3>
            <p
              className={`font-mono tracking-[0.4em] text-[9px] text-[#A89F9A] uppercase transition-all duration-700 delay-150 ${
                step >= 2 ? 'translate-y-0 opacity-60' : 'translate-y-4 opacity-0'
              }`}
            >
              {currentLogo.tagline}
            </p>
          </div>
        </div>

        {/* Phase Overlay Badges */}
        <div className="absolute bottom-3 left-4 flex gap-1.5">
          <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded transition-all ${step >= 1 ? 'bg-indigo-900 border border-indigo-700 text-indigo-300' : 'bg-zinc-800 text-zinc-500'}`}>
            {step >= 1 ? '✓ VECTOR_DRAW' : '⏳ DRAWING'}
          </span>
          <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded transition-all ${step >= 2 ? 'bg-emerald-900 border border-emerald-700 text-emerald-300' : 'bg-zinc-800 text-zinc-500'}`}>
            {step >= 2 ? '✓ SPRING_TWEEN' : '⏳ TWEEN'}
          </span>
        </div>
      </div>

      {/* Switcher & Presets Drawer */}
      <div className="bg-[#FAF8F5] border-t-2 border-[#4A3E39] p-4 flex flex-col gap-3">
        <span className="text-[10px] uppercase font-bold text-[#7F746E] tracking-wider font-mono">ВЫБЕРИ СТИЛЬ ЛОГОТИПА:</span>
        <div className="grid grid-cols-3 gap-2">
          {logos.map((logo) => (
            <button
              key={logo.id}
              onClick={() => {
                setActiveLogo(logo.id);
                setRevealKey(prev => prev + 1);
              }}
              className={`p-3 rounded-xl border-2 flex flex-col items-center justify-center gap-1.5 cursor-pointer text-center text-xs font-semibold select-none transition-all ${
                activeLogo === logo.id
                  ? 'border-[#4A3E39] bg-white shadow-[2px_2px_0px_0px_#4A3E39] -translate-y-0.5'
                  : 'border-[#E8E2DD] bg-[#FAF8F5] hover:bg-white text-[#7F746E]'
              }`}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300"
                style={{ backgroundColor: logo.themeColor }}
              >
                <div className="scale-60 text-white stroke-white">
                  {/* Miniature icon */}
                  {logo.id === 'logo1' && '☀️'}
                  {logo.id === 'logo2' && '⚡'}
                  {logo.id === 'logo3' && '☘️'}
                </div>
              </div>
              <span className="font-sans font-bold leading-tight truncate w-full">{logo.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};


// ==========================================
// 3. VIDEO EDITING TIMELINE DEMO
// ==========================================
export const VideoEditingDemo: React.FC = () => {
  const [filter, setFilter] = useState<'normal' | 'warm' | 'cool' | 'cyberpunk'>('normal');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(3.2); // 0 to 10 seconds
  const [aspectRatio, setAspectRatio] = useState<'cinematic' | 'vertical'>('vertical');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const animationRef = useRef<number | null>(null);

  // Playback timer ticker simulation
  useEffect(() => {
    if (!isPlaying) {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      return;
    }

    let lastTime = performance.now();
    const tick = (now: number) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      setCurrentTime((prev) => {
        const next = prev + delta;
        return next >= 10 ? 0 : next;
      });
      animationRef.current = requestAnimationFrame(tick);
    };
    animationRef.current = requestAnimationFrame(tick);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying]);

  // Color mapping based on visual filter style
  const getFilterStyle = () => {
    switch (filter) {
      case 'warm':
        return 'contrast-110 sepia-20 saturate-125 brightness-95 hue-rotate-5 bg-amber-400/5';
      case 'cool':
        return 'contrast-115 grayscale-10 saturate-90 brightness-95 hue-rotate-15 bg-blue-900/5';
      case 'cyberpunk':
        return 'contrast-125 saturate-200 hue-rotate-90 bg-indigo-500/10 drop-shadow-[0_0_8px_rgba(244,63,94,0.1)]';
      default:
        return 'contrast-100 saturate-100';
    }
  };

  return (
    <div className="bg-white border-2 border-[#4A3E39] rounded-2xl overflow-hidden shadow-[4px_4px_0px_0px_#4A3E39] w-full flex flex-col">
      {/* Playback Stage Card container */}
      <div className="bg-[#1D1B1A] p-3 flex justify-center items-center relative overflow-hidden">
        {/* Stage Frame wrapper */}
        <div
          className={`relative bg-zinc-950 rounded-lg overflow-hidden border border-zinc-800 transition-all duration-300 flex items-center justify-center ${
            aspectRatio === 'vertical' ? 'w-44 h-72' : 'w-full h-44 sm:h-56'
          }`}
        >
          {/* Main Visual Aesthetic Sequence (Vector rendering mimicking clips) */}
          <div className={`absolute inset-0 transition-all duration-300 ${getFilterStyle()} overflow-hidden flex flex-col items-center justify-center`}>
            
            {/* CLIP A: Cozy Sunset Landscapes (0s to 3s) */}
            {currentTime >= 0 && currentTime < 3 && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-[#FEE2E2] to-[#FEF3C7] text-[#991B1B] p-4 text-center">
                <div className="w-12 h-12 rounded-full border-2 border-red-800 flex items-center justify-center animate-pulse mb-2 bg-pink-100/30">
                  <Film className="w-5 h-5 text-red-800 animate-spin" style={{ animationDuration: '8s' }} />
                </div>
                <h4 className="font-bold text-[11px] uppercase tracking-wider font-mono">SCENE 01: SUNRISE</h4>
                <p className="text-[9px] font-sans opacity-70 mt-1">Трендовый градиент • Мягкие тени • Плеер 1</p>
                <div className="absolute bottom-5 text-[9px] font-mono tracking-widest bg-black/10 px-2 py-0.5 rounded">SHOT_A_01.AE</div>
              </div>
            )}

            {/* CLIP B: Geometric Parallax Loop (3s to 6.5s) */}
            {currentTime >= 3 && currentTime < 6.5 && (
              <div className="absolute inset-0 bg-[#312E81] flex flex-col items-center justify-center text-indigo-200 text-center p-4">
                <svg viewBox="0 0 100 100" className="w-16 h-16 opacity-85 animate-float mb-1">
                  <rect x="25" y="25" width="50" height="50" fill="none" stroke="#60A5FA" strokeWidth="2" className="animate-spin" style={{ animationDuration: '12s' }} />
                  <circle cx="50" cy="50" r="14" fill="#6EE7B7" opacity="0.7" />
                </svg>
                <h4 className="font-bold text-[11px] uppercase tracking-wider font-mono text-[#60A5FA]">SCENE 02: DYNAMICS</h4>
                <p className="text-[9px] font-sans text-indigo-300 opacity-80">Слайд монтаж • Фидбэк • Зум-аут</p>
                <div className="absolute bottom-5 text-[9px] font-mono tracking-widest bg-black/30 px-2 py-0.5 rounded text-[#10B981]">RENDER_GRID</div>
              </div>
            )}

            {/* CLIP C: Minimal typography card (6.5s to 10s) */}
            {currentTime >= 6.5 && currentTime <= 10 && (
              <div className="absolute inset-0 bg-[#064E3B] flex flex-col items-center justify-center text-emerald-100 text-center p-4">
                <span className="text-[8px] font-mono uppercase bg-emerald-950 text-emerald-400 px-2 py-0.5 border border-emerald-800 rounded mb-2">OUTPUT END</span>
                <span className="font-hand text-5xl leading-none text-[#FCD34D] mt-1 animate-wiggle">Красиво ✨</span>
                <p className="text-[9px] font-sans text-emerald-300 opacity-80 mt-1.5">Титры & Финальный Шейдер</p>
                <div className="absolute bottom-5 text-[9px] font-mono tracking-widest bg-black/20 px-2 py-0.5 rounded text-[#FCD34D]">03_OUTRO_END</div>
              </div>
            )}

            {/* Retro overlay grain static style */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.06] bg-repeat select-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 10%, transparent 11%)', backgroundSize: '3px 3px' }}></div>

            {/* Cinema Matte Frame lines */}
            <div className="absolute top-0 inset-x-0 h-2 bg-black/40" />
            <div className="absolute bottom-0 inset-x-0 h-2 bg-black/40" />
          </div>

          {/* HUD Recording Overlay elements */}
          <div className="absolute inset-0 pointer-events-none p-2 flex flex-col justify-between font-mono text-[9px] text-white/70 select-none">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 bg-black/40 px-1 py-0.5 rounded">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                <span>REC</span>
              </div>
              <div className="bg-black/40 px-1 py-0.5 rounded">60 FPS</div>
            </div>
            
            <div className="flex justify-between items-end">
              <div className="bg-black/45 px-1 rounded flex items-center gap-1 select-none">
                <Layers className="w-3 h-3 text-violet-400" />
                <span>FX: {filter.toUpperCase()}</span>
              </div>
              <div className="bg-black/45 px-1 rounded-sm">
                ⏱ {currentTime.toFixed(1)}s
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Editing Audio Wave & Timeline Scrubber */}
      <div className="bg-[#FAF8F5] border-t-2 border-[#4A3E39] p-4 flex flex-col gap-3">
        {/* Core Timeline controls */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 bg-emerald-150 border-2 border-[#4A3E39] text-[#4A3E39] hover:bg-emerald-100 rounded-full cursor-pointer shadow-[2px_2px_0px_0px_#4A3E39] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[0px_0px_0px_0px_#4A3E39] transition-all"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            
            <button
              onClick={() => {
                setSoundEnabled(!soundEnabled);
              }}
              className="p-2 bg-white border-2 border-[#4A3E39] text-[#4A3E39] hover:bg-[#FAF8F5] rounded-full cursor-pointer shadow-[2px_2px_0px_0px_#4A3E39] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[0px_0px_0px_0px_#4A3E39] transition-all"
              title={soundEnabled ? "Без звука" : "Включить имитацию звука"}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4 text-rose-600" />}
            </button>
          </div>

          {/* Toggle format */}
          <div className="flex gap-1 bg-[#EEF2F6] border-2 border-[#4A3E39] rounded-xl p-1 shadow-[2px_2px_0px_0px_#4A3E39] text-xs font-semibold">
            <button
              onClick={() => setAspectRatio('vertical')}
              className={`px-2 py-1 rounded-lg cursor-pointer ${aspectRatio === 'vertical' ? 'bg-[#4A3E39] text-white' : 'text-[#7F746E] hover:text-[#4A3E39]'}`}
            >
              📱 9:16 vertical
            </button>
            <button
              onClick={() => setAspectRatio('cinematic')}
              className={`px-2 py-1 rounded-lg cursor-pointer ${aspectRatio === 'cinematic' ? 'bg-[#4A3E39] text-white' : 'text-[#7F746E] hover:text-[#4A3E39]'}`}
            >
              🖥 Wide
            </button>
          </div>
        </div>

        {/* Audio Wave Sound visualizer simulation */}
        <div className="flex items-end justify-between h-8 bg-zinc-950 rounded-lg p-1.5 gap-[2px]">
          {Array.from({ length: 32 }).map((_, i) => {
            // Cycle wave height based on audio track timer
            const mult = soundEnabled && isPlaying ? (Math.sin(currentTime * 4 + i * 0.4) + 1) / 2 : 0.15;
            const heightRaw = Math.max(15, (Math.cos(i * 0.25) * 35 + 50) * mult);
            return (
              <div
                key={i}
                className={`w-1 rounded-t transition-all ${
                  soundEnabled && isPlaying ? 'bg-emerald-400 shadow-[0_0_4px_rgba(52,211,153,0.4)]' : 'bg-transparent border-t border-[#7F746E]/30'
                }`}
                style={{ height: `${heightRaw}%` }}
              />
            );
          })}
        </div>

        {/* Interactive Scrub Timeline bar with cursor */}
        <div className="flex flex-col gap-1">
          <div className="relative h-6 bg-[#EEF2F6] border-2 border-[#4A3E39] rounded-xl overflow-hidden cursor-pointer select-none">
            {/* Split segments colored visually */}
            <div className="absolute inset-y-0 left-0 w-[30%] bg-orange-200 border-r border-[#4A3E39]/30 text-[9px] font-mono text-orange-900 font-bold flex items-center justify-center">CLIP_SUNRISE</div>
            <div className="absolute inset-y-0 left-[30%] w-[35%] bg-indigo-200 border-r border-[#4A3E39]/30 text-[9px] font-mono text-indigo-900 font-bold flex items-center justify-center">PARALLAX_X</div>
            <div className="absolute inset-y-0 left-[65%] w-[35%] bg-emerald-250 text-[9px] font-mono text-emerald-900 font-bold flex items-center justify-center">MINI_OUTRO</div>

            {/* Slider bar overlay */}
            <input
              type="range"
              min="0"
              max="9.9"
              step="0.1"
              value={currentTime}
              onChange={(e) => {
                setCurrentTime(parseFloat(e.target.value));
              }}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-10"
            />
            {/* Visible Playhead scrubber stem */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-red-650 pointer-events-none transition-all duration-75 flex flex-col items-center"
              style={{ left: `${(currentTime / 10) * 100}%` }}
            >
              <div className="w-3 h-3 bg-red-650 rounded-full border border-white -mt-0.5 shadow-md" />
            </div>
          </div>
          <div className="flex justify-between font-mono text-[9px] text-[#7F746E] px-1">
            <span>00:00.0</span>
            <span className="text-red-500 font-bold">PLAYHEAD: 00:0{currentTime.toFixed(1)}</span>
            <span>00:10.0</span>
          </div>
        </div>

        {/* Cinematic Filter Studio Switcher */}
        <div className="flex flex-col gap-1 w-full">
          <span className="text-[10px] uppercase font-bold text-[#7F746E] tracking-wider font-mono">ЦВЕТОКОРРЕКЦИЯ (LUTs):</span>
          <div className="grid grid-cols-4 gap-1.5 mt-1">
            {(['normal', 'warm', 'cool', 'cyberpunk'] as const).map((style) => (
              <button
                key={style}
                onClick={() => setFilter(style)}
                className={`py-1.5 rounded-lg border text-[10px] font-bold uppercase transition-all duration-200 ${
                  filter === style
                    ? 'bg-[#332F2C] text-white border-transparent shadow-[1.5px_1.5px_0px_0px_#A89F9A]'
                    : 'bg-white text-[#7F746E] border-slate-200 hover:bg-[#FAF8F5]'
                }`}
              >
                {style === 'normal' && '🎬 Rec709'}
                {style === 'warm' && '🌅 Warm'}
                {style === 'cool' && '❄️ Cool'}
                {style === 'cyberpunk' && '👾 Cyber'}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
