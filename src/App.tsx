import React, { useState, useEffect } from 'react';
// @ts-ignore
import userAvatar from './assets/images/user_avatar_1781938584172.jpg';
// @ts-ignore
import aeIcon from './assets/images/ae_icon_1781939305386.jpg';
// @ts-ignore
import clapperboardIcon from './assets/images/clapperboard_icon_1781939320101.jpg';
// @ts-ignore
import chainLinkIcon from './assets/images/chain_link_icon_1781939330221.jpg';
// @ts-ignore
import logoWireframeIcon from './assets/images/logo_wireframe_icon_1781939342636.jpg';
import {
  Menu,
  ChevronRight,
  ArrowLeft,
  Share2,
  ExternalLink,
  Search,
  Sparkles,
  Info,
  Layers,
  Flame,
  Bookmark,
  Compass,
  MessageCircle,
  Copy,
  CheckCircle2,
  Tv,
  Award,
  Sun,
  Moon,
  Play,
  Pause,
  Volume2,
  VolumeX
} from 'lucide-react';
import {
  SparkleDoodle,
  ArrowDoodle,
  LoopArrowDoodle,
  UnderlineScribble,
  SmileyDoodle,
  SquiggleWaveDoodle,
  HeartDoodle,
  SpeechBubbleFrame
} from './components/Doodles';
import {
  ShapeAnimationDemo,
  LogoAnimationDemo,
  VideoEditingDemo
} from './components/InteractiveDemos';
import {
  SHAPE_PROJECTS,
  LOGO_PROJECTS,
  VIDEO_PROJECTS,
  USEFUL_LINKS,
  LinkCardItem,
  ProjectItem
} from './data';

const VIDEO_URLS: Record<string, string> = {
  'video-01': 'https://cdn.pixabay.com/video/2021/08/17/85375-589665975_tiny.mp4',
  'video-02': 'https://cdn.pixabay.com/video/2020/09/17/50005-452331584_tiny.mp4',
  'video-03': 'https://cdn.pixabay.com/video/2024/05/26/213797_tiny.mp4'
};

interface VideoPreviewProps {
  projectId: string;
  isDarkMode: boolean;
}

function VideoPreview({ projectId, isDarkMode }: VideoPreviewProps) {
  const videoUrl = VIDEO_URLS[projectId] || '';
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    if (isPlaying) {
      video.play().catch(() => {
        setIsPlaying(false);
      });
    } else {
      video.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = isMuted;
  }, [isMuted]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration || 10);
    }
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = Math.floor(secs % 60).toString().padStart(2, '0');
    const ms = Math.floor((secs % 1) * 100).toString().padStart(2, '0');
    return `${m}:${s}:${ms}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className={`mt-3 relative overflow-hidden rounded-xl border-2 ${
      isDarkMode ? 'border-[#7C3AED] bg-black' : 'border-[#4A3E39] bg-stone-950'
    } aspect-video group shadow-[2px_2px_0px_0px_rgba(0,0,0,0.15)] flex flex-col justify-between`}>
      {/* Video element */}
      {videoUrl ? (
        <video
          ref={videoRef}
          src={videoUrl}
          loop
          muted={isMuted}
          playsInline
          autoPlay
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          className="absolute inset-0 w-full h-full object-cover select-none"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-white/50 text-xs font-mono">
          [Сбой видео]
        </div>
      )}

      {/* Viewfinder overlay grid & graphics */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-2 select-none z-10">
        {/* Top bar indicators */}
        <div className="flex items-center justify-between text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] font-mono text-[8px] tracking-wider uppercase">
          <div className="flex items-center gap-1 bg-black/55 px-1.5 py-0.5 rounded backdrop-blur-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse" />
            <span>● Z-REC</span>
          </div>
          <div className="bg-black/55 px-1.5 py-0.5 rounded backdrop-blur-xs text-[#E28743] font-bold">
            1080P FHD
          </div>
        </div>

        {/* Center reticle */}
        <div className="absolute inset-0 flex items-center justify-center text-white/20">
          <div className="relative w-6 h-6 flex items-center justify-center">
            <div className="absolute w-2.5 h-[1px] bg-white/35 top-1/2 left-0 -translate-y-1/2" />
            <div className="absolute w-2.5 h-[1px] bg-white/35 top-1/2 right-0 -translate-y-1/2" />
            <div className="absolute w-[1px] h-2.5 bg-white/35 top-0 left-1/2 -translate-x-1/2" />
            <div className="absolute w-[1px] h-2.5 bg-white/35 bottom-0 left-1/2 -translate-x-1/2" />
          </div>
        </div>

        {/* Framing corners crop marks */}
        <div className="absolute top-1.5 left-1.5 w-2.5 h-2.5 border-t-2 border-l-2 border-white/35" />
        <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 border-t-2 border-r-2 border-white/35" />
        <div className="absolute bottom-2.5 left-1.5 w-2.5 h-2.5 border-b-2 border-l-2 border-white/35" />
        <div className="absolute bottom-2.5 right-1.5 w-2.5 h-2.5 border-b-2 border-r-2 border-white/35" />

        {/* Bottom stats overlay bar */}
        <div className="mt-auto flex items-center justify-between text-[7px] text-white/85 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] font-mono mt-auto pt-2">
          <div className="flex items-center gap-1.5 bg-black/35 px-1 py-0.5 rounded">
            <span className="opacity-75">STBY</span>
            <span>TC {formatTime(currentTime)}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-black/35 px-1 py-0.5 rounded">
            <span>LR [▮▮▯]</span>
          </div>
        </div>
      </div>

      {/* Premiere Pro-inspired Playback sequence progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-stone-700/50 pointer-events-none z-10">
        <div
          className="h-full bg-[#E28743] transition-all duration-75"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Play/Pause & Audio interactive controls (appear on hover nicely) */}
      <div className="absolute inset-x-0 bottom-4 px-2.5 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20 pointer-events-none">
        <div className="flex items-center gap-1 pointer-events-auto">
          <button
            onClick={togglePlay}
            className="w-6 h-6 rounded bg-black/75 hover:bg-black/95 text-white flex items-center justify-center transition-all scale-95 hover:scale-100 cursor-pointer border border-white/10 shadow-md"
            title={isPlaying ? "Пауза" : "Воспроизвести"}
          >
            {isPlaying ? <Pause className="w-2.5 h-2.5 fill-white" /> : <Play className="w-2.5 h-2.5 fill-white ml-[1px]" />}
          </button>
          
          <button
            onClick={toggleMute}
            className="w-6 h-6 rounded bg-black/75 hover:bg-black/95 text-white flex items-center justify-center transition-all scale-95 hover:scale-100 cursor-pointer border border-white/10 shadow-md"
            title={isMuted ? "Включить звук" : "Выключить звук"}
          >
            {isMuted ? <VolumeX className="w-2.5 h-2.5" /> : <Volume2 className="w-2.5 h-2.5" />}
          </button>
        </div>

        <div className="bg-black/75 border border-white/10 shadow-md px-1.5 py-0.5 rounded text-[8px] font-mono font-bold text-white uppercase select-none pointer-events-auto">
          {projectId === 'video-01' ? 'REEL' : projectId === 'video-02' ? 'TRAVEL' : 'GLITCH'}
        </div>
      </div>
    </div>
  );
}

type ViewMode = 'home' | 'shape-animation' | 'logo-animation' | 'video-editing' | 'useful-links';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [linkCategory, setLinkCategory] = useState<'all' | 'ai' | 'motion' | 'stocks' | 'typography'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [likes, setLikes] = useState<Record<string, number>>({
    'shape-01': 142,
    'shape-02': 98,
    'shape-03': 210,
    'logo-01': 322,
    'logo-02': 187,
    'logo-03': 155,
    'video-01': 432,
    'video-02': 295,
    'video-03': 188,
  });
  const [likedList, setLikedList] = useState<Record<string, boolean>>({});
  const [isMobileWrapper, setIsMobileWrapper] = useState<boolean>(true);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem('motion-hub-theme') === 'dark';
    } catch (e) {
      return false;
    }
  });
  const [showShareSuccess, setShowShareSuccess] = useState<boolean>(false);

  // Telegram Mini App native API bindings
  const tg = (window as any).Telegram?.WebApp;

  useEffect(() => {
    try {
      localStorage.setItem('motion-hub-theme', isDarkMode ? 'dark' : 'light');
    } catch (e) {}

    if (tg) {
      tg.ready();
      const themeColor = isDarkMode ? '#0F0C20' : '#ECE5DD';
      tg.setHeaderColor(themeColor);
      tg.setBackgroundColor(themeColor);
      tg.expand?.();
    }
  }, [tg, isDarkMode]);

  // Handle Back Button synchronization
  useEffect(() => {
    if (tg) {
      if (currentView !== 'home') {
        tg.BackButton.show();
        tg.BackButton.onClick(handleBackClick);
      } else {
        tg.BackButton.hide();
      }
    }
    return () => {
      if (tg) {
        tg.BackButton.offClick(handleBackClick);
      }
    };
  }, [currentView, tg]);

  const handleBackClick = () => {
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (view: ViewMode) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMenuOpen(false);
    
    // Trigger Telegram Haptic feedback
    if (tg && tg.HapticFeedback) {
      tg.HapticFeedback.impactOccurred('medium');
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    if (tg && tg.HapticFeedback) {
      tg.HapticFeedback.notificationOccurred('success');
    }
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleLike = (projectId: string) => {
    const isLiked = likedList[projectId];
    setLikedList(prev => ({ ...prev, [projectId]: !isLiked }));
    setLikes(prev => ({
      ...prev,
      [projectId]: isLiked ? prev[projectId] - 1 : prev[projectId] + 1
    }));
    
    if (tg && tg.HapticFeedback) {
      tg.HapticFeedback.impactOccurred('light');
    }
  };

  const handleShare = () => {
    const sectionNames: Record<string, string> = {
      'shape-animation': 'Шейповая анимация 🌀',
      'logo-animation': 'Анимация логотипов 🎨',
      'video-editing': 'Монтаж видео 🎬',
      'useful-links': 'Полезные ссылки для моушн-дизайнеров 🔗',
    };

    const sectionTitle = sectionNames[currentView] || 'Портфолио Моушн-Дизайнера';
    const currentUrl = window.location.href;
    const text = `Посмотри раздел "${sectionTitle}" в портфолио Motion Designer! ✨`;

    const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(text)}`;

    if (tg) {
      if (tg.HapticFeedback) {
        tg.HapticFeedback.notificationOccurred('success');
      }
      if (typeof tg.openTelegramLink === 'function') {
        tg.openTelegramLink(shareUrl);
        setShowShareSuccess(true);
        setTimeout(() => setShowShareSuccess(false), 2500);
        return;
      }
    }

    try {
      window.open(shareUrl, '_blank');
      setShowShareSuccess(true);
      setTimeout(() => setShowShareSuccess(false), 2500);
    } catch (e) {
      window.location.href = shareUrl;
    }
  };

  const filteredLinks = USEFUL_LINKS.filter(link => {
    const matchesCategory = linkCategory === 'all' || link.category === linkCategory;
    const matchesSearch = link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          link.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          link.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#090712] text-[#E4E2F0]' : 'bg-[#ECE5DD] text-[#332F2C]'} flex flex-col items-center justify-start p-0 sm:p-4 overflow-x-hidden select-none font-sans transition-colors duration-300`}>
      
      {/* Upper toggle to let users turn off the desktop smartframe container easily */}
      <div className={`hidden sm:flex justify-end w-full max-w-md pb-2 px-2 text-[11px] font-mono opacity-60 ${isDarkMode ? 'text-[#C4B5FD]' : 'text-[#332F2C]'}`}>
        <button 
          onClick={() => setIsMobileWrapper(!isMobileWrapper)} 
          className="hover:underline cursor-pointer flex items-center gap-1.5"
        >
          {isMobileWrapper ? "🖥 Развернуть во весь экран (Web mode)" : "📱 Вернуть форму Mini App (Mobile)"}
        </button>
      </div>

      {/* Main Container Wrapper: Adapts 100% to Telegram webapp on mobile, and frames beautifully on desktop */}
      <div 
        id="app-container"
        className={`w-full ${isDarkMode ? 'bg-[#0F0C20] text-[#E4E2F0]' : 'bg-[#ECE5DD] text-[#332F2C]'} relative flex flex-col transition-all duration-300 ${
          isMobileWrapper 
            ? `sm:max-w-md sm:min-h-[85vh] sm:rounded-[40px] sm:border-8 ${isDarkMode ? 'sm:border-[#1F193B]' : 'sm:border-zinc-900'} sm:shadow-[0_24px_50px_rgba(0,0,0,0.3)] sm:overflow-hidden` 
            : 'max-w-3xl min-h-screen rounded-none border-0'
        }`}
      >
        
        {/* Playful Header Navigation Row */}
        <header className="px-5 pt-6 pb-4 flex items-center justify-between relative z-20 select-none">
          {/* Top Left Menu Button */}
          <button
            id="menu-trigger-btn"
            onClick={() => {
              setMenuOpen(!menuOpen);
              if (tg && tg.HapticFeedback) tg.HapticFeedback.impactOccurred('light');
            }}
            className={`w-11 h-11 rounded-full cursor-pointer border-2 ${
              isDarkMode
                ? 'bg-[#1A1635] text-white border-[#7C3AED] shadow-[3px_3px_0px_0px_#7C3AED] active:shadow-[1px_1px_0px_0px_#7C3AED]'
                : 'bg-white text-[#4A3E39] border-[#4A3E39] shadow-[3px_3px_0px_0px_#4A3E39] active:shadow-[1px_1px_0px_0px_#4A3E39]'
            } active:translate-x-0.5 active:translate-y-0.5 flex items-center justify-center transition-all`}
            title="Меню"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Mini Center App Mode Badge */}
          <div className={`${
            isDarkMode
              ? 'bg-[#2E2452] border-[#7C3AED]/40 text-[#C4B5FD]'
              : 'bg-amber-100 border-[#4A3E39]/30 text-[#92400E]'
          } border rounded-full py-1 px-3 text-[10px] font-bold font-mono tracking-wider shadow-sm flex items-center gap-1 transition-colors duration-300`}>
            <span className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-[#A855F7] animate-pulse' : 'bg-amber-500 animate-ping'}`} />
            MOTION_HUB.TG
          </div>

          {/* Top Right Creative Avatar */}
          <button
            onClick={() => {
              setMenuOpen(true);
              if (tg && tg.HapticFeedback) tg.HapticFeedback.impactOccurred('light');
            }}
            className={`w-11 h-11 rounded-full cursor-pointer border-2 ${
              isDarkMode ? 'border-[#7C3AED] shadow-[3px_3px_0px_0px_#7C3AED]' : 'border-[#4A3E39] shadow-[3px_3px_0px_0px_#4A3E39]'
            } overflow-hidden flex items-center justify-center transition-transform hover:scale-105 active:scale-95`}
          >
            {/* Elegant physical photo of the designer */}
            <img 
              src={userAvatar} 
              alt="Motion Designer Avatar" 
              className="w-full h-full object-cover" 
              referrerPolicy="no-referrer"
            />
          </button>
        </header>

        {/* ------------------------------------------------------------- */}
        {/* VIEW 1: HOME PAGE (PORTFOLIO HOME SCREEN) */}
        {/* ------------------------------------------------------------- */}
        {currentView === 'home' && (
          <div className="px-5 pb-8 flex-grow flex flex-col justify-between relative select-none z-10 animate-fade-in">
            
            {/* Top Greeting area */}
            <div className="relative mt-2">
              <div className="relative">
                <h1 className={`font-hand text-6xl font-bold tracking-normal leading-none rotate-[-2deg] ${
                  isDarkMode ? 'text-white' : 'text-[#2B2320]'
                }`}>
                  Привет!
                </h1>
                
                {/* Smiley Face doodle */}
                <SmileyDoodle className="absolute top-1 right-12 text-[#9A3412] animate-float" />
                <SparkleDoodle className="absolute -top-3 left-28 text-[#F59E0B] animate-pulse-subtle" />
              </div>

              {/* Paper note sticker containing description */}
              <div className="relative mt-5 mb-8 mr-1 transform rotate-[1.5deg] leading-relaxed">
                <div className="bg-[#FFFDF4] border-2 border-[#4A3E39] rounded-2xl p-5 shadow-[5px_5px_0px_0px_#4A3E39] relative">
                  {/* Pin button sticker look */}
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-red-400/80 border border-[#4A3E39] rounded shadow-sm rotate-[-4deg]" />
                  
                  <p className="font-hand text-xl text-[#3A322F] text-center">
                    Здесь собраны мои работы и полезные материалы ✨
                  </p>
                </div>

                {/* Arrow loop pointing towards cards */}
                <ArrowDoodle className="absolute -right-2 -bottom-10 text-[#4A3E39] rotate-[30deg] pointer-events-none opacity-80" />
                <SparkleDoodle className="absolute -left-3 -bottom-6 text-[#10B981] w-4 h-4" />
              </div>
            </div>

            {/* Main Navigation (4 cards grid 2x2) */}
            <div className="mt-4">
              <h2 className={`text-xs uppercase font-bold tracking-widest mb-3 ml-1 font-mono ${
                isDarkMode ? 'text-[#9B95B6]' : 'text-[#7F746E]'
              }`}>
                Разделы Портфолио
              </h2>

              <div className="grid grid-cols-2 gap-4">
                
                {/* CARD 1: Purple Shape Animation */}
                <div
                  id="card-shape-animation"
                  onClick={() => handleNavigate('shape-animation')}
                  className="bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] border-2 border-[#4A3E39] rounded-[24px] p-4 text-white relative cursor-pointer shadow-[3px_3px_0px_0px_#4A3E39] hover:shadow-[4px_4px_0px_0px_#4A3E39] hover:-translate-y-1 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_#4A3E39] transition-all group overflow-hidden"
                >
                  {/* Subtle vector background grid */}
                  <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 15%, transparent 15%)', backgroundSize: '10px 10px' }} />
                  
                  {/* 3D Ae image icon */}
                  <div className="h-20 w-20 mx-auto mt-2 flex items-center justify-center relative">
                    <img 
                      src={aeIcon} 
                      alt="Ae Icon" 
                      className="w-16 h-16 object-contain animate-float" 
                      style={{ animationDuration: '3.5s' }}
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <h3 className="font-sans font-extrabold text-sm tracking-tight leading-tight mt-4 pr-4">
                    Шейповая <br /> анимация
                  </h3>

                  {/* Arrow button bottom right */}
                  <div className="absolute bottom-3 right-3 w-7 h-7 bg-white text-[#4D3D35] border border-[#4A3E39] rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 active:scale-95 transition-transform">
                    <ChevronRight className="w-4 h-4 ml-0.5" />
                  </div>
                </div>

                {/* CARD 2: Warm Yellow Logo Animation */}
                <div
                  id="card-logo-animation"
                  onClick={() => handleNavigate('logo-animation')}
                  className="bg-[#FCD34D] border-2 border-[#4A3E39] rounded-[24px] p-4 text-[#3A322F] relative cursor-pointer shadow-[3px_3px_0px_0px_#4A3E39] hover:shadow-[4px_4px_0px_0px_#4A3E39] hover:-translate-y-1 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_#4A3E39] transition-all group overflow-hidden"
                >
                  {/* Subtle vector grid */}
                  <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #000 15%, transparent 15%)', backgroundSize: '12px 12px' }} />

                  {/* 3D LOGO Wireframe image icon */}
                  <div className="h-20 w-20 mx-auto mt-2 flex items-center justify-center relative">
                    <img 
                      src={logoWireframeIcon} 
                      alt="Logo Icon" 
                      className="w-18 h-18 object-contain animate-float-slow" 
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <h3 className="font-sans font-extrabold text-sm tracking-tight leading-tight mt-4 pr-4">
                    Анимация <br /> логотипов
                  </h3>

                  {/* Arrow button bottom right */}
                  <div className="absolute bottom-3 right-3 w-7 h-7 bg-white text-[#4D3D35] border border-[#4A3E39] rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 active:scale-95 transition-transform">
                    <ChevronRight className="w-4 h-4 ml-0.5" />
                  </div>
                </div>

                {/* CARD 3: Cute Blue Video Editing */}
                <div
                  id="card-video-editing"
                  onClick={() => handleNavigate('video-editing')}
                  className="bg-[#60A5FA] border-2 border-[#4A3E39] rounded-[24px] p-4 text-white relative cursor-pointer shadow-[3px_3px_0px_0px_#4A3E39] hover:shadow-[4px_4px_0px_0px_#4A3E39] hover:-translate-y-1 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_#4A3E39] transition-all group overflow-hidden"
                >
                  <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'linear-gradient(45deg, #fff 25%, transparent 25%)', backgroundSize: '15px 15px' }} />

                  {/* 3D Clapperboard image icon */}
                  <div className="h-20 w-20 mx-auto mt-2 flex items-center justify-center relative">
                    <img 
                      src={clapperboardIcon} 
                      alt="Clapperboard Icon" 
                      className="w-16 h-16 object-contain animate-float" 
                      style={{ animationDuration: '4.5s' }}
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <h3 className="font-sans font-extrabold text-sm tracking-tight leading-tight mt-4 pr-4">
                    Монтаж <br /> видео
                  </h3>

                  {/* Arrow button bottom right */}
                  <div className="absolute bottom-3 right-3 w-7 h-7 bg-white text-[#4D3D35] border border-[#4A3E39] rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 active:scale-95 transition-transform">
                    <ChevronRight className="w-4 h-4 ml-0.5" />
                  </div>
                </div>

                {/* CARD 4: Light Green Resources Links */}
                <div
                  id="card-useful-links"
                  onClick={() => handleNavigate('useful-links')}
                  className="bg-[#34D399] border-2 border-[#4A3E39] rounded-[24px] p-4 text-[#1E3A1E] relative cursor-pointer shadow-[3px_3px_0px_0px_#4A3E39] hover:shadow-[4px_4px_0px_0px_#4A3E39] hover:-translate-y-1 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_#4A3E39] transition-all group overflow-hidden"
                >
                  <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'radial-gradient(ellipse, #000 12%, transparent 12%)', backgroundSize: '14px 14px' }} />

                  {/* 3D Chain link image icon */}
                  <div className="h-20 w-20 mx-auto mt-2 flex items-center justify-center relative">
                    <img 
                      src={chainLinkIcon} 
                      alt="Chain Link Icon" 
                      className="w-16 h-16 object-contain animate-bounce" 
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <h3 className="font-sans font-extrabold text-sm tracking-tight leading-tight mt-4 pr-4">
                    Полезные <br /> ссылки
                  </h3>

                  {/* Arrow button bottom right */}
                  <div className="absolute bottom-3 right-3 w-7 h-7 bg-white text-[#4D3D35] border border-[#4A3E39] rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 active:scale-95 transition-transform">
                    <ChevronRight className="w-4 h-4 ml-0.5" />
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom Speech bubble area */}
            <div className="mt-10 relative">
              <SpeechBubbleFrame className="z-10 relative">
                <p className="font-hand text-2xl text-[#3A322F] text-center leading-tight">
                  Выбирай раздел и смотри работы!
                </p>
              </SpeechBubbleFrame>

              {/* Handdrawn little curved arrows in absolute position pointing upwards to the cards */}
              <LoopArrowDoodle className="absolute -left-3 -top-12 text-[#9A3412] transform -rotate-12 pointer-events-none opacity-85" />
              <div className="absolute right-6 -top-12 select-none animate-bounce" style={{ animationDuration: '3s' }}>
                <span className="text-3xl">👇</span>
              </div>
            </div>

          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* VIEW 2: SHAPE ANIMATION */}
        {/* ------------------------------------------------------------- */}
        {currentView === 'shape-animation' && (
          <div className="px-5 pb-8 flex-grow flex flex-col justify-between select-none z-10 animate-fade-in">
            {/* Header / Back row */}
            <div className="mb-6">
              <button
                onClick={handleBackClick}
                className={`inline-flex items-center gap-2 cursor-pointer ${
                  isDarkMode
                    ? 'bg-[#1E1B3A] text-[#C4B5FD] border-[#7C3AED] shadow-[2.5px_2.5px_0px_0px_#7C3AED]'
                    : 'bg-white text-[#4A3E39] border-[#4A3E39] shadow-[2.5px_2.5px_0px_0px_#4A3E39]'
                } px-4 py-2 border-2 rounded-xl font-bold text-xs active:translate-x-0.5 active:translate-y-0.5 active:shadow-[0px_0px_0px_0px_] transition-all`}
              >
                <ArrowLeft className="w-3.5 h-3.5" /> НАЗАД
              </button>

              <h2 className={`font-hand text-5xl font-bold mt-5 leading-none ${
                isDarkMode ? 'text-white' : 'text-[#201815]'
              }`}>
                Шейповая анимация
              </h2>
              <p className={`text-xs font-medium mt-1 leading-relaxed ${
                isDarkMode ? 'text-[#B8B4C9]' : 'text-[#7F746E]'
              }`}>
                Интерактивные векторные циклы, плавные деформации и физика взрывных элементов.
              </p>
            </div>

            {/* LIVE SIMULATOR PLAYER (Visual craft benchmark!) */}
            <div className="mb-8">
              <span className={`text-[10px] tracking-wider uppercase font-bold ml-1 font-mono ${
                isDarkMode ? 'text-[#968EB5]' : 'text-[#7F746E]'
              }`}>
                Игры с векторами: Рендер в реальном времени
              </span>
              <div className="mt-1.5">
                <ShapeAnimationDemo />
              </div>
            </div>

            {/* PROJECTS GRID LIST */}
            <div className="space-y-6">
              <h3 className={`text-xs uppercase font-bold tracking-widest ml-1 font-mono ${
                isDarkMode ? 'text-[#9A95B6]' : 'text-[#7F746E]'
              }`}>
                Избранные проекты
              </h3>

              {SHAPE_PROJECTS.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-[#FFFDF4] border-2 border-[#4A3E39] rounded-2xl p-5 shadow-[3px_3px_0px_0px_#4A3E39] flex flex-col justify-between relative"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono tracking-wider font-extrabold uppercase px-2.5 py-0.5 bg-violet-100 border border-[#4A3E39]/20 rounded-full text-violet-800">
                      🏷️ {proj.category}
                    </span>
                    <span className="text-[9px] font-mono bg-[#ECE5DD] px-2 py-0.5 rounded-full text-[#5A504C] font-semibold">
                      ⏱ {proj.duration}
                    </span>
                  </div>

                  <h4 className="font-sans font-extrabold text-base text-[#3A322F] mt-2.5 leading-snug">
                    {proj.title}
                  </h4>
                  <p className="text-xs text-[#5A504C] leading-relaxed mt-1.5">
                    {proj.description}
                  </p>

                  {/* Project metadata pills */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {proj.tools.map((tool, idx) => (
                      <span key={idx} className="text-[9px] font-mono font-bold bg-[#FAF8F5] border border-stone-200/50 px-2 py-0.5 rounded text-neutral-600">
                        #{tool}
                      </span>
                    ))}
                  </div>

                  {/* Project interactions */}
                  <div className="border-t border-[#4A3E39]/10 pt-3 mt-4 flex items-center justify-between">
                    <button
                      onClick={() => toggleLike(proj.id)}
                      className={`flex items-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold border-2 cursor-pointer transition-colors ${
                        likedList[proj.id]
                          ? 'border-transparent bg-rose-100 text-rose-600'
                          : 'border-[#E8E2DD] bg-white text-[#7F746E] hover:bg-stone-50'
                      }`}
                    >
                      <HeartDoodle className={`w-3.5 h-3.5 ${likedList[proj.id] ? 'fill-rose-550 stroke-rose-550' : 'stroke-stone-500'}`} />
                      <span>{likes[proj.id]} лайков</span>
                    </button>

                    <button
                      onClick={() => copyToClipboard(`https://behance.net/work/${proj.id}`, proj.id)}
                      className="text-[11px] font-bold text-[#E28743] hover:text-[#C57335] flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      {copiedId === proj.id ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                          <span>Скопировано</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Скопировать линк</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Nice hand-drawn footer graphic tip */}
            <div className="mt-8 bg-zinc-900 text-zinc-300 font-mono text-[10px] tracking-wide rounded-xl p-3 text-center opacity-80 border-2 border-[#4A3E39]/10 shadow-sm">
              ℹ️ Для встраивания этих файлов в интерфейсы мобильных приложений используется оптимизированный сетевой рендер Lottie JSON.
            </div>

          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* VIEW 3: LOGO ANIMATION */}
        {/* ------------------------------------------------------------- */}
        {currentView === 'logo-animation' && (
          <div className="px-5 pb-8 flex-grow flex flex-col justify-between select-none z-10 animate-fade-in">
            {/* Header row */}
            <div className="mb-6">
              <button
                onClick={handleBackClick}
                className={`inline-flex items-center gap-2 cursor-pointer ${
                  isDarkMode
                    ? 'bg-[#1E1B3A] text-[#C4B5FD] border-[#7C3AED] shadow-[2.5px_2.5px_0px_0px_#7C3AED]'
                    : 'bg-white text-[#4A3E39] border-[#4A3E39] shadow-[2.5px_2.5px_0px_0px_#4A3E39]'
                } px-4 py-2 border-2 rounded-xl font-bold text-xs active:translate-x-0.5 active:translate-y-0.5 active:shadow-[0px_0px_0px_0px_] transition-all`}
              >
                <ArrowLeft className="w-3.5 h-3.5" /> НАЗАД
              </button>

              <h2 className={`font-hand text-5xl font-bold mt-5 leading-none ${
                isDarkMode ? 'text-white' : 'text-[#201815]'
              }`}>
                Анимация логотипов
              </h2>
              <p className={`text-xs font-medium mt-1 leading-relaxed ${
                isDarkMode ? 'text-[#B8B4C9]' : 'text-[#7F746E]'
              }`}>
                Тонкая анимация кривых Безье, динамический оверлей элементов и элегантные появления.
              </p>
            </div>

            {/* INTERACTIVE LOGO ANIMATOR PREVIEW */}
            <div className="mb-8">
              <span className={`text-[10px] tracking-wider uppercase font-bold ml-1 font-mono ${
                isDarkMode ? 'text-[#968EB5]' : 'text-[#7F746E]'
              }`}>
                Таймлайн презентатор: Переход векторов
              </span>
              <div className="mt-1.5">
                <LogoAnimationDemo />
              </div>
            </div>

            {/* PROJECTS */}
            <div className="space-y-6">
              <h3 className={`text-xs uppercase font-bold tracking-widest ml-1 font-mono ${
                isDarkMode ? 'text-[#9A95B6]' : 'text-[#7F746E]'
              }`}>
                Кейсы логотипов
              </h3>

              {LOGO_PROJECTS.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-[#FFFDF4] border-2 border-[#4A3E39] rounded-2xl p-5 shadow-[3px_3px_0px_0px_#4A3E39] flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono tracking-wider font-extrabold uppercase px-2.5 py-0.5 bg-amber-100 border border-[#4A3E39]/20 rounded-full text-amber-800">
                      ⚡ {proj.category}
                    </span>
                    <span className="text-[9px] font-mono bg-[#ECE5DD] px-2 py-0.5 rounded-full text-[#5A504C] font-semibold">
                      ⏱ {proj.duration}
                    </span>
                  </div>

                  <h4 className="font-sans font-extrabold text-base text-[#3A322F] mt-2.5 leading-snug">
                    {proj.title}
                  </h4>
                  <p className="text-xs text-[#5A504C] leading-relaxed mt-1.5">
                    {proj.description}
                  </p>

                  {/* Project metadata pills */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {proj.tools.map((tool, idx) => (
                      <span key={idx} className="text-[9px] font-mono font-bold bg-[#FAF8F5] border border-stone-200/50 px-2 py-0.5 rounded text-neutral-600">
                        #{tool}
                      </span>
                    ))}
                  </div>

                  {/* Interactions */}
                  <div className="border-t border-[#4A3E39]/10 pt-3 mt-4 flex items-center justify-between">
                    <button
                      onClick={() => toggleLike(proj.id)}
                      className={`flex items-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold border-2 cursor-pointer transition-colors ${
                        likedList[proj.id]
                          ? 'border-transparent bg-rose-100 text-rose-600'
                          : 'border-[#E8E2DD] bg-white text-[#7F746E]'
                      }`}
                    >
                      <HeartDoodle className={`w-3.5 h-3.5 ${likedList[proj.id] ? 'fill-rose-550 stroke-rose-550' : 'stroke-stone-500'}`} />
                      <span>{likes[proj.id]} лайков</span>
                    </button>

                    <button
                      onClick={() => copyToClipboard(`https://behance.net/work/${proj.id}`, proj.id)}
                      className="text-[11px] font-bold text-[#E28743] hover:text-[#C57335] flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      {copiedId === proj.id ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                          <span>Скопировано</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Скопировать линк</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* VIEW 4: VIDEO EDITING */}
        {/* ------------------------------------------------------------- */}
        {currentView === 'video-editing' && (
          <div className="px-5 pb-8 flex-grow flex flex-col justify-between select-none z-10 animate-fade-in">
            {/* Header row */}
            <div className="mb-6">
              <button
                onClick={handleBackClick}
                className={`inline-flex items-center gap-2 cursor-pointer ${
                  isDarkMode
                    ? 'bg-[#1E1B3A] text-[#C4B5FD] border-[#7C3AED] shadow-[2.5px_2.5px_0px_0px_#7C3AED]'
                    : 'bg-white text-[#4A3E39] border-[#4A3E39] shadow-[2.5px_2.5px_0px_0px_#4A3E39]'
                } px-4 py-2 border-2 rounded-xl font-bold text-xs active:translate-x-0.5 active:translate-y-0.5 active:shadow-[0px_0px_0px_0px_] transition-all`}
              >
                <ArrowLeft className="w-3.5 h-3.5" /> НАЗАД
              </button>

              <h2 className={`font-hand text-5xl font-bold mt-5 leading-none ${
                isDarkMode ? 'text-white' : 'text-[#201815]'
              }`}>
                Монтаж видео
              </h2>
              <p className={`text-xs font-medium mt-1 leading-relaxed ${
                isDarkMode ? 'text-[#B8B4C9]' : 'text-[#7F746E]'
              }`}>
                Режиссура нарезки, кинематографическая цветокоррекция, dynamic transitions и тайминг.
              </p>
            </div>

            {/* INTERACTIVE TIMELINE EDIT PREVIEW */}
            <div className="mb-8">
              <span className={`text-[10px] tracking-wider uppercase font-bold ml-1 font-mono ${
                isDarkMode ? 'text-[#968EB5]' : 'text-[#7F746E]'
              }`}>
                Интерактивный Видеоредактор: Симулятор Рендера
              </span>
              <div className="mt-1.5">
                <VideoEditingDemo />
              </div>
            </div>

            {/* CORE CASE PROJECTS */}
            <div className="space-y-6">
              <h3 className={`text-xs uppercase font-bold tracking-widest ml-1 font-mono ${
                isDarkMode ? 'text-[#9A95B6]' : 'text-[#7F746E]'
              }`}>
                Кейсы Из Монтажной Рубки
              </h3>

              {VIDEO_PROJECTS.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-[#FFFDF4] border-2 border-[#4A3E39] rounded-2xl p-5 shadow-[3px_3px_0px_0px_#4A3E39] flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono tracking-wider font-extrabold uppercase px-2.5 py-0.5 bg-blue-100 border border-[#4A3E39]/20 rounded-full text-blue-800">
                      🎬 {proj.category}
                    </span>
                    <span className="text-[9px] font-mono bg-[#ECE5DD] px-2 py-0.5 rounded-full text-[#5A504C] font-semibold">
                      ⏱ {proj.duration}
                    </span>
                  </div>

                  <VideoPreview projectId={proj.id} isDarkMode={isDarkMode} />

                  <h4 className="font-sans font-extrabold text-base text-[#3A322F] mt-2.5 leading-snug">
                    {proj.title}
                  </h4>
                  <p className="text-xs text-[#5A504C] leading-relaxed mt-1.5">
                    {proj.description}
                  </p>

                  {/* Project metadata pills */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {proj.tools.map((tool, idx) => (
                      <span key={idx} className="text-[9px] font-mono font-bold bg-[#FAF8F5] border border-stone-200/50 px-2 py-0.5 rounded text-neutral-600">
                        #{tool}
                      </span>
                    ))}
                  </div>

                  {/* Interactions */}
                  <div className="border-t border-[#4A3E39]/10 pt-3 mt-4 flex items-center justify-between">
                    <button
                      onClick={() => toggleLike(proj.id)}
                      className={`flex items-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold border-2 cursor-pointer transition-colors ${
                        likedList[proj.id]
                          ? 'border-transparent bg-rose-100 text-rose-600'
                          : 'border-[#E8E2DD] bg-white text-[#7F746E]'
                      }`}
                    >
                      <HeartDoodle className={`w-3.5 h-3.5 ${likedList[proj.id] ? 'fill-rose-550 stroke-rose-550' : 'stroke-stone-500'}`} />
                      <span>{likes[proj.id]} лайков</span>
                    </button>

                    <button
                      onClick={() => copyToClipboard(`https://behance.net/work/${proj.id}`, proj.id)}
                      className="text-[11px] font-bold text-[#E28743] hover:text-[#C57335] flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      {copiedId === proj.id ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                          <span>Скопировано</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Скопировать линк</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* VIEW 5: USEFUL LINKS / RESOURCES */}
        {/* ------------------------------------------------------------- */}
        {currentView === 'useful-links' && (
          <div className="px-5 pb-8 flex-grow flex flex-col justify-between select-none z-10 animate-fade-in">
            {/* Header row */}
            <div className="mb-6">
              <button
                onClick={handleBackClick}
                className={`inline-flex items-center gap-2 cursor-pointer ${
                  isDarkMode
                    ? 'bg-[#1E1B3A] text-[#C4B5FD] border-[#7C3AED] shadow-[2.5px_2.5px_0px_0px_#7C3AED]'
                    : 'bg-white text-[#4A3E39] border-[#4A3E39] shadow-[2.5px_2.5px_0px_0px_#4A3E39]'
                } px-4 py-2 border-2 rounded-xl font-bold text-xs active:translate-x-0.5 active:translate-y-0.5 active:shadow-[0px_0px_0px_0px_] transition-all`}
              >
                <ArrowLeft className="w-3.5 h-3.5" /> НАЗАД
              </button>

              <h2 className={`font-hand text-5xl font-bold mt-5 leading-none ${
                isDarkMode ? 'text-white' : 'text-[#201815]'
              }`}>
                Полезные ссылки
              </h2>
              <p className={`text-xs font-medium mt-1 leading-relaxed ${
                isDarkMode ? 'text-[#B8B4C9]' : 'text-[#7F746E]'
              }`}>
                Инструменты искусственного интеллекта, motion-ресурсы, стоки и материалы для типографики.
              </p>
            </div>

            {/* Search Input Box */}
            <div className="mb-5 relative">
              <input
                type="text"
                placeholder="Поиск по ссылкам и тегам..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full ${
                  isDarkMode 
                    ? 'bg-[#1E1B3A] text-white border-[#7C3AED] shadow-[3px_3px_0px_0px_#7C3AED] focus:border-[#A78BFA] placeholder-[#B8B4C9]/45' 
                    : 'bg-white text-[#4A3E39] border-[#4A3E39] shadow-[3px_3px_0px_0px_#4A3E39] focus:border-[#4A3E39] placeholder-[#7F746E]/60'
                } border-2 rounded-2xl py-3 pl-11 pr-4 text-xs font-semibold focus:outline-none transition-transform`}
              />
              <Search className={`absolute left-4 top-3.5 w-4.5 h-4.5 ${isDarkMode ? 'text-[#B8B4C9]/45' : 'text-[#7F746E]/60'}`} />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-3.5 font-mono text-[10px] font-bold text-[#E28743] hover:text-[#C57335]"
                >
                  ОЧИСТИТЬ
                </button>
              )}
            </div>

            {/* Categorized Filter Tabs (Horizontal scroll bar) */}
            <div className="mb-6 overflow-x-auto no-scrollbar flex gap-2 pb-2">
              {[
                { key: 'all', title: '🌐 Все' },
                { key: 'ai', title: '🤖 AI Инструменты' },
                { key: 'motion', title: '🎨 Моушн Дизайн' },
                { key: 'stocks', title: '📦 Стоковые Футажи' },
                { key: 'typography', title: '🅰️ Типографика' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => {
                    setLinkCategory(tab.key as any);
                    if (tg && tg.HapticFeedback) tg.HapticFeedback.impactOccurred('light');
                  }}
                  className={`py-2 px-3.5 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer border-2 transition-all ${
                    linkCategory === tab.key
                      ? isDarkMode
                        ? 'bg-[#7C3AED] text-white border-transparent shadow-[2px_2px_0px_0px_#B8A2F8]'
                        : 'bg-[#4A3E39] text-white border-transparent shadow-[2px_2px_0px_0px_#A89F9A]'
                      : isDarkMode
                        ? 'bg-[#1E1B3A] text-[#FAF9FD] border-[#2E284F]'
                        : 'bg-white text-[#4A3E39] border-[#E8E2DD] hover:bg-stone-50'
                  }`}
                >
                  {tab.title}
                </button>
              ))}
            </div>

            {/* FILTERED LINKS STACK */}
            <div className="space-y-4">
              {filteredLinks.length > 0 ? (
                filteredLinks.map((link, idx) => (
                  <div
                    key={idx}
                    className="bg-white border-2 border-[#4A3E39] rounded-2xl p-5 shadow-[4px_4px_0px_0px_#4A3E39] relative flex flex-col justify-between group hover:-translate-y-0.5 active:translate-y-0 transition-transform"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[8px] font-bold font-mono tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-300 rounded px-2 py-0.5 uppercase">
                          {link.badge || link.category.toUpperCase()}
                        </span>
                        
                        {/* Bullet point vector emoji indicator */}
                        <span className="text-base">
                          {link.category === 'ai' && '🤖'}
                          {link.category === 'motion' && '🎨'}
                          {link.category === 'stocks' && '📦'}
                          {link.category === 'typography' && '🅰️'}
                        </span>
                      </div>

                      <h4 className="font-sans font-extrabold text-base text-[#3A322F]">
                        {link.title}
                      </h4>
                      <p className="text-xs text-[#5A504C] leading-relaxed mt-1.5">
                        {link.desc}
                      </p>

                      <div className="flex flex-wrap gap-1 mt-3">
                        {link.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            onClick={() => setSearchQuery(tag)}
                            className="text-[9px] font-mono bg-stone-100 hover:bg-stone-200 border border-stone-200 text-stone-600 px-1.5 py-0.5 rounded cursor-pointer transition-colors"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-[#4A3E39]/10 pt-3.5 mt-4 flex items-center justify-between">
                      <button
                        onClick={() => copyToClipboard(link.url, `link-${idx}`)}
                        className="text-[10px] font-semibold text-[#7F746E] hover:text-[#4A3E39] flex items-center gap-1 cursor-pointer"
                      >
                        {copiedId === `link-${idx}` ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                            <span>Скопировано в буфер</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Скопировать URL</span>
                          </>
                        )}
                      </button>

                      <a
                        href={link.url}
                        target="_blank"
                        rel="referrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7C3AED] hover:text-[#5B21B6] group-hover:underline"
                      >
                        ОТКРЫТЬ САЙТ <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-amber-50 rounded-2xl border border-amber-200 p-8 text-center text-[#7F746E]">
                  <p className="text-sm font-semibold">Ничего не найдено 🤔</p>
                  <p className="text-xs mt-1 text-[#7F746E]/70">Попробуйте ввести другое ключевое слово или сбросить фильтр!</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setLinkCategory('all');
                    }}
                    className="mt-4 px-4 py-2 bg-white border border-[#4A3E39] font-bold text-xs text-[#4A3E39] rounded-xl hover:bg-stone-50 transition-colors"
                  >
                    СБРОСИТЬ ПОИСК
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* INTERACTIVE SIDEBAR MENU / DRAWER */}
        {/* ------------------------------------------------------------- */}
        <div
          id="menu-sidebar-drawer"
          className={`absolute inset-0 bg-stone-950/60 backdrop-blur-xs z-50 transition-all duration-300 ${
            menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          onClick={(e) => {
            // Dismiss menu drawer if user taps background
            if (e.target === e.currentTarget) {
              setMenuOpen(false);
            }
          }}
        >
          {/* Menu Card Sheet */}
          <div
            className={`w-[85%] max-w-[320px] h-full ${
              isDarkMode 
                ? 'bg-[#120F26] border-r-4 border-[#7C3AED] text-[#E4E2F0]' 
                : 'bg-[#ECE5DD] border-r-4 border-[#4A3E39] text-[#332F2C]'
            } p-6 flex flex-col justify-between shadow-2xl transition-all duration-300 ${
              menuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div>
              {/* Header inside drawer */}
              <div className={`flex items-center justify-between pb-6 border-b-2 ${isDarkMode ? 'border-[#7C3AED]/20' : 'border-[#4A3E39]/15'}`}>
                <div className="flex items-center gap-2.5">
                  <div className={`w-9 h-9 rounded-full overflow-hidden border-2 flex-shrink-0 ${isDarkMode ? 'border-[#7C3AED]' : 'border-[#4A3E39]'}`}>
                    <img 
                      src={userAvatar} 
                      alt="Avatar" 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h3 className={`font-extrabold text-sm leading-tight ${isDarkMode ? 'text-white' : 'text-[#2B2320]'}`}>MOTION HERO</h3>
                    <p className={`text-[10px] font-mono tracking-widest uppercase ${isDarkMode ? 'text-[#968EB5]' : 'text-[#7F746E]'}`}>Telegram Designer</p>
                  </div>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className={`w-8 h-8 rounded-full border ${
                    isDarkMode ? 'border-[#7C3AED]/30 text-zinc-400 hover:text-white' : 'border-[#4A3E39]/30 text-stone-500 hover:text-stone-850'
                  } flex items-center justify-center cursor-pointer active:scale-90`}
                >
                  ✕
                </button>
              </div>

              {/* Navigation links inside drawer */}
              <nav className="mt-8 space-y-4">
                <span className={`text-[9px] font-mono font-bold tracking-widest uppercase ml-1 ${isDarkMode ? 'text-[#968EB5]' : 'text-[#7F746E]'}`}>МЕНЮ НАВИГАЦИИ</span>
                
                {[
                  { view: 'home', label: '🏠 Главная панель' },
                  { view: 'shape-animation', label: '💜 Шейповая анимация' },
                  { view: 'logo-animation', label: '💛 Анимация логотипов' },
                  { view: 'video-editing', label: '💙 Монтаж видео' },
                  { view: 'useful-links', label: '💚 Полезные ссылки' },
                ].map((item) => (
                  <button
                    key={item.view}
                    onClick={() => handleNavigate(item.view as any)}
                    className={`w-full text-left py-3 px-4 rounded-xl border-2 cursor-pointer font-bold text-xs tracking-wide flex items-center justify-between transition-all ${
                      currentView === item.view
                        ? isDarkMode
                          ? 'bg-[#7C3AED] text-white border-transparent shadow-[2px_2px_0px_0px_#B8A2F8]'
                          : 'bg-[#4A3E39] text-white border-transparent shadow-[2px_2px_0px_0px_#A89F9A]'
                        : isDarkMode
                          ? 'bg-[#1E1B3A] text-[#FAF9FD] border-[#2E284F] hover:bg-[#252147]'
                          : 'bg-white text-[#4A3E39] border-[#E8E2DD] hover:bg-stone-50'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                  </button>
                ))}
              </nav>

              {/* Theme Toggle Button inside Sidebar */}
              <div className="mt-6">
                <button
                  onClick={() => {
                    setIsDarkMode(!isDarkMode);
                    if (tg && tg.HapticFeedback) tg.HapticFeedback.impactOccurred('medium');
                  }}
                  className={`w-full py-3 px-4 rounded-xl border-2 cursor-pointer font-bold text-xs tracking-wide flex items-center justify-between transition-all ${
                    isDarkMode
                      ? 'bg-[#2E2452] text-[#FAF9FD] border-[#7C3AED] shadow-[3px_3px_0px_0px_#7C3AED] active:shadow-[1px_1px_0px_0px_#7C3AED] active:translate-x-0.5 active:translate-y-0.5'
                      : 'bg-[#F2EFE9] text-[#332F2C] border-[#4A3E39] shadow-[3px_3px_0px_0px_#4A3E39] active:shadow-[1px_1px_0px_0px_#4A3E39] active:translate-x-0.5 active:translate-y-0.5'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {isDarkMode ? <Sun className="w-4 h-4 text-[#FBBF24]" /> : <Moon className="w-4 h-4 text-[#4A3E39]" />}
                    <span>{isDarkMode ? '🌞 Midnight Motion' : '🌜 Тема: Светлая'}</span>
                  </div>
                  <span className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded-full ${
                    isDarkMode ? 'bg-[#7C3AED]/30 text-[#C4B5FD]' : 'bg-[#4A3E39]/10 text-[#4A3E39]'
                  }`}>
                    {isDarkMode ? 'ТЕМНАЯ' : 'СВЕТЛАЯ'}
                  </span>
                </button>
              </div>

              {/* Designer Fun stats inside shelf */}
              <div className={`mt-6 border-2 rounded-2xl p-4 shadow-[3px_3px_0px_0px_#4A3E39] ${
                isDarkMode ? 'bg-[#211B45] border-[#7C3AED]' : 'bg-[#FFFDF4] border-[#4A3E39]'
              }`}>
                <h4 className={`text-[10px] uppercase font-bold tracking-wider font-mono mb-2 flex items-center gap-1 ${isDarkMode ? 'text-[#C4B5FD]' : 'text-[#7F746E]'}`}>
                  <Award className="w-3.5 h-3.5 text-amber-500 animate-wiggle" /> Творческая Статистика
                </h4>
                <div className={`space-y-1.5 font-mono text-[10px] font-semibold ${isDarkMode ? 'text-zinc-300' : 'text-[#5A504C]'}`}>
                  <div className="flex justify-between">
                    <span>Выполненных заказов:</span>
                    <span className={`${isDarkMode ? 'text-[#FAF9FD]' : 'text-[#9A3412]'} font-bold`}>250+</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Года в моушене:</span>
                    <span className={`${isDarkMode ? 'text-[#FAF9FD]' : 'text-[#9A3412]'} font-bold`}>6 лет</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Доверие клиентов:</span>
                    <span className={`${isDarkMode ? 'text-[#FAF9FD]' : 'text-[#9A3412]'} font-bold`}>100% ⭐</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA action Contact Button at bottom of drawer container */}
            <div className="pt-6 border-t border-[#4A3E39]/15">
              <a
                href="https://t.me/vinipuhoff"
                target="_blank"
                rel="referrer"
                onClick={() => {
                  setMenuOpen(false);
                  if (tg && tg.HapticFeedback) tg.HapticFeedback.notificationOccurred('success');
                }}
                className="w-full py-3.5 bg-[#E28743] hover:bg-[#C57335] text-white font-extrabold rounded-2xl border-2 border-[#4A3E39] shadow-[3.5px_3.5px_0px_0px_#4A3E39] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_#4A3E39] hover:shadow-[4.5px_4.5px_0px_0px_#4A3E39] flex items-center justify-center gap-2 transition-all text-xs"
              >
                <MessageCircle className="w-4.5 h-4.5" /> СВЯЗАТЬСЯ В TELEGRAM
              </a>
              <p className="text-[8px] font-mono text-center text-[#7F746E] uppercase tracking-wider mt-3">
                Версия Mini App: v1.0.4.5
              </p>
            </div>
          </div>
        </div>

        {/* FLOATING ACTION SHARE BUTTON */}
        {currentView !== 'home' && (
          <div className="fixed sm:absolute bottom-6 right-6 z-40">
            <button
              onClick={handleShare}
              className={`flex items-center gap-2 px-4 py-3 rounded-full font-bold text-xs tracking-wider border-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.18)] transition-all cursor-pointer active:translate-y-1 active:translate-x-1 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.18)] ${
                isDarkMode
                  ? 'bg-[#7C3AED] hover:bg-[#6D28D9] text-white border-[#9F67FF]'
                  : 'bg-[#E28743] hover:bg-[#C57335] text-white border-[#4A3E39]'
              }`}
              title="Поделиться портфолио в Telegram"
            >
              <Share2 className="w-4 h-4 animate-pulse" />
              <span>ПОДЕЛИТЬСЯ</span>
            </button>
          </div>
        )}

        {/* IN-APP TOAST/SUCCESS PORTFOLIO NOTIFICATION */}
        {showShareSuccess && (
          <div className="fixed sm:absolute bottom-20 right-6 left-6 sm:left-auto sm:w-72 z-50 animate-bounce">
            <div className={`p-3.5 rounded-2xl border-2 shadow-lg flex items-center gap-2.5 ${
              isDarkMode 
                ? 'bg-[#1E1B3A] border-[#7C3AED] text-[#FAF9FD]' 
                : 'bg-white border-[#4A3E39] text-[#2B2320]'
            }`}>
              <span className="text-lg">🚀</span>
              <div className="flex-1">
                <p className="text-[11px] font-bold leading-tight">Ссылка для отправки!</p>
                <p className="text-[9px] opacity-75">Поделитесь ею с контактами в Телеграме.</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
