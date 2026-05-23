// === App root: home page ===
const { useState, useEffect, useCallback } = React;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [lang, setLang] = useState("tr");
  const [openProject, setOpenProject] = useState(null);

  useAppearance(t, setTweak);

  const sections = [
    ["about", "about"],
    ["education", "education"],
    ["experience", "experience"],
    ["projects", "projects"],
    ["certificates", "certificates"],
    ["blog", "blog"],
    ["contact", "contact"],
  ];
  const activeId = useActiveSection(sections.map((s) => s[0]));

  useScrollReveal([lang]);
  useLangBars(lang);

  const onOpen = useCallback((p) => setOpenProject(p), []);
  const onClose = useCallback(() => setOpenProject(null), []);

  return (
    <>
      <div className="bg-grid" />
      <BackgroundFX effect={t.bgEffect} />
      <div className="bg-noise" />
      <Cursor enabled={t.showCursor} />

      <div className="app">
        <Nav lang={lang} setLang={setLang} sections={sections} activeId={activeId} currentPage="home" />
        <Hero lang={lang} />
        <About lang={lang} />
        <Education lang={lang} />
        <Experience lang={lang} />
        <Projects lang={lang} onOpen={onOpen} />
        <Certificates lang={lang} />
        <Contact lang={lang} />
        <Footer lang={lang} />
      </div>

      <ProjectModal project={openProject} lang={lang} onClose={onClose} />

      <PortfolioTweaks lang={lang} t={t} setTweak={setTweak} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
