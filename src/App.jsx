import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Projects", "Blog", "Contact"];

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
      background: on ? "#6E56CF" : "transparent",
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
      background: "rgba(110,86,207,0.15)", color: "#9D86F0",
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
      color: "#6E56CF", letterSpacing: "0.12em", textTransform: "uppercase",
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
      color: isActive ? "#6E56CF" : "#8B949E",
      cursor: "pointer", transition: "color 0.2s",
      textDecoration: "none", letterSpacing: "0.02em",
      borderBottom: isActive ? "1px solid #6E56CF" : "1px solid transparent",
      paddingBottom: "2px"
    }),
    main: { maxWidth: "720px", margin: "0 auto", padding: "0 clamp(24px, 5vw, 40px)" },
    hero: {
      padding: "140px 0 80px", borderBottom: "1px solid #21262D",
    },
    heroEyebrow: {
      fontFamily: "'JetBrains Mono', monospace", fontSize: "13px",
      color: "#6E56CF", letterSpacing: "0.1em", marginBottom: "20px"
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
      background: "#6E56CF", color: "#fff", border: "none",
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
    cardMeta: { fontSize: "12px", fontFamily: "'JetBrains Mono', monospace", color: "#6E56CF", marginBottom: "8px" },
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
              DevOps & Infrastructure Engineer. I build the systems that let software ship reliably — pipelines, platforms, and the plumbing in between.
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
              Outside of work I'm learning Go with an eye toward Rust, exploring WebAssembly, and thinking about how xDS and Envoy-based control planes fit into modern service meshes. I'm also relocating to the Seattle area, where I'm looking forward to the mountains, the driving roads, and the tech community up there.
            </p>
            <div style={{ marginTop: "32px", display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {["Go", "Python", "Terraform", "Kubernetes", "AWS", "Envoy", "CI/CD", "Rust (learning)"].map(t => (
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

          {/* Contact */}
          <Section id="contact">
            <SectionLabel text="contact" />
            <h2 style={styles.h2}>Get in touch</h2>
            <p style={{ ...styles.body, marginBottom: "32px" }}>
              I'm not actively looking, but I'm always happy to talk infrastructure, distributed systems, or interesting engineering problems.
            </p>
            <div style={styles.contactLink}>→ email &nbsp;&nbsp; davidyoungminlee@gmail.com</div>
            <a href="https://github.com/davidylee" target="_blank" rel="noreferrer" style={styles.contactLink}>
              → github &nbsp;&nbsp; github.com/davidylee
            </a>
            <a href="https://linkedin.com/in/davidylee" target="_blank" rel="noreferrer" style={styles.contactLink}>
              → linkedin &nbsp;&nbsp; linkedin.com/in/davidylee
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
