"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowUpRight, Upload, Sparkles, CheckCircle2, ChevronRight, X, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

// ── Animated background canvas ────────────────────────────────────────────────
function NeuralCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d")!;
    let raf: number;
    let t = 0;

    const nodes: { x: number; y: number; vx: number; vy: number }[] = [];

    const resize = () => {
      c.width = c.offsetWidth * devicePixelRatio;
      c.height = c.offsetHeight * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
      nodes.length = 0;
      const n = Math.floor((c.offsetWidth * c.offsetHeight) / 18000);
      for (let i = 0; i < n; i++) {
        nodes.push({
          x: Math.random() * c.offsetWidth,
          y: Math.random() * c.offsetHeight,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
        });
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const w = c.offsetWidth, h = c.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      nodes.forEach((n) => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            const alpha = (1 - dist / 140) * 0.18;
            ctx.strokeStyle = `rgba(236,168,214,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
        ctx.beginPath();
        ctx.arc(nodes[i].x, nodes[i].y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(236,168,214,0.35)";
        ctx.fill();
      }

      t += 0.01;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(raf); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

// ── Categories ─────────────────────────────────────────────────────────────────
const categories = [
  "Language & NLP",
  "Multimodal AI",
  "Healthcare / MedTech",
  "Education & EdTech",
  "Agriculture",
  "Governance & Civic Tech",
  "Finance & FinTech",
  "Creative Tools",
  "Infrastructure",
  "Other",
];

const stages = [
  { id: "concept", label: "Concept" },
  { id: "prototype", label: "Prototype" },
  { id: "mvp", label: "MVP" },
  { id: "live", label: "Live Product" },
];

// ── Main Page ──────────────────────────────────────────────────────────────────
export function IdeaSubmissionPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const [form, setForm] = useState({
    title: "",
    category: "",
    stage: "",
    description: "",
    problem: "",
    solution: "",
    impact: "",
    name: "",
    email: "",
    org: "",
    link: "",
  });

  const [designFile, setDesignFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 80);
  }, []);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [k]: e.target.value }));

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const inputCls =
    "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#eca8d6]/60 transition-colors";

  if (submitted) {
    return (
      <main className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden">
        <NeuralCanvas />
        <div className="relative z-10 text-center max-w-lg px-6">
          <div className="w-16 h-16 rounded-full bg-[#eca8d6]/10 border border-[#eca8d6]/30 flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-8 h-8 text-[#eca8d6]" />
          </div>
          <h2 className="text-4xl font-display text-white mb-4">Idea Received</h2>
          <p className="text-white/50 text-sm leading-relaxed mb-10">
            Thank you for submitting your idea to Aevon. Our team will review it and get back to you within 7 business days.
          </p>
          <a href="/" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors">
            ← Back to home
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-black overflow-hidden">
      <NeuralCanvas />

      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#eca8d6]/5 blur-[120px] rounded-full pointer-events-none" />

      {/* ── Hero area ── */}
      <div
        className={`relative z-10 max-w-[1200px] mx-auto px-6 lg:px-12 pt-32 pb-16 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <a href="/" className="inline-flex items-center gap-2 text-xs font-mono text-white/40 hover:text-white/70 transition-colors mb-12">
          ← Aevon
        </a>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Copy */}
          <div>
            <span className="inline-flex items-center gap-3 text-xs font-mono text-[#eca8d6]/60 mb-6">
              <span className="w-6 h-px bg-[#eca8d6]/30" />
              Open Submissions
            </span>

            <h1 className="text-[clamp(2.5rem,5vw,5rem)] font-display leading-[0.92] tracking-tight text-white mb-8">
              Submit Your<br />
              <span className="text-[#eca8d6]">Idea</span>
            </h1>

            <p className="text-white/50 leading-relaxed mb-10 text-sm max-w-md">
              Have a vision for how AI can transform India? Share your idea with the Aevon team. We fund, build, and launch the best submissions.
            </p>

            {/* Steps indicator */}
            <div className="flex items-center gap-3 mb-4">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono transition-all duration-500 ${
                      step === s
                        ? "bg-[#eca8d6] text-black"
                        : step > s
                        ? "bg-white/20 text-white/60"
                        : "bg-white/5 text-white/20 border border-white/10"
                    }`}
                  >
                    {step > s ? "✓" : s}
                  </div>
                  {s < 3 && <div className={`w-10 h-px transition-all duration-500 ${step > s ? "bg-[#eca8d6]/40" : "bg-white/10"}`} />}
                </div>
              ))}
            </div>
            <p className="text-xs text-white/30 font-mono">
              Step {step} of 3 — {step === 1 ? "Your Idea" : step === 2 ? "Design Submission" : "About You"}
            </p>

            {/* Credit note below steps */}
            {step === 2 && (
              <div className="mt-6 space-y-3 max-w-sm">
                {/* Sanvi Sahu — Lead */}
                <div className="p-4 rounded-xl bg-[#eca8d6]/8 border border-[#eca8d6]/20">
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#eca8d6] mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-[#eca8d6] font-mono mb-0.5">Lead Visual Artist · Home Page Artwork</p>
                      <p className="text-sm text-white font-display">Sanvi Sahu</p>
                      <p className="text-[11px] text-white/40 leading-relaxed mt-1">
                        Created the stunning bioluminescent home page hero artwork, brand illustrations &amp; the core visual identity of Aevon.
                      </p>
                    </div>
                  </div>
                </div>
                {/* Riya */}
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/8">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#67e8f9]/60 flex-shrink-0" />
                    <div>
                      <p className="text-[10px] text-[#67e8f9]/70 font-mono">UI Design System</p>
                      <p className="text-xs text-white">Riya Sharma</p>
                    </div>
                  </div>
                </div>
                {/* Anaya */}
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/8">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#a78bfa]/60 flex-shrink-0" />
                    <div>
                      <p className="text-[10px] text-[#a78bfa]/70 font-mono">Motion &amp; Animation Design</p>
                      <p className="text-xs text-white">Anaya Kapoor</p>
                    </div>
                  </div>
                </div>
                {/* Arjun */}
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/8">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#fbbf24]/60 flex-shrink-0" />
                    <div>
                      <p className="text-[10px] text-[#fbbf24]/70 font-mono">UX Research &amp; Architecture</p>
                      <p className="text-xs text-white">Pranav Sinha</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right: Form */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
            {/* ── Step 1: Idea Details ── */}
            {step === 1 && (
              <div className="space-y-5">
                <h3 className="text-sm font-mono text-white/40 mb-6 uppercase tracking-widest">Idea Details</h3>

                <div>
                  <label className="text-xs text-white/40 mb-2 block font-mono">Idea Title *</label>
                  <input
                    className={inputCls}
                    placeholder="e.g. Regional Language AI Tutor"
                    value={form.title}
                    onChange={set("title")}
                  />
                </div>

                <div>
                  <label className="text-xs text-white/40 mb-2 block font-mono">Category *</label>
                  <select className={inputCls} value={form.category} onChange={set("category")}>
                    <option value="" className="bg-black">Select a category</option>
                    {categories.map((c) => (
                      <option key={c} value={c} className="bg-black">{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs text-white/40 mb-2 block font-mono">Current Stage</label>
                  <div className="grid grid-cols-2 gap-2">
                    {stages.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setForm((p) => ({ ...p, stage: s.id }))}
                        className={`px-4 py-2.5 rounded-lg text-xs font-mono transition-all duration-200 text-left ${
                          form.stage === s.id
                            ? "bg-[#eca8d6]/15 border border-[#eca8d6]/40 text-[#eca8d6]"
                            : "bg-white/5 border border-white/10 text-white/40 hover:border-white/20"
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs text-white/40 mb-2 block font-mono">Brief Description *</label>
                  <textarea
                    className={`${inputCls} resize-none h-28`}
                    placeholder="Describe your idea in 2-3 sentences..."
                    value={form.description}
                    onChange={set("description")}
                  />
                </div>

                <div>
                  <label className="text-xs text-white/40 mb-2 block font-mono">Problem it Solves</label>
                  <textarea
                    className={`${inputCls} resize-none h-24`}
                    placeholder="What problem does this idea address?"
                    value={form.problem}
                    onChange={set("problem")}
                  />
                </div>

                <Button
                  onClick={() => setStep(2)}
                  disabled={!form.title || !form.category || !form.description}
                  className="w-full bg-[#eca8d6] hover:bg-[#eca8d6]/90 text-black font-mono text-xs h-11 rounded-lg mt-2 disabled:opacity-30"
                >
                  Continue <ChevronRight className="w-3 h-3 ml-1" />
                </Button>
              </div>
            )}

            {/* ── Step 2: Design Submission ── */}
            {step === 2 && (
              <div className="space-y-5">
                <h3 className="text-sm font-mono text-white/40 mb-6 uppercase tracking-widest">Design Submission</h3>

                {/* Artwork credits */}
                <div className="rounded-xl overflow-hidden border border-[#eca8d6]/20 bg-gradient-to-br from-[#eca8d6]/10 to-transparent p-5 mb-2 space-y-4">
                  <div className="flex items-center gap-2 mb-1">
                    <ImageIcon className="w-4 h-4 text-[#eca8d6]" />
                    <span className="text-sm text-white font-display">Creative Team Credits</span>
                  </div>

                  {/* Sanvi — lead */}
                  <div className="flex items-start gap-3 pb-3 border-b border-white/8">
                    <span className="w-2 h-2 rounded-full bg-[#eca8d6] mt-1.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-mono text-[#eca8d6]">Lead Visual Artist · Home Page Hero &amp; Brand Artwork</p>
                      <p className="text-sm text-white font-semibold">Sanvi Sahu</p>
                      <p className="text-[11px] text-white/40 mt-0.5 leading-relaxed">
                        Bioluminescent landscape, hero illustrations &amp; overall visual identity of Aevon.
                      </p>
                    </div>
                  </div>

                  {/* Others */}
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <p className="text-[10px] font-mono text-[#67e8f9]/70 mb-0.5">UI Design System</p>
                      <p className="text-xs text-white">Riya Sharma</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-[#a78bfa]/70 mb-0.5">Motion Design</p>
                      <p className="text-xs text-white">Anaya Kapoor</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-[#fbbf24]/70 mb-0.5">UX Research</p>
                      <p className="text-xs text-white">Pranav Sinha</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-white/40 mb-2 block font-mono">Upload Your Design / Mockup</label>
                  <div
                    onClick={() => fileRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-200 ${
                      designFile
                        ? "border-[#eca8d6]/40 bg-[#eca8d6]/5"
                        : "border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.04]"
                    }`}
                  >
                    {designFile ? (
                      <>
                        <CheckCircle2 className="w-8 h-8 text-[#eca8d6]" />
                        <span className="text-sm text-white">{designFile.name}</span>
                        <button
                          className="text-xs text-white/30 hover:text-white/60 flex items-center gap-1"
                          onClick={(e) => { e.stopPropagation(); setDesignFile(null); }}
                        >
                          <X className="w-3 h-3" /> Remove
                        </button>
                      </>
                    ) : (
                      <>
                        <Upload className="w-8 h-8 text-white/20" />
                        <span className="text-sm text-white/40 text-center">
                          Drop your design file here<br />
                          <span className="text-xs text-white/20">PNG, JPG, PDF, Figma export — up to 20MB</span>
                        </span>
                      </>
                    )}
                  </div>
                  <input
                    ref={fileRef}
                    type="file"
                    accept=".png,.jpg,.jpeg,.pdf,.svg,.fig"
                    className="hidden"
                    onChange={(e) => setDesignFile(e.target.files?.[0] ?? null)}
                  />
                </div>

                <div>
                  <label className="text-xs text-white/40 mb-2 block font-mono">Design Description</label>
                  <textarea
                    className={`${inputCls} resize-none h-24`}
                    placeholder="Describe the design or visuals you've created for this idea..."
                    value={form.solution}
                    onChange={set("solution")}
                  />
                </div>

                <div>
                  <label className="text-xs text-white/40 mb-2 block font-mono">External Link (optional)</label>
                  <input
                    className={inputCls}
                    placeholder="Figma, GitHub, Behance, etc."
                    value={form.link}
                    onChange={set("link")}
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1 border-white/10 text-white/50 hover:text-white hover:bg-white/5 font-mono text-xs h-11 rounded-lg"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={() => setStep(3)}
                    className="flex-1 bg-[#eca8d6] hover:bg-[#eca8d6]/90 text-black font-mono text-xs h-11 rounded-lg"
                  >
                    Continue <ChevronRight className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              </div>
            )}

            {/* ── Step 3: About You ── */}
            {step === 3 && (
              <div className="space-y-5">
                <h3 className="text-sm font-mono text-white/40 mb-6 uppercase tracking-widest">About You</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-white/40 mb-2 block font-mono">Full Name *</label>
                    <input className={inputCls} placeholder="Your name" value={form.name} onChange={set("name")} />
                  </div>
                  <div>
                    <label className="text-xs text-white/40 mb-2 block font-mono">Email *</label>
                    <input className={inputCls} type="email" placeholder="you@example.com" value={form.email} onChange={set("email")} />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-white/40 mb-2 block font-mono">Organization / College (optional)</label>
                  <input className={inputCls} placeholder="IIT Delhi, Startup name, etc." value={form.org} onChange={set("org")} />
                </div>

                <div>
                  <label className="text-xs text-white/40 mb-2 block font-mono">Expected Impact</label>
                  <textarea
                    className={`${inputCls} resize-none h-24`}
                    placeholder="Who benefits and how much?"
                    value={form.impact}
                    onChange={set("impact")}
                  />
                </div>

                {/* Fine print */}
                <p className="text-[11px] text-white/20 leading-relaxed">
                  By submitting, you agree that Aevon may review your idea. Intellectual property remains yours. We may reach out for collaboration.
                </p>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setStep(2)}
                    className="flex-1 border-white/10 text-white/50 hover:text-white hover:bg-white/5 font-mono text-xs h-11 rounded-lg"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={!form.name || !form.email}
                    className="flex-1 bg-[#eca8d6] hover:bg-[#eca8d6]/90 text-black font-mono text-xs h-11 rounded-lg disabled:opacity-30"
                  >
                    Submit Idea <Sparkles className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom banner */}
      <div className="relative z-10 border-t border-white/5 py-10 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-white/20 font-mono">© 2026 FilmU & Fykko. Aevon — India's Own AI.</p>
          <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono text-white/25">
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#eca8d6]" /><span className="text-[#eca8d6]/70">Sanvi Sahu</span> — Lead Visual Artist</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#67e8f9]/60" /><span className="text-[#67e8f9]/60">Riya Sharma</span> — UI Design</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#a78bfa]/60" /><span className="text-[#a78bfa]/60">Anaya Kapoor</span> — Motion</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#fbbf24]/60" /><span className="text-[#fbbf24]/60">Pranav Sinha</span> — UX Research</span>
          </div>
        </div>
      </div>
    </main>
  );
}
