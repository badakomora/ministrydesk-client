/** @jsxImportSource @emotion/react */
import type React from "react";
import { css, keyframes } from "@emotion/react";

// -------------------- Animations --------------------

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
    background: #fffff;
    color: #fbbf24
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.7;
  }
  h1,
  h2,
  h3,
  h4 {
    font-family: "Merriweather", Georgia, serif;
    color: black;
    line-height: 1.3;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
`;

// -------------------- Animations --------------------
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
  100% { transform: translateY(0px); }
`;

const blink = keyframes`
  0%, 50%, 100% { opacity: 1; }
  25%, 75% { opacity: 0; }
`;

// NEW: slide right to left animation
const slideRightLeft = keyframes`
  0% {
    transform: translateX(50%);
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  50% {
    transform: translateX(0);
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    transform: translateX(-50%);
    opacity: 0;
  }
`;

// -------------------- Theme of the Week --------------------
const themeOfWeekStyles = css`
  margin: 40px auto 0;
  padding: 15px;
  border-radius: 14px;
  text-align: center;
  background: white;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);

  p {
    font-size: 18px;
    margin: 0;
    color: #2563eb;
  }

  .divider {
    margin: 16px auto 20px;
    width: 20%;
    height: 3px;
    border-radius: 2px;
    background: #fbbf24;
  }

  .text {
    color: #111827;
    display: block;
    white-space: nowrap;
    animation: ${slideRightLeft} 7s linear infinite;
  }
`;

// -------------------- CTA --------------------
const ctaPrimary = css`
  background: linear-gradient(90deg, #2563eb, #fbbf24);
  color: #fff;
  border: none;
  padding: 14px 26px;
  margin-top: 10px;
  border-radius: 999px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(37, 99, 235, 0.25);
  transition: all 200ms ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 28px rgba(37, 99, 235, 0.3);
  }
`;

// -------------------- Cards --------------------
const cardStyles = css`
  background: #fff;
  border-radius: 14px;
  padding: 22px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 10px 32px rgba(0, 0, 0, 0.04);
  transition: transform 200ms ease, box-shadow 200ms ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 50px rgba(2, 6, 23, 0.08);
  }
`;

// -------------------- Hero --------------------
const heroStyles = css`
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  padding: 70px 32px;
  display: grid;
  gap: 50px;
  grid-template-columns: 1fr;
  align-items: center;
  background: linear-gradient(
    135deg,
    rgba(250, 250, 255, 0.9),
    rgba(226, 232, 240, 0.9)
  );
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.08);

  @media (min-width: 900px) {
    grid-template-columns: 1fr 450px;
    padding: 100px 80px;
  }

  /* Decorative glowing circles */
  &::before,
  &::after {
    content: "";
    position: absolute;
    border-radius: 50%;
    filter: blur(90px);
    opacity: 0.4;
    z-index: 0;
  }
  &::before {
    top: -60px;
    left: -60px;
    width: 240px;
    height: 240px;
    background: #93c5fd;
  }
  &::after {
    bottom: -60px;
    right: -60px;
    width: 260px;
    height: 260px;
    background: #fde68a;
  }

  .content {
    position: relative;
    z-index: 2;
  }

  h1 {
    margin: 0 0 20px 0;
    font-size: 42px;
    font-weight: 800;
    line-height: 1.2;
    color: #111827;

    @media (min-width: 900px) {
      font-size: 52px;
    }

    span {
      background: linear-gradient(90deg, #7c3aed, #2563eb);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  p {
    margin: 0 0 30px 0;
    color: #475569;
    font-size: 18px;
    line-height: 1.7;
    max-width: 540px;
  }

  .visual {
    position: relative;
    z-index: 2;
    border-radius: 18px;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(15, 23, 42, 0.12);
    animation: ${float} 8s ease-in-out infinite;

    img {
      width: 100%;
      display: block;
    }

    section {
      margin-top: -40px;
      position: relative;
      z-index: 3;
    }
  }
`;

// -------------------- Stats Highlight --------------------
const statsHighlight = css`
  margin-top: 28px;
  font-size: 17px;
  font-weight: 600;
  color: #1e293b;
  backdrop-filter: blur(12px);
  display: flex;
  gap: 15px;
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-3px);
  }

  > small {
    display: flex;
    align-items: center;
    gap: 15px;

    &::before {
      content: "•";
      font-size: 22px;
      animation: ${blink} 1.4s infinite;
    }
  }

  /* assign different colors to the dots */
  > small:nth-of-type(1)::before {
    color: #2563eb; /* blue */
  }
  > small:nth-of-type(2)::before {
    color: #fbbf24; /* yellow */
  }
  > small:nth-of-type(3)::before {
    color: #ef4444; /* red */
  }
  > small:nth-of-type(4)::before {
    color: #22c55e; /* green */
  }
`;

// -------------------- Layout --------------------
const mainStyles = css`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 22px;
`;

const sectionStyles = css`
  margin-top: 90px;
`;

const sectionHeader = css`
  margin-bottom: 36px;
  text-align: center;

  h2 {
    font-size: 28px;
    margin: 0;
    font-weight: 800;
    color: #0f172a;
  }

  .sub {
    margin-top: 8px;
    font-size: 16px;
    color: #64748b;
  }
`;

const cardGrid = css`
  display: grid;
  gap: 24px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

// -------------------- Announcements --------------------
const urgentCardStyles = css`
  border-left: 6px solid #ef4444;
`;

const announcementStyles = css`
  display: flex;
  flex-direction: column;

  .church {
    font-size: 14px;
    font-weight: 600;
    color: #2563eb;
  }

  h3 {
    margin: 4px 0;
    font-size: 18px;
    font-weight: 700;
    color: #111827;
  }

  .message {
    font-size: 15px;
    color: #475569;
  }

  .date {
    font-size: 13px;
    color: #94a3b8;
  }
`;

const badgeStyles = css`
  display: inline-block;
  font-size: 12px;
  padding: 4px;
  border-radius: 999px;
  font-weight: 700;
  background: #ef4444;
  color: #fff;
  height: 100%;
`;

// -------------------- View More --------------------
const viewMoreButton = css`
  display: block;
  margin: 32px auto 0;
  padding: 12px 26px;
  border-radius: 999px;
  background: #2563eb
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    background: #1d4ed8;
    transform: translateY(-2px);
  }
`;

// -------------------- Sermons --------------------
const sermonCardStyles = css`
  .church {
    font-weight: 600;
    font-size: 14px;
    color: #2563eb;
  }
  .title {
    font-size: 17px;
    font-weight: 700;
    color: #111827;
  }
`;

// -------------------- Ministries --------------------
const ministryCardStyles = css`
  display: flex;
  flex-direction: column;

  .name {
    font-weight: 700;
    font-size: 16px;
    color: #1e293b;
  }

  .desc {
    font-size: 14px;
    color: #475569;
  }
`;

interface componentProps {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

// -------------------- Home Component --------------------
export const Home: React.FC<componentProps> = ({ setActiveTab }) => {
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
      leader: "Sarah Johnson",
      contact: "worship@pag.org",
      church: "PAG Nairobi",
    },
    {
      name: "Youth",
      description: "Youth programs",
      leader: "Mike Chen",
      contact: "youth@pag.org",
      church: "PAG Westlands",
    },
    {
      name: "Children",
      description: "Children ministry",
      leader: "Mary Rodriguez",
      contact: "children@pag.org",
      church: "PAG Karen",
    },
    {
      name: "Outreach",
      description: "Community service",
      leader: "James Wilson",
      contact: "outreach@pag.org",
      church: "PAG Nairobi",
    },
  ];

  return (
    <div css={globalStyles}>
      <main css={mainStyles}>
        {/* ---------- HERO ---------- */}
        <div id="home" css={heroStyles}>
          <div className="content">
            <h1>
              Welcome to <span style={{ color: "#7c3aed" }}>PAG Family</span>
            </h1>
            <small>
              Access sermons, events, and ministry updates from the entire PAG
              family. Connect with local churches, participate in programs, and
              stay informed. Remember, every Sunday is a day for giving tithes.
            </small>

            {/* Highlight Stats */}
            <div css={statsHighlight}>
              <small>2000+ members across all PAG</small>
              <small>Men Fellowship Week </small>
            </div>
            {/* Hero CTA */}
            <button
              css={ctaPrimary}
              onClick={() =>
                document
                  .querySelector("#news-events")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Explore News
            </button>
          </div>

          <div className="visual">
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3"
              alt="church gathering"
              style={{ width: "100%", borderRadius: 10, display: "block" }}
            />
            <section css={themeOfWeekStyles}>
              <p>Theme of the Week</p>
              <div className="divider" />
              <p className="text">
                Standing strong together in Christ our Lord.
              </p>
            </section>
          </div>
        </div>

        {/* ---------- NEWS ---------- */}
        <section id="news-events" css={sectionStyles}>
          <div css={sectionHeader}>
            <h2>News & Events</h2>
            <div className="sub">Latest announcements across the churches</div>
          </div>

          <div css={cardGrid}>
            {announcements.slice(0, 3).map((a, idx) => (
              <article
                key={idx}
                css={[cardStyles, a.urgent && urgentCardStyles]}
                role="button"
                tabIndex={0}
                onClick={(e) => setActiveTab("NewsItem")}
                style={{ cursor: "pointer" }}
              >
                <div css={announcementStyles}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>
                      <div className="church">{a.church}</div>
                      <h3>{a.title}</h3>
                    </div>
                    {a.urgent && (
                      <span
                        css={badgeStyles}
                        style={{ background: "#ef4444", color: "#fff" }}
                      >
                        Urgent
                      </span>
                    )}
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
              onClick={(e) => setActiveTab("NewsList")}
              aria-label="View more announcements"
            >
              View More
            </button>
          )}
        </section>

        {/* ---------- SERMONS ---------- */}
        <section id="churches-sermons" css={sectionStyles}>
          <div css={sectionHeader}>
            <h2>Churches & Sermons</h2>
            <div className="sub">Recent sermons you can stream or download</div>
          </div>

          <div css={cardGrid}>
            {recentSermons.slice(0, 3).map((s, idx) => (
              <article
                key={idx}
                onClick={(e) => setActiveTab("SermonsItem")}
                css={cardStyles}
              >
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
                      <div>{s.speaker}</div>
                      <div>
                        {s.duration} • {s.date}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {recentSermons.length > 3 && (
            <button
              css={viewMoreButton}
              onClick={(e) => setActiveTab("SermonsList")}
              aria-label="View more sermons"
            >
              View More
            </button>
          )}
        </section>

        {/* ---------- MINISTRIES ---------- */}
        <section id="ministry-programs" css={sectionStyles}>
          <div css={sectionHeader}>
            <h2>Assembly Programs</h2>
            <div className="sub">Get involved with a ministry near you</div>
          </div>

          <div css={cardGrid}>
            {departments.slice(0, 3).map((d, idx) => (
              <div
                key={idx}
                onClick={(e) => setActiveTab("AssemblyProgramsItem")}
                css={cardStyles}
              >
                <div css={ministryCardStyles}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>
                      <div className="church">
                        <b>{d.church}</b>
                      </div>
                      <h3>
                        {d.name}
                      </h3>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 12, color: "#94a3b8" }}>
                        {d.leader}
                      </div>
                      <div style={{ fontSize: 13 }}>{d.contact}</div>
                      <p>{d.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {departments.length > 3 && (
            <button
              css={viewMoreButton}
              onClick={(e) => setActiveTab("AssemblyProgramsList")}
              aria-label="View more programs"
            >
              View More
            </button>
          )}
        </section>
      </main>
    </div>
  );
};

export default Home;
