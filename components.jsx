// === Portfolio components ===
// Globals expected: React, PORTFOLIO_DATA

const { useState, useEffect, useRef, useMemo } = React;

// ---------------- Nav ----------------
function Nav({ lang, setLang, sections, activeId, currentPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  const links = PORTFOLIO_DATA.COPY.nav[lang];
  const onHome = currentPage !== "writings";
  const anchorBase = onHome ? "" : "index.html";
  const closeMenu = () => setMenuOpen(false);
  return (
    <header className={`nav ${scrolled ? "scrolled" : ""}`}>
      <a href={onHome ? "#top" : "index.html"} className="nav-brand" data-hot onClick={closeMenu}>
        <span className="brand-mark"><span>OK</span></span>
        <span>Olcay Koyutürk</span>
      </a>
      <nav className="nav-links">
        {sections.map(([id, key]) => {
          const isBlog = id === "blog";
          const href = isBlog ? "writings.html" : `${anchorBase}#${id}`;
          const active = isBlog ? currentPage === "writings" : onHome && activeId === id;
          return (
            <a key={id} href={href} className={active ? "active" : ""} data-hot>
              {links[key]}
            </a>);
        })}
      </nav>
      <div className="nav-tools">
        <button
          className="lang-toggle"
          data-hot
          aria-label="Toggle language"
          onClick={() => setLang(lang === "tr" ? "en" : "tr")}
          data-lang={lang}>
          <span className="lang-toggle-track">
            <span className="lang-toggle-label tr">TR</span>
            <span className="lang-toggle-label en">EN</span>
            <span className="lang-toggle-thumb" />
          </span>
        </button>
        <button
          className={`nav-burger ${menuOpen ? "open" : ""}`}
          data-hot
          aria-label="Menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}>
          <span /><span /><span />
        </button>
      </div>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`} onClick={closeMenu}>
        <nav className="mobile-menu-inner" onClick={(e) => e.stopPropagation()}>
          {sections.map(([id, key], i) => {
            const isBlog = id === "blog";
            const href = isBlog ? "writings.html" : `${anchorBase}#${id}`;
            const active = isBlog ? currentPage === "writings" : onHome && activeId === id;
            return (
              <a
                key={id}
                href={href}
                className={`mm-link ${active ? "active" : ""}`}
                style={{ transitionDelay: menuOpen ? `${i * 0.05 + 0.05}s` : "0s" }}
                onClick={closeMenu}>
                <span className="mm-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="mm-label">{links[key]}</span>
                <span className="mm-arrow">→</span>
              </a>);
          })}
          <div className="mm-foot">
            <span>© 2026 Olcay Koyutürk</span>
          </div>
        </nav>
      </div>
    </header>);

}

// ---------------- Hero ----------------
function Hero({ lang }) {
  const { PROFILE, COPY } = PORTFOLIO_DATA;
  const tags = PROFILE.taglines[lang];
  const [tagIdx, setTagIdx] = useState(0);
  const [typed, setTyped] = useState("");

  // Typewriter cycling through taglines
  useEffect(() => {
    let cancelled = false;
    let i = 0;
    const word = tags[tagIdx];
    const tick = () => {
      if (cancelled) return;
      if (i <= word.length) {
        setTyped(word.slice(0, i));
        i++;
        setTimeout(tick, 65);
      } else {
        setTimeout(() => {
          let j = word.length;
          const back = () => {
            if (cancelled) return;
            if (j >= 0) {
              setTyped(word.slice(0, j));
              j--;
              setTimeout(back, 28);
            } else {
              setTagIdx((p) => (p + 1) % tags.length);
            }
          };
          back();
        }, 1600);
      }
    };
    tick();
    return () => {cancelled = true;};
  }, [tagIdx, lang]);

  // Hero canvas — oscilloscope / signal
  const canvasRef = useRef(null);
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    let raf,t = 0;
    let mouseY = 0.5;
    const onMove = (e) => {
      const r = c.getBoundingClientRect();
      mouseY = (e.clientY - r.top) / r.height;
    };
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      c.width = c.offsetWidth * dpr;
      c.height = c.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const r1 = new ResizeObserver(resize);
    r1.observe(c);
    window.addEventListener("mousemove", onMove);
    const draw = () => {
      const W = c.offsetWidth,H = c.offsetHeight;
      ctx.clearRect(0, 0, W, H);
      const accent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#00e5ff";
      for (let layer = 0; layer < 3; layer++) {
        ctx.beginPath();
        const amp = (12 + layer * 14) * (0.7 + mouseY * 0.6);
        const freq = 0.008 + layer * 0.003;
        const speed = 0.012 + layer * 0.006;
        const yMid = H * (0.6 + layer * 0.08);
        const alpha = 0.18 - layer * 0.04;
        ctx.strokeStyle = accent;
        ctx.globalAlpha = alpha;
        ctx.lineWidth = 1.1;
        for (let x = 0; x <= W; x += 2) {
          const y =
          yMid +
          Math.sin(x * freq + t * speed) * amp +
          Math.sin(x * freq * 2.3 + t * speed * 1.8) * amp * 0.35;
          if (x === 0) ctx.moveTo(x, y);else
          ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      const beamX = t * 1.2 % W;
      const grad = ctx.createLinearGradient(beamX - 80, 0, beamX + 80, 0);
      grad.addColorStop(0, "rgba(0,229,255,0)");
      grad.addColorStop(0.5, "rgba(0,229,255,0.18)");
      grad.addColorStop(1, "rgba(0,229,255,0)");
      ctx.fillStyle = grad;
      ctx.globalAlpha = 1;
      ctx.fillRect(beamX - 80, 0, 160, H);
      ctx.globalAlpha = 1;
      t++;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      r1.disconnect();
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  // Parallax for hero name (subtle)
  const nameRef = useRef(null);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const heroH = window.innerHeight;
      const progress = Math.min(y / heroH, 1);
      if (nameRef.current) {
        nameRef.current.style.transform = `translateY(${progress * -24}px)`;
        nameRef.current.style.opacity = String(1 - progress * 0.4);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const c = COPY.sections[lang];

  return (
    <section className="hero" id="top">
      <canvas ref={canvasRef} className="hero-canvas" />
      <div className="container hero-inner">
        <div>
          <div className="hero-meta">
            <span className="dot" />
            <span>{lang === "tr" ? "PORTFÖY / 2026" : "PORTFOLIO / 2026"}</span>
          </div>
          <h1 ref={nameRef} className="hero-name" aria-label="Olcay Koyutürk">
            {["Olcay", "Koyutürk"].map((line, lineIdx) => (
              <span key={lineIdx} className="hn-line">
                {[...line].map((ch, i) => (
                  <span
                    key={i}
                    className="hn-char"
                    style={{ animationDelay: `${0.1 + (lineIdx * line.length + i) * 0.045}s` }}
                    aria-hidden="true">
                    {ch}
                  </span>
                ))}
              </span>
            ))}
          </h1>
          <div className="hero-role">
            <span>{PROFILE.role[lang]}</span>
          </div>
          <div className="hero-tagline">
            {lang === "tr" ? "odak alanları: " : "focus areas: "}
            <span className="typed">{typed}<span className="caret">_</span></span>
          </div>
        </div>
        <aside className="hero-aside">
          <div className="portrait-frame reveal">
            <div className="portrait-inner">
              <img src="assets/portrait.png" alt="Olcay Koyutürk" />
              <div className="portrait-scan" />
              <div className="portrait-grid" />
            </div>
            <span className="pf-corner tl" />
            <span className="pf-corner tr" />
            <span className="pf-corner bl" />
            <span className="pf-corner br" />
            <div className="portrait-meta">
              <span>ID — 001</span>
              <span>2026</span>
            </div>
          </div>
          <div className="hero-stats reveal" data-delay="1">
            <div className="hero-stat-row">
              <span className="k">{lang === "tr" ? "AD" : "NAME"}</span>
              <span className="v">Olcay Koyutürk</span>
            </div>
            <div className="hero-stat-row">
              <span className="k">{lang === "tr" ? "ROL" : "ROLE"}</span>
              <span className="v">{PROFILE.role[lang]}</span>
            </div>
            <div className="hero-stat-row">
              <span className="k">EMAIL</span>
              <span className="v"><a data-hot href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a></span>
            </div>
            <div className="hero-stat-row">
              <span className="k">GIT</span>
              <span className="v"><a data-hot href={`https://${PROFILE.github}`} target="_blank" rel="noreferrer">{PROFILE.github}</a></span>
            </div>
          </div>
        </aside>
      </div>
      <div className="scroll-hint">
        <span>{c.scrollHint}</span>
        <span className="line" />
      </div>
    </section>);

}

// ---------------- Signature canvas (waveform inside the signature card) ----------------
function SignatureCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    let raf,t = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      c.width = c.offsetWidth * dpr;
      c.height = c.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(c);
    const draw = () => {
      const W = c.offsetWidth,H = c.offsetHeight;
      ctx.clearRect(0, 0, W, H);
      const accent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#00e5ff";
      // EEG-like layered waves
      for (let layer = 0; layer < 4; layer++) {
        ctx.beginPath();
        const amp = 8 + layer * 4;
        const freq = 0.03 + layer * 0.012;
        const speed = 0.04 + layer * 0.02;
        const yMid = H * (0.5 + (layer - 1.5) * 0.12);
        ctx.strokeStyle = accent;
        ctx.globalAlpha = 0.14 - layer * 0.025;
        ctx.lineWidth = 1;
        for (let x = 0; x <= W; x += 1.5) {
          const y =
          yMid +
          Math.sin(x * freq + t * speed) * amp +
          Math.sin(x * freq * 2.3 + t * speed * 1.8 + layer) * amp * 0.35;
          if (x === 0) ctx.moveTo(x, y);else
          ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      // concentric rings centered
      const cx = W / 2,cy = H / 2;
      for (let i = 0; i < 5; i++) {
        const r = 30 + i * 26 + Math.sin(t * 0.05 + i) * 3;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = accent;
        ctx.globalAlpha = 0.08 - i * 0.013;
        ctx.setLineDash([2, 4]);
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      ctx.setLineDash([]);
      // sweep beam
      const angle = t * 0.018 % (Math.PI * 2);
      const beamLen = Math.min(W, H) * 0.42;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle) * beamLen, cy + Math.sin(angle) * beamLen);
      ctx.strokeStyle = accent;
      ctx.globalAlpha = 0.35;
      ctx.lineWidth = 1;
      ctx.stroke();
      // beam tip
      ctx.beginPath();
      ctx.arc(cx + Math.cos(angle) * beamLen, cy + Math.sin(angle) * beamLen, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = accent;
      ctx.globalAlpha = 0.9;
      ctx.fill();
      ctx.globalAlpha = 1;
      t++;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {cancelAnimationFrame(raf);ro.disconnect();};
  }, []);
  return <canvas ref={ref} className="sig-canvas" />;
}

// ---------------- Signature bars (mini spectrum analyzer) ----------------
function SignatureBars() {
  const [bars, setBars] = useState(Array(18).fill(0));
  useEffect(() => {
    let raf;
    const animate = () => {
      const t = performance.now() / 1000;
      const next = bars.map((_, i) => {
        const phase = i * 0.5;
        const a = Math.sin(t * 1.7 + phase) * 0.5 + 0.5;
        const b = Math.sin(t * 3.2 + phase * 1.3) * 0.5 + 0.5;
        return Math.max(0.08, a * 0.7 + b * 0.3);
      });
      setBars(next);
      raf = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="sig-bars" aria-hidden="true">
      {bars.map((v, i) =>
      <span key={i} style={{ height: `${Math.round(v * 100)}%` }} />
      )}
    </div>);

}

function About({ lang }) {
  const c = PORTFOLIO_DATA.COPY.sections[lang];
  return (
    <section id="about" className="container">
      <div className="section-head reveal">
        <div>
          <div className="kicker">{c.aboutKicker}</div>
        </div>
        <h2 className="section-title">{lang === "tr" ? "Mühendis Profili" : "Engineer Profile"}</h2>
      </div>
      <div className="about-grid">
        <div className="about-body reveal" data-delay="1">
          <p>{PORTFOLIO_DATA.ABOUT[lang]}</p>
        </div>
        <div className="about-side">
          <div className="skills-block reveal" data-delay="2">
            <h4>{c.skills}</h4>
            <div className="skills-tags">
              {PORTFOLIO_DATA.SKILLS.map((s) =>
              <span key={s.label} className={`skill-tag ${s.group}`} data-hot>{s.label}</span>
              )}
            </div>
          </div>
          <div className="languages-block reveal" data-delay="3">
            <h4>{c.languages}</h4>
            {PORTFOLIO_DATA.LANGUAGES.map((l) => {
              const lvl = typeof l.level === "string" ? l.level : l.level[lang];
              return (
                <React.Fragment key={l.name.en}>
                  <div className="lang-row">
                    <span className="lname">{l.name[lang]}</span>
                    <span className="lvl">{lvl}</span>
                    <div className="lang-bar"><i style={{ right: `${100 - l.pct}%` }} /></div>
                  </div>
                </React.Fragment>);

            })}
          </div>
        </div>
      </div>
    </section>);

}

// ---------------- Experience ----------------
function Experience({ lang }) {
  const c = PORTFOLIO_DATA.COPY.sections[lang];
  return (
    <section id="experience" className="container">
      <div className="section-head reveal">
        <div className="kicker">{c.experienceKicker}</div>
        <h2 className="section-title">{lang === "tr" ? "Deneyim" : "Experience"}</h2>
      </div>
      <div className="exp-list">
        {PORTFOLIO_DATA.EXPERIENCE.map((e, i) =>
        <div key={i} className="exp-row reveal" data-delay={i + 1}>
            <div>
              <div className="exp-period">{e.period}</div>
              <div className="exp-tags">
                {e.tags.map((t) => <span key={t} className="exp-tag">{t}</span>)}
              </div>
            </div>
            <div>
              <div className="exp-company">{e.company}</div>
              <div className="exp-role">{e.role[lang]}</div>
              <ul className="exp-bullets">
                {e.bullets[lang].map((b, j) => <li key={j}>{b}</li>)}
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>);

}

// ---------------- Projects ----------------
function ProjectCard({ p, lang, onOpen }) {
  const c = PORTFOLIO_DATA.COPY.sections[lang];
  const ref = useRef(null);
  // Magnetic / tilt
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `translateY(-2px) rotateX(${-y * 3}deg) rotateY(${x * 3}deg)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };
  return (
    <article
      ref={ref}
      data-hot
      className={`project-card ${p.featured ? "featured" : ""} reveal`}
      onClick={() => onOpen(p)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transformStyle: "preserve-3d" }}>
      
      <div className="project-header">
        <span className="project-year">{p.year}</span>
        <div className="project-flags">
          {p.playStore &&
          <span className="project-store-flag" title="Google Play Store">
              <svg width="11" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M3.6 2.3c-.3.3-.4.7-.4 1.2v17c0 .5.1.9.4 1.2l11.3-11L3.6 2.3zM16.9 13l3.7 2.1c.9.5.9 1.9 0 2.4l-3.7 2.1L13.5 16l3.4-3zM5.4 1.4L16.2 7.8 13.5 10.6 5.4 1.4zM5.4 22.6l8.1-9.2 2.7 2.8L5.4 22.6z" />
              </svg>
              <span>PLAY STORE</span>
            </span>
          }
          {p.featured && <span className="project-featured-flag">{c.featured}</span>}
        </div>
      </div>
      <div>
        <h3 className="project-title">{p.title[lang]}</h3>
        <p className="project-short">{p.short[lang]}</p>
      </div>
      <div className="project-footer">
        <div className="project-tags">
          {p.tags.slice(0, 4).map((t) => <span key={t} className="ptag">{t}</span>)}
        </div>
        <div className="project-arrow">
          <span>{c.viewProject}</span>
          <span>→</span>
        </div>
      </div>
    </article>);

}

function Projects({ lang, onOpen }) {
  const c = PORTFOLIO_DATA.COPY.sections[lang];
  return (
    <section id="projects" className="container">
      <div className="section-head reveal">
        <div className="kicker">{c.projectsKicker}</div>
        <h2 className="section-title">{lang === "tr" ? "Seçili Çalışmalar" : "Selected Work"}</h2>
      </div>
      <div className="projects-grid">
        {PORTFOLIO_DATA.PROJECTS.map((p) =>
        <ProjectCard key={p.id} p={p} lang={lang} onOpen={onOpen} />
        )}
        <MoreProjectsCard lang={lang} />
      </div>
    </section>);

}

function MoreProjectsCard({ lang }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `translateY(-2px) rotateX(${-y * 3}deg) rotateY(${x * 3}deg)`;
  };
  const onLeave = () => {if (ref.current) ref.current.style.transform = "";};
  return (
    <a
      ref={ref}
      data-hot
      href="https://github.com/olcaykoyuturk"
      target="_blank"
      rel="noreferrer"
      className="project-card more-card reveal"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transformStyle: "preserve-3d" }}>

      <div className="more-corner tl" />
      <div className="more-corner tr" />
      <div className="more-corner bl" />
      <div className="more-corner br" />
      <div className="more-inner">
        <div className="more-glyph" aria-hidden="true">
          <svg viewBox="0 0 64 64" width="56" height="56">
            <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.35" />
            <circle cx="32" cy="32" r="20" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.55" />
            <circle cx="32" cy="32" r="12" fill="none" stroke="currentColor" strokeWidth="1" />
            <path d="M32 22 L42 32 L32 42" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
            <line x1="22" y1="32" x2="38" y2="32" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
          </svg>
        </div>
        <div className="more-text">
          <span className="more-kicker">{lang === "tr" ? "DAHA FAZLASI" : "MORE"}</span>
          <h3 className="more-title">{lang === "tr" ? "Devamı GitHub'da" : "Continue on GitHub"}</h3>
          <p className="more-sub">
            {lang === "tr" ?
            "Tüm projeler, kaynak kodlar ve deneyler." :
            "All projects, source code, and experiments."}
          </p>
        </div>
        <div className="more-footer">
          <span className="more-link">github.com/olcaykoyuturk</span>
          <span className="more-arrow">→</span>
        </div>
      </div>
    </a>);

}

// ---------------- Project Modal ----------------
function ProjectModal({ project, lang, onClose }) {
  const c = PORTFOLIO_DATA.COPY.sections[lang];
  useEffect(() => {
    if (!project) return;
    const onKey = (e) => {if (e.key === "Escape") onClose();};
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project]);

  return (
    <div className={`modal-veil ${project ? "open" : ""}`} onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" data-hot onClick={onClose}>
          <span>{c.close}</span> <span>×</span>
        </button>
        {project && <>
          <div className="modal-kicker">
            {project.year} {project.featured ? `· ${c.featured}` : ""}
          </div>
          <h3 className="modal-title">{project.title[lang]}</h3>
          <div className="modal-block">
            <h5>{c.overview}</h5>
            {project.body[lang].map((para, i) => <p key={i}>{para}</p>)}
          </div>
          <div className="modal-block">
            <h5>{c.stack}</h5>
            <div className="modal-tags">
              {project.tags.map((t) => <span key={t} className="skill-tag">{t}</span>)}
            </div>
          </div>
          {project.link &&
          <div className="modal-block">
              <h5>{c.link}</h5>
              <a data-hot href={`https://${project.link}`} target="_blank" rel="noreferrer" style={{ color: "var(--accent)" }}>
                {project.link} →
              </a>
            </div>
          }
        </>}
      </div>
    </div>);

}

// ---------------- Education ----------------
function Education({ lang }) {
  const c = PORTFOLIO_DATA.COPY.sections[lang];
  return (
    <section id="education" className="container">
      <div className="section-head reveal">
        <div className="kicker">{c.educationKicker}</div>
        <h2 className="section-title">{lang === "tr" ? "Eğitim" : "Education"}</h2>
      </div>
      {PORTFOLIO_DATA.EDUCATION.map((e, i) =>
      <div key={i} className="edu-row reveal">
          <div className="edu-period">{e.period}</div>
          <div>
            <div className="edu-school">{e.school}</div>
            <div className="edu-degree">{e.degree[lang]}</div>
          </div>
        </div>
      )}
    </section>);

}

// ---------------- Certificates ----------------
function Certificates({ lang }) {
  const c = PORTFOLIO_DATA.COPY.sections[lang];
  return (
    <section id="certificates" className="container">
      <div className="section-head reveal">
        <div className="kicker">{c.certificatesKicker}</div>
        <h2 className="section-title">{lang === "tr" ? "Sertifikalar" : "Certificates"}</h2>
      </div>
      <div className="certs-grid">
        {PORTFOLIO_DATA.CERTIFICATES.map((cert, i) =>
        <div key={i} className="cert-card reveal" data-delay={i % 3 + 1} data-hot>
            <div className="cert-title">{cert.title[lang]}</div>
            <div className="cert-meta">
              <span>{cert.source}</span>
              {cert.code !== "—" && <span className="code">No: {cert.code}</span>}
            </div>
          </div>
        )}
      </div>
    </section>);

}

// ---------------- Blog ----------------
function Blog({ lang, onOpen }) {
  const c = PORTFOLIO_DATA.COPY.sections[lang];
  const fmtDate = (iso) => {
    const d = new Date(iso);
    const months = lang === "tr" ?
    ["OCA", "ŞUB", "MAR", "NİS", "MAY", "HAZ", "TEM", "AĞU", "EYL", "EKİ", "KAS", "ARA"] :
    ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    return `${String(d.getDate()).padStart(2, "0")} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };
  return (
    <section id="blog" className="container">
      <div className="section-head reveal">
        <div className="kicker">{c.blogKicker}</div>
        <h2 className="section-title">{lang === "tr" ? "Yazılar" : "Writings"}</h2>
      </div>
      <div className="blog-list">
        {PORTFOLIO_DATA.BLOG.map((post, i) =>
        <article
          key={post.id}
          className="blog-row reveal"
          data-delay={i + 1}
          data-hot
          onClick={() => onOpen(post)}>
          <div className="blog-row-date">{fmtDate(post.date)}</div>
          <div className="blog-row-main">
            <h3 className="blog-row-title">{post.title[lang]}</h3>
            <p className="blog-row-excerpt">{post.excerpt[lang]}</p>
            <div className="blog-row-foot">
              <div className="blog-row-tags">
                {post.tags.map((t) => <span key={t} className="ptag">{t}</span>)}
              </div>
              <span className="blog-row-meta">{post.readTime[lang]}</span>
            </div>
          </div>
          <div className="blog-row-arrow">→</div>
        </article>
        )}
      </div>
    </section>);

}

function BlogModal({ post, lang, onClose }) {
  const c = PORTFOLIO_DATA.COPY.sections[lang];
  useEffect(() => {
    if (!post) return;
    const onKey = (e) => {if (e.key === "Escape") onClose();};
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [post]);
  return (
    <div className={`modal-veil ${post ? "open" : ""}`} onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" data-hot onClick={onClose}>
          <span>{c.close}</span> <span>×</span>
        </button>
        {post &&
        <>
          <div className="modal-kicker">
            {new Date(post.date).toLocaleDateString(lang === "tr" ? "tr-TR" : "en-US", { day: "2-digit", month: "long", year: "numeric" })} · {post.readTime[lang]}
          </div>
          <h3 className="modal-title">{post.title[lang]}</h3>
          <div className="modal-block">
            {post.body[lang].map((para, i) => <p key={i}>{para}</p>)}
          </div>
          <div className="modal-block">
            <h5>{c.stack}</h5>
            <div className="modal-tags">
              {post.tags.map((t) => <span key={t} className="skill-tag">{t}</span>)}
            </div>
          </div>
        </>
        }
      </div>
    </div>);

}
function Contact({ lang }) {
  const c = PORTFOLIO_DATA.COPY.sections[lang];
  const { PROFILE } = PORTFOLIO_DATA;
  return (
    <section id="contact" className="container">
      <div className="section-head reveal">
        <div className="kicker">{c.contactKicker}</div>
        <h2 className="section-title">{lang === "tr" ? "İletişim" : "Contact"}</h2>
      </div>
      <div className="contact-block">
        <div className="reveal">
          <div className="contact-lead">{c.contactLead}</div>
          <div className="contact-cta-row">
            <a className="cta-btn" data-hot href={`mailto:${PROFILE.email}`}>
              <span>{c.cta}</span>
              <span className="arrow">→</span>
            </a>
          </div>
          <div className="contact-availability">
            <span className="dot" />
            <span>{c.availability}</span>
          </div>
        </div>
        <div className="contact-list reveal" data-delay="1">
          <a data-hot href={`mailto:${PROFILE.email}`} className="contact-row">
            <span className="ck">EMAIL</span><span className="cv">{PROFILE.email}</span>
          </a>
          <a data-hot href={`https://${PROFILE.github}`} target="_blank" rel="noreferrer" className="contact-row">
            <span className="ck">GITHUB</span><span className="cv">{PROFILE.github}</span>
          </a>
        </div>
      </div>
    </section>);

}

// ---------------- Footer ----------------
function Footer({ lang }) {
  return (
    <footer className="footer">
      <div>© 2026 Olcay Koyutürk</div>
    </footer>);

}

Object.assign(window, {
  Nav, Hero, SignatureCanvas, SignatureBars, About, Experience, Projects, ProjectCard, ProjectModal,
  Education, Certificates, Blog, BlogModal, Contact, Footer
});