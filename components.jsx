// === Portfolio components ===
// Globals expected: React, PORTFOLIO_DATA, useMagneticTilt (from chrome.jsx)

const { useState, useEffect, useRef } = React;

// ---------------- Nav ----------------
function Nav({ lang, setLang, sections, activeId, currentPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [sideOpen, setSideOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = sideOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [sideOpen]);
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setSideOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  const links = PORTFOLIO_DATA.COPY.nav[lang];
  const onHome = currentPage !== "writings";
  const anchorBase = onHome ? "" : "index.html";
  const closeSide = () => setSideOpen(false);
  const hrefFor = (id) => id === "blog" ? "writings.html" : `${anchorBase}#${id}`;
  const isActive = (id) => id === "blog" ? currentPage === "writings" : onHome && activeId === id;

  return (
    <>
      <header className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-left">
          <button
            className={`nav-kebab ${sideOpen ? "open" : ""}`}
            data-hot
            aria-label={lang === "tr" ? "Menüyü aç" : "Open menu"}
            aria-expanded={sideOpen}
            onClick={() => setSideOpen((v) => !v)}>
            <span /><span /><span />
          </button>
          <a href={onHome ? "#top" : "index.html"} className="nav-brand" data-hot onClick={closeSide}>
            <span className="brand-mark"><span>OK</span></span>
            <span>Olcay Koyutürk</span>
          </a>
        </div>
        <nav className="nav-links">
          {sections.map(([id, key]) => (
            <a key={id} href={hrefFor(id)} className={isActive(id) ? "active" : ""} data-hot>
              {links[key]}
            </a>
          ))}
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
            className="tweaks-trigger"
            data-hot
            aria-label={lang === "tr" ? "Görünüm ayarları" : "Appearance settings"}
            onClick={() => window.postMessage({ type: "__activate_edit_mode" }, "*")}>
            <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M2.5 4h7m2 0h2M2.5 8h2m3 0h6.5M2.5 12h9.5m2 0h0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
              <circle cx="10.5" cy="4" r="1.6" fill="currentColor" />
              <circle cx="5.5" cy="8" r="1.6" fill="currentColor" />
              <circle cx="13" cy="12" r="1.6" fill="currentColor" />
            </svg>
          </button>
        </div>
      </header>

      <div className={`side-menu-veil ${sideOpen ? "open" : ""}`} onClick={closeSide} />
      <aside className={`side-menu ${sideOpen ? "open" : ""}`} aria-hidden={!sideOpen}>
        <div className="side-menu-head">
          <span>{lang === "tr" ? "MENÜ" : "MENU"}</span>
          <button
            className="side-menu-close"
            data-hot
            aria-label={lang === "tr" ? "Menüyü kapat" : "Close menu"}
            onClick={closeSide}>×</button>
        </div>
        <div className="side-menu-list">
          {sections.map(([id, key], i) => (
            <a
              key={id}
              href={hrefFor(id)}
              className={`sm-link ${isActive(id) ? "active" : ""}`}
              style={{ transitionDelay: sideOpen ? `${i * 0.05 + 0.1}s` : "0s" }}
              data-hot
              onClick={closeSide}>
              <span className="sm-num">{String(i + 1).padStart(2, "0")}</span>
              <span>{links[key]}</span>
              <span className="sm-arrow">→</span>
            </a>
          ))}
        </div>
        <div className="side-menu-foot">© 2026 Olcay Koyutürk</div>
      </aside>
    </>
  );
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
            <span className="typed">{typed}</span>
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
  const tilt = useMagneticTilt();
  return (
    <article
      ref={tilt.ref}
      data-hot
      className={`project-card ${p.featured ? "featured" : ""} reveal`}
      onClick={() => onOpen(p)}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
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
  const tilt = useMagneticTilt();
  return (
    <a
      ref={tilt.ref}
      data-hot
      href="https://github.com/olcaykoyuturk"
      target="_blank"
      rel="noreferrer"
      className="project-card more-card reveal"
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
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

// ---------------- Modal shell ----------------
// Shared veil + close button + escape/body-lock side effects.
// Children render only while `open` is truthy.
function Modal({ open, onClose, closeLabel, children }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <div className={`modal-veil ${open ? "open" : ""}`} onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" data-hot onClick={onClose}>
          <span>{closeLabel}</span> <span>×</span>
        </button>
        {open && children}
      </div>
    </div>
  );
}

function ProjectModal({ project, lang, onClose }) {
  const c = PORTFOLIO_DATA.COPY.sections[lang];
  return (
    <Modal open={!!project} onClose={onClose} closeLabel={c.close}>
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
    </Modal>
  );
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
  return (
    <Modal open={!!post} onClose={onClose} closeLabel={c.close}>
      {post && <>
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
      </>}
    </Modal>
  );
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
  Nav, Hero, About, Experience, Projects, ProjectCard, Modal, ProjectModal,
  Education, Certificates, Blog, BlogModal, Contact, Footer
});