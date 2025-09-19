/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { css, keyframes } from "@emotion/react";

// -------------------- Animations --------------------
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
  100% { transform: translateY(0px); }
`;

// -------------------- Global Styles --------------------
const globalStyles = css`
  * {
    box-sizing: border-box;
  }
  html,
  body,
  #root {
    height: 100%;
  }
  body {
    margin: 0;
    font-family: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI",
      Roboto, "Helvetica Neue", Arial;
    background: linear-gradient(180deg, #f8fbff 0%, #f1f6ff 50%, #eef2ff 100%);
    color: #0f172a;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.45;
  }
  a {
    color: inherit;
  }
`;

// -------------------- Header --------------------
const headerStyles = css`
  position: sticky;
  top: 0;
  z-index: 60;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(6px);
  box-shadow: 0 6px 18px rgba(16, 24, 40, 0.06);
  border-bottom: 1px solid rgba(15, 23, 42, 0.03);
`;

const headerContentStyles = css`
  max-width: 1200px;
  margin: 0 auto;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: space-between;
`;

const logoStyles = css`
  display: flex;
  align-items: center;
  gap: 12px;
  .mark {
    width: 44px;
    height: 44px;
    border-radius: 10px;
    display: grid;
    place-items: center;
    background: linear-gradient(135deg, #2563eb, #7c3aed);
    color: white;
    font-weight: 700;
    box-shadow: 0 6px 18px rgba(37, 99, 235, 0.18);
  }
  h1 {
    font-size: 18px;
    margin: 0;
    letter-spacing: -0.2px;
  }
  p {
    margin: 0;
    font-size: 12px;
    color: #475569;
  }
`;

const navStyles = css`
  display: none;
  gap: 22px;
  align-items: center;

  @media (min-width: 768px) {
    display: flex;
  }

  a {
    color: #475569;
    font-weight: 600;
    padding: 8px 10px;
    border-radius: 8px;
    transition: all 180ms ease;
    text-decoration: none;
  }

  a:hover {
    background: rgba(37, 99, 235, 0.06);
    color: #0f172a;
  }
`;

const myPagTabStyles = css`
  display: inline-block;
  background: linear-gradient(90deg, #2563eb, #7c3aed);
  color: #fff !important;
  padding: 8px 14px;
  border-radius: 10px;
  font-weight: 700;
  box-shadow: 0 8px 20px rgba(37, 99, 235, 0.14);
`;

const mobileMenuBtn = (open: boolean) => css`
  display: inline-grid;
  grid-template-rows: repeat(3, 4px);
  gap: 6px;
  width: 34px;
  height: 34px;
  align-items: center;
  justify-items: center;
  padding: 6px;
  border-radius: 8px;
  border: none;
  background: ${open ? "rgba(15,23,42,0.06)" : "transparent"};
  cursor: pointer;
  @media (min-width: 768px) {
    display: none;
  }
`;

const mobileNavStyles = (isOpen: boolean) => css`
  display: ${isOpen ? "flex" : "none"};
  position: absolute;
  right: 18px;
  top: 72px;
  width: calc(100% - 36px);
  max-width: 380px;
  background: white;
  border-radius: 14px;
  padding: 14px;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0 14px 40px rgba(2, 6, 23, 0.12);
  border: 1px solid rgba(2, 6, 23, 0.04);
  @media (min-width: 768px) {
    display: none;
  }
`;

// -------------------- Layout & Hero --------------------
const mainStyles = css`
  max-width: 1200px;
  margin: 28px auto 80px;
  padding: 0 20px;
`;

const heroStyles = css`
  position: relative;
  border-radius: 18px;
  overflow: hidden;
  padding: 54px 28px;
  display: grid;
  gap: 18px;
  grid-template-columns: 1fr;
  align-items: center;
  background: linear-gradient(
    180deg,
    rgba(99, 102, 241, 0.14),
    rgba(37, 99, 235, 0.06)
  );
  box-shadow: 0 18px 40px rgba(2, 6, 23, 0.06);

  @media (min-width: 900px) {
    grid-template-columns: 1fr 420px;
    padding: 64px;
  }

  .content {
    z-index: 2;
  }

  h1 {
    margin: 0 0 10px 0;
    font-size: 28px;
    line-height: 1.05;
    color: #071133;
  }

  p {
    margin: 0 0 18px 0;
    color: #334155;
    font-size: 16px;
  }

  .ctas {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  .visual {
    border-radius: 12px;
    padding: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.55),
      rgba(255, 255, 255, 0.25)
    );
    box-shadow: inset 0 -6px 30px rgba(15, 23, 42, 0.02);
    animation: ${float} 6s ease-in-out infinite;
  }

  .hero-card {
    width: 100%;
    max-width: 360px;
    text-align: left;
  }
`;

const ctaPrimary = css`
  background: linear-gradient(90deg, #2563eb, #7c3aed);
  color: white;
  border: none;
  padding: 12px 18px;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
`;



// -------------------- Sections & Cards --------------------
const sectionStyles = css`
  margin-top: 42px;
`;

const sectionHeader = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 18px;
  h2 {
    margin: 0;
    font-size: 20px;
  }
  .sub {
    color: #64748b;
    font-size: 14px;
  }
`;

const cardGrid = css`
  display: grid;
  gap: 18px;
  grid-template-columns: repeat(1, 1fr);
  @media (min-width: 720px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const cardStyles = css`
  background: white;
  border-radius: 14px;
  padding: 18px;
  border: 1px solid rgba(2, 6, 23, 0.04);
  box-shadow: 0 10px 30px rgba(2, 6, 23, 0.04);
  transition: transform 220ms ease, box-shadow 220ms ease;
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 26px 60px rgba(2, 6, 23, 0.08);
  }
`;

const urgentCardStyles = css`
  background: linear-gradient(180deg, #fffaf0, #fff6ed);
  border: 1px solid rgba(249, 115, 22, 0.12);
`;

const badgeStyles = css`
  display: inline-block;
  padding: 6px 10px;
  border-radius: 999px;
  font-weight: 700;
  font-size: 12px;
`;

const announcementStyles = css`
  .church {
    font-size: 12px;
    color: #4f46e5;
    font-weight: 700;
  }
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }
  .message {
    color: #475569;
    margin-top: 8px;
  }
  .date {
    margin-top: 12px;
    color: #94a3b8;
    font-size: 13px;
  }
`;

const sermonCardStyles = css`
  .church {
    font-size: 12px;
    color: #4f46e5;
    font-weight: 700;
  }
  .title {
    font-size: 16px;
    font-weight: 700;
    color: #0f172a;
  }
  .muted {
    color: #64748b;
  }
`;

const ministryCardStyles = css`
  .church {
    font-size: 12px;
    color: #4f46e5;
    font-weight: 700;
  }
  .header {
    display: flex;
    gap: 12px;
    align-items: center;
  }
  .icon {
    width: 44px;
    height: 44px;
    border-radius: 10px;
    display: grid;
    place-items: center;
    background: rgba(99, 102, 241, 0.12);
    font-size: 22px;
  }
  .description {
    margin-top: 8px;
    color: #475569;
  }
`;

const viewMoreButton = css`
  margin-top: 14px;
  display: inline-block;
  border-radius: 10px;
  padding: 10px 14px;
  cursor: pointer;
  font-weight: 700;
  border: none;
  background: transparent;
`;

// -------------------- Footer --------------------
const footerStyles = css`
  margin-top: 48px;
  background: linear-gradient(180deg, #0f172a, #071133);
  color: #e6eef8;
  padding: 34px 20px;
  border-radius: 16px;
  text-align: center;
`;

// -------------------- Home Component --------------------
export const Home = () => {
  const [showAllAnnouncements, setShowAllAnnouncements] = useState(false);
  const [showAllSermons, setShowAllSermons] = useState(false);
  const [showAllDepartments, setShowAllDepartments] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const announcements = [
    {
      title: "Christmas Food Drive",
      message: "Help us bless families in need this Christmas.",
      date: "Dec 10, 2024",
      urgent: false,
      church: "PAG Nairobi",
    },
    {
      title: "Church Office Holiday Hours",
      message: "Closed Dec 23-26 and Jan 1.",
      date: "Dec 5, 2024",
      urgent: true,
      church: "PAG Westlands",
    },
    {
      title: "New Member Orientation",
      message: "Join Jan 7th at 2 PM for new member orientation.",
      date: "Nov 28, 2024",
      urgent: false,
      church: "PAG Karen",
    },
    {
      title: "Weekly Newsletter",
      message: "Subscribe to stay updated.",
      date: "Nov 25, 2024",
      urgent: false,
      church: "PAG Nairobi",
    },
  ];

  const recentSermons = [
    {
      title: "Walking in Faith",
      speaker: "Pastor Peter",
      date: "Dec 15, 2024",
      duration: "45 min",
      church: "PAG Nairobi",
    },
    {
      title: "Power of Prayer",
      speaker: "Pastor Everlyne",
      date: "Dec 8, 2024",
      duration: "38 min",
      church: "PAG Westlands",
    },
    {
      title: "God's Grace",
      speaker: "Pastor Mike",
      date: "Dec 1, 2024",
      duration: "42 min",
      church: "PAG Karen",
    },
    {
      title: "Faith & Patience",
      speaker: "Pastor John",
      date: "Nov 24, 2024",
      duration: "50 min",
      church: "PAG Nairobi",
    },
  ];

  const departments = [
    {
      name: "Worship",
      description: "Leading in worship",
      icon: "🎵",
      leader: "Sarah Johnson",
      contact: "worship@pag.org",
      church: "PAG Nairobi",
    },
    {
      name: "Youth",
      description: "Youth programs",
      icon: "👥",
      leader: "Mike Chen",
      contact: "youth@pag.org",
      church: "PAG Westlands",
    },
    {
      name: "Children",
      description: "Children ministry",
      icon: "❤️",
      leader: "Mary Rodriguez",
      contact: "children@pag.org",
      church: "PAG Karen",
    },
    {
      name: "Outreach",
      description: "Community service",
      icon: "🏢",
      leader: "James Wilson",
      contact: "outreach@pag.org",
      church: "PAG Nairobi",
    },
  ];

  return (
    <div css={globalStyles}>
      <header css={headerStyles} aria-label="Site header">
        <div css={headerContentStyles}>
          <div css={logoStyles}>
            <div className="mark" aria-hidden>
              ⛪
            </div>
            <div>
              <h1>PAG Family</h1>
              <p>Connecting churches & people</p>
            </div>
          </div>

          <nav css={navStyles} aria-label="Primary navigation">
            <a href="#home">Home</a>
            <a href="#news-events">News & Events</a>
            <a href="#churches-sermons">Churches & Sermons</a>
            <a href="#ministry-programs">Assembly Programs</a>
            <a css={myPagTabStyles} href="#account">
              My PAG
            </a>
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              css={mobileMenuBtn(isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setIsMobileMenuOpen((s) => !s)}
            >
              <span
                style={{
                  width: 18,
                  height: 3,
                  background: "#0f172a",
                  display: "block",
                  borderRadius: 3,
                  transform: isMobileMenuOpen
                    ? "rotate(45deg) translate(3px, 3px)"
                    : "none",
                  transition: "all 180ms",
                }}
              />
              <span
                style={{
                  width: 18,
                  height: 3,
                  background: "#0f172a",
                  display: "block",
                  borderRadius: 3,
                  opacity: isMobileMenuOpen ? 0 : 1,
                  transition: "all 180ms",
                }}
              />
              <span
                style={{
                  width: 18,
                  height: 3,
                  background: "#0f172a",
                  display: "block",
                  borderRadius: 3,
                  transform: isMobileMenuOpen
                    ? "rotate(-45deg) translate(3px, -3px)"
                    : "none",
                  transition: "all 180ms",
                }}
              />
            </button>
          </div>
        </div>

        <nav
          css={mobileNavStyles(isMobileMenuOpen)}
          aria-label="Mobile navigation"
        >
          <a href="#news-events" onClick={() => setIsMobileMenuOpen(false)}>
            News & Events
          </a>
          <a
            href="#churches-sermons"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Churches & Sermons
          </a>
          <a
            href="#ministry-programs"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Assembly Programs
          </a>
          <a
            css={myPagTabStyles}
            href="#account"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            My PAG
          </a>
        </nav>
      </header>

      <main css={mainStyles}>
        <div id="home" css={heroStyles} role="region" aria-label="Hero">
          <div className="content">
            <h1>
              Welcome to <span style={{ color: "#7c3aed" }}>PAG Family</span>
            </h1>
            <p>
              Access sermons, events and ministry info across the PAG family.
              Connect with local churches, join programs, and stay updated.
            </p>

            <div className="ctas">
              <button
                css={ctaPrimary}
                onClick={() => {
                  const el = document.querySelector("#news-events");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Explore News
              </button>
              {/* <button
                css={ctaGhost}
                onClick={() => {
                  const el = document.querySelector("#ministry-programs");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Assemby Programs
              </button> */}
            </div>

            <div
              style={{
                marginTop: 18,
                display: "flex",
                gap: 12,
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 10,
                    background: "#34d399",
                  }}
                />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>
                    2000+ Members
                  </div>
                  <div style={{ fontSize: 13, color: "#64748b" }}>
                    Across all PAG churches
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 10,
                    background: "#60a5fa",
                  }}
                />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>
                    Weekly Program
                  </div>
                  <div style={{ fontSize: 13, color: "#64748b" }}>
                    Men Fellowship
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="visual">
            <div className="hero-card">
              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=3a13a4f9b9b0d8a6b4f1b8f7e6e4a1d2"
                alt="church gathering"
                style={{ width: "100%", borderRadius: 10, display: "block" }}
              />
              <div style={{ marginTop: 12 }}>
                <div style={{ fontWeight: 800 }}>Theme of the week</div>
                <div style={{ color: "#6b7280", marginTop: 6 }}>
                  Standing strong together.
                </div>
              </div>
            </div>
          </div>
        </div>

        <section
          id="news-events"
          css={sectionStyles}
          aria-label="News and events"
        >
          <div css={sectionHeader}>
            <h2>News & Events</h2>
            <div className="sub">Latest announcements across the churches</div>
          </div>

          <div css={cardGrid}>
            {(showAllAnnouncements
              ? announcements
              : announcements.slice(0, 3)
            ).map((a, idx) => (
              <article
                key={idx}
                css={[cardStyles, a.urgent && urgentCardStyles]}
                aria-live={a.urgent ? "polite" : undefined}
              >
                <div css={announcementStyles}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <div>
                      <div className="church">{a.church}</div>
                      <h3 style={{ margin: "8px 0 0 0" }}>{a.title}</h3>
                    </div>
                    <div>
                      {a.urgent && (
                        <span
                          css={[badgeStyles]}
                          style={{ background: "#ef4444", color: "#fff" }}
                        >
                          Urgent
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="message">{a.message}</p>
                  <div className="date">{a.date}</div>
                </div>
              </article>
            ))}
          </div>

          {announcements.length > 3 && (
            <button
              css={viewMoreButton}
              onClick={() => setShowAllAnnouncements((s) => !s)}
            >
              {showAllAnnouncements ? "View Less" : "View More"}
            </button>
          )}
        </section>

        <section
          id="churches-sermons"
          css={sectionStyles}
          aria-label="Churches and sermons"
        >
          <div css={sectionHeader}>
            <h2>Churches & Sermons</h2>
            <div className="sub">Recent sermons you can stream or download</div>
          </div>

          <div css={cardGrid}>
            {(showAllSermons ? recentSermons : recentSermons.slice(0, 3)).map(
              (s, idx) => (
                <article key={idx} css={cardStyles}>
                  <div css={sermonCardStyles}>
                    <div className="church">{s.church}</div>
                    <div style={{ marginTop: 8 }}>
                      <div className="title">{s.title}</div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginTop: 8,
                        }}
                      >
                        <div className="muted">{s.speaker}</div>
                        <div className="muted">
                          {s.duration} • {s.date}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              )
            )}
          </div>

          {recentSermons.length > 3 && (
            <button
              css={viewMoreButton}
              onClick={() => setShowAllSermons((s) => !s)}
            >
              {showAllSermons ? "View Less" : "View More"}
            </button>
          )}
        </section>

        <section
          id="ministry-programs"
          css={sectionStyles}
          aria-label="Ministry programs"
        >
          <div css={sectionHeader}>
            <h2>Assembly Programs</h2>
            <div className="sub">Get involved with a ministry near you</div>
          </div>

          <div css={cardGrid}>
            {(showAllDepartments ? departments : departments.slice(0, 3)).map(
              (d, idx) => (
                <div key={idx} css={cardStyles}>
                  <div css={ministryCardStyles}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <div className="church">{d.church}</div>
                        <div className="header">
                          <div className="icon" aria-hidden>
                            {d.icon}
                          </div>
                          <h3 style={{ margin: 0 }}>{d.name}</h3>
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 12, color: "#94a3b8" }}>
                          {d.leader}
                        </div>
                        <div style={{ fontSize: 13, marginTop: 6 }}>
                          {d.contact}
                        </div>
                      </div>
                    </div>

                    <p className="description">{d.description}</p>
                  </div>
                </div>
              )
            )}
          </div>

          {departments.length > 3 && (
            <button
              css={viewMoreButton}
              onClick={() => setShowAllDepartments((s) => !s)}
            >
              {showAllDepartments ? "View Less" : "View More"}
            </button>
          )}
        </section>
      </main>

      <footer css={footerStyles} role="contentinfo">
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ fontWeight: 800, fontSize: 18 }}>PAG Family</div>
          <div style={{ color: "#cfe3ff", marginTop: 8 }}>
            Bringing churches together to serve the community.
          </div>

          <div
            style={{
              marginTop: 18,
              display: "flex",
              justifyContent: "center",
              gap: 14,
              flexWrap: "wrap",
            }}
          >
            <a href=".">Privacy Policy</a>
            <a href=".">Terms of Service</a>
            <a href=".">Contact</a>
          </div>

          <p style={{ marginTop: 18, color: "#cfe3ff" }}>
            © {new Date().getFullYear()} PAG Family. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};
