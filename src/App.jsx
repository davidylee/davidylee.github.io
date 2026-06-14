import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Projects", "Blog", "Twitch", "Mentoring", "Contact"];

const PROJECTS = [
  {
    title: "Project Alpha",
    description: "A placeholder for your first project. Describe what it does, what problem it solves, and what tech you used.",
    tags: ["Go", "Kubernetes", "AWS"],
    link: "#",
  },
  {
    title: "Project Beta",
    description: "A placeholder for your second project. Highlight architecture decisions or interesting engineering challenges.",
    tags: ["Terraform", "Envoy", "gRPC"],
    link: "#",
  },
  {
    title: "Project Gamma",
    description: "A placeholder for your third project. What did you build, and what would you do differently?",
    tags: ["Python", "Docker", "CI/CD"],
    link: "#",
  },
];

const BLOG_POSTS = [
  { title: "Placeholder Post One", date: "Coming soon", excerpt: "A post about something you found interesting while building infrastructure." },
  { title: "Placeholder Post Two", date: "Coming soon", excerpt: "Lessons learned from a production incident, a new tool, or a tricky debugging session." },
];

function useActiveSection() {
  const [active, setActive] = useState("about");
  useEffect(() => {
    const sections = NAV_LINKS.map(n => document.getElementById(n.toLowerCase()));
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach(s => s && obs.observe(s));
    return () => obs.disconnect();
  }, []);
  return active;
}

function Cursor() {
  const [on, setOn] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setOn(v => !v), 530);
    return () => clearInterval(t);
  }, []);
  return (
    <span style={{
      display: "inline-block", width: "2px", height: "1em",
      background: on ? "#06B6D4" : "transparent",
      marginLeft: "4px", verticalAlign: "text-bottom",
      transition: "background 0.1s"
    }} aria-hidden="true" />
  );
}

function Tag({ label }) {
  return (
    <span style={{
      fontSize: "11px", fontFamily: "'JetBrains Mono', monospace",
      padding: "3px 8px", borderRadius: "4px",
      background: "rgba(110,86,207,0.15)", color: "#67E8F9",
      border: "1px solid rgba(110,86,207,0.3)", letterSpacing: "0.03em"
    }}>{label}</span>
  );
}

function Section({ id, children }) {
  return (
    <section id={id} style={{ padding: "80px 0", borderBottom: "1px solid #21262D" }}>
      {children}
    </section>
  );
}

function SectionLabel({ text }) {
  return (
    <p style={{
      fontFamily: "'JetBrains Mono', monospace", fontSize: "12px",
      color: "#06B6D4", letterSpacing: "0.12em", textTransform: "uppercase",
      marginBottom: "32px"
    }}>// {text}</p>
  );
}

export default function App() {
  const active = useActiveSection();
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const styles = {
    root: {
      background: "#0D1117", color: "#E6EDF3", minHeight: "100vh",
      fontFamily: "'Inter', sans-serif", fontSize: "16px", lineHeight: "1.7",
    },
    nav: {
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: "rgba(13,17,23,0.85)", backdropFilter: "blur(12px)",
      borderBottom: "1px solid #21262D",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 clamp(24px, 5vw, 80px)", height: "60px",
    },
    navName: {
      fontFamily: "'JetBrains Mono', monospace", fontSize: "14px",
      color: "#E6EDF3", fontWeight: 500, cursor: "pointer", letterSpacing: "-0.01em"
    },
    navLinks: {
      display: "flex", gap: "32px", listStyle: "none", margin: 0, padding: 0,
    },
    navLink: (isActive) => ({
      fontFamily: "'JetBrains Mono', monospace", fontSize: "13px",
      color: isActive ? "#06B6D4" : "#8B949E",
      cursor: "pointer", transition: "color 0.2s",
      textDecoration: "none", letterSpacing: "0.02em",
      borderBottom: isActive ? "1px solid #06B6D4" : "1px solid transparent",
      paddingBottom: "2px"
    }),
    main: { maxWidth: "720px", margin: "0 auto", padding: "0 clamp(24px, 5vw, 40px)" },
    hero: {
      padding: "140px 0 80px", borderBottom: "1px solid #21262D",
    },
    heroEyebrow: {
      fontFamily: "'JetBrains Mono', monospace", fontSize: "13px",
      color: "#06B6D4", letterSpacing: "0.1em", marginBottom: "20px"
    },
    heroName: {
      fontSize: "clamp(36px, 6vw, 52px)", fontWeight: 600,
      letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "20px",
      fontFamily: "'JetBrains Mono', monospace", color: "#E6EDF3"
    },
    heroTagline: {
      fontSize: "18px", color: "#8B949E", maxWidth: "520px",
      lineHeight: 1.6, marginBottom: "36px"
    },
    heroCta: {
      display: "flex", gap: "16px", flexWrap: "wrap"
    },
    btnPrimary: {
      padding: "10px 22px", borderRadius: "6px",
      background: "#06B6D4", color: "#fff", border: "none",
      fontSize: "14px", fontFamily: "'JetBrains Mono', monospace",
      cursor: "pointer", letterSpacing: "0.02em", transition: "opacity 0.2s"
    },
    btnSecondary: {
      padding: "10px 22px", borderRadius: "6px",
      background: "transparent", color: "#8B949E",
      border: "1px solid #30363D", fontSize: "14px",
      fontFamily: "'JetBrains Mono', monospace",
      cursor: "pointer", letterSpacing: "0.02em", transition: "border-color 0.2s, color 0.2s"
    },
    h2: { fontSize: "22px", fontWeight: 600, letterSpacing: "-0.02em", marginBottom: "16px", color: "#E6EDF3" },
    body: { color: "#8B949E", lineHeight: 1.7 },
    card: {
      background: "#161B22", border: "1px solid #21262D", borderRadius: "8px",
      padding: "24px", marginBottom: "16px", transition: "border-color 0.2s"
    },
    cardTitle: { fontSize: "16px", fontWeight: 600, color: "#E6EDF3", marginBottom: "8px" },
    cardMeta: { fontSize: "12px", fontFamily: "'JetBrains Mono', monospace", color: "#06B6D4", marginBottom: "8px" },
    cardBody: { fontSize: "14px", color: "#8B949E", marginBottom: "16px", lineHeight: 1.6 },
    tags: { display: "flex", gap: "8px", flexWrap: "wrap" },
    contactLink: {
      display: "block", padding: "14px 0", borderBottom: "1px solid #21262D",
      fontSize: "14px", color: "#8B949E", textDecoration: "none",
      fontFamily: "'JetBrains Mono', monospace", transition: "color 0.2s"
    },
    footer: {
      textAlign: "center", padding: "40px 24px",
      fontSize: "12px", fontFamily: "'JetBrains Mono', monospace",
      color: "#484F58"
    }
  };

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />

      <div style={styles.root}>
        {/* Nav */}
        <nav style={styles.nav}>
          <span style={styles.navName} onClick={() => scrollTo("hero")}>david lee</span>
          <ul style={styles.navLinks}>
            {NAV_LINKS.map(n => (
              <li key={n}>
                <span
                  style={styles.navLink(active === n.toLowerCase())}
                  onClick={() => scrollTo(n.toLowerCase())}
                >{n.toLowerCase()}</span>
              </li>
            ))}
          </ul>
        </nav>

        <div style={styles.main}>
          {/* Hero */}
          <div id="hero" style={styles.hero}>
            <p style={styles.heroEyebrow}>$ whoami</p>
            <h1 style={styles.heroName}>David Young Lee<Cursor /></h1>
            <p style={styles.heroTagline}>
              DevOps/Infrastructure Engineer. I build the systems that let software ship reliably — pipelines, platforms, and the plumbing in between.
            </p>
            <div style={styles.heroCta}>
              <button style={styles.btnPrimary} onClick={() => scrollTo("projects")}>view projects</button>
              <button style={styles.btnSecondary} onClick={() => scrollTo("contact")}>get in touch</button>
            </div>
          </div>

          {/* About */}
          <Section id="about">
            <SectionLabel text="about" />
            <h2 style={styles.h2}>Background</h2>
            <p style={styles.body}>
              I'm a software engineer at CrowdStrike working on infrastructure and platform tooling. My interests span distributed systems, cloud-native architecture, and the developer experience layer — the things that make engineering teams faster.
            </p>
            <p style={{ ...styles.body, marginTop: "16px" }}>
              Outside of work I'm learning Go with an eye toward Rust, and deepening my knowledge of system design. After spending some years in the Bay Area where I originally grew up, I'm relocating to the Seattle area. Other interests include badminton and poker theory.
            </p>
            <div style={{ marginTop: "32px", display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {["Go", "Python", "Terraform", "Kubernetes", "AWS", "Ansible", "Chef", "CI/CD", "Rust (learning)"].map(t => (
                <Tag key={t} label={t} />
              ))}
            </div>
          </Section>

          {/* Projects */}
          <Section id="projects">
            <SectionLabel text="projects" />
            <h2 style={styles.h2}>Things I've built</h2>
            {PROJECTS.map(p => (
              <div key={p.title} style={styles.card}>
                <p style={styles.cardTitle}>{p.title}</p>
                <p style={styles.cardBody}>{p.description}</p>
                <div style={styles.tags}>
                  {p.tags.map(t => <Tag key={t} label={t} />)}
                </div>
              </div>
            ))}
          </Section>

          {/* Blog */}
          <Section id="blog">
            <SectionLabel text="blog" />
            <h2 style={styles.h2}>Writing</h2>
            <p style={{ ...styles.body, marginBottom: "32px" }}>
              Occasional posts on infrastructure, distributed systems, and things I had to figure out the hard way.
            </p>
            {BLOG_POSTS.map(p => (
              <div key={p.title} style={styles.card}>
                <p style={styles.cardMeta}>{p.date}</p>
                <p style={styles.cardTitle}>{p.title}</p>
                <p style={styles.cardBody}>{p.excerpt}</p>
              </div>
            ))}
          </Section>

          {/* Twitch */}
          <Section id="twitch">
            <SectionLabel text="twitch" />
            <div style={{ display: "flex", gap: "32px", alignItems: "flex-start", flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: "260px" }}>
                <p style={styles.body}>
                  Chess was my pandemic discovery. From 2020 to 2021 I ran a stream under the name <span style={{ color: "#67E8F9", fontFamily: "'JetBrains Mono', monospace" }}>KoreanAmericanChessNoob</span> — which was accurate. I played chess, lost a lot of games on stream, and had a good time doing it.
                </p>
                <p style={{ ...styles.body, marginTop: "16px" }}>
                  Not actively streaming anymore, but the channel's still up if you want to watch some highlights.
                </p>
                <a
                  href="https://twitch.tv/koreanamericanchessnoob"
                  target="_blank"
                  rel="noreferrer"
                  style={{ ...styles.contactLink, marginTop: "24px", display: "inline-flex", alignItems: "center" }}
                >
                  <svg viewBox="0 0 24 28" style={{ width: "14px", height: "14px", fill: "#67E8F9", marginRight: "8px", verticalAlign: "middle", flexShrink: 0 }} aria-hidden="true">
                    <path d="M2.149 0L0 6.468v17.532h5.998V28h3.334l3.335-4h4.667l6-6V0H2.149zm19.185 16.667L17.667 20h-5.334l-3.335 4v-4H4V2h17.334v14.667zM13.334 6H15.5v6.5h-2.166V6zm-5.667 0h2.167v6.5H7.667V6z"/>
                  </svg>
                  twitch.tv/koreanamericanchessnoob
                </a>
              </div>
              <img
                src="/emotes/noob.png"
                alt="Noob Here emote"
                style={{ width: "120px", height: "120px", objectFit: "contain", flexShrink: 0 }}
              />
            </div>
          </Section>

          {/* Mentoring */}
          <Section id="mentoring">
            <SectionLabel text="mentoring" />
            <h2 style={styles.h2}>Mentoring</h2>
            <p style={styles.body}>
              I offer 1-on-1 mentoring through MentorCruise for engineers looking to break into DevOps and infrastructure, navigate career growth, or get guidance on cloud and platform tooling.
            </p>
            <a
              href="https://mentorcruise.com/mentor/davidlee/"
              target="_blank"
              rel="noreferrer"
              style={{ ...styles.contactLink, marginTop: "24px", display: "inline-flex", alignItems: "center", gap: "10px" }}
            >
              <svg viewBox="0 0 24 24" style={{ width: "14px", height: "14px", fill: "#67E8F9", flexShrink: 0 }} aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
              </svg>
              mentorcruise.com/mentor/davidlee
            </a>
          </Section>

          {/* Contact */}
          <Section id="contact">
            <SectionLabel text="contact" />
            <h2 style={styles.h2}>Get in touch</h2>
            <p style={{ ...styles.body, marginBottom: "32px" }}>
              I'm not actively looking, but I'm always happy to talk infrastructure, distributed systems, or interesting engineering problems.
            </p>
            <div style={{ ...styles.contactLink, display: "flex", alignItems: "center", gap: "10px" }}>
              <svg viewBox="0 0 24 24" style={{ width: "14px", height: "14px", fill: "#67E8F9", flexShrink: 0 }} aria-hidden="true">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              davidyoungminlee@gmail.com
            </div>
            <a href="https://github.com/davidylee" target="_blank" rel="noreferrer" style={{ ...styles.contactLink, display: "flex", alignItems: "center", gap: "10px" }}>
              <svg viewBox="0 0 24 24" style={{ width: "14px", height: "14px", fill: "#67E8F9", flexShrink: 0 }} aria-hidden="true">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
              github.com/davidylee
            </a>
            <a href="https://linkedin.com/in/davidylee" target="_blank" rel="noreferrer" style={{ ...styles.contactLink, display: "flex", alignItems: "center", gap: "10px" }}>
              <svg viewBox="0 0 24 24" style={{ width: "14px", height: "14px", fill: "#67E8F9", flexShrink: 0 }} aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              linkedin.com/in/davidylee
            </a>
            <a href="https://mentorcruise.com/mentor/davidlee/" target="_blank" rel="noreferrer" style={{ ...styles.contactLink, display: "flex", alignItems: "center", gap: "10px" }}>
              <svg viewBox="0 0 24 24" style={{ width: "14px", height: "14px", fill: "#67E8F9", flexShrink: 0 }} aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
              </svg>
              mentorcruise.com/mentor/davidlee
            </a>
          </Section>
        </div>

        <footer style={styles.footer}>
          <p>david lee · built with react · {new Date().getFullYear()}</p>
        </footer>
      </div>
    </>
  );
}
