"use client";

import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";

const footerLinks = {
  Product: [
    { name: "Capabilities", href: "#features" },
    { name: "How it works", href: "#how-it-works" },
    { name: "Pricing", href: "#pricing" },
    { name: "Integrations", href: "#integrations" },
  ],
  Developers: [
    { name: "Documentation", href: "#developers" },
    { name: "API Reference", href: "#developers" },
    { name: "SDKs", href: "#" },
    { name: "Status", href: "#" },
  ],
  Company: [
    { name: "About FilmU", href: "#" },
    { name: "About Fykko", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Careers", href: "/careers", badge: "Hiring" },
    { name: "Submit an Idea", href: "/ideas" },
    { name: "Design Competition", href: "/design-competition", badge: "New" },
    { name: "Contact", href: "#" },
  ],
  Legal: [
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
    { name: "Security", href: "#security" },
  ],
};

const socialLinks = [
  { name: "Twitter", href: "#" },
  { name: "GitHub", href: "#" },
  { name: "LinkedIn", href: "#" },
];

function AnimatedWaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      ctx.clearRect(0, 0, width, height);

      ctx.strokeStyle = "rgba(100, 200, 150, 0.3)";
      ctx.lineWidth = 1;

      for (let wave = 0; wave < 3; wave++) {
        ctx.beginPath();
        for (let x = 0; x <= width; x += 5) {
          const y =
            height * 0.5 +
            Math.sin(x * 0.01 + time + wave * 0.5) * 30 +
            Math.sin(x * 0.02 + time * 1.5 + wave) * 20;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      time += 0.02;
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}

export function FooterSection() {
  return (
    <footer className="relative bg-black">
      {/* Panoramic banner image */}
      <div className="relative w-full h-[340px] md:h-[420px] overflow-hidden">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Upscaled%20Image%20%2810%29-UnDKstODkIENp5xqTYUEpt0Sm8tNOw.png"
          alt="Bioluminescent landscape"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
      </div>

      {/* Footer content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Main Footer */}
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-12 lg:gap-8">
            {/* Brand Column */}
            <div className="col-span-2">
              <a href="#" className="inline-flex items-center gap-2 mb-6">
                <span className="text-2xl font-display text-white">Aevon</span>
                <span className="text-xs text-white/40 font-mono">by FilmU</span>
              </a>

              <p className="text-white/50 leading-relaxed mb-8 max-w-xs text-sm">
                India&apos;s own large language model — built by FilmU and Fykko. Sovereign AI for India and the world.
              </p>

              {/* Social Links */}
              <div className="flex gap-6">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-sm text-white/40 hover:text-white transition-colors flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                ))}
              </div>
            </div>

            {/* Link Columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="text-sm font-medium text-white mb-6">{title}</h3>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-sm text-white/40 hover:text-white transition-colors inline-flex items-center gap-2"
                      >
                        {link.name}
                        {"badge" in link && link.badge && (
                          <span className="text-xs px-2 py-0.5 bg-white text-black rounded-full">
                            {link.badge}
                          </span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Design Credits Section */}
        <div className="py-10 border-t border-white/10">
          <p className="text-xs font-mono text-white/20 uppercase tracking-widest mb-6">Design &amp; Creative Credits</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {/* Sanvi Sahu — lead / most credit */}
            <div className="col-span-2 md:col-span-2 bg-[#eca8d6]/5 border border-[#eca8d6]/15 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#eca8d6]" />
                <span className="text-xs font-mono text-[#eca8d6]">Lead Visual Artist</span>
              </div>
              <p className="text-base font-display text-white mb-1">Sanvi Sahu</p>
              <p className="text-xs text-white/40 leading-relaxed">
                Home page hero artwork, bioluminescent landscape illustration, brand visual identity &amp; all key UI artwork across the platform.
              </p>
            </div>

            {/* Riya Sharma */}
            <div className="bg-white/[0.03] border border-white/8 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#67e8f9]/60" />
                <span className="text-xs font-mono text-[#67e8f9]/70">UI Design</span>
              </div>
              <p className="text-sm font-display text-white mb-1">Riya Sharma</p>
              <p className="text-xs text-white/35 leading-relaxed">Component design system, layout architecture &amp; interactive UI patterns.</p>
            </div>

            {/* Anaya Kapoor */}
            <div className="bg-white/[0.03] border border-white/8 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#a78bfa]/60" />
                <span className="text-xs font-mono text-[#a78bfa]/70">Motion Design</span>
              </div>
              <p className="text-sm font-display text-white mb-1">Anaya Kapoor</p>
              <p className="text-xs text-white/35 leading-relaxed">Animations, micro-interactions &amp; motion language across all pages.</p>
            </div>

            {/* Pranav Sinha */}
            <div className="bg-white/[0.03] border border-white/8 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#fbbf24]/60" />
                <span className="text-xs font-mono text-[#fbbf24]/70">UX Research</span>
              </div>
              <p className="text-sm font-display text-white mb-1">Pranav Sinha</p>
              <p className="text-xs text-white/35 leading-relaxed">User experience research, information architecture &amp; accessibility.</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20 font-mono">
            &copy; 2026 FilmU &amp; Fykko. All rights reserved.
          </p>
          <div className="flex items-center gap-3 text-xs text-white/20 font-mono">
            <span className="w-2 h-2 rounded-full bg-[#eca8d6]" />
            India&apos;s own LLM — Coming Soon
          </div>
        </div>
      </div>
    </footer>
  );
}
