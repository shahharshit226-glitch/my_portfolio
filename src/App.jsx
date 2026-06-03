import { useState, useEffect, useRef } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const PROFILE = {
  name: "Harshit Shah",
  tagline: "Full-Stack Developer · AI Builder · Startup Founder",
  intro:
    "3rd year B.Tech CSE student at KIIT University. I build AI-powered web apps, ship real products, and turn local problems into scalable solutions. Currently open to internships & collaborations.",
  github: "https://github.com/shahharshit226-glitch",
  linkedin: "https://www.linkedin.com/in/harshitshah506",
  email: "shahharshit226@gmail.com",
  phone: "9065769339",
  photo: "https://lh3.googleusercontent.com/d/1ucrBdUvkF3cUw8BbYopLPlJ9F8b_7nCU=w400",
  location: "Biratnagar, Nepal · KIIT University, Bhubaneswar",
  resumeLink: "#",
};

const SKILLS = [
  {
    category: "Languages",
    icon: "⌨",
    items: ["Java", "Python", "JavaScript", "TypeScript", "C", "SQL"],
  },
  {
    category: "Web & Frameworks",
    icon: "🌐",
    items: ["React", "Next.js", "Node.js", "Express.js", "FastAPI", "React Native", "Tailwind CSS"],
  },
  {
    category: "Databases & Tools",
    icon: "⚙",
    items: ["MongoDB", "MySQL", "Firebase", "Git", "Docker", "Linux", "VS Code"],
  },
  {
    category: "AI / Concepts",
    icon: "◈",
    items: ["NLP", "spaCy", "OpenCV", "REST APIs", "Data Structures", "System Design", "Machine Learning"],
  },
];

const PROJECTS = [
  {
    id: 1,
    badge: "🚀 STARTUP",
    title: "ResaleBrt",
    subtitle: "Local Marketplace · Biratnagar",
    description:
      "A community-first resale marketplace built specifically for Biratnagar. Admin-reviewed listings, direct WhatsApp contact with sellers, and a fast listing flow. Live MVP with real users.",
    highlights: ["Local listings only", "Admin-reviewed for trust", "WhatsApp seller contact", "Buy & sell in minutes"],
    tech: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"],
    github: null,
    demo: "https://resalebrt.com",
    isStartup: true,
  },
  {
    id: 2,
    badge: "🤖 AI PROJECT",
    title: "AI Resume Analyzer",
    subtitle: "NLP-Powered · ATS-Focused",
    description:
      "An AI platform that parses resumes, extracts skills via spaCy NLP, scores ATS compatibility, and even processes resumes received via email in agentic mode — fully automated pipeline.",
    highlights: ["ATS scoring", "NLP skill extraction", "Email agentic mode", "FastAPI + React"],
    tech: ["FastAPI", "React", "spaCy", "Tailwind CSS", "Python"],
    github: "https://github.com/shahharshit226-glitch/Resume_analyzer_agent",
    demo: "https://resume-analyzer-agent-2llu.vercel.app",
    isStartup: false,
  },
  {
    id: 3,
    badge: "⚡ FULL-STACK",
    title: "E-Complaint Management",
    subtitle: "Admin Dashboard · Full-Stack",
    description:
      "A full-stack web app for submitting, tracking, and resolving complaints digitally. Features an admin dashboard for managing tickets, status updates, and resolution workflows.",
    highlights: ["Admin dashboard", "Real-time status", "MongoDB backend", "Complaint tracking"],
    tech: ["Node.js", "Express.js", "MongoDB", "HTML", "CSS", "JavaScript"],
    github: "https://github.com/shahharshit226-glitch",
    demo: null,
    isStartup: false,
  },
  {
    id: 4,
    badge: "🎵 FRONTEND",
    title: "Spotify Clone v2",
    subtitle: "Pixel-Perfect UI · Interactive Player",
    description:
      "A polished Spotify frontend clone with interactive player controls, dynamic playlist UI, and responsive layout. Built to master CSS precision and JavaScript DOM manipulation.",
    highlights: ["Pixel-perfect UI", "Interactive player", "Responsive layout", "Dynamic playlists"],
    tech: ["JavaScript", "HTML5", "CSS3"],
    github: "https://github.com/shahharshit226-glitch/Spotify_clone2",
    demo: null,
    isStartup: false,
  },
];

const EXPERIENCE = [
  {
    role: "Website Developer",
    org: "Elabs Society, KIIT University",
    period: "Feb 2026",
    points: [
      "Designed and developed the official society website with a responsive, user-friendly interface.",
      "Implemented dynamic content management for events, announcements, and member updates.",
      "Integrated REST APIs for real-time data fetching and optimized for cross-browser compatibility.",
    ],
  },
];

const ACHIEVEMENTS = [
  { icon: "⚡", label: "LeetCode Rating", value: "1450+" },
  { icon: "✅", label: "Problems Solved", value: "100+" },
  { icon: "⭐", label: "CodeChef Rating", value: "1-Star" },
  { icon: "🎓", label: "KIIT GPA", value: "7.6 / 10" },
];

// ─── HOOKS ────────────────────────────────────────────────────────────────────

function useIntersection(ref, threshold = 0.12) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return visible;
}

// ─── NAV ─────────────────────────────────────────────────────────────────────

function Nav({ active }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const links = ["Hero", "About", "Experience", "Skills", "Projects", "Contact"];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id) => {
    const target = id === "Hero" ? "hero" : id.toLowerCase();
    document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <>
      <style>{`
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 clamp(1.5rem, 5vw, 4rem); height: 4rem;
          background: ${scrolled ? "rgba(8,8,10,0.94)" : "transparent"};
          backdrop-filter: ${scrolled ? "blur(16px)" : "none"};
          border-bottom: ${scrolled ? "1px solid rgba(99,220,180,0.1)" : "none"};
          transition: background 0.4s, border-color 0.4s;
        }
        .nav-logo {
          font-family: 'Syne', sans-serif; font-size: 1.1rem; font-weight: 800;
          color: var(--accent); letter-spacing: 0.05em; cursor: pointer;
          border: none; background: none; padding: 0;
        }
        .nav-links { display: flex; gap: 2rem; list-style: none; margin: 0; padding: 0; }
        .nav-links button {
          background: none; border: none; color: var(--muted);
          font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase;
          cursor: pointer; padding: 0.25rem 0; position: relative;
          transition: color 0.2s; font-family: 'Syne', sans-serif; font-weight: 600;
        }
        .nav-links button::after {
          content: ''; position: absolute; bottom: -2px; left: 0; right: 0; height: 1.5px;
          background: var(--accent); transform: scaleX(0); transform-origin: left;
          transition: transform 0.25s ease;
        }
        .nav-links button:hover, .nav-links button.active { color: var(--fg); }
        .nav-links button:hover::after, .nav-links button.active::after { transform: scaleX(1); }
        .nav-hamburger {
          display: none; background: none; border: none; cursor: pointer;
          color: var(--fg); font-size: 1.4rem; padding: 0;
        }
        .nav-drawer {
          position: fixed; inset: 0; z-index: 99; background: rgba(8,8,10,0.98);
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 2rem; transform: translateX(100%); transition: transform 0.35s ease;
        }
        .nav-drawer.open { transform: translateX(0); }
        .nav-drawer button {
          background: none; border: none; color: var(--fg);
          font-family: 'Syne', sans-serif; font-size: 2rem;
          font-weight: 800; cursor: pointer; padding: 0; transition: color 0.2s;
        }
        .nav-drawer button:hover { color: var(--accent); }
        @media (max-width: 700px) {
          .nav-links { display: none; }
          .nav-hamburger { display: block; }
        }
      `}</style>
      <nav className="nav">
        <button className="nav-logo" onClick={() => scrollTo("Hero")}>HS</button>
        <ul className="nav-links">
          {links.map((l) => (
            <li key={l}>
              <button
                className={active === l.toLowerCase() ? "active" : ""}
                onClick={() => scrollTo(l)}
              >{l}</button>
            </li>
          ))}
        </ul>
        <button className="nav-hamburger" onClick={() => setOpen(!open)}>
          {open ? "✕" : "☰"}
        </button>
      </nav>
      <div className={`nav-drawer ${open ? "open" : ""}`}>
        {links.map((l) => (
          <button key={l} onClick={() => scrollTo(l)}>{l}</button>
        ))}
      </div>
    </>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

const PHOTO_URLS = [
  "https://lh3.googleusercontent.com/d/1ucrBdUvkF3cUw8BbYopLPlJ9F8b_7nCU=w400",
  "https://drive.google.com/thumbnail?id=1ucrBdUvkF3cUw8BbYopLPlJ9F8b_7nCU&sz=w400",
  "https://drive.google.com/uc?export=view&id=1ucrBdUvkF3cUw8BbYopLPlJ9F8b_7nCU",
];

function Hero() {
  const [photoIdx, setPhotoIdx] = useState(0);
  const imgError = photoIdx >= PHOTO_URLS.length;

  return (
    <>
      <style>{`
        #hero {
          min-height: 100vh; display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: clamp(6rem, 15vw, 10rem) clamp(1.5rem, 8vw, 6rem) clamp(4rem, 8vw, 6rem);
          text-align: center; position: relative; overflow: hidden;
        }
        .hero-noise {
          position: absolute; inset: 0; opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 200px;
        }
        .hero-orb {
          position: absolute; border-radius: 50%; pointer-events: none;
        }
        .hero-orb-1 {
          width: 600px; height: 600px;
          top: -100px; left: 50%; transform: translateX(-50%);
          background: radial-gradient(circle, rgba(99,220,180,0.07) 0%, transparent 65%);
        }
        .hero-orb-2 {
          width: 400px; height: 400px;
          bottom: 0; right: -100px;
          background: radial-gradient(circle, rgba(255,200,80,0.05) 0%, transparent 65%);
        }
        .hero-avatar-wrap {
          position: relative; margin: 0 auto 2.5rem; width: 130px; height: 130px;
          animation: floatAvatar 5s ease-in-out infinite;
        }
        .hero-avatar-ring {
          position: absolute; inset: -6px; border-radius: 50%;
          background: conic-gradient(var(--accent) 0deg, var(--green) 120deg, transparent 200deg);
          animation: spinRing 6s linear infinite;
        }
        @keyframes spinRing { to { transform: rotate(360deg); } }
        .hero-avatar {
          width: 130px; height: 130px; border-radius: 50%;
          background: linear-gradient(135deg, #1a1f1e, #111817);
          border: 3px solid #0a0a0c;
          display: flex; align-items: center; justify-content: center;
          font-size: 3rem; position: relative; overflow: hidden;
        }
        .hero-avatar img {
          width: 100%; height: 100%; object-fit: cover; border-radius: 50%;
        }
        .hero-avatar-fallback { font-size: 3rem; }
        @keyframes floatAvatar {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .hero-status {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.35rem 1rem; border: 1px solid rgba(99,220,180,0.3);
          background: rgba(99,220,180,0.06); border-radius: 100px;
          font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--green); margin-bottom: 1.5rem;
          animation: fadeUp 0.6s ease both;
        }
        .hero-status-dot {
          width: 6px; height: 6px; border-radius: 50%; background: var(--green);
          box-shadow: 0 0 6px var(--green); animation: pulse 2s ease infinite;
        }
        @keyframes pulse { 0%,100%{opacity:1;} 50%{opacity:0.4;} }
        .hero-name {
          font-family: 'Syne', sans-serif; font-size: clamp(3rem, 9vw, 6.5rem);
          font-weight: 800; line-height: 1.0; letter-spacing: -0.03em;
          background: linear-gradient(140deg, #fff 30%, rgba(99,220,180,0.9) 70%, rgba(255,200,80,0.8) 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text; animation: fadeUp 0.7s 0.1s ease both;
        }
        .hero-tagline {
          font-size: clamp(0.78rem, 1.8vw, 0.9rem);
          letter-spacing: 0.15em; text-transform: uppercase;
          color: var(--muted); margin: 1.2rem 0 1.5rem;
          animation: fadeUp 0.7s 0.2s ease both;
        }
        .hero-intro {
          max-width: 580px; margin: 0 auto 2rem;
          color: var(--muted); line-height: 1.85;
          font-size: clamp(0.95rem, 2vw, 1.05rem);
          animation: fadeUp 0.7s 0.3s ease both;
        }
        .hero-location {
          display: flex; align-items: center; justify-content: center; gap: 0.5rem;
          font-size: 0.78rem; color: rgba(255,255,255,0.3); margin-bottom: 2rem;
          animation: fadeUp 0.7s 0.35s ease both;
        }
        .hero-btns {
          display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;
          animation: fadeUp 0.7s 0.4s ease both;
        }
        .btn-primary {
          padding: 0.9rem 2.4rem; background: var(--green); color: #08100e;
          font-weight: 700; font-size: 0.82rem; letter-spacing: 0.1em; text-transform: uppercase;
          border: none; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;
          font-family: 'Syne', sans-serif;
          clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(99,220,180,0.3); }
        .btn-ghost {
          padding: 0.9rem 2.4rem; background: transparent; color: var(--fg);
          font-weight: 600; font-size: 0.82rem; letter-spacing: 0.1em; text-transform: uppercase;
          border: 1px solid rgba(255,255,255,0.15); cursor: pointer;
          transition: border-color 0.2s, color 0.2s, transform 0.2s;
          text-decoration: none; display: inline-flex; align-items: center;
          font-family: 'Syne', sans-serif;
        }
        .btn-ghost:hover { border-color: var(--green); color: var(--green); transform: translateY(-2px); }
        .hero-scroll {
          position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
          color: var(--muted); font-size: 0.62rem; letter-spacing: 0.15em; text-transform: uppercase;
          animation: fadeUp 1s 0.8s ease both;
        }
        .hero-scroll-line {
          width: 1px; height: 40px;
          background: linear-gradient(to bottom, var(--green), transparent);
          animation: scrollPulse 2s ease-in-out infinite;
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; height: 40px; }
          50% { opacity: 1; height: 60px; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <section id="hero">
        <div className="hero-noise" />
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />

        <div className="hero-avatar-wrap">
          <div className="hero-avatar-ring" />
          <div className="hero-avatar">
            {!imgError ? (
              <img
                src={PHOTO_URLS[photoIdx]}
                alt="Harshit Shah"
                onError={() => setPhotoIdx(i => i + 1)}
              />
            ) : (
              <span className="hero-avatar-fallback">👨‍💻</span>
            )}
          </div>
        </div>

        <div className="hero-status">
          <span className="hero-status-dot" />
          Open to Internships & Collabs
        </div>

        <h1 className="hero-name">{PROFILE.name}</h1>
        <p className="hero-tagline">{PROFILE.tagline}</p>
        <p className="hero-intro">{PROFILE.intro}</p>
        <div className="hero-location">
          <span>📍</span>
          <span>{PROFILE.location}</span>
        </div>

        <div className="hero-btns">
          <button
            className="btn-primary"
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
          >View Projects →</button>
          <a className="btn-ghost" href={PROFILE.github} target="_blank" rel="noopener noreferrer">
            GitHub ↗
          </a>
        </div>

        <div className="hero-scroll">
          <div className="hero-scroll-line" />
          scroll
        </div>
      </section>
    </>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────

function About() {
  const ref = useRef(null);
  const visible = useIntersection(ref);

  const interests = [
    { icon: "🤖", label: "AI & NLP Systems" },
    { icon: "🌐", label: "Full-Stack Web Dev" },
    { icon: "🚀", label: "Startup Building" },
    { icon: "🧩", label: "Problem Solving" },
  ];

  return (
    <>
      <style>{`
        #about { padding: var(--section-pad); max-width: 1100px; margin: 0 auto; }
        .about-grid {
          display: grid; grid-template-columns: 1.1fr 1fr; gap: 5rem; align-items: start;
        }
        .about-text p { color: var(--muted); line-height: 1.95; margin-bottom: 1.3rem; font-size: 1rem; }
        .about-text strong { color: var(--fg); font-weight: 600; }
        .about-text .highlight { color: var(--green); }
        .interests-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.85rem; }
        .interest-card {
          padding: 1.4rem 1.2rem;
          border: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.02);
          transition: border-color 0.3s, background 0.3s, transform 0.25s;
          cursor: default;
        }
        .interest-card:hover {
          border-color: rgba(99,220,180,0.3);
          background: rgba(99,220,180,0.04);
          transform: translateY(-3px);
        }
        .interest-icon { font-size: 1.5rem; display: block; margin-bottom: 0.5rem; }
        .interest-label { font-size: 0.83rem; font-weight: 600; color: var(--fg); font-family: 'Syne', sans-serif; }
        .about-meta {
          margin-top: 2rem; padding-top: 2rem;
          border-top: 1px solid rgba(255,255,255,0.06);
          display: flex; gap: 2rem; flex-wrap: wrap;
        }
        .meta-item { display: flex; flex-direction: column; gap: 0.2rem; }
        .meta-label { font-size: 0.65rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); }
        .meta-value { font-size: 0.9rem; color: var(--fg); font-weight: 600; }
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr; gap: 3rem; }
        }
        @media (max-width: 480px) {
          .interests-grid { grid-template-columns: 1fr 1fr; gap: 0.6rem; }
        }
      `}</style>
      <section id="about" ref={ref}>
        <SectionLabel label="About Me" />
        <div
          className="about-grid"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div className="about-text">
            <p>
              I'm <strong>Harshit Shah</strong>, a 3rd-year B.Tech CSE student at KIIT University with a{" "}
              <span className="highlight">GPA of 7.6</span>. I build software that actually ships — from
              AI tools used by real users to a local marketplace serving my home city of Biratnagar.
            </p>
            <p>
              My stack spans <strong>React, FastAPI, Node.js, and Python</strong>, with a growing focus
              on NLP and agentic AI systems. I led website development for the Elabs Society at KIIT,
              building a dynamic, API-connected platform for the entire student community.
            </p>
            <p>
              I believe the best software solves real problems close to home — and I'm always looking
              for opportunities to build, collaborate, and learn something new.
            </p>
            <div className="about-meta">
              <div className="meta-item">
                <span className="meta-label">University</span>
                <span className="meta-value">KIIT, Bhubaneswar</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Degree</span>
                <span className="meta-value">B.Tech CSE · 2027</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Email</span>
                <span className="meta-value">shahharshit226@gmail.com</span>
              </div>
            </div>
          </div>
          <div>
            <p style={{ fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--green)", marginBottom: "1.2rem", fontFamily: "'Syne', sans-serif", fontWeight: "700" }}>
              Core Interests
            </p>
            <div className="interests-grid">
              {interests.map((i) => (
                <div className="interest-card" key={i.label}>
                  <span className="interest-icon">{i.icon}</span>
                  <span className="interest-label">{i.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── EXPERIENCE ───────────────────────────────────────────────────────────────

function Experience() {
  const ref = useRef(null);
  const visible = useIntersection(ref);

  return (
    <>
      <style>{`
        #experience {
          padding: var(--section-pad);
          background: rgba(255,255,255,0.015);
        }
        .exp-inner { max-width: 1100px; margin: 0 auto; }
        .exp-grid { display: grid; gap: 1.5rem; }
        .exp-card {
          padding: 2rem 2.25rem;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(8,8,10,0.5);
          display: grid; grid-template-columns: auto 1fr; gap: 0 2rem;
          position: relative; overflow: hidden;
          transition: border-color 0.3s;
        }
        .exp-card::before {
          content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
          background: linear-gradient(to bottom, var(--green), var(--accent));
        }
        .exp-card:hover { border-color: rgba(99,220,180,0.2); }
        .exp-period {
          font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--green); white-space: nowrap; padding-top: 0.2rem;
          font-family: 'Syne', sans-serif; font-weight: 700;
        }
        .exp-role {
          font-family: 'Syne', sans-serif; font-size: 1.1rem;
          font-weight: 700; color: var(--fg); margin-bottom: 0.2rem;
        }
        .exp-org { font-size: 0.85rem; color: var(--muted); margin-bottom: 1rem; }
        .exp-points { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.5rem; }
        .exp-points li {
          font-size: 0.9rem; color: var(--muted); padding-left: 1.2rem;
          position: relative; line-height: 1.7;
        }
        .exp-points li::before {
          content: '→'; position: absolute; left: 0; color: var(--green); font-size: 0.75rem;
        }
        .achievements-row {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-top: 2rem;
        }
        .ach-card {
          padding: 1.5rem 1.25rem; text-align: center;
          border: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.02);
          transition: border-color 0.3s, transform 0.25s;
        }
        .ach-card:hover { border-color: rgba(255,200,80,0.3); transform: translateY(-3px); }
        .ach-icon { font-size: 1.6rem; display: block; margin-bottom: 0.5rem; }
        .ach-value {
          font-family: 'Syne', sans-serif; font-size: 1.5rem;
          font-weight: 800; color: var(--accent); display: block; margin-bottom: 0.2rem;
        }
        .ach-label { font-size: 0.72rem; color: var(--muted); letter-spacing: 0.06em; }
        @media (max-width: 640px) {
          .exp-card { grid-template-columns: 1fr; gap: 0.5rem; }
          .achievements-row { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
      <section id="experience" ref={ref}>
        <div className="exp-inner">
          <SectionLabel label="Experience & Achievements" />
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(32px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            <div className="exp-grid">
              {EXPERIENCE.map((e, i) => (
                <div className="exp-card" key={i}>
                  <span className="exp-period">{e.period}</span>
                  <div>
                    <div className="exp-role">{e.role}</div>
                    <div className="exp-org">{e.org}</div>
                    <ul className="exp-points">
                      {e.points.map((p, j) => <li key={j}>{p}</li>)}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            <div className="achievements-row">
              {ACHIEVEMENTS.map((a) => (
                <div className="ach-card" key={a.label}>
                  <span className="ach-icon">{a.icon}</span>
                  <span className="ach-value">{a.value}</span>
                  <span className="ach-label">{a.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── SKILLS ───────────────────────────────────────────────────────────────────

function Skills() {
  const ref = useRef(null);
  const visible = useIntersection(ref);
  return (
    <>
      <style>{`
        #skills { padding: var(--section-pad); }
        .skills-inner { max-width: 1100px; margin: 0 auto; }
        .skills-grid {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.25rem;
        }
        .skill-card {
          padding: 2rem 1.75rem;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(8,8,10,0.6);
          transition: border-color 0.3s, box-shadow 0.3s, transform 0.25s;
        }
        .skill-card:hover {
          border-color: rgba(99,220,180,0.2);
          box-shadow: 0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(99,220,180,0.06);
          transform: translateY(-3px);
        }
        .skill-header {
          display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.5rem;
        }
        .skill-icon { font-size: 1.4rem; }
        .skill-cat {
          font-size: 0.68rem; letter-spacing: 0.16em; text-transform: uppercase;
          color: var(--green); font-weight: 700; font-family: 'Syne', sans-serif;
        }
        .skill-tags { display: flex; flex-wrap: wrap; gap: 0.45rem; }
        .skill-tag {
          padding: 0.28rem 0.7rem;
          border: 1px solid rgba(255,255,255,0.1);
          font-size: 0.77rem; color: var(--muted);
          transition: border-color 0.2s, color 0.2s, background 0.2s;
          cursor: default;
        }
        .skill-card:hover .skill-tag {
          border-color: rgba(99,220,180,0.2); color: var(--fg);
        }
      `}</style>
      <section id="skills" ref={ref}>
        <div className="skills-inner">
          <SectionLabel label="Skills" />
          <div className="skills-grid">
            {SKILLS.map((s, i) => (
              <div
                key={s.category}
                className="skill-card"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(32px)",
                  transition: `opacity 0.6s ${i * 0.1}s ease, transform 0.6s ${i * 0.1}s ease`,
                }}
              >
                <div className="skill-header">
                  <span className="skill-icon">{s.icon}</span>
                  <span className="skill-cat">{s.category}</span>
                </div>
                <div className="skill-tags">
                  {s.items.map((item) => (
                    <span className="skill-tag" key={item}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// ─── PROJECTS ─────────────────────────────────────────────────────────────────

function Projects() {
  const ref = useRef(null);
  const visible = useIntersection(ref);
  return (
    <>
      <style>{`
        #projects {
          padding: var(--section-pad);
          background: rgba(255,255,255,0.012);
        }
        .projects-inner { max-width: 1100px; margin: 0 auto; }
        .projects-grid {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;
        }
        .project-card {
          padding: 2rem;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(8,8,10,0.5);
          display: flex; flex-direction: column; gap: 0.85rem;
          transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
          position: relative; overflow: hidden;
        }
        .project-card.startup-card {
          border-color: rgba(255,200,80,0.15);
          background: rgba(255,200,80,0.02);
        }
        .project-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, var(--green), var(--accent), transparent);
          transform: scaleX(0); transform-origin: left; transition: transform 0.4s ease;
        }
        .project-card.startup-card::before {
          background: linear-gradient(90deg, var(--accent), transparent);
          transform: scaleX(1);
        }
        .project-card:hover { border-color: rgba(99,220,180,0.25); transform: translateY(-6px); box-shadow: 0 20px 60px rgba(0,0,0,0.5); }
        .project-card:hover::before { transform: scaleX(1); }
        .project-badge {
          font-size: 0.65rem; letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--green); font-family: 'Syne', sans-serif; font-weight: 700;
        }
        .startup-card .project-badge { color: var(--accent); }
        .project-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.2rem; font-weight: 700; line-height: 1.3; color: var(--fg);
        }
        .project-subtitle {
          font-size: 0.77rem; color: var(--muted); letter-spacing: 0.05em;
          margin-top: -0.4rem;
        }
        .project-desc { color: var(--muted); font-size: 0.88rem; line-height: 1.75; flex: 1; }
        .project-highlights {
          display: flex; flex-direction: column; gap: 0.3rem;
        }
        .project-highlight {
          font-size: 0.78rem; color: rgba(255,255,255,0.5);
          display: flex; align-items: center; gap: 0.45rem;
        }
        .project-highlight::before { content: '✓'; color: var(--green); font-size: 0.7rem; }
        .startup-card .project-highlight::before { color: var(--accent); }
        .project-tech { display: flex; flex-wrap: wrap; gap: 0.35rem; }
        .tech-badge {
          padding: 0.2rem 0.6rem; font-size: 0.68rem; letter-spacing: 0.06em;
          background: rgba(99,220,180,0.06); color: var(--green);
          border: 1px solid rgba(99,220,180,0.2);
        }
        .startup-card .tech-badge {
          background: rgba(255,200,80,0.06); color: var(--accent);
          border-color: rgba(255,200,80,0.2);
        }
        .project-links { display: flex; gap: 0.65rem; margin-top: auto; }
        .link-btn {
          padding: 0.5rem 1rem; font-size: 0.72rem; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase; text-decoration: none;
          transition: all 0.2s; border: 1px solid; cursor: pointer;
          font-family: 'Syne', sans-serif;
        }
        .link-github { border-color: rgba(255,255,255,0.15); color: var(--muted); background: transparent; }
        .link-github:hover { border-color: var(--fg); color: var(--fg); }
        .link-demo { border-color: var(--green); color: var(--green); background: transparent; }
        .link-demo:hover { background: var(--green); color: #08100e; }
        .startup-card .link-demo { border-color: var(--accent); color: var(--accent); }
        .startup-card .link-demo:hover { background: var(--accent); color: #0a0a0c; }
      `}</style>
      <section id="projects" ref={ref}>
        <div className="projects-inner">
          <SectionLabel label="Projects" />
          <div className="projects-grid">
            {PROJECTS.map((p, i) => (
              <div
                key={p.id}
                className={`project-card${p.isStartup ? " startup-card" : ""}`}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(40px)",
                  transition: `opacity 0.6s ${i * 0.12}s ease, transform 0.6s ${i * 0.12}s ease`,
                }}
              >
                <span className="project-badge">{p.badge}</span>
                <h3 className="project-title">{p.title}</h3>
                <p className="project-subtitle">{p.subtitle}</p>
                <p className="project-desc">{p.description}</p>
                <div className="project-highlights">
                  {p.highlights.map((h) => (
                    <div className="project-highlight" key={h}>{h}</div>
                  ))}
                </div>
                <div className="project-tech">
                  {p.tech.map((t) => <span className="tech-badge" key={t}>{t}</span>)}
                </div>
                <div className="project-links">
                  {p.github && (
                    <a className="link-btn link-github" href={p.github} target="_blank" rel="noopener noreferrer">
                      GitHub ↗
                    </a>
                  )}
                  {p.demo && (
                    <a className="link-btn link-demo" href={p.demo} target="_blank" rel="noopener noreferrer">
                      Live Demo ↗
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <a
              href={PROFILE.github} target="_blank" rel="noopener noreferrer"
              style={{
                display: "inline-flex", padding: "0.9rem 2.5rem",
                border: "1px solid rgba(99,220,180,0.25)", color: "var(--green)",
                textDecoration: "none", letterSpacing: "0.1em", fontSize: "0.78rem",
                fontWeight: "700", textTransform: "uppercase",
                transition: "all 0.2s", fontFamily: "'Syne', sans-serif",
              }}
              onMouseEnter={e => { e.target.style.background = "rgba(99,220,180,0.06)"; e.target.style.borderColor = "rgba(99,220,180,0.5)"; }}
              onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.borderColor = "rgba(99,220,180,0.25)"; }}
            >
              View All on GitHub ↗
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────

function Contact() {
  const ref = useRef(null);
  const visible = useIntersection(ref);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = `mailto:${PROFILE.email}?subject=Portfolio Contact from ${form.name}&body=${encodeURIComponent(form.message)}%0A%0AFrom: ${form.name}%0AEmail: ${form.email}`;
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <>
      <style>{`
        #contact {
          padding: var(--section-pad);
          background: rgba(255,255,255,0.015);
        }
        .contact-inner { max-width: 1000px; margin: 0 auto; }
        .contact-grid {
          display: grid; grid-template-columns: 1fr 1.4fr; gap: 5rem; align-items: start;
        }
        .contact-info h3 {
          font-family: 'Syne', sans-serif;
          font-size: 1.9rem; font-weight: 800; margin-bottom: 1rem; line-height: 1.2;
        }
        .contact-info p { color: var(--muted); line-height: 1.8; margin-bottom: 2rem; font-size: 0.95rem; }
        .social-links { display: flex; flex-direction: column; gap: 0; }
        .social-link {
          display: flex; align-items: center; gap: 0.85rem;
          color: var(--muted); text-decoration: none; font-size: 0.86rem;
          transition: color 0.2s, padding-left 0.2s; padding: 0.75rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          font-family: 'Syne', sans-serif;
        }
        .social-link:hover { color: var(--green); padding-left: 0.4rem; }
        .social-link-icon { font-size: 1rem; width: 1.2rem; text-align: center; }
        .form-group { display: flex; flex-direction: column; gap: 0.4rem; margin-bottom: 1.1rem; }
        .form-group label {
          font-size: 0.65rem; letter-spacing: 0.16em; text-transform: uppercase;
          color: var(--green); font-family: 'Syne', sans-serif; font-weight: 700;
        }
        .form-group input, .form-group textarea {
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08);
          color: var(--fg); padding: 0.85rem 1rem; font-size: 0.9rem;
          outline: none; resize: vertical; font-family: 'DM Sans', sans-serif;
          transition: border-color 0.2s, background 0.2s;
        }
        .form-group input:focus, .form-group textarea:focus {
          border-color: var(--green); background: rgba(99,220,180,0.02);
        }
        .form-group textarea { min-height: 130px; }
        .form-submit {
          width: 100%; padding: 1rem; background: var(--green); color: #08100e;
          font-family: 'Syne', sans-serif; font-weight: 700; font-size: 0.82rem;
          letter-spacing: 0.12em; text-transform: uppercase; border: none; cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s; clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
        }
        .form-submit:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(99,220,180,0.25); }
        .form-success {
          padding: 0.85rem 1.25rem; background: rgba(99,220,180,0.08);
          border: 1px solid rgba(99,220,180,0.3); color: var(--green);
          font-size: 0.85rem; margin-top: 0.75rem;
        }
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr; gap: 3rem; }
        }
      `}</style>
      <section id="contact" ref={ref}>
        <div className="contact-inner">
          <SectionLabel label="Contact" />
          <div
            className="contact-grid"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(32px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            <div className="contact-info">
              <h3>Let's Build Something Together</h3>
              <p>Open to internships, freelance projects, and startup collaborations. Whether it's AI, web, or a new idea — let's talk.</p>
              <div className="social-links">
                <a className="social-link" href={PROFILE.github} target="_blank" rel="noopener noreferrer">
                  <span className="social-link-icon">⌥</span> <span>GitHub</span>
                </a>
                <a className="social-link" href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">
                  <span className="social-link-icon">◫</span> <span>LinkedIn</span>
                </a>
                <a className="social-link" href={`mailto:${PROFILE.email}`}>
                  <span className="social-link-icon">✉</span> <span>{PROFILE.email}</span>
                </a>
                <a className="social-link" href={`tel:${PROFILE.phone}`}>
                  <span className="social-link-icon">📞</span> <span>+91 {PROFILE.phone}</span>
                </a>
                <a className="social-link" href="https://resalebrt.com" target="_blank" rel="noopener noreferrer">
                  <span className="social-link-icon">🚀</span> <span>ResaleBrt — My Startup</span>
                </a>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text" required placeholder="Your Name"
                  value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email" required placeholder="your@email.com"
                  value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea
                  required placeholder="What's on your mind?"
                  value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </div>
              <button type="submit" className="form-submit">
                Send Message →
              </button>
              {sent && <div className="form-success">✓ Opening your mail client… Talk soon!</div>}
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── SHARED ───────────────────────────────────────────────────────────────────

function SectionLabel({ label }) {
  return (
    <div style={{ marginBottom: "3rem", display: "flex", alignItems: "center", gap: "1rem" }}>
      <span style={{ display: "block", width: "32px", height: "1.5px", background: "var(--green)" }} />
      <span style={{ fontSize: "0.66rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--green)", fontWeight: "700", fontFamily: "'Syne', sans-serif" }}>{label}</span>
    </div>
  );
}

function Footer() {
  return (
    <>
      <style>{`
        footer {
          padding: 2.5rem clamp(1.5rem, 5vw, 4rem);
          border-top: 1px solid rgba(255,255,255,0.05);
          display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;
        }
        .footer-copy { font-size: 0.75rem; color: var(--muted); }
        .footer-copy span { color: var(--green); }
        .footer-social { display: flex; gap: 1.5rem; }
        .footer-social a {
          color: var(--muted); text-decoration: none; font-size: 0.75rem;
          letter-spacing: 0.08em; transition: color 0.2s; font-family: 'Syne', sans-serif;
        }
        .footer-social a:hover { color: var(--green); }
      `}</style>
      <footer>
        <p className="footer-copy">
          © {new Date().getFullYear()} <span>{PROFILE.name}</span>. Built with React.
        </p>
        <div className="footer-social">
          <a href={PROFILE.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://resalebrt.com" target="_blank" rel="noopener noreferrer">ResaleBrt</a>
          <a href={`mailto:${PROFILE.email}`}>Email</a>
        </div>
      </footer>
    </>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const sections = ["hero", "about", "experience", "skills", "projects", "contact"];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActiveSection(id); },
        { threshold: 0.35 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #08080a;
          --fg: #eeeeed;
          --muted: #7a7a82;
          --accent: #f5c842;
          --green: #63dcb4;
          --section-pad: clamp(5rem, 12vw, 9rem) clamp(1.5rem, 8vw, 6rem);
        }

        html { scroll-behavior: smooth; }

        body {
          background: var(--bg); color: var(--fg);
          font-family: 'DM Sans', sans-serif;
          font-size: 16px; line-height: 1.6;
          -webkit-font-smoothing: antialiased;
        }

        ::selection { background: rgba(99,220,180,0.2); }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: var(--bg); }
        ::-webkit-scrollbar-thumb { background: rgba(99,220,180,0.25); border-radius: 2px; }
      `}</style>
      <Nav active={activeSection} />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}