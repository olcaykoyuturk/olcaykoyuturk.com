// === Writings page ===
const { useState: useStateW, useCallback: useCallbackW } = React;

function WritingsHero({ lang }) {
  const c = PORTFOLIO_DATA.COPY.sections[lang];
  const title = lang === "tr" ? "Yazılar" : "Writings";
  return (
    <section className="writings-hero">
      <div className="container">
        <div className="writings-hero-meta reveal">
          <span className="dot" />
          <span>{lang === "tr" ? "PORTFÖY / 2026" : "PORTFOLIO / 2026"}</span>
          <span style={{ color: "var(--text-faint)" }}>·</span>
          <a href="index.html" data-hot style={{ color: "var(--text-dim)" }}>
            ← {lang === "tr" ? "Ana sayfa" : "Home"}
          </a>
        </div>
        <h1 className="writings-hero-title reveal" data-delay="1" aria-label={title}>
          {[...title].map((ch, i) => (
            <span
              key={i}
              className="wht-char"
              style={{ animationDelay: `${0.18 + i * 0.05}s` }}
              aria-hidden="true">
              {ch === " " ? "\u00a0" : ch}
            </span>
          ))}
          <span className="wht-cursor" aria-hidden="true" />
        </h1>
        <p className="writings-hero-lede reveal" data-delay="2">
          {lang === "tr"
            ? "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
        </p>
      </div>
    </section>);
}

function WritingsApp() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [lang, setLang] = useStateW("tr");
  const [openPost, setOpenPost] = useStateW(null);

  useAppearance(t, setTweak);
  useScrollReveal([lang]);

  const sections = [
    ["about", "about"],
    ["education", "education"],
    ["experience", "experience"],
    ["projects", "projects"],
    ["certificates", "certificates"],
    ["blog", "blog"],
    ["contact", "contact"],
  ];

  const onOpen = useCallbackW((p) => setOpenPost(p), []);
  const onClose = useCallbackW(() => setOpenPost(null), []);

  return (
    <>
      <div className="bg-grid" />
      <BackgroundFX effect={t.bgEffect} />
      <div className="bg-noise" />
      <Cursor enabled={t.showCursor} />

      <div className="app">
        <Nav lang={lang} setLang={setLang} sections={sections} activeId="blog" currentPage="writings" />
        <WritingsHero lang={lang} />
        <Blog lang={lang} onOpen={onOpen} />
        <Footer lang={lang} />
      </div>

      <BlogModal post={openPost} lang={lang} onClose={onClose} />
      <PortfolioTweaks lang={lang} t={t} setTweak={setTweak} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<WritingsApp />);
