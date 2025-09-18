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

  body {
    background: linear-gradient(135deg, #f0f4ff 0%, #e0e7ff 100%);
    color: #333;
    min-height: 100vh;
  }
`;

// -------------------- Header --------------------
const headerStyles = css`
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #e5e7eb;
`;

const headerContentStyles = css`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
`;

const logoStyles = css`
  display: flex;
  align-items: center;
  gap: 12px;

  .icon {
    width: 32px;
    height: 32px;
    background-color: #2563eb;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 18px;
  }

  h1 {
    font-size: 20px;
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
  }
`;

const cardGrid = css`
  display: grid;
  gap: 16px;

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
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
`;

const urgentCardStyles = css`
  border: 1px solid #fed7aa;
  background-color: #fff7ed;
`;

const badgeStyles = css`
  display: inline-block;
  padding: 4px 8px;
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

  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
  }

  .message {
    color: #6b7280;
    margin-bottom: 8px;
  }

  .date {
    font-size: 12px;
    color: #9ca3af;
  }
`;

const sermonCardStyles = css`
  .header {
    font-size: 14px;
    color: #6b7280;
    margin-bottom: 8px;
  }

  .title {
    font-weight: 600;
    margin-bottom: 4px;
  }

  .speaker {
    font-size: 14px;
    color: #6b7280;
    margin-bottom: 4px;
  }

  .date {
    font-size: 12px;
    color: #9ca3af;
  }
`;

const ministryCardStyles = css`
  .header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;

    .icon {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #2563eb;
      font-size: 20px;
    }

    h3 {
      font-weight: 600;
      margin: 0;
    }
  }

  .description {
    font-size: 14px;
    color: #6b7280;
    margin-bottom: 12px;
  }

  .contacts {
    font-size: 14px;
    .contact {
      margin-bottom: 4px;
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

// -------------------- Home Component --------------------
export const Home = () => {
  const [showAllAnnouncements, setShowAllAnnouncements] = useState(false);
  const [showAllSermons, setShowAllSermons] = useState(false);
  const [showAllDepartments, setShowAllDepartments] = useState(false);

  // Sample Data
  const announcements = [
    {
      title: "Christmas Food Drive",
      message: "Help us bless families in need this Christmas.",
      date: "Dec 10, 2024",
      urgent: false,
    },
    {
      title: "Church Office Holiday Hours",
      message: "Closed Dec 23-26 and Jan 1.",
      date: "Dec 5, 2024",
      urgent: true,
    },
    {
      title: "New Member Orientation",
      message: "Join Jan 7th at 2 PM for new member orientation.",
      date: "Nov 28, 2024",
      urgent: false,
    },
    {
      title: "Weekly Newsletter",
      message: "Subscribe to stay updated.",
      date: "Nov 25, 2024",
      urgent: false,
    },
  ];


  const recentSermons = [
    {
      title: "Walking in Faith",
      speaker: "Pastor Peter",
      date: "Dec 15, 2024",
      duration: "45 min",
    },
    {
      title: "Power of Prayer",
      speaker: "Pastor Everlyne",
      date: "Dec 8, 2024",
      duration: "38 min",
    },
    {
      title: "God's Grace",
      speaker: "Pastor Mike",
      date: "Dec 1, 2024",
      duration: "42 min",
    },
    {
      title: "Faith & Patience",
      speaker: "Pastor John",
      date: "Nov 24, 2024",
      duration: "50 min",
    },
  ];

  const departments = [
    {
      name: "Worship",
      description: "Leading in worship",
      icon: "🎵",
      leader: "Sarah Johnson",
      contact: "worship@pag.org",
    },
    {
      name: "Youth",
      description: "Youth programs",
      icon: "👥",
      leader: "Mike Chen",
      contact: "youth@pag.org",
    },
    {
      name: "Children",
      description: "Children ministry",
      icon: "❤️",
      leader: "Mary Rodriguez",
      contact: "children@pag.org",
    },
    {
      name: "Outreach",
      description: "Community service",
      icon: "🏢",
      leader: "James Wilson",
      contact: "outreach@pag.org",
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
          <nav css={navStyles}>
            <a href="#news-events">News & Events</a>
            <a href="#churches-sermons">Churches & Sermons</a>
            <a href="#giving">Give</a>
            <a href="#contact">My PAG</a>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main css={mainStyles}>
        {/* Hero */}
        <section css={heroStyles}>
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

          {/* News */}
          <div style={{ marginBottom: "32px" }}>
            <h3 style={{ marginBottom: "16px" }}>News</h3>
            <div css={cardGrid}>
              {(showAllAnnouncements
                ? announcements
                : announcements.slice(0, 3)
              ).map((a, idx) => (
                <div key={idx} css={[cardStyles, a.urgent && urgentCardStyles]}>
                  <div css={announcementStyles}>
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

          {/* Sermons */}
          <div style={{ marginBottom: "32px" }}>
            <div css={cardGrid}>
              {(showAllSermons ? recentSermons : recentSermons.slice(0, 3)).map(
                (s, idx) => (
                  <div key={idx} css={cardStyles}>
                    <div css={sermonCardStyles}>
                      <div className="header">{s.duration}</div>
                      <h3 className="title">{s.title}</h3>
                      <p className="speaker">{s.speaker}</p>
                      <p className="date">{s.date}</p>
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

        <section css={sectionStyles} id="churches-sermons">
          <h2>Ministry Programs</h2>

          {/* Ministries */}
          <div>
            <div css={cardGrid}>
              {(showAllDepartments ? departments : departments.slice(0, 3)).map(
                (d, idx) => (
                  <div key={idx} css={cardStyles}>
                    <div css={ministryCardStyles}>
                      <div className="header">
                        <div className="icon">{d.icon}</div>
                        <h3>{d.name}</h3>
                      </div>
                      <p className="description">{d.description}</p>
                      <div className="contacts">
                        <div className="contact">
                          <strong>Leader:</strong> {d.leader}
                        </div>
                        <div className="contact">
                          <strong>Email:</strong> {d.contact}
                        </div>
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
          </div>
        </section>
      </main>
    </div>
  );
};
