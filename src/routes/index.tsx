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
  Pause,
  Play,
  RotateCcw,
  Scale,
  ShieldAlert,
  SlidersHorizontal,
  Sparkles,
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
      { title: "The Hidden Costs of Joint Ventures — Canva-Style Presentation Deck" },
      {
        name: "description",
        content:
          "Why shared ownership can create shared problems. A modern, Canva-style business debate presentation on the hidden costs of joint ventures.",
      },
      { property: "og:title", content: "The Hidden Costs of Joint Ventures — Business Debate Deck" },
      {
        property: "og:description",
        content: "Resources can combine. Interests may not. Short, precise, visually powerful business debate presentation.",
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
      "Debate point: Equity equity split (50%) rarely matches perceived value contribution.",
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

  return (
    <div className="min-h-screen bg-[#F8F9FB] text-[#111827] font-sans flex flex-col selection:bg-[#2563EB] selection:text-white">
      {/* TOP DECK CONTROL BAR */}
      <header className="sticky top-0 z-50 bg-[#F8F9FB]/95 backdrop-blur-md border-b border-[#E5E7EB] px-4 lg:px-8 py-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-[#2563EB] text-white flex items-center justify-center font-bold text-xs shadow-xs">
              JV
            </span>
            <div>
              <h1 className="text-xs font-black uppercase tracking-wider text-[#111827]">
                The Hidden Costs of Joint Ventures
              </h1>
              <p className="text-[11px] font-medium text-[#6B7280]">Canva-Style Debate Deck</p>
            </div>
          </div>
          <span className="hidden sm:inline-block h-4 w-px bg-[#D1D5DB]" />
          <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#2563EB] bg-[#E8EEF8] px-2.5 py-0.5 rounded-full">
            <Sparkles size={12} /> Debate Mode
          </span>
        </div>

        {/* CONTROLS */}
        <div className="flex items-center gap-2">
          {/* Deck vs Scroll Switcher */}
          <div className="bg-[#E5E7EB] p-1 rounded-lg flex items-center gap-1 text-xs font-bold">
            <button
              onClick={() => setViewMode("deck")}
              className={`px-3 py-1 rounded-md transition-all ${
                viewMode === "deck"
                  ? "bg-[#2563EB] text-white shadow-xs"
                  : "text-[#6B7280] hover:text-[#111827]"
              }`}
            >
              Slides Mode
            </button>
            <button
              onClick={() => setViewMode("scroll")}
              className={`px-3 py-1 rounded-md transition-all ${
                viewMode === "scroll"
                  ? "bg-[#2563EB] text-white shadow-xs"
                  : "text-[#6B7280] hover:text-[#111827]"
              }`}
            >
              Scroll Mode
            </button>
          </div>

          {/* Speaker Notes Toggle Button */}
          <button
            onClick={() => setShowSpeakerNotes((prev) => !prev)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
              showSpeakerNotes
                ? "bg-[#111827] text-white border-[#111827]"
                : "bg-white text-[#111827] border-[#E5E7EB] hover:bg-[#E8EEF8]"
            }`}
            title="Toggle Speaker Notes for debate speaking points (Press N)"
          >
            <BookOpen size={14} />
            <span className="hidden md:inline">Speaker Notes</span>
          </button>

          {/* Grid Overview Modal Toggle */}
          {viewMode === "deck" && (
            <button
              onClick={() => setShowGridModal(true)}
              className="p-2 bg-white hover:bg-[#E8EEF8] text-[#111827] rounded-lg border border-[#E5E7EB] transition-all"
              title="View all 10 slides (Press G)"
            >
              <Grid size={16} />
            </button>
          )}

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="hidden sm:flex p-2 bg-white hover:bg-[#E8EEF8] text-[#111827] rounded-lg border border-[#E5E7EB] transition-all"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>

          {/* Share Link */}
          <button
            onClick={handleCopyShare}
            className="p-2 bg-white hover:bg-[#E8EEF8] text-[#111827] rounded-lg border border-[#E5E7EB] transition-all relative"
            title="Copy share link"
          >
            <Copy size={16} />
            {copiedLink && (
              <span className="absolute -bottom-8 right-0 bg-[#111827] text-white text-[10px] px-2 py-1 rounded shadow-md whitespace-nowrap">
                Link copied!
              </span>
            )}
          </button>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col justify-between relative" ref={containerRef}>
        {viewMode === "deck" ? (
          /* DECK PRESENTATION VIEW */
          <div className="flex-1 flex flex-col items-center justify-center p-4 lg:p-8 max-w-[1400px] mx-auto w-full">
            {/* PROGRESS BAR & SLIDE HEAD LEVEL INDICATOR */}
            <div className="w-full mb-4 flex items-center justify-between text-xs font-bold text-[#6B7280]">
              <div className="flex items-center gap-2">
                <span className="text-[#2563EB] font-black text-sm">
                  SLIDE {String(currentSlide).padStart(2, "0")} / 10
                </span>
                <span className="text-[#D1D5DB]">•</span>
                <span className="uppercase tracking-wider font-extrabold text-[#111827]">
                  {SLIDES[currentSlide - 1].title}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-32 sm:w-48 bg-[#E5E7EB] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#2563EB] h-full transition-all duration-300 rounded-full"
                    style={{ width: `${(currentSlide / 10) * 100}%` }}
                  />
                </div>
                <button
                  onClick={() => setIsPlaying((prev) => !prev)}
                  className="flex items-center gap-1 text-[11px] font-bold uppercase text-[#2563EB] hover:text-[#111827]"
                >
                  {isPlaying ? (
                    <>
                      <Pause size={13} /> Pause
                    </>
                  ) : (
                    <>
                      <Play size={13} /> Auto-play
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* CANVAS SLIDE FRAME (16:9 Canva Aspect Ratio Container) */}
            <div className="w-full bg-white rounded-2xl border border-[#E5E7EB] shadow-xl overflow-hidden min-h-[580px] lg:min-h-[660px] flex flex-col justify-between transition-all duration-300 relative">
              {renderSlideContent(currentSlide)}
            </div>

            {/* SLIDE NAVIGATION CONTROLS AT BOTTOM */}
            <div className="w-full mt-5 flex items-center justify-between bg-white px-6 py-3 rounded-xl border border-[#E5E7EB] shadow-xs">
              <button
                onClick={() => setCurrentSlide((prev) => Math.max(prev - 1, 1))}
                disabled={currentSlide === 1}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#F8F9FB] hover:bg-[#E8EEF8] border border-[#E5E7EB] font-bold text-xs text-[#111827] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft size={16} /> Previous
              </button>

              {/* Slide Dots / Thumbnails */}
              <div className="hidden sm:flex items-center gap-1.5">
                {SLIDES.map((slide) => (
                  <button
                    key={slide.id}
                    onClick={() => setCurrentSlide(slide.id)}
                    className={`h-2.5 rounded-full transition-all ${
                      currentSlide === slide.id
                        ? "w-8 bg-[#2563EB]"
                        : "w-2.5 bg-[#E5E7EB] hover:bg-[#9CA3AF]"
                    }`}
                    title={`Slide ${slide.id}: ${slide.title}`}
                  />
                ))}
              </div>

              <button
                onClick={() => setCurrentSlide((prev) => Math.min(prev + 1, 10))}
                disabled={currentSlide === 10}
                className="flex items-center gap-2 px-5 py-2 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] font-bold text-xs text-white shadow-xs disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                Next Slide <ChevronRight size={16} />
              </button>
            </div>
          </div>
        ) : (
          /* SCROLL VIEW (VERTICAL ALL SLIDES EDITORIAL) */
          <div className="max-w-[1200px] mx-auto w-full px-4 py-8 space-y-16">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-xs font-black uppercase tracking-widest text-[#2563EB] bg-[#E8EEF8] px-3 py-1 rounded-full inline-block">
                Full Presentation Deck
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-[#111827] uppercase tracking-tight">
                All 10 Slides Overview
              </h2>
              <p className="text-base text-[#6B7280] font-medium">
                Scroll through the complete presentation or click any slide title to switch back to presentation mode.
              </p>
            </div>

            {SLIDES.map((slide) => (
              <div key={slide.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-[#2563EB] bg-[#E8EEF8] px-2.5 py-1 rounded-md">
                      SLIDE {String(slide.id).padStart(2, "0")}
                    </span>
                    <h3 className="text-lg font-black uppercase text-[#111827]">{slide.title}</h3>
                  </div>
                  <button
                    onClick={() => {
                      setCurrentSlide(slide.id);
                      setViewMode("deck");
                    }}
                    className="text-xs font-bold text-[#2563EB] hover:underline flex items-center gap-1"
                  >
                    Present this slide <ArrowRight size={14} />
                  </button>
                </div>
                <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-lg overflow-hidden min-h-[500px] p-6 lg:p-10">
                  {renderSlideContent(slide.id)}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* SPEAKER NOTES DRAWER / MODAL */}
      {showSpeakerNotes && (
        <div className="fixed bottom-4 right-4 z-50 max-w-md w-full bg-[#111827] text-white rounded-xl shadow-2xl border border-gray-800 p-5 space-y-3 animate-in fade-in slide-in-from-bottom-5">
          <div className="flex items-center justify-between border-b border-gray-800 pb-3">
            <div className="flex items-center gap-2">
              <BookOpen size={16} className="text-[#2563EB]" />
              <h4 className="text-xs font-black uppercase tracking-wider text-white">
                Speaker Notes — Slide {currentSlide}: {SPEAKER_NOTES[currentSlide - 1].title}
              </h4>
            </div>
            <button
              onClick={() => setShowSpeakerNotes(false)}
              className="text-gray-400 hover:text-white font-bold text-xs"
            >
              ✕
            </button>
          </div>
          <div className="space-y-2 text-xs leading-relaxed text-gray-300">
            {SPEAKER_NOTES[currentSlide - 1].bullets.map((bullet, i) => (
              <div key={i} className="flex gap-2 items-start">
                <span className="text-[#2563EB] font-bold">•</span>
                <p>{bullet}</p>
              </div>
            ))}
          </div>
          <div className="pt-2 flex justify-between items-center text-[10px] text-gray-400 border-t border-gray-800">
            <span>Use Left/Right arrows to switch slides</span>
            <span className="text-[#38BDF8]">Debate Prep</span>
          </div>
        </div>
      )}

      {/* GRID OVERVIEW MODAL */}
      {showGridModal && (
        <div className="fixed inset-0 z-50 bg-[#111827]/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8">
          <div className="bg-[#F8F9FB] rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 border border-[#E5E7EB] shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-4">
              <div>
                <h3 className="text-xl font-black uppercase text-[#111827]">Presentation Overview</h3>
                <p className="text-xs text-[#6B7280] font-medium">Select any slide to jump directly</p>
              </div>
              <button
                onClick={() => setShowGridModal(false)}
                className="px-3 py-1.5 bg-[#111827] text-white text-xs font-bold rounded-lg hover:bg-[#2563EB]"
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
                  className={`p-4 rounded-xl border text-left flex flex-col justify-between min-h-[130px] transition-all ${
                    currentSlide === slide.id
                      ? "bg-[#2563EB] text-white border-[#2563EB] ring-4 ring-[#2563EB]/20 shadow-md"
                      : "bg-white text-[#111827] border-[#E5E7EB] hover:border-[#2563EB] hover:shadow-md"
                  }`}
                >
                  <span
                    className={`text-[10px] font-black uppercase px-2 py-0.5 rounded w-fit ${
                      currentSlide === slide.id
                        ? "bg-white/20 text-white"
                        : "bg-[#E8EEF8] text-[#2563EB]"
                    }`}
                  >
                    SLIDE {String(slide.id).padStart(2, "0")}
                  </span>
                  <div>
                    <h5 className="font-extrabold text-xs uppercase leading-tight line-clamp-2">
                      {slide.title}
                    </h5>
                    <p
                      className={`text-[10px] mt-1 ${
                        currentSlide === slide.id ? "text-white/80" : "text-[#6B7280]"
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

      {/* FOOTER BAR */}
      <footer className="border-t border-[#E5E7EB] bg-white px-6 py-3 text-center text-xs font-bold text-[#6B7280] flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-black text-[#111827]">BUSINESS DEBATE PRESENTATION</span>
          <span>•</span>
          <span>“Resources can combine. Interests may not.”</span>
        </div>
        <div className="text-[11px] text-[#6B7280]">
          Press <kbd className="px-1.5 py-0.5 bg-[#F1F5F9] border rounded text-[10px] font-mono">N</kbd> for Speaker Notes | <kbd className="px-1.5 py-0.5 bg-[#F1F5F9] border rounded text-[10px] font-mono">G</kbd> for Grid View
        </div>
      </footer>
    </div>
  );
}

// SLIDE RENDERER FUNCTION FOR ALL 10 SLIDES
function renderSlideContent(slideId: number) {
  switch (slideId) {
    /* =========================================================================
       SLIDE 1 — COVER
       ========================================================================= */
    case 1:
      return (
        <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-between h-full bg-gradient-to-br from-white via-[#F8F9FB] to-[#E8EEF8]/40">
          {/* Top Label */}
          <div className="flex items-center justify-between">
            <span className="px-3.5 py-1 bg-[#111827] text-white text-xs font-black uppercase tracking-widest rounded-md shadow-xs">
              BUSINESS DEBATE
            </span>
            <span className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">
              Strategic Management Field Study
            </span>
          </div>

          {/* Main Title & Subtitle */}
          <div className="my-8 space-y-4 max-w-4xl">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-[#111827] leading-[0.95] tracking-tight font-poppins">
              THE HIDDEN COSTS <br />
              <span className="text-[#2563EB]">OF JOINT VENTURES</span>
            </h1>
            <p className="text-xl sm:text-2xl font-bold text-[#6B7280] max-w-2xl font-inter">
              Why shared ownership can create shared problems
            </p>
          </div>

          {/* Clean Canva Visual: 2 Independent Companies Connecting into Shared Center */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center bg-[#E8EEF8]/60 p-6 rounded-2xl border border-[#D2E0F5]">
            <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] shadow-sm text-center">
              <span className="text-xs font-black text-[#2563EB] uppercase">COMPANY A</span>
              <h4 className="text-base font-extrabold text-[#111827] mt-1">Independent Goals</h4>
              <p className="text-xs text-[#6B7280] mt-1 font-medium">Resources & Capabilities</p>
            </div>

            <div className="flex flex-col items-center justify-center text-center py-2">
              <div className="bg-[#2563EB] text-white p-4 rounded-xl shadow-md w-full max-w-[220px]">
                <span className="text-[10px] font-black uppercase tracking-wider opacity-80">50 : 50 EQUITY</span>
                <h4 className="text-lg font-black uppercase leading-tight mt-0.5">SHARED VENTURE</h4>
              </div>
              <span className="text-[11px] font-bold text-[#2563EB] mt-2">Shared Ownership & Control</span>
            </div>

            <div className="bg-[#111827] text-white p-5 rounded-xl shadow-sm text-center">
              <span className="text-xs font-black text-[#38BDF8] uppercase">COMPANY B</span>
              <h4 className="text-base font-extrabold text-white mt-1">Independent Goals</h4>
              <p className="text-xs text-gray-400 mt-1 font-medium">Resources & Capabilities</p>
            </div>
          </div>
        </div>
      );

    /* =========================================================================
       SLIDE 2 — THE BASIC IDEA
       ========================================================================= */
    case 2:
      return (
        <div className="p-8 sm:p-12 lg:p-14 flex flex-col justify-between h-full bg-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-widest text-[#2563EB] bg-[#E8EEF8] px-3 py-1 rounded-md">
              CORE PREMISE
            </span>
            <span className="text-xs font-bold text-[#6B7280]">02 / 10</span>
          </div>

          <div className="space-y-3 my-4">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-[#111827] leading-none">
              Resources can combine. <br />
              <span className="text-[#2563EB]">Interests may not.</span>
            </h2>
          </div>

          {/* Visual Diagram */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch my-2">
            {/* Left Diagram Box */}
            <div className="lg:col-span-7 bg-[#F8F9FB] p-6 rounded-2xl border border-[#E5E7EB] flex flex-col justify-center space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#111827] text-white p-5 rounded-xl">
                  <span className="text-xs font-black text-[#38BDF8] uppercase">COMPANY A</span>
                  <p className="text-sm font-bold mt-1">Resources</p>
                </div>
                <div className="bg-[#2563EB] text-white p-5 rounded-xl">
                  <span className="text-xs font-black text-white/80 uppercase">COMPANY B</span>
                  <p className="text-sm font-bold mt-1">Resources</p>
                </div>
              </div>

              <div className="flex justify-center my-1">
                <ArrowDown size={28} className="text-[#2563EB]" />
              </div>

              <div className="bg-[#111827] text-white p-5 rounded-xl text-center shadow-md">
                <span className="text-xs font-black text-[#38BDF8] uppercase">SHARED JV</span>
                <h4 className="text-xl font-black uppercase tracking-wide mt-1">50:50 COMBINED ENTITY</h4>
              </div>

              <p className="text-xs sm:text-sm font-medium text-[#6B7280] leading-relaxed pt-2 border-t border-[#E5E7EB]">
                A joint venture combines resources, but the partners remain independent companies with their own goals, strategies and interests.
              </p>
            </div>

            {/* Right Checklist Box */}
            <div className="lg:col-span-5 bg-[#E8EEF8] p-6 rounded-2xl border border-[#D2E0F5] flex flex-col justify-between">
              <h4 className="text-xs font-black uppercase text-[#2563EB] tracking-wider mb-4">
                THE JV BALANCE SHEET
              </h4>

              <div className="space-y-3 flex-1">
                <div className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-[#E5E7EB]">
                  <span className="font-extrabold text-base text-[#111827]">Resources</span>
                  <span className="flex items-center gap-1.5 text-emerald-600 font-black text-sm">
                    <Check size={18} strokeWidth={3} /> ✓
                  </span>
                </div>

                <div className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-[#E5E7EB]">
                  <span className="font-extrabold text-base text-[#111827]">Risk</span>
                  <span className="flex items-center gap-1.5 text-emerald-600 font-black text-sm">
                    <Check size={18} strokeWidth={3} /> ✓
                  </span>
                </div>

                <div className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-[#E5E7EB]">
                  <span className="font-extrabold text-base text-[#111827]">Profit</span>
                  <span className="flex items-center gap-1.5 text-emerald-600 font-black text-sm">
                    <Check size={18} strokeWidth={3} /> ✓
                  </span>
                </div>

                <div className="flex items-center justify-between p-3.5 bg-[#111827] text-white rounded-xl border border-[#111827] shadow-sm">
                  <span className="font-extrabold text-base text-white">Control</span>
                  <span className="flex items-center gap-1.5 text-amber-400 font-black text-sm">
                    <CircleAlert size={18} strokeWidth={2.5} /> ⚠
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Memory Line */}
          <div className="bg-[#111827] text-white px-6 py-4 rounded-xl flex items-center justify-between shadow-md">
            <span className="text-xs font-black uppercase tracking-wider text-[#38BDF8]">MEMORY LINE</span>
            <span className="text-sm sm:text-lg font-black uppercase tracking-wide">
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
        <div className="p-8 sm:p-12 lg:p-14 flex flex-col justify-between h-full bg-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-widest text-[#2563EB] bg-[#E8EEF8] px-3 py-1 rounded-md">
              01 — CONFLICTING OBJECTIVES
            </span>
            <span className="text-xs font-bold text-[#6B7280]">03 / 10</span>
          </div>

          <div className="my-2">
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-[#111827]">
              Two captains. <span className="text-[#2563EB]">One ship.</span>
            </h2>
          </div>

          {/* Decision Path Visual + Case Study */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch my-2">
            {/* Left Diagram */}
            <div className="lg:col-span-7 bg-[#F8F9FB] p-6 rounded-2xl border border-[#E5E7EB] flex flex-col justify-between">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-xl border-l-4 border-l-[#2563EB] border border-[#E5E7EB] shadow-xs">
                  <span className="text-xs font-black uppercase text-[#2563EB]">PARTNER A</span>
                  <h4 className="text-base font-extrabold text-[#111827] mt-1">“Expand aggressively”</h4>
                  <p className="text-xs text-[#6B7280] mt-1">Long-term market share focus</p>
                </div>

                <div className="bg-white p-5 rounded-xl border-l-4 border-l-[#111827] border border-[#E5E7EB] shadow-xs">
                  <span className="text-xs font-black uppercase text-[#111827]">PARTNER B</span>
                  <h4 className="text-base font-extrabold text-[#111827] mt-1">“Protect short-term profit”</h4>
                  <p className="text-xs text-[#6B7280] mt-1">Immediate dividend focus</p>
                </div>
              </div>

              <div className="flex items-center justify-center my-3 text-center">
                <div className="bg-[#E8EEF8] px-6 py-2.5 rounded-full border border-[#D2E0F5] text-xs font-extrabold text-[#2563EB] uppercase">
                  ↓ SHARED CONTROL ↓
                </div>
              </div>

              <div className="bg-[#111827] text-white p-6 rounded-xl text-center shadow-lg">
                <span className="text-xs font-black uppercase tracking-widest text-amber-400">OUTCOME</span>
                <h3 className="text-3xl font-black uppercase tracking-wider text-white mt-1">DEADLOCK</h3>
                <p className="text-xs text-gray-400 mt-1">Neither partner can proceed without approval.</p>
              </div>
            </div>

            {/* Right Case Study Box */}
            <div className="lg:col-span-5 bg-[#E8EEF8] p-6 rounded-2xl border border-[#D2E0F5] flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest bg-[#2563EB] text-white px-2.5 py-1 rounded">
                  REAL-LIFE STORY
                </span>
                <h3 className="text-2xl font-black uppercase text-[#111827] mt-3">TNK-BP | 2003–2013</h3>
                <div className="h-1 w-12 bg-[#2563EB] my-3" />
                <ul className="space-y-2 text-xs font-medium text-[#111827] leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-[#2563EB] font-bold">•</span>
                    <span><strong>50:50 ownership</strong> between BP and Russian billionaire consortium (AAR).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#2563EB] font-bold">•</span>
                    <span>AAR legally challenged BP’s strategic alliance with Rosneft.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#2563EB] font-bold">•</span>
                    <span>In 2013, Rosneft acquired AAR’s stake while BP sold its stake the exact same day.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-4 pt-4 border-t border-[#D2E0F5]">
                <img
                  src={cargoShip}
                  alt="Container ship in ocean"
                  className="w-full h-28 object-cover rounded-xl shadow-xs"
                />
              </div>
            </div>
          </div>

          {/* Bottom Memory Line */}
          <div className="bg-[#E8EEF8] border border-[#D2E0F5] text-[#111827] px-6 py-3.5 rounded-xl flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-[#2563EB]">REMEMBER</span>
            <span className="text-sm sm:text-base font-black uppercase tracking-wide">
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
        <div className="p-8 sm:p-12 lg:p-14 flex flex-col justify-between h-full bg-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-widest text-[#2563EB] bg-[#E8EEF8] px-3 py-1 rounded-md">
              02 — STRATEGIC MISALIGNMENT
            </span>
            <span className="text-xs font-bold text-[#6B7280]">04 / 10</span>
          </div>

          <div className="my-2">
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-[#111827]">
              A partnership can <span className="text-[#2563EB]">outlive its logic.</span>
            </h2>
          </div>

          {/* Horizontal Timeline Diagram */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-stretch my-4">
            <div className="bg-[#F8F9FB] p-5 rounded-2xl border border-[#E5E7EB] flex flex-col justify-between">
              <div>
                <span className="text-xs font-black text-[#2563EB] bg-[#E8EEF8] px-2.5 py-1 rounded">2001</span>
                <h4 className="text-base font-black uppercase text-[#111827] mt-3">Sony Ericsson Formed</h4>
              </div>
              <p className="text-xs text-[#6B7280] mt-2 font-medium">Equal 50:50 joint venture created.</p>
            </div>

            <div className="bg-[#E8EEF8] p-5 rounded-2xl border border-[#D2E0F5] flex flex-col justify-between">
              <div>
                <span className="text-xs font-black text-[#2563EB] uppercase">STRATEGY</span>
                <h4 className="text-base font-black uppercase text-[#111827] mt-3">Market Expansion</h4>
              </div>
              <p className="text-xs text-[#111827] font-semibold mt-2">+ Combined capabilities & technology</p>
            </div>

            <div className="bg-[#F8F9FB] p-5 rounded-2xl border border-[#E5E7EB] flex flex-col justify-between">
              <div>
                <span className="text-xs font-black text-[#111827] bg-[#E5E7EB] px-2.5 py-1 rounded">2011</span>
                <h4 className="text-base font-black uppercase text-[#111827] mt-3">Sony Buys Ericsson's 50%</h4>
              </div>
              <p className="text-xs text-[#6B7280] mt-2 font-medium">Integrated into Sony's ecosystem.</p>
            </div>

            <div className="bg-[#111827] text-white p-5 rounded-2xl flex flex-col justify-between shadow-lg">
              <div>
                <span className="text-xs font-black text-[#38BDF8] uppercase">TRANSACTION</span>
                <h4 className="text-3xl font-black text-white mt-2">€1.05 B</h4>
              </div>
              <p className="text-xs text-gray-300 font-bold uppercase mt-2">Billion buyout price</p>
            </div>
          </div>

          {/* Real Life Story Box */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-[#F8F9FB] p-6 rounded-2xl border border-[#E5E7EB] items-center">
            <div className="md:col-span-8 space-y-2">
              <span className="text-xs font-black uppercase text-[#2563EB]">REAL-LIFE STORY — SONY ERICSSON</span>
              <p className="text-sm font-medium text-[#111827] leading-relaxed">
                The partnership initially made strategic sense, but Sony eventually chose to integrate the mobile business directly into its overall hardware & entertainment ecosystem. The original reasons for cooperation can change as markets and strategies change.
              </p>
            </div>
            <div className="md:col-span-4 flex justify-end">
              <img
                src={legacyPhone}
                alt="Sony Ericsson mobile phone"
                className="w-full h-24 object-cover rounded-xl border border-[#E5E7EB] shadow-xs"
              />
            </div>
          </div>

          {/* Bottom Memory Line */}
          <div className="bg-[#111827] text-white px-6 py-3.5 rounded-xl flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-[#38BDF8]">REMEMBER</span>
            <span className="text-sm sm:text-base font-black uppercase tracking-wide">
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
        <div className="p-8 sm:p-12 lg:p-14 flex flex-col justify-between h-full bg-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-widest text-[#2563EB] bg-[#E8EEF8] px-3 py-1 rounded-md">
              03 — MORE OWNERS. LESS SPEED.
            </span>
            <span className="text-xs font-bold text-[#6B7280]">05 / 10</span>
          </div>

          <div className="my-2">
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-[#111827]">
              More decision gates → <span className="text-[#2563EB]">slower action.</span>
            </h2>
          </div>

          {/* Visual Comparison Flow */}
          <div className="space-y-4 my-2">
            {/* Row 1: Independent Company */}
            <div className="bg-[#F8F9FB] p-5 rounded-2xl border border-[#E5E7EB] space-y-2">
              <span className="text-xs font-black uppercase text-[#111827] tracking-wider">
                INDEPENDENT COMPANY (3 STEPS)
              </span>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white p-3.5 rounded-xl border border-[#E5E7EB] text-center font-black text-sm text-[#111827]">
                  Problem
                </div>
                <div className="bg-[#2563EB] p-3.5 rounded-xl text-center font-black text-sm text-white shadow-xs">
                  Decision
                </div>
                <div className="bg-[#111827] p-3.5 rounded-xl text-center font-black text-sm text-white">
                  Action
                </div>
              </div>
            </div>

            {/* Row 2: Joint Venture */}
            <div className="bg-[#E8EEF8] p-5 rounded-2xl border border-[#D2E0F5] space-y-2">
              <span className="text-xs font-black uppercase text-[#2563EB] tracking-wider">
                JOINT VENTURE (5 STEPS — SLOW DECISION GATES)
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3">
                <div className="bg-white p-3 rounded-xl border border-[#D2E0F5] text-center font-black text-xs sm:text-sm text-[#111827]">
                  Problem
                </div>
                <div className="bg-white p-3 rounded-xl border border-[#D2E0F5] text-center font-black text-xs sm:text-sm text-[#2563EB]">
                  Partner Discussion
                </div>
                <div className="bg-white p-3 rounded-xl border border-[#D2E0F5] text-center font-black text-xs sm:text-sm text-amber-600">
                  Negotiation
                </div>
                <div className="bg-white p-3 rounded-xl border border-[#D2E0F5] text-center font-black text-xs sm:text-sm text-[#2563EB]">
                  Approval
                </div>
                <div className="bg-[#111827] p-3 rounded-xl text-center font-black text-xs sm:text-sm text-white col-span-2 sm:col-span-1">
                  Action
                </div>
              </div>
            </div>
          </div>

          {/* Highlight Callout Box */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-[#111827] text-white p-6 rounded-2xl shadow-lg">
            <div className="md:col-span-6 space-y-1 border-r border-gray-800 pr-4">
              <span className="text-xs font-black uppercase text-amber-400">CRITICAL WARNING</span>
              <h3 className="text-2xl font-black uppercase tracking-tight text-white">DELAY IS NOT NEUTRAL.</h3>
            </div>
            <div className="md:col-span-6 text-xs text-gray-300 font-medium leading-relaxed">
              If a market opportunity lasts only 3 months, prolonged partner discussion and negotiation can mean the opportunity disappears completely before approval is reached.
            </div>
          </div>

          {/* Bottom Memory Line */}
          <div className="bg-[#E8EEF8] border border-[#D2E0F5] text-[#111827] px-6 py-3.5 rounded-xl flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-[#2563EB]">REMEMBER</span>
            <span className="text-sm sm:text-base font-black uppercase tracking-wide">
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
        <div className="p-8 sm:p-12 lg:p-14 flex flex-col justify-between h-full bg-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-widest text-[#2563EB] bg-[#E8EEF8] px-3 py-1 rounded-md">
              04 — KNOWLEDGE LEAKAGE
            </span>
            <span className="text-xs font-bold text-[#6B7280]">06 / 10</span>
          </div>

          <div className="my-2">
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-[#111827] leading-none">
              Today's partner can become <br />
              <span className="text-[#2563EB]">tomorrow's rival.</span>
            </h2>
          </div>

          {/* Visual Flow Diagram */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center my-3">
            {/* Step 1: Partner */}
            <div className="md:col-span-3 bg-[#111827] text-white p-6 rounded-2xl text-center shadow-md flex flex-col items-center justify-center min-h-[180px]">
              <span className="text-xs font-black uppercase text-[#38BDF8]">STARTING POINT</span>
              <h3 className="text-2xl font-black uppercase mt-1">PARTNER</h3>
              <p className="text-xs text-gray-400 mt-1">Shared cooperation</p>
            </div>

            {/* Step 2: Knowledge Transfer Grid */}
            <div className="md:col-span-6 bg-[#E8EEF8] p-5 rounded-2xl border border-[#D2E0F5] space-y-3">
              <span className="text-xs font-black uppercase text-[#2563EB] tracking-wider block text-center">
                ↓ KNOWLEDGE TRANSFER PIPELINE ↓
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {["Technology", "Processes", "Customers", "Suppliers", "Market Intel", "Intellectual Property"].map(
                  (item) => (
                    <div
                      key={item}
                      className="bg-white p-2.5 rounded-lg border border-[#E5E7EB] text-center text-xs font-extrabold text-[#111827]"
                    >
                      {item}
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Step 3: Potential Competitor */}
            <div className="md:col-span-3 bg-[#2563EB] text-white p-6 rounded-2xl text-center shadow-md flex flex-col items-center justify-center min-h-[180px]">
              <span className="text-xs font-black uppercase text-white/80">END RESULT</span>
              <h3 className="text-xl font-black uppercase leading-tight mt-1">POTENTIAL COMPETITOR</h3>
              <p className="text-xs text-white/80 mt-1">Equipped with your IP</p>
            </div>
          </div>

          {/* Explanation Banner */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-[#F8F9FB] p-5 rounded-2xl border border-[#E5E7EB] items-center">
            <div className="md:col-span-8 space-y-1">
              <p className="text-xs sm:text-sm font-medium text-[#111827] leading-relaxed">
                Joint ventures require knowledge sharing. The exact same knowledge that strengthens cooperation today can later strengthen competition if the partnership dissolves.
              </p>
            </div>
            <div className="md:col-span-4 flex justify-end">
              <img
                src={chessRival}
                alt="Chess game rivalry"
                className="w-full h-20 object-cover rounded-xl border border-[#E5E7EB]"
              />
            </div>
          </div>

          {/* Bottom Memory Line */}
          <div className="bg-[#111827] text-white px-6 py-3.5 rounded-xl flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-[#38BDF8]">REMEMBER</span>
            <span className="text-sm sm:text-base font-black uppercase tracking-wide">
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
        <div className="p-8 sm:p-12 lg:p-14 flex flex-col justify-between h-full bg-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-widest text-[#2563EB] bg-[#E8EEF8] px-3 py-1 rounded-md">
              05 — FRICTION & DISPUTES
            </span>
            <span className="text-xs font-bold text-[#6B7280]">07 / 10</span>
          </div>

          <div className="my-2">
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-[#111827]">
              Culture & <span className="text-[#2563EB]">Contribution Conflict</span>
            </h2>
          </div>

          {/* Split 2 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch my-3">
            {/* Card 1: Culture */}
            <div className="bg-[#F8F9FB] p-6 rounded-2xl border border-[#E5E7EB] flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
                  <h3 className="text-xl font-black uppercase text-[#111827]">CULTURE</h3>
                  <Users className="text-[#2563EB]" size={22} />
                </div>
                <div className="grid grid-cols-2 gap-2 my-4">
                  {["Leadership", "Communication", "Risk tolerance", "Hierarchy", "People management", "Decision norms"].map(
                    (item) => (
                      <div
                        key={item}
                        className="bg-white p-2.5 rounded-lg border border-[#E5E7EB] text-xs font-bold text-[#111827]"
                      >
                        • {item}
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="bg-[#111827] text-white p-4 rounded-xl text-center mt-2">
                <span className="text-xs font-black uppercase tracking-widest text-amber-400">OUTCOME</span>
                <h4 className="text-2xl font-black uppercase text-white">CULTURAL FRICTION</h4>
              </div>
            </div>

            {/* Card 2: Contribution */}
            <div className="bg-[#E8EEF8] p-6 rounded-2xl border border-[#D2E0F5] flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center justify-between border-b border-[#D2E0F5] pb-3">
                  <h3 className="text-xl font-black uppercase text-[#111827]">CONTRIBUTION</h3>
                  <Scale className="text-[#2563EB]" size={22} />
                </div>
                <div className="space-y-2.5 my-4">
                  <div className="bg-white p-3 rounded-lg border border-[#D2E0F5] flex justify-between items-center text-xs font-bold text-[#111827]">
                    <span>Partner A</span>
                    <span className="text-[#2563EB]">Technology & IP</span>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-[#D2E0F5] flex justify-between items-center text-xs font-bold text-[#111827]">
                    <span>Partner B</span>
                    <span className="text-[#2563EB]">Market Access</span>
                  </div>
                  <div className="bg-[#111827] text-white p-3 rounded-lg flex justify-between items-center text-xs font-black">
                    <span>Both Partners</span>
                    <span className="text-[#38BDF8]">50% Ownership</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#2563EB] text-white p-4 rounded-xl text-center mt-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-white/80">PERCEPTION GAP</span>
                <h4 className="text-lg font-black uppercase text-white leading-tight">
                  “WE ARE CONTRIBUTING MORE.”
                </h4>
              </div>
            </div>
          </div>

          {/* Bottom Memory Line */}
          <div className="bg-[#111827] text-white px-6 py-3.5 rounded-xl flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-[#38BDF8]">REMEMBER</span>
            <span className="text-sm sm:text-base font-black uppercase tracking-wide">
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
        <div className="p-8 sm:p-12 lg:p-14 flex flex-col justify-between h-full bg-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-widest text-[#2563EB] bg-[#E8EEF8] px-3 py-1 rounded-md">
              06 — UNWINDING ENTANGLEMENT
            </span>
            <span className="text-xs font-bold text-[#6B7280]">08 / 10</span>
          </div>

          <div className="my-2">
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-[#111827]">
              Exit is <span className="text-[#2563EB]">harder than entry.</span>
            </h2>
          </div>

          {/* Circular/Branching Diagram + Case Study */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch my-2">
            {/* Left Circular Entanglement Web */}
            <div className="lg:col-span-7 bg-[#F8F9FB] p-6 rounded-2xl border border-[#E5E7EB] flex flex-col justify-center items-center relative">
              <span className="text-xs font-black uppercase text-[#2563EB] mb-4">THE EXIT ENTANGLEMENT WEB</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full">
                {["Valuation", "Intellectual Property", "Debt & Liabilities", "Shared Assets", "Employees", "Customers", "Contracts", "Restructuring"].map(
                  (item) => (
                    <div
                      key={item}
                      className="bg-white p-3 rounded-xl border border-[#E5E7EB] text-center text-xs font-extrabold text-[#111827] shadow-xs flex items-center justify-center min-h-[54px]"
                    >
                      {item}
                    </div>
                  )
                )}
              </div>
              <div className="mt-4 bg-[#111827] text-white px-6 py-2 rounded-full text-xs font-black uppercase text-center shadow-md">
                Complex Exit Restructuring
              </div>
            </div>

            {/* Right Case Study Box */}
            <div className="lg:col-span-5 bg-[#E8EEF8] p-6 rounded-2xl border border-[#D2E0F5] flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest bg-[#2563EB] text-white px-2.5 py-1 rounded">
                  REAL-LIFE STORY
                </span>
                <h3 className="text-xl font-black uppercase text-[#111827] mt-3">WALMART–BHARTI | 2013</h3>
                <div className="h-1 w-12 bg-[#2563EB] my-3" />
                <div className="grid grid-cols-2 gap-3 my-3">
                  <div className="bg-white p-3 rounded-xl border border-[#D2E0F5]">
                    <span className="text-[10px] font-black uppercase text-[#6B7280]">ENTRY</span>
                    <p className="text-lg font-black text-[#2563EB]">$100M</p>
                    <p className="text-[10px] text-[#111827] font-medium">Stake acquisition</p>
                  </div>
                  <div className="bg-[#111827] text-white p-3 rounded-xl">
                    <span className="text-[10px] font-black uppercase text-gray-400">EXIT UNWIND</span>
                    <p className="text-lg font-black text-[#38BDF8]">$234M</p>
                    <p className="text-[10px] text-gray-300 font-medium">Payments / forgiveness</p>
                  </div>
                </div>
                <p className="text-xs text-[#111827] font-medium leading-relaxed mt-2">
                  Partners may enter easily because their interests align, but exiting requires complex asset division when those interests diverge.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Memory Line */}
          <div className="bg-[#111827] text-white px-6 py-3.5 rounded-xl flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-[#38BDF8]">REMEMBER</span>
            <span className="text-sm sm:text-base font-black uppercase tracking-wide">
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
        <div className="p-8 sm:p-12 lg:p-14 flex flex-col justify-between h-full bg-[#111827] text-white">
          <div className="flex items-center justify-between border-b border-gray-800 pb-3">
            <span className="text-xs font-black uppercase tracking-widest text-[#38BDF8] bg-white/10 px-3 py-1 rounded-md">
              THE COMPLETE ARGUMENT
            </span>
            <span className="text-xs font-bold text-gray-400">09 / 10</span>
          </div>

          <div className="my-2">
            <h2 className="text-2xl sm:text-4xl font-black uppercase text-white">
              The Failure Chain of <span className="text-[#38BDF8]">Shared Control</span>
            </h2>
          </div>

          {/* Complete Argument Sequential Flow Chain */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-2 my-3">
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
                className={`p-3 rounded-xl border text-center flex flex-col justify-between h-full min-h-[90px] ${
                  index === 3 || index === 8
                    ? "bg-[#2563EB] border-[#2563EB] text-white shadow-md"
                    : "bg-gray-900 border-gray-800 text-gray-200"
                }`}
              >
                <span className="text-[9px] font-black text-gray-400 uppercase">0{index + 1}</span>
                <h5 className="text-xs font-black uppercase leading-tight mt-1">{step}</h5>
              </div>
            ))}
          </div>

          {/* Bottom Highlight: Core Problem */}
          <div className="bg-[#2563EB] p-6 rounded-2xl text-center space-y-2 shadow-xl border border-[#3B82F6]">
            <span className="text-xs font-black uppercase tracking-widest text-white/80">
              THE CORE PROBLEM
            </span>
            <h3 className="text-2xl sm:text-4xl font-black uppercase text-white leading-tight">
              Not simply shared risk. <br />
              <span className="text-amber-300">Shared control between independent interests.</span>
            </h3>
          </div>
        </div>
      );

    /* =========================================================================
       SLIDE 10 — BALANCED CONCLUSION
       ========================================================================= */
    case 10:
      return (
        <div className="p-8 sm:p-12 lg:p-14 flex flex-col justify-between h-full bg-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-widest text-[#2563EB] bg-[#E8EEF8] px-3 py-1 rounded-md">
              10 — BALANCED CONCLUSION
            </span>
            <span className="text-xs font-bold text-[#6B7280]">10 / 10</span>
          </div>

          <div className="my-2">
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-[#111827]">
              Joint ventures can <span className="text-[#2563EB]">create value.</span>
            </h2>
          </div>

          {/* Two Section Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch my-2">
            {/* 5 Benefits Box */}
            <div className="md:col-span-6 bg-[#F8F9FB] p-6 rounded-2xl border border-[#E5E7EB] space-y-3">
              <span className="text-xs font-black uppercase text-[#2563EB] tracking-wider">
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
                    className="bg-white p-3 rounded-xl border border-[#E5E7EB] flex items-center justify-between text-xs font-extrabold text-[#111827]"
                  >
                    <span>{benefit}</span>
                    <Check size={16} className="text-[#2563EB]" />
                  </div>
                ))}
              </div>
            </div>

            {/* But... Conditions Box */}
            <div className="md:col-span-6 bg-[#E8EEF8] p-6 rounded-2xl border border-[#D2E0F5] flex flex-col justify-between">
              <div>
                <span className="text-xs font-black uppercase text-[#111827] tracking-wider">
                  BUT... THESE BENEFITS DEPEND ON:
                </span>
                <div className="space-y-3 mt-4">
                  <div className="bg-white p-3.5 rounded-xl border border-[#D2E0F5] font-black text-xs sm:text-sm text-[#2563EB] text-center uppercase">
                    STRATEGIC ALIGNMENT
                  </div>
                  <div className="text-center font-black text-xs text-[#6B7280]">+</div>
                  <div className="bg-white p-3.5 rounded-xl border border-[#D2E0F5] font-black text-xs sm:text-sm text-[#2563EB] text-center uppercase">
                    CLEAR GOVERNANCE
                  </div>
                  <div className="text-center font-black text-xs text-[#6B7280]">+</div>
                  <div className="bg-white p-3.5 rounded-xl border border-[#D2E0F5] font-black text-xs sm:text-sm text-[#2563EB] text-center uppercase">
                    SHARED EXPECTATIONS
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Final Large Question */}
          <div className="bg-[#111827] text-white p-6 rounded-2xl text-center space-y-1 shadow-lg">
            <h3 className="text-xl sm:text-3xl font-black uppercase text-white leading-tight">
              When two companies own one business, <br />
              <span className="text-[#38BDF8]">who gets the final say?</span>
            </h3>
            <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 pt-1">
              THE HIDDEN COST OF SHARED CONTROL
            </p>
          </div>
        </div>
      );

    default:
      return null;
  }
}