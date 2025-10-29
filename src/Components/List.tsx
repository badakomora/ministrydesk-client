/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { css } from "@emotion/react";

const listStyles = css`
  max-width: 1200px;
  margin: 40px auto;
  padding: 20px;

  h2 {
    font-size: 26px;
    margin-bottom: 6px;
    color: #1e293b;
  }

  p.section-desc {
    color: #475569;
    margin-bottom: 20px;
    font-size: 15px;
    line-height: 1.6;
  }

  .searchBox {
    margin: 20px 0 30px;
    display: flex;
    justify-content: center;

    input {
      width: 100%;
      max-width: 400px;
      padding: 8px 14px;
      border: 1px solid #cbd5e1;
      font-size: 15px;
      outline: none;
      transition: border-color 0.2s ease;

      &:focus {
        border-color: #2563eb;
        box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
      }
    }
  }

  .section {
    margin-bottom: 50px;
  }

  .grid {
    display: grid;
    gap: 22px;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }

  .card {
    padding: 8px 14px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.05);
    transition: transform 200ms ease, box-shadow 200ms ease,
      background 200ms ease;
    cursor: pointer;
    position: relative;

    h3 {
      margin: 0 0 6px;
      font-size: 18px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    p {
      margin: 0 0 10px;
      font-size: 15px;
    }

    small {
      color: #475569;
      font-size: 13px;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
    }
  }

  /* ---------- PINNED & LATEST TAG STYLES ---------- */

  .card.pinned {
    border: 2px solid #fbbf24;
    background: #fff8e6;

    &::after {
      content: "PINNED";
      position: absolute;
      top: 6px;
      right: 6px;
      background: #fbbf24;
      color: #1e293b;
      font-size: 10px;
      padding: 2px 6px;
      border-radius: 3px;
      font-weight: 600;
    }
  }

  .card.newest {
    border-left: 5px solid #2563eb;
    background: #eff6ff;

    &::after {
      content: "LATEST";
      position: absolute;
      top: 6px;
      right: 6px;
      background: #2563eb;
      color: #ffffff;
      font-size: 10px;
      padding: 2px 6px;
      border-radius: 3px;
      font-weight: 600;
    }
  }
`;

type componentProps = {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
};

export const List: React.FC<componentProps> = ({ setActiveTab, activeTab }) => {
  const [search, setSearch] = useState("");

  const announcements = [
    {
      title: "Christmas Food Drive",
      message: "Help families in need.",
      date: "Dec 10",
      church: "PAG Nairobi",
    },
    {
      title: "Church Office Holiday Hours",
      message: "Closed Dec 23-26 and Jan 1.",
      date: "Dec 5",
      church: "PAG Westlands",
    },
    {
      title: "New Member Orientation",
      message: "Jan 7th at 2 PM.",
      date: "Nov 28",
      church: "PAG Karen",
    },
    {
      title: "Weekly Newsletter",
      message: "Subscribe to stay updated.",
      date: "Nov 25",
      church: "PAG Nairobi",
    },
  ];

  const sermons = [
    {
      title: "Walking in Faith",
      speaker: "Pastor Peter",
      date: "Dec 15",
      church: "PAG Nairobi",
    },
    {
      title: "Power of Prayer",
      speaker: "Pastor Everlyne",
      date: "Dec 8",
      church: "PAG Westlands",
    },
    {
      title: "God's Grace",
      speaker: "Pastor Mike",
      date: "Dec 1",
      church: "PAG Karen",
    },
    {
      title: "Faith & Patience",
      speaker: "Pastor John",
      date: "Nov 24",
      church: "PAG Nairobi",
    },
  ];

  const programs = [
    {
      name: "Women",
      desc: "Leading in worship",
      leader: "Sarah Johnson",
      church: "PAG Nairobi",
    },
    {
      name: "Youth",
      desc: "Youth programs",
      leader: "Mike Chen",
      church: "PAG Westlands",
    },
    {
      name: "Sunday School",
      desc: "Children ministry",
      leader: "Mary Rodriguez",
      church: "PAG Karen",
    },
    {
      name: "CED",
      desc: "Community service",
      leader: "James Wilson",
      church: "PAG Nairobi",
    },
    {
      name: "Development Committee",
      desc: "Community service",
      leader: "James Wilson",
      church: "PAG Nairobi",
    },
  ];

  const filterByChurch = (item: { church: string }) =>
    item.church.toLowerCase().includes(search.toLowerCase());

  const filteredAnnouncements = announcements.filter(filterByChurch);
  const filteredSermons = sermons.filter(filterByChurch);
  const filteredPrograms = programs.filter(filterByChurch);

  return (
    <div css={listStyles}>
      <div className="searchBox">
        <input
          type="text"
          placeholder="Search by church name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {activeTab === "NewsList" && (
        <div className="section">
          <h2>📰 All News & Events</h2>
          <p className="section-desc">
            Stay informed with the latest church news, special events, and
            community updates happening across all PAG assemblies.
          </p>
          <div className="grid" onClick={() => setActiveTab("NewsItem")}>
            {filteredAnnouncements.length > 0 ? (
              filteredAnnouncements.map((a, idx) => (
                <div
                  key={idx}
                  className={`card announcement ${
                    idx === 0 ? "pinned" : idx < 4 ? "newest" : ""
                  }`}
                >
                  <h3>{a.title}</h3>
                  <p>{a.message}</p>
                  <small>
                    ⛪ {a.church} • {a.date}
                  </small>
                </div>
              ))
            ) : (
              <p>No news found.</p>
            )}
          </div>
        </div>
      )}

      {activeTab === "SermonsList" && (
        <div className="section">
          <h2>🎙️ All Sermons</h2>
          <p className="section-desc">
            Access powerful teachings and messages from our pastors through
            recorded sermons — available in both video and audio.
          </p>
          <div className="grid" onClick={() => setActiveTab("SermonsItem")}>
            {filteredSermons.length > 0 ? (
              filteredSermons.map((s, idx) => (
                <div
                  key={idx}
                  className={`card sermon ${
                    idx === 0 ? "pinned" : idx < 4 ? "newest" : ""
                  }`}
                >
                  <h3>{s.title}</h3>
                  <p>Speaker: {s.speaker}</p>
                  <small>
                    ⛪ {s.church} • {s.date}
                  </small>
                </div>
              ))
            ) : (
              <p>No sermons found.</p>
            )}
          </div>
        </div>
      )}

      {activeTab === "AssemblyProgramsList" && (
        <div className="section">
          <h2>🌿 All Assembly Programs</h2>
          <p className="section-desc">
            Explore our assembly programs that nurture faith, empower youth, and
            strengthen community bonds through service and worship.
          </p>
          <div
            className="grid"
            onClick={() => setActiveTab("AssemblyProgramsItem")}
          >
            {filteredPrograms.length > 0 ? (
              filteredPrograms.map((p, idx) => (
                <div
                  key={idx}
                  className={`card program ${
                    idx === 0 ? "pinned" : idx < 4 ? "newest" : ""
                  }`}
                >
                  <h3>{p.name}</h3>
                  <p>{p.desc}</p>
                  <small>
                    ⛪ {p.church} • Leader: {p.leader}
                  </small>
                </div>
              ))
            ) : (
              <p>No programs found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
