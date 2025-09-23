/** @jsxImportSource @emotion/react */
import React from "react";
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
    background: linear-gradient(180deg, #fdfdfd 0%, #f9fafc 40%, #f3f7fc 100%)
      fixed;
    color: #1e293b;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.6;
  }
  h1,
  h2,
  h3,
  h4 {
    font-family: "Merriweather", Georgia, serif;
    color: #1e293b;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
`;

// -------------------- Hero --------------------
const heroStyles = css`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  padding: 60px 28px;
  display: grid;
  gap: 24px;
  grid-template-columns: 1fr;
  align-items: center;
  background: linear-gradient(
    145deg,
    rgba(250, 250, 255, 0.9),
    rgba(226, 232, 240, 0.9)
  );
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.06);

  @media (min-width: 900px) {
    grid-template-columns: 1fr 420px;
    padding: 80px 64px;
  }

  h1 {
    margin: 0 0 14px 0;
    font-size: 32px;
  }

  p {
    margin: 0 0 20px 0;
    color: #475569;
    font-size: 17px;
  }

  .visual {
    border-radius: 14px;
    padding: 20px;
    background: #ffffff;
    box-shadow: inset 0 -6px 30px rgba(15, 23, 42, 0.05),
      0 12px 40px rgba(0, 0, 0, 0.08);
    animation: ${float} 8s ease-in-out infinite;
  }
`;

// -------------------- CTA --------------------
const ctaPrimary = css`
  background: linear-gradient(90deg, #2563eb, #fbbf24);
  color: white;
  border: none;
  padding: 14px 22px;
  border-radius: 999px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 6px 18px rgba(37, 99, 235, 0.25);
  transition: all 220ms ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 26px rgba(37, 99, 235, 0.3);
  }
`;

// -------------------- Cards --------------------
const cardStyles = css`
  background: white;
  border-radius: 16px;
  padding: 20px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.04);
  transition: transform 220ms ease, box-shadow 220ms ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 26px 60px rgba(2, 6, 23, 0.1);
  }
`;

// -------------------- Layout Styles --------------------
const mainStyles = css`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 20px;
`;

const sectionStyles = css`
  margin-top: 80px;
`;

const sectionHeader = css`
  margin-bottom: 30px;
  text-align: center;

  h2 {
    font-size: 26px;
    margin: 0;
    color: #1e293b;
  }

  .sub {
    margin-top: 6px;
    font-size: 15px;
    color: #64748b;
  }
`;

const cardGrid = css`
  display: grid;
  gap: 22px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

// -------------------- Announcements --------------------
const urgentCardStyles = css`
  border-left: 5px solid #ef4444;
`;

const announcementStyles = css`
  display: flex;
  flex-direction: column;
  gap: 8px;

  .title {
    font-weight: 700;
    font-size: 17px;
    color: #1e293b;
  }

  .desc {
    font-size: 15px;
    color: #475569;
  }
`;

const badgeStyles = css`
  display: inline-block;
  font-size: 12px;
  padding: 3px 8px;
  border-radius: 6px;
  font-weight: 600;
`;

// -------------------- View More Button --------------------
const viewMoreButton = css`
  display: block;
  margin: 24px auto 0;
  padding: 10px 20px;
  border-radius: 999px;
  background: #2563eb;
  color: white;
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
    font-weight: 700;
    font-size: 15px;
    color: #2563eb;
  }
  .title {
    font-size: 16px;
    font-weight: 600;
    color: #1e293b;
  }
`;

// -------------------- Ministries --------------------
const ministryCardStyles = css`
  display: flex;
  flex-direction: column;
  gap: 10px;

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

// -------------------- Theme of the Week --------------------
const themeOfWeekStyles = css`
  margin: 50px auto;
  padding: 28px 24px;
  border-radius: 14px;
  text-align: center;
  background: linear-gradient(135deg, #ffffff, #f9fafb);
  border: 1px solid #e2e8f0;
  max-width: 700px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);

  h3 {
    font-size: 18px;
    margin: 0;
    font-weight: 700;
    color: #2563eb;
    text-transform: uppercase;
    letter-spacing: 0.07em;
  }

  .divider {
    margin: 14px auto 18px;
    width: 60px;
    height: 3px;
    border-radius: 2px;
    background: #fbbf24;
  }

  .text {
    font-family: "Merriweather", Georgia, serif;
    font-size: 24px;
    font-weight: 700;
    color: #111827;
    line-height: 1.4;
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
      <main css={mainStyles}>
        {/* ---------- HERO ---------- */}
        <div id="home" css={heroStyles}>
          <div className="content">
            <h1>
              Welcome to <span style={{ color: "#7c3aed" }}>PAG Family</span>
            </h1>
            <p>
              Access sermons, events and ministry info across the PAG family.
              Connect with local churches, join programs, and stay updated.
            </p>

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
              <h3>Theme of the Week</h3>
              <div className="divider" />
              <div className="text">Standing strong together.</div>
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
                onClick={() => setActiveTab("Item")}
              >
                <div css={announcementStyles}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
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
            <button css={viewMoreButton} onClick={() => setActiveTab("List")}>
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
            <button css={viewMoreButton} onClick={() => setActiveTab("List")}>
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
              <div key={idx} css={cardStyles}>
                <div css={ministryCardStyles}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>
                      <div className="church">{d.church}</div>
                      <h3>{d.icon} {d.name}</h3>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 12, color: "#94a3b8" }}>
                        {d.leader}
                      </div>
                      <div style={{ fontSize: 13 }}>{d.contact}</div>
                    </div>
                  </div>
                  <p>{d.description}</p>
                </div>
              </div>
            ))}
          </div>

          {departments.length > 3 && (
            <button css={viewMoreButton} onClick={() => setActiveTab("List")}>
              View More
            </button>
          )}
        </section>
      </main>
    </div>
  );
};
 