import { useState, useEffect, useRef } from "react";

const FEATURE_ICONS = [
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><circle cx="12" cy="16" r="1" fill="currentColor"/></svg>,
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="9"/><path d="M12 3v9l5 3"/></svg>,
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 10h8M8 14h5"/></svg>,
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg>,
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>,
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
];

const FEATURES = [
  { title: "Horarios en vivo", desc: "Mirá exactamente cuándo llega tu próximo colectivo — actualizado en tiempo real, sin adivinar.", screen: 0 },
  { title: "Planificación de rutas", desc: "Ingresá tu destino y obtené la ruta más rápida y conveniente, con combinaciones incluidas.", screen: 1 },
  { title: "Asistente de IA", desc: "Preguntá lo que quieras: \"¿Qué colectivo va al centro?\" o \"¿Llega tarde el 42?\" — respuestas al instante.", screen: 2 },
  { title: "Mapa de paradas cercanas", desc: "Encontrá paradas cerca tuyo en un mapa interactivo con distancia a pie y tiempos de espera.", screen: 0 },
  { title: "Alertas de servicio", desc: "Recibí avisos de demoras, desvíos o cancelaciones antes de que te agarren desprevenido.", screen: 1 },
  { title: "Soporte multi-línea", desc: "Planificá viajes con múltiples líneas de colectivo, incluyendo nocturnos y expresos.", screen: 2 },
];

const mockScreens = [
  {
    bg: "#F0F4FF",
    content: (
      <g>
        <rect x="16" y="32" width="88" height="10" rx="5" fill="#3B5BDB" opacity="0.15"/>
        <rect x="16" y="48" width="60" height="7" rx="3.5" fill="#3B5BDB" opacity="0.08"/>
        <rect x="16" y="70" width="88" height="36" rx="8" fill="white"/>
        <rect x="24" y="78" width="40" height="5" rx="2.5" fill="#3B5BDB" opacity="0.5"/>
        <rect x="24" y="88" width="60" height="4" rx="2" fill="#888" opacity="0.25"/>
        <rect x="24" y="96" width="50" height="4" rx="2" fill="#888" opacity="0.2"/>
        <rect x="16" y="116" width="88" height="36" rx="8" fill="white"/>
        <rect x="24" y="124" width="32" height="5" rx="2.5" fill="#3B5BDB" opacity="0.5"/>
        <rect x="24" y="134" width="60" height="4" rx="2" fill="#888" opacity="0.25"/>
        <rect x="24" y="142" width="44" height="4" rx="2" fill="#888" opacity="0.2"/>
      </g>
    ),
  },
  {
    bg: "#F5FFF7",
    content: (
      <g>
        <rect x="16" y="32" width="88" height="10" rx="5" fill="#2F9E44" opacity="0.15"/>
        <circle cx="28" cy="68" r="5" fill="#2F9E44" opacity="0.7"/>
        <line x1="28" y1="73" x2="28" y2="107" stroke="#2F9E44" strokeWidth="2" strokeDasharray="3,3" opacity="0.4"/>
        <circle cx="28" cy="112" r="5" fill="#2F9E44" opacity="0.4"/>
        <rect x="40" y="63" width="60" height="10" rx="5" fill="white"/>
        <rect x="40" y="79" width="40" height="7" rx="3" fill="#2F9E44" opacity="0.15"/>
        <rect x="40" y="107" width="60" height="10" rx="5" fill="white"/>
        <rect x="40" y="123" width="44" height="7" rx="3" fill="#2F9E44" opacity="0.15"/>
        <rect x="16" y="140" width="88" height="14" rx="7" fill="#2F9E44" opacity="0.8"/>
        <rect x="35" y="145" width="50" height="4" rx="2" fill="white" opacity="0.9"/>
      </g>
    ),
  },
  {
    bg: "#FFF8F0",
    content: (
      <g>
        <rect x="16" y="32" width="88" height="10" rx="5" fill="#E8590C" opacity="0.15"/>
        <rect x="16" y="56" width="64" height="18" rx="9" fill="white"/>
        <rect x="22" y="62" width="48" height="5" rx="2.5" fill="#888" opacity="0.3"/>
        <rect x="36" y="80" width="64" height="18" rx="9" fill="#E8590C" opacity="0.15"/>
        <rect x="42" y="86" width="52" height="5" rx="2.5" fill="#E8590C" opacity="0.4"/>
        <rect x="16" y="104" width="72" height="18" rx="9" fill="white"/>
        <rect x="22" y="110" width="56" height="5" rx="2.5" fill="#888" opacity="0.3"/>
        <rect x="36" y="128" width="64" height="18" rx="9" fill="#E8590C" opacity="0.15"/>
        <rect x="42" y="134" width="40" height="5" rx="2.5" fill="#E8590C" opacity="0.4"/>
        <rect x="16" y="152" width="88" height="14" rx="7" fill="white" stroke="#E8590C" strokeWidth="1.5" opacity="0.6"/>
        <rect x="24" y="157" width="60" height="4" rx="2" fill="#E8590C" opacity="0.2"/>
      </g>
    ),
  },
];

function useInView(ref) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return inView;
}

const INTERVAL_MS = 5000;

export default function App() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const featRef = useRef(null);
  const featInView = useInView(featRef);
  const timerRef = useRef(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveFeature(s => (s + 1) % FEATURES.length);
    }, INTERVAL_MS);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const handleFeatureClick = (i) => {
    setActiveFeature(i);
    startTimer();
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeScreenIdx = FEATURES[activeFeature].screen;

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: "#FAFAFA", color: "#1A1A2E", minHeight: "100vh", width: "100%", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display:ital@0;1&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { width: 100%; min-height: 100vh; }
        html { scroll-behavior: smooth; }

        .store-btn {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 12px 22px; border-radius: 12px;
          font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500;
          cursor: pointer; transition: transform 0.18s, box-shadow 0.18s;
          text-decoration: none; white-space: nowrap;
        }
        .store-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.12); }
        .store-btn-dark { background: #1A1A2E; color: white; border: none; }
        .store-btn-light { background: white; color: #1A1A2E; border: 1.5px solid #E2E8F0; }

        .gradient-text {
          background: linear-gradient(135deg, #3B5BDB 0%, #5C7CFA 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }

        .feat-row {
          display: flex; align-items: flex-start; gap: 16px; padding: 16px 20px;
          border-radius: 14px; cursor: pointer;
          transition: background 0.2s, border-color 0.2s, transform 0.2s;
          border: 1.5px solid transparent;
        }
        .feat-row:hover { background: #F8FAFF; }
        .feat-row.active { background: #EEF2FF; border-color: #D0D7FF; transform: translateX(4px); }

        .phone-slide { transition: opacity 0.45s ease, transform 0.45s ease; }

        nav a { color: #64748B; text-decoration: none; font-size: 14px; font-weight: 500; transition: color 0.15s; }
        nav a:hover { color: #1A1A2E; }

        .dot { width: 8px; height: 8px; border-radius: 50%; border: none; cursor: pointer; transition: all 0.2s; padding: 0; }

        .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; background: none; border: none; padding: 4px; }
        .hamburger span { width: 22px; height: 2px; background: #1A1A2E; border-radius: 2px; transition: all 0.2s; display: block; }

        .mobile-menu { display: none; position: fixed; top: 64px; left: 0; right: 0; background: rgba(250,250,250,0.97); backdrop-filter: blur(12px); border-bottom: 1px solid #F0F0F0; flex-direction: column; padding: 20px 5%; gap: 0; z-index: 99; }
        .mobile-menu a { color: #1A1A2E; font-size: 16px; font-weight: 500; text-decoration: none; padding: 14px 0; border-bottom: 1px solid #F0F0F0; display: block; }

        @media (max-width: 900px) { .feat-phone-col { display: none !important; } }
        @media (max-width: 768px) {
          .hero-inner { flex-direction: column !important; padding-top: 90px !important; gap: 36px !important; }
          .hero-phone-col { display: none !important; }
          .nav-links { display: none !important; }
          .nav-cta { display: none !important; }
          .hamburger { display: flex !important; }
          .mobile-menu-open { display: flex !important; }
          .download-btns { flex-direction: column !important; align-items: stretch !important; }
          .download-btns a { justify-content: center; }
        }
        @media (max-width: 480px) {
          .hero-btns { flex-direction: column !important; }
          .hero-btns a { justify-content: center; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, width: "100%", zIndex: 100,
        background: scrolled ? "rgba(250,250,250,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid #F0F0F0" : "none",
        transition: "all 0.3s ease",
        padding: "0 5%",
        display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px",
      }}>
        <a href="#top" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none", color: "inherit" }}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect width="28" height="28" rx="8" fill="#3B5BDB"/>
            <path d="M7 14h14M7 10h14M7 18h9" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: "18px", letterSpacing: "-0.3px" }}>Routely</span>
        </a>

        <div className="nav-links" style={{ display: "flex", gap: "28px", alignItems: "center" }}>
          <a href="#features">Funciones</a>
          <a href="#download">Descargar</a>
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <a href="#download" className="store-btn store-btn-dark nav-cta" style={{ padding: "9px 18px", fontSize: "13px", borderRadius: "10px" }}>
            Obtener la App
          </a>
          <button className="hamburger" onClick={() => setMenuOpen(o => !o)}>
            <span style={{ transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none" }}/>
            <span style={{ opacity: menuOpen ? 0 : 1 }}/>
            <span style={{ transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none" }}/>
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mobile-menu${menuOpen ? " mobile-menu-open" : ""}`}>
        <a href="#features" onClick={() => setMenuOpen(false)}>Funciones</a>
        <a href="#download" onClick={() => setMenuOpen(false)}>Descargar</a>
      </div>

      <div id="top" style={{ position: "absolute", top: 0 }}/>

      {/* HERO */}
      <section style={{ width: "100%", minHeight: "100vh", display: "flex", alignItems: "center", padding: "0 5%" }}>
        <div className="hero-inner" style={{ width: "100%", maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", gap: "60px", flexWrap: "wrap", padding: "120px 0 80px" }}>
          <div className="hero-text" style={{ flex: "1 1 380px" }}>
            <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(38px,5.5vw,72px)", lineHeight: 1.05, letterSpacing: "-1.5px", marginBottom: "24px" }}>
              Los colectivos de tu ciudad,<br/>
              <em className="gradient-text">por fin simples.</em>
            </h1>
            <p style={{ fontSize: "clamp(15px,1.8vw,18px)", color: "#64748B", lineHeight: 1.7, maxWidth: "440px", marginBottom: "40px", fontWeight: 300 }}>
              Horarios en tiempo real, planificación inteligente de rutas y un asistente de IA que responde tus preguntas al instante.
            </p>
            <div className="hero-btns" style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              <a href="#download" className="store-btn store-btn-dark">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
                  <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
                </svg>
                Descargar para PC
              </a>
              <a href="#download" className="store-btn store-btn-light">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#1A1A2E"><path d="M3.18 23.76c.3.17.64.24.99.2l12.6-12.6L12.9 7.5 3.18 23.76zm17.45-10.38c.5-.28.82-.8.82-1.38s-.32-1.1-.82-1.38l-2.8-1.6L14.4 12l3.43 3.43 2.8-1.05zM2.28.44C2.1.74 2 1.1 2 1.52v20.96c0 .42.1.78.28 1.08L14.1 12 2.28.44zm10.4 11.56l3.4-3.4-10.4-5.96L12.68 12z"/></svg>
                Google Play
              </a>
            </div>
          </div>

          <div className="hero-phone-col" style={{ flex: "1 1 260px", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{ position: "relative", width: "160px", height: "280px" }}>
              {mockScreens.map((s, i) => (
                <div key={i} className="phone-slide" style={{
                  position: "absolute", top: 0, left: 0,
                  opacity: activeScreenIdx === i ? 1 : 0,
                  transform: activeScreenIdx === i ? "scale(1.05) translateY(0)" : "scale(0.95) translateY(12px)",
                  pointerEvents: "none",
                  filter: activeScreenIdx === i ? "drop-shadow(0 20px 40px rgba(59,91,219,0.18))" : "none",
                }}>
                  <svg width="160" height="280" viewBox="0 0 120 220" fill="none">
                    <rect x="2" y="2" width="116" height="216" rx="20" fill={s.bg} stroke="#E2E8F0" strokeWidth="2"/>
                    <rect x="8" y="8" width="104" height="204" rx="16" fill={s.bg}/>
                    <rect x="42" y="12" width="36" height="6" rx="3" fill="#CBD5E1"/>
                    {s.content}
                    <rect x="2" y="2" width="116" height="216" rx="20" fill="none" stroke="#E2E8F0" strokeWidth="2"/>
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" ref={featRef} style={{ width: "100%", padding: "100px 5%", background: "white", borderTop: "1.5px solid #F0F0F0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <p style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "2px", color: "#3B5BDB", textTransform: "uppercase", marginBottom: "12px" }}>Funciones</p>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(28px,4vw,48px)", letterSpacing: "-1px", marginBottom: "16px" }}>
              Todo lo que necesitás<br/>para viajar con confianza
            </h2>
            <p style={{ fontSize: "clamp(14px,1.8vw,17px)", color: "#64748B", fontWeight: 300, maxWidth: "480px", margin: "0 auto" }}>
              Pensado para quienes viajan todos los días y quieren menos complicaciones.
            </p>
          </div>

          <div style={{ display: "flex", gap: "60px", alignItems: "center" }}>
            <div style={{ flex: "1 1 320px", display: "flex", flexDirection: "column", gap: "4px" }}>
              {FEATURES.map((f, i) => (
                <div
                  key={i}
                  className={`feat-row${activeFeature === i ? " active" : ""}`}
                  onClick={() => handleFeatureClick(i)}
                  style={{
                    opacity: featInView ? 1 : 0,
                    transition: `opacity 0.5s ease ${i * 0.07}s, background 0.2s, border-color 0.2s, transform 0.2s`,
                  }}
                >
                  <div style={{ color: activeFeature === i ? "#3B5BDB" : "#94A3B8", transition: "color 0.2s", flexShrink: 0, marginTop: "2px" }}>{FEATURE_ICONS[i]}</div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: "15px", fontWeight: 600, marginBottom: activeFeature === i ? "6px" : "0", color: activeFeature === i ? "#1A1A2E" : "#475569", transition: "color 0.2s, margin 0.2s" }}>{f.title}</h3>
                    <div style={{ overflow: "hidden", maxHeight: activeFeature === i ? "80px" : "0px", opacity: activeFeature === i ? 1 : 0, transition: "max-height 0.35s ease, opacity 0.3s ease" }}>
                      <p style={{ fontSize: "13px", color: "#94A3B8", lineHeight: 1.65, fontWeight: 300 }}>{f.desc}</p>
                    </div>
                  </div>
                </div>
              ))}

              <div style={{ display: "flex", gap: "8px", paddingLeft: "20px", marginTop: "20px" }}>
                {FEATURES.map((_, i) => (
                  <button key={i} className="dot" onClick={() => handleFeatureClick(i)} style={{ background: activeFeature === i ? "#3B5BDB" : "#CBD5E1", transform: activeFeature === i ? "scale(1.35)" : "scale(1)" }}/>
                ))}
              </div>
            </div>

            <div className="feat-phone-col" style={{ flex: "0 0 auto", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div style={{ position: "relative", width: "200px", height: "360px" }}>
                {mockScreens.map((s, i) => (
                  <div key={i} className="phone-slide" style={{
                    position: "absolute", top: 0, left: 0,
                    opacity: activeScreenIdx === i ? 1 : 0,
                    transform: activeScreenIdx === i ? "scale(1) translateY(0)" : "scale(0.93) translateY(16px)",
                    pointerEvents: "none",
                    filter: activeScreenIdx === i ? "drop-shadow(0 24px 48px rgba(59,91,219,0.15))" : "none",
                  }}>
                    <svg width="200" height="360" viewBox="0 0 120 220" fill="none">
                      <rect x="2" y="2" width="116" height="216" rx="20" fill={s.bg} stroke="#E2E8F0" strokeWidth="2"/>
                      <rect x="8" y="8" width="104" height="204" rx="16" fill={s.bg}/>
                      <rect x="42" y="12" width="36" height="6" rx="3" fill="#CBD5E1"/>
                      {s.content}
                      <rect x="2" y="2" width="116" height="216" rx="20" fill="none" stroke="#E2E8F0" strokeWidth="2"/>
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DOWNLOAD */}
      <section id="download" style={{ width: "100%", padding: "120px 5%", textAlign: "center", background: "#FAFAFA" }}>
        <div style={{ maxWidth: "520px", margin: "0 auto" }}>
          <div style={{ width: "64px", height: "64px", borderRadius: "18px", background: "#3B5BDB", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px" }}>
            <svg width="32" height="32" viewBox="0 0 28 28" fill="none">
              <path d="M7 14h14M7 10h14M7 18h9" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(28px,4vw,48px)", letterSpacing: "-1px", marginBottom: "16px" }}>
            Empezá a viajar mejor<br/>hoy mismo
          </h2>
          <p style={{ fontSize: "clamp(14px,1.8vw,17px)", color: "#64748B", fontWeight: 300, lineHeight: 1.7, marginBottom: "44px" }}>
            Gratis para descargar. Sin cuenta para consultar horarios.<br/>Disponible en Android y PC.
          </p>
          <div className="download-btns" style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
            <a href="#" className="store-btn store-btn-dark" style={{ padding: "16px 28px", fontSize: "15px" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
                <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
              </svg>
              Descargar para PC
            </a>
            <a href="#" className="store-btn store-btn-light" style={{ padding: "16px 28px", fontSize: "15px" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#1A1A2E"><path d="M3.18 23.76c.3.17.64.24.99.2l12.6-12.6L12.9 7.5 3.18 23.76zm17.45-10.38c.5-.28.82-.8.82-1.38s-.32-1.1-.82-1.38l-2.8-1.6L14.4 12l3.43 3.43 2.8-1.05zM2.28.44C2.1.74 2 1.1 2 1.52v20.96c0 .42.1.78.28 1.08L14.1 12 2.28.44zm10.4 11.56l3.4-3.4-10.4-5.96L12.68 12z"/></svg>
              Conseguilo en Google Play
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1.5px solid #F0F0F0", padding: "24px 5%", width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", maxWidth: "1200px", margin: "0 auto" }}>
          <a href="#top" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none", color: "inherit" }}>
            <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
              <rect width="28" height="28" rx="8" fill="#3B5BDB"/>
              <path d="M7 14h14M7 10h14M7 18h9" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: "15px" }}>Routely</span>
          </a>
          <p style={{ fontSize: "13px", color: "#94A3B8" }}>© 2026 Routely. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}