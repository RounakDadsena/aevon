"use client";

import { useState, useEffect, useRef } from "react";
import {
  Upload, CheckCircle2, Sparkles, Star, Palette,
  FileImage, X, Briefcase, Layers, Monitor, Clock, ArrowRight, Trophy
} from "lucide-react";
import { Button } from "@/components/ui/button";

// ── Flowing wave + ripple background (like footer but more alive) ─────────────
function WaveCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d")!;
    let raf: number;
    let t = 0;

    const resize = () => {
      c.width = c.offsetWidth * devicePixelRatio;
      c.height = c.offsetHeight * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const waves = [
      { amp: 38, freq: 0.008, speed: 0.018, y: 0.22, color: "rgba(236,168,214,", alpha: 0.13 },
      { amp: 28, freq: 0.012, speed: 0.025, y: 0.38, color: "rgba(167,139,250,", alpha: 0.10 },
      { amp: 44, freq: 0.006, speed: 0.013, y: 0.55, color: "rgba(103,232,249,", alpha: 0.08 },
      { amp: 22, freq: 0.015, speed: 0.030, y: 0.70, color: "rgba(236,168,214,", alpha: 0.07 },
      { amp: 50, freq: 0.004, speed: 0.009, y: 0.15, color: "rgba(167,139,250,", alpha: 0.06 },
      { amp: 18, freq: 0.020, speed: 0.035, y: 0.85, color: "rgba(103,232,249,", alpha: 0.05 },
    ];

    const ripples: { x: number; y: number; r: number; maxR: number; alpha: number }[] = [];
    const spawnRipple = () => {
      if (!c) return;
      if (ripples.length < 7) {
        ripples.push({
          x: Math.random() * c.offsetWidth,
          y: Math.random() * c.offsetHeight * 0.65,
          r: 0,
          maxR: 80 + Math.random() * 130,
          alpha: 0.20,
        });
      }
    };
    const rippleTimer = setInterval(spawnRipple, 1200);

    const draw = () => {
      const w = c.offsetWidth, h = c.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      waves.forEach((wave) => {
        ctx.beginPath();
        for (let x = 0; x <= w; x += 3) {
          const y =
            wave.y * h +
            Math.sin(x * wave.freq + t * wave.speed) * wave.amp +
            Math.sin(x * wave.freq * 1.7 + t * wave.speed * 0.6 + 1.2) * (wave.amp * 0.4);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = wave.color + wave.alpha + ")";
        ctx.lineWidth = 1.2;
        ctx.stroke();
      });

      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.r += 1.3;
        rp.alpha -= 0.0022;
        if (rp.alpha <= 0 || rp.r > rp.maxR) { ripples.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(236,168,214,${rp.alpha})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      for (let i = 0; i < 28; i++) {
        const px = (Math.sin(i * 3.1 + t * 0.008) * 0.45 + 0.5) * w;
        const py = (Math.cos(i * 2.3 + t * 0.006) * 0.45 + 0.5) * h;
        const a  = (Math.sin(t * 0.02 + i) * 0.5 + 0.5) * 0.28;
        ctx.beginPath();
        ctx.arc(px, py, 1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(236,168,214,${a})`;
        ctx.fill();
      }

      t += 1;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
      clearInterval(rippleTimer);
    };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none opacity-90" />;
}

// ── Data ──────────────────────────────────────────────────────────────────────
const rewards = [
  {
    icon: <Briefcase className="w-5 h-5" />,
    title: "Paid Internship",
    desc: "Selected students get a real internship at FilmU & Fykko — building Aevon with the core team.",
    color: "#eca8d6",
    tag: "Top picks",
  },
  {
    icon: <Layers className="w-5 h-5" />,
    title: "Your UI Ships in Aevon",
    desc: "Your design gets used in the actual product — live, with your name credited on the platform forever.",
    color: "#a78bfa",
    tag: "All finalists",
  },
  {
    icon: <Monitor className="w-5 h-5" />,
    title: "Full-time Role Offer",
    desc: "Outstanding performers may receive a full-time offer at Aevon with a competitive salary package.",
    color: "#67e8f9",
    tag: "Exceptional work",
  },
];

const categories = [
  { icon: "🎨", label: "UI / Visual Design",     desc: "Screens, components, brand visuals"   },
  { icon: "✨", label: "Motion & Animation",      desc: "Microinteractions, transitions, flows" },
  { icon: "🖼️", label: "Illustration & Artwork", desc: "Digital art, concept illustrations"   },
  { icon: "📐", label: "UX & Prototyping",        desc: "Wireframes, user flows, prototypes"   },
  { icon: "🌐", label: "Web / App Design",        desc: "Full product design concepts"         },
  { icon: "💡", label: "Theme Concept",           desc: "Visual language, mood, direction"     },
];

const timeline = [
  { date: "May 1",   event: "Submissions Open"  },
  { date: "May 31",  event: "Deadline"          },
  { date: "June 10", event: "Shortlist"         },
  { date: "June 20", event: "Winners Announced" },
];

const featuredSubmitters = [
  {
    name: "Sanvi Sahu",
    dept: "Illustration & Artwork",
    note: "Created the bioluminescent hero artwork that now lives on the Aevon home page. Her theme concept defined the entire visual identity of the platform.",
    color: "#eca8d6",
    featured: true,
    outcome: "UI Featured + Internship Offer",
  },
  {
    name: "Riya Sharma",
    dept: "UI / Visual Design",
    note: "Submitted a complete component design system and layout architecture that was integrated directly into the Aevon platform.",
    color: "#67e8f9",
    featured: false,
    outcome: "UI Featured in Product",
  },
  {
    name: "Anaya Kapoor",
    dept: "Motion & Animation",
    note: "Her motion language and micro-interaction concepts shaped how Aevon feels to use — animations now shipped across all pages.",
    color: "#a78bfa",
    featured: false,
    outcome: "UI Featured in Product",
  },
  {
    name: "Pranav Sinha",
    dept: "UX & Prototyping",
    note: "Submitted detailed UX flows and research that directly informed the information architecture of Aevon's onboarding and API console.",
    color: "#fbbf24",
    featured: false,
    outcome: "UI Featured in Product",
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────
export function DesignCompetitionPage() {
  const [isVisible, setIsVisible]       = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [submitted, setSubmitted]       = useState(false);
  const [designFile, setDesignFile]     = useState<File | null>(null);
  const [previewUrl, setPreviewUrl]     = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    name: "", college: "", year: "", email: "",
    title: "", description: "", link: "",
  });

  useEffect(() => { setTimeout(() => setIsVisible(true), 80); }, []);

  const set = (k: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(p => ({ ...p, [k]: e.target.value }));

  const handleFile = (f: File) => {
    setDesignFile(f);
    if (f.type.startsWith("image/")) setPreviewUrl(URL.createObjectURL(f));
    else setPreviewUrl(null);
  };

  const inputCls = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#eca8d6]/50 transition-colors";

  // ── Success ──
  if (submitted) {
    return (
      <main className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden px-6">
        <WaveCanvas />
        <div className="relative z-10 text-center max-w-sm w-full">
          <div className="w-20 h-20 rounded-full bg-[#eca8d6]/10 border border-[#eca8d6]/30 flex items-center justify-center mx-auto mb-8">
            <Star className="w-9 h-9 text-[#eca8d6]" />
          </div>
          <h2 className="text-4xl font-display text-white mb-4">Design Received!</h2>
          <p className="text-white/45 text-sm leading-relaxed mb-2">
            Your submission is in. If selected, your design may ship inside{" "}
            <span className="text-[#eca8d6]">Aevon</span> — with your name credited on the live platform.
          </p>
          <p className="text-white/25 text-xs font-mono mb-10">Results announced June 20, 2026</p>
          <a href="/" className="text-xs text-white/30 hover:text-white/60 transition-colors font-mono">
            ← Back to Aevon
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="relative bg-black overflow-x-hidden">
      <WaveCanvas />

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section
        className={`relative z-10 min-h-[90vh] flex flex-col justify-center px-5 sm:px-8 lg:px-16 pt-24 pb-16 max-w-[1200px] mx-auto transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <a href="/" className="text-[11px] font-mono text-white/30 hover:text-white/60 transition-colors mb-12 inline-block">
          ← Aevon
        </a>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#eca8d6]/10 border border-[#eca8d6]/20 mb-7 self-start">
          <Palette className="w-3 h-3 text-[#eca8d6]" />
          <span className="text-[11px] font-mono text-[#eca8d6]">Student Design Competition · 2026</span>
        </div>

        <h1 className="text-[clamp(2.6rem,8vw,7rem)] font-display leading-[0.88] tracking-tight text-white mb-6 max-w-3xl">
          Design the<br />
          <span style={{
            background: "linear-gradient(120deg,#eca8d6 0%,#a78bfa 50%,#67e8f9 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            Face of India&apos;s AI
          </span>
        </h1>

        <p className="text-white/45 text-sm sm:text-base leading-relaxed max-w-lg mb-10">
          Submit your design. The best work ships <em>inside</em> Aevon — with your name on it. No cash prizes. Real opportunity.
        </p>

        <div className="flex flex-wrap gap-6 sm:gap-10">
          {[
            { icon: <Trophy className="w-4 h-4 text-[#eca8d6]" />, v: "UI in Product", l: "Top designs ship live" },
            { icon: <Briefcase className="w-4 h-4 text-[#a78bfa]" />, v: "Internship",  l: "At FilmU & Fykko"    },
            { icon: <Clock className="w-4 h-4 text-[#67e8f9]" />,    v: "May 31",       l: "Deadline"            },
          ].map(s => (
            <div key={s.l} className="flex items-center gap-2.5">
              {s.icon}
              <div>
                <p className="text-base font-display text-white leading-none">{s.v}</p>
                <p className="text-[11px] text-white/30 font-mono mt-0.5">{s.l}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHAT YOU GET ──────────────────────────────────────── */}
      <section className="relative z-10 border-t border-white/5 px-5 sm:px-8 lg:px-16 py-16">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-[10px] font-mono text-white/25 uppercase tracking-widest mb-2">What you get</p>
          <h2 className="text-2xl sm:text-3xl font-display text-white mb-8">No cash. Real career.</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {rewards.map((r) => (
              <div
                key={r.title}
                className="relative p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/8 overflow-hidden group hover:border-white/15 transition-all duration-300"
              >
                <div
                  className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl opacity-10 group-hover:opacity-20 transition-opacity"
                  style={{ background: r.color }}
                />
                <div className="flex items-center justify-between mb-4">
                  <div style={{ color: r.color }}>{r.icon}</div>
                  <span
                    className="text-[10px] font-mono px-2 py-0.5 rounded-full border"
                    style={{ color: r.color, borderColor: r.color + "40" }}
                  >
                    {r.tag}
                  </span>
                </div>
                <h3 className="text-base font-display text-white mb-2">{r.title}</h3>
                <p className="text-xs text-white/40 leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED SUBMISSIONS ──────────────────────────────── */}
      <section className="relative z-10 border-t border-white/5 px-5 sm:px-8 lg:px-16 py-16">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-[10px] font-mono text-white/25 uppercase tracking-widest mb-2">Past submissions</p>
          <h2 className="text-2xl sm:text-3xl font-display text-white mb-2">Designs that made it in</h2>
          <p className="text-white/35 text-sm mb-8 max-w-lg">
            These students submitted their work — and their designs now live inside Aevon.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {featuredSubmitters.map((s) => (
              <div
                key={s.name}
                className={`relative p-5 sm:p-6 rounded-2xl border transition-all duration-300 overflow-hidden ${
                  s.featured
                    ? "bg-[#eca8d6]/5 border-[#eca8d6]/25"
                    : "bg-white/[0.02] border-white/8 hover:border-white/15"
                }`}
              >
                {s.featured && (
                  <div className="absolute top-4 right-4 flex items-center gap-1 text-[10px] font-mono text-[#eca8d6]">
                    <Star className="w-3 h-3 fill-[#eca8d6]" /> Featured
                  </div>
                )}
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: s.color }} />
                  <div>
                    <p className={`font-display ${s.featured ? "text-lg text-white" : "text-base text-white"}`}>
                      {s.name}
                    </p>
                    <p className="text-[10px] font-mono mt-0.5" style={{ color: s.color + "bb" }}>{s.dept}</p>
                  </div>
                </div>
                <p className="text-xs text-white/40 leading-relaxed mb-4">{s.note}</p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                  <CheckCircle2 className="w-3 h-3" style={{ color: s.color }} />
                  <span className="text-[10px] font-mono text-white/50">{s.outcome}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ────────────────────────────────────────────── */}
      <section className="relative z-10 border-t border-white/5 px-5 sm:px-8 lg:px-16 py-14">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-xl font-display text-white mb-8">Timeline</h2>
          <div className="flex flex-col sm:flex-row gap-0 relative">
            <div className="hidden sm:block absolute top-[18px] left-0 right-0 h-px bg-white/8 z-0" />
            {timeline.map((item, i) => (
              <div key={i} className="relative flex-1 flex sm:flex-col gap-4 sm:gap-2 sm:items-center pl-7 sm:pl-0 pb-7 sm:pb-0">
                {i < timeline.length - 1 && (
                  <div className="sm:hidden absolute left-[5px] top-4 bottom-0 w-px bg-white/8" />
                )}
                <div
                  className="relative z-10 w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1 sm:mt-0"
                  style={{ background: i === 0 ? "#eca8d6" : "rgba(255,255,255,0.18)" }}
                />
                <div className="sm:text-center">
                  <p className="text-xs font-mono text-[#eca8d6]/70">{item.date}</p>
                  <p className="text-sm text-white/55 mt-0.5">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ──────────────────────────────────────────── */}
      <section className="relative z-10 border-t border-white/5 px-5 sm:px-8 lg:px-16 py-14">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-xl font-display text-white mb-6">What can you submit?</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {categories.map((cat) => (
              <button
                key={cat.label}
                onClick={() => setSelectedCategory(cat.label)}
                className={`text-left p-4 rounded-xl border transition-all duration-200 ${
                  selectedCategory === cat.label
                    ? "bg-[#eca8d6]/10 border-[#eca8d6]/35"
                    : "bg-white/[0.02] border-white/8 hover:border-white/15"
                }`}
              >
                <span className="text-xl mb-2 block">{cat.icon}</span>
                <p className={`text-sm font-medium mb-1 ${selectedCategory === cat.label ? "text-[#eca8d6]" : "text-white"}`}>
                  {cat.label}
                </p>
                <p className="text-[11px] text-white/30">{cat.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── SUBMISSION FORM ─────────────────────────────────────── */}
      <section className="relative z-10 border-t border-white/5 px-5 sm:px-8 lg:px-16 py-16">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-start">

            {/* Left */}
            <div>
              <p className="text-[10px] font-mono text-white/25 uppercase tracking-widest mb-3">Open now</p>
              <h2 className="text-3xl sm:text-4xl font-display text-white mb-4 leading-tight">
                Submit Your<br />Design
              </h2>
              <p className="text-white/40 text-sm leading-relaxed mb-8">
                Open to all students across India — undergrad, postgrad, diploma. Any design tool. Your work, your vision.
              </p>

              {/* Theme card */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#eca8d6]/8 to-[#a78bfa]/5 border border-[#eca8d6]/15 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#eca8d6]" />
                  <span className="text-[11px] font-mono text-[#eca8d6]">Competition theme</span>
                </div>
                <p className="text-sm text-white font-display mb-2 leading-snug">
                  &ldquo;Bioluminescent India — AI that breathes with the land&rdquo;
                </p>
                <p className="text-xs text-white/35 leading-relaxed">
                  Imagine India&apos;s AI as something alive — glowing, warm, rooted. Draw from natural landscapes, culture, and colour. Make it feel unmistakably Indian.
                </p>
              </div>

              <div className="hidden lg:flex items-center gap-2 text-xs text-white/20 font-mono mt-8">
                Fill the form <ArrowRight className="w-3 h-3" /> submit your design
              </div>
            </div>

            {/* Right: Form */}
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 sm:p-7">
              <h3 className="text-[10px] font-mono text-white/25 uppercase tracking-widest mb-5">Your Submission</h3>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-mono text-white/30 mb-1.5 block">Full Name *</label>
                    <input className={inputCls} placeholder="Your name" value={form.name} onChange={set("name")} />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-white/30 mb-1.5 block">Email *</label>
                    <input className={inputCls} type="email" placeholder="you@college.edu" value={form.email} onChange={set("email")} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-mono text-white/30 mb-1.5 block">College / Institute *</label>
                    <input className={inputCls} placeholder="e.g. NID Ahmedabad" value={form.college} onChange={set("college")} />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-white/30 mb-1.5 block">Year of Study</label>
                    <select className={inputCls} value={form.year} onChange={set("year")}>
                      <option value="" className="bg-black">Select year</option>
                      {["class 11/12","1st Year","2nd Year","3rd Year","4th Year","PG / Masters","PhD"].map(y => (
                        <option key={y} value={y} className="bg-black">{y}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono text-white/30 mb-1.5 block">Design Title *</label>
                  <input className={inputCls} placeholder="Name your piece" value={form.title} onChange={set("title")} />
                </div>

                <div>
                  <label className="text-[10px] font-mono text-white/30 mb-1.5 block">Category</label>
                  <select className={inputCls} value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
                    <option value="" className="bg-black">Pick a category</option>
                    {categories.map(cat => (
                      <option key={cat.label} value={cat.label} className="bg-black">{cat.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-mono text-white/30 mb-1.5 block">About Your Design *</label>
                  <textarea
                    className={`${inputCls} resize-none h-24`}
                    placeholder="Tell us the story — what inspired it, how it connects to the theme..."
                    value={form.description}
                    onChange={set("description")}
                  />
                </div>

                {/* File Upload */}
                <div>
                  <label className="text-[10px] font-mono text-white/30 mb-1.5 block">Upload Design File *</label>
                  <div
                    onClick={() => fileRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 overflow-hidden ${
                      designFile
                        ? "border-[#eca8d6]/40 bg-[#eca8d6]/5"
                        : "border-white/10 hover:border-[#eca8d6]/25 bg-white/[0.02]"
                    }`}
                  >
                    {previewUrl ? (
                      <div className="relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={previewUrl} alt="Preview" className="w-full h-36 object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button
                            className="text-xs text-white flex items-center gap-1"
                            onClick={e => { e.stopPropagation(); setDesignFile(null); setPreviewUrl(null); }}
                          >
                            <X className="w-3 h-3" /> Remove
                          </button>
                        </div>
                        <div className="px-3 py-2 flex items-center gap-2">
                          <FileImage className="w-3 h-3 text-[#eca8d6]" />
                          <span className="text-xs text-white/50 truncate">{designFile?.name}</span>
                        </div>
                      </div>
                    ) : designFile ? (
                      <div className="p-5 flex flex-col items-center gap-2">
                        <CheckCircle2 className="w-7 h-7 text-[#eca8d6]" />
                        <span className="text-sm text-white text-center break-all">{designFile.name}</span>
                        <button
                          className="text-xs text-white/30 flex items-center gap-1"
                          onClick={e => { e.stopPropagation(); setDesignFile(null); }}
                        >
                          <X className="w-3 h-3" /> Remove
                        </button>
                      </div>
                    ) : (
                      <div className="p-7 flex flex-col items-center gap-2">
                        <Upload className="w-7 h-7 text-white/15" />
                        <p className="text-sm text-white/30 text-center">Tap to upload your design</p>
                        <p className="text-xs text-white/15 text-center">PNG · JPG · PDF · SVG · AI · PSD — up to 50MB</p>
                      </div>
                    )}
                  </div>
                  <input
                    ref={fileRef}
                    type="file"
                    accept=".png,.jpg,.jpeg,.pdf,.svg,.fig,.ai,.psd"
                    className="hidden"
                    onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono text-white/30 mb-1.5 block">Portfolio / Figma / Behance (optional)</label>
                  <input className={inputCls} placeholder="https://" value={form.link} onChange={set("link")} />
                </div>

                <p className="text-[10px] text-white/20 leading-relaxed">
                  By submitting you confirm this is your original work. Your IP stays yours. Aevon will credit you visibly if your work ships.
                </p>

                <Button
                  onClick={() => setSubmitted(true)}
                  disabled={!form.name || !form.email || !form.college || !form.title || !form.description || !designFile}
                  className="w-full h-12 rounded-xl font-mono text-xs text-black disabled:opacity-20 transition-opacity"
                  style={{ background: "linear-gradient(120deg,#eca8d6,#a78bfa)" }}
                >
                  Submit My Design <Sparkles className="w-3.5 h-3.5 ml-1.5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────── */}
      <footer className="relative z-10 border-t border-white/5 px-5 sm:px-8 lg:px-16 py-8">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] text-white/20 font-mono">© 2026 FilmU &amp; Fykko · Aevon Design Competition</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {[
              { name: "Sanvi Sahu",   color: "#eca8d6", role: "Theme & Visual Direction" },
              { name: "Riya Sharma",  color: "#67e8f9", role: "UI Design"                },
              { name: "Anaya Kapoor", color: "#a78bfa", role: "Motion"                   },
              { name: "Pranav Sinha", color: "#fbbf24", role: "UX"                        },
            ].map(p => (
              <span key={p.name} className="flex items-center gap-1.5 text-[10px] font-mono text-white/25">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: p.color }} />
                <span style={{ color: p.color + "bb" }}>{p.name}</span>
                <span>· {p.role}</span>
              </span>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
