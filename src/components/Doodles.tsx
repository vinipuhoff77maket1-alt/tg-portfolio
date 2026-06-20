import React from 'react';

/**
 * Handmade SVG Doodles to give the app a friendly, creative, and craft-designed feel.
 * All SVGs are responsive, usecurrentColor for custom coloring, and have subtle stroke drawing styling.
 */

interface DoodleProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

// Sparkle stars
export const SparkleDoodle: React.FC<DoodleProps> = ({ className, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`w-6 h-6 ${className}`}
    {...props}
  >
    <path d="M12 2C12 2 12.5 8.5 13 9C13.5 9.5 20 10 20 10C20 10 13.5 10.5 13 11C12.5 11.5 12 18 12 18C12 18 11.5 11.5 11 11C10.5 10.5 4 10 4 10C4 10 10.5 9.5 11 9C11.5 8.5 12 2 12 2Z" />
  </svg>
);

// Curly pointer arrow (pointing down & right)
export const ArrowDoodle: React.FC<DoodleProps> = ({ className, ...props }) => (
  <svg
    viewBox="0 0 100 60"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`w-16 h-10 ${className}`}
    {...props}
  >
    {/* Animated curve path resembling a quick hand-drawn arrow */}
    <path
      d="M10 15 C 30 10, 50 35, 80 25 C 82 24, 85 22, 88 20"
      strokeDasharray="4 4"
    />
    <path d="M72 17 L88 20 L84 36" />
  </svg>
);

// Curly pointer arrow pointing up/down with extra coil
export const LoopArrowDoodle: React.FC<DoodleProps> = ({ className, ...props }) => (
  <svg
    viewBox="0 0 80 80"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`w-12 h-12 ${className}`}
    {...props}
  >
    <path d="M15 15 C 20 45, 60 45, 35 25 C 28 20, 15 25, 25 50 C 30 60, 50 65, 62 50" />
    <path d="M50 48 L64 50 L61 64" />
  </svg>
);

// Underline marker doodle (scribble)
export const UnderlineScribble: React.FC<DoodleProps> = ({ className, ...props }) => (
  <svg
    viewBox="0 0 120 12"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    className={`w-full max-w-[200px] ${className}`}
    {...props}
  >
    <path d="M4 8 C 30 4, 70 9, 116 6 M12 10 C 45 7, 85 8, 108 8" />
  </svg>
);

// Cute hand-drawn smiley badge
export const SmileyDoodle: React.FC<DoodleProps> = ({ className, ...props }) => (
  <svg
    viewBox="0 0 40 40"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`w-10 h-10 ${className}`}
    {...props}
  >
    <circle cx="20" cy="20" r="16" />
    <path d="M14 17 C 14 17 15 16 16 17" strokeWidth="3" />
    <path d="M24 17 C 24 17 25 16 26 17" strokeWidth="3" />
    <path d="M13 23 C 16 28, 24 28, 27 23" />
  </svg>
);

// Sound wave / connection squiggle
export const SquiggleWaveDoodle: React.FC<DoodleProps> = ({ className, ...props }) => (
  <svg
    viewBox="0 0 60 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    className={`w-12 h-4 ${className}`}
    {...props}
  >
    <path d="M5 10 C 10 2, 15 18, 20 10 C 25 2, 30 18, 35 10 C 40 2, 45 18, 50 10" />
  </svg>
);

// Heart doodle
export const HeartDoodle: React.FC<DoodleProps> = ({ className, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`w-6 h-6 ${className}`}
    {...props}
  >
    <path d="M12 21 C 12 21, 3 14, 3 8.5 C 3 5.5, 5.5 3, 8.5 3 C 10.4 3, 11.5 4, 12 5 C 12.5 4, 13.6 3, 15.5 3 C 18.5 3, 21 5.5, 21 8.5 C 21 14, 12 21, 12 21 Z" />
  </svg>
);

// Speech Bubble frame
export const SpeechBubbleFrame: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <div className={`relative bg-white border-2 border-[#4A3E39] rounded-2xl p-4 shadow-[4px_4px_0px_0px_#4A3E39] ${className}`}>
      {children}
      {/* Handdrawn little pointer block at the bottom */}
      <div className="absolute -bottom-3 left-10 w-4 h-4 bg-white border-r-2 border-b-2 border-[#4A3E39] transform rotate-45 select-none" />
    </div>
  );
};
