import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Projects", "Misc", "Mentoring", "Contact"];

const PROJECTS = [
  {
    title: "Counter App",
    description: "A simple shopping cart counter app built in React. Models an online retail cart with add/remove interactions.",
    tags: ["React", "JavaScript", "GitHub Pages"],
    link: "https://davidylee.github.io/counter-app/",
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

function SectionLabel({ text, icon }) {
  return (
    <p style={{
      fontFamily: "'JetBrains Mono', monospace", fontSize: "14px",
      color: "#06B6D4", letterSpacing: "0.12em",
      marginBottom: "32px", display: "flex", alignItems: "center", justifyContent: "center", gap: "4px"
    }}>// {text}{icon && icon}</p>
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
    h2: { fontSize: "18px", fontWeight: 600, letterSpacing: "-0.02em", marginBottom: "16px", color: "#E6EDF3" },
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
          <span style={styles.navName} onClick={() => scrollTo("hero")}>david young lee</span>
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
            <SectionLabel text="about" icon={<img src="/emotes/fork.png" alt="" style={{ width: "22px", height: "22px", objectFit: "contain" }} />} />
            <h2 style={styles.h2}>Background</h2>
            <p style={styles.body}>
              I'm a software engineer at CrowdStrike working on infrastructure and platform tooling. My interests span distributed systems, cloud, and bare-metal infrastructure.
            </p>
            <p style={{ ...styles.body, marginTop: "16px" }}>
              Outside of work I'm learning Go with an eye toward Rust, and deepening my knowledge of system design. After spending some years in the Bay Area where I originally grew up, I'm relocating to the Seattle area. Other interests include badminton and poker theory.
            </p>
            <div style={{ marginTop: "32px", display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {["Go", "Python", "Kubernetes", "AWS", "Terraform", "Ansible", "Chef", "CI/CD", "Rust (learning)"].map(t => (
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
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
                  <div style={styles.tags}>
                    {p.tags.map(t => <Tag key={t} label={t} />)}
                  </div>
                  {p.link !== "#" && (
                    <a href={p.link} target="_blank" rel="noreferrer" style={{ fontSize: "12px", fontFamily: "'JetBrains Mono', monospace", color: "#06B6D4", textDecoration: "none" }}>
                      → view
                    </a>
                  )}
                </div>
              </div>
            ))}
          </Section>


          {/* Misc */}
          <Section id="misc">
            <SectionLabel text="misc" />
            <h2 style={styles.h2}>Side Quests</h2>

            {/* Twitch */}
            <div style={{ marginBottom: "40px" }}>
              <h3 style={{ fontSize: "15px", fontWeight: 600, color: "#C9D1D9", marginBottom: "16px", fontFamily: "'JetBrains Mono', monospace" }}><span style={{ color: "#06B6D4" }}>→</span> twitch <img src="/emotes/noob.png" alt="" style={{ width: "28px", height: "28px", objectFit: "contain", verticalAlign: "middle", marginLeft: "1px" }} /><img src="/badges/tier4-king-white.png" alt="" style={{ width: "22px", height: "22px", objectFit: "contain", verticalAlign: "middle", marginLeft: "6px" }} /></h3>
              <div style={{ display: "flex", gap: "32px", alignItems: "flex-start", flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: "260px" }}>
                  <p style={styles.body}>
                    Chess was my pandemic discovery. From 2020 to 2021 I ran a stream under the name <span style={{ color: "#06B6D4", fontFamily: "'JetBrains Mono', monospace" }}>KoreanAmericanChessNoob</span> — which was accurate. I played chess, lost a lot of games on stream, and had a good time doing it.
                  </p>
                  <p style={{ ...styles.body, marginTop: "16px" }}>
                    Not actively streaming anymore, but the channel's still up if you want to watch some highlights.
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "16px" }}>
                    <a href="https://twitch.tv/koreanamericanchessnoob" target="_blank" rel="noreferrer" style={{ textDecoration: "none", background: "#161B22", border: "1px solid #21262D", borderRadius: "8px", padding: "6px 10px", display: "flex", alignItems: "center", gap: "8px", color: "#67E8F9", fontSize: "13px", fontFamily: "'JetBrains Mono', monospace" }}>
                      <svg viewBox="0 0 24 28" style={{ width: "15px", height: "15px", fill: "#67E8F9", flexShrink: 0 }} aria-hidden="true">
                        <path d="M2.149 0L0 6.468v17.532h5.998V28h3.334l3.335-4h4.667l6-6V0H2.149zm19.185 16.667L17.667 20h-5.334l-3.335 4v-4H4V2h17.334v14.667zM13.334 6H15.5v6.5h-2.166V6zm-5.667 0h2.167v6.5H7.667V6z"/>
                      </svg>
                      twitch.tv/koreanamericanchessnoob
                    </a>
                    <a href="https://www.youtube.com/watch?v=dfOdWtkStQ4&t=0" target="_blank" rel="noreferrer" style={{ textDecoration: "none", background: "#161B22", border: "1px solid #21262D", borderRadius: "8px", padding: "6px 10px", display: "flex", alignItems: "center", gap: "8px", color: "#67E8F9", fontSize: "13px", fontFamily: "'JetBrains Mono', monospace" }}>
                      <svg viewBox="0 0 24 24" style={{ width: "15px", height: "15px", fill: "#67E8F9", flexShrink: 0 }} aria-hidden="true">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                      Chess lesson with IM Eric Rosen
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Badminton */}
            <div style={{ paddingTop: "32px", borderTop: "1px solid #21262D" }}>
              <h3 style={{ fontSize: "15px", fontWeight: 600, color: "#C9D1D9", marginBottom: "16px", fontFamily: "'JetBrains Mono', monospace" }}><span style={{ color: "#06B6D4" }}>→</span> badminton <span style={{ marginLeft: "1px" }}>🏸</span></h3>
              <p style={styles.body}>I play regularly at a local club — it's a good excuse to get off the computer and move around. Mostly doubles, always competitive.</p>
            </div>
          </Section>

          {/* Mentoring */}
          <Section id="mentoring">
            <SectionLabel text="mentoring" />
            <h2 style={styles.h2}>Mentoring</h2>
            <p style={styles.body}>
              I offer 1-on-1 mentoring through MentorCruise for individuals looking to break into DevOps/SRE, navigate career growth, or get guidance on cloud and platform tooling.
            </p>
            <a
              href="https://mentorcruise.com/mentor/davidlee/"
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: "none", marginTop: "16px", background: "#161B22", border: "1px solid #21262D", borderRadius: "8px", padding: "6px 10px", display: "flex", alignItems: "center", gap: "8px", color: "#67E8F9", fontSize: "13px", fontFamily: "'JetBrains Mono', monospace" }}
            >
              <svg viewBox="0 0 30 24" style={{ width: "15px", height: "15px", flexShrink: 0 }} aria-hidden="true">
                <path d="M29.5956 15.5293H0.373168C0.0982521 15.5293 -0.0820411 15.8167 0.0376324 16.0643L1.57906 19.252C1.60241 19.3002 1.65129 19.3309 1.70489 19.3309H28.2639C28.3175 19.3309 28.3664 19.3002 28.3898 19.252L29.9312 16.0643C30.0509 15.8168 29.8706 15.5293 29.5956 15.5293Z" fill="#67E8F9"/>
                <path d="M2.18902 20.5146C3.21986 22.6464 5.37919 24.0008 7.74714 24.0008H22.2203C24.5882 24.0008 26.7475 22.6464 27.7784 20.5146L27.8662 20.3329C27.8961 20.2711 27.8511 20.1992 27.7824 20.1992H2.18507C2.11635 20.1992 2.07129 20.2711 2.10121 20.3329L2.18902 20.5146Z" fill="#67E8F9"/>
                <path d="M14.1973 0.117229L6.36499 14.0093C6.22493 14.2577 6.40444 14.565 6.68963 14.565H14.335C14.4894 14.565 14.6145 14.4399 14.6145 14.2855V0.227441C14.6145 -0.00172937 14.3105 -0.0820223 14.1973 0.117229Z" fill="#67E8F9"/>
                <path d="M23.6734 14.01L15.8411 0.11789L15.838 0.112479C15.7256 -0.0853096 15.4238 -0.00556126 15.4238 0.221873V14.2862C15.4238 14.4406 15.549 14.5657 15.7033 14.5657H23.3487C23.6339 14.5657 23.8135 14.2584 23.6734 14.01Z" fill="#67E8F9"/>
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
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <div style={{ background: "#161B22", border: "1px solid #21262D", borderRadius: "8px", padding: "6px 10px", display: "flex", alignItems: "center", gap: "8px", color: "#67E8F9", fontSize: "13px", fontFamily: "'JetBrains Mono', monospace" }}>
                <svg viewBox="0 0 24 24" style={{ width: "15px", height: "15px", fill: "#67E8F9", flexShrink: 0 }} aria-hidden="true">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                davidyoungminlee@gmail.com
              </div>
              <a href="https://linkedin.com/in/davidylee" target="_blank" rel="noreferrer" style={{ textDecoration: "none", background: "#161B22", border: "1px solid #21262D", borderRadius: "8px", padding: "6px 10px", display: "flex", alignItems: "center", gap: "8px", color: "#67E8F9", fontSize: "13px", fontFamily: "'JetBrains Mono', monospace" }}>
                <svg viewBox="0 0 24 24" style={{ width: "15px", height: "15px", fill: "#67E8F9", flexShrink: 0 }} aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                linkedin.com/in/davidylee
              </a>
              <a href="https://mentorcruise.com/mentor/davidlee/" target="_blank" rel="noreferrer" style={{ textDecoration: "none", background: "#161B22", border: "1px solid #21262D", borderRadius: "8px", padding: "6px 10px", display: "flex", alignItems: "center", gap: "8px", color: "#67E8F9", fontSize: "13px", fontFamily: "'JetBrains Mono', monospace" }}>
                <svg viewBox="0 0 30 24" style={{ width: "15px", height: "15px", flexShrink: 0 }} aria-hidden="true">
                  <path d="M29.5956 15.5293H0.373168C0.0982521 15.5293 -0.0820411 15.8167 0.0376324 16.0643L1.57906 19.252C1.60241 19.3002 1.65129 19.3309 1.70489 19.3309H28.2639C28.3175 19.3309 28.3664 19.3002 28.3898 19.252L29.9312 16.0643C30.0509 15.8168 29.8706 15.5293 29.5956 15.5293Z" fill="#67E8F9"/>
                  <path d="M2.18902 20.5146C3.21986 22.6464 5.37919 24.0008 7.74714 24.0008H22.2203C24.5882 24.0008 26.7475 22.6464 27.7784 20.5146L27.8662 20.3329C27.8961 20.2711 27.8511 20.1992 27.7824 20.1992H2.18507C2.11635 20.1992 2.07129 20.2711 2.10121 20.3329L2.18902 20.5146Z" fill="#67E8F9"/>
                  <path d="M14.1973 0.117229L6.36499 14.0093C6.22493 14.2577 6.40444 14.565 6.68963 14.565H14.335C14.4894 14.565 14.6145 14.4399 14.6145 14.2855V0.227441C14.6145 -0.00172937 14.3105 -0.0820223 14.1973 0.117229Z" fill="#67E8F9"/>
                  <path d="M23.6734 14.01L15.8411 0.11789L15.838 0.112479C15.7256 -0.0853096 15.4238 -0.00556126 15.4238 0.221873V14.2862C15.4238 14.4406 15.549 14.5657 15.7033 14.5657H23.3487C23.6339 14.5657 23.8135 14.2584 23.6734 14.01Z" fill="#67E8F9"/>
                </svg>
                mentorcruise.com/mentor/davidlee
              </a>
            </div>
          </Section>
        </div>

        <footer style={styles.footer}>
          <p>david young lee · built with react · {new Date().getFullYear()}</p>
        </footer>
      </div>
    </>
  );
}
