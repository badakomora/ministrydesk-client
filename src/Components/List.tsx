/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import axios from "axios";
import { serverurl } from "./Appconfig";

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
    background: #ffffff;
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
      justify-content: space-between;
      align-items: center;
      gap: 10px;
    }

    h3 .title {
      flex: 1;
      min-width: 0;
      word-break: break-word;
    }

    h3 .tag {
      font-size: 10px;
      padding: 2px 6px;
      font-weight: 600;
      white-space: nowrap;
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

  /* ---------- PINNED & LATEST TAG STYLES WITH FULL BACKGROUND ---------- */

  .card.pinned {
    background: #fff8e6;
    border-left: 5px solid #fbbf24;
  }

  .card.latest {
    background: #eff6ff;
    border-left: 5px solid #2563eb;
  }

  .tag.pinned {
    background: #fbbf24;
    color: #1e293b;
  }

  .tag.latest {
    background: #2563eb;
    color: #ffffff;
  }
`;

type componentProps = {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
};

type Item = {
  id: number;
  category: "1" | "2" | "3"; // Server categories
  title: string;
  description: string;
  date: string | null;
  extraInfo?: string;
  churchName: string;
};

export const List: React.FC<componentProps> = ({ activeTab, setActiveTab }) => {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState<Item[]>([]);

  // Utility to truncate long text
  const truncate = (text: string, max = 50) =>
    text.length > max ? text.slice(0, max) + "..." : text;

  // Fetch server data
  useEffect(() => {
    let mounted = true;
    axios
      .get(`${serverurl}/item/list`)
      .then((res) => {
        if (!mounted) return;
        const data: any[] = Array.isArray(res.data) ? res.data : [];
        const transformed: Item[] = data.map((d) => ({
          id: d.id,
          category: d.category.toString() as "1" | "2" | "3",
          title: truncate(d.title, 25),
          description: truncate(d.description || d.message || "", 50),
          date: d.dateposted || null,
          churchName: d.churchname || "",
        }));
        setItems(transformed);
      })
      .catch((err) => {
        console.error("Error fetching items:", err);
        if (mounted) setItems([]);
      });

    return () => {
      mounted = false;
    };
  }, []);

  // Filter by church search
  const filterByChurch = (item: Item) =>
    item.churchName.toLowerCase().includes(search.toLowerCase());

  const filteredAnnouncements = items.filter(
    (i) => i.category === "1" && filterByChurch(i)
  );
  const filteredSermons = items.filter(
    (i) => i.category === "2" && filterByChurch(i)
  );
  const filteredPrograms = items.filter(
    (i) => i.category === "3" && filterByChurch(i)
  );

  // Reusable section renderer
  const renderSection = (
    sectionItems: Item[],
    title: string,
    description: string,
    tabName: string
  ) => (
    <div className="section">
      <h2>{title}</h2>
      <p className="section-desc">{description}</p>
      <div className="grid" onClick={() => setActiveTab(tabName)}>
        {sectionItems.length > 0 ? (
          sectionItems.map((item, idx) => (
            <div
              key={item.id}
              className={`card ${
                idx === 0 ? "pinned" : idx < 4 ? "latest" : ""
              }`}
            >
              <h3>
                <span className="title">{item.title}</span>
                {idx === 0 && <span className="tag pinned">PINNED</span>}
                {idx > 0 && idx < 4 && (
                  <span className="tag latest">LATEST</span>
                )}
              </h3>
              <p>{item.description}</p>
              {item.extraInfo && <small>{item.extraInfo}</small>}
              <small>
                ⛪ {item.churchName}{" "}
                {item.date ? `• ${new Date(item.date).toDateString()}` : ""}
              </small>
            </div>
          ))
        ) : (
          <p>No items found.</p>
        )}
      </div>
    </div>
  );

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

      {activeTab === "NewsList" &&
        renderSection(
          filteredAnnouncements,
          "📰 All News & Events",
          "Stay informed with the latest church news, special events, and community updates.",
          "NewsItem"
        )}

      {activeTab === "SermonsList" &&
        renderSection(
          filteredSermons,
          "🎙️ All Sermons",
          "Access powerful teachings and messages from our pastors through recorded sermons.",
          "SermonsItem"
        )}

      {activeTab === "AssemblyProgramsList" &&
        renderSection(
          filteredPrograms,
          "🌿 All Assembly Programs",
          "Explore our assembly programs that nurture faith, empower youth, and strengthen community bonds.",
          "AssemblyProgramsItem"
        )}
    </div>
  );
};
