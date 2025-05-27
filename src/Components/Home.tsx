/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

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

const buttonStyles = css`
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 14px;
  border: none;
  cursor: pointer;
  transition: all 0.2s;

  &.primary {
    background-color: #2563eb;
    color: white;

    &:hover {
      background-color: #1d4ed8;
    }
  }

  &.outline {
    background-color: transparent;
    color: #2563eb;
    border: 1px solid #2563eb;

    &:hover {
      background-color: #f0f4ff;
    }
  }

  &.secondary {
    background-color: white;
    color: #2563eb;
    border: 1px solid #e5e7eb;

    &:hover {
      background-color: #f9fafb;
    }
  }

  &.large {
    padding: 12px 24px;
    font-size: 16px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

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

const cardStyles = css`
  background-color: white;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }

  &.urgent {
    border: 1px solid #fed7aa;
    background-color: #fff7ed;
  }
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

const gridStyles = css`
  display: grid;
  gap: 24px;
  margin-bottom: 64px;

  &.cols-2 {
    grid-template-columns: 1fr;
    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  &.cols-3 {
    grid-template-columns: 1fr;
    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (min-width: 1024px) {
      grid-template-columns: repeat(3, 1fr);
    }
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

  &.left-align h2 {
    text-align: left;
    margin-bottom: 24px;
    font-size: 1.5rem;
  }
`;

const announcementStyles = css`
  display: flex;
  align-items: start;
  justify-content: space-between;
  margin-bottom: 16px;

  .content {
    flex: 1;

    .header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;

      h3 {
        font-weight: 600;
        margin: 0;
      }
    }

    .message {
      color: #6b7280;
      margin-bottom: 8px;
      line-height: 1.5;
    }

    .date {
      font-size: 14px;
      color: #9ca3af;
    }
  }

  .icon {
    width: 20px;
    height: 20px;
    color: #9ca3af;
    margin-top: 4px;
  }
`;

const sermonCardStyles = css`
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;

    .duration {
      font-size: 14px;
      color: #6b7280;
    }
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
    font-size: 14px;
    color: #9ca3af;
    margin-bottom: 16px;
  }

  .actions {
    display: flex;
    gap: 8px;

    button {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
    }
  }
`;

const eventCardStyles = css`
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;

    .icon {
      width: 16px;
      height: 16px;
      color: #9ca3af;
    }
  }

  .title {
    font-weight: 600;
    margin-bottom: 8px;
  }

  .details {
    font-size: 14px;
    color: #6b7280;

    .detail {
      display: flex;
      align-items: center;
      gap: 4px;
      margin-bottom: 4px;

      .icon {
        width: 12px;
        height: 12px;
      }
    }
  }
`;

const ministryCardStyles = css`
  .header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;

    .icon {
      width: 40px;
      height: 40px;
      background-color: #dbeafe;
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
    color: #6b7280;
    font-size: 14px;
    margin-bottom: 16px;
    line-height: 1.5;
  }

  .contacts {
    font-size: 14px;

    .contact {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
      color: #6b7280;

      .icon {
        width: 16px;
        height: 16px;
      }
    }
  }
`;

const ctaStyles = css`
  border-radius: 12px;
  padding: 48px 32px;
  text-align: center;
  color: white;

  &.giving {
    background: linear-gradient(135deg, #059669 0%, #047857 100%);
  }

  .icon {
    width: 64px;
    height: 64px;
    margin: 0 auto 24px;
    opacity: 0.8;
    font-size: 64px;
  }

  h2 {
    font-size: 1.875rem;
    font-weight: 700;
    margin-bottom: 16px;
  }

  p {
    font-size: 1.25rem;
    margin-bottom: 32px;
    opacity: 0.9;
  }

  .buttons {
    display: flex;
    gap: 16px;
    justify-content: center;
    flex-wrap: wrap;
  }
`;

export const Home = () => {
  const departments = [
    {
      name: "Worship Ministry",
      description:
        "Leading the congregation in spirit-filled worship and praise",
      icon: "🎵",
      contact: "worship@pag.org",
      leader: "Pastor Sarah Johnson",
    },
    {
      name: "Youth Ministry",
      description:
        "Empowering the next generation through discipleship and fellowship",
      icon: "👥",
      contact: "youth@pag.org",
      leader: "Pastor Mike Chen",
    },
    {
      name: "Children's Ministry",
      description:
        "Nurturing young hearts with age-appropriate biblical teaching",
      icon: "❤️",
      contact: "children@pag.org",
      leader: "Sister Mary Rodriguez",
    },
    {
      name: "Outreach Ministry",
      description: "Reaching our community with God's love through service",
      icon: "🏢",
      contact: "outreach@pag.org",
      leader: "Deacon James Wilson",
    },
    {
      name: "Prayer Ministry",
      description: "Interceding for our church, community, and global missions",
      icon: "📖",
      contact: "prayer@pag.org",
      leader: "Sister Grace Kim",
    },
    {
      name: "Missions Ministry",
      description: "Supporting global evangelism and church planting efforts",
      icon: "📍",
      contact: "missions@pag.org",
      leader: "Pastor David Thompson",
    },
  ];

  const recentSermons = [
    {
      title: "Walking in Faith",
      speaker: "Pastor Peter Komora",
      date: "December 15, 2024",
      duration: "45 min",
      series: "Foundations of Faith P.A.G",
    },
    {
      title: "The Power of Prayer",
      speaker: "Pastor Everlyne Kavaya",
      date: "December 8, 2024",
      duration: "38 min",
      series: "Mwambao P.A.G",
    },
    {
      title: "God's Amazing Grace",
      speaker: "Pastor Mike Chen",
      date: "December 1, 2024",
      duration: "42 min",
      series: "Nyali P.A.G",
    },
  ];

  const upcomingEvents = [
    {
      title: "Christmas Eve Service",
      date: "December 24, 2024",
      time: "7:00 PM",
      location: "Main Sanctuary",
      type: "Special Service",
    },
    {
      title: "New Year Prayer Night",
      date: "December 31, 2024",
      time: "10:00 PM - 12:30 AM",
      location: "Fellowship Hall",
      type: "Prayer Meeting",
    },
    {
      title: "Youth Winter Retreat",
      date: "January 12-14, 2025",
      time: "Friday 6 PM - Sunday 4 PM",
      location: "Mountain View Camp",
      type: "Retreat",
    },
    {
      title: "Women's Conference",
      date: "January 25, 2025",
      time: "9:00 AM - 4:00 PM",
      location: "Main Sanctuary",
      type: "Conference",
    },
  ];

  const announcements = [
    {
      title: "Christmas Food Drive",
      message:
        "Help us bless families in need this Christmas season. Drop off non-perishable items at the church office.",
      date: "Posted December 10, 2024",
      urgent: false,
    },
    {
      title: "Church Office Holiday Hours",
      message:
        "The church office will be closed December 23-26 and January 1. Emergency contact: (555) 123-4567",
      date: "Posted December 5, 2024",
      urgent: true,
    },
    {
      title: "New Member Orientation",
      message:
        "Join us January 7th at 2 PM for new member orientation. Learn about PAG's vision, ministries, and how to get involved.",
      date: "Posted November 28, 2024",
      urgent: false,
    },
  ];

  return (
    <div css={globalStyles}>
      <header css={headerStyles}>
        <div css={headerContentStyles}>
          <div css={logoStyles}>
            <div className="icon">⛪</div>
            <h1>PAG Ministry Network</h1>
          </div>

          <nav css={navStyles}>
            <a href="#sermons">Sermons</a>
            <a href="#events">Events</a>
            <a href="#departments">Ministries</a>
            <a href="#giving">Give</a>
            <a href="#contact">Visit Us</a>
          </nav>
        </div>
      </header>

      <main css={mainStyles}>
        <section css={heroStyles}>
          <h1>
            Welcome to <span className="highlight">PAG Ministry Network</span>
          </h1>
          <p>
            Access all church resources, sermons, events, and ministry
            information. Everything you need to stay connected with the PAG
            family.
          </p>
        </section>

        {/* Announcements */}
        <section
          css={[sectionStyles, { marginBottom: "48px" }]}
          className="left-align"
        >
          <h2>Latest Announcements</h2>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            {announcements.map((announcement, index) => (
              <div
                key={index}
                css={[cardStyles, announcement.urgent ? "urgent" : ""]}
              >
                <div css={announcementStyles}>
                  <div className="content">
                    <div className="header">
                      <h3>{announcement.title}</h3>
                      {announcement.urgent && (
                        <span css={badgeStyles} className="urgent">
                          Urgent
                        </span>
                      )}
                    </div>
                    <p className="message">{announcement.message}</p>
                    <p className="date">{announcement.date}</p>
                  </div>
                  <div className="icon">💬</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Two Column Layout */}
        <div css={gridStyles} className="cols-2">
          {/* Sermons */}
          <section css={sectionStyles} className="left-align" id="sermons">
            <h2>Recent Sermons</h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              {recentSermons.map((sermon, index) => (
                <div key={index} css={cardStyles}>
                  <div css={sermonCardStyles}>
                    <div className="header">
                      <span css={badgeStyles} className="secondary">
                        {sermon.series}
                      </span>
                      <span className="duration">{sermon.duration}</span>
                    </div>
                    <h3 className="title">{sermon.title}</h3>
                    <p className="speaker">{sermon.speaker}</p>
                    <p className="date">{sermon.date}</p>
                    <div className="actions">
                      <button css={buttonStyles} className="outline">
                        ▶️ Play
                      </button>
                      <button css={buttonStyles} className="outline">
                        ⬇️ Download
                      </button>
                      <button css={buttonStyles} className="outline">
                        📻 Stream
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Events */}
          <section css={sectionStyles} className="left-align" id="events">
            <h2>Upcoming Events</h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              {upcomingEvents.map((event, index) => (
                <div key={index} css={cardStyles}>
                  <div css={eventCardStyles}>
                    <div className="header">
                      <span css={badgeStyles} className="outline">
                        {event.type}
                      </span>
                      <div className="icon">📅</div>
                    </div>
                    <h3 className="title">{event.title}</h3>
                    <div className="details">
                      <div className="detail">
                        <div className="icon">📅</div>
                        <span>{event.date}</span>
                      </div>
                      <div className="detail">
                        <div className="icon">🕐</div>
                        <span>{event.time}</span>
                      </div>
                      <div className="detail">
                        <div className="icon">📍</div>
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Departments/Ministries */}
        <section css={sectionStyles} id="departments">
          <h2>Our Ministries</h2>
          <div css={gridStyles} className="cols-3">
            {departments.map((dept, index) => (
              <div key={index} css={cardStyles}>
                <div css={ministryCardStyles}>
                  <div className="header">
                    <div className="icon">{dept.icon}</div>
                    <h3>{dept.name}</h3>
                  </div>
                  <p className="description">{dept.description}</p>
                  <div className="contacts">
                    <div className="contact">
                      <div className="icon">👤</div>
                      <span>{dept.leader}</span>
                    </div>
                    <div className="contact">
                      <div className="icon">✉️</div>
                      <span>{dept.contact}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Giving Section */}
        <section css={sectionStyles} id="giving">
          <div css={[ctaStyles, { marginBottom: 0 }]} className="giving">
            <div className="icon">💰</div>
            <h2>Support Our Ministry</h2>
            <p>
              Your generous giving helps us reach more people with the Gospel
              and serve our community.
            </p>
            <div className="buttons">
              <button css={buttonStyles} className="secondary large">
                Give Online
              </button>
              <button
                css={[
                  buttonStyles,
                  css`
                    background-color: transparent;
                    border: 1px solid white;
                    color: white;

                    &:hover {
                      background-color: white;
                      color: #059669;
                    }
                  `,
                ]}
                className="large"
              >
                Other Ways to Give
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
