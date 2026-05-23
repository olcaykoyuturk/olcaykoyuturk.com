// === Shared chrome: cursor, background fx, hooks ===
// Loaded BEFORE app.jsx or writings.jsx. Exposes shared bits via window.

const { useState, useEffect, useRef, useCallback } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "dark",
  "bgEffect": "particles",
  "accent": "#3b82f6",
  "showCursor": true
}/*EDITMODE-END*/;

// Site sections — shared by app.jsx (active-section tracking) and
// writings.jsx (nav only). Each entry: [dom-id, copy-key in COPY.nav].
const SECTIONS = [
  ["about", "about"],
  ["education", "education"],
  ["experience", "experience"],
  ["projects", "projects"],
  ["certificates", "certificates"],
  ["blog", "blog"],
  ["contact", "contact"],
];

// ---------------- Custom magnetic cursor ----------------
function Cursor({ enabled }) {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;
    let dx = -100, dy = -100, rx = -100, ry = -100;
    let mx = -100, my = -100;
    let hot = false;
    let raf;

    const move = (e) => {
      mx = e.clientX; my = e.clientY;
      const el = document.elementFromPoint(mx, my);
      const target = el && el.closest("[data-hot], a, button");
      if (target) {
        const r = target.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        mx = mx + (cx - mx) * 0.18;
        my = my + (cy - my) * 0.18;
        if (!hot) { hot = true; ringRef.current?.classList.add("hot"); }
      } else if (hot) { hot = false; ringRef.current?.classList.remove("hot"); }
    };

    const animate = () => {
      dx += (mx - dx) * 0.6;
      dy += (my - dy) * 0.6;
      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${dx - 3}px, ${dy - 3}px, 0)`;
      if (ringRef.current) {
        const w = ringRef.current.offsetWidth / 2;
        ringRef.current.style.transform = `translate3d(${rx - w}px, ${ry - w}px, 0)`;
      }
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", move);
    animate();
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}

// ---------------- Background canvas ----------------
function BackgroundFX({ effect }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (effect === "none") return;
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    let raf, t = 0;
    let particles = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      c.width = window.innerWidth * dpr;
      c.height = window.innerHeight * dpr;
      c.style.width = window.innerWidth + "px";
      c.style.height = window.innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (effect === "particles") {
        particles = [];
        const count = Math.floor((window.innerWidth * window.innerHeight) / 16000);
        for (let i = 0; i < count; i++) {
          particles.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 0.18,
            vy: (Math.random() - 0.5) * 0.18,
            r: Math.random() * 1.6 + 0.2,
          });
        }
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const getAccent = () => getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#00e5ff";

    const drawWave = () => {
      const W = window.innerWidth, H = window.innerHeight;
      ctx.clearRect(0, 0, W, H);
      const accent = getAccent();
      for (let layer = 0; layer < 4; layer++) {
        ctx.beginPath();
        const amp = 24 + layer * 18;
        const freq = 0.004 + layer * 0.0014;
        const speed = 0.006 + layer * 0.003;
        const yMid = H * (0.35 + layer * 0.18);
        ctx.strokeStyle = accent;
        ctx.globalAlpha = 0.08 - layer * 0.014;
        ctx.lineWidth = 1.1;
        for (let x = 0; x <= W; x += 3) {
          const y =
            yMid +
            Math.sin(x * freq + t * speed) * amp +
            Math.sin(x * freq * 2.5 + t * speed * 1.4) * amp * 0.4;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };

    const drawParticles = () => {
      const W = window.innerWidth, H = window.innerHeight;
      ctx.clearRect(0, 0, W, H);
      const accent = getAccent();
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
      }
      ctx.strokeStyle = accent;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 14000) {
            ctx.globalAlpha = (1 - d2 / 14000) * 0.18;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      ctx.fillStyle = accent;
      for (const p of particles) {
        ctx.globalAlpha = 0.6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const tick = () => {
      t++;
      if (effect === "wave") drawWave();
      else if (effect === "particles") drawParticles();
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [effect]);

  if (effect === "none") return null;
  return <canvas ref={canvasRef} className="bg-canvas" />;
}

// ---------------- Scroll reveal ----------------
function useScrollReveal(deps) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(".reveal"));
    const reveal = (el) => el.classList.add("in");
    const check = () => {
      const vh = window.innerHeight;
      for (const el of els) {
        if (el.classList.contains("in")) continue;
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.92 && r.bottom > 0) reveal(el);
      }
    };
    let io;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            reveal(en.target);
            io.unobserve(en.target);
          }
        });
      }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
      els.forEach((el) => io.observe(el));
    }
    check();
    const onScroll = () => check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const t1 = setTimeout(check, 50);
    const t2 = setTimeout(check, 300);
    return () => {
      io && io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      clearTimeout(t1); clearTimeout(t2);
    };
  }, deps);
}

// ---------------- Active section tracking ----------------
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    let raf = null;
    const update = () => {
      raf = null;
      const line = 160;
      let best = null;
      let bestTop = -Infinity;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const t = el.getBoundingClientRect().top;
        if (t <= line && t > bestTop) {
          bestTop = t;
          best = id;
        }
      }
      if (best === null) best = ids[0];

      const docH = document.documentElement.scrollHeight;
      if (window.scrollY + window.innerHeight >= docH - 4) {
        for (let i = ids.length - 1; i >= 0; i--) {
          if (document.getElementById(ids[i])) { best = ids[i]; break; }
        }
      }
      setActive(best);
    };
    const schedule = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("hashchange", () => setTimeout(update, 50));
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return active;
}

// ---------------- Animate language bars ----------------
function useLangBars(lang) {
  useEffect(() => {
    const bars = document.querySelectorAll(".lang-bar > i");
    bars.forEach((b) => {
      const style = b.getAttribute("style");
      b.setAttribute("style", "right: 100%");
      requestAnimationFrame(() => requestAnimationFrame(() => {
        b.setAttribute("style", style);
      }));
    });
  }, [lang]);
}

// Mirror the React lang state onto <html lang> so screen readers and
// search engines see the correct language.
function useHtmlLang(lang) {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
}

// Magnetic tilt: returns { ref, onMouseMove, onMouseLeave } — spread onto a
// card-like element to give it the lift + 3D tilt on hover. Cards must
// declare `style={{ transformStyle: "preserve-3d" }}` themselves so the
// inline transform composes correctly.
function useMagneticTilt() {
  const ref = useRef(null);
  const onMouseMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `translateY(-2px) rotateX(${-y * 3}deg) rotateY(${x * 3}deg)`;
  }, []);
  const onMouseLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = "";
  }, []);
  return { ref, onMouseMove, onMouseLeave };
}

// ---------------- Tweaks panel block ----------------
// A small wrapper that renders the standard Tweaks panel with our config.
function PortfolioTweaks({ lang, t, setTweak }) {
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label={lang === "tr" ? "Görünüm" : "Appearance"} />
      <TweakRadio
        label={lang === "tr" ? "Tema" : "Theme"}
        value={t.theme}
        onChange={(v) => setTweak("theme", v)}
        options={[
          { value: "dark", label: lang === "tr" ? "Koyu" : "Dark" },
          { value: "light", label: lang === "tr" ? "Açık" : "Light" },
        ]}
      />
      <TweakColor
        label={lang === "tr" ? "Vurgu" : "Accent"}
        value={t.accent}
        onChange={(v) => setTweak("accent", v)}
        options={["#3b82f6", "#7c5cff", "#00e5ff", "#00ff88", "#ff5577"]}
      />
      <TweakSection label={lang === "tr" ? "Arka plan" : "Background"} />
      <TweakRadio
        label={lang === "tr" ? "Efekt" : "Effect"}
        value={t.bgEffect}
        onChange={(v) => setTweak("bgEffect", v)}
        options={[
          { value: "wave", label: lang === "tr" ? "Dalga" : "Wave" },
          { value: "particles", label: lang === "tr" ? "Parça" : "Dots" },
          { value: "none", label: lang === "tr" ? "Yok" : "None" },
        ]}
      />
      <TweakSection label={lang === "tr" ? "İmleç" : "Cursor"} />
      <TweakToggle
        label={lang === "tr" ? "Özel imleç" : "Custom cursor"}
        value={t.showCursor}
        onChange={(v) => setTweak("showCursor", v)}
      />
    </TweaksPanel>
  );
}

// Apply theme/accent side effects. When theme changes, swap the accent
// to the theme's default (blue for dark, purple for light) unless the
// user has explicitly picked a custom one in the current session.
function useAppearance(t, setTweak) {
  const THEME_ACCENTS = { dark: "#3b82f6", light: "#7c5cff" };
  const KNOWN = new Set(["#3b82f6", "#7c5cff", "#00e5ff", "#00ff88", "#ff5577"]);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", t.theme);
    // If current accent is a "known default" of the *other* theme, switch it.
    if (setTweak && KNOWN.has(t.accent)) {
      const want = THEME_ACCENTS[t.theme];
      if (want && t.accent !== want) {
        setTweak("accent", want);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t.theme]);
  useEffect(() => {
    document.documentElement.style.setProperty("--accent", t.accent);
    document.documentElement.style.setProperty("--accent-soft", t.accent + "1f");
    document.documentElement.style.setProperty("--accent-glow", t.accent + "73");
  }, [t.accent]);
}

Object.assign(window, {
  TWEAK_DEFAULTS, SECTIONS,
  Cursor, BackgroundFX, PortfolioTweaks,
  useScrollReveal, useActiveSection, useLangBars, useAppearance,
  useHtmlLang, useMagneticTilt,
});
