"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowUpRight, MapPin, Clock, Briefcase, ChevronDown, ChevronUp, Sparkles, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

// ── Particle canvas ───────────────────────────────────────────────────────────
function GridCanvas() {
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

    const draw = () => {
      const w = c.offsetWidth, h = c.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      const step = 60;
      for (let x = 0; x < w; x += step) {
        for (let y = 0; y < h; y += step) {
          const pulse = Math.sin(t + x * 0.02 + y * 0.015) * 0.5 + 0.5;
          const alpha = pulse * 0.07;
          ctx.fillStyle = `rgba(167,139,250,${alpha})`;
          ctx.beginPath();
          ctx.arc(x, y, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      t += 0.015;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(raf); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

// ── Data ──────────────────────────────────────────────────────────────────────
const departments = ["All", "Research", "Engineering", "Product", "Design", "Operations", "Growth"];

const openings = [
  {
    id: 1,
    title: "Research Scientist — LLM Pre-training",
    dept: "Research",
    location: "Bengaluru / Remote",
    type: "Full-time",
    level: "Senior",
    description:
      "Lead large-scale pre-training research for Aevon's frontier model. Work on data curation, architecture experiments, and training stability for multilingual Indian LLMs.",
    responsibilities: [
      "Design and run pre-training experiments at scale (10B–200B parameters)",
      "Build and curate multilingual datasets covering 22+ Indian languages",
      "Publish research at top-tier venues (NeurIPS, ICLR, ACL)",
      "Collaborate with infrastructure teams to optimize training throughput",
    ],
    requirements: [
      "PhD or equivalent research experience in ML/NLP",
      "Experience with large-scale distributed training (PyTorch, JAX)",
      "Strong publication record or equivalent industry work",
    ],
  },
  {
    id: 2,
    title: "Staff ML Engineer — Inference Optimization",
    dept: "Engineering",
    location: "Bengaluru / Hybrid",
    type: "Full-time",
    level: "Staff",
    description:
      "Own the inference stack that serves Aevon to millions. Optimize latency, throughput, and cost across GPU clusters with techniques like quantization, speculative decoding, and custom CUDA kernels.",
    responsibilities: [
      "Reduce P99 latency to <50ms for 70B-parameter models",
      "Build and maintain custom CUDA/Triton kernels",
      "Architect multi-tenant serving infrastructure on Indian cloud providers",
      "Work closely with the research team to deploy new model variants",
    ],
    requirements: [
      "5+ years experience in systems-level ML engineering",
      "Deep knowledge of GPU architecture, CUDA, and inference frameworks",
      "Experience with vLLM, TensorRT, or similar serving systems",
    ],
  },
  {
    id: 3,
    title: "Product Designer — AI Interfaces",
    dept: "Design",
    location: "Remote (India)",
    type: "Full-time",
    level: "Mid / Senior",
    description:
      "Design the products that make Aevon accessible to India's developers and consumers. Shape the design language across the API console, developer docs, and consumer-facing apps.",
    responsibilities: [
      "Own end-to-end design for Aevon's developer platform and API console",
      "Create a distinct Indian-rooted design language and component system",
      "Run user research with developers, students, and enterprise clients across India",
      "Collaborate with engineers to ship pixel-perfect experiences",
    ],
    requirements: [
      "4+ years of product/UX design experience",
      "Strong Figma skills and an eye for motion and detail",
      "Experience designing for developer tools or complex data products",
    ],
  },
  {
    id: 4,
    title: "Software Engineer — API Platform",
    dept: "Engineering",
    location: "Bengaluru / Remote",
    type: "Full-time",
    level: "Mid",
    description:
      "Build the API gateway, SDK, and developer experience layer that powers Aevon's external platform. Focus on reliability, observability, and DX.",
    responsibilities: [
      "Design and implement high-throughput REST and streaming APIs",
      "Build official SDKs for Python, TypeScript, and Go",
      "Own the developer dashboard, usage analytics, and billing integration",
      "Set up observability with distributed tracing and alerting",
    ],
    requirements: [
      "3+ years backend engineering experience",
      "Strong knowledge of Go, Rust, or Python at scale",
      "Experience building and operating production APIs",
    ],
  },
  {
    id: 5,
    title: "Head of Growth — Developer Ecosystem",
    dept: "Growth",
    location: "Bengaluru / Mumbai",
    type: "Full-time",
    level: "Lead",
    description:
      "Build Aevon's developer community from the ground up. Own developer relations, content, events, and partner integrations across India's startup and enterprise ecosystem.",
    responsibilities: [
      "Define and execute developer growth strategy",
      "Build relationships with India's top engineering colleges and dev communities",
      "Launch and grow the Aevon Ambassador program",
      "Work with product to shape the developer roadmap based on community feedback",
    ],
    requirements: [
      "5+ years in developer relations, growth, or community roles",
      "Technical background (engineering or equivalent)",
      "Existing network in India's startup / developer ecosystem",
    ],
  },
  {
    id: 6,
    title: "Operations Lead — AI Training Infrastructure",
    dept: "Operations",
    location: "Bengaluru",
    type: "Full-time",
    level: "Senior",
    description:
      "Keep Aevon's GPU clusters running at peak efficiency. Manage vendor relationships, procurement, and data-center operations for India's most ambitious AI training infrastructure.",
    responsibilities: [
      "Manage 1000+ GPU cluster operations across Indian data centres",
      "Lead procurement and vendor negotiations for compute and networking",
      "Build and maintain runbooks, on-call processes, and SLAs",
      "Drive cost optimisation without sacrificing availability",
    ],
    requirements: [
      "5+ years in infrastructure or cloud operations",
      "Experience managing GPU or HPC clusters",
      "Strong vendor management and procurement skills",
    ],
  },
];

const perks = [
  { icon: "🇮🇳", title: "Build India's AI", desc: "Work on a once-in-a-generation mission — India's own sovereign LLM." },
  { icon: "🔬", title: "Frontier Research", desc: "Access to compute, datasets, and research collaborators at the frontier." },
  { icon: "🏡", title: "Remote Friendly", desc: "Flexible work — remote, hybrid, or from our Bengaluru HQ." },
  { icon: "💰", title: "Competitive Comp", desc: "Top-of-market salaries, equity, and performance bonuses." },
  { icon: "📚", title: "Learning Budget", desc: "₹1L/year learning budget — conferences, courses, books, anything." },
  { icon: "🏥", title: "Full Coverage", desc: "Health insurance for you and your family, including parents." },
];

// ── Component ─────────────────────────────────────────────────────────────────
export function CareersPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeDept, setActiveDept] = useState("All");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [applyId, setApplyId] = useState<number | null>(null);
  const [applyForm, setApplyForm] = useState({ name: "", email: "", link: "", note: "" });
  const [appliedIds, setAppliedIds] = useState<number[]>([]);

  useEffect(() => { setTimeout(() => setIsVisible(true), 80); }, []);

  const filtered = activeDept === "All" ? openings : openings.filter((o) => o.dept === activeDept);

  const inputCls =
    "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#a78bfa]/60 transition-colors";

  const handleApply = (id: number) => {
    setAppliedIds((prev) => [...prev, id]);
    setApplyId(null);
    setApplyForm({ name: "", email: "", link: "", note: "" });
  };

  return (
    <main className="relative min-h-screen bg-black overflow-hidden">
      <GridCanvas />

      {/* Glow accent */}
      <div className="absolute top-0 right-0 w-[600px] h-[500px] bg-[#a78bfa]/5 blur-[140px] rounded-full pointer-events-none" />

      {/* ── Nav back ── */}
      <div className="relative z-10 px-6 lg:px-12 pt-8">
        <div className="max-w-[1200px] mx-auto">
          <a href="/" className="inline-flex items-center gap-2 text-xs font-mono text-white/40 hover:text-white/70 transition-colors">
            ← Aevon
          </a>
        </div>
      </div>

      {/* ── Hero ── */}
      <div
        className={`relative z-10 max-w-[1200px] mx-auto px-6 lg:px-12 pt-20 pb-24 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <span className="inline-flex items-center gap-3 text-xs font-mono text-[#a78bfa]/60 mb-6">
          <span className="w-6 h-px bg-[#a78bfa]/30" />
          We&apos;re Hiring
        </span>

        <h1 className="text-[clamp(3rem,6vw,7rem)] font-display leading-[0.9] tracking-tight text-white mb-8 max-w-3xl">
          Shape India&apos;s<br />
          <span className="text-[#a78bfa]">AI Future</span>
        </h1>

        <p className="text-white/50 text-sm leading-relaxed max-w-xl mb-12">
          Aevon is building India's own frontier AI model. We&apos;re a small, ambitious team working on one of the most important technology projects in India's history. Join us.
        </p>

        <div className="flex items-center gap-8">
          {[
            { v: `${openings.length}`, l: "Open Roles" },
            { v: "Bengaluru", l: "HQ" },
            { v: "Series A", l: "Stage" },
          ].map((s) => (
            <div key={s.l} className="flex flex-col gap-1">
              <span className="text-2xl font-display text-white">{s.v}</span>
              <span className="text-xs text-white/30 font-mono">{s.l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Perks ── */}
      <div
        className={`relative z-10 border-t border-white/5 transition-all duration-1000 delay-200 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-20">
          <h2 className="text-2xl font-display text-white mb-12">Why Aevon</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {perks.map((p) => (
              <div
                key={p.title}
                className="bg-white/[0.03] border border-white/8 rounded-xl p-5 hover:border-white/15 transition-all duration-300 group"
              >
                <span className="text-2xl mb-3 block">{p.icon}</span>
                <p className="text-sm font-medium text-white mb-2">{p.title}</p>
                <p className="text-xs text-white/35 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Open Roles ── */}
      <div className="relative z-10 border-t border-white/5">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <h2 className="text-2xl font-display text-white">Open Roles</h2>

            {/* Dept filter */}
            <div className="flex flex-wrap gap-2">
              {departments.map((d) => (
                <button
                  key={d}
                  onClick={() => setActiveDept(d)}
                  className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-200 ${
                    activeDept === d
                      ? "bg-[#a78bfa]/15 border border-[#a78bfa]/40 text-[#a78bfa]"
                      : "bg-white/5 border border-white/10 text-white/40 hover:border-white/20 hover:text-white/60"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {filtered.map((job) => {
              const isOpen = expandedId === job.id;
              const isApplying = applyId === job.id;
              const hasApplied = appliedIds.includes(job.id);

              return (
                <div
                  key={job.id}
                  className="bg-white/[0.03] border border-white/8 rounded-xl overflow-hidden hover:border-white/15 transition-all duration-300"
                >
                  {/* Row */}
                  <button
                    onClick={() => setExpandedId(isOpen ? null : job.id)}
                    className="w-full flex items-start md:items-center justify-between gap-4 p-6 text-left group"
                  >
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-xs px-2 py-0.5 bg-[#a78bfa]/10 border border-[#a78bfa]/20 text-[#a78bfa] rounded-full font-mono">
                          {job.dept}
                        </span>
                        <span className="text-xs px-2 py-0.5 bg-white/5 border border-white/10 text-white/40 rounded-full font-mono">
                          {job.level}
                        </span>
                      </div>
                      <h3 className="text-base text-white font-medium group-hover:text-[#a78bfa] transition-colors">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 mt-2">
                        <span className="flex items-center gap-1 text-xs text-white/30">
                          <MapPin className="w-3 h-3" /> {job.location}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-white/30">
                          <Clock className="w-3 h-3" /> {job.type}
                        </span>
                      </div>
                    </div>
                    <div className="flex-shrink-0 mt-1 text-white/30">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {/* Expanded */}
                  {isOpen && (
                    <div className="border-t border-white/8 px-6 pb-6">
                      <p className="text-sm text-white/50 leading-relaxed mt-5 mb-6">{job.description}</p>

                      <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div>
                          <h4 className="text-xs font-mono text-white/30 uppercase tracking-widest mb-4">Responsibilities</h4>
                          <ul className="space-y-2">
                            {job.responsibilities.map((r, i) => (
                              <li key={i} className="flex items-start gap-2 text-xs text-white/50">
                                <span className="w-1 h-1 rounded-full bg-[#a78bfa]/50 mt-1.5 flex-shrink-0" />
                                {r}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-xs font-mono text-white/30 uppercase tracking-widest mb-4">Requirements</h4>
                          <ul className="space-y-2">
                            {job.requirements.map((r, i) => (
                              <li key={i} className="flex items-start gap-2 text-xs text-white/50">
                                <span className="w-1 h-1 rounded-full bg-[#67e8f9]/50 mt-1.5 flex-shrink-0" />
                                {r}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Apply inline form */}
                      {!isApplying && !hasApplied && (
                        <Button
                          onClick={() => setApplyId(job.id)}
                          className="bg-[#a78bfa] hover:bg-[#a78bfa]/90 text-black font-mono text-xs h-9 px-5 rounded-lg"
                        >
                          Apply for this Role <ArrowUpRight className="w-3 h-3 ml-1" />
                        </Button>
                      )}

                      {hasApplied && (
                        <div className="flex items-center gap-2 text-xs text-[#a78bfa] font-mono">
                          <Sparkles className="w-3 h-3" /> Application submitted! We&apos;ll be in touch.
                        </div>
                      )}

                      {isApplying && (
                        <div className="border border-white/10 rounded-xl p-5 bg-white/[0.02] space-y-4">
                          <h4 className="text-xs font-mono text-white/40 uppercase tracking-widest">Quick Apply</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-xs text-white/30 mb-1.5 block font-mono">Name *</label>
                              <input
                                className={inputCls}
                                placeholder="Your full name"
                                value={applyForm.name}
                                onChange={(e) => setApplyForm((p) => ({ ...p, name: e.target.value }))}
                              />
                            </div>
                            <div>
                              <label className="text-xs text-white/30 mb-1.5 block font-mono">Email *</label>
                              <input
                                className={inputCls}
                                type="email"
                                placeholder="you@example.com"
                                value={applyForm.email}
                                onChange={(e) => setApplyForm((p) => ({ ...p, email: e.target.value }))}
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-xs text-white/30 mb-1.5 block font-mono">LinkedIn / Portfolio / GitHub</label>
                            <input
                              className={inputCls}
                              placeholder="https://"
                              value={applyForm.link}
                              onChange={(e) => setApplyForm((p) => ({ ...p, link: e.target.value }))}
                            />
                          </div>
                          <div>
                            <label className="text-xs text-white/30 mb-1.5 block font-mono">Why Aevon? (optional)</label>
                            <textarea
                              className={`${inputCls} resize-none h-20`}
                              placeholder="Tell us why you want to join..."
                              value={applyForm.note}
                              onChange={(e) => setApplyForm((p) => ({ ...p, note: e.target.value }))}
                            />
                          </div>
                          <div className="flex gap-3">
                            <Button
                              variant="outline"
                              onClick={() => setApplyId(null)}
                              className="border-white/10 text-white/40 hover:text-white hover:bg-white/5 font-mono text-xs h-9 px-4 rounded-lg"
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={() => handleApply(job.id)}
                              disabled={!applyForm.name || !applyForm.email}
                              className="bg-[#a78bfa] hover:bg-[#a78bfa]/90 text-black font-mono text-xs h-9 px-5 rounded-lg disabled:opacity-30"
                            >
                              Submit <Send className="w-3 h-3 ml-1" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* No match */}
          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-white/30 text-sm">No open roles in this department right now.</p>
              <button
                onClick={() => setActiveDept("All")}
                className="text-[#a78bfa] text-xs font-mono mt-3 hover:underline"
              >
                View all roles →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── CTA banner ── */}
      <div className="relative z-10 border-t border-white/5">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-20 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl font-display text-white mb-3">Don&apos;t see your role?</h3>
            <p className="text-white/40 text-sm max-w-md">
              We hire exceptional people over specific roles. Send your work and we&apos;ll reach out when something fits.
            </p>
          </div>
          <a
            href="mailto:careers@aevon.ai"
            className="flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white text-sm font-mono hover:bg-white/5 transition-all duration-200"
          >
            careers@aevon.ai <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 border-t border-white/5 py-8 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto space-y-4">
          {/* Credits row */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pb-4 border-b border-white/5">
            <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">Design Credits</span>
            <span className="flex items-center gap-1.5 text-[11px] font-mono"><span className="w-1.5 h-1.5 rounded-full bg-[#eca8d6]" /><span className="text-[#eca8d6]/80 font-semibold">Sanvi Sahu</span><span className="text-white/25"> — Lead Visual Artist &amp; Home Page Artwork</span></span>
            <span className="flex items-center gap-1.5 text-[11px] font-mono"><span className="w-1.5 h-1.5 rounded-full bg-[#67e8f9]/60" /><span className="text-[#67e8f9]/60">Riya Sharma</span><span className="text-white/20"> — UI Design System</span></span>
            <span className="flex items-center gap-1.5 text-[11px] font-mono"><span className="w-1.5 h-1.5 rounded-full bg-[#a78bfa]/60" /><span className="text-[#a78bfa]/60">Anaya Kapoor</span><span className="text-white/20"> — Motion Design</span></span>
            <span className="flex items-center gap-1.5 text-[11px] font-mono"><span className="w-1.5 h-1.5 rounded-full bg-[#fbbf24]/60" /><span className="text-[#fbbf24]/60">Pranav Sinha</span><span className="text-white/20"> — UX Research</span></span>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/20 font-mono">© 2026 FilmU & Fykko. Aevon — India's Own AI.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
