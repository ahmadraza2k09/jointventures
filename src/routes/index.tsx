import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  Clock,
  Compass,
  Copy,
  Grid,
  HelpCircle,
  Info,
  Maximize2,
  Minimize2,
  Moon,
  Pause,
  Play,
  RotateCcw,
  Scale,
  ShieldAlert,
  SlidersHorizontal,
  Sparkles,
  Sun,
  Swords,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import cargoShip from "@/assets/cargo-ship.jpg";
import chessRival from "@/assets/chess-rival.jpg";
import hourglass from "@/assets/hourglass.jpg";
import legacyPhone from "@/assets/legacy-phone.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Hidden Costs of Joint Ventures — Extreme Glassmorphism Presentation Deck" },
      {
        name: "description",
        content:
          "Why shared ownership can create shared problems. An extreme glassmorphic presentation deck on the hidden costs of joint ventures.",
      },
      { property: "og:title", content: "The Hidden Costs of Joint Ventures — Extreme Glass Deck" },
      {
        property: "og:description",
        content: "Resources can combine. Interests may not. Short, precise, visually power-packed business debate presentation.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

// Speaker notes for each slide (for debate / class presentation prep)
const SPEAKER_NOTES = [
  {
    slide: 1,
    title: "Cover & Introduction",
    bullets: [
      "Welcome your audience to the debate on Joint Venture governance.",
      "Highlight the core tension: JVs combine assets on paper, but partners retain separate ownership and strategic priorities.",
      "Set up the central question: Why shared control often creates shared problems.",
    ],
  },
  {
    slide: 2,
    title: "The Basic Idea",
    bullets: [
      "Emphasize the main thesis: 'Resources can combine. Interests may not.'",
      "Explain the checklist: Pooling resources, splitting risk, and sharing profit are simple. Control is where partnerships break down.",
      "Key takeaway to voice: Shared business does NOT automatically equal shared long-term goals.",
    ],
  },
  {
    slide: 3,
    title: "01 — Conflicting Objectives",
    bullets: [
      "Metaphor: 'Two captains, one ship.' Neither captain can turn without agreement.",
      "Highlight TNK-BP (2003-2013): 50:50 deadlock between BP and AAR led to legal battles, until Rosneft bought them out.",
      "Debate point: 50:50 ownership ensures neither partner has final decision authority when priorities clash.",
    ],
  },
  {
    slide: 4,
    title: "02 — Strategic Misalignment",
    bullets: [
      "Explain how business environments shift over time—what makes sense today may fail tomorrow.",
      "Sony Ericsson Case: Formed in 2001 for expansion; by 2011 Sony paid €1.05 Billion to buy Ericsson out to integrate smartphones into Sony's ecosystem.",
      "Debate point: Joint ventures lock partners into static agreements while market strategies diverge.",
    ],
  },
  {
    slide: 5,
    title: "03 — More Owners. Less Speed.",
    bullets: [
      "Compare decision speed: Single companies have 3 quick steps; JVs add negotiation and multi-layer approvals.",
      "Emphasize: 'Delay is NOT neutral.' In fast markets, a 3-month window closes while partners deliberate.",
      "Debate point: Governance gates directly compromise competitive agility.",
    ],
  },
  {
    slide: 6,
    title: "04 — Today's Partner Can Become Tomorrow's Rival",
    bullets: [
      "Walk through the knowledge transfer pipeline: Tech, processes, suppliers, customers, and IP.",
      "Explain the paradox: To make a JV work, you must share core capabilities. If it dissolves, that partner is now equipped to compete directly.",
      "Debate point: Cooperation inherently builds competitive intelligence for your partner.",
    ],
  },
  {
    slide: 7,
    title: "05 — Culture & Contribution Conflict",
    bullets: [
      "Split into two issues: Cultural clash (norms, communication, risk) and Contribution perception.",
      "Example: Partner A brings IP, Partner B brings market access. Both own 50%, but both feel they are doing the real work.",
      "Debate point: Equity split (50%) rarely matches perceived value contribution.",
    ],
  },
  {
    slide: 8,
    title: "06 — Exit Is Harder Than Entry",
    bullets: [
      "Show the 8 web ties: Valuation, IP, Debt, Assets, Employees, Contracts, Customers, Restructuring.",
      "Walmart-Bharti Case (2013): Entered easily with $100M stake, but exiting required $234M in debt restructuring and regulatory unwind.",
      "Debate point: Contracts end easily, but operational entanglement lingers for years.",
    ],
  },
  {
    slide: 9,
    title: "The Complete Argument",
    bullets: [
      "Use this slide as your core summary infographic in the debate.",
      "Trace the 9-step chain reaction from Different Goals → Strategic Conflict → Shared Control → Deadlock → Exit.",
      "Key conclusion: The core problem is not shared risk—it is shared control between independent entities.",
    ],
  },
  {
    slide: 10,
    title: "Balanced Conclusion",
    bullets: [
      "Acknowledge the counter-argument: JVs do create value (Capital, Market access, Risk sharing, Speed).",
      "Condition for success: Value creation ONLY happens with perfect strategic alignment, clear governance, and shared expectations.",
      "Close with the big debate question: 'When two companies own one business, who gets the final say?'",
    ],
  },
];

const SLIDES = [
  { id: 1, title: "Cover", label: "BUSINESS DEBATE" },
  { id: 2, title: "The Basic Idea", label: "CORE PREMISE" },
  { id: 3, title: "Conflicting Objectives", label: "CON #1" },
  { id: 4, title: "Strategic Misalignment", label: "CON #2" },
  { id: 5, title: "More Owners. Less Speed.", label: "CON #3" },
  { id: 6, title: "Tomorrow's Rival", label: "CON #4" },
  { id: 7, title: "Culture & Contribution", label: "CON #5" },
  { id: 8, title: "Exit Is Harder Than Entry", label: "CON #6" },
  { id: 9, title: "The Complete Argument", label: "INFOGRAPHIC" },
  { id: 10, title: "Balanced Conclusion", label: "WRAP-UP" },
];

function Index() {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [viewMode, setViewMode] = useState<"deck" | "scroll">("deck");
  const [showSpeakerNotes, setShowSpeakerNotes] = useState(false);
  const [showGridModal, setShowGridModal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [glassTheme, setGlassTheme] = useState<"midnight" | "crystal" | "cyber">("midnight");

  const containerRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation for Deck mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showGridModal) return;
      if (e.key === "ArrowRight" || e.key === "Space" || e.key === "PageDown") {
        e.preventDefault();
        setCurrentSlide((prev) => Math.min(prev + 1, 10));
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        setCurrentSlide((prev) => Math.max(prev - 1, 1));
      } else if (e.key === "Home") {
        setCurrentSlide(1);
      } else if (e.key === "End") {
        setCurrentSlide(10);
      } else if (e.key === "n" || e.key === "N") {
        setShowSpeakerNotes((prev) => !prev);
      } else if (e.key === "g" || e.key === "G") {
        setShowGridModal((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showGridModal]);

  // Autoplay timer
  useEffect(() => {
    if (!isPlaying || viewMode !== "deck") return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev >= 10 ? 1 : prev + 1));
    }, 7000);
    return () => clearInterval(interval);
  }, [isPlaying, viewMode]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const handleCopyShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const canvasBgClass =
    glassTheme === "midnight"
      ? "glass-canvas text-white glass-dark-mode"
      : glassTheme === "crystal"
        ? "glass-canvas-light text-slate-900"
        : "glass-canvas-cyber text-white glass-dark-mode";

  return (
    <div className={`min-h-screen font-sans flex flex-col selection:bg-cyan-500 selection:text-black overflow-x-hidden ${canvasBgClass}`}>
      {/* EXTREME GLASS AMBIENT BACKDROP ORBS & GLOW LIGHTS */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Orb 1: Top-Left Neon Indigo/Purple */}
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-indigo-600/30 rounded-full blur-[140px] animate-float-slow" />
        {/* Orb 2: Top-Right Electric Cyan */}
        <div className="absolute -top-20 -right-20 w-[650px] h-[650px] bg-cyan-400/25 rounded-full blur-[150px] animate-float-delayed" />
        {/* Orb 3: Center Fuchsia/Magenta Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-fuchsia-500/20 rounded-full blur-[130px] animate-pulse-slow" />
        {/* Orb 4: Bottom-Left Blue/Sky Glow */}
        <div className="absolute -bottom-32 -left-20 w-[580px] h-[580px] bg-blue-600/30 rounded-full blur-[140px] animate-float-delayed" />
        {/* Orb 5: Bottom-Right Violet Glow */}
        <div className="absolute -bottom-20 -right-32 w-[620px] h-[620px] bg-violet-600/25 rounded-full blur-[150px] animate-float-slow" />
        
        {/* Subtle Glass Grid Texture */}
        <div className="absolute inset-0 glass-grid-bg opacity-70" />
      </div>

      {/* TOP DECK CONTROL BAR (EXTREME FROSTED GLASS) */}
      <header className="sticky top-0 z-50 glass-header px-4 lg:px-8 py-3 flex items-center justify-between transition-all">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 text-white flex items-center justify-center font-black text-xs shadow-[0_0_20px_rgba(56,189,248,0.5)] border border-white/40">
              JV
            </span>
            <div>
              <h1 className="text-xs font-black uppercase tracking-wider bg-gradient-to-r from-white via-slate-100 to-cyan-200 bg-clip-text text-transparent">
                The Hidden Costs of Joint Ventures
              </h1>
              <p className="text-[10px] font-bold text-cyan-300/80 uppercase tracking-widest flex items-center gap-1">
                <Sparkles size={10} className="text-cyan-400 animate-pulse" /> Extreme Glass Edition
              </p>
            </div>
          </div>
          <span className="hidden sm:inline-block h-4 w-px bg-white/20" />
          <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-cyan-300 glass-pill px-3 py-1 rounded-full border border-cyan-500/30 shadow-[0_0_12px_rgba(56,189,248,0.2)]">
            Debate Mode
          </span>
        </div>

        {/* CONTROLS */}
        <div className="flex items-center gap-2">
          {/* Glass Theme Switcher */}
          <div className="glass-pill p-1 rounded-xl flex items-center gap-1 text-xs font-bold border border-white/20">
            <button
              onClick={() => setGlassTheme("midnight")}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-black transition-all ${
                glassTheme === "midnight"
                  ? "bg-indigo-600 text-white shadow-[0_0_12px_rgba(79,70,229,0.6)]"
                  : "text-slate-300 hover:text-white"
              }`}
              title="Midnight Glass Theme"
            >
              <Moon size={12} className="inline mr-1" /> Midnight
            </button>
            <button
              onClick={() => setGlassTheme("crystal")}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-black transition-all ${
                glassTheme === "crystal"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-300 hover:text-white"
              }`}
              title="Crystal Light Glass Theme"
            >
              <Sun size={12} className="inline mr-1" /> Crystal
            </button>
            <button
              onClick={() => setGlassTheme("cyber")}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-black transition-all ${
                glassTheme === "cyber"
                  ? "bg-gradient-to-r from-fuchsia-600 to-cyan-500 text-white shadow-[0_0_12px_rgba(217,70,239,0.6)]"
                  : "text-slate-300 hover:text-white"
              }`}
              title="Cyber Neon Glass Theme"
            >
              <Zap size={12} className="inline mr-1" /> Cyber
            </button>
          </div>

          {/* Deck vs Scroll Switcher */}
          <div className="glass-pill p-1 rounded-xl flex items-center gap-1 text-xs font-bold border border-white/20">
            <button
              onClick={() => setViewMode("deck")}
              className={`px-3 py-1 rounded-lg text-xs font-black transition-all ${
                viewMode === "deck"
                  ? "glass-btn-primary shadow-[0_0_15px_rgba(37,99,235,0.5)]"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              Slides
            </button>
            <button
              onClick={() => setViewMode("scroll")}
              className={`px-3 py-1 rounded-lg text-xs font-black transition-all ${
                viewMode === "scroll"
                  ? "glass-btn-primary shadow-[0_0_15px_rgba(37,99,235,0.5)]"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              Scroll
            </button>
          </div>

          {/* Speaker Notes Toggle Button */}
          <button
            onClick={() => setShowSpeakerNotes((prev) => !prev)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all border ${
              showSpeakerNotes
                ? "bg-cyan-500 text-black border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.6)]"
                : "glass-btn-secondary"
            }`}
            title="Toggle Speaker Notes for debate speaking points (Press N)"
          >
            <BookOpen size={14} />
            <span className="hidden md:inline">Notes</span>
          </button>

          {/* Grid Overview Modal Toggle */}
          {viewMode === "deck" && (
            <button
              onClick={() => setShowGridModal(true)}
              className="p-2 glass-btn-secondary rounded-xl transition-all"
              title="View all 10 slides (Press G)"
            >
              <Grid size={16} />
            </button>
          )}

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="hidden sm:flex p-2 glass-btn-secondary rounded-xl transition-all"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>

          {/* Share Link */}
          <button
            onClick={handleCopyShare}
            className="p-2 glass-btn-secondary rounded-xl transition-all relative"
            title="Copy share link"
          >
            <Copy size={16} />
            {copiedLink && (
              <span className="absolute -bottom-8 right-0 glass-card-navy text-cyan-300 text-[10px] font-black px-2.5 py-1 rounded-lg shadow-xl whitespace-nowrap border border-cyan-500/30">
                Link copied!
              </span>
            )}
          </button>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col justify-between relative z-10" ref={containerRef}>
        {viewMode === "deck" ? (
          /* DECK PRESENTATION VIEW */
          <div className="flex-1 flex flex-col items-center justify-center p-4 lg:p-8 max-w-[1400px] mx-auto w-full">
            {/* PROGRESS BAR & SLIDE HEAD LEVEL INDICATOR */}
            <div className="w-full mb-4 flex items-center justify-between text-xs font-bold">
              <div className="flex items-center gap-2.5">
                <span className="text-cyan-400 font-black text-sm tracking-wider glass-pill px-3 py-1 rounded-lg border border-cyan-500/30 shadow-[0_0_10px_rgba(56,189,248,0.2)]">
                  SLIDE {String(currentSlide).padStart(2, "0")} / 10
                </span>
                <span className="text-white/30">•</span>
                <span className="uppercase tracking-wider font-extrabold text-white">
                  {SLIDES[currentSlide - 1].title}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-32 sm:w-48 glass-pill h-2.5 rounded-full overflow-hidden p-0.5 border border-white/20">
                  <div
                    className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 h-full transition-all duration-300 rounded-full shadow-[0_0_12px_rgba(56,189,248,0.8)]"
                    style={{ width: `${(currentSlide / 10) * 100}%` }}
                  />
                </div>
                <button
                  onClick={() => setIsPlaying((prev) => !prev)}
                  className="flex items-center gap-1.5 text-[11px] font-black uppercase text-cyan-300 hover:text-white glass-pill px-2.5 py-1 rounded-lg border border-cyan-500/30 transition-all"
                >
                  {isPlaying ? (
                    <>
                      <Pause size={13} className="text-amber-400 animate-pulse" /> Pause
                    </>
                  ) : (
                    <>
                      <Play size={13} className="text-cyan-400" /> Auto-play
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* CANVAS SLIDE FRAME (EXTREME GLASS 16:9 Aspect Ratio Container) */}
            <div className="w-full glass-container rounded-3xl border border-white/30 shadow-[0_30px_90px_-15px_rgba(0,0,0,0.5),0_0_50px_rgba(59,130,246,0.2)] overflow-hidden min-h-[580px] lg:min-h-[660px] flex flex-col justify-between transition-all duration-500 relative">
              {/* Shiny Specular Top Reflection Line */}
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent z-20 pointer-events-none" />

              {renderSlideContent(currentSlide, glassTheme)}
            </div>

            {/* SLIDE NAVIGATION CONTROLS AT BOTTOM (EXTREME GLASS PANEL) */}
            <div className="w-full mt-5 flex items-center justify-between glass-header px-6 py-3 rounded-2xl border border-white/30 shadow-xl">
              <button
                onClick={() => setCurrentSlide((prev) => Math.max(prev - 1, 1))}
                disabled={currentSlide === 1}
                className="flex items-center gap-2 px-4 py-2 rounded-xl glass-btn-secondary font-black text-xs disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft size={16} /> Previous
              </button>

              {/* Slide Dots / Thumbnails */}
              <div className="hidden sm:flex items-center gap-2">
                {SLIDES.map((slide) => (
                  <button
                    key={slide.id}
                    onClick={() => setCurrentSlide(slide.id)}
                    className={`h-3 rounded-full transition-all duration-300 ${
                      currentSlide === slide.id
                        ? "w-9 bg-gradient-to-r from-cyan-400 to-blue-600 shadow-[0_0_15px_rgba(56,189,248,0.8)] border border-white/40"
                        : "w-3 glass-pill hover:bg-white/50 border border-white/20"
                    }`}
                    title={`Slide ${slide.id}: ${slide.title}`}
                  />
                ))}
              </div>

              <button
                onClick={() => setCurrentSlide((prev) => Math.min(prev + 1, 10))}
                disabled={currentSlide === 10}
                className="flex items-center gap-2 px-5 py-2 rounded-xl glass-btn-primary font-black text-xs disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                Next Slide <ChevronRight size={16} />
              </button>
            </div>
          </div>
        ) : (
          /* SCROLL VIEW (VERTICAL ALL SLIDES EDITORIAL IN GLASS PANELS) */
          <div className="max-w-[1200px] mx-auto w-full px-4 py-8 space-y-16">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-black uppercase tracking-widest text-cyan-300 glass-pill px-4 py-1.5 rounded-full border border-cyan-500/30 inline-block shadow-[0_0_15px_rgba(56,189,248,0.3)]">
                Full Extreme Glass Presentation
              </span>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight bg-gradient-to-r from-white via-slate-100 to-cyan-200 bg-clip-text text-transparent">
                All 10 Glass Slides Overview
              </h2>
              <p className="text-base text-slate-300 font-medium">
                Scroll through the complete deck in extreme frosted glass panels or click any slide title to present it in full mode.
              </p>
            </div>

            {SLIDES.map((slide) => (
              <div key={slide.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-black text-cyan-300 glass-pill px-3 py-1 rounded-lg border border-cyan-500/30 shadow-[0_0_10px_rgba(56,189,248,0.2)]">
                      SLIDE {String(slide.id).padStart(2, "0")}
                    </span>
                    <h3 className="text-lg font-black uppercase text-white">{slide.title}</h3>
                  </div>
                  <button
                    onClick={() => {
                      setCurrentSlide(slide.id);
                      setViewMode("deck");
                    }}
                    className="text-xs font-black text-cyan-300 hover:text-white glass-pill px-3 py-1.5 rounded-xl border border-cyan-500/30 flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(56,189,248,0.2)]"
                  >
                    Present this slide <ArrowRight size={14} />
                  </button>
                </div>
                <div className="glass-container rounded-3xl border border-white/30 shadow-2xl overflow-hidden min-h-[500px] p-6 lg:p-10 relative">
                  {renderSlideContent(slide.id, glassTheme)}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* SPEAKER NOTES DRAWER / MODAL (EXTREME DARK GLASS) */}
      {showSpeakerNotes && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md w-full glass-modal rounded-2xl p-6 space-y-4 animate-in fade-in slide-in-from-bottom-5 border border-cyan-500/30 shadow-[0_25px_60px_rgba(0,0,0,0.7),0_0_30px_rgba(56,189,248,0.2)]">
          <div className="flex items-center justify-between border-b border-white/15 pb-3">
            <div className="flex items-center gap-2">
              <BookOpen size={18} className="text-cyan-400 animate-pulse" />
              <h4 className="text-xs font-black uppercase tracking-wider text-white">
                Speaker Notes — Slide {currentSlide}: {SPEAKER_NOTES[currentSlide - 1].title}
              </h4>
            </div>
            <button
              onClick={() => setShowSpeakerNotes(false)}
              className="text-gray-400 hover:text-white font-black text-sm glass-pill w-7 h-7 rounded-full flex items-center justify-center border border-white/20"
            >
              ✕
            </button>
          </div>
          <div className="space-y-3 text-xs leading-relaxed text-slate-200">
            {SPEAKER_NOTES[currentSlide - 1].bullets.map((bullet, i) => (
              <div key={i} className="flex gap-2.5 items-start">
                <span className="text-cyan-400 font-black text-sm">•</span>
                <p className="font-medium">{bullet}</p>
              </div>
            ))}
          </div>
          <div className="pt-3 flex justify-between items-center text-[10px] font-bold text-slate-400 border-t border-white/10">
            <span>Left/Right arrow keys change slide</span>
            <span className="text-cyan-300 font-black">Debate Prep</span>
          </div>
        </div>
      )}

      {/* GRID OVERVIEW MODAL (EXTREME FROSTED GLASS BACKDROP) */}
      {showGridModal && (
        <div className="fixed inset-0 z-50 glass-overlay flex items-center justify-center p-4 sm:p-8 animate-in fade-in">
          <div className="glass-modal rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 border border-white/30 shadow-[0_35px_90px_rgba(0,0,0,0.8)] space-y-6">
            <div className="flex items-center justify-between border-b border-white/15 pb-4">
              <div>
                <h3 className="text-xl font-black uppercase bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                  Presentation Overview
                </h3>
                <p className="text-xs text-slate-300 font-medium">Select any slide thumbnail to jump directly</p>
              </div>
              <button
                onClick={() => setShowGridModal(false)}
                className="px-4 py-2 glass-btn-primary text-xs font-black rounded-xl border border-white/30 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
              >
                Close (Esc)
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {SLIDES.map((slide) => (
                <button
                  key={slide.id}
                  onClick={() => {
                    setCurrentSlide(slide.id);
                    setShowGridModal(false);
                  }}
                  className={`p-4 rounded-2xl border text-left flex flex-col justify-between min-h-[130px] transition-all ${
                    currentSlide === slide.id
                      ? "bg-gradient-to-br from-blue-600/80 to-indigo-700/80 border-cyan-400 text-white ring-4 ring-cyan-500/30 shadow-[0_0_25px_rgba(56,189,248,0.5)] scale-105"
                      : "glass-card hover:border-cyan-400/60 hover:shadow-[0_0_20px_rgba(56,189,248,0.2)]"
                  }`}
                >
                  <span
                    className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md w-fit ${
                      currentSlide === slide.id
                        ? "bg-white/20 text-white border border-white/30"
                        : "glass-pill text-cyan-300 border border-cyan-500/30"
                    }`}
                  >
                    SLIDE {String(slide.id).padStart(2, "0")}
                  </span>
                  <div>
                    <h5 className="font-extrabold text-xs uppercase leading-tight line-clamp-2">
                      {slide.title}
                    </h5>
                    <p
                      className={`text-[10px] mt-1 font-semibold ${
                        currentSlide === slide.id ? "text-cyan-200" : "text-slate-400"
                      }`}
                    >
                      {slide.label}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* FOOTER BAR (GLASS) */}
      <footer className="glass-header px-6 py-3 text-center text-xs font-bold text-slate-300 flex flex-col sm:flex-row items-center justify-between gap-2 z-10 border-t border-white/15">
        <div className="flex items-center gap-2">
          <span className="font-black text-white uppercase tracking-wider">BUSINESS DEBATE PRESENTATION</span>
          <span className="text-white/30">•</span>
          <span className="text-cyan-300 font-semibold">“Resources can combine. Interests may not.”</span>
        </div>
        <div className="text-[11px] text-slate-400 font-medium">
          Press <kbd className="px-1.5 py-0.5 glass-pill border border-white/20 rounded text-[10px] font-mono text-cyan-300">N</kbd> for Notes | <kbd className="px-1.5 py-0.5 glass-pill border border-white/20 rounded text-[10px] font-mono text-cyan-300">G</kbd> for Grid
        </div>
      </footer>
    </div>
  );
}

// SLIDE RENDERER FUNCTION FOR ALL 10 SLIDES (EXTREME GLASSMORPHISM DESIGN)
function renderSlideContent(slideId: number, theme: "midnight" | "crystal" | "cyber") {
  const isLight = theme === "crystal";

  switch (slideId) {
    /* =========================================================================
       SLIDE 1 — COVER
       ========================================================================= */
    case 1:
      return (
        <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-between h-full relative z-10">
          {/* Top Label */}
          <div className="flex items-center justify-between">
            <span className="px-4 py-1.5 glass-pill text-cyan-300 text-xs font-black uppercase tracking-widest rounded-xl border border-cyan-500/40 shadow-[0_0_15px_rgba(56,189,248,0.3)]">
              BUSINESS DEBATE
            </span>
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-300">
              Strategic Management Field Study
            </span>
          </div>

          {/* Main Title & Subtitle */}
          <div className="my-8 space-y-4 max-w-4xl">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase leading-[0.95] tracking-tight font-poppins bg-gradient-to-r from-white via-slate-100 to-cyan-200 bg-clip-text text-transparent drop-shadow-md">
              THE HIDDEN COSTS <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                OF JOINT VENTURES
              </span>
            </h1>
            <p className="text-xl sm:text-2xl font-bold text-slate-200 max-w-2xl font-inter">
              Why shared ownership can create shared problems
            </p>
          </div>

          {/* Extreme Glass Visual: 2 Independent Companies Connecting into Shared Center */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center glass-card p-6 rounded-2xl border border-white/30 shadow-2xl backdrop-blur-2xl">
            <div className="glass-card p-5 rounded-xl border border-white/30 text-center shadow-lg hover:border-cyan-400/50 transition-all">
              <span className="text-xs font-black text-cyan-300 uppercase tracking-wider">COMPANY A</span>
              <h4 className="text-lg font-black text-white mt-1">Independent Goals</h4>
              <p className="text-xs text-slate-300 mt-1 font-medium">Resources & Capabilities</p>
            </div>

            <div className="flex flex-col items-center justify-center text-center py-2">
              <div className="glass-btn-primary p-5 rounded-2xl shadow-[0_0_30px_rgba(37,99,235,0.6)] border border-white/40 w-full max-w-[240px] text-center transform hover:scale-105 transition-all">
                <span className="text-[10px] font-black uppercase tracking-widest text-cyan-200">50 : 50 EQUITY</span>
                <h4 className="text-xl font-black uppercase leading-tight mt-1 text-white">SHARED VENTURE</h4>
              </div>
              <span className="text-[11px] font-black text-cyan-300 mt-2 tracking-wide uppercase">
                Shared Ownership & Control
              </span>
            </div>

            <div className="glass-card-navy p-5 rounded-xl border border-white/30 text-center shadow-lg hover:border-fuchsia-400/50 transition-all">
              <span className="text-xs font-black text-fuchsia-300 uppercase tracking-wider">COMPANY B</span>
              <h4 className="text-lg font-black text-white mt-1">Independent Goals</h4>
              <p className="text-xs text-slate-300 mt-1 font-medium">Resources & Capabilities</p>
            </div>
          </div>
        </div>
      );

    /* =========================================================================
       SLIDE 2 — THE BASIC IDEA
       ========================================================================= */
    case 2:
      return (
        <div className="p-8 sm:p-12 lg:p-14 flex flex-col justify-between h-full relative z-10">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-widest text-cyan-300 glass-pill px-3.5 py-1 rounded-xl border border-cyan-500/30">
              CORE PREMISE
            </span>
            <span className="text-xs font-bold text-slate-300">02 / 10</span>
          </div>

          <div className="space-y-3 my-4">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase leading-none bg-gradient-to-r from-white via-slate-100 to-cyan-200 bg-clip-text text-transparent">
              Resources can combine. <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Interests may not.
              </span>
            </h2>
          </div>

          {/* Visual Diagram */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch my-2">
            {/* Left Diagram Box */}
            <div className="lg:col-span-7 glass-card p-6 rounded-2xl border border-white/30 flex flex-col justify-center space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card-navy p-5 rounded-xl border border-white/20">
                  <span className="text-xs font-black text-cyan-300 uppercase">COMPANY A</span>
                  <p className="text-base font-extrabold text-white mt-1">Resources</p>
                </div>
                <div className="glass-btn-primary p-5 rounded-xl border border-white/30">
                  <span className="text-xs font-black text-white/80 uppercase">COMPANY B</span>
                  <p className="text-base font-extrabold text-white mt-1">Resources</p>
                </div>
              </div>

              <div className="flex justify-center my-1">
                <ArrowDown size={30} className="text-cyan-400 animate-bounce" />
              </div>

              <div className="glass-card-navy p-5 rounded-xl text-center border border-cyan-500/30 shadow-[0_0_20px_rgba(56,189,248,0.2)]">
                <span className="text-xs font-black text-cyan-300 uppercase tracking-widest">SHARED JV</span>
                <h4 className="text-2xl font-black uppercase tracking-wide text-white mt-1">50:50 COMBINED ENTITY</h4>
              </div>

              <p className="text-xs sm:text-sm font-medium text-slate-300 leading-relaxed pt-2 border-t border-white/10">
                A joint venture combines resources, but the partners remain independent companies with their own goals, strategies and interests.
              </p>
            </div>

            {/* Right Checklist Box */}
            <div className="lg:col-span-5 glass-card p-6 rounded-2xl border border-white/30 flex flex-col justify-between">
              <h4 className="text-xs font-black uppercase text-cyan-300 tracking-wider mb-4">
                THE JV BALANCE SHEET
              </h4>

              <div className="space-y-3 flex-1">
                <div className="flex items-center justify-between p-4 glass-card rounded-xl border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                  <span className="font-extrabold text-base text-white">Resources</span>
                  <span className="flex items-center gap-1.5 text-emerald-400 font-black text-sm glass-pill px-3 py-1 rounded-lg border border-emerald-500/40">
                    <Check size={18} strokeWidth={3} /> Combined
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 glass-card rounded-xl border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                  <span className="font-extrabold text-base text-white">Risk</span>
                  <span className="flex items-center gap-1.5 text-emerald-400 font-black text-sm glass-pill px-3 py-1 rounded-lg border border-emerald-500/40">
                    <Check size={18} strokeWidth={3} /> Shared
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 glass-card rounded-xl border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                  <span className="font-extrabold text-base text-white">Profit</span>
                  <span className="flex items-center gap-1.5 text-emerald-400 font-black text-sm glass-pill px-3 py-1 rounded-lg border border-emerald-500/40">
                    <Check size={18} strokeWidth={3} /> Split
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 glass-card-navy rounded-xl border border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.25)]">
                  <span className="font-extrabold text-base text-amber-300">Control</span>
                  <span className="flex items-center gap-1.5 text-amber-300 font-black text-sm glass-pill px-3 py-1 rounded-lg border border-amber-500/40 bg-amber-500/10">
                    <CircleAlert size={18} strokeWidth={2.5} /> Conflict Risk
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Memory Line */}
          <div className="glass-card-navy px-6 py-4 rounded-2xl flex items-center justify-between border border-cyan-500/30 shadow-[0_0_25px_rgba(56,189,248,0.2)]">
            <span className="text-xs font-black uppercase tracking-widest text-cyan-300">MEMORY LINE</span>
            <span className="text-sm sm:text-lg font-black uppercase tracking-wide text-white">
              REMEMBER: Shared business ≠ shared goals
            </span>
          </div>
        </div>
      );

    /* =========================================================================
       SLIDE 3 — CONS #1: CONFLICTING OBJECTIVES
       ========================================================================= */
    case 3:
      return (
        <div className="p-8 sm:p-12 lg:p-14 flex flex-col justify-between h-full relative z-10">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-widest text-cyan-300 glass-pill px-3.5 py-1 rounded-xl border border-cyan-500/30">
              01 — CONFLICTING OBJECTIVES
            </span>
            <span className="text-xs font-bold text-slate-300">03 / 10</span>
          </div>

          <div className="my-2">
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-white">
              Two captains. <span className="text-cyan-400">One ship.</span>
            </h2>
          </div>

          {/* Decision Path Visual + Case Study */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch my-2">
            {/* Left Diagram */}
            <div className="lg:col-span-7 glass-card p-6 rounded-2xl border border-white/30 flex flex-col justify-between">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="glass-card p-5 rounded-xl border-l-4 border-l-cyan-400 border-white/20 shadow-md">
                  <span className="text-xs font-black uppercase text-cyan-300">PARTNER A</span>
                  <h4 className="text-base font-extrabold text-white mt-1">“Expand aggressively”</h4>
                  <p className="text-xs text-slate-300 mt-1">Long-term market share focus</p>
                </div>

                <div className="glass-card p-5 rounded-xl border-l-4 border-l-fuchsia-400 border-white/20 shadow-md">
                  <span className="text-xs font-black uppercase text-fuchsia-300">PARTNER B</span>
                  <h4 className="text-base font-extrabold text-white mt-1">“Protect short-term profit”</h4>
                  <p className="text-xs text-slate-300 mt-1">Immediate dividend focus</p>
                </div>
              </div>

              <div className="flex items-center justify-center my-3 text-center">
                <div className="glass-pill px-6 py-2.5 rounded-full border border-cyan-500/40 text-xs font-black text-cyan-300 uppercase shadow-[0_0_15px_rgba(56,189,248,0.2)]">
                  ↓ SHARED CONTROL ↓
                </div>
              </div>

              <div className="glass-card-navy p-6 rounded-2xl text-center border border-amber-500/40 shadow-[0_0_30px_rgba(245,158,11,0.25)]">
                <span className="text-xs font-black uppercase tracking-widest text-amber-400">OUTCOME</span>
                <h3 className="text-3xl font-black uppercase tracking-wider text-white mt-1">DEADLOCK</h3>
                <p className="text-xs text-slate-300 mt-1">Neither partner can proceed without approval.</p>
              </div>
            </div>

            {/* Right Case Study Box */}
            <div className="lg:col-span-5 glass-card-blue p-6 rounded-2xl border border-cyan-500/30 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest glass-btn-primary px-3 py-1 rounded-md">
                  REAL-LIFE STORY
                </span>
                <h3 className="text-2xl font-black uppercase text-white mt-3">TNK-BP | 2003–2013</h3>
                <div className="h-1 w-12 bg-cyan-400 my-3 rounded-full shadow-[0_0_10px_rgba(56,189,248,0.8)]" />
                <ul className="space-y-2.5 text-xs font-medium text-slate-200 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold">•</span>
                    <span><strong>50:50 ownership</strong> between BP and Russian billionaire consortium (AAR).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold">•</span>
                    <span>AAR legally challenged BP’s strategic alliance with Rosneft.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold">•</span>
                    <span>In 2013, Rosneft acquired AAR’s stake while BP sold its stake the exact same day.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-4 pt-4 border-t border-white/20">
                <img
                  src={cargoShip}
                  alt="Container ship in ocean"
                  className="w-full h-28 object-cover rounded-xl border border-white/20 shadow-md"
                />
              </div>
            </div>
          </div>

          {/* Bottom Memory Line */}
          <div className="glass-pill px-6 py-3.5 rounded-2xl flex items-center justify-between border border-white/20">
            <span className="text-xs font-black uppercase tracking-wider text-cyan-300">REMEMBER</span>
            <span className="text-sm sm:text-base font-black uppercase tracking-wide text-white">
              50:50 ownership can mean neither side gets the final say.
            </span>
          </div>
        </div>
      );

    /* =========================================================================
       SLIDE 4 — CONS #2: STRATEGIC MISALIGNMENT
       ========================================================================= */
    case 4:
      return (
        <div className="p-8 sm:p-12 lg:p-14 flex flex-col justify-between h-full relative z-10">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-widest text-cyan-300 glass-pill px-3.5 py-1 rounded-xl border border-cyan-500/30">
              02 — STRATEGIC MISALIGNMENT
            </span>
            <span className="text-xs font-bold text-slate-300">04 / 10</span>
          </div>

          <div className="my-2">
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-white">
              A partnership can <span className="text-cyan-400">outlive its logic.</span>
            </h2>
          </div>

          {/* Horizontal Timeline Diagram */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-stretch my-4">
            <div className="glass-card p-5 rounded-2xl border border-white/30 flex flex-col justify-between">
              <div>
                <span className="text-xs font-black text-cyan-300 glass-pill px-2.5 py-1 rounded-lg border border-cyan-500/30">2001</span>
                <h4 className="text-base font-black uppercase text-white mt-3">Sony Ericsson Formed</h4>
              </div>
              <p className="text-xs text-slate-300 mt-2 font-medium">Equal 50:50 joint venture created.</p>
            </div>

            <div className="glass-card-blue p-5 rounded-2xl border border-cyan-500/30 flex flex-col justify-between">
              <div>
                <span className="text-xs font-black text-cyan-300 uppercase">STRATEGY</span>
                <h4 className="text-base font-black uppercase text-white mt-3">Market Expansion</h4>
              </div>
              <p className="text-xs text-slate-200 font-semibold mt-2">+ Combined capabilities & technology</p>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-white/30 flex flex-col justify-between">
              <div>
                <span className="text-xs font-black text-white glass-pill px-2.5 py-1 rounded-lg border border-white/20">2011</span>
                <h4 className="text-base font-black uppercase text-white mt-3">Sony Buys Ericsson's 50%</h4>
              </div>
              <p className="text-xs text-slate-300 mt-2 font-medium">Integrated into Sony's ecosystem.</p>
            </div>

            <div className="glass-btn-primary p-5 rounded-2xl flex flex-col justify-between border border-white/40 shadow-[0_0_30px_rgba(37,99,235,0.4)]">
              <div>
                <span className="text-xs font-black text-cyan-200 uppercase">TRANSACTION</span>
                <h4 className="text-3xl font-black text-white mt-2">€1.05 B</h4>
              </div>
              <p className="text-xs text-white/80 font-bold uppercase mt-2">Billion buyout price</p>
            </div>
          </div>

          {/* Real Life Story Box */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 glass-card p-6 rounded-2xl border border-white/30 items-center">
            <div className="md:col-span-8 space-y-2">
              <span className="text-xs font-black uppercase text-cyan-300">REAL-LIFE STORY — SONY ERICSSON</span>
              <p className="text-sm font-medium text-slate-200 leading-relaxed">
                The partnership initially made strategic sense, but Sony eventually chose to integrate the mobile business directly into its overall hardware & entertainment ecosystem. The original reasons for cooperation can change as markets and strategies change.
              </p>
            </div>
            <div className="md:col-span-4 flex justify-end">
              <img
                src={legacyPhone}
                alt="Sony Ericsson mobile phone"
                className="w-full h-24 object-cover rounded-xl border border-white/20 shadow-md"
              />
            </div>
          </div>

          {/* Bottom Memory Line */}
          <div className="glass-card-navy px-6 py-3.5 rounded-2xl flex items-center justify-between border border-cyan-500/30">
            <span className="text-xs font-black uppercase tracking-wider text-cyan-300">REMEMBER</span>
            <span className="text-sm sm:text-base font-black uppercase tracking-wide text-white">
              What makes sense today may not make sense tomorrow.
            </span>
          </div>
        </div>
      );

    /* =========================================================================
       SLIDE 5 — CONS #3: MORE OWNERS. LESS SPEED.
       ========================================================================= */
    case 5:
      return (
        <div className="p-8 sm:p-12 lg:p-14 flex flex-col justify-between h-full relative z-10">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-widest text-cyan-300 glass-pill px-3.5 py-1 rounded-xl border border-cyan-500/30">
              03 — MORE OWNERS. LESS SPEED.
            </span>
            <span className="text-xs font-bold text-slate-300">05 / 10</span>
          </div>

          <div className="my-2">
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-white">
              More decision gates → <span className="text-cyan-400">slower action.</span>
            </h2>
          </div>

          {/* Visual Comparison Flow */}
          <div className="space-y-4 my-2">
            {/* Row 1: Independent Company */}
            <div className="glass-card p-5 rounded-2xl border border-white/30 space-y-2">
              <span className="text-xs font-black uppercase text-cyan-300 tracking-wider">
                INDEPENDENT COMPANY (3 STEPS)
              </span>
              <div className="grid grid-cols-3 gap-3">
                <div className="glass-pill p-3.5 rounded-xl text-center font-black text-sm text-white">
                  Problem
                </div>
                <div className="glass-btn-primary p-3.5 rounded-xl text-center font-black text-sm text-white shadow-md">
                  Decision
                </div>
                <div className="glass-card-navy p-3.5 rounded-xl text-center font-black text-sm text-white">
                  Action
                </div>
              </div>
            </div>

            {/* Row 2: Joint Venture */}
            <div className="glass-card-blue p-5 rounded-2xl border border-cyan-500/40 space-y-2">
              <span className="text-xs font-black uppercase text-cyan-300 tracking-wider">
                JOINT VENTURE (5 STEPS — SLOW DECISION GATES)
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3">
                <div className="glass-pill p-3 rounded-xl text-center font-black text-xs sm:text-sm text-white">
                  Problem
                </div>
                <div className="glass-pill p-3 rounded-xl text-center font-black text-xs sm:text-sm text-cyan-300 border-cyan-500/40">
                  Partner Discussion
                </div>
                <div className="glass-pill p-3 rounded-xl text-center font-black text-xs sm:text-sm text-amber-300 border-amber-500/40 bg-amber-500/10">
                  Negotiation
                </div>
                <div className="glass-pill p-3 rounded-xl text-center font-black text-xs sm:text-sm text-cyan-300 border-cyan-500/40">
                  Approval
                </div>
                <div className="glass-card-navy p-3 rounded-xl text-center font-black text-xs sm:text-sm text-white col-span-2 sm:col-span-1">
                  Action
                </div>
              </div>
            </div>
          </div>

          {/* Highlight Callout Box */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center glass-card-navy p-6 rounded-2xl border border-amber-500/40 shadow-[0_0_30px_rgba(245,158,11,0.2)]">
            <div className="md:col-span-6 space-y-1 border-r border-white/10 pr-4">
              <span className="text-xs font-black uppercase text-amber-400">CRITICAL WARNING</span>
              <h3 className="text-2xl font-black uppercase tracking-tight text-white">DELAY IS NOT NEUTRAL.</h3>
            </div>
            <div className="md:col-span-6 text-xs text-slate-300 font-medium leading-relaxed">
              If a market opportunity lasts only 3 months, prolonged partner discussion and negotiation can mean the opportunity disappears completely before approval is reached.
            </div>
          </div>

          {/* Bottom Memory Line */}
          <div className="glass-pill px-6 py-3.5 rounded-2xl flex items-center justify-between border border-white/20">
            <span className="text-xs font-black uppercase tracking-wider text-cyan-300">REMEMBER</span>
            <span className="text-sm sm:text-base font-black uppercase tracking-wide text-white">
              More decision gates → slower action.
            </span>
          </div>
        </div>
      );

    /* =========================================================================
       SLIDE 6 — CONS #4: TODAY'S PARTNER CAN BECOME TOMORROW'S RIVAL
       ========================================================================= */
    case 6:
      return (
        <div className="p-8 sm:p-12 lg:p-14 flex flex-col justify-between h-full relative z-10">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-widest text-cyan-300 glass-pill px-3.5 py-1 rounded-xl border border-cyan-500/30">
              04 — KNOWLEDGE LEAKAGE
            </span>
            <span className="text-xs font-bold text-slate-300">06 / 10</span>
          </div>

          <div className="my-2">
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-white leading-none">
              Today's partner can become <br />
              <span className="text-cyan-400">tomorrow's rival.</span>
            </h2>
          </div>

          {/* Visual Flow Diagram */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center my-3">
            {/* Step 1: Partner */}
            <div className="md:col-span-3 glass-card-navy p-6 rounded-2xl text-center border border-white/20 flex flex-col items-center justify-center min-h-[180px]">
              <span className="text-xs font-black uppercase text-cyan-300">STARTING POINT</span>
              <h3 className="text-2xl font-black uppercase text-white mt-1">PARTNER</h3>
              <p className="text-xs text-slate-400 mt-1">Shared cooperation</p>
            </div>

            {/* Step 2: Knowledge Transfer Grid */}
            <div className="md:col-span-6 glass-card-blue p-5 rounded-2xl border border-cyan-500/40 space-y-3">
              <span className="text-xs font-black uppercase text-cyan-300 tracking-wider block text-center">
                ↓ KNOWLEDGE TRANSFER PIPELINE ↓
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {["Technology", "Processes", "Customers", "Suppliers", "Market Intel", "Intellectual Property"].map(
                  (item) => (
                    <div
                      key={item}
                      className="glass-pill p-2.5 rounded-xl border border-white/20 text-center text-xs font-extrabold text-white"
                    >
                      {item}
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Step 3: Potential Competitor */}
            <div className="md:col-span-3 glass-btn-primary p-6 rounded-2xl text-center border border-white/30 shadow-[0_0_30px_rgba(37,99,235,0.4)] flex flex-col items-center justify-center min-h-[180px]">
              <span className="text-xs font-black uppercase text-white/80">END RESULT</span>
              <h3 className="text-xl font-black uppercase text-white leading-tight mt-1">POTENTIAL COMPETITOR</h3>
              <p className="text-xs text-white/80 mt-1">Equipped with your IP</p>
            </div>
          </div>

          {/* Explanation Banner */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 glass-card p-5 rounded-2xl border border-white/30 items-center">
            <div className="md:col-span-8 space-y-1">
              <p className="text-xs sm:text-sm font-medium text-slate-200 leading-relaxed">
                Joint ventures require knowledge sharing. The exact same knowledge that strengthens cooperation today can later strengthen competition if the partnership dissolves.
              </p>
            </div>
            <div className="md:col-span-4 flex justify-end">
              <img
                src={chessRival}
                alt="Chess game rivalry"
                className="w-full h-20 object-cover rounded-xl border border-white/20 shadow-md"
              />
            </div>
          </div>

          {/* Bottom Memory Line */}
          <div className="glass-card-navy px-6 py-3.5 rounded-2xl flex items-center justify-between border border-cyan-500/30">
            <span className="text-xs font-black uppercase tracking-wider text-cyan-300">REMEMBER</span>
            <span className="text-sm sm:text-base font-black uppercase tracking-wide text-white">
              Cooperation can create competitive knowledge.
            </span>
          </div>
        </div>
      );

    /* =========================================================================
       SLIDE 7 — CONS #5: CULTURE & CONTRIBUTION CONFLICT
       ========================================================================= */
    case 7:
      return (
        <div className="p-8 sm:p-12 lg:p-14 flex flex-col justify-between h-full relative z-10">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-widest text-cyan-300 glass-pill px-3.5 py-1 rounded-xl border border-cyan-500/30">
              05 — FRICTION & DISPUTES
            </span>
            <span className="text-xs font-bold text-slate-300">07 / 10</span>
          </div>

          <div className="my-2">
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-white">
              Culture & <span className="text-cyan-400">Contribution Conflict</span>
            </h2>
          </div>

          {/* Split 2 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch my-3">
            {/* Card 1: Culture */}
            <div className="glass-card p-6 rounded-2xl border border-white/30 flex flex-col justify-between shadow-lg">
              <div>
                <div className="flex items-center justify-between border-b border-white/15 pb-3">
                  <h3 className="text-xl font-black uppercase text-white">CULTURE</h3>
                  <Users className="text-cyan-400" size={24} />
                </div>
                <div className="grid grid-cols-2 gap-2 my-4">
                  {["Leadership", "Communication", "Risk tolerance", "Hierarchy", "People management", "Decision norms"].map(
                    (item) => (
                      <div
                        key={item}
                        className="glass-pill p-2.5 rounded-xl border border-white/20 text-xs font-bold text-slate-200"
                      >
                        • {item}
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="glass-card-navy p-4 rounded-xl text-center border border-amber-500/40">
                <span className="text-xs font-black uppercase tracking-widest text-amber-400">OUTCOME</span>
                <h4 className="text-2xl font-black uppercase text-white">CULTURAL FRICTION</h4>
              </div>
            </div>

            {/* Card 2: Contribution */}
            <div className="glass-card-blue p-6 rounded-2xl border border-cyan-500/40 flex flex-col justify-between shadow-lg">
              <div>
                <div className="flex items-center justify-between border-b border-white/15 pb-3">
                  <h3 className="text-xl font-black uppercase text-white">CONTRIBUTION</h3>
                  <Scale className="text-cyan-400" size={24} />
                </div>
                <div className="space-y-2.5 my-4">
                  <div className="glass-pill p-3 rounded-xl border border-white/20 flex justify-between items-center text-xs font-bold text-white">
                    <span>Partner A</span>
                    <span className="text-cyan-300 font-black">Technology & IP</span>
                  </div>
                  <div className="glass-pill p-3 rounded-xl border border-white/20 flex justify-between items-center text-xs font-bold text-white">
                    <span>Partner B</span>
                    <span className="text-cyan-300 font-black">Market Access</span>
                  </div>
                  <div className="glass-card-navy p-3 rounded-xl flex justify-between items-center text-xs font-black border border-cyan-500/30">
                    <span>Both Partners</span>
                    <span className="text-cyan-300">50% Ownership</span>
                  </div>
                </div>
              </div>

              <div className="glass-btn-primary p-4 rounded-xl text-center border border-white/30 shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                <span className="text-[10px] font-black uppercase tracking-wider text-cyan-200">PERCEPTION GAP</span>
                <h4 className="text-lg font-black uppercase text-white leading-tight">
                  “WE ARE CONTRIBUTING MORE.”
                </h4>
              </div>
            </div>
          </div>

          {/* Bottom Memory Line */}
          <div className="glass-card-navy px-6 py-3.5 rounded-2xl flex items-center justify-between border border-cyan-500/30">
            <span className="text-xs font-black uppercase tracking-wider text-cyan-300">REMEMBER</span>
            <span className="text-sm sm:text-base font-black uppercase tracking-wide text-white">
              50% ownership ≠ 50% contribution
            </span>
          </div>
        </div>
      );

    /* =========================================================================
       SLIDE 8 — CONS #6: EXIT IS HARDER THAN ENTRY
       ========================================================================= */
    case 8:
      return (
        <div className="p-8 sm:p-12 lg:p-14 flex flex-col justify-between h-full relative z-10">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-widest text-cyan-300 glass-pill px-3.5 py-1 rounded-xl border border-cyan-500/30">
              06 — UNWINDING ENTANGLEMENT
            </span>
            <span className="text-xs font-bold text-slate-300">08 / 10</span>
          </div>

          <div className="my-2">
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-white">
              Exit is <span className="text-cyan-400">harder than entry.</span>
            </h2>
          </div>

          {/* Circular/Branching Diagram + Case Study */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch my-2">
            {/* Left Circular Entanglement Web */}
            <div className="lg:col-span-7 glass-card p-6 rounded-2xl border border-white/30 flex flex-col justify-center items-center relative">
              <span className="text-xs font-black uppercase text-cyan-300 mb-4 tracking-wider">
                THE EXIT ENTANGLEMENT WEB
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full">
                {["Valuation", "Intellectual Property", "Debt & Liabilities", "Shared Assets", "Employees", "Customers", "Contracts", "Restructuring"].map(
                  (item) => (
                    <div
                      key={item}
                      className="glass-pill p-3 rounded-xl border border-white/20 text-center text-xs font-extrabold text-white shadow-sm flex items-center justify-center min-h-[54px]"
                    >
                      {item}
                    </div>
                  )
                )}
              </div>
              <div className="mt-4 glass-btn-primary px-6 py-2 rounded-full text-xs font-black uppercase text-center shadow-[0_0_20px_rgba(37,99,235,0.5)] border border-white/30">
                Complex Exit Restructuring
              </div>
            </div>

            {/* Right Case Study Box */}
            <div className="lg:col-span-5 glass-card-blue p-6 rounded-2xl border border-cyan-500/40 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest glass-btn-primary px-3 py-1 rounded-md">
                  REAL-LIFE STORY
                </span>
                <h3 className="text-xl font-black uppercase text-white mt-3">WALMART–BHARTI | 2013</h3>
                <div className="h-1 w-12 bg-cyan-400 my-3 rounded-full shadow-[0_0_10px_rgba(56,189,248,0.8)]" />
                <div className="grid grid-cols-2 gap-3 my-3">
                  <div className="glass-pill p-3 rounded-xl border border-white/20">
                    <span className="text-[10px] font-black uppercase text-slate-300">ENTRY</span>
                    <p className="text-lg font-black text-cyan-300">$100M</p>
                    <p className="text-[10px] text-slate-200 font-medium">Stake acquisition</p>
                  </div>
                  <div className="glass-card-navy p-3 rounded-xl border border-cyan-500/30">
                    <span className="text-[10px] font-black uppercase text-slate-400">EXIT UNWIND</span>
                    <p className="text-lg font-black text-fuchsia-300">$234M</p>
                    <p className="text-[10px] text-slate-300 font-medium">Payments / forgiveness</p>
                  </div>
                </div>
                <p className="text-xs text-slate-200 font-medium leading-relaxed mt-2">
                  Partners may enter easily because their interests align, but exiting requires complex asset division when those interests diverge.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Memory Line */}
          <div className="glass-card-navy px-6 py-3.5 rounded-2xl flex items-center justify-between border border-cyan-500/30">
            <span className="text-xs font-black uppercase tracking-wider text-cyan-300">REMEMBER</span>
            <span className="text-sm sm:text-base font-black uppercase tracking-wide text-white">
              The contract can end. The entanglement does not.
            </span>
          </div>
        </div>
      );

    /* =========================================================================
       SLIDE 9 — THE COMPLETE ARGUMENT
       ========================================================================= */
    case 9:
      return (
        <div className="p-8 sm:p-12 lg:p-14 flex flex-col justify-between h-full relative z-10">
          <div className="flex items-center justify-between border-b border-white/15 pb-3">
            <span className="text-xs font-black uppercase tracking-widest text-cyan-300 glass-pill px-3.5 py-1 rounded-xl border border-cyan-500/40 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
              THE COMPLETE ARGUMENT
            </span>
            <span className="text-xs font-bold text-slate-300">09 / 10</span>
          </div>

          <div className="my-2">
            <h2 className="text-2xl sm:text-4xl font-black uppercase text-white">
              The Failure Chain of <span className="text-cyan-400">Shared Control</span>
            </h2>
          </div>

          {/* Complete Argument Sequential Flow Chain */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-2.5 my-3">
            {[
              "DIFFERENT GOALS",
              "STRATEGIC CONFLICT",
              "SHARED CONTROL",
              "DEADLOCK",
              "SLOWER DECISIONS",
              "KNOWLEDGE LEAKAGE",
              "CULTURAL FRICTION",
              "CONTRIBUTION DISPUTES",
              "DIFFICULT EXIT",
            ].map((step, index) => (
              <div
                key={step}
                className={`p-3 rounded-2xl border text-center flex flex-col justify-between h-full min-h-[95px] transition-all ${
                  index === 3 || index === 8
                    ? "glass-btn-primary border-white/40 shadow-[0_0_20px_rgba(37,99,235,0.6)] scale-105"
                    : "glass-card border-white/20 text-slate-200"
                }`}
              >
                <span className="text-[9px] font-black text-cyan-300 uppercase">0{index + 1}</span>
                <h5 className="text-xs font-black uppercase leading-tight mt-1 text-white">{step}</h5>
              </div>
            ))}
          </div>

          {/* Bottom Highlight: Core Problem */}
          <div className="glass-btn-primary p-6 rounded-2xl text-center space-y-2 border border-white/40 shadow-[0_0_40px_rgba(37,99,235,0.5)]">
            <span className="text-xs font-black uppercase tracking-widest text-cyan-200">
              THE CORE PROBLEM
            </span>
            <h3 className="text-2xl sm:text-4xl font-black uppercase text-white leading-tight">
              Not simply shared risk. <br />
              <span className="text-amber-300 drop-shadow-md">Shared control between independent interests.</span>
            </h3>
          </div>
        </div>
      );

    /* =========================================================================
       SLIDE 10 — BALANCED CONCLUSION
       ========================================================================= */
    case 10:
      return (
        <div className="p-8 sm:p-12 lg:p-14 flex flex-col justify-between h-full relative z-10">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-widest text-cyan-300 glass-pill px-3.5 py-1 rounded-xl border border-cyan-500/30">
              10 — BALANCED CONCLUSION
            </span>
            <span className="text-xs font-bold text-slate-300">10 / 10</span>
          </div>

          <div className="my-2">
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-white">
              Joint ventures can <span className="text-cyan-400">create value.</span>
            </h2>
          </div>

          {/* Two Section Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch my-2">
            {/* 5 Benefits Box */}
            <div className="md:col-span-6 glass-card p-6 rounded-2xl border border-white/30 space-y-3">
              <span className="text-xs font-black uppercase text-cyan-300 tracking-wider">
                WHEN THEY WORK: 5 BENEFITS
              </span>
              <div className="grid grid-cols-1 gap-2">
                {[
                  "Shared Capital",
                  "Market Access",
                  "Shared Expertise",
                  "Risk Sharing",
                  "Faster Entry",
                ].map((benefit) => (
                  <div
                    key={benefit}
                    className="glass-pill p-3 rounded-xl border border-emerald-500/30 flex items-center justify-between text-xs font-extrabold text-white"
                  >
                    <span>{benefit}</span>
                    <Check size={16} className="text-emerald-400" />
                  </div>
                ))}
              </div>
            </div>

            {/* But... Conditions Box */}
            <div className="md:col-span-6 glass-card-blue p-6 rounded-2xl border border-cyan-500/40 flex flex-col justify-between">
              <div>
                <span className="text-xs font-black uppercase text-white tracking-wider">
                  BUT... THESE BENEFITS DEPEND ON:
                </span>
                <div className="space-y-3 mt-4">
                  <div className="glass-btn-primary p-3.5 rounded-xl border border-white/30 font-black text-xs sm:text-sm text-white text-center uppercase shadow-md">
                    STRATEGIC ALIGNMENT
                  </div>
                  <div className="text-center font-black text-xs text-cyan-300">+</div>
                  <div className="glass-btn-primary p-3.5 rounded-xl border border-white/30 font-black text-xs sm:text-sm text-white text-center uppercase shadow-md">
                    CLEAR GOVERNANCE
                  </div>
                  <div className="text-center font-black text-xs text-cyan-300">+</div>
                  <div className="glass-btn-primary p-3.5 rounded-xl border border-white/30 font-black text-xs sm:text-sm text-white text-center uppercase shadow-md">
                    SHARED EXPECTATIONS
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Final Large Question */}
          <div className="glass-card-navy p-6 rounded-2xl text-center space-y-1 border border-cyan-500/40 shadow-[0_0_30px_rgba(56,189,248,0.25)]">
            <h3 className="text-xl sm:text-3xl font-black uppercase text-white leading-tight">
              When two companies own one business, <br />
              <span className="text-cyan-300">who gets the final say?</span>
            </h3>
            <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 pt-1">
              THE HIDDEN COST OF SHARED CONTROL
            </p>
          </div>
        </div>
      );

    default:
      return null;
  }
}