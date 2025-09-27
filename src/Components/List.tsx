/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { css } from "@emotion/react";

const listStyles = css`
  max-width: 1200px;
  margin: 40px auto;
  padding: 20px;

  h2 {
    font-size: 26px;
    margin-bottom: 10px;
    color: #1e293b;
  }

  .section {
    margin-bottom: 50px;
  }

  .searchBox {
    margin: 15px 0 25px;
    display: flex;
    justify-content: center;

    input {
      width: 100%;
      max-width: 400px;
      padding: 10px 14px;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      font-size: 15px;
      outline: none;
      transition: border-color 0.2s ease;

      &:focus {
        border-color: #2563eb;
        box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
      }
    }
  }

  .grid {
    display: grid;
    gap: 22px;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }

  .card {
    background: #fff;
    border-radius: 12px;
    padding: 18px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
    transition: transform 200ms ease, box-shadow 200ms ease;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 16px 36px rgba(0, 0, 0, 0.1);
    }

    h3 {
      margin: 0 0 6px;
      font-size: 18px;
      color: #111827;
    }

    p {
      margin: 0 0 8px;
      font-size: 15px;
      color: #475569;
    }

    small {
      color: #64748b;
    }
  }
`;

type componentProps = {
  activeTab: string;
};

export const List: React.FC<componentProps> = ({ activeTab }) => {
  const [search, setSearch] = useState("");

  const announcements = [
    { title: "Christmas Food Drive", message: "Help families in need.", date: "Dec 10", church: "PAG Nairobi" },
    { title: "Church Office Holiday Hours", message: "Closed Dec 23-26 and Jan 1.", date: "Dec 5", church: "PAG Westlands" },
    { title: "New Member Orientation", message: "Jan 7th at 2 PM.", date: "Nov 28", church: "PAG Karen" },
    { title: "Weekly Newsletter", message: "Subscribe to stay updated.", date: "Nov 25", church: "PAG Nairobi" },
  ];

  const sermons = [
    { title: "Walking in Faith", speaker: "Pastor Peter", date: "Dec 15", church: "PAG Nairobi" },
    { title: "Power of Prayer", speaker: "Pastor Everlyne", date: "Dec 8", church: "PAG Westlands" },
    { title: "God's Grace", speaker: "Pastor Mike", date: "Dec 1", church: "PAG Karen" },
    { title: "Faith & Patience", speaker: "Pastor John", date: "Nov 24", church: "PAG Nairobi" },
  ];

  const programs = [
    { name: "Worship", desc: "Leading in worship", leader: "Sarah Johnson", church: "PAG Nairobi" },
    { name: "Youth", desc: "Youth programs", leader: "Mike Chen", church: "PAG Westlands" },
    { name: "Children", desc: "Children ministry", leader: "Mary Rodriguez", church: "PAG Karen" },
    { name: "Outreach", desc: "Community service", leader: "James Wilson", church: "PAG Nairobi" },
  ];

  // Filtering logic for each tab
  const filteredAnnouncements = announcements.filter(
    (a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.message.toLowerCase().includes(search.toLowerCase()) ||
      a.church.toLowerCase().includes(search.toLowerCase())
  );

  const filteredSermons = sermons.filter(
    (s) =>
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.speaker.toLowerCase().includes(search.toLowerCase()) ||
      s.church.toLowerCase().includes(search.toLowerCase())
  );

  const filteredPrograms = programs.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.desc.toLowerCase().includes(search.toLowerCase()) ||
      p.leader.toLowerCase().includes(search.toLowerCase()) ||
      p.church.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div css={listStyles}>
      {activeTab === "NewsList" && (
        <div className="section">
          <h2>All News & Events</h2>
          <div className="searchBox">
            <input
              type="text"
              placeholder="Search news..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="grid">
            {filteredAnnouncements.length > 0 ? (
              filteredAnnouncements.map((a, idx) => (
                <div key={idx} className="card">
                  <h3>{a.title}</h3>
                  <p>{a.message}</p>
                  <small>{a.date} • {a.church}</small>
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
          <h2>All Sermons</h2>
          <div className="searchBox">
            <input
              type="text"
              placeholder="Search sermons..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="grid">
            {filteredSermons.length > 0 ? (
              filteredSermons.map((s, idx) => (
                <div key={idx} className="card">
                  <h3>{s.title}</h3>
                  <p>Speaker: {s.speaker}</p>
                  <small>{s.date} • {s.church}</small>
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
          <h2>All Assembly Programs</h2>
          <div className="searchBox">
            <input
              type="text"
              placeholder="Search programs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="grid">
            {filteredPrograms.length > 0 ? (
              filteredPrograms.map((p, idx) => (
                <div key={idx} className="card">
                  <h3>{p.name}</h3>
                  <p>{p.desc}</p>
                  <small>Leader: {p.leader} • {p.church}</small>
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
