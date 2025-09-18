/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";

// -------------------- Global Styles --------------------
const globalStyles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    background: linear-gradient(135deg, #f0f4ff 0%, #e0e7ff 100%);
    color: #333;
    min-height: 100vh;
  }

  a {
    text-decoration: none;
  }
`;

// -------------------- Header --------------------
const headerStyles = css`
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border-bottom: 1px solid #e5e7eb;
  position: relative;
`;

const headerContentStyles = css`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;

  @media (min-width: 768px) {
    height: 64px;
  }
`;

const logoStyles = css`
  display: flex;
  align-items: center;
  gap: 12px;

  .icon {
    width: 36px;
    height: 36px;
    background-color: #2563eb;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 18px;
  }

  h1 {
    font-size: 22px;
    font-weight: 700;
    color: #111827;
  }
`;

const navStyles = css`
  display: none;

  @media (min-width: 768px) {
    display: flex;
    gap: 32px;

    a {
      text-decoration: none;
      color: #6b7280;
      font-weight: 500;
      transition: color 0.2s;

      &:hover {
        color: #2563eb;
      }
    }
  }
`;

const myPagTabStyles = css`
  background-color: #2563eb;
  color: white !important;
  padding: 6px 14px;
  border-radius: 6px;
  font-weight: 600;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1d4ed8;
    color: white !important;
  }
`;

const mobileNavStyles = (isOpen: boolean) => css`
  display: ${isOpen ? "flex" : "none"};
  flex-direction: column;
  gap: 16px;
  position: absolute;
  top: 56px;
  right: 20px;
  background-color: white;
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  z-index: 1000;

  a {
    text-decoration: none;
    color: #111827;
    font-weight: 500;
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

// -------------------- Layout --------------------
const mainStyles = css`
  max-width: 1400px;
  margin: 0 auto;
  padding: 48px 20px;
`;

const heroStyles = css`
  text-align: center;
  margin-bottom: 64px;

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #111827;
    margin-bottom: 24px;

    @media (min-width: 768px) {
      font-size: 3rem;
    }

    .highlight {
      color: #2563eb;
    }
  }

  p {
    font-size: 1.25rem;
    color: #6b7280;
    max-width: 768px;
    margin: 0 auto 32px;
    line-height: 1.6;
  }
`;

const sectionStyles = css`
  margin-bottom: 64px;

  h2 {
    font-size: 2rem;
    font-weight: 700;
    color: #111827;
    margin-bottom: 32px;
    text-align: center;
    position: relative;

    &::after {
      content: "";
      display: block;
      width: 60px;
      height: 4px;
      background-color: #2563eb;
      margin: 12px auto 0;
      border-radius: 2px;
    }
  }
`;

const cardGrid = css`
  display: grid;
  gap: 20px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

// -------------------- Cards --------------------
const cardStyles = css`
  background-color: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  border: 1px solid #e5e7eb;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.1);
  }
`;

const urgentCardStyles = css`
  border: 1px solid #fed7aa;
  background-color: #fff7ed;
`;

const badgeStyles = css`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 600;

  &.secondary {
    background-color: #f3f4f6;
    color: #374151;
  }

  &.urgent {
    background-color: #dc2626;
    color: white;
  }

  &.outline {
    background-color: transparent;
    border: 1px solid #e5e7eb;
    color: #6b7280;
  }
`;

const announcementStyles = css`
  display: flex;
  flex-direction: column;

  .church {
    font-size: 12px;
    color: #2563eb;
    font-weight: 600;
    margin-bottom: 6px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 8px;

    h3 {
      font-size: 16px;
      font-weight: 700;
      color: #111827;
      margin-right: 8px;
    }

    .urgent {
      margin-top: 4px;
      font-size: 11px;
      padding: 2px 6px;
    }

    @media (min-width: 768px) {
      .urgent {
        margin-top: 0;
        font-size: 12px;
        padding: 4px 10px;
      }
    }
  }

  .message {
    color: #4b5563;
    margin-bottom: 8px;
  }

  .date {
    font-size: 12px;
    color: #9ca3af;
  }
`;

const sermonCardStyles = css`
  .church {
    font-size: 12px;
    color: #2563eb;
    font-weight: 600;
    margin-bottom: 6px;
  }

  .header {
    font-size: 14px;
    color: #6b7280;
    margin-bottom: 8px;
  }

  .title {
    font-weight: 600;
    margin-bottom: 6px;
    color: #111827;
  }

  .speaker {
    font-size: 14px;
    color: #4b5563;
    margin-bottom: 4px;
  }

  .date {
    font-size: 12px;
    color: #9ca3af;
  }
`;

const ministryCardStyles = css`
  .church {
    font-size: 12px;
    color: #2563eb;
    font-weight: 600;
    margin-bottom: 6px;
  }

  .header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;

    .icon {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #2563eb;
      font-size: 20px;
    }

    h3 {
      font-weight: 600;
      margin: 0;
      font-size: 16px;
      color: #111827;
    }
  }

  .description {
    font-size: 14px;
    color: #4b5563;
    margin-bottom: 12px;
  }

  .contacts {
    font-size: 14px;
    .contact {
      margin-bottom: 4px;
      color: #4b5563;
    }
  }
`;

const viewMoreButton = css`
  margin-top: 16px;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1d4ed8;
  }
`;

// -------------------- Footer --------------------
const footerStyles = css`
  background-color: #111827;
  color: #f9fafb;
  padding: 32px 20px;
  text-align: center;
  font-size: 14px;

  a {
    color: #2563eb;
    text-decoration: none;
    margin: 0 8px;
    transition: color 0.2s;

    &:hover {
      color: #1d4ed8;
    }
  }

  p {
    margin: 8px 0 0 0;
  }
`;

// -------------------- Home Component --------------------
export const Home = () => {
  const [showAllAnnouncements, setShowAllAnnouncements] = useState(false);
  const [showAllSermons, setShowAllSermons] = useState(false);
  const [showAllDepartments, setShowAllDepartments] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Sample Data with Church Names
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
      {/* Header */}
      <header css={headerStyles}>
        <div css={headerContentStyles}>
          <div css={logoStyles}>
            <div className="icon">⛪</div>
            <h1>PAG Family</h1>
          </div>

          {/* Desktop Nav */}
          <nav css={navStyles}>
            <a href="#home">Home</a>
            <a href="#news-events">News & Events</a>
            <a href="#churches-sermons">Churches & Sermons</a>
            <a href="#ministry-programs">Assembly Programs</a>
            <a href="#account" css={myPagTabStyles}>
              My PAG{" "}
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            css={css`
              display: block;
              background: none;
              border: none;
              cursor: pointer;
              @media (min-width: 768px) {
                display: none;
              }

              span {
                display: block;
                width: 24px;
                height: 3px;
                margin: 5px 0;
                background-color: #111827;
                transition: all 0.3s;
              }

              ${isMobileMenuOpen &&
              `
                span:nth-of-type(1) {
                  transform: rotate(45deg) translate(5px, 5px);
                }
                span:nth-of-type(2) {
                  opacity: 0;
                }
                span:nth-of-type(3) {
                  transform: rotate(-45deg) translate(5px, -5px);
                }
              `}
            `}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <nav css={mobileNavStyles(isMobileMenuOpen)}>
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
            href="#account"
            css={myPagTabStyles}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            My PAG
          </a>
        </nav>
      </header>

      {/* Main */}
      <main css={mainStyles}>
        {/* Hero */}
        <section css={heroStyles} id="home">
          <h1>
            Welcome to <span className="highlight">PAG Family</span>
          </h1>
          <p>
            Access all P.A.G church resources, sermons, events, and ministry
            info. Stay connected with the PAG family.
          </p>
        </section>

        {/* News & Events */}
        <section css={sectionStyles} id="news-events">
          <h2>News & Events</h2>
          <div style={{ marginBottom: "32px" }}>
            <h3 style={{ marginBottom: "16px" }}>News</h3>
            <div css={cardGrid}>
              {(showAllAnnouncements
                ? announcements
                : announcements.slice(0, 3)
              ).map((a, idx) => (
                <div key={idx} css={[cardStyles, a.urgent && urgentCardStyles]}>
                  <div css={announcementStyles}>
                    <p className="church">{a.church}</p>
                    <div className="header">
                      <h3>{a.title}</h3>
                      {a.urgent && (
                        <span css={badgeStyles} className="urgent">
                          Urgent
                        </span>
                      )}
                    </div>
                    <p className="message">{a.message}</p>
                    <p className="date">{a.date}</p>
                  </div>
                </div>
              ))}
            </div>
            {announcements.length > 3 && (
              <button
                css={viewMoreButton}
                onClick={() => setShowAllAnnouncements(!showAllAnnouncements)}
              >
                {showAllAnnouncements ? "View Less" : "View More"}
              </button>
            )}
          </div>
        </section>

        {/* Churches & Sermons */}
        <section css={sectionStyles} id="churches-sermons">
          <h2>Churches & Sermons</h2>
          <div style={{ marginBottom: "32px" }}>
            <div css={cardGrid}>
              {(showAllSermons ? recentSermons : recentSermons.slice(0, 3)).map(
                (s, idx) => (
                  <div key={idx} css={cardStyles}>
                    <div css={sermonCardStyles}>
                      <p className="church">{s.church}</p>
                      <p className="header">{s.date}</p>
                      <h3 className="title">{s.title}</h3>
                      <p className="speaker">By {s.speaker}</p>
                      <p className="date">{s.duration}</p>
                    </div>
                  </div>
                )
              )}
            </div>
            {recentSermons.length > 3 && (
              <button
                css={viewMoreButton}
                onClick={() => setShowAllSermons(!showAllSermons)}
              >
                {showAllSermons ? "View Less" : "View More"}
              </button>
            )}
          </div>
        </section>

        {/* Ministry Programs */}
        <section css={sectionStyles} id="ministry-programs">
          <h2>Assembly Programs</h2>
          <div css={cardGrid}>
            {(showAllDepartments ? departments : departments.slice(0, 3)).map(
              (d, idx) => (
                <div key={idx} css={cardStyles}>
                  <div css={ministryCardStyles}>
                    <p className="church">{d.church}</p>
                    <div className="header">
                      <div className="icon">{d.icon}</div>
                      <h3>{d.name}</h3>
                    </div>
                    <p className="description">{d.description}</p>
                    <div className="contacts">
                      <p className="contact">Leader: {d.leader}</p>
                      <p className="contact">Contact: {d.contact}</p>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
          {departments.length > 3 && (
            <button
              css={viewMoreButton}
              onClick={() => setShowAllDepartments(!showAllDepartments)}
            >
              {showAllDepartments ? "View Less" : "View More"}
            </button>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer css={footerStyles}>
        <p>
          &copy; {new Date().getFullYear()} PAG Family. All rights reserved.
        </p>
        <p>
          <a href="#privacy">Privacy Policy</a> |{" "}
          <a href="#terms">Terms of Service</a>
        </p>
      </footer>
    </div>
  );
};
