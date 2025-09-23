/** @jsxImportSource @emotion/react */
import React from "react";
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

export const List = () => {
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

  return (
    <div css={listStyles}>
      {/* News */}
      <div className="section">
        <h2>All News & Events</h2>
        <div className="grid">
          {announcements.map((a, idx) => (
            <div key={idx} className="card">
              <h3>{a.title}</h3>
              <p>{a.message}</p>
              <small>{a.date} • {a.church}</small>
            </div>
          ))}
        </div>
      </div>

      {/* Sermons */}
      <div className="section">
        <h2>All Sermons</h2>
        <div className="grid">
          {sermons.map((s, idx) => (
            <div key={idx} className="card">
              <h3>{s.title}</h3>
              <p>Speaker: {s.speaker}</p>
              <small>{s.date} • {s.church}</small>
            </div>
          ))}
        </div>
      </div>

      {/* Programs */}
      <div className="section">
        <h2>All Assembly Programs</h2>
        <div className="grid">
          {programs.map((p, idx) => (
            <div key={idx} className="card">
              <h3>{p.name}</h3>
              <p>{p.desc}</p>
              <small>Leader: {p.leader} • {p.church}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
